# Dossier argumenté

Les entiers stables parmi les entrées sont **7, 19 et 68**. Les traces exactes figurent dans answer.json et incluent le premier état répété pour les entrées instables.

## Plan et méthode générale

1. Lire un entier décimal positif en précision exacte.
2. Initialiser une trace avec cet entier et un ensemble vide des états vus.
3. Tant que l'état n'est pas 1 et n'est pas déjà vu, le mémoriser, calculer la somme des carrés de ses chiffres et ajouter le résultat à la trace.
4. Accepter si l'état final est 1 ; sinon refuser.

Un état répété avant 1 impose un cycle : la transformation est déterministe, donc les mêmes états se reproduisent sans atteindre 1. Un entier déjà égal à 1 donne simplement la trace [1]. L'entrée 0 et les nombres négatifs sont hors du domaine demandé.

## Preuve de terminaison

Pour d chiffres, chaque carré est au plus 81, d'où f(n)<=81d. Pour d>=4, 81d<10^(d-1)<=n. La première inégalité se prouve par induction : 324<1000 à d=4 ; si elle vaut pour d, alors 81(d+1)<=10*81d<10^d. Tant qu'un état possède au moins quatre chiffres, il décroît strictement. Une telle décroissance d'entiers positifs est nécessairement finie.

Les petits cas sont explicites : un chiffre donne au plus 81, deux au plus 162, trois au plus 243. Dès que la suite atteint au plus trois chiffres, son image appartient donc à S={1,...,243}. Tout élément de S possède au plus trois chiffres ; son image reste dans S et est positive. S est ainsi fini et absorbant. Après l'entrée dans S, au plus 243 transitions suffisent à atteindre 1 ou à répéter un état. L'ensemble des états vus détecte cette situation. Ceci prouve la terminaison pour tout entier positif, sans supposer une borne initiale universelle.

## Résultats et critères d'acceptation

- 7 -> 49 -> 97 -> 130 -> 10 -> 1.
- 19 -> 82 -> 68 -> 100 -> 1.
- 68 -> 100 -> 1.
- 2, 20 et 85 entrent dans le cycle 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4.

Le test local doit confirmer les six traces jusqu'au premier arrêt, la liste stable, la présence de l'analyse et des limites, ainsi que f(n)<=81d sur les entiers de 1 à 100000. Le test fini ne prouve pas la terminaison universelle ; la démonstration ci-dessus est fournie pour relecture. Les empreintes SHA256 permettent de contrôler que verify.cjs, package.json et mission.txt sont conservés.

## Provenance et limites

E0 désigne le contrat local ; E1 les trajectoires réellement exécutées avec Node ; E2 l'exécution de npm test ; E3 cette démonstration mathématique ; E4 le contrôle des fichiers protégés. answer.json porte les résultats mesurés et leur statut. Les preuves locales ne sont pas des reçus du runtime. Une seule claim mission-answer est conservée avec ses critères de réfutation.

La branche assignée est planned_world, suivant le plan fourni et la stratégie déclarée n_way_counterfactual_fork sans accéder à une autre chambre. La dimension contrefactuelle commune est resource_capacity ; aucune intervention de capacité ni comparaison n'a été réalisée. Le coût, la latence et les dimensions non testées restent inconnus. Le vérificateur utilise des petits entiers ; une implémentation générale devrait employer les chiffres textuels ou des entiers de précision arbitraire. Aucune vérification indépendante ni promotion n'est réalisée par ce worker.