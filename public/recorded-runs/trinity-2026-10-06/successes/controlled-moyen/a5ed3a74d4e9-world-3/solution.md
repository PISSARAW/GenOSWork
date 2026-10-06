# Dossier de solution

Solutions : (3,19) et (7,15).

Les complements a 22 de 3,7,8,11,15,19 sont respectivement 19,15,14,11,7,3. Le 14 est absent et un seul 11 est disponible : deux occurrences distinctes sont requises. Les deux derniers cas repetent les deux premiers. Toute paire valide a necessairement ce complement, donc seules [3,19] et [7,15] existent.

Solution construite par complements puis contestee par enumeration independante de tous les indices i<j. Six nombres donnent 6*5/2=15 paires. Le programme Node execute a examine ces 15 paires et confirme exactement [3,19] et [7,15]. Les paires inversees sont dedupliquees et [11,11] est exclue faute de seconde occurrence.

Evidence E1 : Node, exit 0, 15 paires examinees. npm test reste a executer.

Falsification : Refuter si enumeration des 15 paires i<j trouve une solution absente, si une paire utilise une occurrence absente, ne somme pas a 22, contient un doublon, est mal ordonnee ou si npm test echoue. Une preuve omettant un des six complements invalide aussi le livrable.

Limites : Deux occurrences distinctes requises; reutiliser 11 changerait la reponse. Condition contrefactuelle precise non fournie; aucune intervention mesuree. Cout, latence, robustesse hors entree et consommation runtime inconnus.

Strategie : n_way_counterfactual_fork conservee; branche isolee, aucune autre chambre consultee, aucune promotion. Reçus reserves au runtime.

## Resultat du test officiel

E2 : npm test a execute node verify.cjs; code de sortie 0 et sortie PASS exhaustive unordered pairs. Correctness=1 correspond au test reussi; coverage=1 correspond aux 15/15 paires examinees (E1, E2). Toutes les autres dimensions restent null. Les trois fichiers proteges n ont fait l objet d aucune ecriture. Aucun recu runtime invente.
