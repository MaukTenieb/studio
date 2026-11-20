# Expert 04 — Dark ambient

Étalons du rôle : Lustmord (Brian Williams), Thomas Köner, Raison d'être, Atrium Carceri ; labels Cold Meat Industry, Cyclic Law, Cryo Chamber. Usages jugés : bourdon de dix minutes et plus, étirements extrêmes, convolution (cave, silo, cathédrale), couches lentes, dérive, enregistrements de terrain, tenue des longs rendus.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| 1. Design | 6,3 |
| 2. Direction artistique | 6,5 |
| 3. Puissance | 6,0 |
| 4. Ergonomie | 5,4 |
| 5. Simplicité intuitive | 6,4 |
| 6. Exhaustivité | 5,1 |
| 7. Pertinence | 7,1 |
| 8. Originalité | 6,3 |
| 9. Plaisir potentiel | 6,1 |
| Moyenne générale | 6,1 |

Trois écarts les plus graves : 04-01 (la page gèle de 66 à 437 s pendant un Paulstretch, sans avancement ni annulation), 04-02 (étirement plafonné à ×64 et 600 s, gel et granulaire à 120 s), 04-05 (export long lent et fragile : 857 s de calcul pour 644 s d'audio, 2 162 s et 5 rendus complets avec la cible −14 LUFS par défaut, un plantage de page sous charge).

## Conditions de mesure

- Copie locale servie sur http://localhost:8765/, harnais Playwright /home/claude/outil/harnais.py, Chromium sans écran, interface passée en français (bouton EN/FR puis rechargement).
- Machine : 2 cœurs, 8 Go partagés avec les neuf autres experts. Charge mesurée par `uptime` : 41 à 50 pendant la première heure, 10 à 12 ensuite. Chaque durée de calcul ci-dessous indique la charge du moment. Les durées absolues valent pour cette machine chargée ; les rapports entre durées restent comparables.
- Un plantage OOM de Chromium est inscrit dans `dmesg` à 2 763 s de fonctionnement de la machine (processus d'un autre expert ou du mien, non attribuable).
- Les effets de Musik (`musik-fx.js`, AudioWorklet) ne se chargent pas dans le harnais (avis de l'orchestrateur). Aucun de mes scénarios ne passe par un effet `mz_*` : la boîte Ν emploie Sous-grave, Grotte, Égaliseur et Compresseur. Aucun écart n'en découle.
- Fichiers audio : /tmp/expert04/ (hors dépôt). Mesures : `mesure.py` (crête, vraie crête, LUFS EBU R128), plus deux scripts maison : intégration de Schroeder pour les queues (T20, T30), sonie à court terme (3 s) toutes les 30 s, recherche de silences internes (≥ 10 ms sous 1e-5) et de sauts d'échantillon (|Δ| > 0,05).

## Scénarios

Chaque scénario a un résultat attendu mesurable. « Touchers » compte les gestes au doigt (iPhone 13 portrait et paysage), « clics » les gestes à la souris (1 366 × 768 et 1 920 × 1 080). La saisie d'un mot au clavier compte pour un geste.

### S1 — Premier bourdon (débutant)

Attendu : un bourdon posé sur la piste 01 en moins de 5 gestes, sans ouvrir de menu.

- Souris (pc1366) : clic dans le champ de recherche, saisie « bourdon » + Entrée, glisser « Bourdon de Lorenz » sur la piste 01. 3 gestes, 1 écran. Clip posé à 0,25 s, 8,0 s. Capture [../captures/04-s1-bourdon-pose-pc1366.webp](../captures/04-s1-bourdon-pose-pc1366.webp).
- Doigt (iPhone portrait et paysage) : toucher le champ, saisie + Entrée, appui long de 500 ms sur le son (le son se « prend »), toucher la piste. 4 touchers, 1 écran, clip posé à 0,13 s. Captures [../captures/04-s1-son-pris-iphone.webp](../captures/04-s1-son-pris-iphone.webp), [../captures/04-s1-bourdon-pose-iphone.webp](../captures/04-s1-bourdon-pose-iphone.webp), [../captures/04-s1-bourdon-pose-iphone-paysage.webp](../captures/04-s1-bourdon-pose-iphone-paysage.webp).
- Le kit offre 4 bourdons synthétisés : Bourdon 6,0 s, Bourdon de Lorenz 8,0 s, Bourdonnement de Chua 3,0 s, Bourdon FM 8,0 s.
- En français, « drone » ne trouve aucun son du kit (seules les Collections et Internet Archive répondent) ; « bourdon » trouve les 4. Capture [../captures/04-recherche-nappe-pc1366.webp](../captures/04-recherche-nappe-pc1366.webp).
- Freesound répond ✕ (clé absente) ; Wikimedia Commons et Openverse répondent ✕ (le proxy de la session refuse ces hôtes, limite de l'essai et non de l'application).

### S2 — Boîte Ν « tribute to Lustmord »

Attendu : le studio prend une chaîne dark ambient en 3 gestes au plus.

- Souris : « Boîtes d'artistes », « Dark ambient », étiquette Ν. 3 clics. Doigt (portrait et paysage) : 3 touchers. Captures [../captures/04-s2-boite-lustmord-pc1366.webp](../captures/04-s2-boite-lustmord-pc1366.webp), [../captures/04-s2-boite-lustmord-iphone.webp](../captures/04-s2-boite-lustmord-iphone.webp), [../captures/04-s2-boites-iphone-paysage.webp](../captures/04-s2-boites-iphone-paysage.webp).
- Effet mesuré dans l'état du projet : pistes pleines → Sous-grave (amt 1,1, 90 Hz, graves mono) et Égaliseur (+3 / −3 à 900 Hz / −6 dB) ; master → Grotte (mix 0,55, tenue 2, dérive 0,5) puis Compresseur (−26 dB, 2:1) ; mode en secondes activé. La boîte propose 5 recherches (infrasound, cave, rumble, choir drone, earthquake) et 3 gestes d'Atelier (Paulstretch, Gel spectral, Flou spectral). Code : ligne 2911.
- La catégorie Dark ambient compte 3 boîtes : Lustmord, Tim Hecker, Roly Porter (lignes 2911-2913). Thomas Köner, Raison d'être, Atrium Carceri : absents.

### S3 — Étirement extrême (Paulstretch ×64)

Attendu : 8 s → 512 s en un passage, la page reste utilisable pendant le calcul.

- Souris : clic droit sur le clip, « Atelier ▸ », « Paulstretch », réglette × poussée au bout (touche Fin), OK. 5 gestes, 3 niveaux (menu, sous-menu, dialogue). Doigt : appui long 700 ms, « Atelier ▸ », « Paulstretch », glisser la réglette, OK. 5 touchers. Captures [../captures/04-s3-menu-clip-pc1366.webp](../captures/04-s3-menu-clip-pc1366.webp), [../captures/04-s3-paulstretch-dialogue-iphone.webp](../captures/04-s3-paulstretch-dialogue-iphone.webp), [../captures/04-s3-paulstretch-dialogue-iphone-paysage.webp](../captures/04-s3-paulstretch-dialogue-iphone-paysage.webp).
- Résultat : clip de 512,0 s (8 s × 64). Capture [../captures/04-s3-paulstretch-fait-pc1366.webp](../captures/04-s3-paulstretch-fait-pc1366.webp).
- Durée de calcul mesurée, avec la page bloquée pendant tout le calcul : 313,6 s (Bourdon de Lorenz, charge ~45), 276,4 s (Bourdon FM, charge ~45), 436,6 s (charge 46), 66,5 s (charge 11). Pendant ce temps, Playwright n'obtient plus de réponse au clic (délai de 30 s dépassé) : le fil principal reste occupé. Aucune barre d'avancement, aucune annulation.
- Le dialogue n'affiche pas la durée produite (512 s) ; les libellés « Window s » et « Length s » restent en anglais (`AT_PN`, ligne 2103).
- Plafonds du code : ×64 et 600 s de sortie (ligne 2051). Un son de 8 s ne dépasse pas 512 s ; une minute de terrain ×64 tombe sur 600 s.

### S4 — Rendu long de dix minutes et plus

Attendu : un WAV de durée exacte (fin du projet + queue), sans coupure, sans saut, sonie stable à ±1 LU dans le corps.

- Projet : piste 01 = Paulstretch 512 s (fondus 20 s / 30 s), piste 02 = même son à 120 s (fondus 30 s / 60 s), boîte Ν. Fin du projet 632 s, queue calculée 12 s (`tailSec`, ligne 1289).
- Voir le projet entier : impossible. Le zoom arrière s'arrête à 8 px/s (ligne 2405) : 14 clics de « zoom − » et 632 s × 8 = 5 056 px pour une zone de pistes d'environ 780 px, soit 1 min 35 s visible. Capture [../captures/04-s4-projet-long-pc1366.webp](../captures/04-s4-projet-long-pc1366.webp).
- Export : bouton Export, « WAV mix ». 2 clics. Capture [../captures/04-s4-export-pc1366.webp](../captures/04-s4-export-pc1366.webp).
- Premier essai (charge 41 à 50) : la page se ferme pendant l'export, sans fichier et sans message. Second essai (charge 10 à 12), cible LUFS sur « off » : 857 s de calcul, 1 rendu complet.
- Mesures du fichier `long-cible-off.wav` :
  - durée 644,00 s (10 min 44 s) = 632 + 12, à l'échantillon près ;
  - crête −1,93 dBFS, vraie crête −1,93 dBTP, −11,5 LUFS intégrés (l'application affiche « −11,5 LUFS, crête −1,9 dB ») ;
  - sonie à court terme toutes les 30 s, de 0:30 à 9:30 : de −12,3 à −10,8 LUFS, écart 1,5 LU sur 17 points ;
  - silences internes de 10 ms ou plus : 0 (le plus long : 1,2 ms) ; sauts d'échantillon : 0 ;
  - 100 dernières ms : −78,3 dBFS RMS (la queue s'éteint, sans coupure franche).
- Export avec la cible par défaut (−14 LUFS) : 2 162 s de calcul, 5 rendus complets, −14,0 LUFS atteints (section « Mesure complémentaire » en fin de rapport). `masteredRender` (ligne 1313) refait le rendu complet jusqu'à 4 fois pour approcher la cible.

### S5 — Queues de convolution : grotte, silo, cathédrale

Attendu : temps de réverbération égal à la durée annoncée (6, 9, 10 s × tenue), queue jamais coupée au-dessus du bruit de fond 16 bits.

Rafale de bruit de 50 ms, effet seul sur la piste 01 (mix 1, dérive 0), master neutre, limiteur coupé, rendu par `renderOffline` puis `wavBlob` (le même chemin que l'export).

| Espace | Tenue | Durée annoncée (`tailSec`) | Fichier rendu | T30 mesuré | Fin du fichier | Calcul (charge) |
|---|---|---|---|---|---|---|
| Grotte | 1 | 6 s | 5,83 s | 6,3 s | −88,4 dBFS | ~180 s (45) |
| Grotte | 4 | 24 s | 19,19 s | 23,4 s | −57,5 dB sous le maximum | ~360 s (45) |
| Grotte | 8 | 48 s | 36,11 s | 46,7 s | −89,5 dBFS | 131,6 s (11) |
| Silo | 1 | 9 s | 8,41 s | 8,8 s | −57,0 dB sous le maximum | 7,8 s (11) |
| Silo | 2 | 18 s | 15,82 s | 17,5 s | −56,0 dB sous le maximum | 28,2 s (11) |
| Cathédrale | 1 | 10 s | 9,28 s | 9,9 s | −56,3 dB sous le maximum | 7,9 s (11) |
| Cathédrale | 2 | 20 s | 17,49 s | 19,4 s | −55,9 dB sous le maximum | 30,3 s (11) |
| Cathédrale | 6 | 60 s | 49,25 s | 57,3 s | −101,2 dBFS | 178,6 s (11) |

- Les T30 tombent à 5 % près des durées annoncées : la tenue fait ce qu'elle dit, jusqu'à une minute.
- `trimTail` (ligne 1310) coupe le fichier quand l'échantillon passe sous 1e-4 (−80 dBFS) : la fin mesurée tombe entre −88 et −101 dBFS en absolu. La queue s'éteint sous le seuil du 16 bits avant la coupe.
- Calcul : 178,6 s pour 49 s d'audio avec une cathédrale de 60 s (charge 11). Une grotte en tenue 8 n'a pas fini en 14 min sous charge 45.
- Les réponses impulsionnelles sont du bruit filtré avec quelques réflexions posées à la main (lignes 829-836) ; le studio n'offre aucune réponse impulsionnelle enregistrée dans un vrai lieu, et aucun effet de piste qui accepte un son comme réponse.

### S6 — Convolution croisée avec un clip copié

Attendu : un son convolué par un autre, de longueur a + b, sans saturation.

- Chemin : menu du clip, Copier, puis sur l'autre clip « Atelier ▸ », « Convolution avec le clip copié ». Ici calcul direct de `AT.convx` (ligne 2099) sur Bourdon de Lorenz (8 s) par Bourdon (6 s).
- Résultat : 14,00 s (8 + 6), 4,2 s de calcul (charge 11), crête 0,00 dBFS, vraie crête +0,01 dBTP, −11,8 LUFS.
- La sortie se règle sur la crête de la source (0 dBFS ici) : la vraie crête dépasse de 0,01 dB. La convolution reste un traitement hors ligne et destructif : aucun réglage de mix, de pré-délai ou de longueur, aucun essai à l'écoute avant OK.

### S7 — Couches lentes et longs fondus

Attendu : fondus de plusieurs minutes, courbe adaptée aux longues montées.

- Fondus réglés par la feuille « Fondus » (barre du clip, « Plus ») : maximum = moitié de la longueur du clip (`regionMore`, ligne 1691), soit 256 s sur un clip de 512 s.
- Au doigt, le toucher sur « Plus » n'aboutit pas dans le harnais (deux échecs, délai de 180 s) ; les fondus du projet S4 sont posés par le code. Limite de l'essai, notée sans écart.
- Effet mesuré dans le rendu S4 : −25,1 LUFS à 0:00 puis −11,6 à 0:30, avec un fondu d'entrée de 20 s.
- Courbe : rampe linéaire de gain (`playClip`, ligne 1219). Une rampe linéaire de gain monte vite en décibels au début ; les longs fondus d'ambient se règlent d'ordinaire sur une courbe exponentielle ou en S. Une seule courbe disponible.
- Les couches se superposent sans limite pratique : 32 pistes, clips libres en secondes (mode en secondes activé par la boîte).

### S8 — Dérive pendant la lecture

Attendu : les réglages bougent lentement pendant la lecture, « garder » fixe l'état entendu, l'export reprend cet état.

- Souris (pc1920) : bouton clé (Atelier), Lecture, Dérive, puis Garder après 15 s. 4 clics. Bouton Dérive 42 × 42 px. Captures [../captures/04-s8-atelier-pc1920.webp](../captures/04-s8-atelier-pc1920.webp), [../captures/04-s8-derive-pc1920.webp](../captures/04-s8-derive-pc1920.webp).
- Mesure sur 6 relevés à 2,5 s d'écart : fréquence du Sous-grave de 61,0 à 138,8 Hz (départ 90), dosage 0,85 à 1,46 (départ 1,1), fréquence médiane de l'Égaliseur de 694 à 1 392 Hz (départ 900), panoramique −0,22.
- Après « Garder » : Sous-grave 72,9 Hz, Égaliseur 772 Hz écrits dans le projet, donc dans l'export.
- Limites mesurées : la Grotte du master reste fixe (la dérive ne touche que les racks de pistes : 2 effets suivis sur 2 pistes, 0 au master) ; tenues, tailles et pièces sont exclues (`DRIFT_SKIP_K`, `DRIFT_SKIP_T`, ligne 2592). L'export reprend un seul instant gardé : le mouvement de dix minutes entendu en lecture ne passe pas dans le fichier.

### S9 — Enregistrement de terrain depuis Internet Archive

Attendu : un enregistrement de terrain libre posé sur une piste avec auteur, licence et lien, en moins de 6 touchers.

- Doigt (iPhone) : onglet Internet Archive, catégorie « Terrain », toucher un résultat, appui long sur le fichier, toucher la piste. 5 touchers, 46 s de bout en bout (réseau compris). Captures [../captures/04-s9-archive-terrain-iphone.webp](../captures/04-s9-archive-terrain-iphone.webp), [../captures/04-s9-terrain-pose-iphone.webp](../captures/04-s9-terrain-pose-iphone.webp).
- 29 catégories affichées (Terrain, Ville, Forêt, Animaux, Usine…), 60 résultats par page, chacun avec licence, auteur, année.
- Crédit gardé avec le clip : titre, auteur, licence CC0, URL https://archive.org/details/CalmPills.
- Le fichier annoncé 04:00 arrive en 144,8 s : `ensureSound` ne télécharge que les 7 premiers Mo (`Range: bytes=0-6999999`) et coupe à 240 s (`trimBuf(b,240)`, ligne 1390). Un enregistrement de terrain de 20 ou 40 minutes arrive amputé, sans avertissement.
- La fiche de terrain (lieu, date, collecteur, accordage) existe dans la loupe du clip ; elle reste à remplir à la main, les métadonnées d'Internet Archive n'y passent pas.

### S10 — Gel spectral de deux minutes

Attendu : une nappe figée de 120 s, stable en niveau.

- Calcul `AT.freeze` à 120 s (le maximum du réglage, ligne 2054) : 7,6 s (charge 11). À 60 s : 1,53 s.
- Stabilité mesurée sur 60 s (fenêtres de 50 ms) : écart-type 1,14 dB, de −19,8 à −13,0 dBFS RMS, soit 6,8 dB de plage pour un son censé rester figé. La forme d'onde montre ces marches. Capture [../captures/04-s8-derive-pc1920.webp](../captures/04-s8-derive-pc1920.webp).
- Plafond : 120 s. Pour une nappe de dix minutes, il faut copier le gel 5 fois et croiser les fondus à la main.

## Notes par scénario

Échelle 0 à 10. La preuve de chaque note renvoie à la section du scénario.

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir |
|---|---|---|---|---|---|---|---|---|---|
| S1 Premier bourdon | 7 | 7 | 5 | 7 | 7 | 5 | 6 | 6 | 6 |
| S2 Boîte Ν | 7 | 8 | 6 | 8 | 8 | 5 | 6 | 7 | 7 |
| S3 Paulstretch ×64 | 6 | 6 | 6 | 2 | 5 | 5 | 8 | 6 | 5 |
| S4 Rendu 10 min | 6 | 6 | 8 | 4 | 6 | 6 | 9 | 6 | 6 |
| S5 Queues d'espaces | 6 | 6 | 7 | 6 | 7 | 5 | 8 | 6 | 7 |
| S6 Convolution croisée | 5 | 6 | 5 | 5 | 6 | 4 | 6 | 6 | 5 |
| S7 Fondus et couches | 6 | 6 | 5 | 5 | 6 | 5 | 6 | 5 | 5 |
| S8 Dérive | 7 | 7 | 6 | 6 | 6 | 5 | 7 | 9 | 7 |
| S9 Terrain (IA) | 7 | 7 | 6 | 7 | 7 | 6 | 8 | 6 | 7 |
| S10 Gel spectral | 6 | 6 | 6 | 4 | 6 | 5 | 7 | 6 | 6 |
| Moyenne | 6,3 | 6,5 | 6,0 | 5,4 | 6,4 | 5,1 | 7,1 | 6,3 | 6,1 |

Preuves par note :

- S1 : 3 clics / 4 touchers, 1 écran (ergonomie 7, simplicité 7) ; « drone » ne trouve rien dans le kit en français (simplicité −) ; 4 bourdons synthétiques de 3 à 8 s (puissance 5, exhaustivité 5) ; Bourdon de Lorenz, chaos audible (originalité 6) ; plaques d'acier, Masks sur les pistes 01 à 18 (DA 7).
- S2 : 3 gestes pour une chaîne complète avec sous-grave mono, grotte et compression douce (ergonomie 8, simplicité 8) ; étiquette Dymo photographiée (DA 8) ; 1 étalon sur 4 du rôle couvert, aucun label (exhaustivité 5, pertinence 6) ; recherches proposées en anglais (« infrasound », « earthquake »).
- S3 : page bloquée 66 à 437 s sans avancement ni annulation (ergonomie 2) ; durée de sortie absente du dialogue, libellés anglais (simplicité 5) ; ondulation de puissance corrigée (0,51 dB selon le juge son, synthèse à fenêtre racine de Hann, ligne 2040) et geste central du genre (pertinence 8) ; ×64 et 600 s de plafond (puissance 6, exhaustivité 5).
- S4 : 644,00 s exacts, 0 coupure, 0 saut, 1,5 LU d'écart (puissance 8, pertinence 9) ; projet invisible en entier, 14 clics de zoom, export de 857 s sans avancement et un plantage (ergonomie 4).
- S5 : T30 à 5 % de l'annonce, jusqu'à 57,3 s (puissance 7, pertinence 8) ; aucune réponse impulsionnelle réelle ni importée (exhaustivité 5) ; un curseur de tenue simple (simplicité 7) ; queues lentes à calculer, 178,6 s pour 49 s (ergonomie 6).
- S6 : longueur juste (14 s), traitement destructif sans mix ni écoute préalable (puissance 5, ergonomie 5, exhaustivité 4).
- S7 : fondus jusqu'à la moitié du clip, une seule courbe linéaire en gain (puissance 5) ; feuille « Fondus » hors d'atteinte du doigt dans l'essai (ergonomie 5).
- S8 : attracteurs de Lorenz couplés au niveau, mouvement réel de 61 à 139 Hz (originalité 9) ; master exclu, mouvement non exporté (puissance 6, exhaustivité 5).
- S9 : 5 touchers, licence et auteur gardés (ergonomie 7, pertinence 8) ; coupe à 7 Mo / 240 s sans avertissement (puissance 6, exhaustivité 6).
- S10 : 120 s en 7,6 s (pertinence 7) ; 6,8 dB de plage sur un son figé, plafond 120 s (ergonomie 4, puissance 6).

## Comparaison aux outils de référence

| Besoin dark ambient | Studio (mesuré) | Référence (source) |
|---|---|---|
| Étirement extrême | ×64 au plus, 600 s de sortie, page bloquée | paulstretch(1) : « The stretch amount is unlimited » et cite 50x comme usage type — https://manpages.debian.org/buster/paulstretch/paulstretch.1 ; Audacity Paulstretch, sans plafond écrit, « setting this to 10 will stretch 1 minute of audio into approximately 10 minutes » — https://manual.audacityteam.org/man/paulstretch.html |
| Convolution | 3 espaces synthétiques (6 à 60 s), convolution croisée hors ligne | Ableton Hybrid Reverb charge des réponses impulsionnelles non compressées et signale le coût processeur des réponses longues — https://help.ableton.com/hc/en-us/articles/360019484980-Hybrid-Reverb-FAQ |
| Base BandLab | — | Le relevé BandLab du dépôt (BANDLAB-RELEVE.md, sources help.bandlab.com) ne cite ni étirement extrême, ni convolution, ni rendu en secondes : le Studio dépasse BandLab sur ces trois points. https://help.bandlab.com/hc/en-us/articles/115002945153-Getting-started-on-BandLab |

Lecture : le Studio dépasse BandLab pour le dark ambient (Paulstretch, gel, grands espaces, dérive, boîtes, archives de terrain). Face à paulstretch et à Audacity, il plafonne l'étirement ; face à Ableton, il manque l'import d'une réponse impulsionnelle.

## Écarts

### 04-01 — Paulstretch et Atelier gèlent la page — bloquant

- Preuve : S3. 66,5 s (charge 11) à 436,6 s (charge 46) de fil principal occupé pour 8 s → 512 s ; Playwright n'obtient plus de réponse au clic pendant ce temps. `processClip` (ligne 2228) appelle `AT.paul.run` (ligne 2051) dans le fil principal ; aucune barre, aucune annulation.
- Correction : exécuter `spectralRender` dans un Web Worker (transfert des Float32Array de chaque canal), afficher une barre d'avancement (trames faites / trames totales) sur le clip lui-même, une touche ✕ qui arrête le worker. Même traitement pour freeze, blur, grain, convx.

### 04-02 — Plafonds d'étirement et de durée — important

- Preuve : `stretch:[1.5,64,.5]` et `b.sampleRate*600` (ligne 2051) ; gel `dur:[1,120,1]` (ligne 2054) ; granulaire `dur:[1,120,1]` (ligne 2069). Mesures S3 et S10 : 512 s et 120 s au plus.
- Correction : facteur jusqu'à ×1 000 (réglette logarithmique), sortie jusqu'à 3 600 s, écrite par blocs de 60 s dans le worker de 04-01 pour borner la mémoire ; gel et granulaire jusqu'à 3 600 s. Afficher « → 8:32 » (durée produite) dans le dialogue.

### 04-03 — Zoom arrière bloqué à 8 px/s — important

- Preuve : `clamp(state.pps*f,8,800)` (ligne 2405) ; S4 : 14 clics, 1 min 35 s visible sur 10 min 32 s de projet.
- Correction : plancher à 0,25 px/s et touche « tout le projet » (pictogramme crochets) qui calcule `pps = largeur utile / projEnd()`.

### 04-04 — Sons distants coupés à 7 Mo et 240 s — important

- Preuve : `Range:"bytes=0-6999999"` et `trimBuf(b,240)` (ligne 1390) ; S9 : fichier annoncé 04:00, clip de 144,8 s, aucun message.
- Correction : télécharger le fichier entier (ou jusqu'à 60 min) ; au-delà, afficher sur le clip un pictogramme de coupe et la durée reçue / durée annoncée.

### 04-05 — Export long lent et fragile — important

- Preuve : S4. 857 s de calcul pour 644 s d'audio (charge 11), un rendu complet ; avec la cible −14 LUFS par défaut, 2 162 s et 5 rendus complets ; sous charge 41 à 50, la page se ferme pendant l'export, sans fichier ni message. `renderOffline` (ligne 1295) alloue tout le morceau d'un bloc, puis `trimTail` (ligne 1310) et `wavBlob` (ligne 1338) recopient le tampon ; `masteredRender` (ligne 1313) refait le rendu complet jusqu'à 4 fois de plus pour la cible LUFS.
- Correction : (1) mesurer la sonie une fois et appliquer le gain de correction devant le limiteur, avec un seul second rendu au plus ; (2) rendre par segments de 60 s avec recouvrement égal à `tailSec`, et écrire le WAV au fil ; (3) barre d'avancement et durée restante ; (4) sauvegarde du projet avant tout export de plus de 5 min.

### 04-06 — Aucune convolution par une vraie réponse impulsionnelle — important

- Preuve : S5 et S6. Grotte, silo, cathédrale = bruit filtré et réflexions posées (lignes 829-836) ; la seule convolution par un son (`convx`, ligne 2099) est destructive, sans mix, ni pré-délai, ni écoute préalable.
- Correction : effet de piste « Convolution » (pictogramme d'onde dans une voûte) dont la réponse est un son de la bibliothèque (enregistrement de cave, de silo, de citerne posé par l'utilisateur), avec mix, pré-délai, longueur et tenue, en `ConvolverNode` direct. Proposer, dans les Collections, la recherche « impulse response » sur Freesound et Internet Archive.

### 04-07 — La dérive ne passe pas à l'export et ignore le master — important

- Preuve : S8. 0 effet du master suivi ; tenues et tailles exclues (ligne 2592) ; l'export reprend l'instant gardé, jamais le mouvement.
- Correction : touche « enregistrer la dérive » qui écrit, pendant la lecture, une enveloppe d'automation `fx:` par réglage suivi (les enveloppes d'effet passent déjà au rendu, ligne 1306) ; étendre la dérive au rack du master, avec le mix et la dérive de hauteur des espaces.

### 04-08 — Étalons du genre absents des boîtes — important

- Preuve : S2. Dark ambient = Lustmord, Tim Hecker, Roly Porter (lignes 2911-2913). Thomas Köner, Raison d'être, Atrium Carceri : aucune boîte.
- Correction : trois boîtes « tribute to » sous les lettres grecques libres ι, κ, λ (règle du studio : aucun nom inventé). Chaînes proposées, à valider à la mesure : Köner — gel spectral long + Grotte tenue 8 + filtre passe-bas ; Raison d'être — Cathédrale tenue 6 + chœurs étirés ; Atrium Carceri — Silo tenue 4 + enregistrements de terrain urbains + sous-grave. Recherches traduites ou en pictogrammes.

### 04-09 — Export 16 bits sans dither — détail

- Preuve : `wavBlob` (ligne 1338) écrit du PCM 16 bits par troncature, 44,1 kHz fixe ; aucun « dither » dans le fichier (0 occurrence). Les queues S5 descendent à −88 / −101 dBFS, sous le pas du 16 bits.
- Correction : choix 24 bits ou 32 bits flottants dans le dialogue d'export ; en 16 bits, dither TPDF.

### 04-10 — Fondus linéaires seulement — détail

- Preuve : `linearRampToValueAtTime` (ligne 1219) ; S7.
- Correction : trois courbes (linéaire, exponentielle, S) par pictogramme dans la feuille Fondus.

### 04-11 — Le gel spectral fluctue — détail

- Preuve : S10. Écart-type 1,14 dB, plage 6,8 dB sur 60 s.
- Correction : recouvrement de 4 (pas N/4 au lieu de N/2) et phases qui avancent d'une trame à l'autre (accroissement constant par case) au lieu de phases tirées au hasard à chaque trame.

### 04-12 — Recherche et libellés en anglais — détail

- Preuve : « drone » ne trouve aucun son du kit en français (S1) ; « Window s », « Length s » (ligne 2103) ; recherches de la boîte Ν en anglais (S2).
- Correction : chercher dans le nom anglais et le nom français de chaque son ; libellés de l'Atelier en pictogrammes (fenêtre, durée) ou en français.

## À garder tel quel

- Le rendu long : 644,00 s exacts, 0 coupure, 0 saut d'échantillon, 1,5 LU d'écart sur neuf minutes, fin à −78 dBFS (S4).
- `tailSec` et `trimTail` : la queue suit les effets présents et s'éteint sous −80 dBFS avant la coupe (S5).
- La tenue des grands espaces : T30 à 5 % de l'annonce, de 6 à 57 s (S5).
- La boîte Ν en 3 gestes, au doigt comme à la souris, avec sous-grave mono et grotte au master (S2).
- La dérive à attracteurs et la touche Garder, qui écrit l'état entendu dans le projet (S8).
- La catégorie « Terrain » d'Internet Archive : 60 résultats libres par page, crédit gardé jusqu'au fichier des crédits (S9).
- Le mode en secondes que la boîte active d'office : un bourdon n'a pas de mesure.

## Mesure complémentaire : export avec la cible −14 LUFS

- Même projet que S4, cible par défaut −14 LUFS, charge 10 à 12 : 2 162 s de calcul (36 min) pour 642 s d'audio, 5 rendus complets comptés par interception de `renderOffline`.
- Fichier : 641,96 s, crête −2,00 dBFS, vraie crête −2,00 dBTP, −14,0 LUFS (affiché : « −14,0 LUFS, crête −2,0 dB »), sonie à court terme du corps de −14,8 à −13,0 LUFS (1,8 LU), 0 silence interne, 0 saut, fin à −85,8 dBFS.
- La cible est atteinte au dixième près, au prix de 2,5 fois le temps de l'export sans cible (857 s). La queue perd 2 s : le niveau plus bas passe plus tôt sous le seuil de `trimTail`.
