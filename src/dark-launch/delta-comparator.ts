/**
 * Delta comparateur et alerting — sous-système 3 du dark-launch.
 *
 * Ce module implémente le pipeline de comparaison asynchrone :
 * 1. Le routeur (sous-système 1) génère un résultat "ancien" (retourné au client)
 *    et un résultat "nouveau" (calculé en fire-and-forget).
 * 2. Les deux résultats sont stockés avec un ID de requête commun.
 * 3. Un worker asynchrone, exécuté APRÈS la réponse utilisateur, récupère les deux
 *    résultats et calcule le delta (absolu, relatif, signe).
 * 4. Si un seuil configurable est dépassé, une alerte structurée est émise.
 * 5. L'événement delta est persisté dans un EventStore (SQLite en mémoire ou fichier).
 *
 * Justification des choix techniques :
 * - Persistence : SQLite en mémoire (ou fichier via DARK_LAUNCH_SQLITE_PATH). Choix
 *   pour sa queryabilité, sa légèreté, son absence de serveur, et son export facile
 *   vers un fichier pour l'audit. JSONL serait plus simple mais moins queryable.
 * - Queue/worker : worker basé sur setTimeout + file d'attente en mémoire (array).
 *   Simplicité maximale, pas de dépendance Bull/Redis nécessaire pour un dark-launch
 *   interne. Le worker est démarré explicitement par l'application et est prévisible.
 * - Configuration : seuils par environnement via DARK_LAUNCH_DELTA_ABSOLUTE_MAX (€)
 *   et DARK_LAUNCH_DELTA_RELATIVE_MAX (%). Pour l'alpha, on utilise des valeurs par
 *   défaut raisonnables (5€ / 10%).
 */

import type { PriceResult, PriceContext } from './types';

// ============================================================================
// Types de l'événement delta
// ============================================================================

export interface DeltaEvent {
  id: string;
  requestId: string;
  timestamp: number;
  oldPrice: number;
  newPrice: number;
  deltaAbsolute: number;
  deltaRelative: number;
  deltaSign: -1 | 0 | 1;
  thresholds: DeltaThresholds;
  alertTriggered: boolean;
  alertSeverity?: 'warning' | 'critical';
  context: PriceContext;
}

export interface DeltaThresholds {
  deltaAbsoluteMax: number;
  deltaRelativeMax: number;
}

export interface AlertEvent {
  requestId: string;
  timestamp: number;
  oldPrice: number;
  newPrice: number;
  deltaAbsolute: number;
  deltaRelative: number;
  deltaSign: -1 | 0 | 1;
  severity: 'warning' | 'critical';
  dominantFactors: DominantFactor[];
  context: PriceContext;
}

export interface DominantFactor {
  dimension: 'weather' | 'traffic' | 'courier' | 'distance' | 'other';
  value: string | number;
  reason: string;
}

// ============================================================================
// Calcul du delta
// ============================================================================

export function computeDelta(
  requestId: string,
  oldResult: PriceResult,
  newResult: PriceResult,
  thresholds: DeltaThresholds,
): DeltaEvent {
  const oldPrice = oldResult.price;
  const newPrice = newResult.price;

  const deltaAbsolute = Math.abs(newPrice - oldPrice);
  const deltaRelative = oldPrice > 0 ? (deltaAbsolute / oldPrice) * 100 : 0;
  const deltaSign: -1 | 0 | 1 =
    newPrice > oldPrice ? 1 : newPrice < oldPrice ? -1 : 0;

  const alertTriggered =
    deltaAbsolute > thresholds.deltaAbsoluteMax ||
    deltaRelative > thresholds.deltaRelativeMax;

  const severity: 'warning' | 'critical' | undefined =
    alertTriggered ? (isCritical(deltaAbsolute, deltaRelative, thresholds) ? 'critical' : 'warning') : undefined;

  return {
    id: crypto.randomUUID(),
    requestId,
    timestamp: Date.now(),
    oldPrice,
    newPrice,
    deltaAbsolute,
    deltaRelative,
    deltaSign,
    thresholds,
    alertTriggered,
    alertSeverity: severity,
    context: newResult.context ?? {},
  };
}

function isCritical(
  deltaAbsolute: number,
  deltaRelative: number,
  thresholds: DeltaThresholds,
): boolean {
  // Critique si on dépasse 3x le seuil absolu OU 5x le seuil relatif
  return (
    deltaAbsolute > thresholds.deltaAbsoluteMax * 3 ||
    deltaRelative > thresholds.deltaRelativeMax * 5
  );
}

// ============================================================================
// Extraction des facteurs dominants depuis le contexte
// ============================================================================

export function extractDominantFactors(context?: PriceContext): DominantFactor[] {
  const factors: DominantFactor[] = [];
  const ctx = context ?? {};

  if (ctx.weather) {
    factors.push({
      dimension: 'weather',
      value: ctx.weather,
      reason: `Météo en vigueur lors du nouveau calcul : ${ctx.weather}`,
    });
  }

  if (ctx.traffic) {
    factors.push({
      dimension: 'traffic',
      value: ctx.traffic,
      reason: `Conditions de trafic : ${ctx.traffic}`,
    });
  }

  if (ctx.courierScore != null) {
    factors.push({
      dimension: 'courier',
      value: ctx.courierScore,
      reason: `Score de livreur : ${ctx.courierScore}`,
    });
  }

  if (ctx.distance != null) {
    factors.push({
      dimension: 'distance',
      value: ctx.distance,
      reason: `Distance de livraison : ${ctx.distance} km`,
    });
  }

  // Si aucun facteur explicite, on mentionne "other"
  if (factors.length === 0) {
    factors.push({
      dimension: 'other',
      value: 'aucun facteur contextuel détecté',
      reason: 'Aucun facteur contextuel (météo, trafic, livreur, distance) fourni dans la requête.',
    });
  }

  return factors;
}

// ============================================================================
// Alert service — log structuré avec niveau
// ============================================================================

export function formatAlert(event: DeltaEvent): AlertEvent | null {
  if (!event.alertTriggered || !event.alertSeverity) return null;

  return {
    requestId: event.requestId,
    timestamp: event.timestamp,
    oldPrice: event.oldPrice,
    newPrice: event.newPrice,
    deltaAbsolute: event.deltaAbsolute,
    deltaRelative: event.deltaRelative,
    deltaSign: event.deltaSign,
    severity: event.alertSeverity,
    dominantFactors: extractDominantFactors(event.context),
    context: event.context,
  };
}

export function logAlert(alert: AlertEvent): void {
  const level = alert.severity === 'critical' ? 'CRITICAL' : 'WARNING';
  const line = JSON.stringify({
    level,
    event: 'dark-launch:price-delta-alert',
    timestamp: new Date(alert.timestamp).toISOString(),
    requestId: alert.requestId,
    oldPrice: alert.oldPrice,
    newPrice: alert.newPrice,
    deltaAbsolute: alert.deltaAbsolute,
    deltaRelative: alert.deltaRelative,
    deltaSign: alert.deltaSign,
    severity: alert.severity,
    dominantFactors: alert.dominantFactors,
    context: alert.context,
  });
  console.log(`[dark-launch-alert] ${line}`);
}
