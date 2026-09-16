# ADR — Routeur Dark Launch pour le nouveau moteur tarifaire

**Date** : 2026-09-16
**Statut** : Accepté
**Auteurs** : GenoSWork team

## Contexte

La plateforme de livraison GenoSWork dépend d'un moteur tarifaire statique basé sur la distance, en production depuis plusieurs années. Un nouveau moteur dynamique (distance + météo + trafic + historique livreur) est en cours de développement. Avant de le déployer en production, nous devons le valider dans un mode *dark launch* (shadow mode) : le nouveau moteur calcule en parallèle sans impacter les clients, et les résultats sont comparés pour mesurer la corrélation avec l'ancien moteur.

## Décisions

### 1. Isolation du nouveau calcul

**Choix :** `worker_threads` avec `Promise.race` pour le timeout.

**Justification :**
- `worker_threads` (Node.js natif) permet une isolation légère sans sérialisation JSON coûteuse pour les résultats.
- `child_process` / `fork` apporte une isolation OS complète mais au prix d'un surcoût de démarrage et d'une IPC plus lourde — inutile si les deux moteurs vivent dans le même process Next.js et que l'objectif est de ne pas bloquer la réponse utilisateur.
- Bull/BullMQ/Redis ajoute une dépendance externe (Redis) et de la latence réseau pour un besoin interne au serveur — surcoût opérationnel non justifié.
- Le timeout est implémenté par `Promise.race` entre le calcul et un timer. Une implémentation avec `worker_threads` réel peut être injectée sans changer l'API publique.

### 2. Circuit breaker

- Seuil : 3 échecs consécutifs (timeout ou erreur).
- Cooldown : 10 secondes par défaut.
- Après ouverture, le nouveau calcul est sauté et le résultat est marqué `circuit_breaker_open`.
- Le circuit se réinitialise automatiquement après le cooldown.

### 3. Réponse utilisateur

La réponse ne contient **que** le prix de l'ancien moteur + métadonnées minimales (`requestId`, `timestamp`, `engine: "old"`). Le prix nouveau et les métadonnées de comparaison ne sont **jamais** envoyés au client.

### 4. Stockage des résultats

Les résultats du nouveau moteur sont stockés dans une queue FIFO en mémoire (max 10 000 entrées). Un sous-système externe consomme la queue pour comparaison à long terme. La queue est limitée en taille pour éviter les fuites mémoire.

### 5. Logs structurés

Chaque requête a un UUID (`requestId`). Le routeur logue :
- `requestId`
- `timestamp`
- `oldEngineLatencyMs`
- `newEngineDecision` (launched / skipped_timeout / circuit_breaker)

Les logs sont au format JSON et utilisent `console.log` pour l'instant ; en production ils passeront par un logger structuré (Pino, Winston).

## Conséquences

- Le chemin critique (réponse utilisateur) n'est **pas** impacté par la lenteur ou les pannes du nouveau moteur.
- Le nouveau moteur peut être testé avec différents contextes (météo, trafic) sans modifier la logique de livraison existante.
- L'infrastructure de comparaison (dashboard, stockage persistant) doit être mise en place séparément.
