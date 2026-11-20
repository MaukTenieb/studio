# Expert 10 : design d'interface et direction artistique

Étalons : les dix principes de Dieter Rams, Teenage Engineering (OP-1), Elektron, l'Akai MPC, Ableton Live et Push, Native Instruments Maschine, BandLab ; Don Norman, les dix heuristiques de Jakob Nielsen, Apple HIG et Material Design pour les cibles tactiles.

Application jouée : copie locale de `index.html` (serveur http://localhost:8765/, langue fr), Chromium sans tête par Playwright, formats `iphone` (390 × 664, toucher), `iphone-paysage` (664 × 390, toucher), `pc1366` (1 366 × 768, souris), `pc1920` (1 920 × 1 080, souris), mode simple et Atelier. Scripts dans /tmp/expert10/ (hors dépôt) : `metric.js` (mesure de chaque écran), `mesure_ecrans.py`, `scenarios.py`, `premier_son.py`, `abar.py`.

## Récapitulatif

| Critère | Note moyenne (11 scénarios) |
|---|---|
| 1. Design | 4,6 |
| 2. Direction artistique | 6,3 |
| 3. Puissance | 6,2 |
| 4. Ergonomie | 3,5 |
| 5. Simplicité intuitive | 5,1 |
| 6. Exhaustivité | 6,2 |
| 7. Pertinence | 6,4 |
| 8. Originalité | 6,3 |
| 9. Plaisir potentiel | 5,1 |

Les trois écarts les plus graves : 10-01 (barre d'actions du clip invisible sur téléphone debout), 10-02 (téléphone couché : console sans faders, platines sans disques, pad de 56 px de haut, aucun son posable), 10-03 (premier son : 3,3 s de calcul du fil principal avant le premier son, pistes affichées entre 6,3 et 44,9 s après l'ouverture).

## Méthode de mesure

`metric.js` relève, sur chaque écran, chaque élément actif visible et réellement au premier plan (`elementFromPoint` au centre) : boutons, liens, champs, curseurs, `summary`. Il compte la part dont le petit côté mesure moins de 44 px (Apple HIG, WCAG 2.5.5), moins de 48 px (Material) et moins de 24 px. Il relève chaque nœud de texte visible avec sa taille effective (taille calculée × échelle des transformations, rotations comprises), la part sous 11 px et sous 12 px (plancher de `insertkoin/DA.md`), les textes rognés par leur cadre, les textes qui défilent en téléprompteur, les cibles rognées par un cadre défilant, le débordement horizontal de la page, et la géométrie (en-tête, pied, bibliothèque, tête de piste, nombre de pistes visibles).

Le temps jusqu'au premier son vient d'une sonde posée avant le chargement : chaque branchement vers la sortie d'un `AudioContext` passe aussi par un analyseur relevé toutes les 10 ms ; le premier échantillon au-dessus de 0,001 (−60 dBFS) date le premier son. Les rendus hors ligne (`OfflineAudioContext`) sont exclus.

Limite : dix experts jouent l'application en même temps sur la même machine (2 processeurs, charge moyenne relevée de 41 à 108 pendant la session). Les durées en secondes d'horloge varient donc d'un facteur 9 d'un essai à l'autre. Le temps de calcul du fil principal (`ThreadTime` du protocole Chrome) dépend peu de la charge : c'est la mesure de référence du scénario S1. Deux lancements de Chromium se sont arrêtés en cours de route sous la charge ; ils ont été rejoués.

## Mesures par format et par mode

Somme des écrans mesurés (simple : accueil, Créer, Rythme, Pads, Master, clip choisi, menu ⋯ ; Atelier : accueil, console, scène, platines, pads, rythme).

| Format, mode | Écrans | Cibles | Sous 44 px | Sous 24 px | Textes | Sous 11 px | Plus petit texte | Libellés qui défilent | Cibles rognées | Débordement de page |
|---|---|---|---|---|---|---|---|---|---|---|
| iphone, simple | 6 | 237 | 231 (97 %) | 11 | 187 | 56 (30 %) | 9,4 px | 3 | 22 | 0 px |
| iphone, Atelier | 6 | 285 | 284 (100 %) | 38 | 201 | 90 (45 %) | 9,4 px | 3 | 27 | 0 px |
| iphone-paysage, simple | 7 | 216 | 211 (98 %) | 14 | 154 | 55 (36 %) | 9,4 px | 0 | 30 | 0 px |
| iphone-paysage, Atelier | 6 | 240 | 239 (100 %) | 58 | 148 | 64 (43 %) | 9,4 px | 0 | 39 | 0 px |
| pc1366, simple | 6 | 598 | 565 (94 %) | 96 | 530 | 87 (16 %) | 10,3 px | 0 | non mesuré | 0 px |
| pc1366, Atelier | 6 | 715 | 713 (100 %) | 142 | 659 | 70 (11 %) | 10 px | 0 | 10 | 0 px |
| pc1920, simple | 6 | 867 | 811 (94 %) | 36 | 919 | 0 (0 %) | 11,7 px | 0 | 12 | 0 px |
| pc1920, Atelier | 6 | 899 | 880 (98 %) | 84 | 1 010 | 72 (7 %) | 10,5 px | 38 | 15 | 0 px |

Lecture : sur chaque format, 94 à 100 % des cibles visibles mesurent moins de 44 px de petit côté. La cause se trouve dans une ligne de CSS : `--u:clamp(30px,4.4vmin,42px)` (index.html, ligne 29) plafonne l'unité de bouton à 42 px. Sur téléphone, un tiers à presque la moitié des textes visibles passent sous 11 px ; les libellés du pied (`.lbl`, `font-size:.8em`, ligne 290) mesurent 9,5 à 9,8 px. Aucune page ne déborde à l'horizontale.

Proportions mesurées sur l'écran d'accueil (pistes chargées) :

| Format | En-tête (part de la hauteur) | Pied | Bibliothèque | Tête de piste (part de la largeur) | Hauteur d'une piste (part de la hauteur) | Pistes visibles | Bouton Lecture |
|---|---|---|---|---|---|---|---|
| iphone 390 × 664 | 53 px (8 %) | 55 px (8 %) | en bas, 199 px (30 % de la hauteur) | 140 px (36 %) | 87 px (13 %) | 4 | 40 × 42 |
| iphone-paysage 664 × 390 | 51 px (13 %) | 55 px (14 %) | en bas, 156 px (40 % de la hauteur) | 180 px (27 %) | 87 px (22 %) | 1 | 30 × 42 |
| pc1366 1 366 × 768 | 56 px (7 %) | 47 à 87 px (6 à 11 %) | à droite, 342 px (25 % de la largeur) | 240 px (18 %) | 98 px (13 %) | 6 | 37 × 34 |
| pc1920 1 920 × 1 080 | 68 px (6 %) | 55 px (5 %) | à droite, 400 px (21 % de la largeur) | 240 px (13 %) | 119 px (11 %) | 8 | 42 × 42 |

La tête de piste passe de 36 % à 13 % de la largeur, la bibliothèque change de côté entre téléphone et ordinateur, et le téléphone couché garde 25 % de la hauteur pour les pistes (1 piste visible) contre 49 % en portrait et 83 à 87 % sur ordinateur. Le bouton Lecture change de forme d'un format à l'autre (40 × 42, 30 × 42, 37 × 34, 42 × 42). La règle « proportions constantes sur tous les écrans et toutes les orientations » (PENSE-BETE.md) n'est pas atteinte.

## Scénarios

Chaque scénario a été joué au doigt (iphone, iphone-paysage) puis à la souris (pc1366, pc1920 pour les mesures d'écran).

### S1. Premier son, débutant, téléphone

Résultat attendu : un son en 2 s au plus, en 3 touchers au plus, depuis l'ouverture.

- Chemin le plus court trouvé : bouton + doré au centre du projet vide, case Rythme, triangle de lecture du séquenceur. 3 touchers, 3 écrans (accueil, feuille Créer, tiroir Rythme). Même chemin et même compte à la souris.
- Silence avant le premier geste : aucun échantillon au-dessus de −60 dBFS entre l'ouverture et le premier toucher, sur les quatre formats. L'ouverture ne déclenche aucun son.
- Calcul du fil principal jusqu'au premier son : 3,33 s (iphone), 3 s environ (pc1366), dont 1,54 s de script. Ce calcul seul dépasse les 2 s visées, sur une machine sans aucune autre charge.
- Durées d'horloge sous charge : premier son à 12,7 / 63,2 / 111,1 / 112,7 s (iphone, quatre essais dont un en paysage), 17,8 / 38,9 / 89,6 s (pc1366), 23,1 / 23,1 s (pc1920). Plus longue tâche bloquante : 0,4 à 13,5 s.
- Cause visible dans le code : `boot()` attend `await renderKit()` (ligne 2458), qui synthétise tout le kit, avant `fillTracks()` et `render()` (lignes 2465 à 2466). Les 32 pistes apparaissent donc entre 6,3 et 44,9 s après l'ouverture selon la charge (relevé `tracks`), alors que la liste du kit apparaît entre 0,3 et 4,4 s. Pendant cet intervalle, l'écran montre une zone vide avec le magnétophone en filigrane (capture [10-iphone-simple-accueil](../captures/10-iphone-simple-accueil.webp) prise avant chargement au premier passage).
- BandLab : Créer, puis le type de piste Drum Machine, puis lecture : même nombre de touchers d'après l'aide officielle (sources plus bas). L'écart vient du temps de calcul, pas du chemin.

### S2. Lecture de l'écran d'accueil sur quatre formats

Résultat attendu : 0 cible sous 44 px, 0 texte sous 11 px, mêmes proportions partout.

- iphone : 43 cibles sur 44 sous 44 px ; 8 textes sur 30 sous 11 px (libellés Créer, Pads, Rythme à 9,5 à 9,8 px).
- pc1366 : 117 cibles sur 118 sous 44 px (boutons de l'en-tête 37 × 34, zoom 24 × 24, M S 26 × 26).
- pc1920 : 146 sur 150 sous 44 px ; 0 texte sous 11 px.
- En mode simple sur ordinateur, l'en-tête garde 18 commandes : Début, Lecture, Enregistrer, tempo, métronome, boucle, aimant, secondes, décompte, écoute de contrôle, retour arrière, accordeur, commandes, annuler, Atelier, nouveau projet, export, langue (capture [10-pc1366-simple-clip](../captures/10-pc1366-simple-clip.webp)). Le mode simple ne simplifie que le pied.

### S3. Poser un son de la bibliothèque sur une piste

Résultat attendu : 1 clip sur la piste visée, en 3 gestes au plus.

- iphone : 4 gestes (ouvrir le tiroir d'un Mask, toucher bref sur le son, appui long de 0,8 s, toucher sur la piste). Les pistes s'éclairent pendant l'attente : bonne réponse visible ([10-iphone-son-pris](../captures/10-iphone-son-pris.webp)). Résultat : 1 clip posé à l'endroit touché ([10-iphone-son-pose](../captures/10-iphone-son-pose.webp)).
- pc1366 : 3 gestes (ouvrir le tiroir, clic d'écoute, glisser sur la piste) ; l'écoute part au clic ; 1 clip posé.
- iphone-paysage : échec. La bibliothèque montre deux en-têtes (Fauna Korhogo, Truce) et 0 ligne de son dans ses 156 px ; le toucher sur un son hors cadre reste sans effet ; 0 clip après 4 gestes ([10-iphone-paysage-son-pris](../captures/10-iphone-paysage-son-pris.webp)).

### S4. Rythme : motif puis écriture en clips

Résultat attendu : un motif joué en 1 toucher, écrit sur les pistes en 1 toucher, lisible sur la piste.

- Créer, Rythme, lecture : 3 touchers. Écrire : 1 toucher. Rangées 01 à 08 aux couleurs des Masks, longueurs 15, 16, 17, 19, 21 en touches directes ([10-iphone-simple-rythme](../captures/10-iphone-simple-rythme.webp)).
- Écriture : un clip par coup. Sur pc1920, l'écran après écriture compte 21 noms de clips rognés (« Un », « Ho », « Gra ») et une poignée de fondu ronde à chaque bord, soit des dizaines de pastilles noires par piste ([10-iphone-paysage-simple-clip](../captures/10-iphone-paysage-simple-clip.webp), [10-pc1366-simple-clip](../captures/10-pc1366-simple-clip.webp)). BandLab écrit le motif en une région que l'on boucle en tirant son coin.
- iphone-paysage : les touches Écrire et Fermer sortent par le bas du tiroir, coupées à mi-hauteur ([10-iphone-paysage-simple-rythme](../captures/10-iphone-paysage-simple-rythme.webp)).

### S5. Barre d'actions d'un clip

Résultat attendu : toucher un clip affiche Supprimer, Copier, Boucle, Trancher, Plus, chacun visible et touchable.

- pc1366 : la barre apparaît au-dessus du pied, 5 touches de 44 à 70 × 41 px, libellés entiers ([10-pc1366-barre-clip](../captures/10-pc1366-barre-clip.webp)).
- iphone : la barre existe (`#abar.on`, 5 touches de 32 × 42 px, rectangle 102, 353, 186 × 52) mais `elementFromPoint` au centre de chaque touche renvoie le canevas ou la piste : la barre passe sous la zone des pistes. L'utilisateur voit un clip entouré et aucune action ([10-iphone-barre-clip-verif](../captures/10-iphone-barre-clip-verif.webp)). En plus, la touche Master disparaît du pied dès qu'un clip est choisi (ligne 397 : `footer:has(#abar.on) .master{display:none}` sous 1 100 px).

### S6. Pads au doigt et à la souris

Résultat attendu : surface de jeu d'au moins 200 px de côté, choix du mode en 1 toucher, glissé suivi sans retard.

- iphone : deux pads de 180 × 164 px ; le glissé de 20 pas passe sans erreur. Les dix onglets de mode mesurent 23 px de haut ; 9 sur 10 sont rognés par le cadre défilant (« S » visible pour Scratch) ([10-iphone-simple-pads](../captures/10-iphone-simple-pads.webp)).
- pc1366 : pads de 497 × 260 px ; onglets de 26 px de haut, 5 sur 10 rognés ([10-pc1366-pad-souris](../captures/10-pc1366-pad-souris.webp)).
- iphone-paysage : pads de 317 × 56 px, inutilisables au doigt ([10-iphone-paysage-simple-pads](../captures/10-iphone-paysage-simple-pads.webp)).
- Les axes (« Enveloppe », « Timbre », « Main », « Hauteur −12 … +12 ») mesurent 9,4 à 10,5 px, en vert ou gris sur fond sombre.

### S7. Master

Résultat attendu : choisir un mastering et comparer A / B en 3 touchers ; noms en français ; rien ne recouvre le tiroir.

- Master, une carte, A puis B : 4 touchers. 25 masterings plus Référence, tous en français (Universel, Feu, Clarté, Bande, Naturel, Cinéma, Spatial, Punch, Chaud, Brillant…) : l'anglais relevé par le juge DA est corrigé.
- Présentation : grille de 25 cartes à cases à cocher ([10-pc1366-simple-master](../captures/10-pc1366-simple-master.webp)).
- Projet vide : le bouton + doré de 96 px reste au centre et passe par-dessus le tiroir Master, sur pc1366 et en paysage ([10-iphone-paysage-simple-master](../captures/10-iphone-paysage-simple-master.webp)).

### S8. Atelier sur téléphone : console, scène, platines

Résultat attendu : Atelier ouvert en 2 touchers (⋯ puis clé) ; faders et disques jouables au doigt.

- Ouverture : ⋯ puis clé, 2 touchers. Pied défilant : la case Créer apparaît coupée (« Crée ») ([10-iphone-atelier-console](../captures/10-iphone-atelier-console.webp)).
- Console, iphone : 73 cibles sur 73 sous 44 px ; 57 textes sur 69 sous 11 px ; graduations « −12 » et « −24 » superposées. Sur chaque tranche, les touches M et S affichent « 1 » et « ; » : le téléprompteur (`tele()`, ligne 2583, appliqué à `#console` ligne 2586) fait défiler les lettres M et S dans des touches plus étroites que la lettre. pc1920 : 38 libellés M / S en défilement ([10-pc1920-atelier-console](../captures/10-pc1920-atelier-console.webp)).
- Console, iphone-paysage : tiroir de 65 px de haut, faders absents, seules les têtes S, effets et D restent ([10-iphone-paysage-atelier-console](../captures/10-iphone-paysage-atelier-console.webp)).
- Platines : disques de 53 px de diamètre en portrait ([10-iphone-atelier-platines](../captures/10-iphone-atelier-platines.webp)) ; en paysage, les disques disparaissent, seuls les oscilloscopes restent ([10-iphone-paysage-atelier-platines](../captures/10-iphone-paysage-atelier-platines.webp)).
- Scène, pc1920 : photographie de la kave voûtée sous le tube, propre et lisible ([10-pc1920-atelier-scene](../captures/10-pc1920-atelier-scene.webp)).

### S9. Rotation portrait vers paysage

Résultat attendu : mêmes rapports de surfaces dans les deux orientations.

- Pistes : 49 % de la hauteur en portrait, 25 % en paysage ; 4 pistes visibles contre 1.
- Bibliothèque : 30 % de la hauteur en portrait, 40 % en paysage. Le README annonce « téléphone couché avec bibliothèque à droite » ; à 664 px de large, la règle `@media (max-width:760px)` (lignes 259 et 310) la place en bas.
- Tiroirs en paysage : Rythme coupé, Master coupé, console sans faders, platines sans disques, pads de 56 px de haut.

### S10. Direction artistique d'ensemble

Résultat attendu : chaque surface est la photographie d'un objet des années 1980 sous la lumière de la kave ; palette et lettres de `insertkoin/DA.md`.

- Réussi : scène voûtée photographiée sous le tube, pads en écran à phosphore et disque photographié, plaques d'acier et jonc riveté entre les zones, étiquettes Dymo photographiées du tiroir Fauna, VU-mètre et plaque MAUK TENIEB dans l'en-tête, cases de la feuille Créer sur acier brossé ([10-iphone-simple-creer](../captures/10-iphone-simple-creer.webp)).
- Écarts : la zone des pistes vides reste un aplat sombre avec une grille vectorielle ; le bouton + est un disque en dégradé CSS (lignes 296 à 297), sans équivalent photographié ; la grille Master suit un modèle de cartes à cases.
- Lettres : le studio utilise Barlow Semi Condensed et Courier Prime (lignes 15 à 18, 31). `DA.md` limite le lettrage à quatre familles : Bungee, Bebas Neue, Press Start 2P, DM Mono. Aucune des quatre n'apparaît.
- Couleurs : les cinq couleurs de la palette figurent dans les variables (lignes 22 à 27 : #0b0908, #ffa726, #ffe3a0, #c9302a, #4fc3f7), mais les 470 premières lignes (CSS) emploient 105 couleurs hexadécimales distinctes ; l'accent le plus fréquent du CSS est #f2e3a6, hors palette.

### S11. Libellés trop longs : téléprompteur ou coupe

Résultat attendu : 0 libellé coupé, chaque libellé trop long défile sur place.

- Défilement observé : 2 à 3 libellés du séquenceur sur téléphone (noms de rangée), 38 lettres M / S de la console sur pc1920 (à tort, voir S8).
- Coupes sans défilement : noms des clips (21 sur l'écran clip de pc1920 ; « Un », « Naph », « Ho » sur téléphone), onglets des pads rognés par leur cadre (9 sur 10 sur téléphone), case Créer du pied en Atelier (« Crée »). Les noms de clips ne passent pas par `tele()` : la fonction ne traite que les boutons (ligne 2583).

## Notes par scénario

Échelle : 10 égale ou dépasse l'étalon nommé, 5 fonctionne avec des défauts mesurés, 1 absent ou cassé.

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir | Moyenne |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 Premier son | 5 | 7 | 6 | 3 | 6 | 6 | 7 | 7 | 4 | 5,7 |
| S2 Lecture de l'accueil | 4 | 7 | 5 | 2 | 5 | 5 | 5 | 6 | 5 | 4,9 |
| S3 Son vers piste | 6 | 7 | 7 | 6 | 6 | 7 | 7 | 6 | 6 | 6,4 |
| S4 Rythme et écriture | 6 | 7 | 7 | 5 | 6 | 6 | 7 | 8 | 7 | 6,6 |
| S5 Barre du clip | 3 | 6 | 6 | 1 | 3 | 6 | 5 | 5 | 3 | 4,2 |
| S6 Pads | 6 | 8 | 7 | 4 | 6 | 7 | 7 | 8 | 7 | 6,7 |
| S7 Master | 5 | 5 | 7 | 5 | 6 | 8 | 7 | 4 | 6 | 5,9 |
| S8 Atelier au téléphone | 3 | 6 | 7 | 2 | 3 | 7 | 6 | 7 | 4 | 5,0 |
| S9 Rotation | 3 | 5 | 5 | 2 | 4 | 5 | 6 | 5 | 3 | 4,2 |
| S10 DA d'ensemble | 6 | 6 | 6 | 6 | 6 | 6 | 7 | 7 | 7 | 6,3 |
| S11 Libellés longs | 4 | 5 | 5 | 3 | 5 | 5 | 6 | 6 | 4 | 4,8 |
| Moyenne | 4,6 | 6,3 | 6,2 | 3,5 | 5,1 | 6,2 | 6,4 | 6,3 | 5,1 | |

Preuves des notes :

- S1 : 3 touchers et 3 écrans (premier_son.py) ; 3,33 s de calcul du fil principal ; pistes à 6,3 à 44,9 s ; ligne 2458. Ergonomie 3 et plaisir 4 : l'attente dépasse l'objectif « deux secondes ». DA 7 : feuille Créer sur acier photographié, pictogrammes nets.
- S2 : tableau des mesures (94 à 100 % des cibles sous 44 px, 30 à 45 % des textes sous 11 px sur téléphone) ; ligne 29 ; 18 commandes dans l'en-tête en mode simple sur ordinateur.
- S3 : 4 gestes et 1 clip (iphone), 3 gestes et 1 clip (pc1366), 0 clip en paysage ; captures son-pris, son-pose.
- S4 : longueurs impaires en touches directes, couleurs des Masks ; 21 noms rognés, un clip par coup ; Écrire coupé en paysage.
- S5 : `elementFromPoint` → CANVAS / DIV sur les 5 touches (abar.py) ; ligne 197 ; ligne 397 ; capture barre-clip-verif. Ergonomie 1 : fonction présente et inaccessible au doigt.
- S6 : pads 180 × 164 (iphone), 497 × 260 (pc1366), 317 × 56 (paysage) ; onglets 23 px, 9 sur 10 rognés ; écran à phosphore et disque photographiés (DA 8).
- S7 : 25 masterings et Référence en français ; grille de cartes ; bouton + par-dessus le tiroir. Originalité 4 : modèle repris de BandLab Mastering (README).
- S8 : 73 / 73 cibles sous 44 px, 57 / 69 textes sous 11 px (console iphone) ; M / S affichés « 1 » et « ; » ; faders et disques absents en paysage.
- S9 : tableau des proportions ; lignes 259 et 310.
- S10 : lignes 15 à 18 et 31 (polices), 105 couleurs, captures scène et Créer.
- S11 : 21 noms de clips rognés (pc1920), 38 défilements M / S, ligne 2583.

## Comparaison avec les étalons

| Geste ou règle | Étalon | Studio (mesuré) |
|---|---|---|
| Taille d'une cible tactile | 44 × 44 px (WCAG 2.5.5, Apple HIG) ; 48 dp, environ 9 mm (Google, Material) | 94 à 100 % des cibles sous 44 px ; unité de bouton plafonnée à 42 px (ligne 29) |
| Commandes liées à l'écran | OP-1 : quatre encodeurs de couleur reliés à l'interface affichée (guide Teenage Engineering) | Pads : deux axes nommés en texte de 9,4 à 10,5 px, mode choisi dans une bande défilante de 23 px |
| Premier son (BandLab) | Créer, type de piste Drum Machine, lecture | 3 touchers ; 3,3 s de calcul avant le premier son |
| Poser un son (BandLab mobile) | toucher un vide, icône échantillon, « + » | 4 gestes en portrait, échec en paysage |
| Région de motif (BandLab Drum Machine) | le motif devient une région bouclable | un clip par coup, noms rognés |
| Menu d'un clip (BandLab mobile) | menu de région en bas d'écran | barre présente mais cachée sous les pistes en portrait |
| Échantillonneur (BandLab Sampler) | 16 pads, modes Gate / One Shot / Loop | 2 pads XY sur le master, 10 modes ; pas de grille de 16 pads (déjà noté dans BANDLAB-RELEVE.md) |
| Heuristique 1 de Nielsen : visibilité de l'état du système | l'utilisateur sait ce qui se passe | 6 à 45 s d'écran sans pistes et sans indication de chargement ; clip choisi sans actions visibles |
| Heuristique 8 de Nielsen : design esthétique et minimaliste ; Rams, principe 10 : aussi peu de design que possible | | 18 commandes dans l'en-tête du mode simple sur ordinateur |
| Rams, principe 8 : soigné jusqu'au dernier détail | | M / S de la console affichés « 1 » et « ; » ; « Crée » coupé |

Sources :

- https://www.w3.org/WAI/WCAG21/Understanding/target-size.html (« at least 44 by 44 CSS pixels »)
- https://support.google.com/accessibility/android/answer/7101858 (48 dp, environ 9 mm)
- https://developer.apple.com/design/human-interface-guidelines/accessibility
- https://teenage.engineering/guides/op-1/original/layout (encodeurs T1 à T4, de couleur, reliés à l'affichage)
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.vitsoe.com/us/about/good-design
- https://help.bandlab.com/hc/en-us/articles/115002945153-Getting-started-on-BandLab
- https://help.bandlab.com/hc/en-us/articles/115002959894-Using-the-Drum-Machine
- https://help.bandlab.com/hc/en-us/articles/4403006058009-Using-the-Sampler
- https://help.bandlab.com/hc/en-us/articles/900003008403-How-do-I-import-loops-on-BandLab-Mobile

## Écarts

### 10-01 — Barre d'actions du clip invisible sur téléphone debout (bloquant)

Preuve : abar.py sur iphone. `#abar` a la classe `on`, 5 touches de 32 × 42 px à y = 358, mais `elementFromPoint` renvoie le canevas ou la piste au centre de chacune. Capture [10-iphone-barre-clip-verif](../captures/10-iphone-barre-clip-verif.webp). CSS ligne 197 : `position:absolute;bottom:calc(100% + 6px);z-index:12` à l'intérieur du pied, dont la pile d'affichage passe sous la zone des pistes. Ligne 397 : la touche Master disparaît en même temps.

Correction : sous 760 px, sortir la barre de la pile du pied : `@media (max-width:760px){footer{z-index:20}}`, ou placer `#abar` dans le flux du pied (`position:static;transform:none;flex:1`) à la place des cases Pads et Rythme tant qu'un clip est choisi. Garder la touche Master visible (retirer `.master` de la règle de la ligne 397). Contrôle : `elementFromPoint` au centre de chaque touche renvoie la touche.

### 10-02 — Téléphone couché inutilisable pour les tiroirs et la bibliothèque (bloquant)

Preuve : en 664 × 390, bibliothèque en bas sur 156 px (40 % de la hauteur), 1 piste visible ; console sans faders, platines sans disques, pads de 317 × 56 px, Écrire et Fermer coupés dans Rythme, aucun son de la bibliothèque visible (0 clip après 4 gestes). Captures [10-iphone-paysage-atelier-console](../captures/10-iphone-paysage-atelier-console.webp), [10-iphone-paysage-atelier-platines](../captures/10-iphone-paysage-atelier-platines.webp), [10-iphone-paysage-simple-pads](../captures/10-iphone-paysage-simple-pads.webp), [10-iphone-paysage-simple-rythme](../captures/10-iphone-paysage-simple-rythme.webp), [10-iphone-paysage-son-pris](../captures/10-iphone-paysage-son-pris.webp). Cause : `@media (max-width:760px)` (lignes 259 et 310) traite le paysage comme le portrait.

Correction : une règle `@media (orientation:landscape) and (max-height:500px)` qui place la bibliothèque à droite (`#app{grid-template-columns:1fr 32%}`, `aside{grid-row:1/-1;grid-column:2;height:auto}`), et donne à un tiroir ouvert toute la hauteur sous l'en-tête dans la colonne de gauche, pistes repliées. Contrôle : faders d'au moins 120 px, disques d'au moins 140 px, pads d'au moins 200 × 150 px, 5 sons visibles dans la bibliothèque.

### 10-03 — Premier son trop lent ; pistes absentes pendant le chargement (bloquant face à l'objectif « marche en deux secondes »)

Preuve : 3,33 s de calcul du fil principal avant le premier son sur iphone (premier_son.py, `ThreadTime`), 3 s environ sur pc1366 ; pistes affichées entre 6,3 et 44,9 s après l'ouverture sous charge, liste du kit entre 0,3 et 4,4 s ; `boot()` attend `renderKit()` (ligne 2458) avant `fillTracks()` et `render()` (lignes 2465 à 2466). Aucune indication de chargement pendant l'attente.

Correction : appeler `fillTracks(); syncUI(); render();` avant `await renderKit()` ; synthétiser d'abord les seuls sons des rangées du séquenceur et du premier tiroir ouvert, puis le reste par lots de 20 entre deux images (`requestIdleCallback` ou `setTimeout(…,0)`) ; tant que le kit charge, une aiguille du VU-mètre ou une lampe du pied s'allume (pictogramme, sans texte). Contrôle : premier son à moins de 2 s d'horloge et moins de 1 s de calcul du fil principal sur pc1366 non chargé.

### 10-04 — Cibles sous 44 px sur tous les formats (important)

Preuve : 94 à 100 % des cibles visibles sous 44 px (tableau des mesures). `--u:clamp(30px,4.4vmin,42px)` (ligne 29). Téléphone : M S effets 33 × 36, zoom 38 × 36, numéro de piste 35 × 18, onglets des pads 23 px de haut, touches de la barre du clip 32 × 42. Ordinateur : en-tête 37 × 34, zoom 24 × 24.

Correction : `@media (pointer:coarse){:root{--u:clamp(44px,6vmin,52px)}}` ; onglets des pads `min-height:44px` ; numéro de piste fusionné avec la case ⋯ en une cible de 44 × 44. Sur ordinateur à la souris, garder 34 px. Contrôle : part des cibles sous 44 px égale à 0 sur iphone et iphone-paysage.

### 10-05 — Textes sous 11 px sur téléphone (important)

Preuve : 30 à 45 % des textes visibles sous 11 px sur téléphone ; libellés du pied à 9,5 à 9,8 px (`.lbl{font-size:.8em}`, ligne 290) ; console à 9,6 px avec « −12 » et « −24 » superposés ([10-iphone-atelier-console](../captures/10-iphone-atelier-console.webp)). `DA.md` fixe 12 px au moins.

Correction : `body.simple footer .lbl{font-size:max(12px,.8em)}` ; graduations de la console réduites à 0, −12, −48 en 11 px ; axes des pads en 12 px. Contrôle : 0 texte sous 11 px sur les quatre formats.

### 10-06 — Téléprompteur sur les lettres M et S de la console (important)

Preuve : 38 libellés M / S en défilement sur pc1920 ; chaque touche montre « 1 » ou « ; » ([10-pc1920-atelier-console](../captures/10-pc1920-atelier-console.webp)). `tele()` (ligne 2583) défile dès que le texte dépasse la case de 2 px, et s'applique à `#console` (ligne 2586) ; les touches M et S (ligne 1616) sont plus étroites que leur lettre.

Correction : dans `tele()`, ignorer les textes de 2 caractères au plus (`if(t.textContent.trim().length<=2)return`) ; donner aux touches M et S de la tranche `min-width:1.6em;padding:0`. Contrôle : 0 libellé en défilement dans la console, M et S lisibles.

### 10-07 — Noms de clips coupés ; un clip par coup après Écrire (important)

Preuve : 21 noms rognés sur l'écran clip de pc1920 ; « Un », « Naph », « Ho » sur téléphone ; des dizaines de poignées de fondu par piste ([10-iphone-barre-clip-verif](../captures/10-iphone-barre-clip-verif.webp), [10-pc1366-simple-clip](../captures/10-pc1366-simple-clip.webp)). Les noms de clips ne passent pas par `tele()` (boutons seuls, ligne 2583).

Correction : Écrire rend chaque rangée en un clip par mesure (ou un clip pour toute la longueur, bouclable par son coin, comme une région BandLab) ; masquer le nom quand le clip mesure moins de 48 px et le faire défiler au survol ou au choix du clip au-delà ; poignées de fondu affichées sur le clip choisi seulement. Contrôle : 0 nom rogné sans défilement.

### 10-08 — Onglets des modes de pads rognés et trop bas (important)

Preuve : 10 onglets de 23 px de haut (iphone), 9 sur 10 rognés par la bande défilante ; 5 sur 10 sur pc1366 ([10-iphone-simple-pads](../captures/10-iphone-simple-pads.webp)).

Correction : remplacer la bande par une grille de 10 pictogrammes de 44 × 44 sur deux rangées, ou par un commutateur rotatif photographié à 10 crans au-dessus de chaque pad. Contrôle : 0 onglet rogné.

### 10-09 — Proportions différentes d'un format à l'autre (important)

Preuve : tableau des proportions (tête de piste 36 %, 27 %, 18 %, 13 % de la largeur ; pistes 49 %, 25 %, 83 %, 87 % de la hauteur ; bibliothèque en bas ou à droite ; bouton Lecture 40 × 42, 30 × 42, 37 × 34, 42 × 42).

Correction : fixer trois rapports et les appliquer partout : tête de piste à `clamp(120px,22vw,240px)` ; bibliothèque sur le côté long de l'écran, 30 % de celui-ci ; tiroir ouvert à 50 % de la zone de travail. Bouton Lecture carré, à l'unité `--u`. Contrôle : écart des rapports d'un format à l'autre sous 5 points.

### 10-10 — Bouton + du projet vide au-dessus des tiroirs (important)

Preuve : projet vide, tiroir Master ouvert : le disque de 96 px passe par-dessus les cartes, sur pc1366 et en paysage ([10-pc1366-simple-master](../captures/10-pc1366-simple-master.webp), [10-iphone-paysage-simple-master](../captures/10-iphone-paysage-simple-master.webp)). `#emptyGo{z-index:6}` (ligne 295).

Correction : masquer `#emptyGo` dès qu'un tiroir s'ouvre (`body.drawer-open #emptyGo{display:none}`, classe posée par `drawer()`, ligne 2558). Contrôle : capture du Master sur projet vide sans disque.

### 10-11 — Mode simple sans effet sur l'en-tête de l'ordinateur (important)

Preuve : 18 commandes dans l'en-tête en mode simple sur pc1366 et pc1920 ; 5 sur téléphone. La règle de la ligne 291 ne masque que des touches du pied.

Correction : `body.simple #bMetro,body.simple #bLoop,body.simple #bSnap,body.simple #bFree,body.simple #bCount,body.simple #bMon,body.simple #bFlash,body.simple #bTuner,body.simple #bNew{display:none}`. Reste : Début, Lecture, Enregistrer, tempo, commandes, annuler, Atelier, export, langue. Contrôle : 9 commandes dans l'en-tête du mode simple.

### 10-12 — Lettres et couleurs hors de `insertkoin/DA.md` (important)

Preuve : Barlow Semi Condensed et Courier Prime (lignes 15 à 18, 31), aucune des quatre familles de `DA.md` ; 105 couleurs hexadécimales distinctes dans le CSS ; accent le plus fréquent #f2e3a6, hors palette.

Correction : Bebas Neue capitales espacées pour les touches et plaques, DM Mono pour le compteur, le tempo, les LUFS et les noms de sons, Press Start 2P pour les écrans à phosphore (pads, oscilloscopes) ; polices auto-hébergées comme les actuelles ; remplacer #f2e3a6 par #ffe3a0 et ramener les couleurs aux variables de la ligne 22. Contrôle : 4 familles au plus, couleurs d'accent tirées des cinq de la palette.

### 10-13 — Surfaces encore dessinées (important)

Preuve : pistes vides en aplat sombre avec grille vectorielle, disque + en dégradé CSS (lignes 296 à 297), grille Master en cartes à cases ([10-pc1366-simple-master](../captures/10-pc1366-simple-master.webp)). Le juge DA notait déjà les aplats des pistes (docs/juges/da-RAPPORT2.md, point 7).

Correction : bande magnétique photographiée sous les clips, règle en réglet photographié ; le + devient le gros bouton lumineux photographié d'une console de 1980 ; les masterings sur un commutateur rotatif photographié à 8 crans pour les huit premiers, la liste des autres en étiquettes Dymo.

### 10-14 — Feuille Créer rognée sur téléphone (détail)

Preuve : sur iphone, les cases Film et Platines sortent par le bas de la feuille, coupées à mi-hauteur ([10-iphone-simple-creer](../captures/10-iphone-simple-creer.webp)).

Correction : grille de 3 colonnes × 2 rangées de cases de 110 × 110 px en portrait. Contrôle : 6 cases entières sans défilement.

### 10-15 — Case Créer coupée dans le pied de l'Atelier (détail)

Preuve : « Crée » sur iphone en Atelier ([10-iphone-atelier-console](../captures/10-iphone-atelier-console.webp)).

Correction : en Atelier sur téléphone, la case Créer garde son pictogramme seul (`body:not(.simple) #bCreate .lbl{display:none}` sous 760 px).

### 10-16 — Axes des pads peu lisibles (détail)

Preuve : « Enveloppe », « Timbre », « Main », « Hauteur −12 … +12 » à 9,4 à 10,5 px, vert ou gris sur fond sombre ([10-pc1366-pad-souris](../captures/10-pc1366-pad-souris.webp)).

Correction : 12 px, phosphore #ffe3a0, ou pictogrammes d'axe (flèche verticale, flèche horizontale) à la place des mots.

## À garder tel quel

- Silence au repos : aucun échantillon au-dessus de −60 dBFS entre l'ouverture et le premier geste, sur les quatre formats.
- Chemin du premier son en 3 touchers (+, Rythme, lecture), identique au doigt et à la souris.
- Pose d'un son : toucher bref pour écouter, appui long pour prendre, pistes éclairées pendant l'attente, toucher pour poser (iphone, portrait) ; glisser à la souris.
- Séquenceur : longueurs 15, 16, 17, 19, 21 en touches directes, rangées aux couleurs des Masks.
- Scène photographiée de la kave voûtée sous le tube ; pads en écran à phosphore et disque photographié ; plaques d'acier et jonc riveté ; Dymo photographiés du tiroir Fauna ; VU-mètre et plaque MAUK TENIEB.
- Masterings nommés en français.
- Aucun débordement horizontal de page sur les quatre formats.
