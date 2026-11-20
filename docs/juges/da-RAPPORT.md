# Juge DA / UI-UX — studio (index.html, sauvegarde 2026-11-20 06h36)

Méthode : Playwright Chromium, locale fr-FR, trois formats (1366×820, 390×844, 844×390), copie locale d'insertkoin pour les figurines. 93 captures dans /home/claude/judges/da/cap/ (préfixe = format), mesures dans cap/metrics.json, scripts shoot.py, shoot2.py, shoot3.py, count.py. Zéro erreur JavaScript relevée.

## Bloquant

1. Bouton « Retour au début » (#bBack, en haut à gauche) et touche Début : ils ne ramènent plus au début. Deux éléments portent l'id bBack (lignes 456 et 506) ; la ligne 2462 remplace le gestionnaire de la ligne 2240 sur le premier. Test : setPos(6), clic → pos reste 6, toast « Retour » (dérive annulée) ; touche Début → pos 6. Le bouton « Retour » de la dérive reste sans effet. Établi sur les trois formats (shoot2.py). Correction : renommer l'id du bouton de la dérive (#bDriftBack) et ses deux sélecteurs CSS.

2. Console en téléphone couché : les faders sortent du tiroir, seules les têtes (M S D, Pan C) restent visibles. Capture cap/844x390_06_console.png. Correction : en hauteur réduite, tranche en deux colonnes (fader vertical court à côté des touches) ou tiroir plein écran.

3. Platines en téléphone couché : les disques tombent à ~20 px, le tiroir n'offre rien à toucher. Capture cap/844x390_10_platines.png. Correction : en paysage, masquer la bibliothèque quand un tiroir s'ouvre et donner toute la largeur aux deux disques.

## Important

4. Langue : 19 infobulles restent en anglais en fr-FR (Start, Play / Stop (Space), Record (R), Loop (L), Snap, Commands (Ctrl+K), Undo (Ctrl+Z), New project, Export WAV + credits, Language, Steps, Stage, Decks, Drift, Measure LUFS, Master volume, Lyrics, Files, Panel) ; boutons de piste : Mute, Solo, Arm, FX. Seuls les éléments data-tt sont traduits par applyLang (ligne 2302). Mesure : metrics.json, clé enTitles. Correction : passer tous les title par data-tt.

5. Langue visible : mastering « Universal, Fire, Clarity, Tape, Natural, Cinematic, Spatial, Punch » (noms BandLab, en anglais) ; « Limiter », « Universal » dans le pied ; pads « Gate, Stutter, Scratch » ; « Timestretch » dans la barre du clip ; « Pan / C » sur la console ; « 12-TET » dans l'échelle ; boîtes Dymo « TRIBUTE TO … » et étiquettes de recherche Freesound brutes « contact microphone metal, feedback, scream, electrical interference » ; noms de sons du kit « Drone, Pad, Acid bass, Gong » collés sur les clips (règle : jamais drone). Captures 1366x820_11_mastering.png, 1366x820_07_pads.png, 1366x820_04_barre_plus.png, 1366x820_32_boite_sortie.png, 1366x820_02_pistes_clips.png. Correction : table fr complète (Limiteur, Étirement, Panoramique / Centre, Porte, Bégaiement, Gamme tempérée 12) et pictogrammes à la place des noms de préréglages.

6. Loupe, onglet ♪ sur un son sans hauteur nette (Drone) : chaque clic empile une nouvelle barre de titre (2, 3, 4 barres après trois clics) et le spectre reste affiché. Captures 1366x820_34_loupe_drone_triple.png, 1366x820_05_loupe_scale.png. Correction : vider la barre .lt avant de la recréer, et griser ♪ quand aucune hauteur nette.

7. Direction artistique, surface principale : la piste (là où l'œil reste 90 % du temps) se compose d'aplats de couleur vectoriels sur fond noir uni, règle et grille plates. C'est l'écran le moins « kave » du studio, alors que la scène, l'oscilloscope, le VU-mètre et le disque sont des photographies réussies. Captures 1366x820_02_pistes_clips.png. Correction : grain de bande magnétique ou de papier millimétré photographié sous les clips, règle en bande de cuivre ou réglet photographié, lumière du tube en haut.

8. Branchements (scène → nœuds) : graphe vectoriel de type logiciel SaaS (rectangles plats, courbes de Bézier, pastilles orange) ; numéros blancs illisibles sur les nœuds clairs (01, 04, 21). Capture 1366x820_09b_branchements.png. Correction : baie de brassage photographiée (jacks, cordons) où chaque piste est une prise.

9. Grilles de cartes SaaS : mastering (25 cartes avec cases à cocher), résultats Internet Archive (cartes grises titre + licence), fiche de terrain de la loupe (formulaire de 9 champs). Captures 1366x820_11_mastering.png, 1366x820_19_archive_recherche.png, 1366x820_05_loupe_field.png. Correction : préréglages sur un commutateur rotatif photographié à 8 crans, résultats en fiches de bibliothèque ou étiquettes de bande.

10. Pied qui change de hauteur : sans sélection une rangée, avec un clip deux rangées, avec « Plus » trois rangées ; la zone des pistes perd ~100 px et saute (règle de continuité). Captures 1366x820_02, _03, _04. De plus « Plus » remplace les actions principales au lieu de les compléter. Correction : barre du clip de hauteur fixe, intégrée au clip ou dans une rangée réservée.

11. Proportions entre formats : en 390×844 la tête de piste prend 140 px sur 390 (36 %), la règle montre 2 mesures, le pied coupe « −14 S… » et rend LUFS, volume, préréglage et limiteur hors écran (mesure count.py : 5 commandes hors écran) ; avec un tiroir ouvert, 1,3 piste reste visible. En 844×390 le bouton EN sort de l'écran et la bibliothèque garde 300 px fixes. Captures 390x844_01_accueil.png, 390x844_06_console.png, 844x390_01_accueil.png. Correction : unités relatives (tête de piste en % de la largeur), pied à défilement signalé ou réduit aux pictogrammes.

12. Téléphone debout : la figurine recouvre la touche FX et masque la touche A de chaque piste. Capture 390x844_01_accueil.png. Correction : figurine sous les touches ou touches sur une seule colonne.

13. Téléprompteur incomplet : la fonction tele() (ligne 2436) ne traite que les boutons du pied. Hors pied, les libellés sont coupés : « Arrêt de bande » et « Scr » (pads), « Acid b » (clips), titres Internet Archive en points de suspension. En 844×390, les 7 libellés de la barre du clip défilent tous en même temps (« oupe », « anches », « écaler ») : bruit visuel. Captures 390x844_07_pads.png, 1366x820_19_archive_recherche.png, 844x390_04_barre_plus.png. Correction : appeler tele() sur tous les tiroirs et noms de clips, et supprimer le texte sous l'icône en paysage.

14. Petite taille : en 844×390, 42 à 145 éléments de texte sous 11 px ; console à 8,4 px ; graduations « -24 / -48 » qui se chevauchent sur chaque tranche. Mesure metrics.json (fontsUnder11), capture 1366x820_06_console.png. Correction : plancher à 11 px et graduations réduites à 0 / -12 / -48.

15. Console : 14 tranches sur 32 visibles en 1366, aucun bus maître dans la console, lettre « D » sans pictogramme. Capture 1366x820_06_console.png.

## Mineur

16. Page des sauvegardes : dates ISO « 2026-11-20 · 06h36 » au lieu de « 20 nov. 2026, 6 h 36 » ; empreintes git (e8c8ebf) affichées ; titre en texte blanc posé sur une photo de Dymo au lieu d'une vraie bande Dymo. Captures 1366x820_27_versions.png, 390x844_27_versions.png.
17. Même pictogramme (flèche courbe i-undo) pour Annuler et pour le retour de la dérive.
18. Film importé : la fenêtre vidéo flotte au-dessus des clips des pistes 01-02 et les cache. Capture 1366x820_25_film.png.
19. Bandes Dymo des boîtes : dessinées en CSS (dégradé + clip-path), pas photographiées ; bon rendu, mais hors règle « rien de dessiné ». Capture 1366x820_31_dymo.png.
20. Le clic sur une boîte d'artiste (« le studio prend sa forme ») ne change qu'un liseré sur la touche FX de la piste 01 ; l'effet reste quasi invisible. Capture 1366x820_32_boite_sortie.png.

## Question centrale : instrument ou empilement ?

Comptes mesurés (count.py, metrics.json) :
- commandes permanentes hors pistes et bibliothèque : 40 (1366) ; plus 9 commandes par piste × 32 pistes ;
- accueil 1366 : 126 commandes visibles, 406 mots affichés ; collections ouvertes : 1 332 commandes, 1 902 mots ;
- barre du clip : 4 actions + « Plus » qui en ouvre 13 ; palette Ctrl+K : 40 entrées ; mastering : 25 préréglages ; bibliothèque : 8 onglets de sources ;
- six tiroirs dans le pied, plus un second système de navigation par « Étapes 1 à 5 » (Alt+1…5) dans la palette, plus Dérive / Garder / Retour.

Fusions réussies : la loupe regroupe spectre, échelle et fiche de terrain ; la scène bascule vers les branchements ; la palette retrouve tout. Restes d'empilement : préréglage de mastering en double (pied et tiroir), deux navigations parallèles (tiroirs et étapes), id dupliqué bBack (preuve qu'une fonction a été posée sur une autre sans relecture), trois langages visuels côte à côte (photographie kave, aplats SaaS, graphe vectoriel). Verdict : un studio riche et en partie fusionné, encore loin d'un instrument unique.

Plus simple que BandLab ? Non, d'après les mesures ci-dessus : 40 commandes permanentes, 25 préréglages de mastering (BandLab en propose 8, dont le studio reprend les noms anglais), 8 sources de sons. Hypothèse non mesurée ici (BandLab non ouvert dans le bac à sable) : l'écran d'accueil de BandLab montre moins de commandes permanentes.

## Note DA / UI-UX : 5/10

La kave existe par endroits (scène photographique, oscilloscope, VU-mètre, platine, Dymo, figurines) et le français domine l'interface visible.
Mais la surface principale reste plate et SaaS, l'anglais persiste dans 19 infobulles et dans les noms clés, et le paysage téléphone rend console et platines inutilisables.
Le bouton Retour au début cassé et la loupe qui empile ses barres montrent un assemblage sans relecture d'ensemble.
