# Décision de migration

Décision proposée pour le monde 2 (intégration H1–H2): remplacer progressivement par domaines via une façade stable et une exécution parallèle, en gardant le système historique comme autorité jusqu'à validation. Stabiliser les incidents à 30 jours sans imposer une réécriture urgente; sur 540 jours financer des lots intégrables avec contrats versionnés et rapprochement des données; sur 3650 jours privilégier des interfaces ouvertes, une exploitation documentée et des mises à jour soutenables. Ces choix sont une proposition argumentée, pas une migration validée en production.

## Horizon 30 jours

Stabiliser les parcours critiques, inventorier propriétaires et dépendances, établir une référence de disponibilité et préparer une restauration. Limiter les changements aux incidents urgents et aux moyens d'observation nécessaires à l'intégration.

Portes d’acceptation: Inventaire signé par les propriétaires; parcours critiques identifiés; sauvegarde restaurée en environnement isolé; objectifs RPO/RTO définis et instrumentation vérifiée. Ces portes sont à exécuter et ne sont pas réputées franchies.

## Horizon 540 jours

Intégrer domaine par domaine avec façade et contrats versionnés, réplication contrôlée et exécution parallèle. Réserver explicitement capacité et budget au rapprochement, aux essais de panne et au maintien simultané des deux systèmes.

Portes d’acceptation: Avant chaque lot: zéro divergence inexpliquée sur données critiques pendant un cycle métier complet, tests de contrats réussis, objectifs de latence et disponibilité convenus respectés, rollback répété et accord métier documenté.

## Horizon 3650 jours

Entretenir la maintenabilité par interfaces ouvertes, formats exportables, documentation des décisions, ownership durable, mises à jour régulières et exercices de remplacement des composants; réexaminer annuellement coûts et dépendances fournisseurs.

Portes d’acceptation: Chaque année: restauration et export relus et testés, dépendances supportées ou plan de remplacement financé, nouvel opérateur capable de suivre les procédures, coûts et incidents évalués. Une projection de dix ans ne constitue pas une mesure.

## Séquence et réversibilité

inventory → parallelRun → verify → cutover → retire. Chaque étape attend son prérequis; la réussite du test structurel ne franchit aucune porte opérationnelle.

Réversibles tant que les données restent synchronisables: activer une façade par configuration, routage d'un lot pilote, taille et cadence des lots, fournisseur remplaçable derrière contrats ouverts, ressources du parallèle. Le cutover est conditionnellement réversible pendant une fenêtre convenue; retour au routage historique seulement après rapprochement des écritures nouvelles et contrôle d'intégrité.

La suppression des bases, sauvegardes ou clés et la résiliation sans récupération sont irréversibles. Une transformation avec perte d'information l'est aussi. La garde destruction interdit retire avant cutover stabilisé, fin de fenêtre de rollback, validation métier et juridique, export complet restauré et preuve de conservation; approbation explicite des responsables avant destruction.

## Retour et destruction

Sur divergence critique, échec des objectifs convenus ou intégrité incertaine: suspendre le lot et les écritures concernées, préserver journaux, rapprocher les écritures effectuées depuis le cutover, restaurer si nécessaire puis rerouter vers l'historique après validation métier. Refuser le cutover si ce retour n'a pas été répété avec RPO/RTO acceptés.

retire nécessite toutes les preuves de stabilisation, restauration des archives, conservation légale, fenêtre de rollback close et autorisation explicite; l'ordre topologique seul n'autorise aucune suppression.

## Incertitudes et preuve

Le test local vérifie la structure, la présence d'arguments et l'ordre des dépendances. Il ne mesure ni performance, ni sécurité, ni fidélité des données, ni coûts ni disponibilité réelle; aucune migration historique en direct n'est réalisée. 18 mois=540 jours et 10 ans=3650 jours sont des simplifications.

Inventaire, dépendances cachées, qualité des données et charge réelle inconnus.

Budget, capacité des équipes, obligations de conservation et objectifs métier à établir avec les responsables.

Les seuils proposés doivent être approuvés avant tout basculement; aucune mesure de production disponible.

L'intégration sur 540 jours est la priorité du monde 2. Si resource_capacity diminue de moitié, réduire les lots simultanés et reporter les basculements; ce contrefactuel est non mesuré. Aucun résultat n'est promu.


Preuve e-test-1: npm test exécuté, code 0; PASS executable migration dependency/order gates; no live legacy migration. correctness et constraintCoverage valent 1 uniquement pour les assertions locales. Autres dimensions non mesurées: null. Aucun reçu runtime fabriqué.
