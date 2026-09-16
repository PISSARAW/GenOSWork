import { describe, it, expect } from 'vitest';
import { computePricing, haversineKm } from './engine';
import { config } from './config';
import type { GeoPoint } from './types';

const PARIS: GeoPoint = { lat: 48.8566, lng: 2.3522 };
const LYON: GeoPoint = { lat: 45.764, lng: 4.8357 };

describe('Moteur de tarification dynamique', () => {
  describe('haversineKm()', () => {
    it('calcule la distance Paris–Lyon (~390-410 km)', () => {
      const d = haversineKm(PARIS, LYON);
      expect(d).toBeGreaterThan(380);
      expect(d).toBeLessThan(420);
    });

    it('retourne 0 pour deux points identiques', () => {
      expect(haversineKm(PARIS, PARIS)).toBe(0);
    });
  });

  describe('computePricing()', () => {
    it('(a) cas nominal avec les 4 facteurs', () => {
      const result = computePricing({
        origin: PARIS,
        destination: LYON,
        weather: 'rain',
        trafficDensity: 0.5,
        courierId: 'c1',
        courierHistory: { score: 90 },
      });
      expect(result.price).toBeGreaterThan(0);
      expect(result.factors.weatherFactor).toBe(config.weatherFactors.rain);
      expect(result.factors.trafficFactor).toBeGreaterThan(1.0);
      expect(result.factors.courierFactor).toBe(config.courierGoodFactor);
      expect(result.breakdown.fixed).toBe(config.fixedFees);
    });

    it('(b) sans météo, trafic ni historique → facteurs neutres', () => {
      const result = computePricing({ origin: PARIS, destination: LYON });
      expect(result.factors.weatherFactor).toBe(1.0);
      expect(result.factors.trafficFactor).toBe(1.0);
      expect(result.factors.courierFactor).toBe(1.0);
    });

    it('(c) livreur nouveau (sans historique) → facteur neutre', () => {
      const result = computePricing({
        origin: PARIS,
        destination: LYON,
        courierId: 'nouveau',
      });
      expect(result.factors.courierFactor).toBe(1.0);
    });

    it('(d) livreur excellent (score > seuil) → réduction ×0.95', () => {
      const result = computePricing({
        origin: PARIS,
        destination: LYON,
        courierId: 'c1',
        courierHistory: { score: 95 },
      });
      expect(result.factors.courierFactor).toBe(config.courierGoodFactor);
      expect(result.factors.courierFactor).toBeLessThan(1.0);
    });

    it('(e) livreur mauvais (score < seuil) → surcharge ×1.10', () => {
      const result = computePricing({
        origin: PARIS,
        destination: LYON,
        courierId: 'c2',
        courierHistory: { score: 20 },
      });
      expect(result.factors.courierFactor).toBe(config.courierBadFactor);
      expect(result.factors.courierFactor).toBeGreaterThan(1.0);
    });

    it('(f) météo extrême → surcharge maximale', () => {
      const storm = computePricing({
        origin: PARIS,
        destination: LYON,
        weather: 'storm',
      });
      const clear = computePricing({ origin: PARIS, destination: LYON, weather: 'clear' });
      expect(storm.factors.weatherFactor).toBe(config.weatherFactors.storm);
      expect(storm.price).toBeGreaterThan(clear.price);
    });

    it('(g) tarif par km + frais fixes configurables', () => {
      const result = computePricing({ origin: PARIS, destination: LYON });
      // Le breakdown.distance = linéaire + composante quadratique (Paris–Lyon
      // dépasse quadraticThresholdKm). On vérifie la cohérence de la formule :
      // price = distance × facteurs(1.0) + frais fixes.
      const expectedPrice = result.breakdown.distance * 1.0 * 1.0 * 1.0 + config.fixedFees;
      expect(result.price).toBeCloseTo(expectedPrice, 2);
      expect(result.breakdown.fixed).toBe(config.fixedFees);
    });

    it('applique la composante quadratique pour les longs trajets', () => {
      // Deux points éloignés : dépassement du seuil quadratique.
      const far = { lat: 48.85, lng: 2.35 };
      const veryFar = { lat: -33.86, lng: 151.2 }; // Sydney
      const result = computePricing({ origin: far, destination: veryFar });
      const d = haversineKm(far, veryFar);
      expect(d).toBeGreaterThan(config.quadraticThresholdKm);
      const linear = d * config.ratePerKm;
      expect(result.breakdown.distance).toBeGreaterThan(linear);
    });

    it('valide les entrées : trafficDensity hors plage → erreur', () => {
      expect(() =>
        computePricing({ origin: PARIS, destination: LYON, trafficDensity: 1.5 }),
      ).toThrow();
    });

    it('valide les entrées : score livreur hors plage → erreur', () => {
      expect(() =>
        computePricing({
          origin: PARIS,
          destination: LYON,
          courierId: 'c3',
          courierHistory: { score: 150 },
        }),
      ).toThrow();
    });

    it('génère une explication lisible', () => {
      const result = computePricing({ origin: PARIS, destination: LYON, weather: 'rain' });
      expect(result.explanation).toContain('Prix de livraison');
      expect(result.explanation).toContain('Météo');
    });
  });
});
