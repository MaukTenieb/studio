# Rapport du juge « son » — justesse sonore du studio

Méthode : rendus hors ligne dans Chromium sans tête (Playwright), via `renderOffline(track)`, `masteredRender()`, `FX[k].make` et `AT[k].run` appelés tels quels dans la page ; signaux connus (bruit rose, sinus 100 Hz et 1 kHz, impulsion, salve, batterie synthétique, gamme juste) ; mesures de crête, RMS, NaN, discontinuités (dérivée seconde), fonction de transfert par spectres moyennés, enveloppes à la seconde, sonie BS.1770-4 recalculée en Python (coefficients ITU exacts) sur les WAV exportés, crête vraie suréchantillonnée ×4. Scripts et mesures : /home/claude/judges/son/ (t4 à t21, fx_default.txt, boxes.txt, stress.txt, m_*.wav). L'effet de Musik (`musik-fx.js`) est chargé depuis la copie locale par une URL blob, car le bac à sable bloque le module de travail inter-origine (en ligne, même origine, la question disparaît).

## Bloquant

1. Résonateur (`FX.comb`) : divergence numérique au réglage d'origine.
   - Où : `FX.comb.make`, boucle `d → lp → fb → d`.
   - Mesure : impulsion de 0,5 dans l'effet seul, réglage d'origine (fb 0,9) : niveau +78 dB à 1 s, +155 dB à 2 s, +695 dB à 9 s, puis NaN (391 852 échantillons NaN). fb 0,85 : +36 dB/s, divergence. fb 0,80 : stable. Seuil de stabilité entre 0,80 et 0,85, sur une plage qui monte à 0,995.
   - Conséquence sur l'export : mix de 20 s (piste 1 sinus + Résonateur d'origine, piste 2 batterie) passé par le master : 4 408 échantillons NaN dans le fichier, et `trimTail` traite les NaN comme du silence, d'où un morceau coupé à 11,06 s au lieu de 20 s. En lecture, hurlement saturé à pleine échelle (piste seule : +17 dB RMS, crête +4 dBFS).
   - Cause : le passe-bas de boucle garde Q = 1, valeur que Web Audio lit en dB pour un passe-bas, soit une bosse de +1 dB près de la coupure ; le gain de boucle dépasse 1.
   - Correction : `lp.Q.value=-3.01` (Butterworth), plafond `fb` à 0,95 et un `tanh` de sécurité dans la boucle.

2. Bus dub (`dubBus`) : auto-oscillation sans fin dès le premier envoi.
   - Où : `dubBus`, boucle `dl → lp → hp → sat → dfb → dl`.
   - Mesure : salve de 0,25 s à 440 Hz dans `dubBus(oc, oc.destination)` : RMS +2 dB à 1 s, +9,2 dBFS dès 4 s et jusqu'à la fin (20 s), crête +14,6 dBFS avant le master. Avec `state.dubFb = 0` (ressort coupé), la boucle monte quand même jusqu'à +1 dBFS RMS en 20 s. Pour l'oreille, en lecture : un appui sur le port dub fait hurler le master à pleine échelle, sans fin.
   - Cause : `driveCurve(.35)` a un gain petit signal de 29 ; multiplié par `dfb = 0,45`, le gain de boucle vaut environ 13.
   - Correction : saturation de pente unitaire (`tanh(x)` normalisé sur la pente) et gain de boucle borné à 0,9 ; Q des filtres de boucle à −3,01.

## Important

3. Sonie : le sonomètre interne (`lufsOf`) surestime le grave, donc l'export reste sous la cible.
   - Mesure, sinus stéréo à −6 dBFS, `lufsOf` contre la référence BS.1770-4 : 1 kHz −6,25 / −6,27 ; 100 Hz −6,06 / −7,89 ; 60 Hz −5,26 / −9,66 ; 45 Hz −5,28 / −11,41. Erreur de +1,8 dB à 100 Hz et de +6,1 dB à 45 Hz.
   - Export (`masteredRender`, mix batterie, bruit, sinus 100 Hz et Pad de 18 s), sonie affichée / sonie BS.1770 du WAV : Universal −14 → −14,00 / −15,66 ; Neutral −14 → −13,91 / −16,09 ; Loud −9 → −8,68 / −10,55 ; Classical −23 → −23,00 / −25,17 ; Noise −14 → −14,00 / −15,64. Écart constant de −1,6 à −2,2 LU ; plus fort sur les musiques graves (dark ambient, dub, hip-hop).
   - Cause : le passe-haut du filtre K a `Q = .5`, que Web Audio lit en dB (résonance), alors que la norme demande un Q linéaire de 0,5.
   - Correction : filtre K par `IIRFilterNode` avec les coefficients de la norme, ou `Q = 20·log10(0,5) = −6,02`.

4. Filtres de séparation `lr4` : ils n'ont pas le comportement Linkwitz-Riley, et le multibande du master colore et remonte les passages calmes.
   - Où : `lr4()` (Q 0,7071 lu en dB), utilisé par le multibande de `buildMaster` et de `mchain`, par `FX.pump` et par `bands()` (séparation en trois bandes).
   - Mesures (bruit blanc à −50 dBFS) :
     - somme passe-bas + passe-haut `lr4` à 200 Hz : +5,9 dB à 150 Hz, +7,4 dB à 200 Hz et +4,8 dB à 300 Hz (le résultat attendu est 0 dB partout) ;
     - Pompage à profondeur 0 : +8,2 dB à 150 Hz ;
     - somme des trois bandes séparées comparée à l'original : +6 dB entre 150 et 400 Hz, +5,8 dB entre 2,5 et 6 kHz ;
     - chaîne master Neutral avec `mb = 0,35` : de +11 dB (1 kHz) à +16,5 dB (200 Hz) et +17,3 dB (3 kHz) ;
     - Universal : +15,8 dB à 1 kHz, +22,8 dB à 200 Hz, +23,8 dB à 3 kHz. Les 7 à 8 dB de bosse aux fréquences de séparation, relevés sur les passages calmes, viennent de `lr4`. Le relèvement général de 10 à 16 dB vient du gain de rattrapage automatique des `DynamicsCompressor` de Chrome (prévu par la spécification Web Audio).
     - Neutral sans multibande garde déjà +1,4 dB à bas niveau, à cause du rattrapage automatique du limiteur.
   - Portée : tous les réglages de mastering sauf Neutral et Classical.
   - Correction : `Q = -3.01` dans `lr4` ; soustraire le gain de rattrapage connu de chaque compresseur (ou utiliser un compresseur par module de travail).

5. Export : la queue des effets se coupe net 3 s après le dernier clip.
   - Où : `renderOffline`, `len = (projEnd() + 3) · SR`.
   - Mesure, niveau des 100 dernières ms par rapport à une salve de bruit de 0,5 s : Cathédrale d'origine −18,9 dB ; Cathédrale hold 4 −2,8 dB ; Grotte hold 4 +6,9 dB (la queue reste plus forte que la salve) ; Écho fb 0,8 −20 dB ; Réverbération size 8 −22,9 dB. Le larsen `mz_fdbk` (amt 0,75 et plus, boîtes Α, Γ, Ε, Η) se tient à −11,7 dBFS sans fin et se coupe de la même façon.
   - Correction : prolonger le rendu jusqu'à ce que le niveau passe sous −90 dBFS (plafond 60 s), puis appliquer un fondu de 50 ms.

6. Dérive (`driftStep`) : clics, sauts de niveau, calcul lourd sur le fil principal, mémoire qui grossit.
   - Méthode : `driftStep()` réel, appelé toutes les 60 ms de temps audio dans un rendu hors ligne de 8 s, sinus 220 Hz.
   - Écho : la durée dérive en continu de 0,44 à 1,22 temps, par sauts instantanés (`.value=`) : 508 discontinuités, contre 0 sans dérive ; crête −10,9 → −4,2 dBFS.
   - Réverbération : réponse impulsionnelle régénérée 133 fois en 8 s (une fois par pas), 2,3 s de calcul sur le fil principal.
   - Cathédrale : 54 régénérations, 7,5 s de fil principal pour 8 s d'audio, d'où une interface figée ; « hold » parcourt 1 à 2,8.
   - Pièce : l'indice de salle passe de 2,9 à 10,8 (le type de pièce change), 133 régénérations, 33 clics.
   - Niveaux : la dérive du gain du Compresseur porte la crête de −5,7 à +1,2 dBFS ; l'Égaliseur, de −12,6 à −5,9 dBFS.
   - Mémoire : `SPACE_IR` garde chaque valeur de « hold » (jusqu'à 21 Mo par entrée stéréo de 60 s), sans jamais libérer.
   - Correction : exclure de la dérive les réglages qui reconstruisent une réponse (size, room, hold, damp) et la durée d'écho (ou la quantifier au temps) ; passer par `setTargetAtTime` ; borner la dérive des gains à ±1,5 dB.

7. Grands espaces (Grotte, Silo, Cathédrale) : calcul hors de portée du temps réel quand ils se posent sur chaque piste.
   - Mesure (rendu hors ligne, cette machine) :
     - boîte Tim Hecker sur 6 pistes : 33,7 s de calcul pour 9 s d'audio (3,7 fois plus lent que le temps réel) ;
     - Lustmord, 4 pistes : 30,6 s pour 9 s ; Lisa Gerrard : 26,5 s ; Roly Porter : 22,5 s ; Hildur Guðnadóttir : 16,1 s ;
     - Cathédrale hold 4 seule : 4,9 s pour 4 s.
     - Pendant la série des 26 boîtes (5 rendus par boîte), le moteur de rendu de la page a planté deux fois (sur Tim Hecker et sur John Williams). Isolées, ces deux boîtes passent trois fois de suite.
   - Hypothèse : en lecture, décrochages audio certains sur une machine courante, et plantage par épuisement de la mémoire audio après des rendus répétés.
   - Correction : un seul bus d'envoi par espace, partagé comme le bus de scène, au lieu d'un convolueur par piste ; « hold » plafonné en lecture.

8. Sauts de niveau dangereux au casque, faute de compensation de gain.
   - Valeurs d'origine, différence de RMS : Grotte +11,4 dB (bruit rose) ; Distorsion +8,5 à +10,7 dB ; Radio AM +10,6 dB (sinus) ; Repli d'onde +10 à +12 dB ; `mz_metal` +9,1 dB ; Compresseur +6 dB ; Wah −10,9 à −23 dB.
   - Mix au maximum : Grotte et Cathédrale montent jusqu'à +14,7 dBFS de crête et +18 dB de RMS (`wet = mix·1,2` contre `dry = 1 − mix·0,7`).
   - Outils de clip : `grain`, `ringx` et `convx` normalisent toujours à −0,9 dBFS. Un enregistrement de terrain à −26 dBFS de crête ressort à −0,9 dBFS, soit +25 dB de crête et +11,3 dB de RMS.
   - Correction : compensation automatique du RMS d'entrée sur les effets saturants ; normaliser `grain`, `ringx` et `convx` sur la crête d'entrée, comme le fait déjà `spectralRender`.

9. Scène, effet Doppler (`airDelay` avec `setTargetAtTime(…, .035)`) : vitesse de variation sans limite.
   - Mesure (sinus 1 kHz) :
     - geste brusque de l'avant au fond (40,8 ms) : 1 kHz descend à 83 Hz (−4 309 cents, presque une lecture à l'envers) ;
     - retour brusque : +1 322 cents et 489 discontinuités ;
     - glissé de 300 ms : −318 cents, valeur physiquement plausible ;
     - glissé d'une seconde : −90 cents.
   - Correction : limiter la pente de `delayTime` (|dτ/dt| ≤ 0,1, soit environ ±170 cents) par un limiteur de vitesse.

10. Paulstretch et moteur spectral (`spectralRender`) : battement d'amplitude périodique.
   - Mesure : bruit rose stationnaire étiré ×8, puissance repliée sur la période du pas (8 192 échantillons) : ondulation de 3,04 dB à 5,4 Hz.
   - Cause : fenêtre de Hann à l'analyse et à la synthèse avec 50 % de recouvrement (somme sin⁴ + cos⁴, qui varie de 0,5 à 1).
   - Portée : `paul`, `freeze`, `blur`, `morph`, `cross`.
   - Correction : fenêtre de synthèse en racine de Hann, ou division par la somme des fenêtres au carré comme le fait déjà `istft`.

## Mineur

11. Sous-grave (`FX.sub`) : la séparation passe-bas + passe-haut du second ordre se somme mal. À amt 0, creux de −3 à −3,9 dB entre 30 et 120 Hz ; au réglage d'origine, +4 dB à 60 Hz et −2,9 dB à 100 Hz. Mesure : fonction de transfert sur bruit blanc. Correction : passe-haut complémentaire (x − passe-bas) ou `lr4` corrigé.

12. L'export diffère de la lecture. La Porte de bruit reste inerte hors ligne (son contrôle tourne par `setTimeout`, seulement dans le contexte en direct) : à l'entrée −63 dB RMS, avec un seuil à −45 dB, la sortie mesure −63,1 dB. Les envois dub et les deux emplacements « perf » manquent aussi dans l'export (lecture du code). Correction : porte en module de travail, ou automatisation enregistrée.

13. Wavesets sur une source stéréo : les passages par zéro se calculent sur le canal gauche seul ; le canal droit reçoit 2 496 discontinuités (sinus 220 Hz à gauche et 331 Hz à droite). Correction : passages par zéro calculés pour chaque canal.

14. « Chaleur » de piste (`tanh` après le fader, toujours active). Un échantillon normalisé à −0,9 dBFS sur le fader d'origine (0,8) donne 3,8 % de distorsion harmonique et une crête tassée de 1,4 dB ; fader à 1 : 5,6 %. À −20 dBFS : 0,05 %. Ce choix de son est voulu ; il reste audible sur les sons normalisés (Freesound, sorties d'outils), et aucune touche ne le contourne.

15. Suivi de hauteur YIN (`yinTrack`).
   - Sous 55 Hz, la mesure se bloque à `tmax` : 50 Hz se lit 55,06 Hz (+167 cents, mauvaise classe de hauteur).
   - Au-dessus de 990 Hz, la mesure tombe une octave trop bas (sans effet sur l'échelle, qui replie à l'octave).
   - De 55 à 880 Hz, purs ou riches en harmoniques, avec du bruit : erreur de 0 à 2 cents.
   - Correction : rejeter le cas `best === tmax` et descendre `tmax` à 40 Hz.

16. HPSS : reconstruction exacte (H + P − original = −152 dB), mais 10,7 s de calcul sur le fil principal pour 6 s stéréo, avec l'interface figée pendant ce temps. Correction : passer le calcul dans un worker.

17. Export WAV : 16 bits tronqués sans tramage ; crête vraie jusqu'à 0,23 dB au-dessus du plafond (Loud : plafond −0,8 dBFS, crête vraie mesurée −0,57 dBTP). Un export maîtrisé de 18 s prend de 3 à 28 s (jusqu'à cinq rendus complets). Correction : tramage TPDF et limiteur à crête vraie (suréchantillonnage ×4 avant `capPeak`).

## Vérifié sain

- Égaliseur, Écraseur, Chorus, Flanger, Phaser, Trémolo, Glitch, Pièce, Vibrato, Décaleur : sans NaN, aux réglages d'origine comme aux extrêmes.
- SP-1200, MPC60, ASR-10, S950 : niveau à ±0,6 dB, sans NaN, aigus en couleur d'époque.
- `mz_gross`, `mz_grain`, `mz_revs`, `mz_oct`, `mz_tape` : sans NaN.
- Gomme spectrale (`eraseSheet`, testée à la souris dans la page) : la zone effacée tombe à −160 dB, le 1 kHz voisin reste intact, et « réparer » remplit correctement.
- Échelle en cents (`scaleSheet`) : la gamme juste 0, 204, 386, 498, 702, 884, 1 088 se retrouve au cent près.
- Boîtes d'artistes : les 26 boîtes rendent un son sain par le master (crête −1,9 dBFS, aucun NaN, aucun silence). Pharmakon et Lustmord frôlent −0,3 dBFS avant le master. Autechre règle le Résonateur à fb 0,82, entre le dernier réglage mesuré stable (0,80) et le premier divergent (0,85).

## Hypothèses (à confirmer)

- Décrochages en lecture avec les grands espaces sur plusieurs pistes : déduits du facteur temps réel hors ligne (point 7). Mesure directe en lecture : à faire.
- Plantages du moteur de rendu après de nombreux rendus successifs avec de longues réponses : vus deux fois, sans reproduction isolée.
- Une erreur de page « Cannot access 'TT_FR' before initialization » est apparue une fois au chargement, pendant un de mes scripts ; sa cause reste à établir.

## Note : 4/10

Deux défauts mettent l'oreille et l'export en danger aux réglages d'origine : le Résonateur produit des NaN qui tronquent l'export, et le bus dub hurle sans fin dès le premier envoi.
Une seule erreur de lecture de l'unité de Q de Web Audio, présente à trois endroits (filtre K, `lr4`, boucles de filtres), fausse la sonie de 2 dB, colore tous les masters de 7 à 8 dB aux fréquences de séparation et fait diverger les boucles.
Les outils spectraux, la gomme, l'échelle, le YIN entre 55 et 880 Hz, les échantillonneurs et la plupart du rack sont justes ; les corrections tiennent en peu de lignes.
