# Solution argumentée

Un entier composé possède un diviseur entier entre 2 et sa racine carrée. Pour 17, les restes pour 2, 3, 4 sont 1, 2, 1. Pour 21, ils sont 1, 0, 1 : 21 = 3 × 7. Pour 29, les restes pour 2, 3, 4, 5 sont 1, 2, 1, 4. Pour 33, ils sont 1, 0, 1, 3 : 33 = 3 × 11. Pour 37, les restes pour 2, 3, 4, 5, 6 sont 1, 1, 1, 2, 1. Donc seuls 17, 29 et 37 sont premiers.

La vérification couvre chaque diviseur entier de 2 à floor(sqrt(n)), même après un reste nul. Chaque ligne donne n = divisor × quotient + remainder. Si n = ab est composé et a et b dépassent tous deux sqrt(n), alors ab > n, contradiction : cette borne suffit. Les cinq entiers sont supérieurs à 1. Les résultats mesurés sont limités à cette liste et au vérificateur local.

## Divisions entières

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

## Preuves et acceptation

E1 : 19 divisions exécutées, couvrant les 19 diviseurs requis.
E2 : npm test, code de sortie 0. Sortie réelle :
```
> test
> node verify.cjs

PASS independent trial division
```
E3 : fichiers protégés inchangés selon comparaison SHA-256 : true.

## Limites et provenance

- Aucune incertitude arithmétique identifiée pour ces cinq petits entiers.
- Robustesse hors de cette liste, coût, latence, risque et reproductibilité indépendante non mesurés.
- Aucun reçu runtime ni résultat des autres chambres disponible.

Méthode directe locale, chambre scellée direct. Aucun effet contrefactuel mesuré ; dimension resource_capacity. Aucun reçu du runtime créé. Les dimensions non mesurées du vecteur restent null.

Claim unique : mission-answer. Critère de réfutation : Réfuter si un diviseur entier d entre 2 et floor(sqrt(n)) divise 17, 29 ou 37 ; si 21 != 3*7 ou 33 != 3*11 ; si une identité n=d*q+r est fausse ou r est hors de [0,d) ; si primes diffère de [17,29,37] ; ou si npm test échoue.
