/**
 * Interface que doivent implémenter les anciens et nouveaux moteurs de calcul.
 *
 * Cette abstraction garantit que le routeur est réutilisable avec de vrais moteurs
 * sans dépendance au code métier existant.
 */

export interface PriceEngine {
  /**
   * Calcule un prix de livraison.
   * Retourne une promesse résolue avec le prix (en centimes ou unité monétaire).
   * Le moteur DOIT gérer lui-même ses propres erreurs internes.
   */
  calculatePrice(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    context?: Record<string, unknown>
  ): Promise<number>;
}
