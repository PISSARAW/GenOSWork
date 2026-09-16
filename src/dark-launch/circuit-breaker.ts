/**
 * Circuit breaker pour le nouveau moteur.
 *
 * Si le nouveau moteur échoue (timeout) 3 fois consécutives,
 * le circuit s'ouvre et tout nouveau calcul est sauté pendant N secondes.
 */

import type { DarkLaunchConfig } from "./config.js";

/** Le CircuitBreaker ne dépend que des deux champs qu'il consomme réellement. */
type CircuitBreakerConfig = Pick<
  DarkLaunchConfig,
  "circuitBreakerThreshold" | "circuitBreakerCooldownMs"
>;

export class CircuitBreaker {
  private readonly _threshold: number;
  private readonly _cooldownMs: number;
  private _failures = 0;
  private _openedAt: number | null = null;

  constructor(config: CircuitBreakerConfig) {
    this._threshold = config.circuitBreakerThreshold;
    this._cooldownMs = config.circuitBreakerCooldownMs;
  }

  /**
   * Retourne `true` si le circuit est ouvert → on ne doit PAS lancer le nouveau calcul.
   */
  isOpen(): boolean {
    if (this._openedAt === null) return false;
    if (Date.now() - this._openedAt >= this._cooldownMs) {
      this._openedAt = null;
      this._failures = 0;
      return false;
    }
    return true;
  }

  /** Enregistre un échec (timeout). Si le seuil est atteint, ouvre le circuit. */
  recordFailure(): void {
    this._failures++;
    if (this._failures >= this._threshold) {
      this._openedAt = Date.now();
    }
  }

  /** Enregistre un succès → remet à zéro. */
  recordSuccess(): void {
    this._failures = 0;
    this._openedAt = null;
  }

  get failureCount(): number {
    return this._failures;
  }

  get state(): "closed" | "open" {
    return this.isOpen() ? "open" : "closed";
  }
}
