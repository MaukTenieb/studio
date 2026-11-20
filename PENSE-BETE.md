# Pense-bêtes du studio

Claude relit ce fichier avant chaque lot, puis REQUESTS.md. Chaque ligne reprend une règle donnée par Mauk Tenieb.

## Pistes

- Pistes numérotées de 01 à 32, indifféremment. Jamais de « pistes de batterie », jamais de pistes nommées Kick, Snare, Hat ou Drone. Le projet s'ouvre sur les 32 pistes vides.
- Pistes 01 à 18 : les Masks de la Fauna en figurines 3D de SkopoRhogo, tirés au hasard à chaque session, animés, bioluminescents. Ses figurines restent telles quelles : la règle du réalisme photographique s'applique au reste. Question close, ne plus la poser.
- Pistes 19 à 32 : vidéos et sons de KamOrhogo.
- Couleurs des clips : les couleurs canoniques des Masks (FAUNA, insertkoin/kg-core.js).
- Séquenceur : chaque rangée est une piste et joue la coupe de son Mask, comme dans Musik ; mesures impaires par défaut (15, 17, 19, 21).

## Son

- Zéro MIDI : audio interne uniquement.
- Découper un clip coupe le son à l'endroit indiqué, sans le comprimer dans la partie restante.
- Sons libres : Freesound, Internet Archive, Wikimedia Commons, Jamendo, kits synthétisés, coupes de la Fauna, sons de la borne.
- Power electronics : kits nommés par une seule lettre grecque, comme dans Musik.

## Direction artistique

- Tout est la photographie d'un objet réel des années 1980, sous la lumière de la kave : tube chaud en haut, lueur des écrans. Aucun dessin, aucun rendu illustré, aucun graphisme typique de l'IA.
- Fauna : uniquement les images les plus photographiques, incarnées par de vraies personnes.
- Une surface qu'on touche (pad, disque, écran) se voit de face.
- Aucun nom inventé (ni pour les fonctions, ni pour les collections, ni pour le studio). Les textes décrivent ce que fait chaque chose.
- Le plus de pictogrammes possible, le moins de texte possible.
- Un libellé trop long pour sa case défile sur place, en téléprompteur.
- Proportions constantes sur tous les écrans et toutes les orientations, téléphones compris.
- Juger beauté, cohérence et lisibilité de l'ensemble avant de livrer ; varier les images quand c'est utile ; regarder chaque écran.

## Méthode

- Sauvegarde datée avant chaque lot et après chaque lot (python3 /home/claude/gen/snap.py <commit> « libellé ») : copie jouable dans versions/<date>/, liste sur https://mauktenieb.github.io/studio/versions/ (le proxy refuse l'envoi des étiquettes git : le dossier versions/ fait foi). Rembobiner : remettre index.html de la sauvegarde voulue.

- Reformuler chaque demande en français simple avant d'agir.
- Faire le travail seul ; tester soi-même sur ordinateur, téléphone debout, téléphone couché ; jamais confier un test ni un contrôle à Mauk Tenieb.
- Ne pas s'arrêter : relire le registre, remplir les lignes « À faire », reprogrammer une reprise.
- Proactif : proposer et faire ce qui rend le studio meilleur que BandLab, sur le fond et sur la forme.
- Annexes et références : les lire avec esprit critique ; ce sont des tremplins, jamais des modèles ; en écarter ce qui contredit ses règles.
- Comptes rendus : dire ce qui est en ligne, sans annoncer de lots futurs.
- Français simple et concret, sans calques de l'anglais (« porter », « tenir », « habiter », « vit », « regarde »).
- Liens complets en https:// ; listes d'étapes numérotées, sans gras.
- Commits : auteur et committer Mauk Tenieb.
- Jamais saisir de clé d'API ni de mot de passe ; jamais de secret dans le dépôt.

- Direction artistique commune avec le Kamescope et Musik : DA.md d'Insert Koin, section « Les trois appareils : Kamescope, StudioRhogo, Musik ». Toute touche, tout voyant, tout afficheur ou pictogramme ajouté suit ce tableau.
