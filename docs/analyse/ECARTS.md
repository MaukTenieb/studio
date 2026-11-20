# Écarts du Studio, liste unique

Cette liste fusionne les 139 écarts des dix rapports d'experts (docs/analyse/experts/) en 100 écarts. Chaque écart donne sa gravité, les identifiants d'origine, la preuve (ligne de index.html, mesure, capture) et la correction. Ordre : gravité, puis nombre d'experts qui le relèvent. La synthèse et la règle de fusion figurent dans SYNTHESE.md.

Gravité choisie : la plus haute des gravités d'origine, baissée d'un cran quand l'écart repose sur une durée ou une panne mesurée sous forte charge de la machine de test (voir SYNTHESE.md, « Limites de la mesure »).

## Fait

- 20 nov. 19 h 29 : E-06 ; E-07 ; E-08 ; E-09 ; E-10 ; E-18 ; E-35 ; E-42. Courbes de saturation symétriques (continu des 33 chaînes : −240 dBFS, contre −24,5 à −49,1 ; export Noise : −74,4 dBFS, contre −12,8). Plafond d'export en vraie crête (sinus à fs/4 : +3,04 dBTP ramené à −1,09 dBTP mesuré par Python ×16). Garde de sortie du rack : trois larsens et un écho à 0,95 restent sous −0,8 dBFS de crête pendant 30 s (contre +24,6). Touche D enregistrée pendant la lecture et rejouée à l'export (échos du dub présents à −32,8 dBFS entre 4,5 et 6 s). Réglage de réinjection sur l'écho : à 5 s, −152,9 dB au réglage 0, −67,7 dB à 0,5, auto-oscillation bornée à 1,05. Cible de sonie : deux rendus au plus, relèvement borné à +6 dB (export de 8,7 s en 4,7 à 5,3 s). Queues : ping-pong compté deux fois, écho de bande 10 + 50 × dosage s, bus dub selon sa réinjection. Projet vide : message à l'export.

- 20 nov. 19 h 24 : E-01 ; E-02 ; E-16 ; E-60. Téléphone couché : bibliothèque à droite, tiroirs sur toute la largeur, console à tranches en deux colonnes avec faders, platines avec disques. Barre du clip dans le flux du pied (4 touches sur 5 au doigt, la cinquième au défilement). Cibles : 0 % sous 44 px et 0 % de texte sous 11 px sur iPhone 13 debout et couché, dans les neuf écrans mesurés (contre 96 à 100 % et 21 à 76 %). Téléprompteur : la marge de fin n'entre plus dans le calcul, M et S restent fixes.

## À faire

### Bloquant

- E-03 · bloquant · Calculs lourds sur le fil principal : Paulstretch, séparation harmonique / percussive, Atelier et analyse de hauteur gèlent la page sans avancement ni arrêt.
  - Experts : 3 (04-01, 07-02, 08-02). Gravités d'origine : 04-01 bloquant, 07-02 bloquant, 08-02 important.
  - Preuve : `processClip` (ligne 2228) appelle `AT.paul.run` (ligne 2051), `hpss` (ligne 2155) et `yinTrack` (lignes 2812-2822) sur le fil principal. Paulstretch 8 s → 512 s : 66,5 s de page figée à charge 11 (04). Séparation de 4 s mono : 6,6 s de calcul à charge 10 (08). `yinTrack` : 240 s de son → 62,1 s de calcul (07). Zéro barre d'avancement, zéro touche d'arrêt. Captures : [04-s3-paulstretch-fait-pc1366](captures/04-s3-paulstretch-fait-pc1366.webp), [08-pc-hpss-resultat](captures/08-pc-hpss-resultat.webp).
  - Correction : Passer `spectralRender`, `hpss`, `wsola`, `yinTrack`, freeze, blur, grain et convx dans un Web Worker (transfert des Float32Array de chaque canal) ; barre d'avancement (trames faites / trames totales) sur le clip ; touche ✕ qui arrête le worker. Pour `yinTrack` : sous-échantillonner à 16 kHz et ouvrir la loupe sur l'onglet ♪ sans calculer le spectre. Contrôle : écart entre deux images ≤ 50 ms pendant tout calcul.
  - Charge de la machine : existe quelle que soit la charge. Les durées absolues varient avec la charge ; le gel du fil principal existe à toute charge (charge 10 à 11 pour les chiffres cités).

- E-04 · bloquant · Sons d'Internet Archive coupés à 240 s et à 7 Mo, sans avertissement.
  - Experts : 2 (06-01, 04-04). Gravités d'origine : 06-01 bloquant, 04-04 important.
  - Preuve : Ligne 1390 : `Range:"bytes=0-6999999"` puis `trimBuf(b,240)`. Mozart, Symphonie 40, II affiché 7:44 → clip de 240,0 s, 48 % perdus (06) ; terrain annoncé 04:00 → clip de 144,8 s (04). Captures : [06-mozart40-fichiers-pc1366](captures/06-mozart40-fichiers-pc1366.webp), [06-mozart40-pose-pc1366](captures/06-mozart40-pose-pc1366.webp), [04-s9-terrain-pose-iphone](captures/04-s9-terrain-pose-iphone.webp).
  - Correction : Retirer `trimBuf(b,240)` et l'en-tête Range pour Internet Archive, Commons et Jamendo ; télécharger le fichier entier jusqu'à 60 min. Au-delà, pictogramme ciseaux sur la ligne du son et sur le clip, avec durée reçue / durée annoncée, et choix du passage avant la pose.
  - Charge de la machine : existe quelle que soit la charge.

- E-05 · bloquant · Premier son lent et pistes absentes pendant le chargement ; le son d'un film tombe alors sur la piste 01.
  - Experts : 2 (10-03, 01-09). Gravités d'origine : 10-03 bloquant, 01-09 important.
  - Preuve : `boot()` attend `await renderKit()` (ligne 2458) avant `fillTracks()` et `render()` (lignes 2465-2466). Calcul du fil principal avant le premier son : 3,33 s sur iphone (`ThreadTime`, mesure peu sensible à la charge) (10). `state.tracks.length` vaut 0 pendant plus de 2,5 s ; la ligne 3003 prend alors `freeTrack(0)` : son du film sur la piste 01 dans 2 essais sur 7 (01). Captures : [10-iphone-simple-accueil](captures/10-iphone-simple-accueil.webp), [01-filmB-pc1366](captures/01-filmB-pc1366.webp).
  - Correction : Appeler `fillTracks(); syncUI(); render();` avant `await renderKit()` ; synthétiser d'abord les sons des rangées du séquenceur et du premier tiroir, puis le reste par lots de 20 entre deux images (`requestIdleCallback`) ; une lampe du pied s'allume pendant le chargement (pictogramme). `filmLoad` attend la promesse de `fillTracks` puis prend la première piste libre de 19 à 32. Contrôle : premier son à moins de 2 s d'horloge et moins de 1 s de calcul sur pc1366 non chargé.
  - Charge de la machine : mécanisme fixe, ampleur liée à la charge. Les durées d'horloge (6,3 à 44,9 s avant les pistes) dépendent de la charge ; les 3,33 s de calcul du fil principal et l'ordre des appels de `boot()` existent à toute charge : la gravité reste bloquante.

- E-11 · bloquant · Console au téléphone debout : touche D de 48 × 22 px, réglage « D ⟲ » hors de l'écran.
  - Experts : 1 (02-04). Gravités d'origine : 02-04 bloquant (partie debout).
  - Preuve : Touche D de 48 × 22 px ; « D ⟲ » à x = 1 920 px pour un écran de 390 px ; libellé à 9,6 px ; faders coupés (02). Capture : [02-console-iphone](captures/02-console-iphone.webp).
  - Correction : Touche D de 44 px de haut au moins ; tranche Master épinglée au bord droit de la console (`position:sticky;right:0`) ; libellés à 11 px au moins ou pictogramme seul.
  - Charge de la machine : existe quelle que soit la charge.

- E-12 · bloquant · Coupes peu contrastées ignorées : seuil fixe.
  - Experts : 1 (01-02). Gravités d'origine : 01-02 bloquant.
  - Preuve : Seuil fixe 0,18 (ligne 2795) sur l'écart moyen des couleurs. Film C (gris à 10 % d'écart, 7 coupes) : 0 coupe trouvée, trois essais (01). Capture : [01-filmC-iphone-paysage](captures/01-filmC-iphone-paysage.webp).
  - Correction : Seuil adaptatif : écart de l'image courante rapporté à la médiane des écarts des 2 s précédentes (coupe au-delà de 4 fois la médiane et de 0,04) ; curseur de sensibilité à pictogramme ciseaux.
  - Charge de la machine : existe quelle que soit la charge.

### Important

- E-17 · important · Catégories et requêtes d'Internet Archive peu pertinentes (régions, Classique, Jazz).
  - Experts : 3 (07-03, 06-04, 09-10, 07-12). Gravités d'origine : 07-03 important, 06-04 important, 09-10 important (partie requête), 07-12 détail.
  - Preuve : Famille « Ethnographie par région » (ligne 1466) : 9 résultats pertinents sur 69 (13 %), 6 entrées vides sur 20, « papua new guinea singing » rend 0 chant de Papouasie sur 6 ; en tête de « berber », une récitation du Coran et deux albums d'anachid jihadistes (07). Classique : 20 feuilletons radio et 12 œuvres orchestrales sur 60 (06). Jazz : `subject:(jazz OR ragtime OR blues OR swing)` (ligne 1395) remonte blues, chants de prison et country (09). Tri par téléchargements (ligne 1411). Captures : [07-entrees-region-iphone](captures/07-entrees-region-iphone.webp), [06-ia-classique-iphone](captures/06-ia-classique-iphone.webp), [09-archive-jazz-pc1920](captures/09-archive-jazz-pc1920.webp).
  - Correction : Tri par pertinence ; sujet obligatoire par famille (`subject:(ethnographic OR "field recording" OR "traditional music")`) ; requêtes de région entre guillemets ; listes d'items vérifiés à la main pour les régions ; Classique : `-subject:("old time radio" OR otr OR "radio drama" OR comedy) -collection:(oldtimeradio)` ; Jazz : `subject:(jazz) AND NOT subject:(country)` et sous-catégories free jazz, big band, swing, bebop ; entrées vides retirées.
  - Charge de la machine : existe quelle que soit la charge.

- E-19 · important · Étalons absents des boîtes d'artistes : film, dark ambient, jazz, dub.
  - Experts : 3 (01-12, 04-08, 09-12). Gravités d'origine : 01-12 important, 04-08 important, 09-12 détail ; 02 (S1, sans numéro).
  - Preuve : Film : 1 compositeur étalon sur 7 (lignes 2923-2925) (01). Dark ambient : Lustmord, Tim Hecker, Roly Porter ; Thomas Köner, Raison d'être, Atrium Carceri absents (lignes 2911-2913) (04). Jazz : 0 boîte sur 26 (09). Dub : Scientist, Mad Professor, Basic Channel absents (02, S1). Lettres libres mesurées dans `BOXES` : 16 minuscules (ι à ω) ; les majuscules Η à Μ servent déjà aux chaînes de power electronics. Capture : [01-boites](captures/01-boites.webp).
  - Correction : Quinze boîtes « tribute to » sous les minuscules libres ι à ω : six pour le film (Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Mica Levi, Trent Reznor et Atticus Ross, Angelo Badalamenti), trois pour le dark ambient (Thomas Köner, Raison d'être, Atrium Carceri), trois pour le jazz (grand ensemble, souffleurs free, double quartette), trois pour le dub (Scientist, Mad Professor, Basic Channel). Chaque chaîne se valide à la mesure avant mise en ligne ; recherches en pictogrammes ou en français.
  - Charge de la machine : existe quelle que soit la charge.

- E-20 · important · Le gros bouton + du projet vide passe par-dessus les tiroirs et la ligne de temps.
  - Experts : 3 (10-10, 09-14, 06-08). Gravités d'origine : 10-10 important, 09-14 détail, 06-08 important (partie bouton +).
  - Preuve : `#emptyGo{z-index:6}` (ligne 295) : disque de 96 px sur le tiroir Master (10, 06) et sur la ligne de temps pendant une prise (09). Captures : [10-pc1366-simple-master](captures/10-pc1366-simple-master.webp), [09-voix-en-cours-iphone-paysage](captures/09-voix-en-cours-iphone-paysage.webp).
  - Correction : `body.drawer-open #emptyGo, body.rec #emptyGo{display:none}`, classes posées par `drawer()` (ligne 2558) et au départ de l'enregistrement.
  - Charge de la machine : existe quelle que soit la charge.

- E-21 · important · Le réglage d'export par défaut (Universal, cible −14 LUFS) écrase la dynamique.
  - Experts : 2 (06-02, 02-05, 06-10). Gravités d'origine : 06-02 important, 02-05 important, 06-10 détail.
  - Preuve : Universal −14 réduit l'écart doux / fort de 34,4 à 29,1 dB ; Loud −9 à 11,5 dB ; Neutral et Classical gardent 34,3-34,4 dB (06). Clap et chaîne Dub : les 15 premières répétitions sortent à −1,9 dBFS, comme le coup sec (02). Rattrapage automatique des DynamicsCompressor (lignes 945-951). Neutral absent du tiroir Master (06). Capture : [06-master-pc1920](captures/06-master-pc1920.webp).
  - Correction : 1. Compenser le gain de rattrapage des DynamicsCompressor dans `mchain` et `buildMaster` (gain mesuré sur un sinus de −50 dBFS à la construction, inverse appliqué en aval). 2. Borner le relèvement de `masteredRender` à +6 dB et la réduction du limiteur à 3 dB ; au-delà, garder le niveau et afficher l'écart à la cible dans le pied. 3. Neutral et Classical en tête de la première rangée du tiroir Master. 4. Pictogramme de nuance barré quand l'export perd plus de 3 LU de LRA face au rendu Neutral.
  - Charge de la machine : existe quelle que soit la charge.

- E-22 · important · Le swing suit la parité du compteur général : sur 15, 17, 19 ou 21 pas, le même pas alterne swing et grille droite.
  - Experts : 2 (05-03, 09-07). Gravités d'origine : 05-03 important, 09-07 important.
  - Preuve : `SEQ.step%2` (ligne 2655) et `i%2` (ligne 2659). Pas 3 d'un cycle de 17 : +62,5 ms puis 0 ms d'un cycle à l'autre (05) ; 15 pas : cycle 2 décalé à l'inverse du cycle 1 (09).
  - Correction : Calculer la parité sur la position dans la rangée (`kr%2`, `kr = step % rlen(r)`) dans `seqTick` et `seqWrite` ; swing par rangée.
  - Charge de la machine : existe quelle que soit la charge.

- E-23 · important · Zéro réponse impulsionnelle enregistrée, zéro position de micro.
  - Experts : 2 (04-06, 06-09). Gravités d'origine : 04-06 important, 06-09 détail.
  - Preuve : Grotte, silo, cathédrale et 20 pièces = bruit filtré et réflexions posées (lignes 718, 829-836) ; `convx` (ligne 2099) destructif, sans mix, pré-délai ni écoute (04, 06).
  - Correction : Effet de piste « Convolution » dont la réponse est un son de la bibliothèque (cave, silo, citerne, salle), avec mix, pré-délai, longueur ; `ConvolverNode` direct ; réglage de distance (proche, salle, ambiance) sur Room ; réponses de salles réelles sous licence libre.
  - Charge de la machine : existe quelle que soit la charge.

- E-24 · important · Plafonds d'étirement et de durée : ×64 et 600 s pour Paulstretch, 120 s pour le gel et le granulaire.
  - Experts : 2 (04-02, 08-11). Gravités d'origine : 04-02 important, 08-11 important.
  - Preuve : `stretch:[1.5,64,.5]` et `b.sampleRate*600` (ligne 2051) ; gel `dur:[1,120,1]` (ligne 2054) ; granulaire `dur:[1,120,1]` (ligne 2069). 10 s × 64 donnent 600 s au lieu de 640 s (08).
  - Correction : Facteur jusqu'à ×1 000 sur une réglette logarithmique ; sortie jusqu'à 3 600 s, écrite par blocs de 60 s dans le worker de l'écart du fil principal ; gel et granulaire jusqu'à 3 600 s ; durée produite affichée dans le dialogue (« → 8:32 »).
  - Charge de la machine : existe quelle que soit la charge.

- E-25 · important · Licences déclarées par les déposants et abrégées dans les crédits.
  - Experts : 2 (07-09, 09-10). Gravités d'origine : 07-09 important, 09-10 important (partie licence).
  - Preuve : `negroprisonsongs` (Alan Lomax, 1947) passe le filtre en « publicdomain » (07) ; « Come Away with Me » de Norah Jones (2002) affiché CC0 (09) ; crédits en « PD » ou « CC BY » sans version ni lien (07, `creditsTxt` ligne 1312).
  - Correction : Étendre `IA_SKIP` aux fonds à droits connus (prises Lomax, Folkways, Ocora rediffusés) ; pictogramme de doute sur un titre présent dans MusicBrainz avec un label commercial ; URL complète `licenseurl` dans les crédits ; distinguer Marque du domaine public et CC0.
  - Charge de la machine : existe quelle que soit la charge.

- E-26 · important · Aimant aveugle aux coupes, aux notes et aux attaques ; pas de 100 ms en tempo libre.
  - Experts : 2 (01-06, 09-15). Gravités d'origine : 01-06 important, 09-15 détail.
  - Preuve : `snapT` (ligne 1057) : grille seule, `Math.round(x*10)/10` en mode libre. Nappe posée à 11,000 s pour une coupe à 11,04 s (01) ; 100 ms d'arrondi en tempo libre (09).
  - Correction : Dans `snapT`, essayer d'abord les repères de film, les notes et les attaques des clips voisins à 10 px ou moins, puis la grille ; en mode libre, pas de 10 ms.
  - Charge de la machine : existe quelle que soit la charge.

- E-27 · important · Stems en 44,1 kHz 16 bits sans dither, de durées inégales, sans 2-pop ni code temporel.
  - Experts : 2 (01-07, 04-09). Gravités d'origine : 01-07 important, 04-09 détail.
  - Preuve : `SR=44100` (ligne 1297), `trimTail` (ligne 1310), `n*nc*2` dans `wavBlob` (ligne 1338) ; WAV du film : 63,00 s pour 60,00 s d'image (01) ; queues à −88 et −101 dBFS sous le pas du 16 bits, 0 occurrence de « dither » (04). Capture : [01-export-pc1366](captures/01-export-pc1366.webp).
  - Correction : Export des pistes en 48 kHz 24 bits (choix 24 bits ou 32 bits flottants dans le dialogue) ; tous les stems de 0 à la fin du projet plus la queue la plus longue ; option 2-pop 1 kHz d'une image à −2 s ; en-tête BWF avec `TimeReference` ; dither TPDF en 16 bits.
  - Charge de la machine : existe quelle que soit la charge.

- E-28 · important · Le sonomètre du pied ignore la plage de sonie, la vraie crête et la composante continue.
  - Experts : 2 (06-03, 03-12). Gravités d'origine : 06-03 important, 03-12 détail.
  - Preuve : `#mMeas` affiche LUFS et crête échantillon de `peakDb` (ligne 1003) (06, 03).
  - Correction : Afficher LUFS intégré, LRA (EBU Tech 3342) et vraie crête ×4 en dBTP ; point rouge quand la moyenne du signal dépasse −60 dBFS.
  - Charge de la machine : existe quelle que soit la charge.

- E-29 · important · Détection des coupes par lecture accélérée : images perdues sur un film de 60 s, sans barre de progression.
  - Experts : 1 (01-01, 01-10). Gravités d'origine : 01-01 bloquant → important (charge), 01-10 important → détail (charge).
  - Preuve : Ligne 2795 : `playbackRate=clamp(D/4,2,16)`, soit ×15 pour 60 s. Films A, B, C : 25 coupes justes sur 153, 44 fausses ; film D de 29 s (×7,25) : 3 sur 3 à 5 ms près. Import de 16 à 469 s sous charge 40-53, sans avancement (01). Captures : [01-film-filmA-pc1366](captures/01-film-filmA-pc1366.webp), [01-film-filmB-pc1366](captures/01-film-filmB-pc1366.webp).
  - Correction : Balayage par positionnement : `grab(t)` tous les 0,2 s (paramètre `step` déjà présent ligne 2792), comparaison de deux images, puis dichotomie existante entre t−0,2 et t ; à défaut, `playbackRate` plafonné à 4. Barre d'avancement sur l'écran du film, repère posé dès qu'il est trouvé.
  - Charge de la machine : dépend de la charge. La perte d'images vient d'une lecture à ×15 sur une machine à charge 40-53 : gravité baissée d'un cran (bloquant → important pour 01-01, important → détail pour la partie durée de 01-10). Le plafond ×16 reste un risque sur un téléphone lent.

- E-30 · important · Image en retard sur le son : recalage seulement au-delà de 120 ms.
  - Experts : 1 (01-03). Gravités d'origine : 01-03 important.
  - Preuve : Ligne 3017 : seuil de recalage de 120 ms, au-dessus de la marge de 45 ms (ITU-R BT.1359). Mesure : moyenne −111 ms, pointe −946 ms au départ (01, S4).
  - Correction : Recaler l'image au-delà de 40 ms ; attendre `seeked` avant de lancer le transport ; dérive fine par `playbackRate` de 0,98 à 1,02.
  - Charge de la machine : mécanisme fixe, ampleur liée à la charge. Le seuil de 120 ms existe à toute charge ; la pointe de −946 ms dépend de la charge.

- E-31 · important · Un seul tempo pour tout le film, un seul résultat proposé.
  - Experts : 1 (01-04, 01-05). Gravités d'origine : 01-04 important, 01-05 important.
  - Preuve : `fitTempo` (ligne 2867) rend un tempo de 60 à 190 BPM ; état à champ `bpm` unique. Film B : 7 coupes sur 12 sur un temps ; film A fait à 100 BPM : 150 BPM rendu (01, S3). Capture : [01-palette-tempo-pc1366](captures/01-palette-tempo-pc1366.webp).
  - Correction : Carte de tempo `state.tempoMap=[{t,bpm}]` calculée entre deux coupes choisies (nombre entier de temps par section) ; règle et séquenceur rendus sur cette carte ; les 3 meilleurs tempos affichés avec leur nombre de coupes sur un temps.
  - Charge de la machine : existe quelle que soit la charge.

- E-32 · important · Calage du tempo sur les coupes hors d'atteinte au doigt.
  - Experts : 1 (01-08). Gravités d'origine : 01-08 important.
  - Preuve : Palette au clavier ou Alt+clic (ligne 2873) ; au doigt : 3 touchers et une saisie (01, S3).
  - Correction : Pictogramme métronome-ciseaux dans la barre du film ; appui long sur un repère « plan n » = caler sur ce repère.
  - Charge de la machine : existe quelle que soit la charge.

- E-33 · important · Écran du film sur téléphone par-dessus les pistes.
  - Experts : 1 (01-11). Gravités d'origine : 01-11 important (partie écran).
  - Preuve : Portrait : 150 × 84 px par-dessus la nappe de la piste 01 ; paysage agrandi : 62 % de la largeur, zone des pistes entièrement masquée (01, S5). Capture : [01-filmC-agrandi-iphone-paysage](captures/01-filmC-agrandi-iphone-paysage.webp).
  - Correction : Sur téléphone, film dans une bande au-dessus de la règle (25 % de la hauteur), sans recouvrement.
  - Charge de la machine : existe quelle que soit la charge.

- E-34 · important · Temps d'écho du bus dub figé à 3/4 de temps.
  - Experts : 1 (02-03). Gravités d'origine : 02-03 important.
  - Preuve : `dl.delayTime.value=spb()*.75` (ligne 1016), aucune commande (02).
  - Correction : Réglage de temps sur la tranche Master (pictogramme bobine), de 1/16 à 1 mesure et position libre ; changement par `setTargetAtTime` de 0,1 s.
  - Charge de la machine : existe quelle que soit la charge.

- E-36 · important · Sirène et laser figés et trop forts.
  - Experts : 1 (02-07). Gravités d'origine : 02-07 important.
  - Preuve : −2,1 et −1,4 LUFS, 7 s et 5 s fixes, fondu forcé de 0,4 s, aucun réglage (lignes 1886, 1909-1912) (02, S9). Capture : [02-sirene-posee-iphone](captures/02-sirene-posee-iphone.webp).
  - Correction : Sirène jouée en direct sur un pad (X hauteur 300-1 200 Hz, Y vitesse du LFO 1-12 Hz) et envoyée au bus dub ; versions posées rendues à −18 LUFS ; écho laissé jusqu'à −60 dB.
  - Charge de la machine : existe quelle que soit la charge.

- E-37 · important · La boîte King Tubby prépare peu.
  - Experts : 1 (02-08). Gravités d'origine : 02-08 important.
  - Preuve : Après le clic : tempo 74, `dubFb` 0,55, Filtre et Égaliseur sur la piste 01 ; zéro son posé, zéro envoi, console fermée ; étiquettes en anglais vers Freesound (02, S2). Capture : [02-boite-king-tubby-pc1366](captures/02-boite-king-tubby-pc1366.webp).
  - Correction : La boîte pose la sirène interne et un coup de ressort, ouvre la console, place un passe-haut sur deux pistes ; étiquettes en pictogrammes ; « dub siren » ouvre la sirène interne.
  - Charge de la machine : existe quelle que soit la charge.

- E-38 · important · Zéro filtre sur la tranche de console.
  - Experts : 1 (02-09). Gravités d'origine : 02-09 important.
  - Preuve : Tranche : M, S, FX, D, Pan, fader (ligne 1617) (02).
  - Correction : Bouton rotatif par tranche : passe-bas à gauche, passe-haut à droite, neutre au centre (biquad 20 Hz-20 kHz, résonance 0,9).
  - Charge de la machine : existe quelle que soit la charge.

- E-39 · important · Marche du larsen entre 0,6 et 0,7.
  - Experts : 1 (03-08). Gravités d'origine : 03-08 important.
  - Preuve : Dose 0,6 : extinction ; dose 0,7 : −15,2 dBFS (03, S7, `musik-fx.js` chargé en Blob, `ctx._mz` vérifié).
  - Correction : Dans `musik-fx.js` (`case 'fdbk'`), loi de gain qui place l'accrochage à 0,5 et un niveau qui monte de −40 dBFS (0,5) à −6 dBFS (1), bornée par `tanh`.
  - Charge de la machine : existe quelle que soit la charge.

- E-40 · important · Sauts de niveau des chaînes saturantes.
  - Experts : 1 (03-09). Gravités d'origine : 03-09 important.
  - Preuve : Bruit blanc à −24,8 dBFS RMS : de −19,2 dB (Β) à +21,0 dB (Mur de bruit), crêtes de +4,3 et +1,1 dBFS (03, S9).
  - Correction : Gain de rattrapage par chaîne, mesuré une fois sur bruit rose à −24 dBFS RMS, pour un écart de ±3 dB (même principe que `dist`, ligne 737).
  - Charge de la machine : existe quelle que soit la charge.

- E-41 · important · Zéro touche de coupure générale.
  - Experts : 1 (03-10). Gravités d'origine : 03-10 important.
  - Preuve : Zéro résultat pour « panic » et « panique » dans index.html ; la coupure au repos (`restGate`, ligne 963) rend le silence en 2 à 3 s (03).
  - Correction : Pictogramme ⏻ dans l'en-tête et le menu ⋯ : master coupé en 10 ms, lignes à retard et boucles vidées (`rebuildChains`).
  - Charge de la machine : existe quelle que soit la charge.

- E-43 · important · Zoom arrière bloqué à 8 px/s.
  - Experts : 1 (04-03). Gravités d'origine : 04-03 important.
  - Preuve : `clamp(state.pps*f,8,800)` (ligne 2405) : 1 min 35 s visible sur 10 min 32 s de projet (04, S4). Capture : [04-s4-projet-long-pc1366](captures/04-s4-projet-long-pc1366.webp).
  - Correction : Plancher à 0,25 px/s ; pictogramme crochets « tout le projet » : `pps = largeur utile / projEnd()`.
  - Charge de la machine : existe quelle que soit la charge.

- E-44 · important · La dérive ignore le master et reste hors de l'export.
  - Experts : 1 (04-07). Gravités d'origine : 04-07 important.
  - Preuve : 0 effet du master suivi ; `DRIFT_SKIP_K`, `DRIFT_SKIP_T` (ligne 2592) ; l'export reprend l'instant gardé (04, S8). Capture : [04-s8-derive-pc1920](captures/04-s8-derive-pc1920.webp).
  - Correction : Touche « enregistrer la dérive » qui écrit une enveloppe `fx:` par réglage suivi (ligne 1306) ; dérive étendue au rack du master.
  - Charge de la machine : existe quelle que soit la charge.

- E-45 · important · La lecture en direct du séquenceur part en rafales quand le fil principal prend du retard.
  - Experts : 1 (05-01). Gravités d'origine : 05-01 important.
  - Preuve : Ligne 2655 : les pas en retard partent à `Math.max(c.currentTime,t)`, ensemble. 76 intervalles nuls sur 87, paquet de 59 coups (05, S9, avec un blocage volontaire de 400 ms).
  - Correction : Dans `seqTick`, si `SEQ.next < c.currentTime`, sauter les pas manqués puis recaler `SEQ.next` ; anticipation de 0,2 s quand l'onglet ralentit.
  - Charge de la machine : existe quelle que soit la charge. Le mécanisme de rattrapage existe à toute charge ; un calcul lourd du studio (écart du fil principal) le déclenche aussi.

- E-46 · important · Séquenceur au téléphone debout : cellules de 10,6 px, touche E et décalage hors de l'écran.
  - Experts : 1 (05-02). Gravités d'origine : 05-02 important (partie debout).
  - Preuve : Cellules de 10,6 × 27 px, pas de 13,6 px ; décalage à x = 397 et E à x = 515 pour 390 px ; un toucher ouvre la feuille de son par erreur (05). Captures : [05-iphone-17pas-doigt](captures/05-iphone-17pas-doigt.webp), [05-iphone-motif17](captures/05-iphone-motif17.webp).
  - Correction : Pages de 8 pas (1-8, 9-16, 17-21) avec cellules de 44 px, ou rangée en double hauteur ; curseurs et E empilés sous la rangée en mode réglages.
  - Charge de la machine : existe quelle que soit la charge.

- E-47 · important · « Mesures écrites » compte des blocs de 16 pas et casse le cycle impair.
  - Experts : 1 (05-04). Gravités d'origine : 05-04 important.
  - Preuve : `total=Math.round(SEQ.bars*16)` (ligne 2657) : 4 mesures à 17 pas = 64 pas, dernier cycle à 13/17 (05, S3).
  - Correction : Écrire `SEQ.bars × SEQ.n` pas, ou un nombre entier de cycles du PPCM des rangées (plafonné) ; pictogramme de cycle à la place du mot « bars ».
  - Charge de la machine : existe quelle que soit la charge.

- E-48 · important · Zéro réglage par pas : ni décalage, ni probabilité, ni niveau.
  - Experts : 1 (05-05). Gravités d'origine : 05-05 important.
  - Preuve : Probabilité et décalage par rangée seulement (ligne 2652) (05, S5, S6).
  - Correction : Appui long sur une cellule : carré à trois réglages (décalage −50 à +50 % du pas, probabilité, niveau), pastilles sur la cellule ; tableaux `r.ms[]`, `r.p[]`, `r.g[]` de 32 cases.
  - Charge de la machine : existe quelle que soit la charge.

- E-49 · important · Les enregistrements Musopen restent illisibles (FLAC, Ogg, ZIP).
  - Experts : 1 (06-05). Gravités d'origine : 06-05 important.
  - Preuve : `iaItem` garde `/\.mp3$/` (ligne 1426) ; musopen-dvd : 1 ZIP, 0 MP3 (06, S3).
  - Correction : Accepter .flac et .ogg ; pictogramme d'archive fermée pour un item sans fichier lisible.
  - Charge de la machine : existe quelle que soit la charge.

- E-50 · important · Zéro banque de notes d'orchestre.
  - Experts : 1 (06-07). Gravités d'origine : 06-07 important.
  - Preuve : 0 son du kit pour « violin », « cello », « strings », « orchestra » ; une ligne de 8 notes demande 24 gestes ou plus (06, S1, S10).
  - Correction : Kit Orchestre de notes longues par pupitre (violons, altos, violoncelles, contrebasses, cors, bois, chœur) depuis des sources libres vérifiées ; une note par pad, transposition par demi-ton depuis le séquenceur (audio, zéro MIDI).
  - Charge de la machine : existe quelle que soit la charge.

- E-51 · important · Fiche de terrain vide à la pose et champs absents (collecteur, licence, cote, lieu).
  - Experts : 1 (07-04, 07-05). Gravités d'origine : 07-04 important, 07-05 important.
  - Preuve : `placeItem` (ligne 1796) crée le clip sans `meta` : 9 champs vides sur 9 pour un item qui fournit créateur, date et coordonnées ; `META_K` (ligne 2961) sans collecteur, licence, cote, coordonnées, langue, groupe (07). Capture : [07-fiche-auto-pc1366](captures/07-fiche-auto-pc1366.webp).
  - Correction : À la pose, remplir `c.meta` depuis `item.credit` et `archive.org/metadata` (coverage, date, creator, licenseurl, URL) ; ajouter `collector`, `license`, `source`, `geo`, `lang`, `group` et les écrire dans `creditsTxt`.
  - Charge de la machine : existe quelle que soit la charge.

- E-52 · important · Échelle réelle : cents ancrés sur La, vibrato lu comme plusieurs degrés, polyphonie non signalée.
  - Experts : 1 (07-06, 07-07, 07-08). Gravités d'origine : 07-06 important, 07-07 important, 07-08 important.
  - Preuve : Slendro joué sur ré : pics à 17, 255, 500, 731, 974 cents depuis La, gamme de référence décalée de 500 cents, `near` (ligne 2827) jamais affiché ; 3 degrés à ±50 cents → 9 pics ; bourdon + mélodie → f0 médiane 65,4 Hz, 2 degrés sur 4 manquants (07). Capture : [07-echelle-slendro_re-pc1366](captures/07-echelle-slendro_re-pc1366.webp).
  - Correction : 1. Sélecteur de tonique (pic le plus fort par défaut), cents depuis la tonique, ligne des intervalles successifs, écart de chaque pic à la gamme choisie, La réglable de 415 à 466 Hz. 2. Médiane de 100 à 150 ms sur la courbe f0 avant l'histogramme ; fusion des pics à 50 cents. 3. Clarté YIN mesurée et pictogramme « plusieurs voix » au-dessus d'un seuil.
  - Charge de la machine : existe quelle que soit la charge.

- E-53 · important · Le morphing annule deux spectres disjoints.
  - Experts : 1 (08-03). Gravités d'origine : 08-03 important.
  - Preuve : Moyenne géométrique `A^(1−t)·B^t` (ligne 2062) : creux de 48,6 dB au milieu d'un morphing 440 → 880 Hz (08, S8).
  - Correction : Interpolation linéaire des amplitudes, ou enveloppe interpolée et pics glissés d'un spectre à l'autre.
  - Charge de la machine : existe quelle que soit la charge.

- E-54 · important · Wavesets faux en stéréo.
  - Experts : 1 (08-04). Gravités d'origine : 08-04 important.
  - Preuve : Passages par zéro du seul canal gauche (`x0=b.getChannelData(0)`, ligne 2079) : 852 sauts sur le canal droit (08, S9). Capture : [08-pc1920-wavesets-dialogue](captures/08-pc1920-wavesets-dialogue.webp).
  - Correction : Passages par zéro calculés sur chaque canal, plan propre à chaque canal.
  - Charge de la machine : existe quelle que soit la charge.

- E-55 · important · Analyse-resynthèse par partiels absente.
  - Experts : 1 (08-05). Gravités d'origine : 08-05 important.
  - Preuve : 0 occurrence de « partial », « resynth », « additive » hors du nom « Additive choir » (08, S11).
  - Correction : Onglet « Partiels » dans la loupe : détection de pics, suivi McAulay-Quatieri, partiels dessinés, suppression ou transposition au toucher, resynthèse par banc d'oscillateurs.
  - Charge de la machine : existe quelle que soit la charge.

- E-56 · important · Spatialisation stéréo seule.
  - Experts : 1 (08-06). Gravités d'origine : 08-06 important.
  - Preuve : `createStereoPanner` (ligne 1026) : écart de temps entre les oreilles de 0 échantillon, ni hauteur, ni arrière, ni HRTF (08, S10). Capture : [08-pc1366-scene](captures/08-pc1366-scene.webp).
  - Correction : `PannerNode` en `panningModel:"HRTF"` (x = pan × 3 m, z = −profondeur × 14 m), axe de hauteur, export ambisonique d'ordre 1 (4 canaux).
  - Charge de la machine : existe quelle que soit la charge.

- E-57 · important · Doppler éloigné de la physique.
  - Experts : 1 (08-07). Gravités d'origine : 08-07 important.
  - Preuve : Glissé de 0 à 14 m : −219 cents pour −322 attendus à 70 m/s ; −79 pour −35 à 7 m/s (08, S10, `apply` ligne 2719).
  - Correction : Trajectoire du doigt échantillonnée, retard lissé par une constante unique de 30 ms (`setValueCurveAtTime`), retard calculé depuis la position seule.
  - Charge de la machine : existe quelle que soit la charge.

- E-58 · important · Loupe spectrale sans graduation ni lecture sous le pointeur.
  - Experts : 1 (08-08). Gravités d'origine : 08-08 important.
  - Preuve : Échelle log exacte (raies à 44 % et 56 % de la hauteur), zéro graduation en Hz ou en temps (08, S2). Capture : [08-pc-loupe-spectre](captures/08-pc-loupe-spectre.webp).
  - Correction : Graduations 50 Hz à 10 kHz à gauche, secondes en bas ; Hz, dB et temps sous le doigt ou la souris.
  - Charge de la machine : existe quelle que soit la charge.

- E-59 · important · « Copier » duplique aussi le clip.
  - Experts : 1 (08-09). Gravités d'origine : 08-09 important.
  - Preuve : Ligne 1701 : `clipboard={...c}` puis `dupSel()` ; un second clip apparaît à 4,75 s sur la piste 02 (08, S7). Capture : [08-pc-convolution-dialogue](captures/08-pc-convolution-dialogue.webp).
  - Correction : Copier = presse-papier seul ; Dupliquer reste dans le menu de l'appui long.
  - Charge de la machine : existe quelle que soit la charge.

- E-61 · important · Noms de clips coupés et poignées de fondu sur chaque clip après Écrire.
  - Experts : 1 (10-07). Gravités d'origine : 10-07 important (partie affichage).
  - Preuve : 21 noms rognés sur pc1920 (« Un », « Ho », « Gra ») ; noms hors de `tele()` (ligne 2583) (10, S4, S11). Capture : [10-pc1366-simple-clip](captures/10-pc1366-simple-clip.webp).
  - Correction : Nom masqué sous 48 px de clip, défilement au choix du clip au-delà ; poignées de fondu sur le clip choisi seulement. L'écriture garde un clip par coup (voir contradictions).
  - Charge de la machine : existe quelle que soit la charge.

- E-62 · important · Onglets des modes de pads rognés et bas.
  - Experts : 1 (10-08). Gravités d'origine : 10-08 important.
  - Preuve : 10 onglets de 23 px de haut, 9 sur 10 rognés sur iphone, 5 sur 10 sur pc1366 (10, S6). Capture : [10-iphone-simple-pads](captures/10-iphone-simple-pads.webp).
  - Correction : Grille de 10 pictogrammes de 44 × 44 px sur deux rangées, ou commutateur rotatif photographié à 10 crans.
  - Charge de la machine : existe quelle que soit la charge.

- E-63 · important · Proportions différentes d'un format à l'autre.
  - Experts : 1 (10-09). Gravités d'origine : 10-09 important.
  - Preuve : Tête de piste à 36 %, 27 %, 18 %, 13 % de la largeur ; pistes à 49 %, 25 %, 83 %, 87 % de la hauteur ; bouton Lecture 40 × 42, 30 × 42, 37 × 34, 42 × 42 (10, S9).
  - Correction : Tête de piste `clamp(120px,22vw,240px)` ; bibliothèque sur le côté long, 30 % de celui-ci ; tiroir ouvert à 50 % de la zone de travail ; bouton Lecture carré à l'unité `--u`. Contrôle : écart des rapports sous 5 points.
  - Charge de la machine : existe quelle que soit la charge.

- E-64 · important · Le mode simple laisse 18 commandes dans l'en-tête de l'ordinateur.
  - Experts : 1 (10-11). Gravités d'origine : 10-11 important.
  - Preuve : Ligne 291 : masque des touches du pied seulement ; 18 commandes sur pc1366 et pc1920 (10, S2).
  - Correction : Masquer en mode simple `#bMetro,#bLoop,#bSnap,#bFree,#bCount,#bMon,#bFlash,#bTuner,#bNew` ; 9 commandes restent. Chronomètre et Flashback restent dans l'Atelier (voir contradictions).
  - Charge de la machine : existe quelle que soit la charge.

- E-65 · important · Lettres et couleurs hors de `insertkoin/DA.md`.
  - Experts : 1 (10-12). Gravités d'origine : 10-12 important.
  - Preuve : Barlow Semi Condensed et Courier Prime (lignes 15-18, 31), aucune des quatre familles de DA.md ; 105 couleurs hexadécimales dans le CSS ; accent le plus fréquent #f2e3a6, hors palette (10, S10).
  - Correction : Bebas Neue pour touches et plaques, DM Mono pour compteurs et noms de sons, Press Start 2P pour les écrans à phosphore ; #f2e3a6 remplacé par #ffe3a0 ; couleurs ramenées aux variables de la ligne 22.
  - Charge de la machine : existe quelle que soit la charge.

- E-66 · important · Surfaces encore dessinées : pistes vides, bouton +, grille Master.
  - Experts : 1 (10-13). Gravités d'origine : 10-13 important.
  - Preuve : Aplat sombre et grille vectorielle des pistes vides ; disque + en dégradé CSS (lignes 296-297) ; Master en cartes à cases (10, S10). Capture : [10-pc1366-simple-master](captures/10-pc1366-simple-master.webp).
  - Correction : Bande magnétique photographiée sous les clips, règle en réglet photographié ; + en bouton lumineux photographié d'une console de 1980 ; huit premiers masterings sur un commutateur rotatif photographié, les autres en étiquettes Dymo.
  - Charge de la machine : existe quelle que soit la charge.

### Détail

- E-71 · détail · Libellés et requêtes en anglais dans l'interface française.
  - Experts : 4 (04-12, 08-12, 07-11, 05-12). Gravités d'origine : 04-12 détail, 08-12 détail, 07-11 détail, 05-12 détail.
  - Preuve : « Window s », « Length s », « Smooth », « Repeat·Omit·Reverse·Shuffle » (`AT_PN`, ligne 2103) (04, 08) ; « papua new guinea singing », « wax cylinder » (07) ; « 1 bars » (05). Capture : [08-pc-croisee-dialogue](captures/08-pc-croisee-dialogue.webp).
  - Correction : Pictogrammes à la place des libellés (fenêtre, durée, cycle) ; nom français ou nom propre de la région, requête anglaise gardée en interne.
  - Charge de la machine : existe quelle que soit la charge.

- E-72 · détail · Pages fermées pendant les exports en série.
  - Experts : 3 (03-06, 04-05, 06-06). Gravités d'origine : 03-06, 04-05, 06-06 (partie plantages) : important → détail (charge).
  - Preuve : Trois rendus d'affilée : « Target closed » (03) ; page fermée pendant l'export de 644 s à charge 41-50 (04) ; 2 plantages au 3ᵉ export de 70 s (06) ; navigateur fermé deux fois (05) ; OOM de Chromium dans `dmesg` (04).
  - Correction : Libérer les tampons entre deux exports ; sauvegarde du projet avant tout export de plus de 5 min ; rendu par segments (écart des 5 rendus).
  - Charge de la machine : dépend de la charge. Tous les plantages se produisent à charge 41 à 108 sur 2 cœurs et 8 Go partagés par dix navigateurs : gravité baissée d'un cran (important → détail).

- E-73 · détail · Retard constant de 128 échantillons (2,9 ms) au rendu ; stem du film atténué de 2,5 dB.
  - Experts : 2 (05-10, 01-17). Gravités d'origine : 05-10 détail, 01-17 détail ; 08 (S10, sans numéro).
  - Preuve : +2,894 à +2,917 ms sur toutes les pistes (05, S3) ; latence fixe de 2,9 ms sur la scène (08, S10) ; clics de coupe à +2,4 ms et crête −6,26 dBFS pour −3,74 à la source (01, S8).
  - Correction : Trouver le nœud qui crée le quantum (boucle de retard ou worklet de la chaîne de piste) et rogner 128 échantillons en tête du rendu ; stems au gain unité, panoramique neutre sans loi de −3 dB.
  - Charge de la machine : existe quelle que soit la charge.

- E-74 · détail · La recherche ignore les boîtes à bruit et les noms français.
  - Experts : 2 (02-11, 04-12). Gravités d'origine : 02-11 détail, 04-12 détail (partie recherche).
  - Preuve : « sirène », « laser », « dub » : zéro boîte à bruit (02) ; « drone » : zéro son du kit en français (04). Capture : [02-recherche-sirene-pc1366](captures/02-recherche-sirene-pc1366.webp).
  - Correction : Indexer `NB_LIST` et `NB_FR` (lignes 1882-1883) ; chercher dans le nom anglais et le nom français de chaque son.
  - Charge de la machine : existe quelle que soit la charge.

- E-75 · détail · Sur ordinateur, la barre d'actions du clip passe par-dessus le rack.
  - Experts : 1 (03-13). Gravités d'origine : 03-13 détail.
  - Preuve : Sur 1 366 × 768, Delete, Copy, Loop, Slice et More masquent les boutons de la Distorsion et de l'Écraseur (03). Capture : [03-larsen-pose-pc1366](captures/03-larsen-pose-pc1366.webp).
  - Correction : Barre au-dessus du clip choisi, dans la zone des pistes, ou masquée quand le rack est ouvert.
  - Charge de la machine : existe quelle que soit la charge.

- E-76 · détail · Compteur du film au dixième de seconde, sans images ni SMPTE.
  - Experts : 1 (01-13). Gravités d'origine : 01-13 détail.
  - Preuve : Format `m:ss.d` (ligne 3019) (01, S4).
  - Correction : Compteur `hh:mm:ss:ii` à la cadence lue par `requestVideoFrameCallback` ; deux pictogrammes pour avancer d'une image.
  - Charge de la machine : existe quelle que soit la charge.

- E-77 · détail · Fondus enchaînés du film non marqués.
  - Experts : 1 (01-14). Gravités d'origine : 01-14 détail.
  - Preuve : Film D, fondu de 20 à 21 s : 0 repère (01, S9).
  - Correction : Pente régulière de l'écart sur 0,3 s ou plus → repère au milieu, pictogramme distinct.
  - Charge de la machine : existe quelle que soit la charge.

- E-78 · détail · Décalage de départ du film non réglable.
  - Experts : 1 (01-15). Gravités d'origine : 01-15 détail.
  - Preuve : `filmOff` toujours 0 (ligne 2998) (01).
  - Correction : Glisser la vignette du clip-film le long de la règle, ou champ de départ dans le menu du clip.
  - Charge de la machine : existe quelle que soit la charge.

- E-79 · détail · Zéro export du film avec la musique.
  - Experts : 1 (01-16). Gravités d'origine : 01-16 détail.
  - Preuve : Aucun `captureStream` sur la vidéo (lignes 1266, 2781) (01, S8).
  - Correction : « film + mix » : `captureStream()` de la vidéo, piste audio du mix rendu, `MediaRecorder` en WebM.
  - Charge de la machine : existe quelle que soit la charge.

- E-80 · détail · Le nombre de coupes disparaît sous un autre toast.
  - Experts : 1 (01-18). Gravités d'origine : 01-18 détail.
  - Preuve : 2,5 s après l'import, seul le toast de la bibliothèque reste lisible (01, S1).
  - Correction : Nombre de coupes affiché sur l'écran du film, à côté du compteur.
  - Charge de la machine : existe quelle que soit la charge.

- E-81 · détail · Le ressort du bus dub change à chaque construction.
  - Experts : 1 (02-10). Gravités d'origine : 02-10 détail.
  - Preuve : `Math.random` dans `springIR` (ligne 1008) (02, S4).
  - Correction : Générateur pseudo-aléatoire à graine fixe.
  - Charge de la machine : existe quelle que soit la charge.

- E-82 · détail · Les pads Écho coupent la queue au relâchement.
  - Experts : 1 (02-12). Gravités d'origine : 02-12 détail.
  - Preuve : Ligne 1754 : retour éteint en 0,4 s, effet détruit à 4 s (02, S11).
  - Correction : Au relâchement, couper l'entrée de l'écho et laisser la boucle jusqu'à −60 dB.
  - Charge de la machine : existe quelle que soit la charge.

- E-83 · détail · Fondus linéaires seulement.
  - Experts : 1 (04-10). Gravités d'origine : 04-10 détail.
  - Preuve : `linearRampToValueAtTime` (ligne 1219) (04, S7).
  - Correction : Trois courbes (linéaire, exponentielle, S) par pictogramme dans la feuille Fondus.
  - Charge de la machine : existe quelle que soit la charge.

- E-84 · détail · Le gel spectral fluctue de 6,8 dB.
  - Experts : 1 (04-11). Gravités d'origine : 04-11 détail.
  - Preuve : Écart-type 1,14 dB, plage 6,8 dB sur 60 s (04, S10).
  - Correction : Recouvrement de 4 et phases qui avancent d'une trame à l'autre.
  - Charge de la machine : existe quelle que soit la charge.

- E-85 · détail · Un décalage négatif s'annule sur le premier coup.
  - Experts : 1 (05-06). Gravités d'origine : 05-06 détail.
  - Preuve : `Math.max(0,…)` (ligne 2659) : −13 ms sur 33 coups sur 34 (05, S6).
  - Correction : Décaler tout le bloc écrit de `-r.ms`, ou commencer l'écriture une mesure plus loin.
  - Charge de la machine : existe quelle que soit la charge.

- E-86 · détail · Tirage sans graine.
  - Experts : 1 (05-07). Gravités d'origine : 05-07 détail.
  - Preuve : 10 écritures, 10 motifs différents (`Math.random()`, ligne 2659) (05, S5).
  - Correction : Dé numéroté affichant la graine, comme Circuit bend (ligne 2096).
  - Charge de la machine : existe quelle que soit la charge.

- E-87 · détail · Euclidien sans k explicite ni rotation.
  - Experts : 1 (05-08). Gravités d'origine : 05-08 détail.
  - Preuve : k tiré des cellules allumées, zéro rotation (05, S4).
  - Correction : Deux curseurs (k de 0 à n, rotation de 0 à n − 1), ou appui long sur E puis glissé.
  - Charge de la machine : existe quelle que soit la charge.

- E-88 · détail · La lecture en direct du séquenceur contourne la piste.
  - Experts : 1 (05-09). Gravités d'origine : 05-09 détail.
  - Preuve : `x.connect(master.input)` (ligne 2655) : piste 01 coupée, 16 départs en 1,5 s (05, S9).
  - Correction : Brancher chaque coup sur l'entrée de la chaîne de sa piste (`chains.get(id).input`).
  - Charge de la machine : existe quelle que soit la charge.

- E-89 · détail · Le SP-1200 ajoute un filtre de sortie absent de la machine.
  - Experts : 1 (05-11). Gravités d'origine : 05-11 détail.
  - Preuve : Deux passe-bas à 0,48 × fréquence d'échantillonnage (lignes 815-817) (05, S10).
  - Correction : `tone` par défaut à 18 000 Hz et `post2` retiré pour le SP-1200.
  - Charge de la machine : existe quelle que soit la charge.

- E-90 · détail · La feuille de son de rangée affiche « Kick », « Snare », « Hat ».
  - Experts : 1 (05-13). Gravités d'origine : 05-13 détail.
  - Preuve : Capture [05-iphone-motif17](captures/05-iphone-motif17.webp) ; règle de PENSE-BETE.md (05).
  - Correction : Nommer ces sons par ce qu'ils sont (« coup grave court », « bruit filtré bref ») ou par pictogramme.
  - Charge de la machine : existe quelle que soit la charge.

- E-91 · détail · « 1200 » écrit au lieu de 0 dans l'échelle.
  - Experts : 1 (07-10). Gravités d'origine : 07-10 détail.
  - Preuve : Rast et pelog : dernier pic « 1200 » (07, S7).
  - Correction : `Math.round(...) % 1200` dans `scaleSheet` et `fieldSheet`.
  - Charge de la machine : existe quelle que soit la charge.

- E-92 · détail · Gammes de référence limitées et idéalisées.
  - Experts : 1 (07-13). Gravités d'origine : 07-13 détail.
  - Preuve : 7 gammes, slendro à pas égaux de 240 cents (ligne 2811) (07).
  - Correction : Hijaz, saba, 53 commas, gamme thaïe à 7 pas égaux, 24 tons égaux ; gamme mesurée d'un clip enregistrable comme référence.
  - Charge de la machine : existe quelle que soit la charge.

- E-93 · détail · Courbe de hauteur et export des mesures absents.
  - Experts : 1 (07-14). Gravités d'origine : 07-14 détail.
  - Preuve : Écran ♪ limité à l'histogramme (07).
  - Correction : Courbe f0 dans le temps ; export texte (temps, Hz, cents) joint aux crédits.
  - Charge de la machine : existe quelle que soit la charge.

- E-94 · détail · La synthèse croisée perd 10,2 dB de contraste harmonique.
  - Experts : 1 (08-13). Gravités d'origine : 08-13 détail.
  - Preuve : Phases aléatoires de `synthRandom` (ligne 2037) (08, S8).
  - Correction : Garder les phases de la porteuse, appliquer le rapport des enveloppes.
  - Charge de la machine : existe quelle que soit la charge.

- E-95 · détail · L'étirement WSOLA à 50 % multiplie les clics.
  - Experts : 1 (08-14). Gravités d'origine : 08-14 détail.
  - Preuve : 8 clics à l'entrée, 22 à la sortie au-dessus de 0,3 (`wsola`, ligne 1158) (08 ; mesure citée dans l'écart, sans scénario détaillé).
  - Correction : Trames d'attaque copiées une fois, étirement entre deux attaques.
  - Charge de la machine : existe quelle que soit la charge.

- E-96 · détail · Zéro écoute avant validation dans l'Atelier.
  - Experts : 1 (08-15). Gravités d'origine : 08-15 détail.
  - Preuve : Dialogues S5 à S9 (08).
  - Correction : Touche ▶ qui calcule les 4 premières secondes et les joue en boucle.
  - Charge de la machine : existe quelle que soit la charge.

- E-97 · détail · Zéro traitement spectral en temps réel dans le rack.
  - Experts : 1 (08-16). Gravités d'origine : 08-16 détail.
  - Preuve : Tout traitement spectral remplace le clip hors ligne (08, S6).
  - Correction : AudioWorklet de gel et de flou spectral par piste, commande au doigt.
  - Charge de la machine : existe quelle que soit la charge.

- E-98 · détail · Feuille Créer rognée sur téléphone.
  - Experts : 1 (10-14). Gravités d'origine : 10-14 détail.
  - Preuve : Cases Film et Platines coupées à mi-hauteur (10). Capture : [10-iphone-simple-creer](captures/10-iphone-simple-creer.webp).
  - Correction : Grille de 3 × 2 cases de 110 × 110 px en portrait.
  - Charge de la machine : existe quelle que soit la charge.

- E-99 · détail · Case Créer coupée dans le pied de l'Atelier.
  - Experts : 1 (10-15). Gravités d'origine : 10-15 détail.
  - Preuve : « Crée » sur iphone (10). Capture : [10-iphone-atelier-console](captures/10-iphone-atelier-console.webp).
  - Correction : Pictogramme seul sous 760 px en Atelier (`body:not(.simple) #bCreate .lbl{display:none}`).
  - Charge de la machine : existe quelle que soit la charge.

- E-100 · détail · Axes des pads peu lisibles.
  - Experts : 1 (10-16). Gravités d'origine : 10-16 détail.
  - Preuve : 9,4 à 10,5 px, vert ou gris sur fond sombre (10). Capture : [10-pc1366-pad-souris](captures/10-pc1366-pad-souris.webp).
  - Correction : 12 px en #ffe3a0, ou pictogrammes d'axe.
  - Charge de la machine : existe quelle que soit la charge.

## Écarté, avec raison

- Effets de Musik (insertkoin/musik-fx.js) notés absents ou cassés : zéro écart écarté. Le harnais laissait ce module hors de l'AudioWorklet ; en ligne, il se charge depuis la même origine (ligne 711, `MZ_URL`). Contrôle par grep : zéro mention de musik-fx, d'AudioWorklet ou d'effet `mz_` dans les rapports 01, 09 et 10 ; le mastering Jazz de 09-11 (ligne 909) ne passe par aucun effet `mz_`. Les rapports 02 et 03 chargent le module en Blob et vérifient `ctx._mz` ; les rapports 04, 05, 06 et 07 écrivent qu'aucun de leurs écarts n'en dépend.
- Freesound, Wikimedia Commons et Openverse : refusés par le proxy de la session (HTTP 403 ou code 000). Zéro écart noté sur ces sources.
- 09-11, partie « ramener le gain du master sur la cible −14 LUFS » : écartée au profit de E-21 (borner le relèvement et afficher l'écart). Règle : EBU R128 et l'exigence de Bob Katz placent la vraie crête et la nuance avant la sonie visée ; 03, 04, 06 et 08 mesurent déjà la cible à 0,2 LU près sur des signaux musicaux. La partie vraie crête de 09-11 passe dans E-06.
- 10-07, partie « Écrire rend chaque rangée en un clip par mesure » : écartée. REQUESTS.md (fait) demande l'écriture en clips audio ; 05 mesure 0,000 ms d'écart par coup et classe « une région par coup » à garder ; la fusion de clips existe déjà. La partie affichage reste dans E-61.
- 08-11, partie « facteur ×10 000 » : écartée au profit du facteur ×1 000 de 04-02. Les deux experts demandent 3 600 s de sortie ; ×1 000 atteint 3 600 s dès 3,6 s de source.

- Enregistrement au micro, retiré de l'analyse par Mauk Tenieb le 20 novembre 2026 (« le point 4 : à retirer ») : E-13 (Chaque prise au micro tombe trop tôt, de 114 à 892 ms ; les couches successives se décalent en cascade) ; E-14 (Le décompte décale la prise de −2,62 s au début du projet et ses 4 clics restent muets) ; E-15 (Une seule piste armée et une seule entrée : zéro prise simultanée de deux musiciens) ; E-67 (Saisie après coup (Flashback) limitée à 60 s) ; E-68 (La prise reste en mémoire jusqu'à l'arrêt) ; E-69 (Une nouvelle prise s'ajoute à l'ancienne : zéro rangée de prises) ; E-70 (Zéro niveau d'entrée et zéro forme d'onde pendant la prise).
