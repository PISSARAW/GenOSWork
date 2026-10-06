# Dossier de décision

Décision : stabiliser immédiatement puis migrer par capacités avec coexistence. Le monde 1 privilégie les effets à 30 jours : continuité, inventaire et restauration vérifiée avant de consommer la capacité dans un remplacement général. Cette priorité ne dispense pas de préparer les interfaces à 540 jours ni les responsabilités de maintenance à 3650 jours. Ces deux conversions calendaires sont le modèle simplifié demandé.

## Raisonnement et critères

L'urgence justifie les correctifs ciblés et un pilote isolable. Une bascule générale est rejetée dans cette proposition car les dépendances et la capacité ne sont pas connues. À 540 jours, les contrats versionnés et les comparaisons parallèles rendent la progression observable. À 3650 jours, exports réimportables, propriétaires et revues annuelles permettent de réviser les choix. Les horizons sont séparés : un résultat immédiat positif ne démontre pas la maintenabilité future.

L'ordre est inventory → parallelRun → verify → cutover → retire. Le fonctionnement parallèle évite les effets métier doublés et conserve une autorité unique d'écriture. verify doit démontrer la parité et le retour avant switch. Chaque gate opérationnel figure dans answer.json ; les seuils métier doivent être approuvés avant usage et restent des propositions.

## Retour et destruction

Le retour gèle le nouveau lot, rapproche ses écritures, les rejoue selon une procédure testée puis rétablit le routage historique. Sans compatibilité des données ou exercice réussi, la bascule est bloquée. Les RPO et RTO sont inconnus. Les adaptateurs et le routage sont révisables sous ces conditions ; perte de données, destruction et résiliation non récupérable ne le sont pas.

retire reste verrouillé malgré sa dépendance sur cutover. Il exige non-usage démontré, fenêtre de retour expirée, conservation validée, export et restauration vérifiés et accord métier et exploitation. Aucun retrait n'est exécuté ici.

## Preuves et limites

Le contrat local et le code du vérificateur ont été lus (e-contract). Les livrables sont des propositions documentées (e-artifacts). npm test contrôle la structure, les horizons et l'ordre, et ne simule pas une migration. Le résultat réellement exécuté sera cité dans answer.json sous e-test. Toutes les métriques de production, de coût et de capacité restent inconnues.

Le contre-factuel resource_capacity réduit hypothétiquement la capacité de moitié : priorité maintenue à la stabilisation, pilote réduit et bascule reportée. Aucun effet causal n'a été mesuré. Aucune autre chambre, aucun agent pair et aucune promotion ne sont utilisés.

Résultat exécuté (e-test) : npm test, code de sortie 0, « PASS executable migration dependency/order gates; no live legacy migration ». correctness=1 et constraintCoverage=1 sont des indicateurs binaires limités aux assertions locales. Toutes les autres dimensions restent null.
