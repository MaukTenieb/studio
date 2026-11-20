# Expert 05 : IDM

Étalons : Autechre, Aphex Twin, Squarepusher, Boards of Canada, µ-Ziq ; Warp, Rephlex ; E-mu SP-1200, Akai MPC60 et MPC3000, Ensoniq ASR-10, Akai S950 ; Renoise.
Objet principal : précision temporelle du séquenceur à pas (tiroir Rythme), mesurée sur des exports.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| 1. Design | 5,6 |
| 2. Direction artistique | 6,3 |
| 3. Puissance | 5,7 |
| 4. Ergonomie | 5,2 |
| 5. Simplicité intuitive | 6,6 |
| 6. Exhaustivité | 4,8 |
| 7. Pertinence | 7,1 |
| 8. Originalité | 5,4 |
| 9. Plaisir potentiel | 5,7 |
| Moyenne générale | 5,8 |

Résumé des mesures :
- L'écriture en clips place chaque coup exactement sur la grille : 0,000 ms d'écart, pour 15, 17, 19 et 21 pas, en euclidien et à 93,5, 120 et 137 BPM.
- Le rendu d'export ajoute un retard constant de +2,894 à +2,917 ms, soit 128 échantillons, avec un écart-type de 0,006 ms. La gigue se situe sous un échantillon.
- La lecture en direct, sur une machine chargée, joue les coups en rafales : 76 intervalles nuls sur 87.

## Méthode

1. Serveur local http://localhost:8765/, harnais /home/claude/outil/harnais.py, Chromium headless. Formats : iphone (390 × 664), iphone-paysage (664 × 390), pc1366, pc1920.
2. Sonde de mesure : un son de 220 échantillons à 0,8 (un créneau), ajouté à la bibliothèque de la page par `addSound` et posé sur la rangée 01. Le front montant se repère à la demi-hauteur, par interpolation linéaire, avec une précision inférieure à l'échantillon. Un premier essai avec une impulsion d'un seul échantillon échoue : un départ entre deux échantillons partage l'impulsion, et une partie des coups disparaît sous le seuil. Le créneau corrige ce défaut.
3. Écriture : le bouton Écrire (`seqWrite`, index.html l. 2657-2660). Rendu : `renderOffline(piste)`, la fonction qu'utilise l'export « WAV stems » (l. 1295-1307 et 1322). Contrôle croisé : un export ZIP « WAV stems » téléchargé par l'interface (`page.expect_download`), avec un vrai son de Mask (`ik:mt-mauk-tenieb-arabic-illbient-1`). Le départ de chaque coup se mesure par intercorrélation avec le son source, affinée par une parabole.
4. Lecture en direct : `AudioBufferSourceNode.prototype.start` est enveloppé pour journaliser l'heure demandée et l'heure de l'horloge audio.
5. Machines : un sinus de 15 kHz traverse les effets SP-1200, S950 et MPC60 dans un OfflineAudioContext à 44,1 kHz, puis une FFT de 8 192 points mesure les raies.
6. Limites de cette session :
   - la machine (2 cœurs, 8 Go) sert dix experts en parallèle, avec une charge moyenne de 20 à 57. Les secondes au téléphone (217 s pour ouvrir le tiroir) et la durée des exports (165,8 s pour un ZIP de pistes de 8,4 s ; 159,6 s pour `masteredRender` d'un projet de 11 s) mesurent la charge, pas le studio. Le rapport compte donc les touchers et donne les secondes sur ordinateur seulement, quand la charge baisse ;
   - l'export « WAV mix » maîtrisé n'a pas abouti dans le temps imparti : le navigateur s'est fermé deux fois sous la charge. Les mesures de grille viennent des pistes séparées ;
   - le harnais ne sert pas `musik-fx.js` à l'AudioWorklet (Playwright ne route pas les requêtes de worklet). Les effets de Musik manquent donc dans mes essais par la faute du harnais. Aucune mesure de ce rapport ne s'appuie sur eux, et aucun écart ne les vise.

## Scénarios

### S1. Premier contact : ouvrir Rythme et entendre une boucle
- Attendu : un son en trois touchers au plus.
- Ordinateur (pc1366, souris) : Rythme, lecture, arrêt, soit 3 clics en 5,2 s. Le dé tire un motif à l'ouverture et la boucle sonne tout de suite. La longueur s'ouvre au hasard sur 15, 17, 19 ou 21 pas (l. 2614).
- Téléphone (iphone, doigt) : Beat, lecture, arrêt, soit 3 touchers et 1 écran. Les secondes ne valent rien ici, à cause de la charge.
- Captures : [pc1366](../captures/05-pc1366-rythme-ouvert.webp), [iphone](../captures/05-iphone-rythme.webp).
- L'interface s'ouvre en anglais (`lang` = « en ») : « 4 bars », « 1 bars », « Write », « Swing ».

### S2. Écrire un motif de 17 pas à la main
- Attendu : 5 cellules posées sans erreur, avec des cibles d'au moins 44 px.
- Ordinateur : 17, effacement de 7 cellules, pose de 5 cellules, soit 13 clics (16 depuis l'ouverture) en 8,8 s. Résultat exact : `11111000000000000`. Cellules de 43,1 × 30,4 px (pc1366) et de 72,3 × 40,4 px (pc1920).
- Téléphone debout : cellules de 10,6 × 27 px, avec un pas de 13,6 px. Une touche synthétique posée au centre exact d'une cellule bascule bien la cellule voulue (5 essais sur 5). Un doigt réel recouvre pourtant trois cellules. Lors d'un premier passage, une série de touchers a ouvert la feuille « 01 · row sound » et choisi un autre son de rangée sans le vouloir ([capture](../captures/05-iphone-motif17.webp)). Quatre rangées sur huit restent visibles.
- Téléphone couché : cellules de 24,9 × 27 px, mais aucune rangée visible dans le tiroir. Le bouton Écrire apparaît coupé à moitié ([capture](../captures/05-iphone-paysage-rythme17.webp)).
- Captures : [pc1366](../captures/05-pc1366-motif17.webp), [iphone 17 pas](../captures/05-iphone-17pas-doigt.webp), [pc1920](../captures/05-pc1920-rythme17.webp).

### S3. Précision de la grille à l'export, sur 15, 17, 19 et 21 pas
- Attendu : écart d'attaque inférieur à 1 ms et cycle complet à l'export.
- Mesure : rangée 01 pleine, 4 mesures, 120 BPM, soit 64 coups par longueur.

| Longueur | Coups écrits | Clip − grille | Rendu − clip (min / max / écart-type) |
|---|---|---|---|
| 15 | 64 | 0,000 ms | +2,894 / +2,906 / 0,006 ms |
| 17 | 64 | 0,000 ms | +2,894 / +2,906 / 0,006 ms |
| 19 | 64 | 0,000 ms | +2,894 / +2,906 / 0,006 ms |
| 21 | 64 | 0,000 ms | +2,894 / +2,906 / 0,006 ms |
| 17 à 137 BPM | 64 | 0,000 ms | +2,894 / +2,917 / 0,007 ms |
| 17 à 93,5 BPM | 64 | 0,000 ms | +2,894 / +2,916 / 0,007 ms |
| 17, vrai son de Mask, ZIP téléchargé | 19 | +7,000 ms (décalage voulu) | +2,904 / +2,905 / 0,0005 ms |

- Le retard de rendu reste constant à 128 échantillons, soit un quantum de rendu Web Audio, sur toutes les pistes. Il ne décale donc pas les pistes entre elles, mais il décale le son de 2,9 ms par rapport au clip dessiné et aux coupes vidéo.
- Le cycle se coupe : « 4 mesures » écrit toujours 64 pas (`total=Math.round(SEQ.bars*16)`, l. 2657), quelle que soit la longueur. Avec un seul coup au pas 0, on obtient :
  - 17 pas : coups aux pas 0, 17, 34 et 51, et le dernier cycle s'arrête après 13 pas sur 17 ;
  - 21 pas : coups aux pas 0, 21, 42 et 63, et le dernier cycle compte 1 pas sur 21.
- Mis en boucle, le bloc écrit casse donc le cycle impair.

### S4. Euclidien E(k, n)
- Attendu : répartition maximale et motif exact à l'export.
- Motifs mesurés (`euclid`, l. 2621), tous maximalement réguliers (rotations de Bjorklund, écarts entre coups entre parenthèses) :
  - E(4,15) `100010001000100` (4,4,4,3) ;
  - E(5,17) `10001001000100100` (4,3,4,3,3) ;
  - E(7,19) `1001001001010010010` ;
  - E(9,21) `100101010010101001010` ;
  - E(5,16) `1000100100100100`.
- À l'export : 17, 19, 24, 28 et 20 coups, à 0,000 ms de la grille.
- Gestes : poser k cellules, puis réglages, puis E. Sur ordinateur, E(5,17) demande 18 clics depuis l'ouverture, en 11,5 s. Le nombre k vient des cellules allumées : on ne le choisit pas directement, et on ne peut pas tourner le motif.
- Téléphone debout : le bouton E se trouve à x = 515 px pour un écran de 390 px. Il apparaît seulement après un glissé horizontal sur la rangée (x = 344 après le glissé). Rien n'indique ce défilement.

### S5. Probabilités
- Attendu : taux mesuré proche du réglage, et tirage reproductible.
- Mesure : 17 pas pleins, probabilité de 50 %, 16 mesures, soit 256 tirages par écriture, sur 10 écritures : 133, 130, 127, 124, 130, 133, 143, 133, 125 et 130 coups. Moyenne : 130,8 coups, soit 51,1 %.
- Les 10 écritures donnent 10 motifs différents : `Math.random()` sans graine (l. 2659). Seul Annuler permet de revenir à un tirage.
- La probabilité se règle par rangée. Aucune probabilité par pas, aucune condition de cycle de type A:B.

### S6. Décalages en millisecondes
- Attendu : décalage exact au ms près, y compris négatif.
- Mesures (17 pas, un coup sur deux, 34 coups) :
  - +40 ms donne +40,000 ms, et +7 ms donne +7,000 ms, sur tous les coups ;
  - −13 ms donne −13,000 ms sur 33 coups. Le coup du temps 0 sort à 0,000 ms (`Math.max(0,…)`, l. 2659) : il arrive 13 ms trop tard par rapport aux autres. Même chose à −40 ms.
- Geste : le curseur va de −40 à +40 ms sur 136,6 px (pc1366), soit 1,7 px par ms. La cible de +7 donne +8 à la souris.
- Téléphone debout : le curseur du décalage se trouve à x = 397 px, hors de l'écran de 390 px. Le glissé visé à +7 laisse la valeur à 0.
- Le décalage s'applique à toute la rangée. Aucun décalage par pas.

### S7. Swing sur un cycle impair
- Attendu : chaque pas du cycle garde le même retard d'un tour à l'autre.
- Mesure : swing de 0,5 donne +62,5 ms (la moitié d'une double croche à 120 BPM) sur les pas impairs du compteur général (`i%2`, l. 2659 ; `SEQ.step%2`, l. 2655). Sur 17 pas, un coup unique au pas 3 sort aux temps suivants :
  - 437,5 ms (en retard) ;
  - 2 500 ms (à l'heure) ;
  - 4 687,5 ms (en retard) ;
  - 6 750 ms (à l'heure) ;
  - et ainsi de suite.
- Le même pas alterne donc swing et grille droite d'un cycle à l'autre. Un motif de 17 pas sonne différemment un tour sur deux.

### S8. Polymétrie 15 / 17 / 19 / 21
- Attendu : chaque rangée boucle sur sa propre longueur sans dérive.
- Mesure : 4 rangées de 15, 17, 19 et 21 pas, avec un coup au pas 0, sur 16 mesures (256 pas). On obtient 18, 16, 14 et 13 coups, aux pas 0, 15, 30… / 0, 17, 34… / 0, 19, 38… / 0, 21, 42…, à 0,000 ms de la grille. Le rendu ajoute toujours +2,894 à +2,906 ms.
- Gestes : réglages, puis curseur « Steps » par rangée (3 à 32 pas, l. 2652).

### S9. Lecture en direct
- Attendu : un intervalle constant entre les coups (125 ms ± swing).
- Mesure sur pc1366 : 17 pas pleins, +7 ms, swing de 0,3, 88 coups journalisés, avec un blocage volontaire du fil principal de 400 ms au milieu.
  - Seuls 4 intervalles valent 87,5 ou 162,5 ms (125 ± 37,5 ms, la valeur juste) ;
  - 76 intervalles sur 87 valent 0,0 ms : des paquets de 9 à 27 coups partent au même instant ;
  - la marge d'anticipation varie de 0 à 149,7 ms.
- Cause visible dans le code (l. 2655) : la boucle rattrape tous les pas en retard et les lance à `Math.max(c.currentTime, t)`, donc ensemble. Un premier passage, sans blocage volontaire, donne déjà un paquet de 59 coups simultanés après un arrêt de 5,08 s.
- La mesure vient d'une machine très chargée. Le mécanisme reste le même sur un téléphone lent ou pendant un calcul lourd du studio (spectrogramme, outil de clip).
- Piste 01 coupée (M) : la rangée 01 joue toujours, avec 16 départs en 1,5 s. La lecture en direct passe par `master.input` (l. 2655) et contourne le fader, la coupure et le rack de la piste. L'écriture en clips, elle, passe par la piste.

### S10. Émulations de machines
- Attendu : repliement et filtrage proches de la machine.
- Mesure, avec un sinus de 15 kHz et les raies rapportées à la plus forte :
  - SP-1200 (26,04 kHz, 12 bits) : raie dominante à 11 041 Hz (repliement 26 040 − 15 000), et 15 kHz à −14,8 dB ;
  - S950 (22,05 kHz) : raie dominante à 7 052 Hz, et 15 kHz à −38,4 dB ;
  - MPC60 (40 kHz) : 15 kHz dominant, produits de saturation à −16 dB.
- Code (l. 815-817) : le SP-1200 passe par deux passe-bas de sortie à min(tone ; 0,48 × fréquence d'échantillonnage). Selon Wikipédia, la vraie machine omet volontairement le filtre de reconstruction, ce qui donne un son plus brillant par imagerie (https://en.wikipedia.org/wiki/E-mu_SP-1200). L'émulation ôte donc cette brillance par défaut.
- Outils de clip IDM présents dans le code (menu du clip, puis Atelier, l. 2069-2097) : Granulaire, Shred, Wavesets, Stutter (tranche calée au temps, probabilité), Circuit bend (avec graine), Reverse each beat, Tape stop, Varispeed. Seul Circuit bend a une graine. Ce rapport ne mesure pas ces outils.

## Notes par scénario

Ordre des critères : design, DA, puissance, ergonomie, simplicité, exhaustivité, pertinence, originalité, plaisir.

| Scénario | Des. | DA | Puis. | Ergo. | Simpl. | Exh. | Pert. | Orig. | Plaisir | Preuve principale |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 Ouvrir, écouter | 7 | 7 | 5 | 7 | 8 | 5 | 7 | 6 | 7 | 3 touchers ; dé et longueur impaire tirés à l'ouverture ; libellés anglais |
| S2 Motif à la main | 6 | 7 | 5 | 3 | 6 | 5 | 7 | 5 | 5 | cellules de 10,6 px (debout) ; 0 rangée visible (couché) ; 43 px sur pc1366 |
| S3 Grille 15-21 | 6 | 6 | 8 | 6 | 7 | 5 | 8 | 6 | 6 | 0,000 ms ; +2,9 ms constant ; 64 pas qui coupent le cycle |
| S4 Euclidien | 5 | 6 | 6 | 4 | 5 | 4 | 8 | 6 | 6 | motifs exacts ; k implicite ; sans rotation ; E hors écran au téléphone |
| S5 Probabilités | 5 | 6 | 5 | 6 | 7 | 3 | 7 | 4 | 5 | 51,1 % sur 2 560 tirages ; sans graine ; par rangée seulement |
| S6 Décalages | 5 | 6 | 6 | 4 | 6 | 5 | 8 | 5 | 6 | exact au ms ; négatif écrasé à 0 au début ; curseur hors écran au téléphone |
| S7 Swing impair | 5 | 6 | 4 | 6 | 7 | 4 | 4 | 4 | 4 | le même pas alterne +62,5 ms et 0 ms |
| S8 Polymétrie | 6 | 6 | 8 | 5 | 6 | 7 | 9 | 7 | 7 | 18 / 16 / 14 / 13 coups exacts |
| S9 Direct | 5 | 6 | 4 | 5 | 7 | 4 | 5 | 5 | 4 | 76 intervalles nuls sur 87 ; ignore la coupure de piste |
| S10 Machines | 6 | 7 | 6 | 6 | 7 | 6 | 8 | 6 | 7 | repliement SP-1200 à 11 041 Hz ; filtres de reconstruction ajoutés |
| Moyenne | 5,6 | 6,3 | 5,7 | 5,2 | 6,6 | 4,8 | 7,1 | 5,4 | 5,7 | |

## Comparaison aux outils de référence

| Fonction | Studio (mesuré) | Référence |
|---|---|---|
| Longueur par rangée | 3 à 32 pas, par rangée | Digitakt : longueur par piste en mode « per track » (https://davetron5000.github.io/synth-docs/synths/elektron-digitakt.html) ; BandLab Drum Machine : 1, 2 ou 4 mesures, sans longueur impaire (https://help.bandlab.com/hc/en-us/articles/115002959894-Using-the-Drum-Machine) |
| Micro-décalage | par rangée, ±40 ms, pas de 1 ms | Renoise : colonne de retard par note, de 00 à FF, jusqu'à juste avant la ligne suivante (https://tutorials.renoise.com/wiki/Tracker_Interface) ; Digitakt : micro-timing par pas, jusqu'à un pas en avant ou en arrière (source ci-dessus) |
| Probabilité | par rangée, sans graine | Digitakt : « Play X% of the time » par pas, plus les conditions A:B (source ci-dessus) |
| Euclidien | E(k,n) exact, k implicite, sans rotation | Algorithme de Bjorklund appliqué au rythme par Toussaint (https://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf) ; rotations décrites dans https://en.wikipedia.org/wiki/Euclidean_rhythm |
| Swing | 0 à 0,6 de double croche, sur la parité globale | Roger Linn : 48 parties par noire permettent des swings de 50, 54, 58, 60, 62, 66, 70 et 75 % (https://attackmagazine.com/features/interview/roger-linn-swing-groove-magic-mpc-timing/2) |
| Vélocité, accent | absent | BandLab : trois niveaux par toucher (relevé BANDLAB-RELEVE.md) |
| Motifs A à H, enchaînement | absent | BandLab : motifs A à H (même source) |
| Précision d'export | 0,000 ms sur la grille, +2,9 ms constant, gigue < 0,03 ms | — |
| SP-1200 | 26,04 kHz, 12 bits, repliement présent, sortie filtrée | machine d'origine sans filtre de reconstruction (Wikipédia, ci-dessus) |

Le Studio dépasse BandLab sur les longueurs impaires, la polymétrie, l'euclidien et le décalage en ms. Il reste en dessous de Renoise et d'Elektron pour le réglage par pas (retard, probabilité, conditions).

## Écarts

- 05-01 (important) : la lecture en direct joue en rafales dès que le fil principal prend du retard.
  - Preuve : S9, 76 intervalles nuls sur 87 et un paquet de 59 coups simultanés (l. 2655).
  - Correction : dans `seqTick`, si `SEQ.next < c.currentTime`, sauter les pas manqués (`SEQ.step += Math.ceil((c.currentTime - SEQ.next)/dur)`, puis `SEQ.next` recalé) au lieu de les lancer à `currentTime`. Passer l'anticipation à 0,2 s quand l'onglet tourne lentement.
- 05-02 (important) : le séquenceur est inutilisable au téléphone.
  - Preuve :
    - debout, des cellules de 10,6 × 27 px (cible minimale : 44 px), avec un toucher qui a ouvert la feuille de son par erreur ;
    - le curseur du décalage et le bouton E hors écran (x = 397 et 515 pour 390 px), défilement horizontal caché ;
    - couché, 0 rangée visible et le bouton Écrire coupé.
  - Correction :
    - debout, afficher 8 pas à la fois en pages (1-8, 9-16, 17-21) avec des cellules d'au moins 44 px, ou passer la rangée en double hauteur ;
    - empiler les trois curseurs et E sous la rangée en mode réglages ;
    - couché, donner au tiroir Rythme au moins 60 % de la hauteur et réduire la bibliothèque.
- 05-03 (important) : le swing dépend de la parité du compteur général, pas du pas de la rangée.
  - Preuve : S7, le pas 3 d'un cycle de 17 alterne +62,5 ms et 0 ms.
  - Correction : calculer le swing sur la position dans la rangée (`kr%2`, avec `kr = step % rlen(r)`) dans `seqTick` et `seqWrite`, ou proposer ce choix par une touche.
- 05-04 (important) : « mesures écrites » compte des blocs de 16 pas.
  - Preuve : S3, 4 mesures à 17 pas donnent 64 pas, et le dernier cycle s'arrête à 13/17.
  - Correction : écrire `SEQ.bars × SEQ.n` pas (68 pour 4 × 17), ou un nombre entier de cycles du PPCM des rangées (plafonné), avec un pictogramme de cycle à la place du mot « bars ».
- 05-05 (important) : aucun réglage par pas.
  - Preuve : S5 et S6. La probabilité et le décalage existent par rangée seulement (l. 2652). Il n'y a ni vélocité, ni répétition (ratchet), ni condition A:B.
  - Correction : un appui long sur une cellule ouvre un carré à trois réglages (décalage de −50 à +50 % du pas, probabilité, niveau), avec des pastilles visibles sur la cellule. Stocker ces réglages dans des tableaux `r.ms[]`, `r.p[]` et `r.g[]` de 32 cases.
- 05-06 (détail) : un décalage négatif s'annule sur le premier coup.
  - Preuve : S6, −13 ms appliqué à 33 coups sur 34, et 0 au temps 0.
  - Correction : quand `from + r.ms < 0`, décaler tout le bloc écrit de `-r.ms`, ou commencer l'écriture une mesure plus loin.
- 05-07 (détail) : le tirage n'a pas de graine.
  - Preuve : S5, 10 écritures donnent 10 motifs différents.
  - Correction : une graine affichée sous forme de dé numéroté. La même graine redonne le même motif, comme Circuit bend le fait déjà (l. 2096).
- 05-08 (détail) : l'euclidien n'a ni k explicite ni rotation.
  - Preuve : S4.
  - Correction : en mode réglages, deux curseurs (k de 0 à n, rotation de 0 à n − 1), ou un appui long sur E puis un glissé horizontal pour tourner.
- 05-09 (détail) : la lecture en direct contourne la piste.
  - Preuve : S9, la piste 01 coupée sonne encore (16 départs en 1,5 s, `x.connect(master.input)`, l. 2655).
  - Correction : connecter chaque coup à l'entrée de la chaîne de sa piste (`chains.get(state.tracks[r.tr].id).input`) pour entendre le fader, la coupure et le rack, comme à l'export.
- 05-10 (détail) : le rendu ajoute un retard constant de 2,9 ms (128 échantillons) entre le clip dessiné et le son exporté.
  - Preuve : S3, +2,894 à +2,917 ms sur toutes les pistes, y compris avec un vrai son.
  - Correction : trouver le nœud qui crée ce quantum (boucle de retard ou worklet de la chaîne de piste), puis compenser à l'export en rognant 128 échantillons en tête du rendu.
- 05-11 (détail) : le SP-1200 ajoute un filtrage de sortie que la machine n'avait pas.
  - Preuve : S10 et l. 817.
  - Correction : pour le SP-1200, régler par défaut `tone` sur la valeur haute (18 000 Hz) et retirer `post2`, pour laisser passer l'imagerie.
- 05-12 (détail) : le séquenceur s'ouvre en anglais, avec « 1 bars ».
  - Preuve : S1, `lang` = « en », menu « 1 bars ».
  - Correction : remplacer le menu par un pictogramme de cycle suivi du chiffre, sans mot.
- 05-13 (détail) : la feuille de son de rangée propose « Kick », « Snare », « Hat ».
  - Preuve : [capture](../captures/05-iphone-motif17.webp), règle de PENSE-BETE.md.
  - Correction : nommer ces sons par ce qu'ils sont (« coup grave court », « bruit filtré bref ») ou par leur pictogramme.

## À garder tel quel

- Le placement des clips au ms exact sur la grille, pour toutes les longueurs et tous les tempos mesurés (0,000 ms).
- La gigue de rendu inférieure à un échantillon (écart-type de 0,006 ms).
- La longueur propre à chaque rangée (polymétrie exacte sur 256 pas).
- Le tirage d'une longueur impaire (15, 17, 19, 21) à l'ouverture.
- L'algorithme euclidien (motifs maximalement réguliers).
- Le décalage en ms de résolution 1.
- L'écriture en clips audio, une région par coup, coupée au coup suivant.
- Les cinq couleurs d'échantillonneur avec un repliement réel.
- Les boîtes Σ (Aphex Twin) et Τ (Autechre), qui règlent longueurs, euclidien et probabilité d'un toucher (l. 2916-2917).
