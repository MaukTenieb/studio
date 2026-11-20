# Juge « code » — deuxième passage (commit c02f630)

Scripts rejoués : c1, c2, c3 et c4, ce dernier remplacé par c6 puisque les sauvegardes ont désormais chacune leur base. Scripts ajoutés : c5 (charge CPU des worklets), c6 (sauvegardes), c7 (tous les effets dans `mkFX`/`disposeFX` et dans un rendu hors ligne). Dossier : /home/claude/judges/code/. Zéro `pageerror` sur l'ensemble des parcours. La machine était chargée par d'autres juges : les mesures de temps et d'images par seconde ne se comparent pas d'un passage à l'autre, seuls les compteurs se comparent.

## Constats 1 à 14

| # | Constat | État | Preuve |
|---|---|---|---|
| 1 | Fuite d'oscillateurs et de minuteries | Corrigé (un reste possible, voir R1) | c2 : 46 oscillateurs lancés, 45 arrêtés (avant : 0 arrêté). Minuteries par seconde : de 15 à 31, sans montée (avant : jusqu'à 749). c7 : les 39 effets lancés, réglés, détruits puis détruits deux fois ; zéro source non suivie, zéro erreur. |
| 2 | « Nouveau projet » garde le film | Corrigé | c1 : après Nouveau, FILM.box vaut false ; après Nouveau et rechargement aussi. `filmRemove()` vide aussi la vidéo. |
| 3 | 32 pistes séparées, dont des vides | Corrigé | c3 : un seul fichier studio-…-pistes.zip. `zipfile.testzip()` le trouve sain : 5 WAV pour 5 pistes pleines, zéro piste vide. |
| 4 | Rétablir absent | Corrigé | c3 : `redo()` donne [5, 6, 5, 6] ; Ctrl+Z puis Ctrl+Maj+Z, et Ctrl+Z puis Ctrl+Y, rétablissent. Accès : clavier et palette de commandes ; aucun bouton visible, ce qui laisse le téléphone sans accès direct. |
| 5 | MP3 dépendant d'un CDN | Corrigé | lib/lame.min.js est servi en local, avec sa licence ; c3 obtient un vrai MP3 (192 kbit/s, stéréo, selon `file`). |
| 6 | Google Fonts | Corrigé | Zéro requête tierce au démarrage (c1, c3). Polices en woff2 dans fonts/, licences OFL jointes ; zéro occurrence dans les 9 copies de versions/. |
| 7 | `render()` lourd | Toujours faux | Le code de `render()` reste identique : `replaceChildren` et redessin de toutes les formes d'onde. Mesure : 174 ms par appel pour 32 pistes et 128 clips, machine chargée (71 ms au premier passage). |
| 8 | Doublon `#bBack` | Corrigé | Un seul `#bBack` (`setPos`) ; la dérive passe par `#bDriftBack` (`driftBack`). |
| 9 | Valeur inconnue de `st.loupe` | Corrigé | La valeur est contrôlée à la lecture et dans `loupe()` ; c3 ouvre la loupe avec une clé inconnue sans erreur. |
| 10 | Code mort | Partiel | `filmOff` entre dans `PROJ_KEYS`, mais rien d'autre que l'import ne le règle, et il vaut toujours 0. `fsURL()` et `cmdBranches()` restent définies sans aucun appel. `FS_PROXY` reste vide ; le README présente worker.js comme relais optionnel, ce qui se défend. |
| 11 | Symbole `#i-loop` en double | Corrigé | Une seule définition. |
| 12 | Clé Freesound dans l'URL | Toujours faux | `&token=${encodeURIComponent(fsKey())}` figure encore deux fois ; zéro en-tête `Authorization`. |
| 13 | `<video>` laissé par `videoCuts` | Corrigé | `if(!D){v.remove();…}` |
| 14 | Base IndexedDB partagée par les sauvegardes | Corrigé | c6 : chaque copie ouvre `studio-v-<date>` et copie `studio` au premier lancement (4 clips retrouvés dans les 9 copies). Un clip ajouté dans 06h28 donne 5 dans sa base et laisse 4 dans `studio` ; il reste à 5 à la réouverture. Une copie ouverte sans base `studio` s'affiche et ne crée pas de base `studio`. |

## Régressions et défauts nouveaux

- **R1, mineur, hypothèse forte : `disposeFX` laisse vivre les AudioWorkletNode.**
  - `mkFX` suit les oscillateurs, les sources constantes et les sources de tampon, mais pas les `AudioWorkletNode` (crush, fshift, glitch, mz_*, sp1200, mpc60, asr10, s950, sub).
  - Leurs processeurs renvoient toujours `true`, donc le navigateur les garde actifs.
  - c5 : 64 effets à worklet sur les 32 pistes, puis 20 appels à `rebuildChains`, laissent 1280 nœuds orphelins. La charge CPU du moteur de rendu passe de 78,6 % à 93,4 %, contre +47 points pour les 64 nœuds vivants : Chrome semble en suspendre la plupart.
  - Correction proposée : enregistrer les `AudioWorkletNode` dans `made`, et leur envoyer par `port` un message d'arrêt qui fait renvoyer `false` au processeur.
- **R2, mineur : copie au premier lancement d'une sauvegarde** (script en tête de `versions/*/index.html`).
  - Le drapeau `st.vcopied.<V>` s'écrit même quand la copie échoue (`catch(e){}` puis `setItem`) : un échec n'est jamais retenté.
  - Si `localStorage.setItem` lève une exception, la page reste en `visibility:hidden`, sans rechargement.
  - Chaque copie duplique tous les sons de l'utilisateur (magasin `snd`) : le quota se remplit d'autant à chaque sauvegarde ouverte.
- **Point vérifié sans défaut :** `zipBlob` produit une archive valide (CRC justes). Limites : aucun ZIP64, donc plafond de 4 Go, et toutes les pistes en mémoire. Le plafond reste hors de portée pour un projet ordinaire.
- **Point vérifié sans défaut :** rendu hors ligne de 32 pistes avec les 39 effets, plus Gate, Vibrato et Crush sur le master (c7) : zéro NaN, crête à 0,80, et 10 s de queue après 1 s de clips, conforme à « queues d'export complètes ».

## Note : 8/10 (avant : 5/10)

- Les défauts graves sont corrigés et vérifiés par mesure : fuites d'oscillateurs et de minuteries, film après « Nouveau », export des pistes, Rétablir, dépendances tierces, `#bBack`, sauvegardes isolées. Aucune régression n'apparaît sur les parcours complets.
- Restent : `render()` lourd sur 32 pistes, la clé Freesound dans l'URL et du code mort.
- S'y ajoutent deux défauts mineurs nés des corrections : les nœuds de worklet non détruits (R1) et la copie de sauvegarde sans nouvel essai, qui duplique tous les sons (R2).
