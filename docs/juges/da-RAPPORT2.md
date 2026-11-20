# Juge DA / UI-UX — deuxième passage (commit c02f630)

Captures neuves sur 1366×820, 390×844 et 844×390 en fr-FR : /home/claude/judges/da/cap2/ (105 fichiers, mesures dans metrics.json, scripts r2_*.py). Zéro erreur JavaScript.

| # | Constat | État | Preuve |
|---|---|---|---|
| 1 | Retour au début / touche Début | corrigé | un seul #bBack ; setPos(6) puis clic → 0, touche Début → 0, sur les trois formats (r2_shoot2.py) |
| 2 | Console en 844×390 | partiel | les faders apparaissent, mais l'échelle s'arrête à -24 et la première tranche est coupée à gauche : cap2/844x390_06_console.png |
| 3 | Platines en 844×390 | partiel | tiroir en pleine largeur, disques passés d'environ 20 à 50 px, toujours trop petits pour le scratch : cap2/844x390_10_platines.png |
| 4 | Infobulles en anglais | corrigé | enTitles vide sur les trois formats (metrics.json) |
| 5 | Anglais visible | partiel | corrigés : Bourdon / Nappe / Basse acide, Limiteur, Pano, Hachoir, Bégaiement. Restent : mastering Universal / Fire / Clarity / Tape / Natural / Cinematic / Spatial / Punch, plus le choix « Universal » dans le pied ; Timestretch ; 12-TET ; « TRIBUTE TO … » ; étiquettes Freesound « contact microphone metal, feedback, scream, electrical interference ». Captures cap2/1366x820_11_mastering.png, _04_barre_plus.png, _32_boite_sortie.png |
| 6 | Loupe ♪ qui empile ses barres | corrigé | une seule barre après trois clics, avec le message « Son sans hauteur nette » : cap2/1366x820_34_loupe_drone_triple.png |
| 7 | Pistes en aplats plats | toujours faux | cap2/1366x820_02_pistes_clips.png |
| 8 | Branchements vectoriels, numéros illisibles | toujours faux | cap2/1366x820_09b_branchements.png |
| 9 | Grilles de cartes SaaS (mastering, Archive, fiche) | toujours faux | cap2/1366x820_11_mastering.png, _19_archive_recherche.png, _05_loupe_field.png |
| 10 | Pied qui change de hauteur | toujours faux | 49 px sans sélection, 98 px avec un clip choisi (r2_chk.py) ; cap2/1366x820_02 / _03 / _04 |
| 11 | Proportions entre formats | partiel | 844×390 : le bouton EN est revenu à l'écran et les tiroirs prennent toute la largeur. 390×844 : volume et limiteur restent hors écran (count.py), 1,3 piste reste visible avec un tiroir ouvert : cap2/390x844_01_accueil.png, cap2/390x844_07_pads.png |
| 12 | Figurine sur la touche FX en 390 | corrigé | touches sur deux rangées, figurine libre : cap2/390x844_01_accueil.png |
| 13 | Téléprompteur hors pied | toujours faux | coupés : « Bégaiement » (844×390), « S » / « Sc » (390×844), « Basse ac » sur les clips, « Tranch / Transp / Timest » dans la barre du clip en 844. Captures cap2/844x390_07_pads.png, cap2/390x844_07_pads.png, cap2/844x390_04_barre_plus.png |
| 14 | Texte sous 11 px, graduations qui se chevauchent | toujours faux | console à 8,4 px ; 159 éléments sous 11 px en 844×390 ; graduations « -24 / -48 » collées : cap2/1366x820_06_console.png |
| 15 | Console : 14 tranches sur 32, pas de tranche maître, « D » sans picto | toujours faux | cap2/1366x820_06_console.png |
| 16 | Page des sauvegardes (dates ISO, empreintes git, titre sur photo) | toujours faux | cap2/1366x820_27_versions.png |
| 17 | Même picto pour Annuler et pour le retour de la dérive | non revérifié | le bouton de la dérive n'apparaît que dérive active ; test non refait |
| 18 | Fenêtre du film qui cache les clips | toujours faux | cap2/1366x820_25_film.png |
| 19 | Bandes Dymo dessinées en CSS | toujours faux | cap2/1366x820_31_dymo.png |
| 20 | Boîte d'artiste à l'effet quasi invisible | toujours faux | seul un liseré apparaît sur la touche FX de la piste 01 : cap2/1366x820_32_boite_sortie.png |

## Régressions visibles

- Console (1366 et 844) : la touche M de chaque tranche déborde à gauche sur la tranche voisine, et la première tranche est coupée au bord. Captures cap2/1366x820_06_console.png, cap2/844x390_06_console.png.
- Loupe : les trois onglets sont devenus de larges cases, avec l'icône calée à gauche dans un grand vide. Capture cap2/1366x820_34_loupe_drone_triple.png. Défaut mineur.
- Nouvelle police condensée sur toute l'interface : lisible, aucun défaut constaté.

## Note DA / UI-UX : 6/10 (contre 5)

Les trois défauts de fonctionnement sont corrigés : retour au début, loupe, infobulles. Le français progresse nettement et le téléphone couché devient utilisable.
La direction artistique n'a pas bougé : aplats des pistes, graphe vectoriel, cartes SaaS, préréglages de mastering anglais repris de BandLab.
Le téléprompteur reste limité au pied, la console garde ses textes trop petits et prend une régression de mise en page.
