# Dossier de solution — planned_world

Livrables: methods.cjs, answer.json. Scripts de reproduction: node build-answer.cjs, npm test, node finalize-answer.cjs, npm test. Les deux scripts de construction enregistrent uniquement des résultats observés dans cette session; ne pas réutiliser leur attestation de test sans relancer npm test.

## Plan et modèle de menace

Périmètre: méthodes de résolution et barrière de preuve locale, dans la niche planned_world. Pas de lecture des autres chambres, agents délégués, promotion ou fusion. Le plan est: lire le contrat, isoler les prédictions conservées, implémenter des méthodes dépendant des entrées, comparer les résultats, scorer après vérification, documenter les limites.

Surfaces: parseur logique et trace, représentation du graphe, hypothèses probabilistes, fichier de provenance, calcul de cible, routeur éventuel. Menaces: réponse codée par ID, corruption de l'oracle, erreurs communes, confusion entre probabilité de stratégie et monde Trinity, confiance sans preuve. Invariants: oracle immuable; aucune utilisation des attendus dans methods.cjs; résultat primitif; sac à dos 0/1; graphe orienté selon le drapeau; cible uniforme pour égalité de correction; pas de routage dispensant de vérification.

## Différences et dépendances

|Type|exhaustive|structured|falsification|
|---|---|---|---|
|prime|diviseurs jusqu'à n|diviseurs jusqu'à racine|crible des composites|
|shortestPath|chemins simples|Dijkstra|relaxations Bellman-Ford|
|knapsack|récursion prendre/ignorer|DP descendante|expansion des états admissibles|
|montyHall|couples choix/prix|formule|complément des succès en restant|
|entailment|modèles booléens|clôture jusqu'au point fixe|tentative de modèle avec A vrai et B faux|
|lostUpdate|interpréteur de trace|même interpréteur|historique des versions|
|factorialZeros|factorielle BigInt|valuation par puissances de 5|comptage des facteurs 2 et 5|
|minCoins|énumération des multiplicités|DP|BFS des sommes|
|divisibility|filtrage direct|multiples du PPCM|rejet des contre-exemples|
|twoDice|issues favorables|bornes analytiques|complément des issues défavorables|

L'indépendance est partielle: helpers d'arcs et logique partagés, auteur commun, exhaustive/structured partagent l'interpréteur de trace. Plusieurs algorithmes demeurent mathématiquement proches. L'accord ne constitue donc pas une vérification indépendante générale. Le vérificateur fournit des attendus externes aux solveurs mais aucune indépendance institutionnelle n'est attestée.

Domaine: nombres entiers modestes; poids non négatifs; pièces positives; inclusions universelles uniquement; traces d'affectation avec addition entière; dés uniformes indépendants; Monty laisse une seule alternative après ouverture des autres chèvres. Cette dernière hypothèse généralise le cas à quatre portes et doit être explicitée: les flags seuls ne spécifient pas entièrement le protocole. Grandes entrées, nombres hors précision sûre, host alternatif, cycles négatifs, logique générale et distributions biaisées ne sont pas validés. Le parseur de trace n'utilise ni eval ni exécution arbitraire.

## Résultats et critères d'acceptation

E1: node build-answer.cjs, code 0, 30 résultats originaux comparés et distributions contrôlées. E2: hash des octets oracle égal à b9c80f0e12285fd310e2c63dcb7d31c812649de18c0cf4870571e4d43aeb66aa. E3: npm test, code 0, message PASS60 actual process calls with10 perturbations and10 genuine-prior Brier/logLoss pairs; independence needs code review. Ce sont 60 appels dans un processus Node.

Résultats originaux: false, 6, 22, 2/3, true, 1, 24, 5, [72,84,96], 1/6. Chaque variante est également comparée pour les trois méthodes. Critères: écart numérique inférieur à 1e-9, égalité stricte des booléens/listes; 10 scores; Brier/log-loss recalculés à 1e-6; hash oracle intact; champs argumentés. verify.cjs, package.json, mission.txt et oracle-before.json n'ont pas été écrits.

Moyennes: Brier 0.06066666666666666, log-loss 1.1817336834198346. Brier somme des trois carrés; log-loss moins somme cible fois ln(max(p,1e-15)). Cible 1/3 pour chacune des méthodes après correction observée. Les scores individuels sont dans answer.json. Référence uniforme: Brier 0 et log-loss ln(3)=1.0986122886681098.

## Routage, provenance et limites

Après chaque problème les succès observés restent égaux. L'historique peut suggérer un lissage uniforme pour les problèmes suivants, mais ne démontre aucun gain prospectif, de coût ou de latence. Dix cas hétérogènes ne démontrent pas une calibration générale; le score catégoriel conventionnel n'est pas une probabilité des mondes Trinity. La vérification reste obligatoire pour toute méthode choisie.

L'oracle est attribué à ollama-http-laboratory-oracle, modèle qwen2.5-coder:7b. Début enregistré 2026-10-06T10:29:51.266Z, enregistrement 2026-10-06T10:30:07.828Z; rawResponse et digests originaux conservés. Le worker n'est pas auteur des prédictions. Le contenu affirme antériorité au dispatch, sans preuve runtime indépendante ici: garantie ex ante du runtime Oracle non démontrée.

EvidenceVector: correction 60/60, couverture des types et mutations fournies 10/10, robustesse locale des variantes 30/30. Ces ratios citent E3 et ne mesurent ni couverture de branches ni sécurité générale. Reproductibilité indépendante, nouveauté, coût, latence, risque, incertitude quantitative et couverture complète des contraintes restent null. Counterfactual resource_capacity est une intervention hypothétique non exécutée; son effet reste inconnu. Aucun reçu du vérificateur runtime n'est attribué par le worker. Outils organisation indisponibles; l'orchestrateur reçoit les artefacts locaux et les preuves, sans promotion.
