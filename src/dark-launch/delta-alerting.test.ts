import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { EventStore } from './event-store';
import { AsyncComparatorWorker } from './async-comparator-worker';
import { computeDelta } from './delta-comparator';
import type { PriceResult } from './types';

const THRESHOLDS = { deltaAbsoluteMax: 5, deltaRelativeMax: 10 };

function makeResult(requestId: string, price: number): PriceResult {
  return {
    requestId,
    price,
    timestamp: Date.now(),
    context: { weather: 'rain', traffic: 'heavy', courierScore: 40, distance: 12 },
  };
}

describe('Pipeline de comparaison asynchrone et alerting', () => {
  let store: EventStore;

  beforeAll(async () => {
    store = new EventStore();
    await store.initialize();
  });

  afterAll(() => {
    store.close();
  });

  describe('computeDelta()', () => {
    it('(a) delta sous seuil → pas d\'alerte', () => {
      const event = computeDelta(
        'r1',
        makeResult('r1', 100),
        makeResult('r1', 102),
        THRESHOLDS,
      );
      expect(event.deltaAbsolute).toBeCloseTo(2, 5);
      expect(event.deltaRelative).toBeCloseTo(2, 5);
      expect(event.alertTriggered).toBe(false);
      expect(event.deltaSign).toBe(1);
    });

    it('(b) delta au-dessus du seuil absolu → alerte', () => {
      const event = computeDelta(
        'r2',
        makeResult('r2', 100),
        makeResult('r2', 120),
        THRESHOLDS,
      );
      expect(event.deltaAbsolute).toBeCloseTo(20, 5);
      expect(event.alertTriggered).toBe(true);
    });

    it('(c) delta au-dessus du seuil relatif → alerte', () => {
      // Petit prix : 1€ d'écart = 100% relatif, sous le seuil absolu de 5€.
      const event = computeDelta(
        'r3',
        makeResult('r3', 1),
        makeResult('r3', 2),
        THRESHOLDS,
      );
      expect(event.deltaAbsolute).toBeCloseTo(1, 5);
      expect(event.deltaRelative).toBeCloseTo(100, 5);
      expect(event.alertTriggered).toBe(true);
    });

    it('calcule le signe négatif quand le nouveau prix est inférieur', () => {
      const event = computeDelta(
        'r4',
        makeResult('r4', 100),
        makeResult('r4', 80),
        THRESHOLDS,
      );
      expect(event.deltaSign).toBe(-1);
    });
  });

  describe('EventStore', () => {
    it('(d) persiste et relit un événement par requestId', () => {
      const event = computeDelta(
        'p1',
        makeResult('p1', 50),
        makeResult('p1', 60),
        THRESHOLDS,
      );
      store.persist(event);
      const recovered = store.getByRequestId('p1');
      expect(recovered).toBeDefined();
      expect(recovered!.deltaAbsolute).toBeCloseTo(10, 5);
      expect(recovered!.alertTriggered).toBe(true);
    });
  });

  describe('AsyncComparatorWorker', () => {
    it('(e) compare un lot de requêtes en arrière-plan', async () => {
      const worker = new AsyncComparatorWorker(store, THRESHOLDS, {
        pollIntervalMs: 20,
        maxAgeMs: 5000,
      });
      // 3 requêtes : 2 sous seuil, 1 au-dessus.
      worker.enqueue('b1', makeResult('b1', 100), makeResult('b1', 101));
      worker.enqueue('b2', makeResult('b2', 100), makeResult('b2', 200));
      worker.enqueue('b3', makeResult('b3', 30), makeResult('b3', 31));
      worker.start();

      // Attend que la file soit vidée (polling).
      await new Promise((resolve) => setTimeout(resolve, 300));
      worker.stop();

      expect(store.getByRequestId('b1')).toBeDefined();
      expect(store.getByRequestId('b2')!.alertTriggered).toBe(true);
      expect(store.getByRequestId('b3')).toBeDefined();
    });
  });
});
