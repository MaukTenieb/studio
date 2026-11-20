# Expert 07 — Ethnomusicologie scientifique

Étalons : Hugo Zemp, Steven Feld, Simha Arom, Alan Lomax, Bernard Lortat-Jacob ; collection CNRS / Musée de l'Homme et archives du CREM, Ocora, Smithsonian Folkways, collection UNESCO. Ce rapport juge le Studio sur quatre points : collections par région, métadonnées (lieu, date, collecteur, licence), analyse de hauteur, tempéraments non occidentaux.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| 1. Design | 5,8 |
| 2. Direction artistique | 6,2 |
| 3. Puissance | 4,3 |
| 4. Ergonomie | 4,2 |
| 5. Simplicité intuitive | 4,9 |
| 6. Exhaustivité | 3,9 |
| 7. Pertinence | 4,2 |
| 8. Originalité | 6,0 |
| 9. Plaisir potentiel | 4,4 |
| Moyenne générale | 4,9 |

## Méthode

- Copie locale servie sur http://localhost:8765/, harnais Playwright `/home/claude/outil/harnais.py`, interface en français (`st.lang=fr`).
- Formats joués : `iphone` (390 × 664), `iphone-paysage` (664 × 390) au doigt (`touchscreen.tap`, appui long par CDP) ; `pc1366` et `pc1920` à la souris.
- Internet Archive répond depuis cette session. Openverse (Freesound sans clé, Jamendo) et l'API de Wikimedia Commons répondent par un échec réseau (code 000) : les sources Freesound et Commons restent non mesurées ici. Limite de la session, pas un défaut constaté de l'application.
- Le module `musik-fx.js` est servi en Blob depuis `/home/claude/insertkoin` pour les parcours avec export (consigne de l'orchestrateur). Aucun écart de ce rapport ne dépend de ce module.
- Échantillon chiffré : la requête exacte du Studio (`index.html` l. 1408-1411 : `mediatype:audio`, filtre de licence, exclusion `IA_SKIP`, tri par téléchargements) rejouée sur les 20 entrées de la famille « Ethnographie par région » (l. 1466), dix premiers résultats par entrée. Scripts et données : `/tmp/expert07/ia.py`, `/tmp/expert07/ia_region.json`.
- Analyse de hauteur : six signaux de référence synthétisés (numpy, 48 kHz, six harmoniques), passés dans l'interface (slendro, souris) puis dans la fonction `yinTrack` et le calcul d'histogramme de `scaleSheet` appelés tels quels dans la page (l. 2812-2822). Valeurs attendues connues au cent près.
- Chronomètre : secondes mesurées par le script, attentes fixes du réseau comprises.

## Scénarios

| N° | Scénario | Résultat attendu mesurable |
|---|---|---|
| S1 | Débutant : ouvrir les chants de Papouasie | ≤ 4 touchers jusqu'à une liste d'enregistrements, sur téléphone et ordinateur |
| S2 | Pertinence de l'échantillon par région | ≥ 70 % des dix premiers résultats issus de la région et du genre nommés |
| S3 | Métadonnées visibles dans la liste | lieu, date d'enregistrement, collecteur, licence présents sur ≥ 90 % des résultats |
| S4 | Poser un enregistrement et ouvrir sa fiche de terrain | fiche pré-remplie depuis la source (lieu, date, créateur, licence) ; ≤ 6 touchers ; accessible au doigt |
| S5 | Compléter la fiche et la retrouver dans les crédits | les champs saisis et la source exacte (URL, licence avec version) dans le fichier des crédits |
| S6 | Slendro joué sur ré (293,66 Hz) | pics à ±5 cents, intervalles entre degrés affichés, gamme de référence calée sur la tonique |
| S7 | Maqâm rast joué sur do | tierce et septième neutres (350 et 1050 cents depuis la tonique) lues à ±5 cents |
| S8 | Voix avec vibrato de ±50 cents (0, 350, 700 cents) | trois degrés lus, pas neuf |
| S9 | Bourdon grave 50 / 56,1 / 63 Hz | trois pics à ±5 cents |
| S10 | Deux voix (bourdon 196 Hz + mélodie à 392 Hz) | mélodie et bourdon séparés, ou un avertissement « polyphonie » |
| S11 | Enregistrement de terrain de 4 minutes | analyse de hauteur en ≤ 10 s sans gel de l'interface |
| S12 | Respect des droits | seuls les items sous licence libre vérifiable ; aucun enregistrement protégé présenté comme domaine public |

## Parcours joués

| Scénario | Format | Actions | Écrans / tiroirs traversés | Secondes | Résultat |
|---|---|---|---|---|---|
| S1 | iphone | 5 touchers (Collections, Huit univers sonores, Ethnographie par région, entrée, source IA) | 3 (bibliothèque, famille, résultats) | 61,3 (dont 8 s d'attente fixe) | liste obtenue ; la source par défaut est Freesound, IA demande un toucher de plus |
| S1 | pc1366 | 5 clics | 3 | 18,1 jusqu'à la liste IA | liste obtenue |
| S1 | pc1920 | 5 clics | 3 | 21,1 | liste obtenue (Wamena) |
| S4 | pc1366 | 10 actions (5 de S1, ouvrir l'item, glisser le fichier, Plus, Loupe, ✓) | 5 | 36,4 | fiche vide : 9 champs sur 9 vides |
| S4 | pc1920 | 10 actions | 5 | 42,2 | fiche vide |
| S4 | iphone | 7 touchers jusqu'au clip posé | 4 | 50 environ | barre du clip masquée par la piste : Loupe inaccessible |
| S4 | iphone-paysage | 7 touchers | 4 | 50 environ | bouton ⋯ de la barre masqué par le clip : Loupe inaccessible |
| S5 | pc1366 | 3 saisies + ✓ | 1 | 1,3 | la fiche passe dans les crédits |
| S6 | pc1366 | 6 actions (Fichiers, import, glisser, Plus, Loupe, ♪) | 3 | 88 à 108 | pics exacts, comparaison décalée |

## Mesures

### Collections par région (S1, S2, S3, S12)

La famille « Ethnographie par région » compte 20 entrées (`index.html` l. 1466). Chaque entrée est une requête de recherche en anglais, affichée telle quelle dans l'interface française (« papua new guinea singing », « singsing », « wax cylinder »). Capture : [07-entrees-region-iphone](../captures/07-entrees-region-iphone.webp).

Résultats Internet Archive avec les filtres du Studio :

| Entrée | Items trouvés | Pertinents dans les 10 premiers |
|---|---|---|
| papua new guinea singing | 6 | 0 (six chants gospel de la « Lindsey Family ») |
| singsing | 0 | — |
| wamena | 2 | 2 (Asep Nayak, cassette d'Ilaga) |
| melanesia | 1 | 0 (podcast d'histoire) |
| solomon islands panpipes | 0 | — |
| aboriginal didgeridoo | 1 | 0 (pièce électronique) |
| inuit throat singing | 1 | 0 |
| tuvan throat singing | 3 | 0 (dont « Chill Out » de The KLF) |
| sami joik | 0 | — |
| ainu | 2 | 0 (deux podcasts) |
| andean flute | 2 | 1 (musique aymara) |
| amazon ritual | 38 | 0 (dix podcasts) |
| berber | 11 | 3 (deux prises de radio aporee au Maroc, un chanteur amazigh) ; en tête : une récitation du Coran et deux albums de « anachid jihadistes » |
| tuareg | 13 | 0 |
| ethiopian chant | 0 | — |
| sardinian tenore | 0 | — |
| corsican polyphony | 0 | — |
| georgian table song | 1 | 1 (ensemble d'État, disque, pas une prise de terrain) |
| gamelan | 34 | 2 (gending jawa, banque de sons pelog) |
| wax cylinder | 419 | 0 ethnographique (3 vrais cylindres : discours de Harrison 1889, Crowley, Akeley) |

- 6 entrées sur 20 rendent zéro résultat (30 %).
- 9 résultats pertinents sur 69 examinés (13 %). L'entrée qui ouvre la famille, « papua new guinea singing », rend 0 chant de Papouasie sur 6.
- Le filtre de licence réduit fortement le corpus : « papua » passe de 1 366 items à 41 (3 %) ; la catégorie « Ethno » (sujets ethnographic, ethnography, ethnomusicology, anthropology) de 70 794 à 401 ; « ocora » de 63 à 0 ; « kaluli OR bosavi » de 8 à 1.
- Le tri par nombre de téléchargements (l. 1411) place les podcasts et les compilations populaires avant les prises de terrain.
- Captures : [07-ia-berber-pc1366](../captures/07-ia-berber-pc1366.webp), [07-ia-berber-iphone](../captures/07-ia-berber-iphone.webp), [07-ia-wamena-pc1920](../captures/07-ia-wamena-pc1920.webp).

Métadonnées présentes dans les 69 résultats :

| Champ Internet Archive | Présent | Taux | Affiché par le Studio |
|---|---|---|---|
| licenseurl | 69 | 100 % | oui, abrégé (PD, CC0, CC BY) |
| creator | 56 | 81 % | oui |
| date | 41 | 59 % | année seule ; souvent date de mise en ligne (cylindre « Akeley » daté 2007, « Chill Out » daté 1990-02-05) |
| coverage (lieu, coordonnées) | 3 | 4 % | non |
| collecteur distinct de l'interprète | 0 | 0 % | champ absent |

Droits : l'item `negroprisonsongs` (« Negro Prison Songs from the Mississippi State Penitentiary », prise d'Alan Lomax, 1947) passe le filtre avec une mention « publicdomain » posée par la personne qui l'a mis en ligne. Le Studio écarte déjà les 78 tours pour ce motif (README, section « Sounds and licences ») ; la même faiblesse touche ici les fonds ethnographiques.

### Fiche de terrain (S4, S5)

- `placeItem` (l. 1796) crée le clip sans `meta`. Mesure : après la pose de « Berber music at night / Madkhal Meski, Morocco », la fiche montre 9 champs vides sur 9, alors qu'Internet Archive fournit créateur (Benjamin Trimoreau), date (2018-01-05T22:48) et coordonnées WGS84. Capture : [07-fiche-auto-pc1366](../captures/07-fiche-auto-pc1366.webp).
- Champs de la fiche (l. 2961) : lieu, date, musiciens, fonction, saison, instruments, accordage, texte chanté, traduction. Champs absents : collecteur, licence, cote ou identifiant de l'archive, coordonnées, langue, groupe ou ethnie, support d'origine.
- Crédits produits par `creditsTxt` (l. 1312) après saisie :

```
"Berber music at night / Madkhal Meski, Morocco" — Benjamin Trimoreau — PD — https://archive.org/details/aporee_41165_46978
01 · 0:00 — Lieu : Madkhal Meski, Maroc · Date : 2018-01-05 · Musiciens, ensemble : Benjamin Trimoreau (preneur de son)
```

  La licence apparaît en abrégé (« PD », « CC BY ») sans version ni lien ; « PD » regroupe la Public Domain Mark (une déclaration) et CC0 (une renonciation).
- Au doigt : la barre d'actions du clip (Supprimer, Copier, Boucle, Trancher, ⋯) se place sous les pistes. En portrait, `elementFromPoint` au centre de la barre rend `.lane` (barre à x 143, y 353, 186 × 52 px, z-index 12) ; toucher ⋯ désélectionne le clip. En paysage, le point du bouton ⋯ rend le `canvas` du clip choisi ; toucher ⋯ laisse la barre inchangée. Le double toucher ouvre le menu complet, qui contient « Inverser », « Atelier ▸ » mais ni Loupe, ni Fiche, ni Échelle. Résultat : fiche de terrain et échelle réelle inaccessibles au doigt dans les deux orientations. Captures : [07-barre-clip-iphone](../captures/07-barre-clip-iphone.webp), [07-plus-iphone-paysage](../captures/07-plus-iphone-paysage.webp), [07-double-toucher-iphone](../captures/07-double-toucher-iphone.webp).
- Les boutons de la barre mesurent 32 × 42 px (cible minimale 44 px) ; les entrées de région 43 à 126 × 23 px, texte de 11,04 px.

### Analyse de hauteur et tempéraments (S6 à S11)

Méthode du Studio (l. 2812-2829) : YIN, fenêtre 40 ms, pas 20 ms, 40 à 1 000 Hz ; histogramme de 120 cases de 10 cents ; pics au-dessus de 18 % du maximum, affinés par moyenne à ±25 cents ; cents calculés depuis La = 440 Hz (`st.ref`, aucune commande ne modifie cette valeur). Sept gammes de référence (l. 2811) : tempérament égal, gamme juste, rast, bayati, slendro (5 × 240 cents), pelog, raga bhairav.

| Signal | Valeur attendue (cents depuis La) | Pics lus par le Studio | Écart |
|---|---|---|---|
| Slendro sur ré (0, 231, 474, 717, 955 depuis la tonique) | 17, 255, 500, 731, 974 | 17, 255, 500, 731, 974 | 0 cent |
| Rast sur do (0, 200, 350, 500, 700, 900, 1050) | 0, 150, 300, 500, 650, 800, 1000 | 150, 300, 500, 650, 800, 1000, 1200 | 0 cent ; « 1200 » écrit au lieu de 0 |
| Pelog sur La | 0, 120, 270, 540, 670, 780, 950 | 120, 270, 540, 670, 780, 950, 1200 | 0 cent ; « 1200 » au lieu de 0 |
| Vibrato ±50 cents sur 0, 350, 700 | 3 degrés | 37, 315, 349, 386, 666, 699, 736, 1165, 1199 | 9 pics pour 3 degrés |
| Grave 50 / 56,1 / 63 Hz | 1035, 35, 235 | 35, 235, 1035 | 0 cent ; f0 minimale lue 50,00 Hz |
| Deux voix (bourdon 196 Hz, mélodie 392-523 Hz) | 1000 (bourdon), 1000, 0, 100, 300 | 300, 327, 998 | 2 degrés sur 4 manquants, 1 faux ; f0 médiane lue 65,4 Hz |

- Précision sur un son à une voix : exacte au cent sur cinq signaux.
- Ancrage : les cents partent du La, pas de la tonique. Sur le slendro joué sur ré, la gamme slendro de référence (0, 240, 480, 720, 960) se dessine à 500 cents des pics mesurés ; la variable `near` (écart à la gamme de référence, l. 2827) est calculée puis jamais affichée. Capture : [07-echelle-slendro_re-pc1366](../captures/07-echelle-slendro_re-pc1366.webp).
- Intervalles successifs (231, 243, 243, 238, 245 cents pour ce slendro) : absents de l'écran. C'est la donnée que comparent les études d'échelles de gamelan et de xylophones.
- Courbe de hauteur dans le temps : absente. Export des mesures (CSV, texte) : absent.
- Temps de calcul de `yinTrack` (Chromium sans tête de cette session, fil principal) : 5 s de son → 0,57 s ; 10 s → 1,4 s ; 60 s → 7,6 s ; 240 s → 62,1 s. Un premier passage sous charge a donné 150 s pour 60 s. Parcours complet slendro dans l'interface (onglet spectre ouvert par défaut, puis ♪) : 88 à 108 s. Le parcours sur la prise berbère de 4 min a dépassé 10 min sans rendre l'échelle.

### Boîtes d'ethnomusicologie

η « tribute to » Alan Lomax et θ « tribute to » Simha Arom (l. 2929-2930) : `rack:[]`, `tools:[]`. Elles lancent des recherches (field recording, work song, prison song, polyphonic singing, balafon, pygmy, hocket) et aucun outil d'analyse. Lecture du code seule, sans parcours joué ; note sans poids dans les moyennes.

## Notes par scénario

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir |
|---|---|---|---|---|---|---|---|---|---|
| S1 Ouvrir une région | 6 | 7 | 4 | 4 | 5 | 4 | 5 | 6 | 5 |
| S2 Pertinence | 5 | 6 | 2 | 4 | 5 | 3 | 2 | 5 | 3 |
| S3 Métadonnées liste | 6 | 6 | 4 | 5 | 6 | 3 | 4 | 4 | 4 |
| S4 Fiche depuis la source | 6 | 7 | 4 | 2 | 3 | 4 | 5 | 7 | 4 |
| S5 Fiche vers crédits | 6 | 6 | 5 | 5 | 6 | 5 | 6 | 7 | 5 |
| S6 Slendro | 6 | 6 | 6 | 4 | 4 | 4 | 4 | 8 | 6 |
| S7 Rast | 6 | 6 | 6 | 4 | 4 | 4 | 4 | 8 | 6 |
| S8 Vibrato | 6 | 6 | 3 | 5 | 5 | 3 | 3 | 6 | 4 |
| S9 Grave | 6 | 6 | 8 | 5 | 5 | 6 | 7 | 6 | 6 |
| S10 Deux voix | 6 | 6 | 2 | 5 | 5 | 2 | 2 | 5 | 3 |
| S11 Prise de 4 min | 5 | 6 | 3 | 2 | 4 | 4 | 4 | 5 | 2 |
| S12 Droits | 6 | 6 | 5 | 6 | 7 | 5 | 5 | 5 | 5 |
| Moyenne | 5,8 | 6,2 | 4,3 | 4,2 | 4,9 | 3,9 | 4,2 | 6,0 | 4,4 |

Preuves principales des notes :
- Design 5-6 : fiche et échelle lisibles sur ordinateur ([07-fiche-auto-pc1366](../captures/07-fiche-auto-pc1366.webp)) ; sur téléphone, bibliothèque réduite à environ 100 px de hauteur utile, entrées de 23 px ([07-entrees-region-iphone](../captures/07-entrees-region-iphone.webp)).
- DA 6-7 : matières de la kave, étagères de bandes derrière la bibliothèque ; requêtes brutes en anglais dans l'interface française ; histogramme en barres plates sur fond noir, sans rapport avec un appareil de mesure d'époque.
- Puissance 2-8 : précision au cent sur une voix (S6, S7, S9) ; polyphonie, vibrato et prises longues hors d'atteinte (S8, S10, S11).
- Ergonomie 2-6 : fiche et échelle inaccessibles au doigt (S4) ; gel du fil principal (S11).
- Exhaustivité 2-6 : 6 entrées vides sur 20, 5 champs de fiche manquants, 7 gammes, aucune courbe ni export.
- Pertinence 2-7 : 13 % de résultats pertinents ; 0 Papouasie sur l'entrée Papouasie.
- Originalité 4-8 : histogramme en cents comparé à sept gammes et fiche de terrain dans une station audio de navigateur : aucune station grand public n'offre cela (voir comparaison).

## Comparaison aux outils de référence

| Fonction | Studio | Référence |
|---|---|---|
| Fonds par région avec fiches d'archive | requêtes libres dans IA, 13 % pertinentes | CREM, Archives sonores CNRS - Musée de l'Homme : plus de 42 000 documents inédits, 199 pays, 1 200 groupes ethniques et sociaux, environ 21 000 enregistrements en accès libre (https://parisson.github.io/Telemeta/archives-of-the-french-research-centre-of-ethnomusicology-crem.html ; base : https://archives.crem-cnrs.fr/search) |
| Métadonnées | 9 champs saisis à la main, sans collecteur ni licence | Telemeta, cadre des archives du CREM, structure lieu, date, collecteur, droits par item (https://hal-universite-paris-saclay.archives-ouvertes.fr/LISN/hal-03271840) |
| Courbe de hauteur, notes | histogramme seul | Tony, sur pYIN, transcrit la courbe et les notes d'une voix (https://sonicvisualiser.org/tony ; https://code.soundsoftware.ac.uk/projects/tony) ; Sonic Visualiser pour les calques d'analyse |
| Échelle en cents | exacte sur une voix, ancrée sur La | pratique de recherche : intervalles depuis la tonique ou entre degrés successifs |
| Station audio grand public | fiche, échelle, sept gammes | BandLab : batterie, échantillonneur, boucles, bibliothèque de sons, sans fiche de terrain ni analyse d'échelle (https://help.bandlab.com/hc/en-us/articles/360018942593-BandLab-Sounds ; https://help.bandlab.com/hc/en-us/articles/4403006058009-Using-the-Sampler) |

Le Studio dépasse BandLab sur l'analyse d'échelle et la fiche de terrain. Il reste loin des archives de référence sur les fonds et les métadonnées, et loin de Tony sur l'analyse d'une voix réelle.

## Écarts

07-01 — bloquant — Fiche de terrain et échelle inaccessibles au doigt.
- Preuve : portrait, barre du clip sous `.lane` ; paysage, bouton ⋯ sous le `canvas` du clip ; menu du double toucher sans Loupe. Captures [07-barre-clip-iphone](../captures/07-barre-clip-iphone.webp), [07-plus-iphone-paysage](../captures/07-plus-iphone-paysage.webp), [07-double-toucher-iphone](../captures/07-double-toucher-iphone.webp).
- Correction : placer la barre `.abar` au-dessus des pistes (z-index supérieur à celui des lanes et des clips, ou barre fixe dans le pied, comme sur ordinateur) ; ajouter Loupe, ✎ fiche et ♪ échelle au menu du double toucher et de l'appui long ; boutons de 44 × 44 px.

07-02 — bloquant — Analyse de hauteur sur le fil principal, sans limite de durée.
- Preuve : 240 s de son → 62,1 s de calcul ; prise berbère de 4 min sans résultat après 10 min ; parcours slendro de 5 s : 88 à 108 s.
- Correction : passer `yinTrack` dans un Worker ; sous-échantillonner à 16 kHz avant le calcul ; calcul incrémental de la fonction de différence (ou par FFT) ; barre de progression et bouton d'arrêt ; ouvrir la loupe sur l'onglet ♪ sans calculer le spectre.

07-03 — important — Collections par région peu pertinentes.
- Preuve : 9 résultats pertinents sur 69 (13 %) ; 6 entrées vides sur 20 ; « papua new guinea singing » rend 0 chant de Papouasie sur 6.
- Correction : remplacer les requêtes libres par des listes d'items vérifiés une fois (identifiants IA et Commons choisis à la main, par exemple sous `subject:"field recordings"` et `collection:` connues), avec date et lieu ; requêtes entre guillemets (`"papua new guinea"`) et sujet obligatoire `subject:(ethnographic OR "field recording" OR "traditional music")` ; tri par pertinence au lieu du nombre de téléchargements ; retirer ou fusionner les entrées vides.

07-04 — important — Fiche vide après la pose d'un son d'archive.
- Preuve : 9 champs vides sur 9 alors que l'item IA fournit créateur, date et coordonnées (`placeItem`, l. 1796).
- Correction : à la pose, remplir `c.meta` depuis `item.credit` et la réponse `archive.org/metadata` : `place` ← coverage, `date` ← date, `collector` ← creator, `license` ← licenseurl, `source` ← URL de l'item ; champs pré-remplis modifiables.

07-05 — important — Champs de fiche manquants.
- Preuve : `META_K` (l. 2961) sans collecteur, licence, cote, coordonnées, langue, groupe.
- Correction : ajouter `collector`, `license`, `source` (cote ou URL), `geo` (lat, long), `lang`, `group` ; les écrire dans `creditsTxt`.

07-06 — important — Échelle ancrée sur La, sans tonique ni intervalles.
- Preuve : slendro sur ré lu 17, 255, 500, 731, 974 ; gamme de référence décalée de 500 cents ; `near` calculé (l. 2827) et jamais affiché.
- Correction : sélecteur de tonique (par défaut le pic le plus fort, ou le bourdon), cents recalculés depuis la tonique ; ligne « intervalles : 231, 243, 243, 238, 245 » ; écart de chaque pic à la gamme choisie affiché en cents ; La de référence réglable de 415 à 466 Hz.

07-07 — important — Vibrato lu comme plusieurs degrés.
- Preuve : 3 degrés à ±50 cents → 9 pics.
- Correction : lisser la courbe f0 sur 100 à 150 ms (médiane) avant l'histogramme, ou détecter les segments stables (pente < 30 cents par 100 ms) et ne compter que leur moyenne ; seuil de fusion des pics à 50 cents.

07-08 — important — Polyphonie non signalée.
- Preuve : bourdon + mélodie → f0 médiane 65,4 Hz, 2 degrés sur 4 manquants, 1 faux.
- Correction : mesurer la clarté YIN (valeur minimale de la fonction normalisée) et afficher « plusieurs voix : mesure peu sûre » au-dessus d'un seuil ; option de filtrage passe-haut ou de séparation par bande (la séparation Linkwitz-Riley existe déjà) avant l'analyse.

07-09 — important — Licences déclarées par les déposants et abrégées.
- Preuve : `negroprisonsongs` (Lomax 1947) passe le filtre en « publicdomain » ; crédits « PD » ou « CC BY » sans version ni lien.
- Correction : étendre `IA_SKIP` aux fonds ethnographiques à droits connus (prises Lomax, Folkways, Ocora rediffusés) ; écrire dans les crédits l'URL complète de la licence (`licenseurl`) ; distinguer « Marque du domaine public » de « CC0 ».

07-10 — détail — « 1200 » écrit au lieu de 0.
- Preuve : rast et pelog : dernier pic « 1200 ».
- Correction : `Math.round(...) % 1200` après l'arrondi dans `scaleSheet` et `fieldSheet`.

07-11 — détail — Requêtes anglaises affichées dans l'interface française.
- Preuve : « papua new guinea singing », « wax cylinder » sous « Ethnographie par région ».
- Correction : libellé français ou nom propre de la région (« Papouasie-Nouvelle-Guinée », « Cylindres de cire ») et requête anglaise gardée en interne ; défilement en téléprompteur pour les libellés longs.

07-12 — détail — Résultats sensibles en tête de l'entrée « berber ».
- Preuve : une récitation du Coran et deux albums d'anachid jihadistes avant la première prise de terrain berbère.
- Correction : mêmes corrections que 07-03 (sujet obligatoire, tri par pertinence, liste vérifiée).

07-13 — détail — Gammes de référence limitées et idéalisées.
- Preuve : 7 gammes ; slendro à pas égaux de 240 cents.
- Correction : ajouter maqâm hijaz et saba, gamme turque à 53 commas, gamme thaïe à 7 pas égaux (171 cents), tempérament égal à 24 ; indiquer que slendro et pelog varient d'un ensemble à l'autre et permettre d'enregistrer la gamme mesurée d'un clip comme gamme de référence.

07-14 — détail — Courbe de hauteur et export des mesures absents.
- Preuve : écran ♪ limité à l'histogramme.
- Correction : courbe f0 dans le temps sous l'histogramme ; bouton d'export texte (temps, Hz, cents) joint aux crédits.

## À garder tel quel

- La précision du suivi YIN sur une voix : 0 cent d'écart sur slendro, rast, pelog et bourdon grave à 50 Hz.
- L'histogramme de 0 à 1 200 cents avec pics nommés au cent et le bouton ✎ qui inscrit l'accordage mesuré dans la fiche (l. 2829, 2967).
- La fiche de terrain par clip et son passage dans le fichier des crédits : 3 champs saisis → 1 ligne de crédits en 1,3 s.
- Le filtre de licence d'Internet Archive et l'exclusion des 78 tours.
- L'affichage licence, créateur, année sous chaque résultat d'archive.
