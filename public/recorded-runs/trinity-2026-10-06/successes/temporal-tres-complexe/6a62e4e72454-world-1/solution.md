# Dossier d'architecture de sécurité

20 ans = 7300 jours, modèle simplifié. Hypothèse fixe : V1, livraison et réponse aux incidents sur les 90 premiers jours. Aucun autre monde consulté.

## Trois designs et choix
A : fournisseur derrière un adaptateur, configuration locale. Hypothèse : petite équipe, export documenté. Sortie : JSON versionné et importateur à valider.
B : noyau modulaire local séparant identités, autorisation et stockage. Hypothèse : compétences opérationnelles disponibles. Sortie : formats documentés, tests sémantiques et restauration.
C : deux implémentations indépendantes avec protocole stable. Hypothèse : budget et indépendance réels. Sortie : seconde implémentation qualifiée.

Choix initial A sous réserve d'export et de contrôle local; B devient pertinent lorsque les intégrations le justifient. C augmente la charge et la surface d'attaque à court terme. Ce classement est argumenté, sans benchmark.

## Mutations d'incident locales
Perte de fournisseur : export hors ligne et révocation locale.
Évolution de schéma : conserver les champs inconnus, vérifier la version avant activation.
Réduction de capacité : borner les files, préserver le contrôle d'accès, réduire la télémétrie. Ces scénarios ne sont pas exécutés.

## Contrat et sécurité
JSON UTF-8 conserve nombres finis, chaînes Unicode, tableaux denses, booléens et null. roundTrip refuse les valeurs non JSON et les cycles pour éviter une perte silencieuse. Il écrit un fichier temporaire privé, le relit et le supprime. Les exports métier devraient contenir des références aux secrets, jamais leurs valeurs. Le helper ne détecte pas les secrets et ne constitue pas un coffre.

La version est conservée, sans migration implicite. Compatibilité syntaxique ne signifie pas équivalence des décisions d'autorisation. La vraie sortie exige import indépendant, comparaison de règles, correspondance des identités, accès aux clés et restauration des journaux.

## Acceptation et limites
npm test doit vérifier les champs contractuels, les trois horizons et les deux documents avec égalité stricte. Le vérificateur reste inchangé. Les résultats exécutés sont consignés dans answer.json avec leurs IDs; aucun reçu de vérification runtime n'est rempli. Coût, latence, sécurité réelle et tenue sur vingt ans restent inconnus.

