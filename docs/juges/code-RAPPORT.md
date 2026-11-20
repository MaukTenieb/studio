# Juge « code » — solidité, fuites, compatibilité, sécurité, dépôt

Objet : /home/claude/studio, commit HEAD d96e21f (version publiée). Le fichier index.html du dossier de travail change pendant l'audit (passage de 2858 à 2870 lignes) : les numéros de ligne renvoient à HEAD ; chaque constat ci-dessous reste vrai dans la copie de travail, sauf mention contraire.
Méthode : lecture du code, quatre parcours Playwright/Chromium (scripts c1.py à c4.py dans /home/claude/judges/code/), instrumentation de requestAnimationFrame, setTimeout, OscillatorNode.start et URL.createObjectURL.

## Bloquant

1. Fuite audio et de minuteries à chaque reconstruction de chaîne — `rebuildMaster()` (l. 898) et `rebuildChains()` (l. 1091).
   - Ce qui se passe : `rebuildMaster` déconnecte seulement `master.input`. L'ancienne chaîne du master reste branchée sur `ctx.destination`, et les minuteries `setTimeout(tick,20)` des effets Gate du rack master (l. 732) continuent de tourner. `rebuildChains` déconnecte `ch.mute` et coupe les minuteries des Gate de piste, mais elle n'arrête aucun oscillateur d'effet (Vibrato `pitchV` l. 728, et tous les effets à LFO). Chaque oscillateur ancien tourne jusqu'à la fermeture de l'onglet.
   - Mesure (c2.py) : avec un Vibrato sur la piste 01 et un Gate sur le master, 30 appels à `rebuildMaster` puis 10 annulations puis 5 lectures/arrêts. Oscillateurs lancés et jamais arrêtés : 1, puis 31, 41, 46. Minuteries par seconde : 1 au repos, puis 81, 230, 749. Les images par seconde de la page tombent de 41 à 2-5 pendant la montée. `rebuildChains` sert à 26 endroits (annuler, lecture, dupliquer une piste, Scène, branches), `rebuildMaster` à 11 : la charge grandit avec la séance.
   - Correction : donner à chaque effet une méthode `dispose()` (arrêt des oscillateurs, `clearTimeout`, déconnexion de toutes les sorties) et l'appeler dans les deux fonctions, master compris.

## Important

2. « Nouveau projet » garde le film — gestionnaire `#bNew` (l. 2261).
   - Ce qui se passe : le film reste à l'écran, et l'entrée `film` du magasin IndexedDB `proj` reste en place ; au rechargement, `filmRestore()` le replace sur le projet vide.
   - Établi par c1.py : après Nouveau, FILM.box vaut true ; après Nouveau et rechargement, FILM.box vaut encore true, avec 0 clip.
   - Correction : dans `#bNew`, retirer FILM.box, appeler `URL.revokeObjectURL(FILM.url)` et `dbDel("proj","film")`.

3. L'export en pistes séparées écrit 32 fichiers, dont les pistes vides — `doExport("stems")` (l. 1212) avec `renderOffline(tr)` (l. 1185).
   - Ce qui se passe : `renderOffline` teste seulement la fin globale du projet (`projEnd()`), jamais le contenu de la piste demandée. Avec 5 pistes pleines, l'export télécharge 01.wav à 32.wav : 27 fichiers silencieux, 45 s de rendu, et 32 téléchargements à la suite, que Chrome soumet à l'autorisation « téléchargements multiples ». Chaque rendu de piste construit aussi un master complet qui ne sert pas (`buildMaster` l. 1189).
   - Établi par c3.py (liste des fichiers reçus).
   - Correction : sauter `tr` quand `tr.clips.length===0`, construire le master seulement pour le mixage, et livrer les pistes dans une seule archive ZIP.

4. Rétablir absent — `snapshot()` / `undo()` (l. 965-966).
   - Ce qui se passe : la pile `hist` sert seulement à annuler ; le mot `redo` figure zéro fois dans le fichier ; Ctrl+Maj+Z et Ctrl+Y déclenchent l'annulation ou rien. Une annulation de trop efface un travail sans retour.
   - Correction : une pile `future` remplie par `undo()`, vidée par `snapshot()`, servie par Ctrl+Maj+Z, Ctrl+Y et un bouton.

5. Export MP3 dépendant d'un CDN tiers, sans contrôle d'intégrité — `mp3Blob()` (l. 1225-1226).
   - Ce qui se passe : lamejs 1.2.1 arrive de cdn.jsdelivr.net par `loadScript`, sans attribut `integrity` ni `crossorigin`. Sans réseau ou si le CDN tombe, l'export échoue avec un simple toast « ✕ » et `console.warn(Event)`. Un CDN compromis exécute son code dans la page, avec accès aux sons et au projet.
   - Établi par c1.py et c3.py (CDN coupé : toast ✕, avertissement « Event »).
   - Correction : copier lame.min.js dans le dépôt (img/ ou lib/) et le charger en local ; à défaut, ajouter le hachage SRI et un message d'erreur clair.

6. Vie privée : Google Fonts chargé à chaque ouverture — `<link>` l. 14-15.
   - Ce qui se passe : chaque visite transmet l'adresse IP du visiteur à fonts.googleapis.com et fonts.gstatic.com. Un tribunal allemand (LG München, 20 janv. 2022) juge ce transfert contraire au RGPD sans consentement. Les sept copies de versions/ font de même.
   - Correction : héberger Barlow Semi Condensed et Courier Prime dans le dépôt (fichiers woff2, licence OFL).

7. Rendu de la frise lourd — `render()` (l. 1794).
   - Ce qui se passe : `render()` reconstruit toute la liste des pistes (`replaceChildren`) et redessine chaque forme d'onde. Mesure (c1.py, Chromium sans GPU) : 71 ms par appel avec 32 pistes et 128 clips. Chaque `edit()`, chaque annulation et la fin de chaque glisser appellent `render()` : au-delà de 16 ms, l'image saute.
   - Correction : mettre en cache le canevas de forme d'onde par clip (clé : son, décalage, longueur, pps) et mettre à jour seulement les pistes touchées.

8. Doublon d'identifiant `#bBack` dans HEAD (version publiée) — l. 456 et 506.
   - Ce qui se passe : le bouton de retour au début (l. 456) et le bouton « retour » de la dérive (l. 506) portent le même id. `$("#bBack")` atteint toujours le premier, et la l. 2462 remplace son gestionnaire (`setPos`, l. 2240) par `driftBack()`. En ligne, le bouton de retour au début et la touche Origine (l. 2299) annulent donc la dérive au lieu de ramener la tête de lecture à 0, et le bouton de la dérive reste sans action. La copie de travail renomme le second en `#bDriftBack` : correction en cours, pas encore committée ni publiée.

## Mineur

9. `loupe()` (l. 2827) lit `st.loupe` dans localStorage sans contrôle : une valeur inconnue fait planter la loupe à chaque ouverture (`TypeError: {…}[loupeTab] is not a function`, reproduit dans c3.py), jusqu'au nettoyage manuel du stockage. Correction : revenir à `"spec"` quand la clé manque dans la table des onglets.
10. Code mort : `fsURL()` (l. 1236) et `cmdBranches()` (l. 2521) ne servent nulle part ; `FS_PROXY` vaut `""`, donc worker.js et wrangler.toml (relais Cloudflare) ne servent pas non plus. `state.filmOff` reste toujours à 0 et manque dans `PROJ_KEYS` : réglage inexistant. Correction : retirer ou brancher.
11. Symbole SVG `#i-loop` défini deux fois, à l'identique (l. 413 et 438).
12. Clé Freesound personnelle passée en paramètre d'URL `token=` (l. 1240 et 1248) : elle apparaît dans l'historique réseau et les journaux. Freesound accepte l'en-tête `Authorization: Token …`.
13. `videoCuts()` (l. 2632) : la sortie anticipée `if(!D)return[]` laisse l'élément `<video>` caché dans le document (la sortie normale appelle `v.remove()`).
14. Les sauvegardes datées de versions/ partagent la base IndexedDB `studio` de la version en ligne. Ouvrir une ancienne version recharge le projet actuel, et toute modification l'écrit. Rembobiner le code ne rembobine pas le projet ; les branches `br:` jouent ce rôle. Les tests (c4.py) montrent zéro perte de champ entre versions, puisque les sept copies ont la même liste `PROJ_KEYS`. À écrire dans le README.

## Vérifié sans défaut

- Secrets : `git log -p --all` ne contient aucune clé (ni Freesound, ni autre chaîne de 32 à 48 caractères hors empreintes Git). La clé Freesound vit dans localStorage (`st.fskey`), worker.js lit un secret Cloudflare.
- XSS : 16 `innerHTML`, tous sur des gabarits internes (icônes, horloge, tracés SVG). Les noms de sons, les titres d'Internet Archive, Openverse et Wikimedia, et les fiches de terrain passent par `el()` (`textContent`, `setAttribute`). Test d'injection `<img onerror>` dans le nom du clip, le nom du son et la fiche de terrain : zéro exécution.
- Licences : Freesound filtré sur CC0 et CC BY (API et Openverse), Jamendo sur cc0, by, by-sa, Internet Archive sur domaine public, zero, by et by-sa ; libellés de licence repris dans les crédits.
- Requêtes tierces au démarrage : seulement Google Fonts et mauktenieb.github.io/insertkoin (three.min.js, figurines, worklet musik-fx.js, sons de la borne) ; les recherches touchent api.openverse.org, archive.org, commons.wikimedia.org et freesound.org à la demande.
- Parcours complet (c1.py, c3.py) : démarrage en 0,35 s jusqu'aux 53 sons de kit, DOMContentLoaded à 171 ms, tas de 37 Mo ; les 20 entrées du menu de clip, les 5 séparations, les 15 outils de l'Atelier, les tiroirs Console, Perf, Séquenceur, Scène et Platines ouverts puis fermés ; branches (`brSave`, `brList`, `brOpen`) ; import du film d'essai (2 coupes trouvées, à 3 s et 6 s) ; export WAV ; rechargement (clips, notes et film restaurés, zéro son manquant). Aucun `pageerror` ; seuls messages : la 404 de three.min.js (absent de la copie locale de test) et l'échec MP3 (point 5).
- Tiroirs : la boucle d'animation de chaque tiroir s'arrête à sa fermeture (`cancelAnimationFrame` dans `dkTick`, `renderNodes`, `msTick`) ; débit d'images stable avant et après ouverture.
- URL d'objets : `KAM.urls`, `FILM.url` et `download()` les libèrent ; seul `crushURL` reste ouvert, volontairement, pour toute la séance.
- Dépôt : `.gitignore` exclut `/*.png` ; les 14 captures r*.png du dossier restent hors dépôt (commit 4cf122a). Les 7 copies de versions/ et la page versions/index.html s'ouvrent sans erreur (`<base href="../../">` correct, 32 pistes, 53 sons ; 05h57 démarre plus lentement).
- Compatibilité : AudioWorklet en `try/catch` avec repli (`prepCtx`), `requestVideoFrameCallback` testé avant usage avec repli `ontimeupdate`, `webkitAudioContext` prévu ; API récentes : `findLastIndex` (Safari 15.4+), `<dialog>` (Safari 15.4+).

## Hypothèses non vérifiées (pas de Safari ni de Firefox dans le bac à sable)

- Safari iOS : `decodeAudioData` sur un film WebM importé ou sur un MP4 avec piste vidéo peut échouer ; `filmLoad` avale alors l'erreur (`catch(e){}`) et le film arrive sans son ni message.
- Vidéos MediaRecorder (WebM à durée `Infinity` dans Chrome) : `videoCuts` calcule `setTimeout(done, Infinity)`, délai ramené à 0 par le navigateur, donc aucune coupe. Les deux WebM d'essai ont une durée finie et passent.
- Gros films : `filmLoad` lit le fichier entier en mémoire (`arrayBuffer`) puis le décode en PCM, et le range en entier dans IndexedDB ; un film d'une heure demande plusieurs centaines de Mo.

## Note : 5/10

Le socle tient : zéro erreur JavaScript sur le parcours complet, zéro secret, zéro XSS, licences filtrées, sauvegarde et rechargement fiables.
Une fuite (point 1) dégrade l'audio et l'image au fil de toute séance réelle, et l'export en pistes séparées livre des fichiers vides.
Rétablir manque, Nouveau projet garde le film, le MP3 et les polices dépendent de tiers : quatre défauts simples à corriger, qui coûtent ensemble la moitié de la note.
