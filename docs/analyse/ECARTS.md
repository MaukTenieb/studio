# Écarts du Studio, liste unique

Cette liste fusionne les 139 écarts des dix rapports d'experts (docs/analyse/experts/) en 100 écarts. Chaque écart donne sa gravité, les identifiants d'origine, la preuve (ligne de index.html, mesure, capture) et la correction. Ordre : gravité, puis nombre d'experts qui le relèvent. La synthèse et la règle de fusion figurent dans SYNTHESE.md.

Gravité choisie : la plus haute des gravités d'origine, baissée d'un cran quand l'écart repose sur une durée ou une panne mesurée sous forte charge de la machine de test (voir SYNTHESE.md, « Limites de la mesure »).

## Fait

- 20 nov. 21 h 24 : E-27 ; E-28 ; E-34 ; E-36 ; E-37 ; E-38 ; E-39 ; E-40 ; E-73 ; E-81 ; E-82 ; E-89. Pistes séparées : 16 bits avec dither TPDF, 24 bits ou 32 bits flottants, 44,1 ou 48 kHz, en-tête BWF avec TimeReference, toutes de même longueur, 2-pop 1 kHz d'une image à −2 s au choix (fichiers relus par libsndfile : PCM_16, PCM_24, FLOAT, time_reference lue) ; sonomètre du pied : LUFS intégré, LRA (EBU Tech 3342), vraie crête en dBTP, pastille rouge quand le continu dépasse −60 dBFS ; temps de l'écho dub de 1/16 à 1 mesure sur la tranche Master ; sirène jouée en direct sur un pad (X 300-1 200 Hz, Y vibrato 1-12 Hz) envoyée au bus dub, sirène et laser posés à −18 LUFS ; boîtes dub : passe-haut sur deux pistes, sirène et ressort posés, console ouverte ; filtre ◖ ◗ par tranche (passe-bas à gauche, passe-haut à droite) ; larsen (insertkoin/musik-fx.js) : silence à 0,4, accrochage à 0,5 (−28,6 dB), −7,4 dB à 1 ; rattrapage de niveau de 20 chaînes sur 33 (écart ramené à ±3 dB sur bruit rose) ; rendu calé sur la grille (premier échantillon à 0 au lieu de 128) ; ressort du bus dub à graine fixe ; pads Écho et Réverb : seule l'entrée se ferme au relâchement, la queue reste ; SP-1200 sans filtre de sortie ajouté. Loi de panoramique −3 dB gardée pour les sources mono : c'est la loi des consoles et des stations de travail.

- 20 nov. 21 h 18 : E-29 ; E-30 ; E-31 ; E-32 ; E-33 ; E-76 ; E-77 ; E-78 ; E-79 ; E-80. Film : recalage de l'image au-delà de 40 ms, écart fin rattrapé par la vitesse 0,98-1,02 ; code temporel hh:mm:ss:ii et nombre de coupes sur l'écran du film (« 00:00:04:12  ✂ 4 ») ; touches image précédente et suivante ; touche métronome : les 3 meilleurs tempos avec leur nombre de coupes sur un temps (119,95 : 4/4) ; appui long sur un repère de la règle : tempo calé sur ce repère ; touche de départ du film (−30 à +120 s, repères déplacés avec lui) ; export film + mix en WebM ; fondus enchaînés marqués ◐ (fondu rouge-bleu d'une seconde : repère à 2,19 s) ; avancement de la détection dans la barre de calcul ; au téléphone, film dans une bande de 24 % au-dessus de la règle, sans recouvrement. La carte de tempo par section reste hors de ce lot : un seul tempo par projet.

- 20 nov. 21 h 04 : E-20 ; E-26 ; E-41 ; E-43 ; E-59 ; E-61 ; E-62 ; E-64 ; E-74 ; E-75 ; E-83 ; E-98 ; E-99 ; E-100. Bouton + du projet vide masqué tiroir ouvert ; aimant : repères de film et bords des clips à 10 px d'abord, tempo libre au centième de seconde ; coupure générale ⏻ (arrêt, séquenceur coupé, chaînes reconstruites, bus dub muet 0,3 s) ; zoom arrière jusqu'à 0,25 px/s et touche « tout le projet » ; Copier remplit le presse-papier sans dupliquer ; poignées de fondu sur le clip choisi seulement, nom masqué sous 48 px ; onglets des pads en grille de 44 px ; mode simple sans métronome, boucle, aimant, tempo libre, chronomètre, retour d'écoute, Flashback, accordeur ni nouveau projet dans l'en-tête ; recherche dans les noms français et anglais et dans les boîtes à bruit ; barre du clip masquée rack ouvert ; trois courbes de fondu (⟋ linéaire, ◜ exponentielle, ∫ en S) en lecture et à l'export ; feuille Créer en 3 × 2 au téléphone debout ; Créer en pictogramme seul dans le pied de l'Atelier sous 760 px ; axes des pads à 12 px en #ffe3a0. Contrôle iPhone 13 : 0 cible sous 44 px et 0 texte sous 11 px dans la scène.

- 20 nov. 21 h 01 : E-22 ; E-45 ; E-46 ; E-47 ; E-48 ; E-85 ; E-86 ; E-87 ; E-88. Séquenceur : swing calculé sur la position dans la rangée (pas 17 d'un cycle de 17 : 0 au lieu de +0,5 pas) ; pas manqués sautés en direct, anticipation 0,2 s (0,6 s onglet caché) ; coups joués dans la chaîne de leur piste ; « ⟳ n » écrit n cycles entiers par rangée (17 pas × 2 = 34 clips) ; décalage négatif : bloc repoussé d'un pas (premier coup à 0,105 s pour −20 ms) ; appui long sur un pas : décalage ±50 %, probabilité, niveau, pastille sur la cellule ; dé à graine affichée, même graine même motif ; curseurs k et rotation de l'euclidien. Au doigt, cellules de 44 px au moins en lignes (50 × 40 debout, 47 × 40 couché, contre 10,6 × 27).

- 20 nov. 19 h 43 : E-44 ; E-65. Dérive gravée : touche ● de la dérive, chaque réglage suivi s'écrit en enveloppe fx: toutes les 200 ms et passe à l'export (filtre : 14 points par réglage en 3,5 s, rendu sans erreur). Couleurs : l'accent #f2e3a6 et ses variantes deviennent #ffe3a0, les ambres et rouges hors palette deviennent #ffa726 et #c9302a (27 remplacements) ; les polices Barlow et Courier Prime restent, DA.md réserve ses quatre familles à la borne.

- 20 nov. 19 h 41 : E-11 ; E-12 ; E-21. Console au téléphone : touche D de 44 px, tranche Master épinglée au bord droit, réglage de réinjection visible. Coupes de film : seuil adaptatif (4 fois la médiane des 2 s précédentes, 0,04 au moins) et lecture deux fois moins rapide ; film gris à 5 % d'écart : 4 coupes trouvées sur 4, à 6 ms près (contre 0). Mastering : Neutral devient le réglage d'origine des projets neufs, Neutral et Classical en tête du tiroir Master, relèvement de sonie borné à +6 dB (la compensation du gain de rattrapage des compresseurs reste à faire).

- 20 nov. 19 h 40 : E-17 ; E-19 ; E-51 ; E-90 ; E-71. Internet Archive : tri par pertinence dès qu'un mot est saisi ; entrée d'une collection en expression exacte, avec sujet ethnographique pour les familles de terrain (« berber » : chants d'anachid et récitation du Coran sortis de la tête de liste ; « gamelan » : 3 enregistrements de gamelan sur 5) ; Jazz sans country, chants de prison ni gospel ; Classique sans radio ancienne. Quinze boîtes « tribute to » sous les minuscules ι à ψ : Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Mica Levi, Trent Reznor & Atticus Ross, Angelo Badalamenti, Thomas Köner, Raison d'être, Atrium Carceri, Duke Ellington, Ornette Coleman, Sun Ra, Scientist, Mad Professor, Basic Channel ; chaque chaîne mesurée (crête −3,2 à −11 dBFS, continu ≤ −65 dBFS, zéro NaN). Fiche de terrain remplie à la pose depuis les métadonnées d'Internet Archive (lieu avec coordonnées, date, collecteur, langue, cote, licence, source), écrite dans les crédits avec l'adresse complète de la licence. Noms anglais des sons de kit sans kick, snare ni hat (bass drum, side drum, cymbals) ; réglages de l'Atelier en français ; « 1 bar ».

- 20 nov. 19 h 34 : E-03 ; E-05 ; E-04 ; E-24. Paulstretch, gel, flou, grain, wavesets, séparation harmonique / percussive, WSOLA et analyse de hauteur tournent dans un Web Worker, avec barre d'avancement et touche d'arrêt (les traitements qui demandent l'audio du navigateur retombent sur le fil principal). Paulstretch ×64 de 8 s : 8,9 s au téléphone, image suivante en 80 ms pendant le calcul (contre 66 à 437 s de page figée) ; séparation de 8 s : 245 ms de blocage au plus, contre 4 763 ms. Plafonds : étirement ×256 et 1 200 s (20 min stéréo en 38,8 s), gel et grain 600 s. Sons distants entiers jusqu'à 15 min, au-delà coupe annoncée. Pistes affichées 0,25 s après l'ouverture, avant la synthèse du kit (contre 0,78 s sur la même machine au calme).

- 20 nov. 19 h 29 : E-06 ; E-07 ; E-08 ; E-09 ; E-10 ; E-18 ; E-35 ; E-42. Courbes de saturation symétriques (continu des 33 chaînes : −240 dBFS, contre −24,5 à −49,1 ; export Noise : −74,4 dBFS, contre −12,8). Plafond d'export en vraie crête (sinus à fs/4 : +3,04 dBTP ramené à −1,09 dBTP mesuré par Python ×16). Garde de sortie du rack : trois larsens et un écho à 0,95 restent sous −0,8 dBFS de crête pendant 30 s (contre +24,6). Touche D enregistrée pendant la lecture et rejouée à l'export (échos du dub présents à −32,8 dBFS entre 4,5 et 6 s). Réglage de réinjection sur l'écho : à 5 s, −152,9 dB au réglage 0, −67,7 dB à 0,5, auto-oscillation bornée à 1,05. Cible de sonie : deux rendus au plus, relèvement borné à +6 dB (export de 8,7 s en 4,7 à 5,3 s). Queues : ping-pong compté deux fois, écho de bande 10 + 50 × dosage s, bus dub selon sa réinjection. Projet vide : message à l'export.

- 20 nov. 19 h 24 : E-01 ; E-02 ; E-16 ; E-60. Téléphone couché : bibliothèque à droite, tiroirs sur toute la largeur, console à tranches en deux colonnes avec faders, platines avec disques. Barre du clip dans le flux du pied (4 touches sur 5 au doigt, la cinquième au défilement). Cibles : 0 % sous 44 px et 0 % de texte sous 11 px sur iPhone 13 debout et couché, dans les neuf écrans mesurés (contre 96 à 100 % et 21 à 76 %). Téléprompteur : la marge de fin n'entre plus dans le calcul, M et S restent fixes.

## À faire

### Bloquant

### Important

- E-23 · important · Zéro réponse impulsionnelle enregistrée, zéro position de micro.
  - Experts : 2 (04-06, 06-09). Gravités d'origine : 04-06 important, 06-09 détail.
  - Preuve : Grotte, silo, cathédrale et 20 pièces = bruit filtré et réflexions posées (lignes 718, 829-836) ; `convx` (ligne 2099) destructif, sans mix, pré-délai ni écoute (04, 06).
  - Correction : Effet de piste « Convolution » dont la réponse est un son de la bibliothèque (cave, silo, citerne, salle), avec mix, pré-délai, longueur ; `ConvolverNode` direct ; réglage de distance (proche, salle, ambiance) sur Room ; réponses de salles réelles sous licence libre.
  - Charge de la machine : existe quelle que soit la charge.

- E-25 · important · Licences déclarées par les déposants et abrégées dans les crédits.
  - Experts : 2 (07-09, 09-10). Gravités d'origine : 07-09 important, 09-10 important (partie licence).
  - Preuve : `negroprisonsongs` (Alan Lomax, 1947) passe le filtre en « publicdomain » (07) ; « Come Away with Me » de Norah Jones (2002) affiché CC0 (09) ; crédits en « PD » ou « CC BY » sans version ni lien (07, `creditsTxt` ligne 1312).
  - Correction : Étendre `IA_SKIP` aux fonds à droits connus (prises Lomax, Folkways, Ocora rediffusés) ; pictogramme de doute sur un titre présent dans MusicBrainz avec un label commercial ; URL complète `licenseurl` dans les crédits ; distinguer Marque du domaine public et CC0.
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

- E-63 · important · Proportions différentes d'un format à l'autre.
  - Experts : 1 (10-09). Gravités d'origine : 10-09 important.
  - Preuve : Tête de piste à 36 %, 27 %, 18 %, 13 % de la largeur ; pistes à 49 %, 25 %, 83 %, 87 % de la hauteur ; bouton Lecture 40 × 42, 30 × 42, 37 × 34, 42 × 42 (10, S9).
  - Correction : Tête de piste `clamp(120px,22vw,240px)` ; bibliothèque sur le côté long, 30 % de celui-ci ; tiroir ouvert à 50 % de la zone de travail ; bouton Lecture carré à l'unité `--u`. Contrôle : écart des rapports sous 5 points.
  - Charge de la machine : existe quelle que soit la charge.

- E-66 · important · Surfaces encore dessinées : pistes vides, bouton +, grille Master.
  - Experts : 1 (10-13). Gravités d'origine : 10-13 important.
  - Preuve : Aplat sombre et grille vectorielle des pistes vides ; disque + en dégradé CSS (lignes 296-297) ; Master en cartes à cases (10, S10). Capture : [10-pc1366-simple-master](captures/10-pc1366-simple-master.webp).
  - Correction : Bande magnétique photographiée sous les clips, règle en réglet photographié ; + en bouton lumineux photographié d'une console de 1980 ; huit premiers masterings sur un commutateur rotatif photographié, les autres en étiquettes Dymo.
  - Charge de la machine : existe quelle que soit la charge.

### Détail

- E-72 · détail · Pages fermées pendant les exports en série.
  - Experts : 3 (03-06, 04-05, 06-06). Gravités d'origine : 03-06, 04-05, 06-06 (partie plantages) : important → détail (charge).
  - Preuve : Trois rendus d'affilée : « Target closed » (03) ; page fermée pendant l'export de 644 s à charge 41-50 (04) ; 2 plantages au 3ᵉ export de 70 s (06) ; navigateur fermé deux fois (05) ; OOM de Chromium dans `dmesg` (04).
  - Correction : Libérer les tampons entre deux exports ; sauvegarde du projet avant tout export de plus de 5 min ; rendu par segments (écart des 5 rendus).
  - Charge de la machine : dépend de la charge. Tous les plantages se produisent à charge 41 à 108 sur 2 cœurs et 8 Go partagés par dix navigateurs : gravité baissée d'un cran (important → détail).

- E-84 · détail · Le gel spectral fluctue de 6,8 dB.
  - Experts : 1 (04-11). Gravités d'origine : 04-11 détail.
  - Preuve : Écart-type 1,14 dB, plage 6,8 dB sur 60 s (04, S10).
  - Correction : Recouvrement de 4 et phases qui avancent d'une trame à l'autre.
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

## Écarté, avec raison

- Effets de Musik (insertkoin/musik-fx.js) notés absents ou cassés : zéro écart écarté. Le harnais laissait ce module hors de l'AudioWorklet ; en ligne, il se charge depuis la même origine (ligne 711, `MZ_URL`). Contrôle par grep : zéro mention de musik-fx, d'AudioWorklet ou d'effet `mz_` dans les rapports 01, 09 et 10 ; le mastering Jazz de 09-11 (ligne 909) ne passe par aucun effet `mz_`. Les rapports 02 et 03 chargent le module en Blob et vérifient `ctx._mz` ; les rapports 04, 05, 06 et 07 écrivent qu'aucun de leurs écarts n'en dépend.
- Freesound, Wikimedia Commons et Openverse : refusés par le proxy de la session (HTTP 403 ou code 000). Zéro écart noté sur ces sources.
- 09-11, partie « ramener le gain du master sur la cible −14 LUFS » : écartée au profit de E-21 (borner le relèvement et afficher l'écart). Règle : EBU R128 et l'exigence de Bob Katz placent la vraie crête et la nuance avant la sonie visée ; 03, 04, 06 et 08 mesurent déjà la cible à 0,2 LU près sur des signaux musicaux. La partie vraie crête de 09-11 passe dans E-06.
- 10-07, partie « Écrire rend chaque rangée en un clip par mesure » : écartée. REQUESTS.md (fait) demande l'écriture en clips audio ; 05 mesure 0,000 ms d'écart par coup et classe « une région par coup » à garder ; la fusion de clips existe déjà. La partie affichage reste dans E-61.
- 08-11, partie « facteur ×10 000 » : écartée au profit du facteur ×1 000 de 04-02. Les deux experts demandent 3 600 s de sortie ; ×1 000 atteint 3 600 s dès 3,6 s de source.

- Enregistrement au micro, retiré de l'analyse par Mauk Tenieb le 20 novembre 2026 (« le point 4 : à retirer ») : E-13 (Chaque prise au micro tombe trop tôt, de 114 à 892 ms ; les couches successives se décalent en cascade) ; E-14 (Le décompte décale la prise de −2,62 s au début du projet et ses 4 clics restent muets) ; E-15 (Une seule piste armée et une seule entrée : zéro prise simultanée de deux musiciens) ; E-67 (Saisie après coup (Flashback) limitée à 60 s) ; E-68 (La prise reste en mémoire jusqu'à l'arrêt) ; E-69 (Une nouvelle prise s'ajoute à l'ancienne : zéro rangée de prises) ; E-70 (Zéro niveau d'entrée et zéro forme d'onde pendant la prise).
