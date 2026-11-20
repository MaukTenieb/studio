# Expert 09 : jazz symphonique et free jazz

Étalons : Duke Ellington (les suites), Charles Mingus (Epitaph), Gil Evans, George Russell ; Ornette Coleman (Free Jazz), Cecil Taylor, Sun Ra et l'Arkestra, Albert Ayler, Peter Brötzmann, le Globe Unity Orchestra ; prise de son de Rudy Van Gelder et de Manfred Eicher (ECM). Usages jugés : prises live sans clic, tempo libre, couches de musiciens, swing, grand ensemble, improvisation collective, collections jazz d'Internet Archive.

## Récapitulatif

| Critère | Note moyenne (11 scénarios) |
|---|---|
| 1. Design | 5,8 |
| 2. Direction artistique | 6,5 |
| 3. Puissance | 4,5 |
| 4. Ergonomie | 5,4 |
| 5. Simplicité intuitive | 6,2 |
| 6. Exhaustivité | 4,1 |
| 7. Pertinence | 5,5 |
| 8. Originalité | 5,4 |
| 9. Plaisir potentiel | 4,9 |
| Moyenne générale | 5,4 |

Le Studio lance une prise en deux touchers, sans clic par défaut, et sait compter en secondes. Il place ensuite chaque prise de 114 à 892 ms trop tôt, il arme une seule piste à la fois, et son décompte se tait et décale la prise de 2,62 s au début du projet. Un groupe de jazz ne peut donc ni enregistrer ensemble, ni empiler des couches en place.

## Conditions de mesure

- Application servie en local (http://localhost:8765/), Chromium de Playwright lancé par moi avec `--use-fake-device-for-media-stream`, `--use-fake-ui-for-media-stream` et `--autoplay-policy=no-user-gesture-required`, permission micro accordée au contexte.
- Deux sources de micro :
  1. le faux micro de Chromium (bip périodique à pleine échelle) ;
  2. une boucle numérique : un script d'amorce relie la sortie du Studio (tout nœud branché sur `destination`) à un `MediaStreamDestination`, et `getUserMedia` rend ce flux. Le micro entend donc exactement ce que le Studio joue, sans latence matérielle. Un clip de test de 6 à 8 s contient des impulsions de 1 ms à 1, 2, 3, 4, 5 s (crête 0,8) sur la piste 01. Toute impulsion trouvée ailleurs qu'à sa place dans une prise mesure l'erreur de calage propre au Studio.
- Latences annoncées par le navigateur : `baseLatency` 10 ms, `outputLatency` 30 ms, 44 100 Hz.
- Charge de la machine : 2 cœurs, charge moyenne de 29,5 à 42,5 pendant les essais (dix experts en parallèle). Les secondes comptées sont gonflées par cette charge ; je les donne, mais je ne note pas la vitesse sur elles. Les touchers et les écrans, eux, ne dépendent pas de la charge.
- Mesure des exports : /home/claude/outil/mesure.py (EBU R128, vraie crête suréchantillonnée ×4).

## Scénarios

| N° | Scénario | Résultat attendu mesurable |
|---|---|---|
| S1 | Débutant : première prise de voix ou de saxophone | prise sur une piste vide en 3 touchers au plus |
| S2 | Prise sans clic | métronome et décompte éteints par défaut ; 0 clic dans la prise (crête du clic sous −60 dBFS) |
| S3 | Tempo libre | règle en secondes, prise posée à l'instant exact du départ (écart 0 ms) |
| S4 | Latence mesurée | écart de calage d'une prise ≤ 5 ms, réglage de compensation présent |
| S5 | Trois couches successives (contrebasse, puis batterie, puis souffleur) | chaque impulsion reste une seule attaque après 3 couches |
| S6 | Décompte avant la prise | 4 clics audibles, prise calée à ±5 ms |
| S7 | Improvisation saisie après coup | les 60 dernières secondes de l'entrée posées sur la piste en 1 toucher |
| S8 | Plusieurs musiciens en même temps (double quartette de Free Jazz : un quartette à gauche, un à droite) | au moins 2 pistes armées sur 2 entrées en même temps |
| S9 | Swing d'une boucle sur 15 pas | même retard de croche à chaque cycle |
| S10 | Collection jazz d'Internet Archive | résultats jazz sous licence libre en 4 touchers au plus, free jazz et grand orchestre trouvables |
| S11 | Mastering « Jazz » et export du mix | −14 LUFS ±1 LU visé, vraie crête ≤ −1 dBTP |

## Scénarios joués

### S1 Première prise (Créer → Voix)

- Au doigt, iPhone 13 portrait : 2 touchers (Créer, Voix), 1 feuille traversée, prise lancée en 46,9 s sous charge. La prise atterrit sur la piste 01, départ 0 s. Captures [09-creer-iphone](../captures/09-creer-iphone.webp), [09-voix-en-cours-iphone](../captures/09-voix-en-cours-iphone.webp).
- Au doigt, iPhone paysage : 2 touchers, prise lancée ; la fenêtre ne montre qu'une piste et le gros bouton + reste posé sur la ligne de temps pendant la prise ([09-voix-en-cours-iphone-paysage](../captures/09-voix-en-cours-iphone-paysage.webp)). Le clip n'est pas encore apparu 2,5 s après l'arrêt (machine sous charge 40) : non vérifié.
- À la souris, 1 920 × 1 080 : 2 clics, 34,7 s sous charge, clip sur 01 ([09-voix-en-cours-pc1920](../captures/09-voix-en-cours-pc1920.webp)).
- Code : la porte Voix arme la première piste vide de 01 à 18 et clique sur l'enregistrement (index.html ligne 3054).
- Pendant la prise : aucune forme d'onde ne se dessine, aucun indicateur de niveau d'entrée ([09-prise-en-cours-pc1366](../captures/09-prise-en-cours-pc1366.webp)). Le seul analyseur branché sur le micro sert l'accordeur (ligne 2364).

### S2 Prise sans clic

- État initial mesuré : `metro:false`, `countIn:false`, `monitor:false`, 120 bpm.
- Boucle numérique, piste vide, 4,5 s de prise : crête de la prise −77,3 dBFS. Aucun clic n'entre dans la prise.
- 0 toucher à faire : c'est le réglage par défaut. Au doigt comme à la souris, le résultat est identique.

### S3 Tempo libre

- Souris (1 366 et 1 920) : 1 clic sur le chronomètre (`#bFree`, 42 × 42 px en 1 920). Doigt (iPhone) : 2 touchers (⋯ puis chronomètre).
- La règle passe en secondes (0 s, 1 s, 2 s…), l'horloge en minutes:secondes.dixièmes (« 00:15.2 »). Captures [09-libre-pc1920](../captures/09-libre-pc1920.webp), [09-libre-iphone](../captures/09-libre-iphone.webp), [09-libre-secondes-pc1366](../captures/09-libre-secondes-pc1366.webp).
- Prise lancée à 2,37 s avec le faux micro de Chromium : clip posé à 2,37 s exactement, sans calage sur une grille ([09-prise-libre-pc1366](../captures/09-prise-libre-pc1366.webp)).
- Le calage aimanté en mode libre arrondit au dixième de seconde (ligne 1057, `Math.round(x*10)/10`) : 100 ms, soit plus qu'une croche à 300 bpm.

### S4 Latence mesurée

Boucle numérique, une prise par piste, les prises précédentes coupées (M), départ à 0 s :

| Format | Prises | Écart de chaque prise (ms) | Moyenne |
|---|---|---|---|
| pc1366, souris | 6 | −151,9 ; −383,8 ; −891,9 ; −477,1 ; −423,8 ; −113,5 | −407,0 ms |
| iPhone, doigt | 4 | −291,1 ; −509,3 ; −359,6 ; −271,8 | −358,0 ms |

- Signe négatif : la prise est placée trop tôt sur la ligne de temps. L'écart varie de 778 ms d'une prise à l'autre.
- Cause, lignes 1271 à 1283 : le Studio retranche une valeur fixe, `outputLatency + 0,02 s` (ici 50 ms), puis lance `MediaRecorder` par `setTimeout(…, 55)`. Le vrai instant de départ de l'encodeur n'est jamais lu. Quand le fil principal est occupé, le départ glisse, et la prise avec lui.
- Aucun réglage de latence, aucun test de calibration : la recherche de « latence », « latency », « calibr », « offset d'enregistrement » dans index.html ne rend rien.
- La charge de la machine grossit l'écart ; une machine libre le réduirait, sans le ramener à zéro, puisque la latence d'entrée du matériel n'entre jamais dans le calcul.

### S5 Trois couches successives

Boucle numérique : couche 1 sur 02 pendant que 01 joue, couche 2 sur 03 pendant que 01 et 02 jouent, couche 3 sur 04 (pc1366, souris ; [09-couches-pc1366](../captures/09-couches-pc1366.webp)).

| Couche | Attaques entendues autour de l'impulsion de 1,000 s |
|---|---|
| 1 | 0,8915 s (1 attaque, −108,5 ms) |
| 2 | 0,6487 s et 0,7571 s (2 attaques) |
| 3 | 0,5161 ; 0,5352 ; 0,6245 ; 0,7589 ; 0,8673 s (5 attaques étalées sur 351 ms) |

Un coup de caisse claire joué par trois musiciens en couches devient 5 attaques. L'écart se cumule à chaque couche. Une prise refaite sur une piste déjà remplie s'ajoute à l'ancienne et les deux jouent ensemble : `tr.clips.push` sans retrait (ligne 1274), aucune rangée de prises, aucun choix de la meilleure prise.

### S6 Décompte

- Bouton « 1234 » : 1 clic (49 × 42 px en 1 920) ; au téléphone, 2 touchers (⋯ puis 1234).
- Départ à 0 s, sans autre piste : crête de la partie retranchée −65,5 dBFS. Les 4 clics du décompte ne sonnent pas.
- Départ à 0 s avec la piste d'impulsions : les impulsions de 1, 2, 3 s ressortent à −1,622 ; −0,622 ; 0,378 s. La prise est décalée de −2,62 s : le Studio coupe les 2,05 premières secondes (`off = pre + lat`) alors que la lecture démarre à 0 s, sans mesure d'avance (`play(Math.max(0,state.pos-pre))`, ligne 1280).
- Départ à 3 s : écart de +20 ms, la mesure d'avance existe.
- Le clic du décompte ne sonne à aucune position : la condition `a<p0` (ligne 1230) reste fausse au premier calcul, parce que `play()` met `p0` à la valeur de `a`.

### S7 Improvisation saisie après coup (Flashback)

- Souris : 1 clic sur l'horloge à flèche (`#bFlash`), puis la touche F. Au doigt : ⋯, puis l'horloge à flèche, puis à nouveau l'horloge à flèche pour saisir (la touche F manque sur un téléphone).
- Après 4 s d'écoute, la touche F pose un clip « Flashback » de 3,29 s sur 01, à 14,43 s.
- Mémoire de 60 s (`FB_SEC=60`, ligne 2202), capturée par un module de travail audio à l'échantillon près. Free Jazz dure 37 min 10 s sans coupure (source plus bas) : 60 s en représentent 2,7 %.

### S8 Plusieurs musiciens en même temps

- Souris : clic sur le micro de 01, puis sur celui de 02. Résultat : 1 seule piste allumée, `state.armed` vaut l'identifiant de 02. L'état ne garde qu'une piste armée (ligne 1940).
- `getUserMedia` ne demande ni appareil ni canal (ligne 1262) : aucune liste d'entrées, aucun choix des canaux 3-4 d'une carte son.
- Au téléphone, le bouton micro des pistes n'apparaît pas (M, S et effets seulement, [09-voix-en-cours-iphone](../captures/09-voix-en-cours-iphone.webp)) ; la porte Voix arme d'office.
- Résultat : 0 prise simultanée sur 2 pistes. Le double quartette d'Ornette Coleman (deux quartettes dans deux canaux) ne s'enregistre pas en deux pistes.

### S9 Swing sur 15 pas

- Rythme (séquenceur) : curseur « Swing » de 0 à 0,6 (ligne 2632), décalage par rangée de −40 à +40 ms (ligne 2652).
- Mesure : 15 pas tous allumés, swing 0,5, écriture de 2 mesures sur la ligne de temps. Retard de chaque pas, en % de double croche :
  - cycle 1 : 0, 50, 0, 50… 0 ;
  - cycle 2 : 50, 0, 50, 0… 50.
- Le premier temps du motif est retardé un cycle sur deux. Le swing suit la parité du compteur global (`SEQ.step%2`, ligne 2655 ; `i%2`, ligne 2659), et 15 est impair.
- Aucun swing, aucun groove ne s'applique à de l'audio enregistré.

### S10 Collections jazz d'Internet Archive

- Au doigt, iPhone : 4 touchers (Créer, Sons, onglet Archive, Jazz), 16,4 s sous charge. À la souris, 1 920 : 4 clics, 21,3 s. Captures [09-archive-jazz-iphone](../captures/09-archive-jazz-iphone.webp), [09-archive-jazz-pc1920](../captures/09-archive-jazz-pc1920.webp).
- Premiers résultats : « Maple Leaf Rag » (PD, Scott Joplin), « Quantum Jazz Intro » (CC BY-SA), Bertha Lee avec Charley Patton « Mind Reader Blues » (PD), « Negro Prison Songs from the Mississippi State Penitentiary » (PD), « Nothing On But The Radio » de Gary Allan (CC BY), « Come Away with Me » de Norah Jones annoncé CC0.
- La requête est `subject:(jazz OR ragtime OR blues OR swing)` (IA_CATS, ligne 1395) : blues, chants de prison et country remontent avant le jazz. Aucune catégorie free jazz, big band ou grand orchestre côté Internet Archive ; ces mots existent dans les packs Freesound et Jamendo (ligne 1467).
- Le titre de Norah Jones, enregistrement commercial de 2002, affiché CC0, montre qu'une licence déclarée par le déposant passe sans contrôle.
- Les 26 boîtes d'artistes ne comptent aucun musicien de jazz (Whitehouse… Simha Arom ; seule la boîte Ρ, Flying Lotus, cherche « jazz »).

### S11 Mastering « Jazz » et export

- Trois prises du faux micro sur 01, 02, 03, préréglage de master « Jazz » choisi dans la liste du bas (`#mPre`), cible −14 « Streaming » ([09-ensemble-jazz-pc1366](../captures/09-ensemble-jazz-pc1366.webp)). Export WAV : 2 clics.
- Premier export : aucun fichier au bout de 240 s. Second export : fichier rendu en moins de 10 min.
- Mesure du fichier : 18,01 s, crête −1,92 dBFS, vraie crête −0,84 dBTP, −17,6 LUFS intégrés, repos −56,0 dBFS. Écart à la cible : −3,6 LU ; vraie crête au-dessus du plafond de −1 dBTP de la recommandation de diffusion.
- Le préréglage « Jazz » (ligne 909) : grave +1, médium −0,5 à 600 Hz, aigu +1, saturation 0,15, largeur 1,05, plafond −1. Rien sur la dynamique propre à un grand orchestre de jazz (pas de réglage de plage dynamique visée).

## Notes par scénario

Ordre des colonnes : 1 design, 2 direction artistique, 3 puissance, 4 ergonomie, 5 simplicité, 6 exhaustivité, 7 pertinence, 8 originalité, 9 plaisir.

| Scénario | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Moy. | Preuves des notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 Première prise | 7 | 7 | 5 | 8 | 9 | 5 | 7 | 6 | 7 | 6,8 | 2 touchers ; feuille à six portes en pictogrammes (capture 09-creer-iphone) ; pas de niveau d'entrée ni d'onde pendant la prise (puissance, exhaustivité) ; + posé sur la ligne de temps en paysage |
| S2 Sans clic | 7 | 7 | 6 | 7 | 8 | 6 | 9 | 5 | 7 | 6,9 | métronome et décompte éteints par défaut ; −77,3 dBFS dans la prise ; boutons 37 × 34 px en 1 366 |
| S3 Tempo libre | 8 | 7 | 7 | 7 | 7 | 6 | 9 | 8 | 7 | 7,3 | règle en secondes, prise à 2,37 s exactes ; 2 touchers au téléphone ; aimant à 100 ms (ligne 1057) |
| S4 Latence | 4 | 6 | 2 | 3 | 4 | 2 | 3 | 3 | 2 | 3,2 | −407 ms et −358 ms en moyenne, 778 ms de dispersion ; aucun réglage ni test de calibration |
| S5 Couches | 5 | 6 | 3 | 4 | 5 | 3 | 4 | 4 | 3 | 4,1 | 1 impulsion devient 5 attaques en 3 couches ; ni rangée de prises ni choix de prise |
| S6 Décompte | 4 | 6 | 2 | 3 | 4 | 3 | 3 | 4 | 2 | 3,4 | clic absent (−65,5 dBFS) ; prise décalée de −2,62 s au départ du projet |
| S7 Flashback | 7 | 7 | 7 | 7 | 7 | 5 | 9 | 9 | 8 | 7,3 | clip de 3,29 s saisi après coup ; mémoire limitée à 60 s ; 3 touchers au téléphone |
| S8 Plusieurs musiciens | 4 | 6 | 1 | 3 | 5 | 1 | 2 | 3 | 2 | 3,0 | 1 piste armée au plus ; aucun choix d'entrée ni de canal ; armement caché au téléphone |
| S9 Swing 15 pas | 6 | 6 | 5 | 5 | 6 | 4 | 4 | 6 | 5 | 5,2 | swing 0 à 0,6 et ±40 ms par rangée ; premier temps retardé un cycle sur deux |
| S10 Archive jazz | 6 | 6 | 6 | 6 | 6 | 5 | 5 | 6 | 6 | 5,8 | 4 touchers, résultats en direct ; blues et country mêlés ; Norah Jones annoncée CC0 ; 0 boîte jazz |
| S11 Master Jazz | 6 | 7 | 6 | 6 | 7 | 5 | 5 | 5 | 5 | 5,8 | 2 clics ; −17,6 LUFS pour −14 visés ; −0,84 dBTP ; premier export sans fichier après 240 s |
| Moyenne | 5,8 | 6,5 | 4,5 | 5,4 | 6,2 | 4,1 | 5,5 | 5,4 | 4,9 | 5,4 | |

La direction artistique (6 à 7 partout) suit le rendu des écrans : plaques d'acier, horloge à chiffres sur tambour, figurines des Masks ; elle ne change pas d'un scénario à l'autre, d'où des notes proches.

## Comparaison aux outils de référence

| Fonction | Studio (mesuré) | BandLab | Ableton Live | REAPER | Soundtrap |
|---|---|---|---|---|---|
| Compensation de latence | fixe 50 ms, écart mesuré −114 à −892 ms | test automatique et réglage manuel en ms, sur le web et sur mobile [1] | réglage « Driver Error Compensation » [2] | — | calibration automatique [4] |
| Prises multiples sur une piste | s'additionnent, aucune rangée | — | rangées de prises et comping [3] | rangées de prises et comping [5] | — |
| Pistes armées en même temps | 1 | — | — | — | — |
| Tempo libre | règle en secondes, 1 clic | — | — | — | — |
| Saisie après coup | 60 s | — | — | — | — |

Sources :

1. BandLab, « Fixing Latency » : https://help.bandlab.com/hc/en-us/articles/115002959414-Fixing-Latency (test de latence dans Tools sur le web, Latency Fix dans les réglages sur iOS et Android, réglage manuel en millisecondes).
2. Ableton, « Driver Error Compensation FAQ » : https://help.ableton.com/hc/en-us/articles/115000234830
3. Ableton, manuel de Live, chapitre « Comping » : https://www.ableton.com/en/manual/comping (« Every audio or MIDI track in the Arrangement View can consist of multiple parallel lanes. »).
4. Soundtrap, « Latency Calibration » : https://support.soundtrap.com/hc/en-us/articles/25549534050962-Latency-Calibration
5. Sound On Sound, « How to comp multitracks using REAPER » : https://www.soundonsound.com/techniques/how-comp-multitracks-using-reaper
6. Free Jazz: A Collective Improvisation, Wikipédia : https://en.wikipedia.org/wiki/Free_Jazz:_A_Collective_Improvisation (séance du 21 décembre 1960 aux A&R Studios de New York, ingénieur Tom Dowd, deux quartettes dans deux canaux séparés, 37 min 10 s).

Les cases « — » signalent une fonction que je n'ai pas vérifiée chez l'outil, et non une absence prouvée.

Face aux étalons : Free Jazz place deux quartettes simultanés dans deux canaux pendant 37 min sans coupure [6]. Le Studio enregistre une seule entrée à la fois, et sa saisie après coup garde 60 s. Le tempo libre et l'absence de clic par défaut, eux, conviennent à une improvisation collective sans grille.

## Écarts

| N° | Gravité | Écart | Preuve | Correction |
|---|---|---|---|---|
| 09-01 | bloquant | Chaque prise est placée trop tôt, de 114 à 892 ms, avec une dispersion de 778 ms. | S4 : 10 prises en boucle numérique, pc et iPhone ; lignes 1271 et 1283 | Enregistrer par le module `tap` déjà utilisé par Flashback (ligne 2207) au lieu de `MediaRecorder` ; noter `ctx.currentTime` du premier bloc reçu et poser la prise à `recStartPos + (t_premier_bloc − t0) − (outputLatency + latence d'entrée)`. Erreur visée ≤ 3 ms (un bloc de 128 échantillons). |
| 09-02 | bloquant | Le décompte décale la prise de −2,62 s au début du projet et ses 4 clics ne sonnent jamais. | S6 : impulsion de 1 s retrouvée à −1,622 s ; −65,5 dBFS dans l'avance ; lignes 1230 et 1280 | Démarrer l'horloge à `state.pos − pre` même sous 0 (lecture de silence avant 0) et ne retrancher l'avance que sur la durée réellement jouée ; remplacer `a<p0` par un test sur `recStartPos` et appeler `clicks()` pour l'intervalle `[recStartPos − pre, recStartPos)`. |
| 09-03 | bloquant | Une seule piste armée, une seule entrée, aucun choix d'appareil ni de canal : 0 prise simultanée de deux musiciens. | S8 ; lignes 1262 et 1940 | Passer `state.armed` en ensemble de pistes ; liste des entrées par `enumerateDevices()` et choix de l'entrée et du canal (1, 2, 1-2) par piste ; un `ChannelSplitter` par entrée vers chaque piste armée ; une prise par piste à l'arrêt. |
| 09-04 | important | Les couches se décalent en cascade : 1 impulsion devient 5 attaques après 3 couches. | S5 | Corriger 09-01 ; ajouter un test de latence aller-retour (bip émis, bip repris par le micro, écart mémorisé en ms), comme BandLab et Soundtrap [1] [4], avec réglage manuel en ms. |
| 09-05 | important | Une nouvelle prise sur une piste remplie s'ajoute à l'ancienne ; ni rangées de prises, ni choix de la meilleure. | ligne 1275 ; S5 | À l'arrêt, ranger les prises qui se chevauchent dans des rangées sous la piste (pictogramme pile), une seule rangée active à la fois, découpe par glissé pour assembler la prise finale. |
| 09-06 | important | Aucun niveau d'entrée ni forme d'onde pendant la prise ; le bip à pleine échelle du faux micro ressort à +0,5 dBFS de crête sans alerte. | S1, S3 ; capture 09-prise-en-cours-pc1366 ; seul analyseur micro à la ligne 2364 | Vu-mètre d'entrée sur la piste armée (rouge à −1 dBFS), forme d'onde dessinée pendant la prise depuis le module `tap`. |
| 09-07 | important | Le swing retarde le premier temps un cycle sur deux sur 15, 17, 19 et 21 pas. | S9 : cycle 2 = 50, 0, 50… | Calculer la parité sur le pas dans le motif (`k%2`, `kr%2`, `(i%L)%2`) ; proposer un swing par rangée pour les mesures impaires. |
| 09-08 | important | Saisie après coup limitée à 60 s. | ligne 2202 ; S7 | Mémoire réglable de 1 à 40 min (un tampon de 40 min en stéréo flottante à 48 kHz pèse environ 920 Mo ; en 16 bits, 460 Mo) ; sauvegarde par morceaux dans IndexedDB. |
| 09-09 | important | La prise reste en mémoire jusqu'à l'arrêt : `mediaRec.start()` sans tranches (ligne 1283). Une page qui plante pendant une prise de 37 min perd tout. | lecture du code ; non provoqué | Écrire la prise par tranches de 1 s dans IndexedDB et la reconstituer à la réouverture. |
| 09-10 | important | La catégorie Jazz d'Internet Archive mêle blues, chants de prison et country ; aucune catégorie free jazz ni grand orchestre ; un enregistrement commercial annoncé CC0. | S10 ; ligne 1395 | Requête `subject:(jazz) AND NOT subject:(country)` ; sous-catégories free jazz, big band, swing, bebop ; écarter des résultats les titres dont l'auteur et le titre figurent dans MusicBrainz avec un label commercial, ou les marquer d'un pictogramme de doute. |
| 09-11 | important | Mastering « Jazz » : −17,6 LUFS pour −14 visés, −0,84 dBTP. | S11, mesure.py | Ramener le gain du master sur la cible mesurée après rendu (deuxième passe) et limiter la vraie crête à −1 dBTP par suréchantillonnage ×4 dans le limiteur. |
| 09-12 | détail | Aucune boîte d'artiste pour le jazz symphonique ou le free jazz. | liste des 26 boîtes | Boîtes « tribute to » sous lettres grecques libres : grand ensemble (pièce Hall, compresseur lent), souffleurs free (saturation douce, ressort court), double quartette (deux bus gauche et droite). |
| 09-13 | détail | En paysage, le bouton d'enregistrement mesure 30 × 42 px, sous les 44 px. | S1 paysage | Largeur minimale de 44 px pour `#bRec` et `#bPlay`. |
| 09-14 | détail | Le gros + masque la ligne de temps pendant une prise. | captures 09-voix-en-cours-iphone et -paysage | Masquer le + dès que l'enregistrement démarre. |
| 09-15 | détail | Aimant à 100 ms en tempo libre. | ligne 1057 | Aimant en tempo libre sur les attaques des clips voisins, ou 10 ms. |

## À garder tel quel

- Métronome et décompte éteints à l'ouverture : la prise sans clic ne coûte aucun toucher (S2).
- Le bouton chronomètre et la règle en secondes : 1 clic, prise posée à l'instant exact (S3).
- La porte Voix de la feuille Créer : 2 touchers jusqu'à la prise, pictogramme micro (S1).
- Flashback et son module de travail audio à l'échantillon près : la meilleure base pour corriger 09-01 et 09-08 (S7).
- La prise du micro sans annulation d'écho, sans réduction de bruit ni gain automatique (ligne 1262) : le son d'un saxophone ou d'une contrebasse reste brut.
- Le décalage en ms par rangée du séquenceur (±40 ms) : il sert le jeu en avant ou en arrière du temps.
- La recherche Internet Archive en direct, avec la licence affichée sous chaque titre (S10).
