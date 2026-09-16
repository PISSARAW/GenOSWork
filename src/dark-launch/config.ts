/** Configuration du moteur de tarification dynamique (prix). */
export const config = {
  ratePerKm: 1.5,
  fixedFees: 2.0,
  quadraticThresholdKm: 20,
  quadraticCoefficient: 0.005,
  weatherFactors: {
    clear: 1.0,
    rain: 1.15,
    snow: 1.25,
    storm: 1.40,
  },
  trafficDensityMax: 1.30,
  courierDefaultScore: 50,
  courierGoodThreshold: 80,
  courierGoodFactor: 0.95,
  courierBadThreshold: 40,
  courierBadFactor: 1.10,
};

export type Config = typeof config;

// ============================================================================
// Configuration du routeur Dark Launch
// ============================================================================

/** Timeout maximal (ms) attribué au calcul du nouveau moteur. */
export const NEW_ENGINE_TIMEOUT_MS = 500;

/** Nombre de calculs consécutifs lents avant ouverture du circuit breaker. */
export const CIRCUIT_BREAKER_THRESHOLD = 3;

/** Durée (ms) pendant laquelle le circuit breaker reste ouvert. */
export const CIRCUIT_BREAKER_COOLDOWN_MS = 10_000;

/** Profondeur maximale de la queue de résultat. */
export const RESULT_QUEUE_MAX_SIZE = 10_000;

/** Intervalle (ms) de nettoyage de la queue. */
export const RESULT_QUEUE_CLEANUP_INTERVAL_MS = 60_000;

/**
 * Configuration du routeur Dark Launch.
 * Centralise tous les seuils et timeouts pour pouvoir être ajustée
 * sans recompiler la logique métier.
 */
export interface DarkLaunchConfig {
  newEngineTimeoutMs: number;
  circuitBreakerThreshold: number;
  circuitBreakerCooldownMs: number;
  resultQueueMaxSize: number;
  resultQueueCleanupIntervalMs: number;
}

/** Config par défaut (exportée pour permettre les tests avec valeurs custom). */
export const DEFAULT_CONFIG: DarkLaunchConfig = {
  newEngineTimeoutMs: NEW_ENGINE_TIMEOUT_MS,
  circuitBreakerThreshold: CIRCUIT_BREAKER_THRESHOLD,
  circuitBreakerCooldownMs: CIRCUIT_BREAKER_COOLDOWN_MS,
  resultQueueMaxSize: RESULT_QUEUE_MAX_SIZE,
  resultQueueCleanupIntervalMs: RESULT_QUEUE_CLEANUP_INTERVAL_MS,
};

/**
 * Seuils de comparaison delta pour le pipeline d'alerting.
 */
export interface DeltaThresholds {
  deltaAbsoluteMax: number;
  deltaRelativeMax: number;
}

/** Seuils par défaut (5€ absolu, 10% relatif). */
export const DEFAULT_DELTA_THRESHOLDS: DeltaThresholds = {
  deltaAbsoluteMax: 5,
  deltaRelativeMax: 10,
};
