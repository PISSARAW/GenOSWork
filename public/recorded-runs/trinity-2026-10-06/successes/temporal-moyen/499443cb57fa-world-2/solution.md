# Décision argumentée — planned_world, World 2

L'intégration proche (H1..H2, V2) oriente l'analyse vers la livraison, l'apprentissage client et les blocages concrets. La fonction V2 n'étant pas chiffrée, la recommandation est conditionnelle. La stratégie assignée est conservée; cette branche ne sélectionne pas une autre stratégie et ne promeut aucun résultat.

## Modèle fictif et calculs

Pour d jours: baseline B(d)=0,1d; maintenance après refactor M(d)=0,06d; total R(d)=14+0,06d; économie S(d)=B(d)-R(d)=0,04d-14.

| Horizon (jours) | Maintenance rapide | Maintenance refactor | Initial | Total refactor | Économie |
|---|---:|---:|---:|---:|---:|
| 30 | 3 | 1,8 | 14 | 15,8 | -12,8 |
| 365 | 36,5 | 21,9 | 14 | 35,9 | 0,6 |
| 1825 | 182,5 | 109,5 | 14 | 123,5 | 59 |

Les nombres représentent des jours d'effort fictifs. L'égalité se produit à 14/0,04=350 jours; avant ce seuil le refactor coûte plus d'effort, après il en économise. Les taux s'appliquent à tout l'horizon selon le contrat, même durant les quatorze jours initiaux. Cela ne constitue pas une simulation calendaire d'équipe.

## Décisions par horizon

À un mois, livrer rapidement peut valider le besoin et préserver une fenêtre commerciale. Préférer cette option si les risques sont tolérables et la dette bornée. Refactoriser d'abord si une dépendance bloque l'intégration ou si la livraison expose à des incidents inacceptables. Le surcoût modélisé de 12,8 jours doit être mis en regard de ces risques.

À un an, 0,6 jour d'économie est trop faible pour justifier seul un refactor. Des mesures de temps de maintenance, blocages et incidents peuvent rendre l'investissement intéressant. En leur absence, une livraison avec suivi de dette est cohérente avec l'intégration proche. Une légère variation des hypothèses peut changer le classement.

À cinq ans, 59 jours économisés soutiennent le refactor d'un composant pérenne. Ce résultat perd son intérêt si la feature disparaît, si l'architecture change ou si les taux évoluent. Cet horizon reste une sensibilité de long terme et ne remplace pas l'objectif proche assigné.

## Valeur et plan de mesure

Le modèle compare seulement l'effort. Une décision économique demanderait de valoriser les jours économisés, les incidents évités et la valeur d'une livraison anticipée, puis de soustraire le coût du délai et les risques de régression. Le prix d'un jour d'effort, les recettes, l'actualisation et les probabilités d'incident sont inconnus.

Pour une décision réelle: mesurer sur des fenêtres comparables le temps de maintenance, les incidents, les délais de modification et l'usage client; fixer un responsable de dette et une date de revue après la première intégration. Documenter le périmètre et la capacité. Ces mesures proposées n'ont pas été exécutées; un simple avant/après ne suffirait pas à établir un effet causal sans contrôler les différences de charge et de périmètre.

## Acceptation et traçabilité

Le contrat source est E-contract. E-model désigne une dérivation, pas une mesure. npm test doit vérifier les trois horizons et les calculs avec tolérance 1e-6. Un contrôle distinct doit vérifier les livrables et l'intégrité de mission.txt, package.json et verify.cjs. Les résultats réellement exécutés seront référencés dans answer.json; aucun reçu de vérification runtime n'est créé.

Un unique claim mission-answer conserve des critères détaillés de falsification. Les dimensions du vecteur non mesurées restent null. Aucun test local ne prouve la rentabilité, la robustesse opérationnelle ou la reproductibilité indépendante. Les outils de routage GenOS ne sont pas disponibles et ne bloquent pas le travail local. Aucun autre résultat de chambre n'est lu.