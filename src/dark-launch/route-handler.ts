/**
 * Point d'entrée de l'API Next.js App Router.
 *
 * Ce fichier est le seul qui doit être importé depuis l'application Next.js.
 * Il exporte une fonction POST /api/dark-launch/price.
 *
 * Usage (dans un route handler Next.js app/api/dark-launch/price/route.ts) :
 *
 *   import { POST } from "@/dark-launch/route-handler";
 *   export const POST = POST;
 *
 * Les moteurs doivent être définis dans un fichier de configuration ou injectés
 * via une factory. Cet exemple utilise les mocks par défaut pour la démonstration.
 */

import { DarkLaunchRouter } from "./router.js";
import type { PriceEngine } from "./engine.interface.js";
import type { PriceRequest, PriceResponse } from "./types.js";

// ---------------------------------------------------------------------------
// Injection des moteurs — remplacer par les vrais moteurs en production.
// ---------------------------------------------------------------------------

/**
 * Exemple de moteur ancien (déterministe, simple).
 * Remplacer par l'instance réelle en production.
 */
export function createOldEngineMock(delayMs = 10): PriceEngine {
  return {
    async calculatePrice(origin, destination) {
      // Calcul basé sur la distance euclidienne simplifiée + facteur fixe.
      const d = Math.sqrt(
        (origin.lat - destination.lat) ** 2 +
          (origin.lng - destination.lng) ** 2
      );
      // Pause optionnelle pour simuler une latence.
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
      return Math.round(d * 1000 * 1.5); // prix en centimes
    },
  };
}

/**
 * Exemple de moteur nouveau (déterministe, peut être lent).
 * Remplacer par l'instance réelle en production.
 */
export function createNewEngineMock(
  delayMs = 20,
  shouldFail = false
): PriceEngine {
  return {
    async calculatePrice(origin, destination, context) {
      if (shouldFail) {
        throw new Error("new_engine_simulated_failure");
      }
      const d = Math.sqrt(
        (origin.lat - destination.lat) ** 2 +
          (origin.lng - destination.lng) ** 2
      );
      // Pause optionnelle pour simuler une latence (ex: appel météo externe).
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
      // Prix dynamique avec facteurs contextuels simulés.
      const weatherFactor =
        context?.weather === "rain" ? 1.2 : context?.weather === "snow" ? 1.5 : 1.0;
      const trafficFactor =
        context?.traffic === "heavy" ? 1.3 : context?.traffic === "moderate" ? 1.1 : 1.0;
      return Math.round(d * 1000 * 1.7 * weatherFactor * trafficFactor);
    },
  };
}

// ---------------------------------------------------------------------------
// Export du handler Next.js
// ---------------------------------------------------------------------------

const router = new DarkLaunchRouter({
  oldEngine: createOldEngineMock(),
  newEngine: createNewEngineMock(),
});

/**
 * Handler POST pour Next.js App Router.
 * @param request - Request Next.js
 * @returns Response JSON
 */
export async function POST(
  request: Request
): Promise<Response> {
  try {
    const body: PriceRequest = await request.json();

    // Validation basique (à compléter avec Zod en production).
    if (!body.origin || !body.destination) {
      return new Response(
        JSON.stringify({ error: "origin and destination are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response: PriceResponse = await router.handle(body);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const statusCode = 500;
    const body = JSON.stringify({
      error: "internal_error",
      message: err instanceof Error ? err.message : String(err),
    });
    return new Response(body, {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Exports supplémentaires pour les tests.
export { router as darkLaunchRouter };
