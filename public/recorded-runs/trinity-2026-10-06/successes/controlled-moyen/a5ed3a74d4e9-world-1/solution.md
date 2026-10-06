# Solution argumentée

Les paires sont **(3,19)** et **(7,15)**.

Pour une paire croissante (a,b), a+b=22 impose a<11. Dans la liste, a appartient donc à {3,7,8}. Le complément est unique : 19 pour 3, 15 pour 7, 14 pour 8. Seuls 19 et 15 sont présents. Le couple (11,11) est exclu car il faudrait deux occurrences distinctes de 11. Ce raisonnement couvre tous les candidats sans doublon.

## Acceptation et preuves

E-source : contrat et vérificateur locaux lus, sans modification.
E-proof : preuve ci-dessus, également inscrite dans answer.json.
E-test : résultat de npm test consigné dans answer.json après exécution. Le programme énumère indépendamment les 15 couples de positions i<j, compare exactement les paires et contrôle la présence des arguments et limites.

## Portée et limites

Seule la mission assignée est traitée, dans la branche isolée, sans consultation d'autres chambres. La convention d'indices distincts vient du vérificateur. Les performances et la robustesse sur d'autres entrées ne sont pas mesurées. Les reçus de vérification sont réservés au runtime. La condition contrefactuelle assignée est documentée avec la dimension resource_capacity; aucune comparaison causale n'est revendiquée.

Résultat exécuté E-test : npm test, code de sortie 0, sortie PASS exhaustive unordered pairs. Correctness=1 pour la comparaison exacte et coverage=1 pour les 15 couples sur 15 de cette entrée; toutes les autres dimensions restent inconnues (null).
