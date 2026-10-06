# Décision argumentée

Le remplacement progressif par domaines permet de conserver un recours tant que les données, interfaces et droits nécessaires restent compatibles. L'hypothèse V3 privilégie la maintenabilité à long terme et la possibilité de remplacer à nouveau les composants.

À 30 jours, stabiliser et inventorier. À 540 jours (modèle simplifié de 18 mois), intégrer, réconcilier et basculer par domaine. À 3650 jours (modèle simplifié de 10 ans), entretenir les interfaces, les exports et les compétences. Chaque horizon a ses propres conditions dans answer.json.

Ordre obligatoire : inventory → parallelRun → verify → cutover → retire. Une dépendance satisfaite ne suffit pas à autoriser la destruction : les gardes métier et opérationnelles doivent aussi passer.

Le parallèle conserve un écrivain autoritaire ; les effets externes ne sont pas doublés. Le rollback suspend les écritures, préserve et réconcilie le delta puis rétablit le routage et vérifie l'intégrité. Après suppression des données ou des moyens de restauration, ce retour peut devenir impossible.

La destruction exige absence de consommateurs, observation d'un cycle métier, archives restaurables, conservation validée et autorisation du propriétaire. Elle reste bloquée si ces preuves manquent. Les outils, fournisseurs, seuils et budgets définitifs sont inconnus.

La méthode recursive_branch_evolution reste locale : proposition, challenge par tests, correction sur preuves. Aucun résultat d'autre chambre consulté, aucune promotion réalisée. Le test fourni vérifie le contrat structurel ; il ne démontre pas de migration ni dix ans de fiabilité. Le contre-factuel resource_capacity est proposé, non exécuté.

