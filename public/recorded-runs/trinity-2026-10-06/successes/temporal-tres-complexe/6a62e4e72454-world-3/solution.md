# Dossier de décision V3

20 ans = 7300 jours est un modèle simplifié. Le choix A minimise les dépendances de coordination initiales et conserve des frontières permettant un remplacement progressif. B devient pertinent si isolation et débit sont justifiés ; C si la vitesse de livraison compense un risque de sortie évalué. Ces trois propositions restent des hypothèses, sans classement empirique de performance.

L'invariant démontré se limite aux valeurs JSON finies, sans accesseurs, symboles, cycles, tableaux creux ou prototypes spécialisés. roundTrip sauvegarde une enveloppe JSON UTF-8 versionnée dans un fichier temporaire, relit et nettoie ce fichier. Il ne réalise ni migration de données métier, ni restauration après crash. Les fichiers temporaires ne sont pas un stockage durable avec fsync, chiffrement ou garantie de permission uniforme sur Windows.

Les incidents mutés attaquent les pertes de NaN, undefined, Date, nombres négatifs nuls et extensions de tableaux. Le rejet explicite évite une acceptation silencieuse ; les nombres hors précision JSON déjà arrondis avant l'appel restent une limite. Un schéma métier devra imposer des chaînes pour les entiers exacts et définir migrations ascendantes et descendantes.

Le test de sortie complet devrait restaurer données, identités, autorisations et comportements sur une implémentation indépendante, comparer des invariants métier, et mesurer temps et capacité nécessaires. Rien de cela n'est réalisé ici. Une capacité de maintenance insuffisante pourrait annuler la valeur optionnelle malgré des formats ouverts.

Critère de falsification : une valeur du domaine déclaré dont la relecture diffère, une valeur non portable acceptée silencieusement, ou une preuve utilisée pour garantir 7300 jours invalide le claim correspondant. Le verdict reject porte sur la prétention universelle de réversibilité et de survie, pas sur la réussite des deux configurations locales. Les reçus du runtime ne sont jamais créés par ce dossier.
