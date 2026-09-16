/**
 * Intégration — point d'entrée du pipeline de comparaison asynchrone.
 *
 * Câble ensemble : EventStore (persistance), les seuils (config), et le worker
 * de comparaison asynchrone. Le routeur (sous-système 1) appelle `storeResults()`
 * juste après avoir obtenu le résultat silencieux du nouveau moteur, puis le
 * worker compare en arrière-plan sans jamais bloquer la réponse utilisateur.
 *
 * Usage :
 *   import { createComparisonPipeline } from './integration';
 *   const pipeline = await createComparisonPipeline();
 *   pipeline.start();
 *   // ... dans le handler, après oldResult + newResult :
 *   pipeline.storeResults(requestId, oldPriceResult, newPriceResult);
 */

import { EventStore } from './event-store';
import { AsyncComparatorWorker } from './async-comparator-worker';
import { loadConfig } from './alert-config';
import type { PriceResult } from './types';

export interface ComparisonPipeline {
  store: EventStore;
  worker: AsyncComparatorWorker;
  /** Enregistre une paire de résultats pour comparaison différée. */
  storeResults(requestId: string, oldResult: PriceResult, newResult: PriceResult): void;
  /** Démarre le worker de comparaison en arrière-plan. */
  start(): void;
  /** Arrête le worker et ferme l'EventStore. */
  stop(): void;
}

export async function createComparisonPipeline(
  sqlitePath?: string,
): Promise<ComparisonPipeline> {
  const config = loadConfig();
  const store = new EventStore({ path: sqlitePath ?? config.sqlitePath, persistOnClose: true });
  await store.initialize();

  const worker = new AsyncComparatorWorker(
    store,
    { deltaAbsoluteMax: config.deltaAbsoluteMax, deltaRelativeMax: config.deltaRelativeMax },
  );

  return {
    store,
    worker,
    storeResults(requestId, oldResult, newResult) {
      worker.enqueue(requestId, oldResult, newResult);
    },
    start() {
      worker.start();
    },
    stop() {
      worker.stop();
      store.close();
    },
  };
}
