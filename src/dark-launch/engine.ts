/**
 * Moteur de tarification dynamique — sous-système 2 du dark-launch.
 *
 * Moteur PUR et SYNCHRONE (aucune logique asynchrone ici) qui calcule un prix
 * de livraison à partir de 4 facteurs pondérés :
 *   1. DISTANCE  — base linéaire (+ composante quadratique pour longs trajets)
 *   2. MÉTÉO     — surcharge multiplicative (rain/snow/storm)
 *   3. TRAFIC    — densité (0..1) → facteur multiplicatif jusqu'à trafficDensityMax
 *   4. LIVREUR   — réputation (0..100) → réduction/surcharge
 *
 * Formule :
 *   prix = base_distance × facteur_météo × facteur_trafic × facteur_livreur + frais_fixes
 *   base_distance = distance_km × tarif_par_km
 *
 * Le moteur est appelé en silence (fire-and-forget) par le routeur (sous-système 1)
 * et ne bloque jamais la réponse utilisateur.
 */

import { config } from './config';
import type { GeoPoint } from './types';

/** Conditions météo reconnues (clé du tableau config.weatherFactors). */
export type WeatherCondition = 'clear' | 'rain' | 'snow' | 'storm';

/** Historique / réputation d'un livreur. */
export interface CourierHistory {
  /** Score de réputation 0..100. */
  score: number;
}

/** Entrée du moteur de tarification dynamique. */
export interface PricingInput {
  origin: GeoPoint;
  destination: GeoPoint;
  weather?: WeatherCondition | string;
  /** Densité du trafic 0..1 (0 = fluide, 1 = bouchon maximal). */
  trafficDensity?: number;
  courierId?: string;
  courierHistory?: CourierHistory;
}

/** Décomposition du prix, facteur par facteur (pour audit / explication). */
export interface PricingResult {
  price: number;
  breakdown: {
    distance: number;
    weather: number;
    traffic: number;
    courier: number;
    fixed: number;
  };
  factors: {
    weatherFactor: number;
    trafficFactor: number;
    courierFactor: number;
  };
  explanation: string;
}

/** Distance haversine en km entre deux points géographiques. */
export function haversineKm(origin: GeoPoint, destination: GeoPoint): number {
  const R = 6371; // rayon terrestre en km
  const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
  const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((origin.lat * Math.PI) / 180) *
      Math.cos((destination.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function validateInput(input: PricingInput): void {
  if (!input.origin || !input.destination) {
    throw new Error('origin and destination are required');
  }
  const dist = haversineKm(input.origin, input.destination);
  if (!Number.isFinite(dist) || dist < 0) {
    throw new Error('Distance must be a non-negative finite number');
  }
  if (
    input.trafficDensity !== undefined &&
    (input.trafficDensity < 0 || input.trafficDensity > 1)
  ) {
    throw new Error('trafficDensity must be between 0 and 1');
  }
  if (
    input.courierHistory !== undefined &&
    (input.courierHistory.score < 0 || input.courierHistory.score > 100)
  ) {
    throw new Error('courier score must be between 0 and 100');
  }
}

function computeWeatherFactor(weather?: string): number {
  if (!weather) return 1.0;
  const w = weather.toLowerCase() as keyof typeof config.weatherFactors;
  return config.weatherFactors[w] ?? 1.0; // météo inconnue → neutre
}

function computeTrafficFactor(density?: number): number {
  if (density === undefined) return 1.0;
  return 1.0 + density * (config.trafficDensityMax - 1.0);
}

function computeCourierFactor(courierId?: string, history?: CourierHistory): number {
  if (!courierId || !history) return 1.0; // livreur inconnu/nouveau → neutre
  const score = history.score;
  if (score >= config.courierGoodThreshold) return config.courierGoodFactor;
  if (score <= config.courierBadThreshold) return config.courierBadFactor;
  return 1.0;
}

function computeDistanceCost(distanceKm: number): number {
  const linear = distanceKm * config.ratePerKm;
  // Composante quadratique : surcoût pour les très longs trajets.
  if (distanceKm > config.quadraticThresholdKm) {
    const excess = distanceKm - config.quadraticThresholdKm;
    return linear + excess * excess * config.quadraticCoefficient;
  }
  return linear;
}

function formatExplanation(
  result: PricingResult,
  distanceKm: number,
): string {
  const lines = [
    `Prix de livraison: ${result.price.toFixed(2)}€`,
    `— Distance (${distanceKm.toFixed(1)} km): base ${result.breakdown.distance.toFixed(2)}€`,
  ];
  if (result.factors.weatherFactor !== 1.0) {
    lines.push(
      `— Météo (×${result.factors.weatherFactor.toFixed(2)}): ${result.breakdown.weather >= 0 ? '+' : ''}${result.breakdown.weather.toFixed(2)}€`,
    );
  }
  if (result.factors.trafficFactor !== 1.0) {
    lines.push(
      `— Trafic (×${result.factors.trafficFactor.toFixed(2)}): ${result.breakdown.traffic >= 0 ? '+' : ''}${result.breakdown.traffic.toFixed(2)}€`,
    );
  }
  if (result.factors.courierFactor !== 1.0) {
    const label =
      result.factors.courierFactor < 1.0 ? 'réduction livreur' : 'surcharge livreur';
    lines.push(
      `— Livreur (${label}, ×${result.factors.courierFactor.toFixed(2)}): ${result.breakdown.courier >= 0 ? '+' : ''}${result.breakdown.courier.toFixed(2)}€`,
    );
  }
  lines.push(`— Frais fixes: ${result.breakdown.fixed.toFixed(2)}€`);
  return lines.join('\n');
}

/**
 * Calcule le prix dynamique. Fonction pure et synchrone.
 */
export function computePricing(input: PricingInput): PricingResult {
  validateInput(input);

  const distanceKm = haversineKm(input.origin, input.destination);
  const baseDistance = computeDistanceCost(distanceKm);

  const weatherFactor = computeWeatherFactor(input.weather);
  const trafficFactor = computeTrafficFactor(input.trafficDensity);
  const courierFactor = computeCourierFactor(input.courierId, input.courierHistory);

  const weatherCost = baseDistance * (weatherFactor - 1.0);
  const trafficCost = baseDistance * (trafficFactor - 1.0);
  const courierCost = baseDistance * (courierFactor - 1.0);

  const price =
    baseDistance * weatherFactor * trafficFactor * courierFactor + config.fixedFees;

  const result: PricingResult = {
    price,
    breakdown: {
      distance: baseDistance,
      weather: weatherCost,
      traffic: trafficCost,
      courier: courierCost,
      fixed: config.fixedFees,
    },
    factors: { weatherFactor, trafficFactor, courierFactor },
    explanation: '',
  };
  result.explanation = formatExplanation(result, distanceKm);
  return result;
}
