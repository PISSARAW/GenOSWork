# Décision architecturale

Recommandation conditionnelle : Adopter un modular monolith avec extraction progressive : un seul déploiement au départ, des modules métier aux interfaces explicites et une propriété logique des données. Avec six développeurs et dix-huit mois de runway, c'est un jugement prudent de gestion de capacité, pas une supériorité démontrée. N'extraire un module que lorsqu'un besoin mesuré d'isolation, de charge ou d'autonomie justifie le coût complet.

## Faits et distinction des options

6 développeurs, 18 mois de runway, environ 10 000 utilisateurs (E-MISSION). Une application métier complexe. Un monolithe modulaire organise le métier en modules ; la variante progressive ajoute une politique d'extraction conditionnelle, sans imposer de services dès le départ.

## Matrice commune

Toutes les valeurs mesurées sont **null**, et leurs listes d'evidence IDs sont vides. Les descriptions ci-dessous sont des hypothèses qualitatives.

| Critère | Monolithe modulaire | Microservices | Extraction progressive |
|---|---|---|---|
| Capacité de l'équipe et exploitation | Une seule unité à exploiter ; effort inconnu. | Plusieurs unités à exploiter ; maturité DevOps inconnue. | Une unité initiale ; coût de discipline inconnu. |
| Runway et coût de livraison | Livraison centralisée ; coût inconnu. | Investissement distribué ; coût inconnu. | Extraction différée ; économies non mesurées. |
| Complexité métier et cohérence des données | Transactions locales possibles ; couplage à surveiller. | Autonomie des données ; cohérence distribuée à concevoir. | Interfaces métier et propriété des données explicites. |
| Charge et mise à l'échelle | Mise à l'échelle globale possible ; capacité inconnue. | Mise à l'échelle par service ; bénéfice inconnu. | Extraire un point chaud confirmé ; capacité inconnue. |
| Isolation et déploiement | Unité de panne et de déploiement partagée. | Isolation conditionnée par les dépendances et l'exploitation. | Isolation initiale commune ; ciblée après extraction. |
| Réversibilité et coût de migration | Frontières utiles ; extraction non préparée explicitement. | Frontières déjà distribuées ; retours et migrations complexes. | Option conservée ; extraction toujours coûteuse et conditionnelle. |

Les trois options sont comparées selon les mêmes six critères. Le monolithe modulaire et sa variante à extraction progressive partagent l'architecture initiale : la différence est une politique explicite d'évolution, pas une catégorie de performance. Dix mille utilisateurs ne donnent ni concurrence, ni débit, ni volume de données. La complexité métier demande des frontières et des invariants cohérents mais n'impose pas de distribution. La recommandation infère une préférence pour une faible charge d'exploitation initiale à partir des ressources imposées ; elle suppose qu'aucune exigence d'isolation immédiate n'est encore établie. Aucun score, benchmark, gain financier ou dominance empirique n'est disponible. La matrice ne permet donc aucune élimination par dominance. Le plan factorial_experiment conserve les trois options et propose de les tester sur les mêmes scénarios en faisant varier la capacité de ressources ; aucun prototype architectural n'a été exécuté.

## Mise en œuvre et contestation

Cartographier les capacités métier et les invariants transactionnels. Définir des interfaces internes, une propriété logique des tables, et contrôler les dépendances entre modules. Garder les transactions locales quand les invariants le demandent. Prévoir déploiement reproductible, journalisation et suivi des objectifs métier. Éviter de simuler un réseau entre modules dès le départ.

Avant toute extraction, documenter le problème observé et comparer optimisation locale et prototype d'extraction. Vérifier contrats, migrations, transactions, idempotence si nécessaire, reprise sur panne et retour arrière. Mesurer sur des scénarios représentatifs les coûts, délais et SLO négociés ; aucune valeur n'est inventée ici.

La contestation self_correcting recherche une obligation d'isolation immédiate, une forte maturité opérationnelle ou un point chaud indépendant : ces observations pourraient invalider la recommandation. Aucune de ces observations n'est disponible. La comparaison corrige notamment l'idée erronée que 10 000 utilisateurs suffiraient à prouver un besoin de microservices.

## Déclencheurs

- Extraire un module si des mesures de charge représentative montrent un goulot persistant après optimisation locale et si un prototype isolé satisfait les SLO convenus à un coût accepté.
- Réévaluer si des incidents documentés exigent une isolation de panne que le déploiement commun ne fournit pas, et si les dépendances peuvent être séparées.
- Réévaluer lorsque des équipes autonomes et une capacité d'exploitation dédiée existent, avec des déploiements réellement bloqués par la coordination commune.
- Conserver le monolithe modulaire si les mesures respectent les objectifs et qu'aucun besoin indépendant ne justifie l'extraction.
- Reconsidérer immédiatement si une obligation réglementaire ou de résidence impose une frontière de déploiement ou de données distincte.

## Incertitudes

- Concurrence, débit, saisonnalité, volume de données et SLO inconnus.
- Compétences DevOps, disponibilité d'astreinte et expérience des six développeurs inconnues.
- Frontières métier, transactions intermodules et état du code existant inconnus.
- Coûts d'infrastructure, productivité et coût d'extraction non mesurés.
- Contraintes de sécurité, conformité et isolation non spécifiées.
- Aucune comparaison empirique des trois architectures ; les sources décrivent des compromis généraux.

## Sources et limites

E-MISSION : mission.txt et demande assignée, données imposées non auditées auprès de l'entreprise.

E-SOURCE-MS : [Microsoft, Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices). Décrit les exigences opérationnelles des systèmes distribués ; ne mesure pas notre entreprise.

E-SOURCE-MF : [Martin Fowler, Monolith First](https://martinfowler.com/bliki/MonolithFirst.html). Argument de praticien sur l'apprentissage des frontières ; ne prouve pas une supériorité générale.

## Expérience et acceptation

Stratégie conservée : factorial_experiment. Plan proposé : trois options et variation de resource_capacity sous des flux métier et une charge communs. La condition contrefactuelle est une capacité disponible différente, non chiffrée par la mission. Aucun traitement expérimental architectural n'est exécuté. Aucune allocation par fitness ni promotion de gagnant n'est justifiable avec des dimensions non mesurées.

Exécuter npm test sans modifier verify.cjs, package.json ou mission.txt. Ce test ne prouve que les contraintes et la couverture qu'il vérifie. Une vérification complémentaire doit contrôler la matrice, les null, les trois incertitudes, les références et la protection des fichiers. Les résultats réellement exécutés sont consignés dans worker-report.json. Les reçus runtime ne sont pas produits ici.

Les outils organisationnels GenOS ne sont pas exposés ; ce n'est pas une précondition locale. Aucune autre chambre n'est consultée. Replay indépendant et vérification de promotion restent non réalisés. Le budget runtime restant ne peut pas être mesuré localement.

