# Juge fidélité : deuxième passage (commit c02f630)

Le studio a été testé sur http://localhost:8765, en locale fr-FR. Scripts : r1.py à r5.py dans /home/claude/judges/fidelite/.

## Constats du premier passage

| # | Constat | État | Preuve |
|---|---|---|---|
| 1 | `#bBack` en double : Début, touche Origine et palette déclenchaient le retour de la dérive | Corrigé | r1.py : la position revient à 0 par le bouton, la touche Home et la palette (« début »). Un seul `id="bBack"` reste dans le code. `#bDriftBack` a son propre gestionnaire `driftBack` |
| 2 | « touche retour » de la dérive | Corrigé | même preuve |
| 3 | « brise-voix / scie suédoise » | Partiel | Le registre écrit maintenant « Voice breaker » et « Swedish chainsaw » (noms des kits de Musik). Ces deux noms n'apparaissent nulle part dans la copie locale d'insertkoin (aucun fichier musik/borne-musik ne les contient), donc la source reste à prouver. Les préréglages de chaîne restent en anglais en fr-FR : Voice, Telephone, Robot, Space, Cathedral, Doubler, Noise wall, Old record, Shortwave, Bathroom, Live room, Hall, Church, Field ambience |
| 4 | 22 masterings | Corrigé | le registre dit « 18 autres (26 en tout) », et `MASTERS` en contient bien 26 |
| 5 | Collections : 926 entrées | Partiel | Le registre et le README disent maintenant 1 171. `COLL` contient 1 210 entrées et le tiroir affiche 1 210 touches (r2.py). Le chiffre 1 171 ne correspond qu'à un comptage des 40 langues comme une seule entrée, et le texte ne le précise pas |
| 6 | Huit univers : 133 entrées | Corrigé | 153 entrées en 9 familles, comme l'écrit le registre. Les noms des familles sont maintenant en français |
| 7 | Effets en français | Partiel | Les réglages sont traduits (Temps, Réinjection, Dosage, Timbre). Restent en anglais : « Ping-pong off », la touche « Timestretch » de la barre « Plus » du clip (la feuille, elle, s'appelle Étirement), « Preset de chaîne », les préréglages de chaîne, et Neutral, Natural, Cinematic et Spatial dans le sélecteur du pied de page |
| 8 | Coupes « à l'image exacte » | Toujours faux | Le registre dit maintenant « à une ou deux images près ». Sur 4 essais (r5.py), contre des coupes réelles à 3,003 s et 6,003 s : 3,163/6,003, puis 3,12/6,36 (+9 images), 3,003/6,003, 3,04/6,08. Deux essais sur quatre ne calent le tempo que sur une coupe sur deux (119,94 et 150,95 BPM au lieu de 159,9). La nouvelle phrase est fausse |
| 9 | Lettres Α à Ζ pour deux objets à la fois (kits Musik et boîtes d'artistes) | Toujours faux | Le menu des chaînes propose Α à Μ, et les étiquettes Dymo portent ΑΒΓΔΕΖΝ…Ωα…θ (r3.py) |
| 10 | README : « ten chain presets » | Corrigé | Le README dit maintenant 33, mais sa liste n'en nomme que 10 |
| 11 | README : 23 masterings | Partiel | Le README dit 26, mais sa liste n'en nomme que 23 (Natural, Cinematic et Spatial manquent) |
| 12 | README : 17 catégories Internet Archive, 16 recherches Freesound | Partiel | « 29 listening categories » est exact (`IA_CATS` = 29), mais la liste n'en nomme que 17. « sixteen quick searches » reste faux : `FS_CATS` en contient 21 |
| 13 | README : les 78 tours | Corrigé | Les catégories 78 ont disparu. Le filtre `-collection:78rpm` s'applique partout, et le README dit vrai |
| 14 | README : « six kits Α to Ζ » | Partiel | La partie anglaise dit maintenant « Α to Μ ». La partie française écrit encore « les six kits Α à Ζ » au lieu de douze |
| 15 | README : « about 900 entries » | Partiel | voir le point 5 (1 171 annoncées, 1 210 réelles) |
| 16 | Coquille « has each with » | Corrigé | |
| 17 | Interface en anglais en fr-FR | Partiel | Barre du haut, pistes, pied de page, panneau, collections et la plupart des sons du kit sont traduits (open_fr2.txt). Restent en anglais : le texte du bouton « Export » ; les sons 808 kick, 808 snare, 808 hat, 909 kick, 909 snare, 909 ride, 808 cowbell, Anvil, Sheet metal, Steam burst, Chain drag, Machine hum, Bell FM, Crackle, Earth rumble, « Infra beat 7 Hz on 40 Hz », FM drone, Additive choir, Plucked string, Chua buzz, Polivoks bass et lead ; les 88 sons de la Borne (bell-1, creak-1, relay-1…) ; « Ping-pong off » ; les préréglages de chaîne |
| 18 | Rangées du séquenceur « 01 Kick » | Partiel | Le menu propose maintenant « 01 Grosse caisse », « 01 Caisse claire », « 01 Charleston » : le nom de piste interdit apparaît en traduction |
| 19 | Sauvegardes qui partagent le projet | Corrigé | r4.py : les 9 sauvegardes reçoivent une copie du projet à leur première ouverture. Une modification faite dans les 9 versions laisse le projet courant intact (JUDGE présent, OLD absent) |
| 20 | Tempo constant seulement (pas de rubato) | Toujours absent | `fitTempo` renvoie encore `{bpm,hit,n}` |
| 21 | Noms des Masks dans les infobulles | Corrigé | Hátra Lövés, Croisière Noire, Ts'ui Pên |
| 22 | Sauvegarde avant et après chaque lot | Partiel | 12h35 et 12h52 existent. La liste ne contient aucune sauvegarde de 7f6b8b1 ni de 6f62245, chacune prise isolément |
| 23 | S950 au lieu de MPC3000 | Toujours là | |

## Toujours conforme

Ces points restent conformes : zéro MIDI ; 32 pistes 01 à 32 ; couleurs canoniques (`trackColor` exact sur les 32 pistes) ; clip qui se coupe sans se tasser ; vidéo KamOrhogo sur la piste 19 ; son du film sur la piste 19 ; zéro erreur JavaScript au démarrage.

## Nouvelles affirmations du registre

- Fausse : « à une ou deux images près » (point 8).
- Fausse ou ambiguë : « 1 171 entrées » (point 5).
- Non prouvée : « noms des kits de Musik » pour Voice breaker et Swedish chainsaw (point 3).
- Exactes : « 26 masterings », « 153 entrées en 9 familles », « sauvegardes isolées », « 78 tours retirés », « bouton Début ».
- « chiffres du registre et du README alignés sur le code » : faux pour 1 171, sixteen et « six kits Α à Ζ ».
- Je n'ai pas vérifié les corrections de son, de DA et de code : elles reviennent aux autres juges.

## Note : 6/10 (contre 5 au premier passage)

Le bloquant est corrigé, les sauvegardes sont isolées et l'essentiel de l'interface parle français.
Il reste quatre affirmations fausses ou non prouvées dans le registre et le README (film « une ou deux images », 1 171, sixteen, six kits). Il reste aussi la double lecture des lettres Α à Ζ, une vingtaine de sons du kit et les 88 sons de la Borne en anglais, et les rangées de séquenceur nommées « Grosse caisse » et « Charleston ».
