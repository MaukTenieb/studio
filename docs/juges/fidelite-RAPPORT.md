# Juge fidélité : rapport

Objet jugé : commit d96e21f (= versions/2026-11-20-06h36), servi figé sur http://localhost:8777 depuis /home/claude/judges/fidelite/site. À 12 h 18, index.html a changé dans /home/claude/studio sans commit (travail en cours d'une autre session). Pendant quelques minutes, ce fichier a planté au démarrage : « Cannot access 'TT_FR' before initialization », 0 piste chargée. Scripts, captures et sorties : /home/claude/judges/fidelite/ (t1.py à t18.py, open_fr.txt, drawers_fr.txt, d_*.png, film_*.png, kam_1366.png, v_*.png).

## Bloquant

1. Deux boutons portent l'id `#bBack`, ce qui casse le retour au début et le retour de la dérive.
   - Où : le bouton « Start » de la barre de transport (ligne 456) et le bouton « Back » de la dérive (ligne 506) ont le même id. Ligne 2240, `$("#bBack").onclick=setPos(...)`. Ligne 2462, `$("#bBack").onclick=()=>driftBack()`, et `$` vaut `querySelector`, qui ne trouve que le premier.
   - Ce qui se passe : le bouton de transport lance `driftBack()` au lieu de revenir au début. La touche Début (`$("#bBack").click()`) et l'entrée « Retour au début » de la palette (`clk("bBack")`) font la même erreur. Le vrai bouton « retour » de la dérive n'a aucun gestionnaire (`onclick` null). La consigne du registre « chaque retour les en éloigne » (`driftLearn(-1)`) ne se déclenche donc que par le mauvais bouton.
   - Preuve : test t2.py/t3.py. Avec `setPos(10)` puis un clic sur le bouton Start, la position reste 10 et le toast affiche « Retour ». L'inspection donne `[['Start','function','()=>driftBack()'],['Back','object',null]]`.
   - Correction : donner un id distinct au bouton de la dérive (par exemple `bDriftBack`) et y brancher `driftBack`. Le travail en cours non commité va dans ce sens.

## Grave : affirmations fausses du registre (REQUESTS.md)

2. « Dérive … touche « retour » » et « chaque retour les en éloigne » : faux en exécution (voir le point 1).
3. « chaînes « brise-voix » et « scie suédoise » » : en fr-FR, le menu « Preset de chaîne » affiche « Voice breaker » et « Swedish chainsaw » (t14.py). Les autres préréglages y restent aussi en anglais : Voice, Telephone, Robot, Space, Cathedral, Doubler, Noise wall, Old record, Shortwave, Bathroom, Live room, Hall, Church, Field ambience.
4. « Universal, Fire, Clarity, Tape, Natural, Cinematic, Spatial, Punch et 22 masterings du studio » : le tiroir Master affiche 8 + 17 = 25 masterings (t13.py). `MASTERS` en compte 26 avec Neutral.
5. « Collections : 926 entrées » : `COLL` contient 1 210 entrées (t7.py ; détail : arsenal 153, packs 241, taxonomie 91, instruments 149, artistes 35, etc.).
6. « Collection « Huit univers sonores » : 133 entrées » : 153 entrées en 9 familles. « Ethnography by region » (20) s'y ajoute, ce qui fait neuf univers sous le titre « Huit » (t6.py).
7. « noms des effets en français quand le studio parle français » : c'est vrai pour la liste « + effet » (FX_FR). C'est faux pour les réglages de chaque effet (Amount, Drive, Mix, Tone, Freq, Bits, « Rate ÷ », On/Off, vus après ouverture d'une boîte d'artiste dans t3.py), pour les préréglages de chaîne (point 3) et pour le sélecteur de mastering du pied de page (Neutral, Warm, Bright, Loud, Wide, Vintage, Bass boost, Vocal, Acoustic, Classical). Le tiroir Master traduit pourtant ces mêmes noms (Chaud, Brillant…).
8. « ses coupes deviennent des repères « plan n » sur la règle, réglés sur l'image exacte » : les coupes réelles de /home/claude/vid/film.webm tombent à 3,003 s et 6,003 s (ffmpeg, scène > 0,3, 25 i/s). Sur cinq essais (t9.py, t18.py), le studio a relevé 3,08/6,04 et 3,04/6,00 sur ordinateur, 3,00/6,00 sur téléphone debout, 3,08/6,16 sur téléphone couché. L'écart va donc de 0 à 4 images (160 ms) et varie d'un essai à l'autre. Avec 3,08/6,04, `fitTempo()` donne 119,15 BPM et ne cale qu'une coupe sur deux (`hit:1`). Avec les bonnes coupes, il donne 159,9 BPM et cale les deux.
9. Le registre parle de « kits Α à Ζ » (Musik, préréglages de chaîne) et de « 26 boîtes sous lettres grecques », Α à Ζ comprises (Α = « tribute to Whitehouse »). Les mêmes lettres désignent deux objets différents, et `CHAINS` contient Α…Μ en même temps que les boîtes Α…Ζ, Ν…Ω, α…θ (t4.py, t14.py). Les lettres capitales Η et la minuscule η désignent aussi deux objets.

## Grave : affirmations fausses du README

10. « ten chain presets (Voice, … Dub) » : le code en contient 33 (Α à Μ, Voice breaker, Swedish chainsaw, Old record, Shellac 78…).
11. « 23 mastering presets (Universal … Neutral) » : le code en contient 26. Natural, Cinematic et Spatial manquent dans la liste.
12. « Internet Archive … seventeen listening categories » : le code en contient 33. « Freesound gets sixteen quick searches » : le code en contient 21 (t7.py).
13. « The studio skips the 78rpm and bootleg collections, whose public-domain labels rest on uploader statements disputed in court » : les catégories « 78 tours », « 78 · Jazz », « 78 · Blues » et « 78 · Monde » retirent ce filtre (`parts.splice(parts.indexOf(IA_SKIP),1)`). Le README contredit le code. Il contredit aussi le registre, qui range ces 78 tours parmi les collections « sous licence libre ».
14. « the chain presets add the six kits Α to Ζ » : il y en a douze (Α à Μ). Un autre paragraphe du même README dit d'ailleurs « Α to Μ ».
15. « The collections count about 900 entries » : 1 210 en réalité.
16. Coquille : « Every track has each with volume… ».

## Important

17. En locale fr-FR, une grande partie de l'interface reste en anglais (t1.py → open_fr.txt, t2.py → drawers_fr.txt ; `lang` vaut bien « fr »).
   - Infobulles de la barre du haut : Start, Play / Stop (Space), Record (R), « Bar, beat, sixteenth », Metronome, Loop (L), Snap, « Seconds, no tempo », Commands (Ctrl+K), Undo (Ctrl+Z), New project, Export WAV + credits, Language.
   - Infobulles des pistes : Mute, Solo, Arm. Pied de page : Console, Perform, Steps, Stage, Decks, Drift, Keep, Back, Mastering, Loudness, Measure LUFS, Master volume, Limiter. Panneau latéral : Lyrics, Files, Panel, Freesound key.
   - Textes visibles : « Export », « Limiter », « Preset de chaîne » (franglais), « Timestretch » dans la barre « Plus » du clip, « Clear » dans le rack, Lock (pads), Pitch (platines), Pan, Auto (console).
   - Familles de collections : Orchestra, World and microtonal, Field ethnography, Ethnography by region.
   - Noms des sons du kit synthétisé : Kick, Hard kick, Snare, Clap, Hat, Open hat, Acid bass, Pluck, Drone, Noise riser, Lorenz drone, Logistic noise, Henon glitch, Chua buzz, Anvil, Sheet metal, Steam burst, Chain drag, Machine hum, Vinyl crackle, Needle drop, Record scratch, Tape hiss, Radio static, Shortwave sweep, Earth rumble, « Infra beat 7 Hz on 40 Hz », Additive choir, Plucked string…
   - Noms des sons de la Borne : bell-1, creak-1, knock-1, relay-1, timer-1…
   - Correction : passer tous les `title=` statiques par `data-tt`, et traduire les sons, les préréglages et les réglages par une table fr.
18. Une rangée du séquenceur est une piste (PENSE-BETE), et son menu propose « 01 Kick », « 01 Snare », « 01 Hat », « 01 808 kick »… (t11.py). Une fois choisie, la rangée de la piste 01 s'affiche « 01 Kick ». C'est le nom de piste interdit, présenté autrement. Correction : afficher la rangée sous « 01 » et le nom du Mask, et donner aux sons des noms français descriptifs.
19. Les sauvegardes datées partagent le projet en cours. Elles s'ouvrent toutes sans erreur (t8.py, 7/7, aucune ressource en 404 grâce à `<base href="../../">`). Elles lisent pourtant la même base IndexedDB « studio » et la même clé `proj/cur` : un clip posé dans la version courante apparaît dans les sept anciennes. Une modification faite dans une ancienne version écrase le projet courant par `save()`. « Rembobiner » rembobine le code, pas le projet. Correction : préfixer la base IndexedDB par la date de la sauvegarde, ou ouvrir les anciennes versions en lecture seule.
20. Le calage du tempo sur l'image ne produit qu'un BPM constant (`fitTempo` → `{bpm,hit,n}`). Il ne fait ni accélération ni ralenti, alors que l'annexe ce4e974a §1 (« recalculer les variations de tempo ») et l'annexe 3a2fdb20 §5 (rubato sur les coupes) le demandent. La musique de film reste donc partielle dès qu'il y a plus de deux coupes irrégulières.

## Mineur

21. Les infobulles des figurines utilisent les identifiants internes, et non les noms canoniques : « croisiere noire », « hatra loves », « tsui pen », « c7h5n3o6 » au lieu de Croisière Noire, Hátra Lövés, Ts'ui Pên, C7H5N3O6 (open_fr.txt). `FAUNA_N` existe déjà : il suffit de l'utiliser.
22. PENSE-BETE demande une « sauvegarde datée avant chaque lot et après chaque lot ». Entre 05h32 et 05h57, trois lots ont été commités sans sauvegarde (e446b53, 504017f, 61d765c).
23. Le rack propose S950 alors qu'aucune annexe ne nomme cette machine. Les annexes nomment MPC3000, et le rack n'en a pas (règle « noms tirés des annexes »).

## Vérifié conforme

- Zéro MIDI : 0 occurrence dans index.html, README.md, worker.js et les 7 sauvegardes. Les 2 occurrences de REQUESTS.md se trouvent dans la rubrique « Écarté ».
- Pistes : 32 pistes nommées 01 à 32 à l'ouverture, toutes vides. Les Masks des pistes 01 à 18 changent d'ordre à chaque session (t15.py, 3 sessions).
- Couleurs : les 18 couleurs de `FAUNA_C` sont identiques à celles de insertkoin/kg-core.js. La couleur de chaque piste et de ses clips vaut `FAUNA_C[SESSION_MASKS[i]]` sur les 32 pistes (t3.py).
- Clip raccourci : le bord droit réduit `len` (4 → 2,75 s, `off` inchangé). Le bord gauche avance `start` et `off` ensemble (1,75/0,75, len 2). Aucun `playbackRate` ne touche l'audio, et la forme d'onde est recadrée par `o0=c.off` (t10.py et lecture de code). Le découpage (`splitSel`) coupe aussi le son sans le tasser.
- Pistes 19 à 32 : une vidéo placée dans `borne-vid` s'affiche sur la piste 19. Un double-clic y pose son son (t17.py).
- Boîtes d'artistes : 26 étiquettes Dymo sous lettres grecques, avec « tribute to … ». Une boîte prépare le rack (Α : anneau → larsen → écraseur → distorsion) et propose des recherches et des gestes (t3.py).
- Musique de film : la vidéo s'affiche à l'écran, se synchronise sur la lecture (écart de 60 à 120 ms en mesure Playwright), son son va sur la piste 19, ses coupes deviennent des repères « plan n », et le film revient au rechargement sur les trois formats (t9.py).
- Séquenceur : longueur impaire à l'ouverture (19, 21, 17), longueurs de rangée de 3 à 32, décalage de ±40 ms, probabilité, euclidien. Console de 33 tranches avec envoi dub momentané.

## Recommandations des annexes absentes ou partielles

Sont écartés le MIDI, GESTURE-NET, MPE, les keyswitches, la séparation par IA, l'abandon des pistes et la collaboration en temps réel.

1. Repères magnétiques : `snapT` ignore les coupes et les notes de terrain (ebaaec20 §3). Absent. Important.
2. Micro-accordage : l'outil « Échelle » analyse et compare, mais ne réaccorde ni un clip ni le séquenceur sur un maqâm, un raga ou un slendro, et ne lit pas les fichiers Scala (ce4e974a §2, 3a2fdb20 §4, 33909378 §7). Partiel. Important.
3. Paulstretch : étirement plafonné à ×64 et à 600 s. Un son de 2 s ne dépasse donc pas 128 s, alors que l'annexe demande 2 s → 20 min (ebaaec20 §1). Partiel. Important.
4. Filtres passe-haut et passe-bas résonants sur chaque tranche de la console dub : la tranche ne contient que M, S, D, Pan et le fader (ebaaec20 §4, t16.py). Absent. Important.
5. Tempo variable calé sur plusieurs coupes : voir le point 20. Partiel.
6. Vitesse de bande de l'écho dub manipulable en direct : le délai du bus dub est fixé sur le tempo (ebaaec20 §4). Absent. Mineur.
7. Mutations aléatoires de hauteur et d'intensité dans le séquenceur (ebaaec20 §2). Absent. Mineur.
8. Analyse de phase et de corrélation des très basses fréquences (ebaaec20 §1). Absent. Mineur.
9. Gel infini avec dérive de hauteur : la tenue s'arrête à environ une minute et le gel spectral à 120 s (ebaaec20 §1). Partiel. Mineur.
10. Spatialisation 3D (au-dessus, derrière, ambisonique, HRTF) : la scène ne place les sons qu'en largeur et en profondeur (ebaaec20 §3, 33909378 §4). Partiel. Mineur.
11. Positions de micros d'orchestre (proche, arbre Decca, ambiance) par pupitre (ce4e974a §1, 33909378 §6). Absent. Mineur.
12. Spectrogramme modifiable au pinceau, puis grains manipulables au zoom maximal (3a2fdb20 III, ebaaec20 §3) : seule une gomme rectangulaire existe. Partiel. Mineur.
13. Plusieurs régimes de temps à la fois, propres à chaque piste (3a2fdb20 §5) : le mode secondes s'applique au projet entier. Partiel. Mineur.
14. Réponses impulsionnelles mesurées sur du vrai matériel (Space Echo, ressort Fisher, consoles) : le studio les modélise sans captations (33909378 §5). Partiel. Mineur.
15. Coloration MPC3000 (33909378 §3, ebaaec20 §2). Absente. Mineur.

## Hypothèses (non vérifiées)

- Le bus dub n'est pas créé dans les rendus hors ligne (`if(!(c instanceof OfflineAudioContext))dub.connect(...)`). Un dub joué en direct ne s'entend donc pas à l'export, sauf s'il est enregistré sur une piste. Je ne l'ai pas mesuré à l'export.
- « Voice breaker / brise-voix » ressemble à un nom forgé (règle « aucun nom inventé »). Je n'en ai pas trouvé la source dans les annexes.

## Note : 5/10

Les règles dures sont tenues et vérifiées en exécution : zéro MIDI, 32 pistes numérotées, couleurs canoniques, clip coupé sans tassement, pistes KamOrhogo, boîtes, film, sauvegardes jouables.
Le retour au début ne marche plus, ni par le bouton, ni par la touche Début, ni par la palette, et le retour de la dérive est inerte : une fonction de base est cassée.
Le registre et le README affirment des faits faux (chiffres, noms français annoncés mais anglais à l'écran, calage « à l'image exacte »), et l'interface en fr-FR reste en grande partie anglaise.
