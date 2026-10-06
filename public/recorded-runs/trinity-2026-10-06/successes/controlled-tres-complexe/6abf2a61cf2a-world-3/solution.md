# Décision de stabilité

La décision utilise un ensemble des états déjà visités. Chaque trace comprend l'entrée puis toutes les images, jusqu'à 1 ou jusqu'au premier état répété inclus. Les entrées stables sont 7, 19 et 68. Les entrées 2, 20 et 85 atteignent le cycle 4,16,37,58,89,145,42,20,4. Pour des entiers arbitrairement grands, lire les chiffres comme une chaîne décimale ou utiliser des entiers exacts; une représentation flottante peut perdre des chiffres.

2 : 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4

7 : 7 → 49 → 97 → 130 → 10 → 1

19 : 19 → 82 → 68 → 100 → 1

20 : 20 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20

68 : 68 → 100 → 1

85 : 85 → 89 → 145 → 42 → 20 → 4 → 16 → 37 → 58 → 89

## Méthode et preuve

Pour un entier positif n de d chiffres, chaque chiffre a un carré au plus 81, donc 1 <= f(n) <= 81d. Pour d >= 4, 81d < 10^(d-1) <= n : au rang 4, 324 < 1000; si cette inégalité vaut au rang d, alors 81(d+1) <= 2*81d < 2*10^(d-1) < 10^d. Ainsi tant que n >= 1000, la suite décroît strictement et finit par entrer dans [1,999]. Les petits cas sont inclus : pour d=1, f(n)<=81; pour d=2, f(n)<=162; pour d=3, f(n)<=243. L'ensemble [1,999] est donc fini et absorbant; après une étape supplémentaire on est dans [1,243], lui aussi absorbant. Dans cet ensemble fini, on atteint 1 ou on répète un état. Le test mémorise les états, s'arrête à 1 ou à la première répétition; le déterminisme de f garantit qu'une répétition avant 1 enferme la suite dans un cycle sans 1. La méthode termine donc pour tout entier positif.

## Contrôles d’acceptation

Les traces doivent terminer à 1 ou au premier état répété, chaque transition doit appliquer la somme des carrés des chiffres et la liste stable doit être [7,19,68]. Exécuter npm test sans modifier verify.cjs, package.json ou mission.txt. La preuve couvre également les cas de un à trois chiffres.

## Limites

Le test fourni contrôle les six traces et la borne sur 100000 entrées; la preuve universelle nécessite une lecture mathématique.

Aucune comparaison entre chambres, mesure de coût ou de latence, ni reçu du runtime n'est disponible.

## Preuves d’exécution et provenance

E1 : npm test, code de sortie 0. Résultat : PASS exact finite trajectories and digit-sum bound on100000 inputs; termination argument requires review. E2 : argument mathématique ci-dessus, soumis à revue. correctness=1 représente seulement le succès du test fourni; toutes les autres dimensions quantitatives restent null. Les métadonnées du contrat, le claim unique mission-answer et ses critères de falsification figurent dans answer.json. Aucun reçu du runtime n’est rempli.
