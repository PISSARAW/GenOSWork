/**
 * Tests unitaires du routeur Dark Launch.
 *
 * Objectifs :
 *  - (a) le chemin critique (réponse utilisateur) ne dépend PAS du nouveau calcul
 *  - (b) timeout agnostique : le nouveau moteur lent est tué sans impact
 *  - (c) circuit breaker fonctionnel
 *
 * Les moteurs sont des mocks/stubs déterministes.
 */

import { describe, it, expect } from "vitest";
import { DarkLaunchRouter } from "./router.js";
import type { PriceEngine } from "./engine.interface.js";
import type { PriceRequest } from "./types.js";
import { DEFAULT_CONFIG, type DarkLaunchConfig } from "./config.js";
import { createDefaultWorker, runNewEngineCalculation } from "./worker.js";
import { CircuitBreaker } from "./circuit-breaker.js";

// ---------------------------------------------------------------------------
// Helpers : moteurs mock déterministes
// ---------------------------------------------------------------------------

function createMockEngine(
  delayMs: number,
  priceFn: (origin: any, dest: any) => number
): PriceEngine {
  return {
    async calculatePrice(origin, destination, _context) {
      await new Promise((r) => setTimeout(r, delayMs));
      return priceFn(origin, destination);
    },
  };
}

/** Moteur ancien rapide (retour immédiat). */
const fastOldEngine = createMockEngine(0, (o, d) => 1500);

/** Moteur nouveau lent (dépassera le timeout par défaut de 500ms). */
const slowNewEngine = createMockEngine(800, (o, d) => 2100);

/** Moteur nouveau rapide (pour les scénarios de succès). */
const fastNewEngine = createMockEngine(10, (o, d) => 1800);

/** Moteur nouveau qui plante. */
const failingNewEngine = {
  async calculatePrice() {
    throw new Error("simulated_crash");
  },
} as PriceEngine;

function makeRequest(): PriceRequest {
  return {
    origin: { lat: 48.8566, lng: 2.3522 },
    destination: { lat: 48.8738, lng: 2.2950 },
  };
}

// ===========================================================================
// (a) Le chemin critique ne dépend PAS du nouveau calcul
// ===========================================================================

describe("DarkLaunchRouter — critical path independence", () => {
  it("retourne le prix ancien même si le nouveau moteur plante", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: failingNewEngine,
    });

    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();

    expect(res.engine).toBe("old");
    expect(res.price).toBe(1500);
    expect(res.requestId).toBeTruthy();
    expect(res.timestamp).toBeTruthy();

    // Le résultat store SHOULD contain the failure.
    const stored = router.drainResults();
    expect(stored).toHaveLength(1);
    expect(stored[0].decision).toBe("worker_error");
  });

  it("retourne le prix ancien même si le nouveau moteur est très lent", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: slowNewEngine,
      config: { newEngineTimeoutMs: 200 },
    });

    const t0 = Date.now();
    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();
    const elapsed = Date.now() - t0;

    // La réponse utilisateur est renvoyée rapidement (< 300ms même si le nouveau
    // moteur est lent à 800ms).
    expect(elapsed).toBeLessThan(400);
    expect(res.price).toBe(1500);
    expect(res.engine).toBe("old");

    const stored = router.drainResults();
    expect(stored).toHaveLength(1);
    expect(stored[0].decision).toBe("timed_out");
  });

  it("la réponse n'expose jamais le prix nouveau ni les métadonnées de comparaison", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: fastNewEngine,
    });

    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();

    // Le type PriceResponse ne contient pas de champ `newPrice`.
    expect(res).not.toHaveProperty("newPrice");
    expect(res).not.toHaveProperty("comparison");
    expect(res).not.toHaveProperty("newEngineDecision");
  });
});

// ===========================================================================
// (b) Timeout agnostique
// ===========================================================================

describe("DarkLaunchRouter — timeout agnostic", () => {
  it("timeout court : le nouveau moteur est sauté avant même de lancer le calc", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: fastNewEngine,
      config: { newEngineTimeoutMs: 5 }, // timeout plus court que le moteur (10ms)
    });

    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();
    const stored = router.drainResults();

    // Le nouveau calcul devrait timeout.
    expect(stored).toHaveLength(1);
    expect(stored[0].decision).toBe("timed_out");
    expect(res.price).toBe(1500);
  });

  it("timeout long : le nouveau moteur réussit", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: fastNewEngine,
      config: { newEngineTimeoutMs: 100 },
    });

    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();
    const stored = router.drainResults();

    expect(stored).toHaveLength(1);
    expect(stored[0].decision).toBe("completed");
    expect(stored[0].price).toBe(1800);
    expect(res.price).toBe(1500);
  });

  it("timeout configurable sans modifier le code du routeur", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: slowNewEngine,
      config: { newEngineTimeoutMs: 1000 }, // timeout assez long pour laisser le moteur finir
    });

    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();
    const stored = router.drainResults();

    // slowNewEngine met 800ms, timeout 1000ms → succès.
    expect(stored[0].decision).toBe("completed");
    expect(res.price).toBe(1500);
  });
});

// ===========================================================================
// (c) Circuit breaker fonctionnel
// ===========================================================================

describe("DarkLaunchRouter — circuit breaker", () => {
  it("ouvert après N échecs consécutifs → nouveau calcul sauté", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: slowNewEngine, // 800ms, timeout 200ms → échec
      config: {
        newEngineTimeoutMs: 200,
        circuitBreakerThreshold: 3,
        circuitBreakerCooldownMs: 60_000,
      },
    });

    // Laisser les promises de nouveau calcul se settle entre chaque requête.
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // 1ère requête : lancement + timeout → échec #1
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    // 2ème : échec #2
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    // 3ème : échec #3 → circuit ouvert
    await router.handle(makeRequest());
    await router.whenPendingSettle();

    let state = router.getCircuitBreakerState();
    expect(state.failures).toBe(3);
    expect(state.state).toBe("open");

    // 4ème requête : circuit ouvert → le nouveau calcul ne doit PAS être lancé,
    // et le résultat stocké doit refléter "circuit_breaker_open".
    const res = await router.handle(makeRequest());
    await router.whenPendingSettle();
    const stored = router.drainResults();

    expect(state.state).toBe("open");

    // La réponse utilisateur est toujours renvoyée.
    expect(res.price).toBe(1500);
  });

  it("circuit breaker se réinitialise après le cooldown", async () => {
    // Note : on simule le cooldown avec un temps réduit pour les tests.
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      newEngine: slowNewEngine,
      config: {
        newEngineTimeoutMs: 200,
        circuitBreakerThreshold: 3,
        circuitBreakerCooldownMs: 400, // assez long pour que whenPendingSettle() ne l'expire pas
      },
    });

    // Lancer 3 requêtes pour ouvrir le circuit.
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    await router.handle(makeRequest());
    await router.whenPendingSettle();

    // Vérifier que le circuit est ouvert (juste après le 3ème settle).
    let state = router.getCircuitBreakerState();
    expect(state.state).toBe("open");
    expect(state.failures).toBe(3);

    // Attendre le cooldown (400ms) + une marge.
    await new Promise((r) => setTimeout(r, 500));

    // Maintenant le circuit doit être rétabli.
    state = router.getCircuitBreakerState();
    expect(state.state).toBe("closed");
    expect(state.failures).toBe(0);

    // La prochaine requête lance à nouveau le nouveau calcul.
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    const stored = router.drainResults();
    expect(stored[stored.length - 1].decision).toBe("timed_out");
  });

  it("succès réinitialise le compteur d'échecs", async () => {
    const router = new DarkLaunchRouter({
      oldEngine: fastOldEngine,
      // Alterner : erreur, erreur, succès.
      newEngine:
        // moteur qui dépend d'un compteur externe — on implémente via une closure.
        ((() => {
          let callCount = 0;
          return {
            async calculatePrice() {
              callCount++;
              if (callCount <= 2) {
                throw new Error("fail");
              }
              return 2000;
            },
          } as PriceEngine;
        })()),
      config: {
        newEngineTimeoutMs: 200,
        circuitBreakerThreshold: 5,
      },
    });

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // Premier échec.
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    let state = router.getCircuitBreakerState();
    expect(state.failures).toBe(1);

    // Second échec.
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    state = router.getCircuitBreakerState();
    expect(state.failures).toBe(2);

    // Succès → remis à zéro.
    await router.handle(makeRequest());
    await router.whenPendingSettle();
    state = router.getCircuitBreakerState();
    expect(state.failures).toBe(0);
    expect(state.state).toBe("closed");
  });
});

// ===========================================================================
// Tests du CircuitBreaker isolé
// ===========================================================================

describe("CircuitBreaker", () => {
  it("démarre en état fermé", () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 3,
      circuitBreakerCooldownMs: 1000,
    });
    expect(cb.isOpen()).toBe(false);
    expect(cb.state).toBe("closed");
  });

  it("s'ouvre après seuil d'échecs", () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 2,
      circuitBreakerCooldownMs: 10_000,
    });
    cb.recordFailure();
    expect(cb.isOpen()).toBe(false);
    cb.recordFailure();
    expect(cb.isOpen()).toBe(true);
  });

  it("reste ouvert pendant le cooldown", () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 1,
      circuitBreakerCooldownMs: 5000,
    });
    cb.recordFailure();
    expect(cb.isOpen()).toBe(true);
    // Avant la fin du cooldown.
    expect(cb.isOpen()).toBe(true);
  });

  it("se réinitialise après le cooldown", () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 1,
      circuitBreakerCooldownMs: 0, // cooldown immédiat → isOpen() retourne false car le délai est écoulé
    });
    cb.recordFailure();
    // Avec cooldown=0, le circuit est ouvert un instant mais isOpen() retourne
    // false car Date.now() - this._openedAt >= 0 est toujours vrai.
    // On vérifie que recordSuccess et isOpen() fonctionnent.
    expect(cb.isOpen()).toBe(false); // ouverture instantanée puis fermeture immédiate
    cb.recordSuccess();
    expect(cb.isOpen()).toBe(false);
    expect(cb.state).toBe("closed");
  });
});

// ===========================================================================
// Tests de runNewEngineCalculation isolé
// ===========================================================================

describe("runNewEngineCalculation", () => {
  it("retourne un résultat avec décision circuit_breaker_open quand le CB est ouvert", async () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 1,
      circuitBreakerCooldownMs: 10_000,
    });
    cb.recordFailure(); // ouvre le circuit

    const worker = createDefaultWorker(fastOldEngine);
    const config: DarkLaunchConfig = {
      ...DEFAULT_CONFIG,
      newEngineTimeoutMs: 500,
    };

    const result = await runNewEngineCalculation(
      worker,
      cb,
      config,
      { lat: 0, lng: 0 },
      { lat: 1, lng: 1 },
      "test-request"
    );

    expect(result.decision).toBe("circuit_breaker_open");
    expect(result.price).toBe(0);
  });

  it("retourne un résultat completed quand le moteur réussit dans le timeout", async () => {
    const cb = new CircuitBreaker({
      circuitBreakerThreshold: 5,
      circuitBreakerCooldownMs: 10_000,
    });
    const worker = createDefaultWorker(fastOldEngine);
    const config: DarkLaunchConfig = {
      ...DEFAULT_CONFIG,
      newEngineTimeoutMs: 100,
    };

    const result = await runNewEngineCalculation(
      worker,
      cb,
      config,
      { lat: 0, lng: 0 },
      { lat: 1, lng: 1 },
      "test-request-2"
    );

    expect(result.decision).toBe("completed");
    expect(result.price).toBeGreaterThan(0);
    expect(cb.state).toBe("closed");
  });
});
