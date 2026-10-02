/**
 * Isolation du nouveau calcul via `worker_threads`.
 *
 * Choix technique — worker_threads plutôt que child_process ou Bull/BullMQ :
 * - worker_threads partagent la mémoire du processus Node.js → pas de sérialisation
 *   JSON coûteuse pour les résultats, communication par MessageChannel très légère.
 * - child_process/ fork serait utile si le nouveau moteur devait être isolé au niveau
 *   OS (crash = pas de crash du serveur) ou exécuter du code non fiable. Ici les deux
 *   moteurs vivent dans le même process Next.js → worker_threads suffit et est plus
 *   léger (pas de fork). Sur le plan temporel, le fork a un surcoût de démarrage de
 *   plusieurs ms, worker_threads aussi commence à froid mais on peut réutiliser un
 *   pool de workers.
 * - Bull/BullMQ avec Redis ajoute une dépendance externe (Redis), un surcoût opérationnel
 *   et une latence réseau. Pour un shadow mode interne au serveur, inutile.
 * - Décision retenue : worker_threads avec un MessageChannel par requête, timeout
 *   configurable via `AbortSignal.timeout()`. Si le worker Thread est toujours en vie
 *   après timeout, on le termine via `worker.terminate()`.
 *
 * Cette implémentation est une evolution possible — la couche actuelle utilise une
 * abstraction "async worker" basée sur un Promise étroitement temporel, prête à être
 * remplacée par un worker_thread réel sans changer l'API publique du routeur.
 */

import type { NewEngineResult } from "./types.js";
import type { PriceEngine } from "./engine.interface.js";
import type { DarkLaunchConfig } from "./config.js";

export type WorkerJob = {
  kind: "calculateNewEngine";
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  context?: Record<string, unknown>;
};

export type WorkerMessage = {
  requestId: string;
  result: NewEngineResult;
};

/**
 * Interface d'un worker capable de calculer le nouveau prix en isolation.
 * Dans la version production on injecterait un vrai WorkerThreadAdapter.
 */
export interface NewEngineWorker {
  /** Lance le calcul et retourne un Promise résolu avec le résultat ou rejeté en cas de timeout/erreur. */
  run(job: WorkerJob, requestId: string, timeoutMs: number): Promise<NewEngineResult>;
}

/**
 * Implémentation par défaut (simulée) : exécute le calcul dans le thread principal
 * mais dans une Promise étroitement temporelle. À remplacer par un WorkerThreadAdapter
 * réel quand le module `worker_threads` est intégré.
 *
 * Le timeout est appliqué côté Promise : si le moteur ne répond pas dans le délai,
 * on rejette et on considère le résultat comme "timed_out".
 */
export function createDefaultWorker(
  engine: PriceEngine
): NewEngineWorker {
  return {
    async run(job, requestId, timeoutMs) {
      const startedAt = Date.now();

      try {
        // Si le moteur est lent, on le timeout grâce à la Promise.race ci-dessous.
        const pricePromise = engine.calculatePrice(
          job.origin,
          job.destination,
          job.context
        );

        // Race entre le calcul et le timeout.
        const winner = await Promise.race([
          pricePromise.then((price) => ({
            requestId,
            result: {
              requestId,
              price,
              latencyMs: Date.now() - startedAt,
              timestamp: new Date().toISOString(),
              decision: "completed" as const,
            },
          })),
          new Promise<never>((_, reject) =>
            setTimeout(() =>
              reject(new Error("new_engine_timeout")),
              timeoutMs
            )
          ),
        ]);

        return winner.result;
      } catch (err) {
        const isTimeout =
          err instanceof Error && err.message === "new_engine_timeout";
        return {
          requestId,
          price: 0,
          latencyMs: Date.now() - startedAt,
          timestamp: new Date().toISOString(),
          decision: isTimeout ? "timed_out" : "worker_error",
          error: err instanceof Error ? err.message : String(err),
        };
      }
    },
  };
}

/**
 * Runner qui exécute le nouveau calcul avec timeout et circuit breaker.
 */
export async function runNewEngineCalculation(
  worker: NewEngineWorker,
  circuitBreaker: import("./circuit-breaker.js").CircuitBreaker,
  config: DarkLaunchConfig,
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  requestId: string,
  context?: Record<string, unknown>
): Promise<NewEngineResult> {
  // 1. Vérifier le circuit breaker.
  if (circuitBreaker.isOpen()) {
    return {
      requestId,
      price: 0,
      latencyMs: 0,
      timestamp: new Date().toISOString(),
      decision: "circuit_breaker_open",
    };
  }

  // 2. Lancer le calcul avec timeout.
  let result: NewEngineResult;
  try {
    result = await worker.run(
      { kind: "calculateNewEngine", origin, destination, context },
      requestId,
      config.newEngineTimeoutMs
    );
  } catch (_err) {
    result = {
      requestId,
      price: 0,
      latencyMs: 0,
      timestamp: new Date().toISOString(),
      decision: "timed_out",
      error: "new_engine_timeout",
    };
  }

  // 3. Mettre à jour le circuit breaker.
  if (result.decision === "completed") {
    circuitBreaker.recordSuccess();
  } else if (
    result.decision === "timed_out" ||
    result.decision === "worker_error"
  ) {
    circuitBreaker.recordFailure();
  }
  // circuit_breaker_open ne change pas l'état interne (déjà ouvert).

  return result;
}
