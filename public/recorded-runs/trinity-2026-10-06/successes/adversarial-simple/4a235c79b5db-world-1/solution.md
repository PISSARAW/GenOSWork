# Solution argumentée

Soit p un nombre premier entier positif strictement supérieur à 3. Par division euclidienne par 6, il existe q entier naturel et un unique r dans {0,1,2,3,4,5} tels que p=6q+r. Si r appartient à {0,2,4}, p est divisible par 2; comme p>3, 2 est alors un diviseur strictement compris entre 1 et p, contradiction avec la primalité. Si r=3, p=3(2q+1) est divisible par 3; puisque p>3, ce diviseur est également propre, contradiction. Il reste exactement r=1 ou r=5. Dans le premier cas p=6q+1; dans le second p=6q+5=6(q+1)-1. Ainsi il existe un entier k tel que p=6k±1. Cette implication est générale et ne dépend d'aucune borne de calcul. Sa réciproque est fausse: 25=6×4+1=5×5 est supérieur à 3 et composé. Le même phénomène existe avec le signe moins: 35=6×6-1=5×7.

## Objections et réponses

Objection : Les nombres premiers 2 et 3 ont des restes interdits: cela semble contredire l'exclusion des classes 2 et 3 modulo 6.

Réponse : L'hypothèse p>3 exclut précisément 2 et 3. Elle assure que les diviseurs 2 ou 3 obtenus sont propres; sans elle, l'énoncé serait faux.

Objection : Un entier de reste 5 s'écrit 6q+5 et non 6q-1: la preuve pourrait donc employer un quotient incorrect pour le signe moins.

Réponse : On définit k=q+1; alors 6q+5=6k-1. Le k existentiel peut différer du quotient euclidien q; aucune égalité erronée n'est utilisée.

Objection : L'absence de divisibilité par 2 ou 3 pourrait suffire à la primalité, ce qui rendrait l'implication réciproque vraie.

Réponse : 25=6×4+1 mais 25=5×5; 35=6×6-1 mais 35=5×7. Les facteurs autres que 2 ou 3 subsistent. La preuve n'affirme que la nécessité.

Objection : La vérification des nombres premiers jusqu'à 100000 laisse ouverte la possibilité d'un premier plus grand dans un reste exclu.

Réponse : La preuve utilise la division euclidienne pour un p arbitraire, sans borne. Un tel premier aurait un diviseur propre 2 ou 3, contradiction, quelle que soit sa taille.

Objection : La liste des restes interdits pourrait oublier une classe modulo 6, ou exclure abusivement tous les nombres impairs.

Réponse : Les six restes uniques sont 0,1,2,3,4,5. Les restes pairs sont 0,2,4; le seul reste impair exclu est 3, divisible par 3. Les restes 1 et 5 restent possibles.

## Limites

La preuve est générale; le test fini ne la remplace pas. Les résultats exécutés et leurs références sont consignés dans answer.json. Aucune mesure non réalisée ni aucun reçu runtime ne sont inventés.
