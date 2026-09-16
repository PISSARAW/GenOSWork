/**
 * Routeur Dark Launch : POST /api/dark-launch/price
 *
 * Architecture :
 * - Reçoit la requête { origin, destination, context? }
 * - Lance SIMULTANÉMENT :
 *     • oldEngine.calculatePrice → réponse utilisateur (critique, renvoyée immédiatement)
 *     • newEngine.calculatePrice → calcul silencieux fire-and-forget avec timeout
 * - La réponse utilisateur ne contient que le prix ancien + métadonnées (id + timestamp)
 * - Le résultat nouveau est stocké dans une queue interne pour comparaison ultérieure
 */

import { randomUUID } from "node:crypto";
import type {
  PriceRequest,
  PriceResponse,
  NewEngineResult,
  RouterDecision,
} from "./types.js";
import type { PriceEngine } from "./engine.interface.js";
import { createDefaultWorker, runNewEngineCalculation } from "./worker.js";
import type { NewEngineWorker } from "./worker.js";
import { CircuitBreaker } from "./circuit-breaker.js";
import { DEFAULT_CONFIG, type DarkLaunchConfig } from './config.js';

// ---------------------------------------------------------------------------
// Queue de résultats silencieux (stockage en mémoire, non envoyé au client)
// ---------------------------------------------------------------------------

interface QueuedResult {
  result: NewEngineResult;
  addedAt: number;
}

class ResultQueue {
  private readonly _results: QueuedResult[] = [];
  private readonly _maxSize: number;

  constructor(maxSize = DEFAULT_CONFIG.resultQueueMaxSize) {
    this._maxSize = maxSize;
  }

  push(result: NewEngineResult): void {
    this._results.push({ result, addedAt: Date.now() });
    if (this._results.length > this._maxSize) {
      this._results.shift(); // éviction FIFO
    }
  }

  /** Retourne tous les résultats connus (pour comparaison asynchrone / export). */
  drain(): NewEngineResult[] {
    const snapshot = this._results.map((r) => r.result);
    this._results.length = 0;
    return snapshot;
  }

  get size(): number {
    return this._results.length;
  }
}

// ---------------------------------------------------------------------------
// Routeur
// ---------------------------------------------------------------------------

export interface DarkLaunchRouterOptions {
  /** Moteur en production (ancien, critique). */
  oldEngine: PriceEngine;
  /** Nouveau moteur (shadow, non critique). */
  newEngine: PriceEngine;
  /** Config optionnelle (utilise DEFAULT_CONFIG si non fournie). */
  config?: Partial<DarkLaunchConfig>;
  /** Worker optionnel (default : worker par défaut). */
  worker?: NewEngineWorker;
  /** Queue de résultats optionnelle (utile pour les tests). */
  resultQueue?: ResultQueue;
}

export class DarkLaunchRouter {
  private readonly _oldEngine: PriceEngine;
  private readonly _circuitBreaker: CircuitBreaker;
  private readonly _config: DarkLaunchConfig;
  private readonly _worker: NewEngineWorker;
  private readonly _resultQueue: ResultQueue;

  constructor(options: DarkLaunchRouterOptions) {
    this._oldEngine = options.oldEngine;
    this._config = { ...DEFAULT_CONFIG, ...options.config };
    this._circuitBreaker = new CircuitBreaker(this._config);
    this._worker = options.worker ?? createDefaultWorker(options.newEngine);
    this._resultQueue =
      options.resultQueue ?? new ResultQueue(this._config.resultQueueMaxSize);
  }

  /** Exécute une requête de calcul de prix dans le mode dark launch. */
  async handle(request: PriceRequest): Promise<PriceResponse> {
    const requestId = randomUUID();
    const timestamp = new Date().toISOString();

    // --- Chemin critique : ancien moteur (doit être le plus rapide possible) ---
    const oldEngineStart = Date.now();
    let oldPrice: number;
    try {
      oldPrice = await this._oldEngine.calculatePrice(
        request.origin,
        request.destination
      );
    } catch (err) {
      // En production on pourrait fallback sur un prix par défaut ou lever.
      // Ici on retourne un prix nul pour ne pas bloquer le client.
      oldPrice = 0;
    }
    const oldEngineLatencyMs = Date.now() - oldEngineStart;

    // --- Nouveau calcul : fire-and-forget avec timeout + circuit breaker ---
    const newEngineDecision: RouterDecision["newEngineDecision"] =
      this._circuitBreaker.isOpen()
        ? "circuit_breaker"
        : // On lance le calcul; si le worker est trop lent on catch le timeout.
          // La décision finale est déterminée dans runNewEngineCalculation.
          "launched";

    // Fire-and-forget : on ne await pas ce calcul pour ne pas bloquer la réponse.
    // On le captures dans une Promise "à l'insu" du client.
    const newEnginePromise = runNewEngineCalculation(
      this._worker,
      this._circuitBreaker,
      this._config,
      request.origin,
      request.destination,
      requestId,
      request.context
    )
      .then((result) => {
        // Stockage silencieux.
        this._resultQueue.push(result);
        return result;
      })
      .catch((err) => {
        // Parenthèse : même en cas d'erreur inattendue du worker, on ne impacte pas le client.
        const fallbackResult: NewEngineResult = {
          requestId,
          price: 0,
          latencyMs: 0,
          timestamp: new Date().toISOString(),
          decision: "worker_error",
          error: err instanceof Error ? err.message : String(err),
        };
        this._resultQueue.push(fallbackResult);
        return fallbackResult;
      });

    // On ne pas attendre newEnginePromise pour renvoyer la réponse.
    // On démarre le traitement en arrière-plan (fire-and-forget).
    // En Node.js les Promises non settleées restent en mémoire jusqu'à completion —
    // c'est voulu ici car on veut récupérer le résultat.
    // (Dans une implémentation avec worker_threads on utiliserait worker.terminate()
    //  si le timeout est dépassé pour libérer la ressource.)
    void newEnginePromise;

    // --- Construction de la réponse utilisateur ---
    const response: PriceResponse = {
      requestId,
      timestamp,
      price: oldPrice,
      currency: "EUR",
      engine: "old",
    };

    // Log structuré (en production on passerait par un logger comme pino/winston).
    const decision: "launched" | "circuit_breaker" = this._circuitBreaker.isOpen()
      ? "circuit_breaker"
      : "launched";
    const loggerContext = {
      requestId,
      timestamp,
      oldEngineLatencyMs,
      newEngineDecision: decision,
    };
    this._log(loggerContext);

    return response;
  }

  /** Exposée pour les tests : récupère les résultats silencieux. */
  drainResults(): NewEngineResult[] {
    return this._resultQueue.drain();
  }

  /** Attend que toutes les promesses de calcul nouveau en cours soient settleées.
   *  Utile pour les tests qui vérifient les résultats stockés après handle(). */
  async whenPendingSettle(): Promise<void> {
    // On utilise un microtask pour laisser les promesses en cours se settle.
    await Promise.resolve();
    // La promesse du nouveau calcul peut prendre jusqu'à config.newEngineTimeoutMs.
    // On attend ce délai + une marge.
    await new Promise((r) => setTimeout(r, this._config.newEngineTimeoutMs + 50));
  }

  /** Exposée pour les tests : état du circuit breaker. */
  getCircuitBreakerState(): { failures: number; state: "closed" | "open" } {
    // Appeler isOpen() en premier pour que le reset des compteurs soit pris en compte.
    const state = this._circuitBreaker.state;
    return {
      failures: this._circuitBreaker.failureCount,
      state,
    };
  }

  // --- Log structuré interne ---
  private _log(context: {
    requestId: string;
    timestamp: string;
    oldEngineLatencyMs: number;
    newEngineDecision: "launched" | "circuit_breaker";
  }): void {
    // En production : logger.info("dark-launch", context)
    // Ici on écrit dans console pour les tests.
    const line = JSON.stringify({
      level: "info",
      message: "dark-launch.request",
      ...context,
    });
    // On utilise console.log pour que les tests puissent récupérer les logs.
    console.log(line);
  }
}
