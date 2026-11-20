# Brief commun aux juges du studio

Objet jugé : le studio de musique dans le navigateur de Mauk Tenieb, dépôt local /home/claude/studio (fichier unique index.html, ~400 ko, Web Audio, IndexedDB), publié sur https://mauktenieb.github.io/studio/. Registres du projet : /home/claude/studio/REQUESTS.md (demandes, fait, écarté), /home/claude/studio/PENSE-BETE.md (règles), README.md. Sauvegardes datées : /home/claude/studio/versions/.

Serveur local déjà lancé : http://localhost:8765/index.html (sinon : cd /home/claude/studio && nohup python3 -m http.server 8765 &). Playwright Python et Chromium sont installés ; exemples de scripts de test dans /home/claude/tests (t42.py à t62.py). Dans les tests, router https://mauktenieb.github.io/insertkoin/** vers une 404 (ou vers la copie locale /home/claude/mauktenieb/insertkoin/, voir t58.py) car le bac à sable n'atteint pas github.io. Une vidéo d'essai à trois plans : /home/claude/vid/film.webm. Annexes de l'auteur (à lire avec esprit critique) : /mnt/user-data/uploads/*-attachment.txt.

Interdits pour les juges : modifier /home/claude/studio, committer, pousser. Écrire ses scripts et captures dans /home/claude/judges/<ton-nom>/ uniquement.

## Ce que veut l'auteur (ses demandes, résumées)

- Un studio complet, beau, clair, innovant, simple, exhaustif, singulier, « auto-éco-améliorant et émergent par le jeu de tous ses paramètres », meilleur que BandLab en forme et en fond ; riche de tout Freesound et d'Internet Archive dans tous les domaines (jazz, ethnologie, etc.) ; toutes les boîtes et kits d'artistes de power electronics envisagés par Musik et tout ce qu'a Musik.
- 20 nov. 6 h 04 : « Conserve tous les ajouts mais fusionne, assemble, construis, pense, innove » : un instrument cohérent, pas un empilement de fonctions.
- Pistes 01 à 32 interchangeables, jamais nommées kick, snare, hat, drone. Pistes 01-18 : figurines 3D des Masks de la Fauna (SkopoRhogo), tirées au hasard, animées, bioluminescentes (question close, ne pas la rouvrir). Pistes 19-32 : vidéos et sons KamOrhogo. Couleurs des clips : couleurs canoniques de la Fauna.
- ZÉRO MIDI. Un clip raccourci se coupe, ne se tasse jamais.
- Direction artistique : réalisme photographique fort, objets réels 1980-85 sous la lumière d'une cave (« kave »), rien de dessiné ni d'aspect IA. Une surface qu'on touche se voit de face. N'inventer aucun nom. Pictogrammes plutôt que texte ; texte trop long pour sa case : défilement sur place en téléprompteur. Proportions identiques sur tous les écrans et orientations (ordinateur, téléphone debout, téléphone couché).
- Musique de film possible (vidéo synchronisée, coupes, tempo calé).
- Sauvegardes datées pour rembobiner.
- Langue de l'interface : français quand le navigateur est en français ; pas de calques de l'anglais.

## Format du rapport

Rapport en français, classé du plus grave au moins grave. Pour chaque constat : où (fonction, sélecteur ou écran), ce qui se passe, comment tu l'as établi (test, mesure, capture, lecture de code), gravité (bloquant / important / mineur), correction proposée en une phrase. Seulement des constats vérifiés ; signale à part ce qui reste une hypothèse. Termine par une note sur 10 pour ton domaine, justifiée en trois lignes. Écris le rapport dans /home/claude/judges/<ton-nom>/RAPPORT.md et renvoie-le aussi en réponse.
