# Dossier de démonstration et de réfutation

L'énoncé est vrai pour les nombres premiers positifs strictement supérieurs à 3. Sa réciproque est fausse.

## Plan et provenance

Mission locale, niche planned_world, méthode prompt_defined et recette planned : établir le domaine, partitionner les restes, attaquer les étapes, puis exécuter npm test. L'examen adversarial est local et successif; aucun autre dossier de chambre n'a été consulté. Sources E0 : mission.txt, package.json et verify.cjs, lus sans modification.

## Preuve générale (E1)

Soit p un nombre premier positif strictement supérieur à 3. Par division euclidienne, il existe des entiers q >= 0 et r dans {0,1,2,3,4,5} tels que p = 6q + r. Si r appartient à {0,2,4}, p est pair, donc divisible par 2. Puisque p > 3, 1 < 2 < p; ce diviseur est propre, ce qui contredit la primalité. Si r = 3, p = 3(2q+1) est divisible par 3; comme p > 3, 1 < 3 < p, nouvelle contradiction. Le reste 0 est aussi divisible par 3 mais a déjà été exclu. Les six restes étant exhaustifs, r vaut 1 ou 5. Si r = 1, p = 6q+1, donc p = 6k+1 avec k=q. Si r = 5, p = 6q+5 = 6(q+1)-1, donc p = 6k-1 avec k=q+1. Dans les deux cas k est un entier (et même positif sous p > 3). Cela prouve l'énoncé pour tous les nombres premiers concernés. La réciproque est fausse : 25 = 6*4+1 = 5*5 est strictement supérieur à 3 et possède le diviseur propre 5. Ainsi les restes 1 et 5 sont des conditions nécessaires, jamais une garantie de primalité.

## Tentatives de falsification (E1)

1. Objection : Les nombres premiers 2 et 3 ont des restes exclus : la partition semble donc réfuter la conclusion annoncée.

   Réponse : L'hypothèse impose explicitement p > 3. Elle rend 2 et 3 des diviseurs propres dans les cas exclus. Sans cette hypothèse, l'énoncé est faux pour ces deux premiers.

2. Objection : Un nombre de reste 1 ou 5 peut être composé, comme 25 ou 35; la démonstration prétend-elle alors prouver une réciproque fausse ?

   Réponse : La preuve part de la primalité et déduit seulement une forme nécessaire. 25 = 5*5 et 35 = 5*7 réfutent la réciproque, pas l'implication démontrée; aucun passage n'affirme la suffisance.

3. Objection : Le reste 5 fournit 6q+5, et non 6q-1; utiliser le même quotient dans les deux expressions serait incorrect.

   Réponse : On change explicitement de paramètre : k=q+1 donne 6q+5=6k-1. Le paramètre k est existentiel et n'est pas tenu d'être le quotient de la division initiale.

4. Objection : La division par 2 ou 3 ne contredit pas toujours la primalité; ces facteurs pourraient être égaux au nombre considéré.

   Réponse : La condition p > 3 donne strictement 1 < 2 < p et 1 < 3 < p. Les facteurs exclus sont donc propres. Cette justification ferme la faille des petits premiers.

5. Objection : Les exemples et un test jusqu'à 100000 ne couvrent pas tous les premiers; un contre-exemple plus grand pourrait échapper au test.

   Réponse : La preuve ne dépend d'aucune borne : la division euclidienne s'applique à tout entier p et énumère exactement six restes. Le test fini est un contrôle de cohérence du livrable, pas la source de l'universalité.

## Critères d'acceptation et limites

Le test npm test doit contrôler le schéma demandé, les restes [1,5], les restes exclus [0,2,3,4], le témoin composé 25 et les premiers jusqu'à 100000. Il contrôle seulement la longueur de la prose; une revue logique reste requise. Le critère de falsification du claim unique mission-answer figure dans answer.json. Les dimensions non mesurées restent null. Aucune mesure de capacité comparative, condition counterfactual assignée ou reçu runtime n'est inventé. Les outils organisationnels ne sont pas disponibles; aucune promotion n'est entreprise.

## Résultats exécutés (E2)

Commande réellement exécutée : npm test. Code de sortie : 0.

Sortie : PASS residue partition, converse witness and trial division through 100000; prose proof still requires review

Correctness = 1 désigne uniquement la réussite binaire de ces contrôles. Coverage = 1 désigne la totalité du domaine fini testé. Ces deux dimensions citent E2 dans answer.json; toutes les autres sont null. Aucun reçu de vérificateur n'a été rempli.
