# Routeur Dark Launch — Plateforme de livraison

## Contexte

La plateforme de livraison GenoSWork a historiquelement utilisé un **ancien moteur tarifaire statique** basé sur la distance (`oldEngine`). Un **nouveau moteur dynamique** (`newEngine`) tenant compte de la distance, de la météo, du trafic et de l'historique livreur est en développement.

Le **Dark Launch** (ou *shadow mode*) permet de faire tourner le nouveau moteur en parallèle du moteur en production, **sans impact sur les clients**, pour valider sa pertinence avant la bascule.

## Architecture

```
Requête POST /api/dark-launch/price
│
├─ oldEngine.calculatePrice(origin, destination)
│   └─ Réponse utilisateur IMMÉDIATE (critique)
│
└─ newEngine.calculatePrice(origin, destination, context)  ← fire-and-forget
    ├─ Timeout configurable (par défaut 500ms)
    ├─ Circuit breaker (3 échecs consécutifs → cooldown 10s)
    └─ Résultat stocké en queue (comparaison asynchrone ultérieure)
```

### Flux

1. Le routeur reçoit `{ origin, destination, context? }`.
2. Il lance **simultanément** les deux moteurs.
3. Le résultat de l'ancien moteur est renvoyé au client **immédiatement**.
4. Le nouveau moteur s'exécute en arrière-plan :
   - Si le timeout est dépassé → le calcul est annulé (logique de timeout Promise.race).
   - Si le circuit breaker est ouvert → le calcul est sauté.
5. Le résultat nouveau est stocké dans une queue interne (FIFO, max 10 000 entrées).

## Architecture technique — routeur (sous-système 2)

Ce dossier implémente le **routeur de requêtes Dark Launch** (sous-système 2). Il est responsable de :

1. Recevoir la requête `POST /api/dark-launch/price` avec `{ origin, destination, context? }`.
2. Lancer simultanément :
   - `oldEngine.calculatePrice(origin, destination)` → réponse utilisateur (critique, renvoyée immédiatement)
   - `newEngine.calculatePrice(origin, destination, context)` → calcul silencieux fire-and-forget (ne bloque pas)
3. Le nouveau calcul est exécuté en isolation via un worker (voir `worker.ts`) avec son propre timeout (par défaut 500ms, configurable). Si le timeout est dépassé, le calcul est annulé sans impact sur la réponse utilisateur.
4. La réponse utilisateur contient uniquement le prix ancien + métadonnées de base (id requête, timestamp). Elle ne contient **pas** le prix nouveau ni les métadonnées de comparaison.
5. Le résultat nouveau est stocké dans une queue interne pour comparaison ultérieure (sous-système 3).

## Isolation du nouveau calcul

Le module supporte une abstraction de worker configurable (voir `worker.ts`) :

| Stratégie | Dépendances | Isolation | Quand choisir |
|---|---|---|---|
| `worker_threads` | Aucune (Node.js natif) | Mémoire partagée, léger, pas de sérialisation JSON | Par défaut, recommandé pour ce module |
| `child_process` / `fork` | Aucune (Node.js natif) | Isolation OS complète, crash isolé | Si le nouveau moteur est non fiable ou exécute du code tiers |
| `Bull / BullMQ / Redis` | Redis | Queue distribuée, workers scalables | Si le calcul doit être distribué sur plusieurs serveurs ou être asynchrone à long terme |

**Décision retenue :** `worker_threads` est la stratégie recommandée. L'implémentation actuelle (`createDefaultWorker` dans `worker.ts`) est une abstraction qui utilise une Promise avec `Promise.race` pour simuler le timeout. Elle peut être remplacée par un vrai `WorkerThreadAdapter` sans changer l'API publique du routeur.

## Circuit Breaker

- **Seuil** : 3 calculs consécutifs lents (timeout ou erreur).
- **Cooldown** : 10 secondes par défaut (configurable).
- **État** : `closed` (normal) / `open` (dégradé).
- Le circuit breaker est mémorisé dans le routeur — il persiste entre les requêtes.

## Logique métier des moteurs

Les moteurs doivent implémenter l'interface `PriceEngine` du fichier `engine.interface.ts`. Cette abstraction garantit que le routeur est réutilisable avec de vrais moteurs sans dépendance au code métier existant.

## Configuration

Voir `config.ts` :

| Paramètre | Par défaut | Description |
|---|---|---|
| `newEngineTimeoutMs` | 500 | Timeout maximal (ms) du nouveau moteur |
| `circuitBreakerThreshold` | 3 | Nombre d'échecs avant ouverture du circuit |
| `circuitBreakerCooldownMs` | 10 000 | Durée de cooldown (ms) après ouverture |
| `resultQueueMaxSize` | 10 000 | Taille maximale de la queue de résultats |

## Types

Voir `types.ts` :

- `PriceRequest` : `origin`, `destination`, `context?`
- `PriceResponse` : `requestId`, `timestamp`, `price`, `currency`, `engine: "old"` (ne contient **pas** le prix nouveau)
- `NewEngineResult` : résultat silencieux stocké (`requestId`, `price`, `latencyMs`, `decision`, `error?`)
- `RouterDecision` : rapport de décision interne (logué, pas renvoyé au client)

## Tests

```bash
npx vitest run src/dark-launch/router.test.ts
```

### Scénarios couverts

1. **Chemin critique indépendant** : la réponse utilisateur (prix ancien) est renvoyée même si le nouveau moteur plante ou dépasse le timeout.
2. **Timeout agnostique** : le timeout est configurable ; si le nouveau moteur est plus lent que le timeout, il est tué sans impact.
3. **Circuit breaker** : après N échecs consécutifs, le nouveau calcul est sauté jusqu'au cooldown.

## Démarrage rapide (Next.js)

Dans un projet Next.js App Router :

1. Créer le route handler `app/api/dark-launch/price/route.ts` :

```ts
import { POST } from "@/dark-launch/route-handler";
export const POST = POST;
```

2. Remplacer les mocks par les vrais moteurs dans `route-handler.ts`.

3. Tester l'endpoint :

```bash
curl -X POST http://localhost:3000/api/dark-launch/price \
  -H "Content-Type: application/json" \
  -d '{"origin":{"lat":48.8566,"lng":2.3522},"destination":{"lat":48.8738,"lng":2.2950}}'
```

## Fichiers du module

| Fichier | Responsabilité |
|---|---|
| `route-handler.ts` | Point d'entrée API Next.js + mocks de moteurs |
| `router.ts` | Logique du routeur (handle, circuit breaker, queue) |
| `worker.ts` | Abstraction du worker + timeout + runNewEngineCalculation |
| `circuit-breaker.ts` | Circuit breaker (seuil, cooldown, état) |
| `config.ts` | Configuration centralisée (thresholds, timeouts) |
| `types.ts` | Types partagés (PriceRequest, PriceResponse, NewEngineResult…) |
| `engine.interface.ts` | Interface `PriceEngine` que les moteurs doivent implémenter |
| `router.test.ts` | Tests unitaires du routeur |
| `README.md` | Documentation du module (ce fichier) |
| `ADR.md` | Architecture Decision Record |

## Évolution future

- Stockage persistant des résultats (base de données) pour comparaison à long terme (sous-système 3).
- Dashboard de comparaison (prix ancien vs nouveau).
- Basculer sur le nouveau moteur quand la confiance est suffisante.
- Ajout d'un middleware de log structuré (Pino / Winston).
- Implémentation réelle du worker avec `worker_threads` ou `child_process`.
