# Décision conditionnelle pour la startup

La livraison immédiate gagne de la valeur si elle permet de valider la demande ou de saisir une fenêtre commerciale. Le refactor gagne de la valeur si la maintenance évitée, les incidents évités et la capacité rendue disponible dépassent son investissement et la valeur perdue pendant le retard. Ces valeurs ne sont pas observées ici. La priorité du monde assigné reste les effets immédiats V1.

| Horizon | Maintenance rapide | Maintenance refactor | Initial | Total refactor | Économie |
|---|---:|---:|---:|---:|---:|
| 30 jours | 3 | 1,8 | 14 | 15,8 | -12,8 |
| 365 jours | 36,5 | 21,9 | 14 | 35,9 | 0,6 |
| 1825 jours | 182,5 | 109,5 | 14 | 123,5 | 59 |

Unités: jours-personnes fictifs. Baseline = 0,1d; refactor = 14 + 0,06d; économie = 0,04d - 14. Égalité à 350 jours; le gain devient positif au-delà. Il ne s'agit pas d'un seuil de rentabilité économique. Les deux taux sont appliqués sur tout l'horizon; aucun calendrier opérationnel réel n'est simulé.

À un mois, livrer si le produit peut respecter ses invariants et la fenêtre commerciale importe; corriger d'abord les blocages critiques. À un an, 0,6 jour de gain ne suffit pas à lui seul à décider: coût d'opportunité et dépassements dominent facilement ce résultat. À cinq ans, 59 jours favorisent le refactor seulement si le produit et les gains persistent. Une disparition ou refonte prochaine du produit réduit cet avantage.

## Mesures à recueillir avant une décision réelle

Observer le temps de maintenance, les incidents, le délai de livraison et la valeur d'adoption; estimer le coût et le risque de migration. Comparer des périodes ou composants comparables, en tenant compte de l'évolution de la charge. Aucune de ces observations n'est réalisée ici. Les deux semaines sont assimilées à 14 jours-personnes exclusivement pour respecter le modèle imposé.

## Acceptation et traçabilité

Le contrat local est la preuve E1. Exécuter npm test vérifie les horizons, la présence des arguments et les calculs. Le résultat exécuté sera consigné dans answer.json avec son ID de preuve; les mesures réelles de performance restent inconnues. Vérifier également l'existence des deux livrables et l'intégrité des fichiers protégés. Le claim unique mission-answer définit les critères de falsification détaillés. Aucun reçu runtime n'est inventé.

Résultat exécuté E2: npm test, code 0, PASS conditional maintenance model at30,365,1825 days; breakeven350 days; no economic forecast. E3: relecture des fichiers protégés identique à la lecture initiale et empreintes enregistrées dans answer.json. Correctness=1 désigne uniquement le succès des assertions locales; les autres dimensions restent null.
