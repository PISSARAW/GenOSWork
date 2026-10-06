# Décision de stabilité

On calcule exactement la somme des carrés des chiffres en base dix. On conserve un ensemble des états déjà rencontrés et une trace incluant l’entrée. Si l’état est 1, on conclut stable; sinon, si cet état a déjà été rencontré, on conclut non stable. À chaque nouvelle étape, on marque l’état courant, calcule f et ajoute le résultat à la trace. Le premier état répété figure donc une seconde fois en fin de trace. Les entrées stables sont 7, 19 et 68. Les entrées 2, 20 et 85 rejoignent un cycle qui évite 1. Pour des entiers arbitrairement grands, utiliser une chaîne décimale et une arithmétique entière exacte; Number en JavaScript ne représente pas tous les entiers au-delà de 2^53-1.

## Trajectoires exactes

- 2 : 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 ; non stable
- 7 : 7 → 49 → 97 → 130 → 10 → 1 ; stable
- 19 : 19 → 82 → 68 → 100 → 1 ; stable
- 20 : 20 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 ; non stable
- 68 : 68 → 100 → 1 ; stable
- 85 : 85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89 ; non stable

## Preuve de terminaison

Pour un entier positif de d chiffres décimaux, chaque carré de chiffre est au plus 81, donc f(n)<=81d. Pour d>=4, 81d<10^(d-1)<=n : la première inégalité vaut pour d=4 (324<1000) et se conserve par induction, car d+1<=10d. Ainsi, tant que n>=1000, chaque étape diminue strictement cet entier positif; on atteint donc un entier inférieur à 1000 en un nombre fini d’étapes. L’ensemble {1,...,999} est absorbant : ses éléments ont au plus trois chiffres et 1<=f(n)<=243<=999. Les petits cas d=1,2,3 sont donc tous inclus, sans supposer une décroissance pour eux. Dans cet ensemble fini, on atteint 1 ou on répète un état après au plus 999 transitions. Puisque f est déterministe, un état répété avant 1 enferme la suite dans un cycle ne contenant pas 1. La mémorisation des états visités décide donc toujours la stabilité.

## Critères d’acceptation

Les six traces doivent être exactes et finir à 1 ou au premier état répété. La liste croissante doit être [7, 19, 68]. La preuve doit couvrir tous les entiers positifs et les petits cas. Exécuter npm test sans modifier verify.cjs, package.json ni mission.txt. Le test vérifie les traces et la borne sur 100000 entrées; la preuve générale reste à examiner.

## Preuves et limites d’exécution

E1 : npm test (node verify.cjs), code de sortie 0. Sortie observée : `PASS exact finite trajectories and digit-sum bound on100000 inputs; termination argument requires review`. Référence de sortie locale : b574ac. Il ne s’agit pas d’un reçu attribué par le runtime.

Le seul claim est mission-answer dans answer.json, avec ses critères détaillés de falsification. Correctness=1 signifie que ce test réussit; coverage=1 signifie six entrées sur six contrôlées. Les autres dimensions ne sont pas mesurées. La condition resource_capacity assignée est exécutée sans intervention comparative; aucun effet causal n’est affirmé. Aucun outil d’organisation GenOS callable n’a été découvert. Les deux livrables seuls ont été écrits.
