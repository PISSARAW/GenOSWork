# Dossier de décision

Perspective imposée : V3, maintenance durable et réversibilité. Hypothèse et stratégie recursive_branch_evolution conservées ; aucune consultation des autres chambres.

## Comparaison fictive

| Horizon | Maintenance rapide | Maintenance refactor | Initial | Total refactor | Économie |
|---|---:|---:|---:|---:|---:|
| 30 jours | 3 | 1,8 | 14 | 15,8 | -12,8 |
| 365 jours | 36,5 | 21,9 | 14 | 35,9 | 0,6 |
| 1825 jours | 182,5 | 109,5 | 14 | 123,5 | 59 |

Unité : journées-personne. Économie = 0,10t − (14 + 0,06t) = 0,04t − 14. Égalité à t = 350 jours ; gain strict après ce seuil. La maintenance court sur l'horizon complet selon le contrat. Un effort de 14 journées-personne n'établit pas à lui seul un retard calendaire de deux semaines pour une équipe quelconque.

## Valeur et décision

À un mois, la livraison anticipée peut apporter apprentissage, revenus et survie financière ; accepter la dette seulement si les invariants de fiabilité essentiels sont préservés. À un an, 0,6 jour de gain fictif est sensible à toute erreur d'estimation : mesurer avant de conclure. À cinq ans, 59 jours plaident pour le refactor sur un produit durable, sans prouver sa rentabilité économique.

Le coût du retard, les incidents, la trésorerie et la probabilité d'abandon peuvent inverser cette préférence. Comparer, dans une unité économique cohérente, la valeur de livraison anticipée à la capacité libérée et aux risques évités. Ces valeurs sont inconnues. Une dette bornée et documentée peut être rationnelle ; un refactor trop large peut créer sa propre dette et des régressions.

## Contestation et correction

L'affirmation « refactor toujours préférable à un an » est rejetée : le gain n'est que 0,6 jour sous hypothèses. L'affirmation « 59 jours économisés prouve un bénéfice économique » est rejetée : aucune recette ni perte liée au délai n'est mesurée. Les conclusions restent conditionnelles. Préserver interfaces, tests critiques, migrations progressives et retour arrière permet de vérifier puis réviser la décision.

## Mesures à réaliser

Suivre temps de maintenance par période, incidents, délai des changements, retours clients et coûts de migration. Contrôler les différences de périmètre et de charge entre périodes ; une baisse observée ne prouverait pas à elle seule une causalité du refactor. Réviser les taux et l'horizon de vie. Aucune de ces mesures n'a été réalisée ici.

## Acceptation et provenance

E1 : lecture réelle de mission.txt, package.json et verify.cjs. Le vérificateur local contrôle les textes et formules, avec une tolérance de 1e-6. Les résultats d'exécution sont consignés dans answer.json après exécution. Aucun reçu de vérification du runtime n'est rempli par le worker. Le résultat reste un artefact local soumis à l'orchestrateur, sans promotion. Les dimensions non mesurées du vecteur restent null.


Résultats réellement exécutés : E2, npm test réussi (code 0). E3, audit initial échoué sur égalité flottante stricte (349,99999999999994 contre 350) ; E4, audit corrigé à la tolérance 1e-6 réussi (code 0). correctness=1 signifie uniquement réussite de ces contrôles locaux ; les neuf autres dimensions restent inconnues. Les fichiers protégés ont seulement été lus. Aucune preuve de rentabilité économique ou vérification indépendante n'est produite.

