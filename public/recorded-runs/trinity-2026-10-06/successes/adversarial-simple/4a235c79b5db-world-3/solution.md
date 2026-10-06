# Examen adversarial

L'énoncé est vrai ; sa réciproque est fausse. Le verdict « reject » du rapport porte sur la réciproque attaquée, et non sur le théorème initial.

## Preuve générale

Soit p un entier premier avec p > 3. Par la division euclidienne par 6, il existe un entier q et un unique reste r dans {0,1,2,3,4,5} tels que p = 6q + r. Si r vaut 0, 2 ou 4, p est divisible par 2. Puisque p > 3, on a 1 < 2 < p : 2 serait donc un diviseur propre de p, contradiction avec sa primalité. Si r vaut 3, p = 3(2q+1), donc 3 divise p ; comme 1 < 3 < p, cela contredit aussi sa primalité. Il ne reste que r = 1 ou r = 5. Dans le premier cas p = 6q+1 : prendre k=q. Dans le second cas p = 6q+5 = 6(q+1)−1 : prendre k=q+1. Ainsi tout premier strictement supérieur à 3 est de la forme 6k±1, pour un entier k. La réciproque n'est pas vraie : 25 = 6·4+1 = 5·5, et 5 est un diviseur propre de 25. La condition élimine les facteurs 2 et 3, mais pas les facteurs premiers plus grands.

## Tentatives de falsification

1. Objection : Un nombre divisible par 2 ou 3 peut être premier : les nombres 2 et 3 rendent-ils l'élimination des restes invalide ?

   Réponse : L'hypothèse p > 3 garantit que 2 et 3 sont strictement plus petits que p. Leur divisibilité donne alors un diviseur propre, contrairement aux exceptions 2 et 3 exclues explicitement.

2. Objection : Le reste 5 donne 6q+5 et non littéralement 6q−1 : la preuve change-t-elle abusivement le paramètre k ?

   Réponse : Le paramètre est existentiel. L'identité exacte 6q+5 = 6(q+1)−1 permet de choisir l'entier k=q+1 ; aucun paramètre fixé à l'avance n'est modifié.

3. Objection : La preuve semble laisser croire que tout entier de la forme 6k±1 est premier ; 25 pourrait-il casser l'énoncé ?

   Réponse : 25 = 6·4+1 = 5² réfute seulement la réciproque. Il n'est pas premier, donc n'entre pas dans l'hypothèse de l'énoncé initial. De même 35 = 6·6−1 = 5·7 couvre l'autre signe.

4. Objection : Une recherche finie de nombres premiers ne suffit pas : un premier plus grand que 100000 pourrait avoir un reste exclu.

   Réponse : Le résultat universel repose sur la division euclidienne et les diviseurs propres, valables pour tout entier p > 3. La recherche finie sert uniquement de contrôle reproductible et ne limite pas la portée de l'argument.

## Acceptation et traçabilité

Le contrat est défini par mission.txt ; package.json lance node verify.cjs avec npm test. verify.cjs contrôle les champs, le témoin composé et tous les premiers entre 4 et 100000 par division d'essai. Il ne certifie pas formellement la prose. Le résultat réellement exécuté sera ajouté après exécution. Les références locales aux exécutions ne sont pas des reçus attribués par le runtime.

## Limites

- La preuve utilise la définition usuelle d'un nombre premier : entier positif supérieur à 1 ayant exactement deux diviseurs positifs.
- Le contrôle informatique jusqu'à 100000 est fini et ne prouve pas seul l'énoncé universel.
- Le vérificateur vérifie des champs et des exemples, mais ne certifie pas formellement la validité du texte de preuve.
- Aucun reçu du runtime, contrôle indépendant ou résultat de promotion n'est inventé ; leur disponibilité reste inconnue.

La condition contrefactuelle et ses valeurs numériques ne sont pas fournies dans les fichiers locaux. Aucune intervention sur resource_capacity n'est exécutée. Les dimensions non mesurées restent nulles. Les outils organisationnels annoncés ne sont pas disponibles dans la liste des outils appelables ; cela n'empêche pas la tâche locale. Aucune autre chambre n'a été consultée.

## Résultat effectivement exécuté

`npm test` a terminé avec le code 0. Sortie : `PASS residue partition, converse witness and trial division through 100000; prose proof still requires review`. Référence de sortie locale : `execution:8f26e4` (ce n'est pas un reçu runtime). Le seul claim est `mission-answer` ; ses critères détaillés de falsification, sa provenance et le vecteur de mesures figurent dans answer.json. Le verdict reject vise la réciproque ; le théorème initial est défendu.
