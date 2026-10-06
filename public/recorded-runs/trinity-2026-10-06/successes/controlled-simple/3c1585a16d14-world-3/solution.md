# Solution argumentée

Les nombres premiers sont **17, 29 et 37**. Les nombres 21 et 33 sont composés : 21 = 3 × 7 et 33 = 3 × 11.

Un entier composé possède un diviseur entre 2 et sa racine carrée. Les restes pour 17 aux diviseurs 2,3,4 sont 1,2,1 ; pour 21 : 1,0,1 ; pour 29 aux diviseurs 2,3,4,5 : 1,2,1,4 ; pour 33 : 1,0,1,3 ; pour 37 aux diviseurs 2,3,4,5,6 : 1,1,1,2,1. Ainsi 17,29,37 sont premiers ; 21=3×7 et 33=3×11 sont composés.

## Divisions exhaustives (preuve E1)

### 17 : limite 4

17 = 2 × 8 + 1

17 = 3 × 5 + 2

17 = 4 × 4 + 1

### 21 : limite 4

21 = 2 × 10 + 1

21 = 3 × 7 + 0

21 = 4 × 5 + 1

### 29 : limite 5

29 = 2 × 14 + 1

29 = 3 × 9 + 2

29 = 4 × 7 + 1

29 = 5 × 5 + 4

### 33 : limite 5

33 = 2 × 16 + 1

33 = 3 × 11 + 0

33 = 4 × 8 + 1

33 = 5 × 6 + 3

### 37 : limite 6

37 = 2 × 18 + 1

37 = 3 × 12 + 1

37 = 4 × 9 + 1

37 = 5 × 7 + 2

37 = 6 × 6 + 1

## Acceptation et falsification

Réfuter si un entier déclaré premier a un reste nul pour un diviseur entier de 2 à floor(sqrt(n)), si un entier exclu ne possède aucun tel diviseur, si une division ne respecte pas n=d*q+r et 0<=r<d, si un diviseur manque, si la liste diffère de [17,29,37] ou si npm test échoue.

E2 correspond à npm test, dont le résultat effectivement exécuté sera consigné dans answer.json. Les fichiers verify.cjs, package.json et mission.txt ne sont pas modifiés.

Les dimensions non mesurées restent null. Aucun reçu runtime ni résultat d’une autre chambre n’est inventé. L’intervention contrefactuelle décrit la condition assignée ; son effet reste inconnu.

Résultat exécuté E2 : `npm test`, code de sortie 0, sortie `PASS independent trial division`. Correctness = 1 (test local réussi), coverage = 1 (5/5 entiers et 19/19 divisions). Les autres dimensions sont non mesurées.
