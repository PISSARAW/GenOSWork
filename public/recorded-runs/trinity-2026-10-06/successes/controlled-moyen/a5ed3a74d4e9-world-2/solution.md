# Solution argumentée

## Plan et périmètre
Lire les exigences locales, calculer les compléments, écrire la réponse puis exécuter le vérificateur. Travail limité à planned_world, sans consulter les autres chambres ni promouvoir le résultat.

## Résultat et exhaustivité
Les paires sont **(3,19)** et **(7,15)**. Chaque paire emploie deux occurrences distinctes, conformément à i<j dans verify.cjs.

Pour chaque terme a, le partenaire est nécessairement 22-a : 3 donne 19, 7 donne 15, 8 donne 14 absent, 11 exige une deuxième occurrence de 11 absente, 15 donne 7 et 19 donne 3 (déjà comptés). Tous les termes sont examinés ; chaque paire possible a donc été couverte. Les deux paires sont croissantes et ordonnées lexicographiquement.

## Acceptation et preuves
E1 : lecture directe de mission.txt et verify.cjs. E2 : calcul des six compléments ci-dessus. Le test requis est npm test ; son résultat réel sera consigné après exécution. Les critères d'acceptation et de réfutation sont détaillés dans answer.json, avec un unique claim mission-answer.

## Limites
Aucune mesure de coût, latence, robustesse générale ou effet contrefactuel. Aucun reçu du runtime fabriqué. Les outils de routage GenOS sont indisponibles. Les fichiers mission.txt, package.json et verify.cjs ne sont pas modifiés.

## Validation exécutée (E3)
Commande `npm test`, soit `node verify.cjs` : code de sortie **0**, sortie **PASS exhaustive unordered pairs**. Le vérificateur énumère les 15 choix i<j et compare exactement les paires ; il contrôle aussi les textes requis et la présence des incertitudes. correctness=1 et coverage=1 désignent uniquement cette égalité et cette couverture finie ; toutes les autres dimensions restent null. Aucun score global ni reçu du runtime n'est revendiqué.
