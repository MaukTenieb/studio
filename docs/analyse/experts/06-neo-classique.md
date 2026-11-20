# Expert 06 — composition néo-classique avec orchestre philharmonique

Étalons : Arvo Pärt, Henryk Górecki, Max Richter, Jóhann Jóhannsson, Ólafur Arnalds ; les Berliner Philharmoniker ; la prise de son de Deutsche Grammophon et d'ECM New Series ; les échantillons de Vienna Symphonic Library. Mesures selon EBU R128 (sonie intégrée, vraie crête) et EBU Tech 3342 (plage de sonie, LRA).

## Récapitulatif

| Critère | Note moyenne |
|---|---|
| 1. Design | 5,5 |
| 2. Direction artistique | 5,8 |
| 3. Puissance | 5,2 |
| 4. Ergonomie | 5,7 |
| 5. Simplicité intuitive | 6,6 |
| 6. Exhaustivité | 5,4 |
| 7. Pertinence | 5,5 |
| 8. Originalité | 5,5 |
| 9. Plaisir potentiel | 4,8 |

Trois constats majeurs :
1. Les masterings Neutral et Classical gardent la nuance entière : écart doux / fort de 34,4 dB pour 34,5 dB à la source, LRA 20,7 LU pour 20,6 LU.
2. Le réglage d'origine (Universal, −14 LUFS) relève les passages doux de 5,3 dB. Loud −9 réduit l'écart de 34,5 dB à 11,5 dB.
3. Un mouvement de symphonie importé d'Internet Archive est coupé à 240 s : 7 min 44 s deviennent 4 min 00 s.

## Méthode et conditions

- Application servie en local (http://localhost:8765/), harnais Playwright de /home/claude/outil, formats iphone (390 × 664), iphone-paysage, pc1366, pc1920. L'interface s'ouvre en anglais (navigateur en-US) ; le bouton FR la traduit.
- Signal d'essai : /tmp/expert06/src/pp-ff-cordes.wav, 70 s, 24 bits. C'est un accord de la mineur sur six voix (dents de scie filtrées, vibrato de 5,2 à 6,7 Hz). Il enchaîne pp de 0 à 20 s, crescendo de 20 à 35 s, ff de 35 à 50 s (crête −3 dBFS), decrescendo, puis pp de 55 à 70 s.
  - Mesures de la source : −13,9 LUFS, vraie crête −3,96 dBTP, LRA 20,6 LU.
  - Passage doux (5–18 s) : −47,0 LUFS. Passage fort (37–48 s) : −12,5 LUFS. Écart : 34,5 dB.
  - L'écart visé correspond à une prise ECM ou DG d'un pianissimo de cordes face à un tutti.
- Version courte : /tmp/expert06/src/pp-ff-court.wav, 35 s. Elle reprend les mêmes niveaux : doux −47,0, fort −12,5, écart 34,5 dB, LRA 13,9 LU.
- Outils de mesure : /home/claude/outil/mesure.py, plus mon script /tmp/expert06/sc/dyn.py (pyloudnorm pour la sonie par passage, filtre ebur128 de ffmpeg pour la LRA).
- Charge de la machine : les dix experts tournent en parallèle sur 2 cœurs, avec une charge moyenne de 37 à 51 pendant la plupart de mes essais (commande uptime). Les secondes mesurées sous cette charge sont donc des majorants. Les exports courts de 17 h 50 ont tourné sous une charge de 13 ; ces temps-là approchent ceux d'un ordinateur ordinaire.
- Limites de la session :
  - le proxy refuse api.openverse.org, commons.wikimedia.org et freesound.org (HTTP 403). Les sources Freesound, Commons et Jamendo affichent donc ✕ ici, et leur contenu reste non mesuré : ce ✕ vient de la session, pas de l'application ;
  - archive.org répond ;
  - le harnais ne sert pas musik-fx.js à l'AudioWorklet (avis de l'orchestrateur). Mes essais d'espace utilisent l'effet Room (convolution native, ligne 797) et la chaîne de mastering native (lignes 940 à 990), qui n'en dépendent pas. Je ne note donc aucun écart sur les effets de Musik.

## Scénarios

### S1. Premier toucher : chercher « violin » dans la recherche globale (iPhone)
- Attendu : au moins 5 sons de violon jouables sur 10 résultats.
- Gestes : 1 toucher sur le champ, 1 saisie. Résultat après 9 s : Collections 4 entrées (violin legato, violin spiccato, violin ×2) ; Freesound, Commons et Jamendo ✕ (session) ; Internet Archive 10 titres.
- Sur ces 10 titres, 2 sont de la musique pour violon et orchestre (The Four Seasons de Vivaldi, Scheherazade). Les autres : Jack Benny 143 Eps, Grab Bag, Moon River, Mozart vs. DjDott…
- Autres requêtes, résultats pertinents sur 10 titres d'Internet Archive :
  - « orchestra » : 2 (Mozart Symphony 40, The Four Seasons), avec 5 émissions de radio (Screen Guild Theater, Yours Truly Johnny Dollar, Amos and Andy, The Jack Benny Program, Duffy's Tavern) ;
  - « cello » : 3 ;
  - « choir » : 5, plus 1 son du kit (Additive choir, synthétisé).
- Kit hors ligne : 0 son pour « violin », « strings », « orchestra » et « cello ».
- Captures : [recherche violin](../captures/06-recherche-violin-iphone.webp), [recherche orchestra](../captures/06-recherche-orchestra-iphone.webp).

### S2. Collections → Huit univers sonores → Orchestre → violin legato (ordinateur)
- Attendu : une liste de prises d'articulations de cordes.
- Gestes : 4 clics, 22,1 s jusqu'à l'affichage (pc1366).
- La famille Orchestre compte 20 articulations et pupitres : violin legato, spiccato, string tremolo, col legno, sul ponticello, pizzicato, cello solo, double bass, french horn, brass ensemble, trombone section, timpani roll, orchestral bass drum, orchestral percussion, harp glissando, flute solo, oboe, clarinet, bassoon, choir (ligne 1466). La famille Instruments → Cordes frottées en compte 11 (ligne 1469).
- Résultat : ✕, car la recherche passe par Openverse, refusé par le proxy. Le bouton Internet Archive de la même rangée renvoie à la recherche plein texte de S1.
- Captures : [famille](../captures/06-orchestre-famille-pc1366.webp), [résultat](../captures/06-violin-legato-pc1366.webp).

### S3. Internet Archive, catégorie Classique (iPhone)
- Attendu : au moins 30 œuvres orchestrales sur 60.
- Gestes : 2 touchers, 12 s d'attente.
- Résultat : 60 titres, sur 7 950 trouvés (même requête rejouée par curl, /tmp/expert06/ia60.json).
  - 20 titres sur 60 (33 %) sont des feuilletons radio : Dr. Christian, Amos & Andy ×2, Lum & Abner, Vic & Sade ×3, Easy Aces ×2, Ma Perkins ×2, Myrt & Marge, Pepper Young's Family, Firefighters, etc.
  - 12 titres (20 %) sont des œuvres orchestrales : Mozart 40, Beethoven 5 et 7, Mahler 5, Dvořák 9, Chostakovitch 5, Elgar Enigma, William Tell, Ride of the Valkyries, Concerto pour piano 21, Thiruvasagam in Symphony, BBC Philharmonia free orchestral samples.
- Les trois collections Musopen (« Musopen Collection as FLAC », « The Musopen Lossless DVD », « The Musopen DVD ») ne contiennent aucun MP3 : l'API metadata de musopen-dvd liste 4 fichiers, 1 ZIP et 3 de métadonnées. Or le Studio ne liste que les fichiers .mp3 (filtre /\.mp3$/ dans iaItem, ligne 1426).
- Captures : [catégorie](../captures/06-ia-classique-iphone.webp), [item](../captures/06-ia-item-iphone.webp).

### S4. Poser un mouvement entier : Mozart, Symphonie 40, II (Andante, 7 min 44 s)
- Attendu : un clip de 464 s sur la piste 01.
- Gestes : à la souris, 5 actions (onglet, champ, item, glisser), 135 s ; au doigt, 7 touchers (onglet, champ, item, 2 glissés de liste, appui long 0,5 s, toucher sur la piste), 369 s, sous charge.
- Résultat : un clip de 240,0 s (state.tracks[0].clips → [0, 0, 240]), alors que la liste affiche 7:44. 224 s sont perdues, soit 48 %. Aucun message ne signale la coupe.
- Cause : ensureSound applique b=trimBuf(b,240) (lignes 1383 et 1390). Au-delà de 12 Mo, la requête Range s'arrête de plus à 7 Mo (ligne 1390).
- Captures : [fichiers 7:44](../captures/06-mozart40-fichiers-pc1366.webp), [clip posé](../captures/06-mozart40-pose-pc1366.webp), [au doigt](../captures/06-mozart40-pose-iphone.webp), [son attrapé](../captures/06-son-attrape-iphone.webp).

### S5. Importer sa propre prise (70 s, WAV 24 bits)
- Attendu : clip entier, niveau intact.
- Gestes : 3 clics (onglet Fichiers, Importer, glisser). Le son apparaît dans la liste après 30,8 s (stockage IndexedDB, sous charge). Pose en 47,1 s au total.
- Résultat : clip de 70,00 s à 0,00 s. Le rendu Neutral sans cible garde l'écart de 34,4 dB (voir S7).
- Capture : [clip posé](../captures/06-clip-pose-pc1366.webp).

### S6. Espace de salle : Concert hall sur un chœur
- Attendu : une queue de réverbération complète à l'export, réglable et automatisable.
- Gestes : 3 clics (bouton effets de la piste, menu Chain preset, Hall). Hall pose Room réglé sur Concert hall : mix 0,40, pré-délai 0,02 s, réponse synthétique de 2,4 s (ROOMS, ligne 718).
- Le menu A de la piste propose 7 enveloppes : Volume, Pan, et Room › Room, Mix, Size, Damp, Pre-delay.
- Export du clip « Additive choir » de 6 s, Neutral, sans cible : 8,22 s, vraie crête −5,39 dBTP, −14,9 LUFS, repos −74,2 dBFS, queue 1,75 s sous −60 dBFS après le dernier passage au-dessus de −20 dBFS. La queue n'est pas coupée.
- La liste des pièces compte 20 entrées, dont Concert hall, Church, Cathedral, Theatre. Elle ne contient aucune salle de concert mesurée, ni aucun choix de position de micro (proche, arbre Decca, ambiance).
- Captures : [chaîne Hall](../captures/06-fx-hall-pc1366.webp), [enveloppes](../captures/06-automation-pc1366.webp).

### S7. Longues nuances : export avec Neutral et Classical
- Attendu : écart doux / fort à ±0,5 dB de la source, LRA à ±0,5 LU, vraie crête sous −1 dBTP.
- Gestes : 2 menus (préréglage, cible), export, WAV : 4 clics.

| Export (70 s) | LUFS | Vraie crête | LRA | Doux | Fort | Écart | Temps sous charge |
|---|---|---|---|---|---|---|---|
| Source | −13,9 | −3,96 | 20,6 | −47,0 | −12,5 | 34,5 | — |
| Neutral, sans cible | −15,4 | −6,09 | 20,7 | −48,5 | −14,0 | 34,4 | 102 s |
| Classical, sans cible | −13,4 | −4,12 | 20,6 | −46,3 | −12,0 | 34,3 | 115 s |
| Classical −23 | −22,9 | −13,64 | 20,7 | −55,9 | −21,5 | 34,4 | 176 s |
| Classical −16 | −15,9 | −6,64 | 20,6 | −48,9 | −14,5 | 34,4 | 299 s |
| Classical −14 | −13,9 | −4,64 | 20,6 | −46,9 | −12,5 | 34,4 | 281 s |

- Résultat : nuance intacte (−0,1 à −0,2 dB), cible atteinte à ±0,1 LU, vraie crête sous −4 dBTP. Le sonomètre du pied affiche les mêmes valeurs (« −14.0 LUFS, crête −4.6 dB »).

### S8. Le réglage d'origine et les autres masterings
- Attendu : écart ≥ 30 dB pour un mastering destiné à la diffusion de musique orchestrale.
- Le projet s'ouvre sur Universal à −14 LUFS (ligne 1046).

| Export | LUFS | Vraie crête | LRA | Doux | Fort | Écart |
|---|---|---|---|---|---|---|
| Universal −14 (70 s) | −13,9 | −3,51 | 19,6 | −41,6 | −12,5 | 29,1 |
| Source courte (35 s) | −13,0 | −4,01 | 13,9 | −47,0 | −12,5 | 34,5 |
| Neutral −14 | −14,0 | −5,45 | 14,3 | −47,8 | −13,4 | 34,4 |
| Ambient −14 | −13,9 | −3,99 | 14,0 | −45,1 | −13,3 | 31,9 |
| Cinematic −14 | −13,9 | −3,91 | 14,0 | −43,6 | −13,3 | 30,3 |
| Universal −14 | −13,9 | −4,18 | 14,0 | −42,3 | −13,2 | 29,1 |
| Loud −9 | −9,2 | −1,16 | 11,7 | −17,5 | −5,9 | 11,5 |

- Résultat :
  - Universal relève le pianissimo de 5,4 dB, Cinematic de 4,2 dB, Ambient de 2,6 dB, Loud de 23 dB.
  - La cause vient du compresseur multibande (mb > 0) et du compresseur de colle : les DynamicsCompressor de Chrome ajoutent un gain de rattrapage automatique (lignes 945 à 951, déjà relevé par le juge son, point 4).
  - Le sonomètre du pied n'affiche ni la LRA ni la vraie crête ; il donne la crête échantillon.
- Temps d'export (35 s, charge 13) : Neutral 6,6 s ; Ambient 19,0 s ; Cinematic 27,2 s ; Loud 37,8 s ; Universal 111,7 s.

### S9. Livraison : MP3, pistes séparées, rendus en série
- Attendu : MP3 à ±0,3 LU de la cible, pistes séparées sans traitement, aucun plantage.
- Résultats :
  - MP3 Classical −14 (35 s) : −14,2 LUFS, vraie crête −5,80 dBTP, écart 34,3 dB.
  - Pistes séparées : 1 fichier WAV par piste utilisée, sans mastering, en 3,8 s. La piste 01 sort à −15,1 LUFS, crête −6,64 dBTP.
  - Rendus en série dans une même page (70 s, sous charge) : la page plante 2 fois au 3ᵉ export, et Universal −14 dépasse une fois 15 min. Le 3ᵉ essai réussit en 840 s, contre 281 s pour Classical −14 dans les mêmes conditions.
- Capture : [tiroir Master](../captures/06-master-pc1920.webp).

### S10. Écriture lente sans MIDI
- Attendu : écrire une ligne de 8 notes longues de cordes, liées, avec un crescendo, sans MIDI.
- Gestes :
  - le mode secondes se trouve à 1 clic du projet (bouton bFree, state.free = true, [capture](../captures/06-secondes-pc1920.webp)) ; le projet s'ouvre à 120 BPM sur une grille de mesures ;
  - le crescendo s'écrit par l'enveloppe Volume (S6), les fondus par les poignées du clip.
- Résultat :
  - aucune banque de notes d'orchestre dans le kit (0 résultat pour « violin », « cello », « strings ») ;
  - l'écriture d'une ligne passe donc par 8 sons cherchés, téléchargés, transposés et posés un par un. Je compte au moins 3 gestes par note (appui long, toucher sur la piste, réglage de hauteur), donc 24 gestes ou plus pour 8 notes ;
  - aucune note liée (legato entre deux clips), aucun changement d'articulation.
- Ce que le choix zéro MIDI ouvre : la prise réelle (S5), les textures et les espaces (S6), la nuance intacte (S7), le travail à la manière de Jóhannsson ou de Richter sur des enregistrements traités. Ce qu'il coûte : l'écriture note à note d'une partition d'orchestre façon Vienna Symphonic Library est absente.

### S11. Le tiroir Master sur téléphone couché
- Attendu : 26 masterings, cible et export lisibles, cibles ≥ 44 px, texte ≥ 11 px.
- Gestes : 1 toucher sur Master.
- Résultat :
  - en 844 × 390, le tiroir reçoit environ 150 px de haut. Seule la rangée A, B, = et la tranche supérieure des cartes de préréglage s'affichent ; le bouton rond « + » recouvre le tiroir ;
  - 40 commandes, toutes sous 44 px ; texte minimum 10,2 px ;
  - en 1 920 × 1 080 : 15 commandes sous 44 px, texte minimum 12,75 px, et le « + » mord sur le bord haut du tiroir ;
  - Neutral manque au tiroir ; il figure seulement dans le menu du pied. Classical se trouve dans « More studio masterings », en 2ᵉ rangée.
- Captures : [téléphone couché](../captures/06-master-iphone-paysage.webp), [1 920](../captures/06-master-pc1920.webp), [atelier](../captures/06-atelier-pc1920.webp).

## Notes par scénario (sur 10)

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir |
|---|---|---|---|---|---|---|---|---|---|
| S1 recherche globale | 6 | 6 | 4 | 7 | 8 | 4 | 4 | 6 | 5 |
| S2 collection Orchestre | 6 | 6 | 3 | 6 | 7 | 6 | 7 | 6 | 4 |
| S3 Archive Classique | 5 | 5 | 5 | 6 | 7 | 5 | 4 | 6 | 5 |
| S4 mouvement entier | 6 | 6 | 3 | 6 | 7 | 3 | 3 | 5 | 4 |
| S5 import de prise | 6 | 6 | 7 | 7 | 7 | 7 | 8 | 5 | 6 |
| S6 salle de concert | 6 | 6 | 6 | 6 | 7 | 6 | 7 | 5 | 6 |
| S7 nuances Neutral / Classical | 6 | 6 | 9 | 6 | 7 | 8 | 9 | 6 | 7 |
| S8 mastering d'origine | 5 | 5 | 5 | 5 | 6 | 6 | 3 | 5 | 4 |
| S9 livraison | 6 | 6 | 6 | 6 | 7 | 5 | 6 | 5 | 5 |
| S10 écriture sans MIDI | 6 | 7 | 3 | 5 | 6 | 2 | 4 | 7 | 4 |
| S11 Master téléphone couché | 3 | 5 | 6 | 3 | 4 | 7 | 6 | 5 | 3 |
| Moyenne | 5,5 | 5,8 | 5,2 | 5,7 | 6,6 | 5,4 | 5,5 | 5,5 | 4,8 |

### Preuves des notes

- Design :
  - 6 pour une barre du haut, des pistes et une bibliothèque lisibles à 1 366 px ([accueil](../captures/06-accueil-pc1366.webp)) ;
  - 5 en S3 et S8 : grilles de cartes à cases, déjà relevées par le juge DA ;
  - 3 en S11 : tiroir rogné et recouvert par le bouton « + ».
- Direction artistique :
  - 6 : bois, plaque, vumètre photographiques ;
  - 5 : listes de résultats en blocs gris ;
  - 7 en S10 : le mode secondes et la piste nue conviennent à une écriture lente.
- Puissance :
  - 9 en S7 (nuance à 0,1 dB près, cible à 0,1 LU) ;
  - 3 en S2, S4 et S10 (articulations sans résultat dans la session, coupe à 240 s, aucune banque de notes).
- Ergonomie :
  - 7 pour la recherche globale (1 toucher) et l'import (3 clics) ;
  - 3 en S11 (40 cibles sous 44 px).
- Simplicité intuitive :
  - 8 en S1 (champ unique, sections par source) ;
  - 4 en S11.
- Exhaustivité :
  - 8 en S7 (7 cibles de sonie, 26 masterings, A/B, référence) ;
  - 2 en S10 (aucune note d'orchestre) ;
  - 3 en S4 (48 % du mouvement perdu).
- Pertinence :
  - 9 en S7 ;
  - 3 en S4 et S8 (le réglage d'origine retire 5,4 dB de nuance) ;
  - 4 en S1 et S3 (33 % de feuilletons radio dans Classique).
- Originalité :
  - 7 en S10 : l'écriture par prises réelles et espaces, sans MIDI, se distingue de BandLab ;
  - 5 à 6 ailleurs : la recherche fédérée et les articulations nommées existent, le reste suit les usages courants.
- Plaisir potentiel :
  - 7 en S7 (un pianissimo intact après mastering) ;
  - 3 à 4 en S4, S8 et S11 (coupe muette, nuance écrasée, tiroir illisible).

## Comparaison aux outils de référence

| Point | Studio (mesuré) | Référence |
|---|---|---|
| Plage de sonie affichée | non (LUFS et crête échantillon) | EBU Tech 3342 définit la LRA, à afficher avec la sonie intégrée : https://tech.ebu.ch/publications/tech3342 |
| Vraie crête | respectée sur mes essais (≤ −1,16 dBTP), mais non affichée | EBU R128 demande la mesure de la vraie crête : https://tech.ebu.ch/publications/r128 |
| Mastering sans compression | Neutral et Classical : écart 34,4 dB | BandLab propose un mastering instantané à préréglages (relevé BandLab, https://help.bandlab.com/hc/en-us/articles/115002945153-Getting-started-on-BandLab) ; l'étude directe de son effet sur la nuance reste impossible ici (BandLab injoignable) |
| Rattrapage automatique des compresseurs | +5,4 dB sur le pp avec Universal | La spécification Web Audio décrit le gain de rattrapage du DynamicsCompressorNode : https://webaudio.github.io/web-audio-api/#DynamicsCompressorNode |
| Banque d'orchestre | 0 note jouable hors ligne ; articulations nommées vers Freesound | Vienna Symphonic Library vend des banques d'articulations par pupitre et par position de micro : https://www.vsl.co.at/en |
| Enregistrements libres d'orchestre | Archive : 12 œuvres sur 60 dans Classique ; Musopen illisible (ZIP / FLAC) | Musopen sur Internet Archive : https://archive.org/details/musopen-dvd ; Mozart 40 en MP3 : https://archive.org/details/Mozart_Symphony_40 |
| Durée d'un son importé d'Internet | coupé à 240 s | Audacity et Reaper importent des fichiers de plusieurs heures (usage courant ; aucune limite de durée annoncée par ces outils) |

## Écarts

### 06-01 — Mouvements d'orchestre coupés à 240 s (bloquant)
- Preuve : Mozart 40, II, affiché 7:44, posé en clip de 240,0 s. 48 % perdus, sans message (S4).
- Cause : ensureSound applique trimBuf(b,240) et une requête Range limitée à 7 Mo au-delà de 12 Mo (lignes 1383 et 1390).
- Correction :
  1. retirer trimBuf pour les sons d'Internet Archive, de Commons et de Jamendo ;
  2. télécharger le fichier entier, sans en-tête Range ;
  3. si la mémoire impose une limite, l'afficher sur la ligne du son (pictogramme ciseaux et durée gardée), et proposer de choisir le passage avant la pose.

### 06-02 — Le réglage d'origine écrase la nuance (important)
- Preuve : Universal −14 réduit l'écart de 34,4 à 29,1 dB et la LRA de 20,7 à 19,6 LU. Cinematic −14 donne 30,3 dB, Loud −9 donne 11,5 dB (S8).
- Correction :
  1. compenser le gain de rattrapage des DynamicsCompressor dans mchain et buildMaster (mesurer le gain d'un sinus de −50 dBFS à la construction, puis appliquer l'inverse en aval), ou remplacer ces nœuds par un compresseur en AudioWorklet sans rattrapage ;
  2. placer Neutral et Classical dans la première rangée du tiroir Master ;
  3. avertir quand l'export perd plus de 3 LU de LRA par rapport au rendu Neutral (pictogramme de nuance barré à côté du sonomètre).

### 06-03 — Le sonomètre ignore la plage dynamique et la vraie crête (important)
- Preuve : #mMeas affiche « −14.0 LUFS, crête −3.5 dB », c'est-à-dire la crête échantillon de peakDb (ligne 1003). Il n'affiche aucune LRA.
- Correction : afficher LUFS intégré, LRA (EBU Tech 3342 : sonie à court terme sur 3 s, seuil relatif à −20 LU, écart entre les 10ᵉ et 95ᵉ centiles) et vraie crête suréchantillonnée ×4, en dBTP.

### 06-04 — La catégorie Classique d'Internet Archive mêle feuilletons radio et musique (important)
- Preuve : 20 feuilletons radio et 12 œuvres orchestrales sur 60 titres (S3) ; 5 émissions de radio sur 10 pour « orchestra » (S1).
- Correction :
  1. ajouter à la requête Classical (ligne 1395) : -subject:("old time radio" OR otr OR "radio drama" OR comedy) -collection:(oldtimeradio) ;
  2. ajouter dans Collections → Orchestre une rangée de sources nommées par ce qu'elles contiennent : Musopen, l'item « BBC Philharmonia free orchestral samples » vu dans les résultats, après vérification de sa licence.

### 06-05 — Les enregistrements Musopen ne s'ouvrent pas (important)
- Preuve : iaItem garde seulement /\.mp3$/ (ligne 1426). Les items Musopen livrent FLAC, Ogg ou ZIP ; musopen-dvd contient 1 ZIP et aucun MP3.
- Correction : accepter .flac et .ogg, que decodeAudioData lit dans Chrome. Pour un item sans fichier lisible, afficher un pictogramme d'archive fermée plutôt qu'une liste vide.

### 06-06 — Exports lents et plantages en série avec les masterings compressés (important)
- Preuve :
  - pour 35 s, Universal −14 demande 111,7 s, contre 6,6 s pour Neutral −14 ;
  - pour 70 s sous charge : 2 plantages de page et 1 dépassement de 15 min au 3ᵉ export de la même page (S9).
- Cause : masteredRender relance renderOffline jusqu'à 5 fois (ligne 1313).
- Correction : rendre le mixage une seule fois sans master, puis ne repasser que la chaîne mchain (ligne 941) sur ce rendu à chaque essai de gain. Libérer les tampons entre deux exports.

### 06-07 — Aucune banque de notes d'orchestre (important)
- Preuve : 0 son du kit pour « violin », « cello », « strings », « orchestra » ; 1 pour « choir », synthétisé (S1, S10). L'écriture d'une ligne de 8 notes demande au moins 24 gestes.
- Correction, sans MIDI :
  1. un kit Orchestre de notes longues par pupitre (violons, altos, violoncelles, contrebasses, cors, bois, chœur), tirées de sources libres vérifiées, licence affichée dans les crédits ;
  2. une note par pad, avec transposition par pas de demi-ton depuis le séquenceur.

### 06-08 — Tiroir Master illisible sur téléphone couché (important)
- Preuve : environ 150 px de haut, préréglages rognés, bouton « + » posé dessus, 40 commandes sous 44 px, texte à 10,2 px (S11).
- Correction :
  1. ouvrir le tiroir Master en plein écran sur téléphone ;
  2. masquer le bouton « + » tant qu'un tiroir est ouvert ;
  3. cibles de 44 px minimum, texte de 11 px minimum, avec les mêmes proportions qu'à 1 920 px.

### 06-09 — Pas de position de micro ni de salle mesurée (détail)
- Preuve : 20 pièces synthétiques (ROOMS, ligne 718) ; aucun choix proche, arbre Decca ou ambiance. Le juge fidélité l'a déjà relevé (point 11).
- Correction : un réglage de distance (proche / salle / ambiance) sur Room, qui règle mix, pré-délai et filtrage, plus des réponses impulsionnelles de salles réelles sous licence libre.

### 06-10 — Neutral absent du tiroir Master (détail)
- Preuve : le tiroir liste 25 préréglages sans Neutral ; le menu du pied en liste 26 (S11).
- Correction : ajouter Neutral en tête de la première rangée, avec un pictogramme de courbe plate.

## À garder tel quel

- Neutral et Classical : écart de 34,3 à 34,4 dB contre 34,5 dB à la source ; sonie à ±0,1 LU de la cible de −23 à −14 LUFS ; vraie crête sous −4 dBTP (S7).
- Les 7 cibles de sonie, dont −23 EBU R128 et −24 ATSC A/85.
- L'export MP3 fidèle : −14,2 LUFS et 34,3 dB d'écart.
- Les pistes séparées sans traitement, en 3,8 s.
- La queue de Concert hall rendue jusqu'au silence (repos −74,2 dBFS).
- Les 7 enveloppes de la piste, paramètres de Room compris.
- Le mode secondes, à 1 clic de la grille.
- La famille Orchestre nommée par articulation (legato, spiccato, col legno, sul ponticello…).
- La pose au doigt par appui long puis toucher sur la piste.
- L'import d'une prise personnelle de 70 s sans perte de niveau ni de nuance.
