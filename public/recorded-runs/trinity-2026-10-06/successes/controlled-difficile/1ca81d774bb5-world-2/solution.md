# Décision d'architecture

Adopter provisoirement un modular monolith avec extraction progressive conditionnelle. Au départ il est identique au monolithe modulaire en exploitation : un déploiement, des frontières métier et des transactions locales. Avec six développeurs et dix-huit mois de runway, privilégier la livraison et apprendre les frontières. Ne pas promettre une extraction ni supposer que 10 000 utilisateurs imposent des microservices. Cette décision est une inférence révisable, sans supériorité empirique démontrée.

Faits fournis : 6 développeurs, 18 mois de runway, environ 10 000 utilisateurs. Aucune donnée de charge n'est fournie (E-mission).

| Critère | Monolithe modulaire | Microservices | Monolithe avec extraction progressive |
|---|---|---|---|
| capacité de livraison avec six développeurs | Coordination locale | Coordination et exploitation distribuées | Coordination locale initiale |
| coût et runway | Exploitation unique | Coût additionnel possible | Coût différé d'extraction |
| cohérence métier | Transactions locales | Coordination interservices | Transactions locales initiales |
| déploiement et isolation | Déploiement commun | Autonomie sous conditions | Commun puis sélectif |
| mise à l'échelle | Échelle du déploiement | Échelle par service | Globale puis sélective |

Toutes les valeurs mesurées de cette matrice sont null. Les descriptions sont des mécanismes attendus, pas des résultats expérimentaux. Aucune dominance mesurée.

Plan : fixer les faits, comparer les trois options sur les mêmes critères, formuler une décision conditionnelle et définir les observations qui pourraient la réfuter. La complexité métier justifie des frontières explicites mais ne prouve pas un besoin de distribution. Le nombre d'utilisateurs ne renseigne ni concurrence, ni débit, ni taille des données. Les deux variantes monolithiques partagent leur architecture initiale ; la troisième ajoute une politique d'évolution, pas une performance supérieure. Aucune dominance ne peut être établie : toutes les mesures comparables de coût, latence et fiabilité sont inconnues. Les sources sont des analyses de praticien, non des essais sur cette entreprise.

Plan proposé : cartographier les invariants et modules métier ; définir API internes, propriété des tables et règles de dépendance ; empêcher les accès directs intermodules ; garder les transactions nécessaires locales. Prévoir CI, restauration et observabilité adaptées. Mesurer charge, incidents et délais avant tout pilote d'extraction. Extraire un seul module justifié, avec contrats, propriété des données, stratégie de cohérence et retour arrière. Ce plan est proposé, pas exécuté.

## Monolithe modulaire

Un déploiement unique et des modules métier explicites permettent de concentrer une équipe de six personnes sur le produit. Les transactions locales facilitent les invariants métier complexes. Cette adéquation reste une inférence qualitative, sans mesure de délai ou de coût.

Risques : Couplage caché entre modules et tables. Déploiements liés et isolation limitée des incidents.

## Microservices

Des services autonomes peuvent offrir des déploiements et une capacité indépendants si les frontières métier sont stables. Ces avantages doivent justifier les communications réseau, les transactions distribuées et l'exploitation supplémentaire pour cette équipe limitée.

Risques : Charge d'exploitation et astreinte inconnue. Cohérence distribuée, pannes partielles et frontières prématurées.

## Modular monolith avec extraction progressive

Commencer avec un déploiement unique, des API internes et une propriété explicite des données préserve une possibilité d'extraction. N'extraire un module que si des observations établissent un besoin et si le coût de migration est soutenable dans le runway restant.

Risques : La modularité demande une discipline continue. Une extraction peut être coûteuse malgré les interfaces. Risque de surinvestissement dans une migration jamais nécessaire.

## Déclencheurs

- Réexaminer une extraction si un profil de charge mesuré montre un module saturé malgré optimisation et mise à l'échelle du monolithe.
- Réexaminer si des incidents documentés exigent une isolation indépendante et qu'un pilote démontre un bénéfice compatible avec les objectifs métier.
- Réexaminer si les déploiements liés bloquent régulièrement la livraison et si le module possède des données et contrats stables.
- Autoriser un pilote seulement après estimation documentée du coût total, de la capacité d'astreinte et du runway restant ; sinon conserver le monolithe.

## Incertitudes

- Concurrence réelle, débit de pointe, volumes et croissance inconnus.
- Expertise de l'équipe en exploitation distribuée et capacité d'astreinte inconnues.
- Frontières métier, transactions intermodules et maturité du code inconnues.
- SLO, contraintes réglementaires, isolation requise et budget financier inconnus.
- Application existante ou nouvelle non précisée ; une migration existante pourrait modifier la décision.

## Sources et limites

[E-source-1 : Monolith First](https://martinfowler.com/bliki/MonolithFirst.html) motive la prudence sur les frontières et reconnaît des preuves limitées. [E-source-2 : Microservice Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html) expose autonomie, cohérence et exploitation. Ce sont des analyses qualitatives ; la décision locale reste une inférence.

Le counterfactual ne modifie que resource_capacity et n'est pas exécuté. Les tests portent sur le dossier. Ni benchmarks, ni promotion, ni reçus runtime ne sont produits. Les champs de preuve seront actualisés après exécution réelle.


Validation exécutée (E-test-1) : npm test, code de sortie 0, « PASS preserved architecture constraints and dossier coverage; qualitative choice not empirically certified ». constraintCoverage=true désigne uniquement les contraintes contrôlées par verify.cjs ; les autres dimensions restent null. Ce journal local ne constitue pas un reçu attribué par le runtime.
