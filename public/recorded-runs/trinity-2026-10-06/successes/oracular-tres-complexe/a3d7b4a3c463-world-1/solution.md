# Dossier de solution

Les trois méthodes exécutées produisent les réponses attendues sur les dix fixtures. Exhaustive énumère diviseurs, chemins simples, sous-ensembles, modèles et issues; structured utilise Bellman-Ford, programmation dynamique, clôture transitive et formules; falsification recherche témoins contraires, contre-modèles, distances améliorables et couches de faisabilité. La diversité est partielle : knapsack partage son énumérateur récursif, entailment partage le parseur et le moteur de modèles entre deux méthodes, et lostUpdate partage un parseur entre exhaustive et structured. Les erreurs de spécification restent communes : graphe non négatif, sac 0/1, dés indépendants uniformes, implication universelle sans existence, pièces positives et protocole Monty qui laisse deux portes fermées. Un accord ne suffit donc pas à vérifier une réponse. Les attentes indépendantes du vérificateur et ses mutations sont nécessaires. Les scores portent sur une distribution catégorielle de méthodes avec cible uniforme parmi les méthodes correctes; ils ne sont pas trois scores binaires de succès.

Sur cet historique, une prédiction uniforme réduit rétrospectivement le Brier à zéro et la log-loss à ln(3), car les trois méthodes réussissent à chaque étape. Ce constat ne démontre aucune amélioration prospective du routage : aucun échec ne différencie les stratégies, et coût et latence ne sont pas mesurés. Un ajustement séquentiel fondé uniquement sur les cas antérieurs pourrait réduire une préférence excessive pour structured, mais resterait une hypothèse à tester sur de nouveaux cas. Le routeur doit toujours soumettre le résultat choisi à une vérification indépendante et rejeter un résultat qui échoue; l’oracle ne remplace jamais cette barrière.

Dix cas hétérogènes et sélectionnés ne démontrent aucune calibration empirique générale. Tous les succès étant ex aequo, la cible uniforme ne mesure ni coût ni rapidité ni indépendance. Réutiliser les mêmes cas pour ajuster puis évaluer produirait un biais. Un échantillon prospectif indépendant, plusieurs difficultés par famille et des échecs observés seraient nécessaires. Les probabilités des méthodes ne sont pas les probabilités des mondes Trinity. Les dates et empreintes du fichier de laboratoire sont conservées, mais ne démontrent pas une garantie ex ante propre au runtime Oracle sans preuve runtime indépendante.

## Acceptation et preuves

E1 : trente appels locaux réellement exécutés, résultats dans answer.json. E2 : SHA256 du fichier oracle lu. npm test reste à exécuter pour les perturbations et les scores. Les reçus de vérification runtime sont exclusivement attribués par le runtime.

## Limites

Domaine borné des fixtures, pas de validation exhaustive des entrées.

Énumération exponentielle des sous-ensembles et modèles.

Outils GenOS de publication non disponibles; aucun reçu inventé.

Aucune lecture des autres chambres; aucune promotion.

## Validation exécutée

E3 : npm test, code de sortie 0. Sortie : PASS60 actual process calls with10 perturbations and10 genuine-prior Brier/logLoss pairs; independence needs code review. Les 30 appels initiaux et 30 appels perturbés passent; les dix paires de scores passent. E4 conserve les empreintes finales des sources. Aucun reçu runtime créé.

Brier moyen : 0.06066666666666666. Log-loss moyenne : 1.1817336834198346. La baseline uniforme évaluée rétrospectivement donne 0 et ln(3), sans prouver un gain futur.

Les dimensions correctness, coverage et robustness sont des fractions bornées aux tests exécutés (E1/E3). Les autres dimensions restent null. Le budget restant est inconnu. Le contre-factuel testé concerne la capacité du sac (resource_capacity), pas une ressource de calcul runtime.
