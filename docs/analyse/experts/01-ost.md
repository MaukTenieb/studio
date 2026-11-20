# Expert 01 — Musique de film (OST)

Étalons : Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Hildur Guðnadóttir, Mica Levi, Trent Reznor et Atticus Ross, Angelo Badalamenti ; Walter Murch, Ben Burtt ; livraison de stems de post-production façon Pro Tools.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| 1. Design | 5,2 |
| 2. Direction artistique | 5,4 |
| 3. Puissance | 3,9 |
| 4. Ergonomie | 4,2 |
| 5. Simplicité intuitive | 5,9 |
| 6. Exhaustivité | 3,3 |
| 7. Pertinence | 6,0 |
| 8. Originalité | 5,3 |
| 9. Plaisir potentiel | 4,0 |
| Moyenne générale | 4,8 |

## Conditions de mesure

- Application : copie locale /home/claude/studio servie sur http://localhost:8765/, harnais Playwright /home/claude/outil/harnais.py, Chromium sans écran. Interface en anglais (langue du navigateur de test).
- Machine : 2 cœurs, partagés avec les autres experts lancés en parallèle. Charge mesurée par `uptime` pendant les essais : 40 à 53. Les durées citées valent pour cette charge ; la précision des coupes en dépend aussi (voir S2).
- Films d'essai fabriqués avec ffmpeg dans /tmp/expert01/ (script /tmp/expert01/fab.py), image 640 × 360 à 25 i/s, VP9 + Opus en WebM. Le son de chaque film contient une nappe de 110 Hz à −26 dBFS et un clic de 1 kHz, 20 ms, à chaque coupe : il sert de repère de synchronisation dans les exports.

| Film | Durée | Contenu | Coupes vraies (s) |
|---|---|---|---|
| A | 60 s | 13 aplats de couleurs franches, coupes régulières | 4,8 · 9,6 · 14,4 … 57,6 (12 coupes, toutes les 4,8 s) |
| B | 60 s | 13 aplats, coupes irrégulières | 3,12 · 7,48 · 11,04 · 16,6 · 21,32 · 24,0 · 29,88 · 35,4 · 38,16 · 44,72 · 50,04 · 55,56 |
| C | 20 s | gris sombres proches (écart de 10 %), comme un champ-contrechamp de nuit | 2,52 · 5,04 · 7,56 · 10,08 · 12,6 · 15,12 · 17,64 |
| D | 29 s | images en mouvement (Mandelbrot, automate de vie, mire), 3 coupes franches, 1 fondu enchaîné d'1 s | 4,32 · 9,52 · 15,52 ; fondu centré sur 20,5 |

Contrôle par ffmpeg (`select='gt(scene,0.02)'`) : ffmpeg retrouve les 31 coupes franches de A, B et C, à 7 ms près (décalage de départ du conteneur WebM).

## Scénarios

| N° | Scénario | Résultat attendu mesurable |
|---|---|---|
| S1 | Premier film d'un débutant : ouvrir, importer une vidéo | Film à l'écran et son sur une piste en 3 touchers ou moins, en moins de 10 s |
| S2 | Détection des coupes | 100 % des coupes franches trouvées, à 1 image près (40 ms), zéro fausse coupe |
| S3 | Caler le tempo sur les coupes | Un tempo qui place chaque coupe sur un temps ; carte de tempo si les coupes sont irrégulières |
| S4 | Synchronisation image et son en lecture | Écart image/son sous le seuil de détection ITU-R BT.1359 (45 ms d'avance, 125 ms de retard) |
| S5 | Écran du film : taille, déplacement, pistes visibles | Écran lisible, déplaçable, sans cacher le clip qu'on édite |
| S6 | Poser une nappe sous une scène, au début du plan 3 | La nappe démarre sur la coupe, à 1 image près |
| S7 | Poser un thème avec une boîte « musique à l'image » | Boîte qui prépare effets, tempo et sons du genre, en 4 touchers ou moins |
| S8 | Exporter les pistes pour un mixeur | Un WAV par piste, 48 kHz 24 bits, même départ, même durée que l'image, repère de synchro |
| S9 | Film réel : long, coupes peu contrastées, fondus, MP4 | Coupes trouvées malgré faible contraste et mouvement ; fondus marqués |

## Parcours joués

### S1 — Premier film

- Souris (pc1366) : Create (bouton + central) → porte Film → sélecteur de fichiers ouvert avec `accept=video/*` → fichier. 3 clics, 1 feuille traversée. Capture [01-creer-pc1366](../captures/01-creer-pc1366.webp).
- Doigt (iphone) : + Créer → Film → fichier, 3 touchers.
- Durée jusqu'aux repères sur la règle, sous la charge décrite : pc1366 16, 45, 52, 69, 86, 123 s (A et B) ; pc1920 66 et 111 s ; iphone portrait 51 s (A) puis 469 s (B) ; iphone paysage 82 s (B). Pendant ce temps, l'écran du film apparaît tout de suite ; une barre d'état affiche « Processing… ».
- Piste du son du film : piste 19 dans 5 essais, piste 01 dans 2 essais (pc1366, films B et D). Capture [01-filmB-pc1366](../captures/01-filmB-pc1366.webp) : « filmB.webm » sur la piste 01. Au départ, `state.tracks.length` vaut 0 pendant plus de 2,5 s (mesure iphone et paysage) ; la ligne 3003 (`state.tracks.slice(18).find(...)||freeTrack(0)`) prend alors la première piste libre.
- Le toast final « Film placed · n cuts » ne reste pas : 2,5 s après, seul le toast « Drag the sounds onto a track » de la bibliothèque est lisible.

### S2 — Détection des coupes

Coupe juste = repère à 40 ms ou moins d'une coupe vraie. Fausse coupe = repère loin de toute coupe.

| Film | Format | Repères | Justes | Fausses | Coupes vraies manquées |
|---|---|---|---|---|---|
| A | pc1366 | 11 | 5 | 6 | 7 |
| A | pc1366 | 5 | 0 | 5 | 12 |
| A | pc1920 | 5 | 1 | 4 | 11 |
| A | pc1920 | 4 | 1 | 3 | 11 |
| A | iphone | 4 | 2 | 2 | 10 |
| B | pc1366 | 10 | 4 | 6 | 8 |
| B | pc1366 | 9 | 6 | 3 | 6 |
| B | pc1366 | 7 | 2 | 5 | 10 |
| B | pc1366 | 4 | 0 | 4 | 12 |
| B | iphone paysage | 10 | 4 | 6 | 8 |
| B | iphone | 0 | 0 | 0 | 12 |
| C | pc1920 ×2, paysage | 0 | 0 | 0 | 7 ×3 |
| D | pc1366 | 3 | 3 | 0 | 0 coupe franche ; fondu non marqué |

- Total sur A, B, C : 25 coupes justes sur 153 (16 %), 44 fausses coupes. Exemple de fausses coupes, film B : 10,08 s, 26,08 s, 32,88 s, 46,84 s, 58,28 s, au milieu d'un plan.
- Quand une coupe est juste, l'écart vaut 0 à 7 ms (3,124 pour 3,12 ; 16,605 pour 16,6 ; 4,321 pour 4,32) : l'affinage par dichotomie fonctionne.
- Film D, 29 s : 3 coupes sur 3 à 5 ms près, zéro fausse coupe malgré le mouvement de l'automate de vie. Les films de 60 s échouent, ceux de 29 s réussissent.
- Cause visible dans le code, ligne 2795 : la première passe lit la vidéo à `playbackRate=clamp(D/4,2,16)`, soit ×15 pour 60 s et ×7,25 pour 29 s. Sous charge, le navigateur saute des images ; la coupe est notée sur l'image suivante, parfois plusieurs secondes plus tard. L'affinage (ligne 2802) cherche ensuite entre `c-0,8` et `c+0,12` s ; si la vraie coupe sort de cette fenêtre, il garde la mauvaise valeur. Le paramètre `step=.2` de `videoCuts` (ligne 2792) ne sert nulle part.
- Film C : seuil fixe de 0,18 (ligne 2795) sur l'écart moyen des couleurs ; deux gris qui diffèrent de 10 % ne passent jamais. Zéro coupe sur 7, trois essais.
- Aucun réglage de sensibilité, aucune liste de coupes à valider, aucun moyen d'ajouter ou de retirer une coupe à la main sur le film (les repères « shot n » sont des notes de règle).

### S3 — Calage du tempo

- Souris : Ctrl+K → taper « tempo » → Entrée (capture [01-palette-tempo-pc1366](../captures/01-palette-tempo-pc1366.webp)), ou Alt+clic sur un repère de la règle (ligne 2873). Doigt : ⋯ → ⌘ → taper → toucher l'entrée : 3 touchers et un clavier. Alt+clic n'existe pas au doigt. Aucun pictogramme dédié.
- Sur les repères trouvés par le studio (film B, 7 repères dont 5 faux) : 144,61 BPM, « 4/7 marks on a beat ».
- Sur les 12 coupes vraies de B, injectées pour isoler le calcul : 152,54 BPM, 7 coupes sur 12 sur un temps.
- Sur les 12 coupes vraies de A : 150 BPM, 12 sur 12 (chaque coupe tombe sur le temps 12 d'une mesure). Le film A est fait pour 100 BPM (8 temps par plan) ; le studio rend une seule valeur, sans proposer 100, 125 ou 150.
- `fitTempo` (ligne 2867) cherche un tempo unique entre 60 et 190 BPM par pas de 0,01. L'état du projet n'a qu'un champ `bpm` : pas de carte de tempo, pas d'accélération ni de ralenti, pas de mesure à signature changeante. Un film à coupes irrégulières (B) laisse donc 5 coupes sur 12 hors temps.

### S4 — Synchronisation en lecture

- Souris : touche Espace, 12 s de lecture du film B, 48 relevés toutes les 250 ms de `FILM.v.currentTime − (displayPos() − FILM.off)`.
- Écart image − son, sur les 44 derniers relevés : moyenne −111 ms, minimum −946 ms, maximum −20 ms. L'image arrive en retard sur le son. Le −946 ms tombe au départ de la lecture.
- La règle de recalage (ligne 3017) ne corrige l'image qu'au-delà de 120 ms d'écart. Le seuil de détection publié par l'ITU (BT.1359) vaut 125 ms de retard du son et 45 ms d'avance du son ; la norme ATSC demande 15 ms et 45 ms. Une image en retard sur le son équivaut à un son en avance : la marge utile est donc 45 ms.
- Compteur du film : format `m:ss.d` (ligne 3019), au dixième de seconde. Pas de code temporel SMPTE en images, pas de pas image par image, pas de choix de cadence (24, 25, 30 i/s).

### S5 — Écran du film

| Format | Écran du film (px) | Part de la largeur | Effet |
|---|---|---|---|
| pc1366 | 307 × 173 | 22 % | ne cache aucun clip au départ |
| pc1920 | 456 × 257 | 24 % | idem |
| iphone portrait | 150 × 84 | 38 % | cache la nappe posée sur la piste 01 ([01-nappe-iphone](../captures/01-nappe-iphone.webp)) |
| iphone paysage | 199 × 112, agrandi 412 × 232 | 30 %, puis 62 % | agrandi, il cache toute la zone des pistes ; la bibliothèque prend la moitié basse ([01-filmC-agrandi-iphone-paysage](../captures/01-filmC-agrandi-iphone-paysage.webp)) |

- Boutons ⤢ et × : 30 × 30 px (ligne 444), sous la cible de 44 px, sur les quatre formats.
- L'écran se déplace au glisser (lignes 3012-3014). Sa position ne revient pas après rechargement (aucune clé de position dans `PROJ_KEYS`, ligne 1059).
- Cadre noir à liseré et filtre `contrast(1.04) saturate(.92)` (ligne 443) : l'écran ressemble à un moniteur de contrôle sombre, en accord avec la lumière de la kave.

### S6 — Nappe sous le plan 3

- Nappe de 10 s importée (accord à attaque lente, /tmp/expert01/nappe.wav). Cible : coupe « plan 3 » à 11,04 s.
- Souris : glisser de la bibliothèque vers la piste 01, 1 geste. Doigt : appui long 0,6 s sur la ligne puis toucher sur la piste, 2 touchers ([01-nappe-iphone](../captures/01-nappe-iphone.webp)).
- Résultat, souris et doigt : départ à 11,000 s, soit 40 ms (une image) avant la coupe. L'aimant (ligne 1057, `snapT`) suit la grille des doubles croches à 120 BPM ; il ignore les coupes du film et les notes de la règle.
- Sans aimant, au doigt, la précision dépend du pixel : à 80 px/s (zoom par défaut sur pc1366), 1 px vaut 12,5 ms.

### S7 — Boîtes « musique à l'image »

- Chemin souris : Create → Artist boxes → Film scores → boîte : 4 clics ([01-boites](../captures/01-boites.webp)).
- Trois boîtes : α tribute to Hans Zimmer (sub, compresseur, salle, 120 BPM), β tribute to John Williams (salle, 132 BPM), γ tribute to Hildur Guðnadóttir (égaliseur, Cathédrale, mode secondes ; sons cherchés : cello drone, cello solo, choir, bowed metal ; outils freeze, paul, blur) — lignes 2923-2925.
- Sur les sept compositeurs étalons, seule Hildur Guðnadóttir a une boîte. Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Mica Levi, Trent Reznor et Atticus Ross, Angelo Badalamenti n'en ont pas.
- Limite : l'automate n'a pas réussi à cliquer la boîte γ (élément jugé invisible par Playwright, deux essais) ; je note l'offre d'après la liste affichée et le code, sans avoir entendu le résultat.

### S8 — Export pour un mixeur

- Souris : Export → « WAV stems », 2 clics ([01-export-pc1366](../captures/01-export-pc1366.webp)). Doigt : ⋯ → Export → stems, 3 touchers.
- Fichier rendu : `studio-2026-11-20-15-37-pistes.zip`, en 74,6 s (pc1366) et 82,6 s (pc1920) sous charge ; il contient un WAV par piste non vide (`…-19.wav`). Les pistes vides restent hors de l'archive.
- Mesures du WAV de la piste du film (mesure.py et soundfile) :

| Mesure | Valeur | Attendu en post-production |
|---|---|---|
| Fréquence | 44 100 Hz | 48 000 Hz (sources ci-dessous) |
| Résolution | PCM 16 bits | 24 bits |
| Durée | 63,00 s pour 60,00 s d'image | même départ et même durée pour tous les stems |
| Décalage des clics de coupe | +2,4 ms constant (12 sur 12) ; la source décodée par ffmpeg donne +0,08 ms | 0 |
| Crête | −6,26 dBFS ; source −3,74 dBFS | gain unité ou documenté |
| LUFS intégré | −27,2 | — |

- La durée de chaque stem dépend de sa propre queue (`trimTail`, ligne 1310) : deux stems d'un même projet sortent avec des longueurs différentes. Aucun bip de synchro (2-pop), aucun code temporel dans l'en-tête WAV (BWF), aucun nom de rôle (dialogue, musique, effets) : le nom de chaque fichier donne le numéro de piste.
- Aucun export d'une vidéo avec la musique (pas de `captureStream` sur la vidéo ; les deux `MediaRecorder` du fichier servent au micro et à l'enregistrement audio, lignes 1266 et 2781).
- Limite : l'export du mix WAV n'a pas abouti en 180 s ni en 300 s sous charge (rendu maîtrisé à −14 LUFS, jusqu'à quatre rendus successifs, ligne 1318). L'expert du mastering mesure ce point.

### S9 — Film réel

- 60 s de film : voir S2, 16 % de coupes justes. 20 s de gris proches : 0 %. 29 s d'images en mouvement : 100 % des coupes franches.
- Fondu enchaîné d'1 s (film D) : aucun repère. Logic Pro et Nuendo marquent les changements de contenu ; un compositeur veut aussi le milieu d'un fondu comme point de synchro.
- Réouverture du projet : deux essais de rechargement ont fini par la fermeture du navigateur sous charge (limite notée) ; je n'ai pas de mesure propre de la restauration du film dans cette session.
- MP4 H.264 : fichier fabriqué (/tmp/expert01/filmB.mp4), non joué ; Chromium de Playwright ne lit pas H.264, la mesure ne vaudrait rien pour Safari ou Chrome.

## Notes par scénario

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir |
|---|---|---|---|---|---|---|---|---|---|
| S1 Premier film | 6 | 6 | 5 | 6 | 7 | 5 | 7 | 6 | 5 |
| S2 Coupes | 5 | 5 | 3 | 3 | 6 | 3 | 6 | 6 | 2 |
| S3 Tempo | 5 | 5 | 4 | 3 | 4 | 3 | 7 | 7 | 4 |
| S4 Synchro | 6 | 6 | 5 | 6 | 7 | 4 | 7 | 5 | 5 |
| S5 Écran | 5 | 6 | 4 | 3 | 6 | 4 | 6 | 5 | 5 |
| S6 Nappe | 5 | 5 | 4 | 4 | 6 | 3 | 5 | 4 | 4 |
| S7 Boîtes | 6 | 6 | 4 | 4 | 5 | 3 | 5 | 6 | 5 |
| S8 Export | 5 | 5 | 4 | 6 | 7 | 3 | 6 | 4 | 4 |
| S9 Film réel | 4 | 5 | 2 | 3 | 5 | 2 | 5 | 5 | 2 |
| Moyenne | 5,2 | 5,4 | 3,9 | 4,2 | 5,9 | 3,3 | 6,0 | 5,3 | 4,0 |

Preuves des notes :

- S1. Simplicité 7 : 3 touchers, porte Film avec pictogramme dans la feuille Créer. Puissance 5 et plaisir 5 : 16 à 469 s d'attente ; son du film sur la piste 01 dans 2 essais sur 7. Pertinence 7 : le film entre dans le studio depuis la feuille Créer ; BandLab n'affiche aucune image.
- S2. Puissance 3 et plaisir 2 : 25 coupes justes sur 153, 44 fausses (tableau S2). Ergonomie 3 : aucun réglage, aucune correction possible. Originalité 6 : affinage par dichotomie précis à 7 ms quand la première passe réussit.
- S3. Pertinence 7 et originalité 7 : caler le tempo sur l'image en une commande, idée tirée de la carte de tempo de Logic. Ergonomie 3 et simplicité 4 : palette au clavier ou Alt+clic, aucun pictogramme ; au doigt, 3 touchers et un clavier. Exhaustivité 3 : un seul tempo, 7 coupes sur 12 pour le film B.
- S4. Simplicité 7 : Espace suffit. Puissance 5 : écart moyen −111 ms, pointe −946 ms. Exhaustivité 4 : compteur au dixième, pas d'images, pas de SMPTE.
- S5. DA 6 : moniteur sombre cohérent avec la kave. Ergonomie 3 : boutons de 30 px, écran qui cache la piste 01 sur iphone et toutes les pistes en paysage agrandi.
- S6. Puissance 4 : nappe à 11,000 s pour une coupe à 11,04 s ; l'aimant ignore les coupes.
- S7. Exhaustivité 3 : 1 étalon sur 7 représenté. Simplicité 5 : 4 clics, sous-dossier fermé par défaut.
- S8. Simplicité 7 : 2 clics, un seul ZIP. Exhaustivité 3 : 44,1 kHz 16 bits, durées inégales, sans 2-pop ni code temporel.
- S9. Puissance 2 : 0 coupe sur 7 en faible contraste, fondu ignoré, 16 % sur 60 s.

## Comparaison aux outils de référence

| Fonction | Studio (mesuré) | BandLab | Logic Pro | Nuendo / Cubase | Pro Tools |
|---|---|---|---|---|---|
| Vidéo à l'écran, calée sur la lecture | oui, écart moyen −111 ms | absent : l'import accepte un mp4 « comme piste d'accompagnement », sans image décrite | oui, piste Film | oui, piste vidéo | oui, piste vidéo |
| Détection des coupes | oui, 16 % justes sur 60 s ; 100 % sur 29 s | absent | oui, seuil fixe « qui convient à la plupart des films » | oui, panneau dédié, sensibilité réglable (50 % conseillé), aperçu des coupes avant création des marqueurs | non natif |
| Tempo calé sur l'image | un tempo unique, 60-190 BPM | absent | marqueurs de scène utilisés comme points de synchro pour aligner le tempo | oui | non natif |
| Aimant sur les coupes | absent (grille seule) | absent | oui | oui | oui |
| Code temporel en images | absent (m:ss.d) | absent | oui | oui | oui |
| Stems 48 kHz 24 bits, même départ | 44,1 kHz 16 bits, durées inégales | absent | oui | oui | oui |

Sources :

- BandLab, foire aux questions du Studio (type de piste Import : « Import mp3, mp4 or wav files to use as a backing track ») : https://blog.bandlab.com/studio-faq/
- Logic Pro, marqueurs de scène : https://support.apple.com/en-lk/guide/logicpro/lgcpfff75e20/mac
- Logic Pro 9, carte de tempo sur marqueurs de scène : https://help.apple.com/logicpro/mac/9.1.6/en/logicpro/usermanual/chapter_34_section_5.html
- Nuendo, panneau de détection des coupes : https://steinberg.help/nuendo/v10/en/cubase_nuendo/topics/audio_editing_to_picture/audio_editing_to_picture_to_picture_video_cut_detection_panel_r.html
- Nuendo, marqueurs aux coupes : https://steinberg.help/nuendo/v11/en/cubase_nuendo/topics/audio_editing_to_picture/audio_editing_to_picture_to_picture_markers_at_cut_positions_adding_t.html
- Pro Tools, import vidéo : https://www.avid.com/pro-tools/user-guide/import-video
- Livraison à la post-production, 48 kHz, 24 bits, 2-pop d'une image 2 s avant l'image : https://henrirapp.com/preparing-delivery-to-audio-post-production/
- AICP, préparation des sessions audio, OMF/AAF 48 kHz 24 bits et 2-pop : https://aicp.com/assets/editor/Post_Production_AUDIO_SESSION_PREP_GUIDELINES_2018.pdf
- ITU-R BT.1359 (seuils de synchronisation son-image) : https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-1-199811-I!!PDF-E.pdf ; résumé des seuils ITU et ATSC : https://en.wikipedia.org/wiki/Audio-to-video_synchronization

Face à BandLab, le Studio dépasse la référence sur tout ce qui touche au film : BandLab n'affiche aucune image. Face à Logic, Nuendo et Pro Tools, il reste en deçà sur la fiabilité des coupes, l'aimant, le code temporel et la livraison.

## Écarts

| N° | Gravité | Écart | Preuve | Correction |
|---|---|---|---|---|
| 01-01 | bloquant | Détection des coupes fausse sur un film de 60 s : 25 justes sur 153, 44 fausses | Tableau S2 ; ligne 2795 `playbackRate=clamp(D/4,2,16)` | Remplacer la lecture accélérée par un balayage par positionnement : `grab(t)` tous les `step` (0,2 s, paramètre déjà présent ligne 2792), comparaison des deux images, puis dichotomie existante entre t−0,2 et t. Durée bornée et indépendante de la charge. Plafonner sinon `playbackRate` à 4. |
| 01-02 | bloquant | Coupes peu contrastées ignorées (0 sur 7) | Film C, trois essais ; seuil fixe 0,18 ligne 2795 | Seuil adaptatif : écart de l'image courante rapporté à la médiane des écarts des 2 s précédentes (coupe si plus de 4 fois la médiane et au moins 0,04). Ajouter un curseur de sensibilité (pictogramme ciseaux + curseur), comme Nuendo. |
| 01-03 | important | Image en retard sur le son : moyenne −111 ms, pointe −946 ms ; recalage seulement au-delà de 120 ms | S4 ; ligne 3017 | Recaler l'image au-delà de 40 ms ; au démarrage, attendre l'événement `seeked` de la vidéo avant de lancer le transport ; corriger la dérive fine par `playbackRate` 0,98-1,02 au lieu de sauts. |
| 01-04 | important | Tempo unique : 7 coupes sur 12 calées pour des coupes irrégulières ; pas de carte de tempo | S3 ; ligne 2867, champ `bpm` seul | Ajouter une carte de tempo : entre deux coupes choisies, calculer le tempo qui y place un nombre entier de temps, et le stocker par section (`state.tempoMap=[{t,bpm}]`). Rendre la règle et le séquenceur sur cette carte. |
| 01-05 | important | Un seul résultat de tempo (150 BPM pour un film fait à 100) | S3, film A | Afficher les 3 meilleurs tempos (par exemple 100, 125, 150), chacun avec son nombre de coupes sur un temps ; toucher pour choisir. |
| 01-06 | important | L'aimant ignore les coupes : nappe à 11,000 s pour une coupe à 11,04 s | S6 ; ligne 1057 `snapT` | Dans `snapT`, essayer d'abord les repères de film et les notes à 10 px ou moins ; sinon la grille. |
| 01-07 | important | Stems en 44,1 kHz 16 bits, durées inégales, sans 2-pop ni code temporel | S8 ; lignes 1297 (`SR=44100`), 1310 (`trimTail`), 1338 (`n*nc*2`) | Pour l'export des pistes : 48 kHz, 24 bits, tous les stems de 0 à la fin du projet plus la queue la plus longue (même longueur), option 2-pop 1 kHz d'une image à −2 s, en-tête BWF avec `TimeReference`. |
| 01-08 | important | Calage du tempo hors d'atteinte au doigt : 3 touchers et un clavier ; Alt+clic impossible | S3 ; ligne 2873 | Pictogramme métronome-ciseaux dans la barre du film ; appui long sur un repère « plan n » = caler sur ce repère. |
| 01-09 | important | Son du film posé sur la piste 01 dans 2 essais sur 7 | S1 ; capture 01-filmB-pc1366 ; ligne 3003 | Attendre que les 32 pistes existent avant `filmLoad` (promesse de `fillTracks`), puis prendre la première piste libre de 19 à 32. |
| 01-10 | important | Import lent : 16 à 469 s sous charge, sans barre de progression | S1 | Avec 01-01, le balayage par positions donne un avancement chiffré : afficher une barre de progression sur l'écran du film et poser chaque repère dès qu'il est trouvé. |
| 01-11 | important | Écran du film sur téléphone : cache la piste 01 en portrait, toutes les pistes en paysage agrandi ; boutons de 30 px | S5 ; ligne 444 | Sur téléphone, loger le film dans une bande au-dessus de la règle (hauteur 25 % de l'écran), sans recouvrement ; boutons de 44 px. |
| 01-12 | important | Boîtes « musique à l'image » : 1 étalon sur 7 | S7 ; lignes 2923-2925 | Ajouter des boîtes sous lettres grecques « tribute to » Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Mica Levi, Trent Reznor et Atticus Ross, Angelo Badalamenti, avec chaîne d'effets et termes de recherche Internet Archive et Freesound propres à chacun. |
| 01-13 | détail | Compteur au dixième de seconde, pas d'images ni de SMPTE, pas de pas image par image | S4 ; ligne 3019 | Compteur `hh:mm:ss:ii` à la cadence lue dans la vidéo (`requestVideoFrameCallback` donne `mediaTime`) ; flèches ←/→ et deux pictogrammes pour avancer d'une image. |
| 01-14 | détail | Fondus enchaînés non marqués | Film D, fondu de 20 à 21 s | Détecter une pente régulière de l'écart sur 0,3 s ou plus et poser un repère au milieu, marqué d'un pictogramme distinct. |
| 01-15 | détail | Aucun décalage de départ du film réglable (`filmOff` toujours 0) | ligne 2998 ; aucun contrôle visible | Glisser l'écran du film le long de la règle avec un doigt sur la vignette du clip-film, ou champ de départ dans le menu du clip. |
| 01-16 | détail | Aucun export vidéo avec la musique | S8 | Ajouter « film + mix » : `captureStream()` de la vidéo, piste audio du mix rendu, `MediaRecorder` en WebM. |
| 01-17 | détail | Son du film décalé de +2,4 ms et atténué de 2,5 dB dans le stem | S8 | Vérifier le pré-saut Opus au décodage ; exporter les stems au gain unité, panoramique neutre sans loi de −3 dB, ou documenter la loi. |
| 01-18 | détail | Le toast « Film placed · n cuts » disparaît sous un autre toast | S1 | Afficher le nombre de coupes sur l'écran du film, à côté du compteur. |

## À garder tel quel

- La porte Film dans la feuille Créer : 3 touchers, sélecteur filtré sur la vidéo.
- L'écran du film flottant, déplaçable, avec bouton d'agrandissement, sur ordinateur : 22 à 24 % de la largeur, aucun clip caché au départ.
- L'affinage par dichotomie des coupes : 0 à 7 ms d'écart quand la première passe trouve la bonne zone (16,605 pour 16,6 ; 4,321 pour 4,32).
- La pose du son du film sur une piste 19 à 32, conforme au partage des pistes du pense-bête.
- L'idée du calage du tempo sur les coupes, avec la phrase de résultat « n/m marks on a beat » qui chiffre la qualité du calage.
- L'export des pistes séparées en un seul ZIP, sans les pistes vides.
- La boîte γ tribute to Hildur Guðnadóttir (Cathédrale, mode secondes, violoncelle, chœur, métal frotté) : structure à reprendre pour les autres boîtes de film.
