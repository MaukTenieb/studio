# Expert 02 : dub pointu

Étalons : King Tubby et sa table MCI, Lee « Scratch » Perry et le Black Ark, Scientist, Mad Professor, Adrian Sherwood et On-U Sound, Basic Channel et Rhythm & Sound, le Roland RE-201 Space Echo.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| Design | 5,7 |
| Direction artistique | 6,4 |
| Puissance | 4,8 |
| Ergonomie | 5,1 |
| Simplicité intuitive | 5,5 |
| Exhaustivité | 4,9 |
| Pertinence | 5,5 |
| Originalité | 5,8 |
| Plaisir potentiel | 4,5 |
| Moyenne générale | 5,4 |

Trois écarts les plus graves : le dub joué à la console ne sort jamais à l'export (02-01) ; le réglage de réinjection « D ⟲ » change moins de 3 dB sur les cinq premières secondes de répétitions, de 0 à 1,05 (02-02) ; la touche D disparaît sur téléphone couché, et le réglage « D ⟲ » se place hors de l'écran sur téléphone (02-04).

## Méthode et limites

- Copie locale servie sur http://localhost:8765/, Chromium sans tête, harnais `/home/claude/outil/harnais.py`. Formats : iPhone 13 debout et couché, au doigt (`tap`, `toucher_long`) ; 1 366 × 768 à la souris.
- Effets de Musik : le harnais ne sert pas `musik-fx.js` à l'AudioWorklet (Playwright ne route pas les requêtes de worklet). Pour l'écho de bande, j'ai remplacé l'URL du module par un Blob du fichier local `/home/claude/insertkoin/musik-fx.js`, chargé avant la page. Les mesures de l'écho de bande viennent de ce montage.
- Charge de la machine : moyenne de 47 à 57 sur 2 cœurs pendant toute la session (dix experts en parallèle). Les secondes comptées ci-dessous sont gonflées par cette charge. Un export WAV d'un clap de 0,4 s demande 125 s ; l'export d'un écho à 0,95 (60 s de queue) dépasse 15 min et n'aboutit pas.
- Prise du son en direct : j'ai branché un ScriptProcessor sur `ctx.destination` (script d'initialisation). Sous cette charge, la lecture reste inexploitable : un clap de 0,4 s se répète 37 fois en 7 s (fichier `/tmp/expert02/live_dub_fb0.7.wav`), l'ordonnanceur rattrape son retard. Aucun chiffre de ce rapport ne vient de cette prise. Les mesures du bus dub passent donc par sa propre fonction `dubBus` (ligne 1014) dans un `OfflineAudioContext`, comme le juge son ; celles du rack passent par `renderOffline` (ligne 1295), la fonction de l'export, ou par l'export WAV réel du dialogue.
- Source de mesure : le son « Clap » du kit (0,4 s), ou une salve de 0,25 à 0,5 s à 60 Hz ou 440 Hz. Tempo 120, sauf mention.
- Fichiers audio : `/tmp/expert02/`. Mesures : `/home/claude/outil/mesure.py` et un comptage des crêtes par période d'écho.

## Scénarios

| N° | Scénario | Résultat attendu, mesurable |
|---|---|---|
| S1 | Débutant : trouver le dub en partant de l'accueil | boîte dub ouverte en 3 touchers au plus |
| S2 | Sortir la boîte « tribute to King Tubby » | le studio prêt à dubber : sons, envois, écho, filtre |
| S3 | Atteindre la touche D et le réglage de réinjection | cibles de 44 px, les deux visibles sans défilement |
| S4 | Stabilité de la réinjection du bus dub, réglage de 0 à 1,05 | décroissance réglable, du coup sec à l'auto-oscillation bornée |
| S5 | Exporter un passage dub joué à la touche D | les répétitions du bus dub présentes dans le WAV |
| S6 | Écho du rack à 0,95 en export | ni montée ni emballement, extinction sous −60 dB avant la coupure |
| S7 | Chaîne « Dub » du rack, export WAV réel | décroissance des répétitions conservée, queue entière |
| S8 | Écho de bande de Musik à 0,65 et 1 | répétitions qui pleurent, queue entière à l'export |
| S9 | Sirène dub et laser analogique | trouvés en 3 touchers, emballement dosé, niveau compatible avec un mix |
| S10 | Travail du sub dans le bus dub | sub sec : répétitions sans grave sous 100 Hz |
| S11 | Coupes de pistes en direct et lancer d'écho aux pads | coupe sans clic, queue d'écho qui meurt seule |

### S1 Trouver le dub

- iPhone debout, au doigt : « Artist boxes », « Dub », « Χ tribute to King Tubby » : 3 touchers, 28,8 s sous charge ([capture](../captures/02-boite-king-tubby-iphone.webp)). Cible de la boîte : 352 × 44 px.
- 1 366 × 768, à la souris : 3 clics, 11,6 s ([capture](../captures/02-boite-king-tubby-pc1366.webp)).
- Le groupe Dub contient trois boîtes : Χ King Tubby, Ψ Lee « Scratch » Perry, Ω Adrian Sherwood (lignes 2920 à 2922). Scientist, Mad Professor et Basic Channel n'ont pas de boîte.

### S2 Sortir la boîte King Tubby

Mesure de l'état après le clic : tempo 74, réinjection `dubFb` 0,55, piste 01 avec Filtre (passe-haut 180 Hz) et Égaliseur, compresseur sur le master, aucune autre piste modifiée. La boîte ne pose aucun son, n'ouvre pas la console, n'arme aucun envoi dub. Elle affiche quatre étiquettes de recherche en anglais (« one drop drums », « reggae bass », « skank guitar », « dub siren ») et un geste « Arrêt de bande ». Ces étiquettes lancent une recherche Freesound, qui demande une clé personnelle ; la sirène interne du studio n'est pas proposée.

### S3 Atteindre la touche D

- iPhone debout : « ⋯ », clé (Atelier), console : 3 touchers, 21,7 s sous charge. Touche D : 48 × 22 px (32 touches, 7 visibles). Les faders et les numéros de tranche sont coupés par la hauteur du tiroir ([capture](../captures/02-console-iphone.webp)). Le réglage « D ⟲ » se trouve sur la tranche Master, à x = 1 920 px dans une console large de 390 px : il faut faire défiler 32 tranches pour l'atteindre. Libellé « D ⟲ » : 9,6 px.
- iPhone couché : 3 touchers, 13,9 s. Le tiroir mesure environ 60 px de haut : seules les touches M, S et FX apparaissent, sans lettres ; la touche D sort de la zone visible ([capture](../captures/02-console-iphone-paysage.webp)).
- 1 366 × 768 : Atelier, puis console : 2 clics ([capture](../captures/02-console-pc1366.webp)).
- La touche D agit tant qu'on appuie (`pointerdown`, rampe de 6 ms, ligne 1617). Le doigt et la souris la déclenchent de la même façon.

### S4 Stabilité de la réinjection du bus dub

Salve de 440 Hz, 0,25 s, dans `dubBus` (code de la ligne 1014), rendu de 30 s. Niveau efficace sur 0,5 s :

| Réglage « D ⟲ » | 1 s | 3 s | 5 s | 10 s | 20 s | NaN |
|---|---|---|---|---|---|---|
| 0 | −18,6 | −39,8 | −57,2 | −104,4 | −215,7 | 0 |
| 0,35 (défaut) | −18,4 | −41,5 | −60,5 | −97,2 | −138,6 | 0 |
| 0,7 | −18,9 | −41,8 | −58,2 | −69,2 | −81,3 | 0 |
| 1,05 (maximum) | −18,5 | −40,0 | −57,0 | −74,6 | −90,9 | 0 |
| 0 à 74 bpm | −19,3 | −28,8 | −39,8 | −71,4 | — | 0 |

- Aucune montée, aucun emballement, zéro NaN : le bus reste stable à tout réglage.
- Sur les cinq premières secondes, celles qu'on entend, les quatre réglages donnent le même niveau à 3,5 dB près. Le réglage n'agit qu'au-dessous de −55 dBFS.
- Le code l'explique : la réinjection de l'écho `dfb` est figée à 0,6 (ligne 1016) ; le réglage pilote seulement le retour du ressort, `sfb = min(0,45 ; réglage × 0,6)` (ligne 1020). Au-dessus de 0,75, le réglage ne change plus rien. Entre 0,7 et 1,05, la queue à 10 s varie de −69,2 à −74,6 dB, dans le mauvais sens : la réponse du ressort se tire au hasard à chaque construction (`Math.random`, ligne 1008).
- Le temps d'écho reste fixé à 3/4 de temps (0,375 s à 120 bpm, ligne 1016) ; seul le tempo du projet le change.
- Sur un RE-201, la commande Intensity règle la réinjection et les valeurs hautes mènent à l'auto-oscillation ; Repeat Rate règle le temps d'écho en direct (manuel UA, https://help.uaudio.com/hc/en-us/articles/33538271334164-Roland-RE-201-Space-Echo-Manual). Le studio n'offre ni l'un ni l'autre.

### S5 Exporter un passage dub

- `buildChain` ne relie l'envoi dub au bus que hors rendu : `if(!(c instanceof OfflineAudioContext))dub.connect(dubBus(c,dest))` (ligne 1038).
- Aucun appui sur D n'est enregistré : `PROJ_KEYS` (ligne 1059) garde `dubFb` seul, aucune automation d'envoi n'existe.
- Le seul enregistreur de sortie (`DK.rec`, ligne 2781) prend le bus des platines, pas le master.
- Résultat : zéro répétition du bus dub dans un WAV, un MP3 ou un ZIP de pistes. Constat par lecture du code ; la prise en direct reste inexploitable sous la charge de la session (voir Méthode).

### S6 Écho du rack à 0,95

Clap, Écho seul, retour 0,95, dosage 1, sans ping-pong, rendu de 30 s par le code de l'effet (`/tmp/expert02/r_echo095.wav`) : crête −8,3 dBFS, puis −13,8 ; −17,8 ; −21,7 ; −25,5 dBFS toutes les 2,5 s, soit −1,5 dB par seconde, régulier. Zéro NaN, aucune montée. Extinction calculée : −60 dB sous la crête vers 37 s ; la queue d'export prévue est de 60 s (`tailSec`, ligne 1292). Le défaut du juge son (+14 dB en 14 s) a disparu.

### S7 Chaîne « Dub » du rack, export WAV réel

Clap, chaîne « Dub » choisie dans le menu du rack (Filtre 2,5 kHz, Écho 0,75 retour 0,75 ping-pong, Réverbération), export « WAV mix » du dialogue ([capture](../captures/02-rack-chaine-dub-pc1366.webp)) : `/tmp/expert02/exp_clap_chaineDub.wav`, 12,53 s, crête −1,92 dBFS, vraie crête −1,66 dBTP, −14,6 LUFS.

- Crêtes par période de 0,375 s : les 15 premières à −1,9 ou −2,0 dBFS, puis −3,8 ; −6,6 ; −9,4 … −26,4 dBFS. La cible de sonie de −14 LUFS relève un clap isolé de plusieurs dizaines de dB, puis le limiteur écrase les répétitions au niveau du coup : la décroissance de l'écho disparaît sur 5,6 s.
- Le fichier s'arrête à 12,53 s alors que la dernière répétition sonne encore à −26,4 dBFS de crête (−55,7 dBFS efficace sur les 50 dernières ms). `tailSec` calcule la queue avec le temps d'un seul passage, alors que le ping-pong double la boucle (deux lignes de retard, ligne 768).
- Le même clap sans effet exporté : 3,53 s, −14,4 LUFS, crête −1,92 dBFS.

### S8 Écho de bande de Musik

Clap, « Écho de bande » seul, rendu par `renderOffline` (fonction de l'export) :

- dosage 0,65 : crêtes par 0,5 s −2,0 ; −8,2 ; −16,0 ; −25,6 ; −37,1 … −70,0 dBFS à 10 s, soit environ −6,8 dB par seconde. La queue finit sous −60 dB avant la coupure.
- dosage 1 : −2,0 ; −3,5 ; −5,0 ; −7,9 ; −11,7 ; −15,8 ; −20,0 ; −22,2 dBFS à 10 s, puis −69,4 dBFS sur la dernière demi-seconde. Aucune montée, mais l'export coupe la queue à −22 dBFS de crête : `tailSec` donne 10 s fixes à `mz_tape` (ligne 1293), quel que soit le dosage.
- La boucle de Musik ajoute pleurage (0,55 Hz) et scintillement (6,8 Hz) et sature en tanh (`musik-fx.js`, lignes 43 à 45) : c'est le seul écho du studio qui bouge comme une bande.

### S9 Sirène dub et laser analogique

- Palette (Ctrl+K ou ⌘ dans « ⋯ » sur téléphone), « siren », Entrée : 3 touchers et 5 lettres sur iPhone, 13,6 s ; la sirène se pose sur la piste 01 ([capture](../captures/02-sirene-posee-iphone.webp)). La recherche de la bibliothèque, elle, ne la trouve pas : « sirène », « Sirène dub », « laser » et « dub » renvoient seulement Internet Archive ou rien ([capture](../captures/02-recherche-sirene-pc1366.webp)).
- Sirène (`/tmp/expert02/nb_sirene.wav`) : 7,00 s, crête −1,76 dBFS, −2,1 LUFS. Crêtes par période d'écho de 0,375 s : −13,5 ; −2,1 ; −1,8 ; −1,8 ; −1,8, puis −4,0 dBFS sans décroître jusqu'à 7 s. L'écho atteint la saturation et s'y maintient : emballement borné, sans montée au-delà de −1,8 dBFS. Puis un fondu forcé de 0,4 s coupe tout à 7 s (−28,1 dBFS sur les 50 dernières ms).
- Laser (`/tmp/expert02/nb_laser.wav`) : 5,00 s, crête −3,09 dBFS, −1,4 LUFS, plateau à −4,0 dBFS de 0,6 s à 5 s, même coupure.
- Les deux sons sortent normalisés à −1 dBFS de crête (`capPeak`, ligne 1886) : −2,1 et −1,4 LUFS, soit 12 LU au-dessus de la cible de −14 LUFS. Longueur, temps d'écho, retour et hauteur restent figés (lignes 1909 à 1912).

### S10 Travail du sub dans le bus dub

Salve de 0,5 s dans `dubBus` : à 60 Hz, crête des répétitions −23,7 dBFS ; à 440 Hz, −6,2 dBFS. Le passe-haut de 160 Hz de la boucle (ligne 1016) retire 17,5 dB à 60 Hz : la basse et le grave restent secs pendant que les aigus partent en écho. Le sous-grave du rack (« sub », ligne 2911) existe ; je ne l'ai pas mesuré.

### S11 Coupes en direct et lancer d'écho aux pads

- Coupe : touche M de la tranche (33 × 36 px sur iPhone, 26 × 26 px à 1 366 × 768). La coupure suit une rampe de 5 ms (`setTargetAtTime(…, .005)`, ligne 1201). Pas de mesure audible possible sous la charge de la session.
- Pads, mode Écho : X choisit la division, Y la réinjection jusqu'à 0,92 (ligne 1745). Au relâchement, le retour s'éteint avec une constante de 0,4 s puis l'effet se détruit à 4 s (ligne 1754) : les répétitions s'arrêtent avec le doigt, alors qu'un lancer dub coupe l'entrée et laisse la boucle mourir. Lecture du code ; la prise en direct reste inexploitable.

## Notes par scénario

D : design ; DA : direction artistique ; P : puissance ; E : ergonomie ; S : simplicité ; X : exhaustivité ; Pe : pertinence ; O : originalité ; Pl : plaisir potentiel.

| Scénario | D | DA | P | E | S | X | Pe | O | Pl | Moy. | Preuve principale |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 trouver le dub | 7 | 7 | 5 | 6 | 6 | 6 | 7 | 7 | 6 | 6,3 | 3 touchers ; étiquettes Dymo ; 3 boîtes dub sur les 4 écoles citées |
| S2 boîte King Tubby | 6 | 6 | 3 | 6 | 7 | 3 | 5 | 6 | 4 | 5,1 | tempo 74, `dubFb` 0,55, Filtre + Égaliseur ; zéro son, zéro envoi |
| S3 touche D | 4 | 7 | 5 | 2 | 4 | 6 | 6 | 6 | 4 | 4,9 | D 48 × 22 px ; D cachée en paysage ; « D ⟲ » à x = 1 920 |
| S4 réinjection du bus | 6 | 6 | 4 | 4 | 5 | 4 | 4 | 6 | 3 | 4,7 | ±3,5 dB à 5 s de 0 à 1,05 ; `dfb` figé à 0,6 |
| S5 export du dub | 5 | 6 | 1 | 3 | 3 | 1 | 2 | 5 | 2 | 3,1 | ligne 1038 ; aucun D enregistré |
| S6 écho du rack 0,95 | 6 | 6 | 7 | 6 | 6 | 7 | 7 | 5 | 7 | 6,3 | −1,5 dB/s, zéro NaN, queue de 60 s |
| S7 chaîne Dub exportée | 6 | 6 | 5 | 6 | 6 | 6 | 5 | 5 | 4 | 5,4 | 15 répétitions à −1,9 dBFS ; coupure à −26,4 dBFS |
| S8 écho de bande | 6 | 7 | 6 | 6 | 6 | 6 | 6 | 7 | 5 | 6,1 | pleurage et tanh ; coupure à −22 dBFS au dosage 1 |
| S9 sirène et laser | 6 | 7 | 5 | 7 | 6 | 4 | 6 | 6 | 5 | 5,8 | −2,1 et −1,4 LUFS ; plateau à −4 dBFS ; fondu forcé |
| S10 sub sec | 6 | 6 | 7 | 6 | 6 | 6 | 8 | 6 | 6 | 6,3 | −17,5 dB à 60 Hz dans les répétitions |
| S11 coupes et pads | 5 | 6 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 4,9 | M 33 × 36 px ; queue des pads coupée au relâchement |
| Moyenne | 5,7 | 6,4 | 4,8 | 5,1 | 5,5 | 4,9 | 5,5 | 5,8 | 4,5 | 5,4 | |

## Comparaison aux outils de référence

| Geste dub | Référence | Studio |
|---|---|---|
| Réinjection jusqu'à l'auto-oscillation | RE-201 : Intensity, « Higher values will cause self-oscillation » (https://help.uaudio.com/hc/en-us/articles/33538271334164-Roland-RE-201-Space-Echo-Manual) | bus dub : réinjection de l'écho figée à 0,6 ; le réglage agit sous −55 dBFS |
| Temps d'écho en direct | RE-201 : Repeat Rate, temps d'écho réglable (même source) | figé à 3/4 de temps ; seul le tempo du projet le change |
| Trois têtes, ressort | RE-201 : trois têtes de lecture, 12 combinaisons, ressort (même source) | une tête, ressort synthétisé tiré au hasard |
| Filtre passe-haut de table | table MCI de King Tubby : grand bouton rouge « Hi Pass Filter », le « Big Knob » (https://mopop.emuseum.com/objects/95703/mci-mixing-console-formerly-owned-and-operated-by-king-tubby) | aucun filtre sur la tranche ; un Filtre s'ajoute dans le rack, à 4 touchers |
| Envois d'écho à la volée | table de mixage : envoi auxiliaire par tranche | touche D par tranche, momentanée : présente |
| Mix dub gravé | sortie de la table enregistrée sur bande | aucun enregistrement du master ni des appuis D |
| BandLab | le relevé (BANDLAB-RELEVE.md, sources https://help.bandlab.com/hc/en-us/articles/115004496573-Using-the-Looper et https://help.bandlab.com/hc/en-us/articles/115002959894-Using-the-Drum-Machine) liste Filter, Gater, Stutter, Tape Stop au Looper, aucun envoi d'écho par piste | le studio dépasse BandLab : bus dub, touche D, écho de bande, sirène, trois boîtes dub |

## Écarts

### 02-01 Le dub joué à la console ne sort jamais à l'export — bloquant

- Preuve : ligne 1038, l'envoi dub n'est pas relié dans un `OfflineAudioContext` ; `PROJ_KEYS` (ligne 1059) n'enregistre aucun appui D ; `DK.rec` (ligne 2781) enregistre les platines seules.
- Correction :
  1. Relier l'envoi au bus aussi hors ligne : `dub.connect(dubBus(c,dest))` sans condition.
  2. Enregistrer chaque appui D en automation de l'envoi pendant la lecture (`tr.auto.dub`, points `{t,v}`), rejouée par `schedAuto` en direct et à l'export, visible comme une ligne orange sous le clip.
  3. Ajouter une touche ● « graver le master » qui enregistre `master.tail` sur une piste libre (MediaStreamDestination, comme ligne 2781).

### 02-02 Le réglage « D ⟲ » ne change pas la longueur audible des répétitions — bloquant

- Preuve : S4, niveaux à 5 s entre −57,0 et −60,5 dB de 0 à 1,05 ; `dfb` figé à 0,6 (ligne 1016) ; `min(.45, réglage × .6)` rend le réglage inerte au-dessus de 0,75 (ligne 1020).
- Correction : le réglage pilote `dfb` de 0 à 1,1, la saturation `sat` déjà dans la boucle borne l'auto-oscillation, le limiteur à −3 dB reste en sortie ; le ressort passe sur un second réglage. Graduation linéaire, sans plafond caché. Objectif mesurable : à 5 s, −80 dB à 0 et −20 dB stables à 1,1.

### 02-03 Temps d'écho du bus figé — important

- Preuve : `dl.delayTime = spb() × 0,75` (lignes 1016 et 1020), aucune commande.
- Correction : un réglage de temps sur la tranche Master (pictogramme de bobine), de 1/16 à 1 mesure, plus une position libre ; changement par `setTargetAtTime` de 0,1 s, qui fait glisser la hauteur des répétitions comme le Repeat Rate du RE-201.

### 02-04 Touche D et réglage « D ⟲ » hors d'atteinte sur téléphone — bloquant

- Preuve : S3, D en 48 × 22 px debout ; D invisible couché ; « D ⟲ » à x = 1 920 px ; libellé à 9,6 px ; faders coupés debout ([capture](../captures/02-console-iphone.webp), [capture](../captures/02-console-iphone-paysage.webp)).
- Correction : D à 44 px de haut au moins ; tranche Master épinglée au bord droit de la console (`position: sticky; right: 0`) ; hauteur du tiroir console au moins 180 px couché ; libellés à 11 px au moins, ou un pictogramme seul.

### 02-05 Le mastering de l'export écrase la décroissance des échos — important

- Preuve : S7, les 15 premières répétitions à −1,9 dBFS, comme le coup sec.
- Correction : borner le relèvement de `masteredRender` (ligne 1313) à +6 dB et la réduction du limiteur à 3 dB ; au-delà, garder le niveau et afficher l'écart à la cible dans le pied (« −9,8 LUFS d'écart »).

### 02-06 Queues d'écho coupées à l'export — important

- Preuve : chaîne Dub coupée à −26,4 dBFS de crête (S7) ; écho de bande au dosage 1 coupé à −22,2 dBFS (S8).
- Correction : dans `tailSec` (lignes 1292 et 1293), doubler le temps quand `p.pp` vaut 1 ; pour `mz_tape`, calculer la queue d'après le dosage (par exemple 10 + 50 × amt s, plafond 60 s), comme pour l'Écho.

### 02-07 Sirène et laser figés et trop forts — important

- Preuve : S9, −2,1 et −1,4 LUFS ; 7 s et 5 s fixes ; fondu forcé de 0,4 s ; aucun réglage.
- Correction : jouer la sirène en direct sur un pad (X hauteur de 300 à 1 200 Hz, Y vitesse du LFO de 1 à 12 Hz, doigt levé = son coupé) et l'envoyer dans le bus dub ; rendre les versions posées à −18 LUFS ; laisser l'écho finir sous −60 dB au lieu du fondu.

### 02-08 La boîte King Tubby prépare peu — important

- Preuve : S2, filtre et égaliseur sur la piste 01, tempo 74, réinjection 0,55 ; aucun son posé, aucun envoi, console fermée ; étiquettes en anglais qui renvoient vers Freesound avec clé.
- Correction : la boîte pose la sirène interne et un coup de ressort, ouvre la console, place un filtre passe-haut sur deux pistes ; les étiquettes passent en pictogrammes ou en français ; « dub siren » ouvre la sirène interne.

### 02-09 Pas de filtre sur la tranche de console — important

- Preuve : la tranche contient M, S, FX, D, Pan, fader (ligne 1617) ; le juge fidélité l'avait déjà noté.
- Correction : un bouton rotatif par tranche, passe-bas à gauche, passe-haut à droite, neutre au centre (biquad de 20 Hz à 20 kHz, résonance 0,9), comme le « Big Knob » de la table MCI.

### 02-10 Le ressort change à chaque construction du bus — détail

- Preuve : `Math.random` dans `springIR` (ligne 1008) ; à réglage plus haut, queue plus courte (S4 : −69,2 dB à 0,7, −74,6 dB à 1,05).
- Correction : générateur pseudo-aléatoire à graine fixe.

### 02-11 La recherche de la bibliothèque ignore la sirène et le laser — détail

- Preuve : S9, « sirène », « laser », « dub » ne renvoient aucune boîte à bruit.
- Correction : indexer `NB_LIST` et `NB_FR` (lignes 1882 et 1883) dans la recherche.

### 02-12 Les pads Écho coupent la queue au relâchement — détail

- Preuve : ligne 1754, retour éteint en 0,4 s puis effet détruit à 4 s.
- Correction : au relâchement, couper l'entrée de l'écho et garder la boucle jusqu'à −60 dB.

## À garder tel quel

- Le bus dub stable à tout réglage : zéro NaN, aucune montée, limiteur à −3 dBFS (S4).
- Le passe-haut de 160 Hz dans la boucle : −17,5 dB à 60 Hz, sub sec (S10).
- La touche D momentanée par tranche, avec rampe de 6 ms, au doigt comme à la souris.
- L'Écho du rack stable à 0,95 : −1,5 dB par seconde, queue d'export de 60 s (S6).
- L'écho de bande de Musik, avec pleurage, scintillement et saturation (S8).
- La sirène et le laser en 3 touchers par la palette (S9).
- Le groupe Dub des boîtes d'artistes et ses étiquettes Dymo, en 3 touchers.
