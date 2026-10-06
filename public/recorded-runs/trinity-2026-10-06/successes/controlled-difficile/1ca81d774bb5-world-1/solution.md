# Décision d’architecture

Adopter un modular monolith avec extraction progressive conditionnelle. Livrer d'abord un seul déploiement, découper par capacités métier, protéger les interfaces et la propriété des données. Ne créer un service que si un besoin observé justifie son coût et qu'un responsable peut l'exploiter. C'est une décision qualitative révisable, pas une supériorité mesurée.

## Faits et raisonnement

Les contraintes déclarées sont six développeurs, dix-huit mois de runway, une application métier complexe et environ dix mille utilisateurs. Le nombre d'utilisateurs ne fournit ni concurrence, ni débit, ni volume des données. La complexité métier appelle des frontières explicites sans démontrer un besoin de distribution. Le monolithe modulaire et la trajectoire d'extraction ont la même architecture initiale; leur différence est une politique d'évolution. La recommandation repose sur l'hypothèse d'une capacité opérationnelle limitée et de frontières encore évolutives. Les microservices restent justifiables si des contraintes d'isolation ou d'autonomie vérifiées l'exigent. Aucune dominance empirique n'est établie : la matrice présente des mécanismes et hypothèses, toutes ses mesures restent null. Les tests contrôlent le dossier, pas les effets réels des architectures.

Les faits viennent de la mission [E-MISSION], sans audit terrain. Les prérequis opérationnels sont étayés qualitativement par [Martin Fowler](https://martinfowler.com/bliki/MicroservicePrerequisites.html) [E-FOWLER]. Cette source ne mesure pas notre équipe.

## Matrice commune

| Critère | Monolithe modulaire | Microservices | Monolithe avec extraction progressive |
|---|---|---|---|
| Capacité de livraison avec six développeurs | Un pipeline partagé; charge à vérifier | Plusieurs pipelines et responsabilités; capacité inconnue | Pipeline partagé initialement; extraction limitée |
| Préservation des dix-huit mois de runway | Exploitation simple supposée; coût inconnu | Investissement opérationnel supposé; coût inconnu | Investissement différé; coût de migration inconnu |
| Complexité et cohérence métier | Transactions locales; discipline de modules | Contrats distribués; transactions à repenser | Transactions locales puis séparation ciblée |
| Charge de dix mille utilisateurs | Débit et concurrence inconnus; charge à tester | Mise à l'échelle par service; bénéfice inconnu | Optimiser puis extraire un point chaud mesuré |
| Déploiement et isolation des pannes | Déploiement commun; isolation logique | Déploiement autonome si dépendances maîtrisées | Commun initialement; autonomie ciblée ensuite |
| Réversibilité et évolution | Refactorisation interne; extraction non planifiée | Frontières distribuées plus difficiles à changer | Frontières explicites; migration progressive avec retour arrière |

Toutes les valeurs quantitatives de cette matrice sont `null`; aucune dominance mesurée.

## Risques par option

### Monolithe modulaire

Un déploiement unique et des frontières métier explicites permettent de traiter la complexité sans multiplier les échanges réseau. Avec six développeurs, cette simplicité paraît adaptée, sous réserve de compétences et de charge encore inconnues.

- Érosion des frontières et accès directs aux données des autres modules.
- Déploiement partagé et panne potentiellement globale.
- Dimensionnement global même si un seul module consomme les ressources.

### Microservices

Des services autonomes permettent des déploiements et un dimensionnement indépendants quand les frontières métier sont stables. Ils impliquent exploitation distribuée, contrats et gestion des défaillances réseau, dont la capacité de prise en charge par six développeurs reste inconnue.

- Charge opérationnelle, astreinte et diagnostic distribué.
- Transactions interservices et cohérence éventuelle.
- Découpage prématuré ou monolithe distribué avec dépendances synchrones.

### Modular monolith avec extraction progressive

Commencer avec un seul déploiement modulaire conserve une organisation simple tout en préparant des frontières extractibles. Une extraction intervient seulement après observation d'un besoin concret, et peut ne jamais avoir lieu. Cette trajectoire convient provisoirement aux contraintes annoncées.

- Surconception de frontières supposées extractibles.
- Migration des données et coexistence de deux modes d'exploitation.
- Extraction coûteuse si les transactions traversent de nombreux modules.

## Mise en œuvre et révision

Créer des modules par capacité métier, avec interfaces explicites, propriété des données et dépendances dirigées. Commencer avec un pipeline et un déploiement. Vérifier les frontières par revue et tests de dépendances, puis instrumenter latence, erreurs et consommation. Pour une extraction justifiée, choisir une frontière peu couplée, expliciter la migration des données, tester les contrats et prévoir un retour arrière avant bascule. Ce sont des actions proposées, pas exécutées.

- Extraire un module seulement si des tests représentatifs montrent un goulot d'étranglement local après optimisation et si un essai démontre l'intérêt du dimensionnement indépendant.
- Reconsidérer les microservices si des équipes autonomes et une capacité d'astreinte, de déploiement automatisé et d'observabilité sont effectivement disponibles.
- Isoler une capacité si une exigence vérifiée de sécurité, disponibilité ou résidence des données impose une frontière de déploiement.
- Conserver le déploiement unique si les frontières métier changent souvent ou si les transactions intermodules rendent l'extraction risquée.
- Reporter une extraction si son coût estimé menace le runway ou si un retour arrière et la migration des données ne sont pas démontrés.

## Incertitudes

- Charge simultanée, débit, latence cible et profil des données inconnus.
- Compétences de l'équipe, infrastructure existante et capacité d'astreinte inconnues.
- Stabilité des frontières métier et fréquence des transactions intermodules inconnues.
- Exigences de disponibilité, conformité et isolation non spécifiées.
- Coûts, durée de migration et trajectoire de croissance non mesurés.

## Contrefactuel et limites

À besoins métier identiques, une capacité de ressources et d'exploitation supérieure est disponible. Dimension : resource_capacity. Intervention hypothétique : Augmenter la capacité disponible pour l'exploitation, les déploiements et les astreintes; hypothèse non exécutée. Résultat inconnu. Aucune expérience factorielle, estimation financière, réplication indépendante ou promotion réalisée. La recette directe reste appliquée dans cette chambre isolée.

## Acceptation et preuve

Le vérificateur source [E-VERIFY-SOURCE] contrôle la conformité minimale. Le résultat réellement exécuté sera ajouté après npm test. Les reçus du runtime restent à sa charge.


Tests exécutés : `npm test` (code 0) [E-NPM-TEST] : « PASS preserved architecture constraints and dossier coverage; qualitative choice not empirically certified ». Contrôle complémentaire Node (code 0) [E-MATRIX-TEST] : six critères communs, trois options, dix-huit mesures null, unique claim, dimension resource_capacity et dossier présent. Les dimensions correctness, coverage et constraintCoverage sont des booléens de conformité documentaire vrais, avec ces références. Toutes les autres dimensions restent null, dont reproductibilité : aucune réplication indépendante. hardConstraintsPassed=true pour les contrôles exécutés; budgetStatus=unknown. Aucun reçu runtime créé.

