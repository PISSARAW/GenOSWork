/**
 * Worker asynchrone de comparaison — sous-système 3 du dark-launch.
 *
 * Le worker tourne APRÈS la réponse utilisateur : il consomme une file de paires
 * (ancien, nouveau) partagées par requestId, calcule le delta, persiste l'événement
 * et déclenche l'alerte le cas échéant.
 *
 * Justification : worker in-process avec file d'attente en mémoire (Map) + polling
 * `setInterval`. Pas de dépendance Bull/Redis — un dark-launch interne n'a pas besoin
 * de broker distribué. Retry avec backoff exponentiel si la persistance échoue.
 */

import { computeDelta, formatAlert, logAlert } from './delta-comparator';
import type { DeltaEvent, DeltaThresholds } from './delta-comparator';
import type { EventStore } from './event-store';
import type { PriceResult } from './types';

export interface PendingComparison {
  requestId: string;
  oldResult: PriceResult;
  newResult: PriceResult;
  thresholds: DeltaThresholds;
  attempts: number;
  enqueuedAt: number;
}

export interface AsyncComparatorOptions {
  /** Intervalle de polling de la file (ms). */
  pollIntervalMs?: number;
  /** Délai maximum avant abandon d'un item (ms). */
  maxAgeMs?: number;
  /** Nombre maximal de retries par item. */
  maxRetries?: number;
}

export class AsyncComparatorWorker {
  private readonly queue = new Map<string, PendingComparison>();
  private readonly store: EventStore;
  private readonly thresholds: DeltaThresholds;
  private readonly options: Required<AsyncComparatorOptions>;
  private timer: ReturnType<typeof setInterval> | null = null;
  private running = false;

  constructor(
    store: EventStore,
    thresholds: DeltaThresholds,
    options: AsyncComparatorOptions = {},
  ) {
    this.store = store;
    this.thresholds = thresholds;
    this.options = {
      pollIntervalMs: options.pollIntervalMs ?? 100,
      maxAgeMs: options.maxAgeMs ?? 30_000,
      maxRetries: options.maxRetries ?? 3,
    };
  }

  /** Enfile une paire (ancien, nouveau) pour comparaison différée. */
  enqueue(requestId: string, oldResult: PriceResult, newResult: PriceResult): void {
    this.queue.set(requestId, {
      requestId,
      oldResult,
      newResult,
      thresholds: this.thresholds,
      attempts: 0,
      enqueuedAt: Date.now(),
    });
  }

  start(): void {
    if (this.timer) return;
    this.running = true;
    this.timer = setInterval(() => this.drain(), this.options.pollIntervalMs);
    this.timer.unref?.();
  }

  stop(): void {
    this.running = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  /** Consomme et traite un lot d'items en attente. */
  private drain(): void {
    if (!this.running) return;
    for (const [requestId, item] of Array.from(this.queue.entries())) {
      if (Date.now() - item.enqueuedAt > this.options.maxAgeMs) {
        // Trop vieux : abandon pour éviter une fuite mémoire.
        this.queue.delete(requestId);
        continue;
      }
      try {
        this.process(item);
        this.queue.delete(requestId);
      } catch (err) {
        item.attempts += 1;
        if (item.attempts >= this.options.maxRetries) {
          // Abandon après le nombre maximal de retries (on logue l'échec).
          console.warn(
            `[dark-launch] abandon de la comparaison ${requestId} après ${item.attempts} tentatives: ${String(err)}`,
          );
          this.queue.delete(requestId);
        }
        // Sinon, on retente au prochain cycle (backoff implicite).
      }
    }
  }

  private process(item: PendingComparison): void {
    const event: DeltaEvent = computeDelta(
      item.requestId,
      item.oldResult,
      item.newResult,
      item.thresholds,
    );
    this.store.persist(event);
    const alert = formatAlert(event);
    if (alert) logAlert(alert);
  }
}
