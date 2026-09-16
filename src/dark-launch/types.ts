/**
 * Types partagés par tout le module Dark Launch.
 */

/** Points géographiques (simplifiés). */
export interface GeoPoint {
  lat: number;
  lng: number;
}

/** Requête entrante POST /api/dark-launch/price. */
export interface PriceRequest {
  origin: GeoPoint;
  destination: GeoPoint;
  /** Données contextuelles optionnelles (météo, trafic, historique…). */
  context?: Record<string, unknown>;
}

/** Réponse envoyée au client (uniquement ancien moteur + métadonnées). */
export interface PriceResponse {
  requestId: string;
  timestamp: string;
  price: number;
  currency: string;
  engine: "old";
}

/** Résultat silencieux du nouveau moteur (stocké, pas envoyé au client). */
export interface NewEngineResult {
  requestId: string;
  price: number;
  latencyMs: number;
  timestamp: string;
  decision: "completed" | "timed_out" | "circuit_breaker_open" | "worker_error";
  error?: string;
}

export interface PriceResult {
  requestId: string;
  price: number;
  currency?: string;
  timestamp: number;
  context?: PriceContext;
}

export interface PriceContext {
  weather?: string;
  traffic?: string;
  courierScore?: number;
  distance?: number;
  [key: string]: unknown;
}

/** Rapport de décision interne (logué, pas renvoyé au client). */
export interface RouterDecision {
  requestId: string;
  oldEngineLatencyMs: number;
  newEngineDecision: "launched" | "skipped_timeout" | "circuit_breaker";
  newEngineLatencyMs?: number;
  newEngineResult?: NewEngineResult;
  timestamp: string;
}
