# Solution argumentée

Les nombres premiers sont **17, 29 et 37**.

Un entier composé n possède un diviseur entre 2 et sa racine carrée : dans n = ab, les deux facteurs ne peuvent pas être strictement supérieurs à cette racine. Toutes les divisions entières sont consignées dans divisionChecks, même après découverte d’un diviseur. Pour 17, les restes pour 2, 3, 4 sont 1, 2, 1. Pour 21, ils sont 1, 0, 1 : 21 = 3 × 7. Pour 29, les restes pour 2, 3, 4, 5 sont 1, 2, 1, 4. Pour 33, ils sont 1, 0, 1, 3 : 33 = 3 × 11. Pour 37, les restes pour 2, 3, 4, 5, 6 sont 1, 1, 1, 2, 1. Les seuls nombres premiers sont donc 17, 29 et 37.

## Divisions effectivement calculées (E-divisions)

| n | d | quotient | reste |
|---|---|---|---|
| 17 | 2 | 8 | 1 |
| 17 | 3 | 5 | 2 |
| 17 | 4 | 4 | 1 |
| 21 | 2 | 10 | 1 |
| 21 | 3 | 7 | 0 |
| 21 | 4 | 5 | 1 |
| 29 | 2 | 14 | 1 |
| 29 | 3 | 9 | 2 |
| 29 | 4 | 7 | 1 |
| 29 | 5 | 5 | 4 |
| 33 | 2 | 16 | 1 |
| 33 | 3 | 11 | 0 |
| 33 | 4 | 8 | 1 |
| 33 | 5 | 6 | 3 |
| 37 | 2 | 18 | 1 |
| 37 | 3 | 12 | 1 |
| 37 | 4 | 9 | 1 |
| 37 | 5 | 7 | 2 |
| 37 | 6 | 6 | 1 |

## Acceptation et limites

Le contrôle prévu est `npm test`, qui utilise le vérificateur indépendant existant. Les résultats exécutés seront ajoutés après le test. Aucun fichier mission.txt, package.json ou verify.cjs ne doit être modifié. Portée : cinq entiers, aucune comparaison entre chambres, mesures absentes inconnues. Les evidence IDs sont locaux et ne constituent pas des reçus du runtime.

## Résultats exécutés

- E-test : `npm test`, code de sortie 0, sortie `PASS independent trial division`.
- E-protected : comparaison SHA256, code 0, trois fichiers protégés inchangés.
- correctness = 1 : succès binaire du test fourni; coverage = 1 : cinq candidats et 19 divisions couverts (E-test, E-divisions). Toutes les autres dimensions restent null.
- Un seul claim, `mission-answer`, avec critères de réfutation détaillés dans answer.json. Aucune intervention resource_capacity ni promotion.
