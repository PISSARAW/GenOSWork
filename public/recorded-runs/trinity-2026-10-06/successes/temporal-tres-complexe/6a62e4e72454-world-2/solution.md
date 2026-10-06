# Dossier d'architecture — monde 2
Le choix conditionnel est A, monolithe modulaire et adaptateurs, sous la fonction V2 d'intégration et d'exploitation entre 90 et 730 jours. B (services et événements) et C (plateforme gérée encapsulée) sont des options argumentées dans answer.json, pas des branches expérimentales promues.

20 ans = 7300 jours est un modèle simplifié. Aucune expérience ne valide une durée de vie réelle de 20 ans.

## Plan de menace et invariants
Les frontières sont l'import de configuration, les adaptateurs, les exports et le plan de contrôle. Les risques incluent corruption d'archive, vol de secrets, dépendance fournisseur et perte de capacité humaine. Séparer secrets et données, contrôler les droits, valider les versions et maintenir un modèle métier indépendant sont des exigences de conception, non des défenses mesurées.

I1 exige l'égalité profonde après sauvegarde et relecture d'un document JSON simple. I2 interdit tout appel fournisseur dans la méthode. I3 impose un fichier temporaire isolé avec nettoyage. Le code rejette cycles, valeurs non JSON, nombres non finis, moins zéro et propriétés calculées. Il transporte les champs inconnus sans leur attribuer une sémantique.

## Compatibilité de sortie
Le format est JSON UTF-8, avec schemaVersion conservé lorsqu'il est fourni. Le transport ne transforme pas les versions : l'application future devra publier ses migrations et refuser une version qu'elle ne sait pas exécuter. Export syntaxique, compatibilité sémantique et restauration métier sont trois validations distinctes. Les données métier et les identités restent hors de l'essai actuel.

## Arbitrages
Une intégration propriétaire rapide peut accumuler une dette de sortie. Une plateforme distribuée multi-fournisseur immédiate peut améliorer certaines options futures tout en dépassant la capacité d'exploitation actuelle. La valeur d'option recherchée est le maintien de choix futurs, sans score financier inventé.

## Vérification et limites
npm test est l'acceptation fournie : deux configurations, versions 1 et 2, Unicode, zéro, false, null et tableau vide. E1 dans answer.json rapporte son résultat réellement exécuté. E2 décrit le code inspecté. Les tests ne mesurent ni attaque, ni débit, ni latence, ni restauration métier, ni sortie fournisseur. La réduction de resource_capacity est un contre-factuel déclaré, non une intervention exécutée.

La recette planned est respectée : hypothèse fixe, menace et surfaces explicites, implémentation de l'invariant puis test. Les mutations d'incident sont des scénarios de revue; aucune autre chambre n'est consultée. Aucun résultat n'est promu et aucun reçu runtime n'est créé.
