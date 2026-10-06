# Rejouer un livrable publié

1. Choisir un monde dont `answerVerified` vaut `true` dans `results.json`.
2. Copier tous ses fichiers publiés dans un répertoire de travail local.
3. Vérifier leurs SHA256 avec le manifeste, puis lancer `npm test` avec Node.js.
4. Conserver le code de sortie et la sortie du test. Un code zéro vérifie le contrat
   du banc publié, sans reproduire la génération du worker ni la promotion Trinity.

Les sources d'algorithmes,
fixtures et prédictions oraculaires sont fournies lorsqu'elles font partie du banc.
Les coûts Pareto sont hypothétiques. Aucun reçu runtime n'est créé par un replay.
Les requêtes, bases et journaux complets restent dans le laboratoire D: de la campagne.
