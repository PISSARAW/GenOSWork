# Dossier de falsification

Livrables : methods.cjs, answer.json. Reproduction : node build-answer.cjs ; npm test ; node attack.cjs. Les fichiers verify.cjs, package.json, mission.txt et oracle-before.json sont conservés.

E1 : exécution build-answer.cjs, SHA-256 de la source b9c80f0e12285fd310e2c63dcb7d31c812649de18c0cf4870571e4d43aeb66aa ; dix scores, Brier moyen 0.06066666666666666 et log-loss moyenne 1.1817336834198346. La prédiction appartient à Ollama laboratoire (qwen2.5-coder:7b), enregistrée selon la source le 2026-10-06T10:30:07.828Z. Cette assertion de chronologie du laboratoire ne prouve pas le runtimeOracle.

E2 : npm test, sortie PASS60 actual process calls with10 perturbations and10 genuine-prior Brier/logLoss pairs; independence needs code review, code de sortie 0. Acceptation : trente réponses de base, trente réponses perturbées, dix scores conformes, hash de source identique. Le nom «process calls» vient du vérificateur : ce sont des appels de fonctions dans un processus Node.

E3 : node attack.cjs : douze réponses vérifiées et trois rejets du modèle hôte non supporté. Les mutations conceptuelles réfutées sont : sac à dos glouton 14 contre optimum 22 ; incréments supposés atomiques 2 contre trace 1 ; monnaie gloutonne 3 contre optimum 2 pour [1,3,4], cible 6 ; inversion de l'implication vraie contre contre-modèle faux. Ces valeurs mutantes sont des calculs explicites, pas l'exécution d'implémentations mutantes. Le test exécute les méthodes candidates et leurs assertions.

Différences : exhaustive énumère ; structured applique des récurrences ou invariants ; falsification cherche des contre-modèles et emploie Bellman-Ford, BFS, valuation des facteurs. Partages : parseur logique, trace, sous-ensembles du sac à dos et certaines énumérations. L'affirmation d'indépendance totale est rejetée par inspection de methods.cjs. Les erreurs communes et tailles excessives restent possibles ; les limites du domaine sont décrites dans answer.json. Les arguments ne prouvent pas une robustesse universelle.

Historique : sur ces dix égalités de correction, la cible est uniforme. L'uniforme rétrospectif a Brier nul et log-loss ln(3) ; ce constat n'est pas une calibration générale ni une validation prospective. Chaque préfixe pourrait guider une proposition de routage régularisée, jamais supprimer le contrôle de la réponse. Coût, latence et gain de routage ne sont pas mesurés. Probabilités de méthodes et probabilités des mondes Trinity sont distinctes.

Contrefactuel : aucune condition expérimentale assignée distincte n'est présente dans les sources locales consultées. Condition null, dimension commune resource_capacity ; aucun changement de capacité ni mesure causale. Les perturbations sont des interventions sur les entrées, pas un essai de capacité. Les preuves E1–E3 sont des références locales d'exécution, jamais des reçus attribués au runtime. Promotion et validation indépendante ne sont pas réalisées.
