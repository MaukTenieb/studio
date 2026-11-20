# Prompt : analyse du Studio par dix experts

Ce texte se colle tel quel dans une nouvelle session Claude Code, avec accès en lecture et en écriture au dépôt GitHub MaukTenieb/studio.

---

Tu analyses le Studio, un studio de musique complet dans le navigateur, conçu et dirigé par Mauk Tenieb. Tu remplis cent pour cent de la demande ci-dessous, sans lui poser de question et sans lui confier un seul test. Tu réponds et tu rédiges en français simple et concret.

## 1. La demande, telle que Mauk Tenieb la formule

Il confie à une instance séparée l'analyse du design, de la direction artistique, de la puissance, de l'ergonomie, de la simplicité intuitive, de l'exhaustivité, de la pertinence, de l'originalité et du plaisir potentiel du Studio. Dix agents experts décortiquent tous les usages, selon la totalité de ces critères. Son but : un outil « complet, puissant, simple, intuitif, qui marche en deux secondes », supérieur à BandLab, à la place d'un « DAW de studio à la souris, débile et compliqué ».

## 2. Ce que tu analyses, et où

Le dépôt : https://github.com/MaukTenieb/studio. Clone-le : `git clone https://github.com/MaukTenieb/studio`.

- `index.html` : toute l'application, en un seul fichier d'environ 440 Ko (HTML, CSS, JavaScript, Web Audio, AudioWorklets). Tu le lis en entier, par morceaux.
- `README.md` : la description publique, en anglais et en français, avec les chiffres de l'offre (26 masterings, 33 chaînes d'effets, 1 210 entrées de collections, 29 catégories Internet Archive, douze kits Α à Μ…).
- `REQUESTS.md` : le registre de toutes ses demandes, rangées en trois sections (fait, à faire, écarté).
- `PENSE-BETE.md` : ses règles permanentes, que tu appliques à l'analyse.
- `BANDLAB-RELEVE.md` : le relevé de BandLab (Drum Machine, Sampler, Looper, Sounds), avec le tableau BandLab / Studio et ses sources.
- `docs/juges/` : les rapports de quatre juges précédents (son, direction artistique, fidélité aux demandes, code), avec le cahier `BRIEF.md`. Tu les lis pour repérer ce qui est déjà corrigé et ce qui reste ouvert.
- `versions/` : les sauvegardes datées (`versions/LIST.txt`, une page `index.html` par horodatage). Elles servent à vérifier qu'aucune fonction ne disparaît d'une version à l'autre.
- `img/`, `fonts/`, `lib/` : les photographies de matières, les polices auto-hébergées, l'encodeur MP3.
- Le dépôt https://github.com/MaukTenieb/insertkoin fournit les kits des 18 Masks de la Fauna Korhogo, `musik-fx.js`, `DA.md` (palette de la kave) et `kg-core.js` (couleurs des Masks). Clone-le à côté : `git clone https://github.com/MaukTenieb/insertkoin`.
- La version en ligne : https://mauktenieb.github.io/studio/. Le proxy de ta session peut la bloquer : tu sers alors ta copie locale.

## 3. Comment tu fais tourner l'application

1. `cd studio && python3 -m http.server 8765` (relance-le s'il tombe).
2. Pilote-la avec Playwright (Python) dans Chromium, sur deux formats :
   - téléphone : `p.devices["iPhone 13"]`, en portrait puis en paysage, avec de vrais touchers (`tap`, ou `Input.dispatchTouchEvent` par CDP pour les appuis longs et les glissés) ;
   - ordinateur : 1 366 × 768 et 1 920 × 1 080, à la souris.
3. Route les requêtes vers `mauktenieb.github.io/insertkoin/…` sur ta copie locale du dépôt insertkoin, sinon les sons de kits manquent.
4. L'application s'ouvre en mode simple (Créer, Pads, Rythme, Master). Le bouton clé, en haut (dans le menu ⋯ sur téléphone), ouvre l'Atelier : console, scène, platines, dérive. Tu analyses les deux modes.
5. Le son se mesure : rends des exports (WAV, MP3, pistes séparées en ZIP), puis mesure-les avec Python (numpy, soundfile) : crêtes, LUFS, bruit au repos, queue de réverbération. Écoute ne veut rien dire ici, la mesure si.
6. Fais une capture de chaque écran et de chaque étape importante. Range-les dans `docs/analyse/captures/` (format WebP, compressé).

## 4. Les dix experts

Lance dix agents séparés et travaillant en parallèle. Chacun reçoit ce prompt en entier, son rôle, ses usages et ses étalons. Chacun travaille sur l'application qui tourne, jamais sur le code seul.

Chaque agent juge à l'aune des meilleurs de son domaine, nommés ci-dessous, underground compris. Il prend leurs œuvres, leurs méthodes, leurs outils et leurs exigences comme étalon. Il ne parle jamais en leur nom, et il ne leur prête aucune citation sans source.

1. **Musique de film (OST).**
   - **Étalons :**
     - compositeurs : Ennio Morricone, Bernard Herrmann, Jóhann Jóhannsson, Hildur Guðnadóttir, Mica Levi, Trent Reznor et Atticus Ross, Angelo Badalamenti ;
     - son et montage : Walter Murch, Ben Burtt ;
     - norme de livraison : stems de post-production façon Pro Tools.
   - **Usages :**
     - importer un film, détecter les coupes, caler le tempo sur les coupes ;
     - synchroniser image et son ;
     - poser thèmes et nappes sous des scènes ;
     - exporter les pistes pour un mixeur.
2. **Dub pointu.**
   - **Étalons :**
     - King Tubby, Lee « Scratch » Perry et le Black Ark, Scientist, Mad Professor ;
     - Adrian Sherwood et On-U Sound ;
     - Basic Channel, Rhythm & Sound (Mark Ernestus, Moritz von Oswald) ;
     - le Roland RE-201 Space Echo, la table MCI de Tubby.
   - **Usages :**
     - chaîne dub (écho à bande, ressort, sirène, laser analogique) ;
     - envois d'écho à la volée, coupes de pistes en direct ;
     - tenue de la boucle de réinjection, travail du sub.
3. **Power electronics.**
   - **Étalons :**
     - Whitehouse (William Bennett), Sutcliffe Jügend, Ramleh et le label Broken Flag (Gary Mundy), Con-Dom, Genocide Organ ;
     - Prurient (Dominick Fernow), Pharmakon ;
     - Merzbow pour le noise.
   - **Usages :**
     - larsen maîtrisé, saturations empilées (HM-2, fuzz, repliement), bruit ;
     - voix hurlée et distordue ;
     - boîtes « tribute to » du genre ;
     - studio silencieux au repos et sans emballement.
4. **Dark ambient.**
   - **Étalons :**
     - Lustmord (Brian Williams), Thomas Köner, Raison d'être, Atrium Carceri ;
     - les labels Cold Meat Industry, Cyclic Law, Cryo Chamber.
   - **Usages :**
     - bourdon de dix minutes et plus, étirements extrêmes ;
     - convolution (cave, silo, cathédrale), couches lentes, dérive ;
     - enregistrements de terrain, tenue des longs rendus.
5. **IDM.**
   - **Étalons :**
     - Autechre, Aphex Twin, Squarepusher, Boards of Canada, µ-Ziq ;
     - les labels Warp et Rephlex ;
     - les machines E-mu SP-1200, Akai MPC60 et MPC3000 (Roger Linn), Ensoniq ASR-10, Akai S950 ;
     - le tracker Renoise.
   - **Usages :**
     - séquenceur à longueurs impaires (15, 17, 19, 21 pas), euclidien, probabilités, décalages en millisecondes ;
     - découpe, granulaire, glitch ;
     - émulations de machines.
6. **Composition néo-classique avec orchestre philharmonique.**
   - **Étalons :**
     - compositeurs : Arvo Pärt, Henryk Górecki, Max Richter, Jóhann Jóhannsson, Ólafur Arnalds ;
     - orchestre : les Berliner Philharmoniker ;
     - prise de son : l'exigence de Deutsche Grammophon et d'ECM New Series ;
     - échantillons : Vienna Symphonic Library.
   - **Usages :**
     - trouver des sons d'orchestre (Internet Archive, Freesound) ;
     - longues dynamiques, espaces de salle, nuances ;
     - écriture lente sans MIDI (le Studio exclut le MIDI : mesurer ce que ce choix ouvre et ce qu'il coûte) ;
     - mastering pour diffusion.
7. **Ethnomusicologie scientifique.**
   - **Étalons :**
     - chercheurs : Hugo Zemp (Papouasie, îles Salomon, CNRS), Steven Feld (Kaluli de Bosavi, Papouasie-Nouvelle-Guinée), Simha Arom (polyphonies d'Afrique centrale), Alan Lomax (cantométrie), Bernard Lortat-Jacob ;
     - collections et archives :
       - la collection CNRS / Musée de l'Homme, les Archives du CREM ;
       - Ocora (Radio France), Smithsonian Folkways ;
       - la collection UNESCO des musiques traditionnelles.
   - **Usages :**
     - collections par région ;
     - métadonnées (lieu, date, collecteur, accordage) ;
     - gammes et tempéraments non occidentaux, analyse de hauteur ;
     - respect des sources et des droits ;
     - chants de Papouasie et autres corpus de terrain.
8. **Techniques de composition de l'Ircam.**
   - **Étalons :**
     - compositeurs : Pierre Boulez, Jean-Claude Risset, Gérard Grisey, Tristan Murail, Kaija Saariaho, Philippe Manoury ;
     - le GRM (Pierre Schaeffer, François Bayle, Bernard Parmegiani, les GRM Tools) ;
     - logiciels : AudioSculpt, SuperVP, Spat, Modalys, OpenMusic, Max.
   - **Usages :**
     - analyse spectrale, séparation harmonique et percussive ;
     - wavesets, étirement de Paul, convolution croisée ;
     - spatialisation, doppler ;
     - analyse et resynthèse.
9. **Jazz symphonique et free jazz.**
   - **Étalons :**
     - jazz symphonique : Duke Ellington (les suites), Charles Mingus (Epitaph), Gil Evans, George Russell ;
     - free jazz : Ornette Coleman (Free Jazz), Cecil Taylor, Sun Ra et l'Arkestra, Albert Ayler, Peter Brötzmann, le Globe Unity Orchestra (Alexander von Schlippenbach) ;
     - prise de son : Rudy Van Gelder, Manfred Eicher (ECM).
   - **Usages :**
     - prises live sans clic, tempo libre ;
     - plusieurs musiciens en couches, swing, grand ensemble ;
     - improvisation collective ;
     - collections jazz d'Internet Archive.
10. **Design d'interface et direction artistique.**
   - **Étalons :**
     - design : Dieter Rams et ses dix principes ; Teenage Engineering (OP-1, OP-Z) ; Elektron ; l'Akai MPC de Roger Linn ;
     - interfaces musicales : Ableton (Live, Push), Native Instruments Maschine, BandLab comme base de comparaison ;
     - ergonomie : Don Norman ; les dix heuristiques de Jakob Nielsen ; Apple Human Interface Guidelines et Material Design pour les cibles tactiles.
   - **Usages :**
     - premier contact en deux secondes sur téléphone, gestes au doigt ;
     - tailles des cibles (44 px minimum), lisibilité (11 px minimum) ;
     - proportions identiques sur tous les écrans et toutes les orientations ;
     - pictogrammes, défilement en téléprompteur des libellés trop longs ;
     - cohérence avec la DA : réalisme photographique 1980–85 sous la lumière de la kave, palette de `insertkoin/DA.md` ;
     - comparaison geste par geste avec BandLab.

Les mesures de son suivent pour tous la norme EBU R128 (loudness et vraie crête) et l'exigence de mastering de Bob Katz. Les textes suivent la liste « Signs of AI writing » de Wikipédia, pour en exclure chaque tic.

## 5. Ce que chaque expert fait

1. Il écrit d'abord ses scénarios d'usage : au moins huit, du premier toucher d'un débutant à l'usage le plus pointu de son domaine, chacun avec un résultat attendu et mesurable.
2. Il joue chaque scénario dans l'application, au doigt puis à la souris, et compte les touchers, les écrans traversés et les secondes.
3. Il note chaque critère sur 10, scénario par scénario, avec la preuve : capture, mesure, extrait de code (ligne de `index.html`), source externe. Les neuf critères :
   1. design ;
   2. direction artistique ;
   3. puissance ;
   4. ergonomie ;
   5. simplicité intuitive ;
   6. exhaustivité ;
   7. pertinence ;
   8. originalité ;
   9. plaisir potentiel.
4. Il compare avec les outils de référence de son domaine (BandLab pour tous ; puis par exemple Ableton, Reaper, Logic, Ircam, Max/MSP, Audacity, Sonic Visualiser, Renoise, les vraies machines) en citant ses sources.
5. Il liste les écarts numérotés : ce qui manque, ce qui gêne, ce qui casse, ce qui dépasse la référence. Chaque écart a une gravité (bloquant, important, détail), une preuve et une correction précise.
6. Il signale aussi ce qui fonctionne bien et ce qu'il faut garder tel quel.

## 6. La synthèse

Un agent de synthèse, distinct des dix experts, croise les dix rapports. Il conduit la synthèse selon la roue de Deming (planifier, faire, vérifier, agir) et les principes de mesure de W. Edwards Deming : chaque conclusion repose sur une mesure.

1. un tableau 10 experts × 9 critères, avec la note moyenne par critère et par expert ;
2. la liste unique des écarts, fusionnés et dédoublonnés, triés par gravité puis par nombre d'experts qui les relèvent ;
3. les dix corrections qui gagnent le plus de points, chiffrées (effort estimé, gain sur chaque critère) ;
4. les contradictions entre experts, et la règle qui les tranche (les règles de `PENSE-BETE.md` priment) ;
5. la liste de ce qu'il faut garder sans y toucher.

## 7. Les règles à respecter

- Tu respectes `PENSE-BETE.md` :
  - pistes 01 à 32 interchangeables, jamais nommées kick, snare ou hat ;
  - figurines des Masks sur les pistes 01 à 18 (question close, à ne pas rouvrir) ;
  - zéro MIDI ;
  - recadrer un clip le coupe et ne le compresse jamais ;
  - aucun nom inventé (lettres grecques et « tribute to » pour les boîtes d'artistes) ;
  - pictogrammes plutôt que texte.
- Tu juges les résultats visibles et audibles, jamais les intentions annoncées dans le code ou dans les registres.
- Tu ne modifies pas l'application. Tu n'écris que dans `docs/analyse/`.
- Tu n'écris aucun secret (clé Freesound ou autre) dans le dépôt, ni dans une URL.
- Tes textes suivent ses règles d'écriture :
  - phrases factuelles, présent de l'indicatif, voix active ;
  - zéro formule publicitaire, zéro métaphore de mise en scène ;
  - zéro tic d'écriture d'IA ;
  - des chiffres et des preuves plutôt que des adjectifs.
- Tu restes honnête : une note basse reste basse. Une fonction absente est notée absente.

## 8. Ce que tu livres

1. `docs/analyse/experts/01-ost.md` à `docs/analyse/experts/10-design-da.md` : un rapport par expert (scénarios, mesures, notes, écarts, à garder).
2. `docs/analyse/SYNTHESE.md` : la synthèse décrite au point 6.
3. `docs/analyse/ECARTS.md` : la liste unique des écarts, numérotés, avec gravité, preuve et correction, au format des sections de `REQUESTS.md`.
4. `docs/analyse/captures/` : les captures citées.
5. Un commit, auteur et committer Mauk Tenieb (`git -c user.name="Mauk Tenieb" -c user.email="mauktenieb@users.noreply.github.com" commit`), poussé sur la branche `main`.
6. Pour finir, un message à Mauk Tenieb, en français, de dix lignes au plus : les trois notes les plus basses, les trois écarts les plus graves, le lien complet https://github.com/MaukTenieb/studio/blob/main/docs/analyse/SYNTHESE.md.

Avant de livrer, vérifie toi-même :
- chaque note a sa preuve ;
- chaque écart a sa correction ;
- les dix experts ont joué l'application sur téléphone et sur ordinateur ;
- chaque chiffre cité vient d'une mesure faite dans cette session.
