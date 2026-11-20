# Synthèse de l'analyse du Studio par dix experts

Sources : les dix rapports docs/analyse/experts/01-ost.md à 10-design-da.md, PENSE-BETE.md, REQUESTS.md, index.html. Liste des écarts : [ECARTS.md](ECARTS.md). Chaque chiffre de ce texte vient d'un rapport (mesure faite dans la session) ou d'un calcul de l'agent de synthèse sur ces rapports, avec sa règle écrite.

## 1. La roue de Deming appliquée à cette analyse

1. Planifier. Le prompt (docs/ANALYSE-EXPERTS-PROMPT.md) fixe neuf critères, dix rôles, huit scénarios au moins par rôle, deux formats de jeu (téléphone au doigt, ordinateur à la souris) et la norme de mesure du son (EBU R128, vraie crête). Les dix experts écrivent 108 scénarios, chacun avec un résultat attendu chiffré.
2. Faire. Les dix experts jouent leurs scénarios en parallèle sur la copie locale (http://localhost:8765/), mesurent touchers, écrans, secondes, exports (mesure.py, numpy) et rangent 271 captures dans docs/analyse/captures/.
3. Vérifier. L'agent de synthèse recalcule les 90 moyennes à partir des 108 lignes de notes (script Python, section 2), fusionne les 139 écarts en 100, contrôle les 138 liens de captures, sépare les écarts liés à la charge de la machine et vérifie la liste de contrôle du prompt, expert par expert (section 7).
4. Agir. Les dix corrections de la section 4 gagnent le plus de points pour l'effort estimé. Le tour suivant de la roue rejoue les mêmes scénarios après correction, sur une machine seule, avec les mêmes scripts, et compare note à note.

## 2. Notes : 10 experts × 9 critères

Règle de calcul : pour chaque expert, moyenne arithmétique des notes de ses scénarios, critère par critère, à partir de la table « Notes par scénario » de son rapport ; moyenne par critère = moyenne des dix moyennes d'expert (chaque expert pèse autant) ; arrondi au dixième, demi vers le haut. Le script relit 108 lignes de scénarios. Les 90 moyennes déclarées en tête des rapports concordent avec le recalcul à 0,05 près ; les seules différences d'affichage viennent de l'arrondi d'une moyenne qui tombe sur un demi (07, ergonomie et pertinence : 4,25, déclarées 4,2, affichées ici 4,3).

| Expert | Scén. | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir | Moyenne |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 Musique de film | 9 | 5,2 | 5,4 | 3,9 | 4,2 | 5,9 | 3,3 | 6,0 | 5,3 | 4,0 | 4,8 |
| 02 Dub | 11 | 5,7 | 6,4 | 4,8 | 5,1 | 5,5 | 4,9 | 5,5 | 5,8 | 4,5 | 5,4 |
| 03 Power electronics | 11 | 6,1 | 6,4 | 4,8 | 5,5 | 6,0 | 6,0 | 5,3 | 6,1 | 4,6 | 5,6 |
| 04 Dark ambient | 10 | 6,3 | 6,5 | 6,0 | 5,4 | 6,4 | 5,1 | 7,1 | 6,3 | 6,1 | 6,1 |
| 05 IDM | 10 | 5,6 | 6,3 | 5,7 | 5,2 | 6,6 | 4,8 | 7,1 | 5,4 | 5,7 | 5,8 |
| 06 Néo-classique | 11 | 5,5 | 5,8 | 5,2 | 5,7 | 6,6 | 5,4 | 5,5 | 5,5 | 4,8 | 5,6 |
| 07 Ethnomusicologie | 12 | 5,8 | 6,2 | 4,3 | 4,3 | 4,9 | 3,9 | 4,3 | 6,0 | 4,4 | 4,9 |
| 08 Ircam | 11 | 5,5 | 6,2 | 5,5 | 4,5 | 6,2 | 4,8 | 6,6 | 5,5 | 5,6 | 5,6 |
| 09 Jazz | 11 | 5,8 | 6,5 | 4,5 | 5,4 | 6,2 | 4,1 | 5,5 | 5,4 | 4,9 | 5,4 |
| 10 Design et DA | 11 | 4,6 | 6,3 | 6,2 | 3,5 | 5,1 | 6,2 | 6,4 | 6,3 | 5,1 | 5,5 |
| Moyenne par critère | 108 | 5,6 | 6,2 | 5,1 | 4,9 | 5,9 | 4,9 | 5,9 | 5,8 | 5,0 | 5,5 |
| Plus basse | | 4,6 | 5,4 | 3,9 | 3,5 | 4,9 | 3,3 | 4,3 | 5,3 | 4,0 | |
| Plus haute | | 6,3 | 6,5 | 6,2 | 5,7 | 6,6 | 6,2 | 7,1 | 6,3 | 6,1 | |

Lecture :
- Les trois critères les plus bas : exhaustivité 4,9 (4,85), ergonomie 4,9 (4,89), plaisir potentiel 5,0 (4,99). Les plus hauts : direction artistique 6,2, simplicité intuitive 5,9, pertinence 5,9.
- La note la plus basse d'un expert : ergonomie 3,5 (10, design et DA), puis exhaustivité 3,3 (01, film). La plus haute : pertinence 7,1 (04 et 05).
- Moyenne générale 5,5 sur 10. Expert le plus sévère : 01 (4,8) ; le moins sévère : 04 (6,1).

## 3. Liste fusionnée des écarts

Règle de fusion : deux écarts fusionnent quand ils désignent la même cause dans index.html ou la même correction. Un écart d'origine qui mêle deux causes se partage entre deux écarts fusionnés (mention « partie »). Les 139 identifiants d'origine se retrouvent tous dans [ECARTS.md](ECARTS.md) (contrôle par script : 0 absent, 0 en trop). Résultat : 100 écarts, dont 15 bloquants, 55 importants, 30 détails. Ordre : gravité, puis nombre d'experts.

| N° | Gravité | Experts | Écart | Identifiants d'origine |
|---|---|---|---|---|
| E-01 | bloquant | 6 | Téléphone couché : tiroirs, bibliothèque, console, pads, Rythme, Master et scène rognés | 10-02, 06-08, 03-11, 05-02, 02-04, 08-10 |
| E-02 | bloquant | 3 | Barre d'actions du clip invisible au doigt : loupe, fiche de terrain, échelle, tranches et étirement hors d'atteinte | 07-01, 08-01, 10-01 |
| E-03 | bloquant | 3 | Calculs lourds sur le fil principal : Paulstretch, séparation harmonique / percussive, Atelier et analyse de hauteur gèlent la page sans avancement ni arrêt | 04-01, 07-02, 08-02 |
| E-04 | bloquant | 2 | Sons d'Internet Archive coupés à 240 s et à 7 Mo, sans avertissement | 06-01, 04-04 |
| E-05 | bloquant | 2 | Premier son lent et pistes absentes pendant le chargement ; le son d'un film tombe alors sur la piste 01 | 10-03, 01-09 |
| E-06 | bloquant | 2 | Vraie crête au-dessus du plafond à l'export | 03-02, 09-11 |
| E-07 | bloquant | 1 | Composante continue dans les saturations et le master : choc grave à chaque lecture, queues jamais rognées | 03-01, 03-05, 03-07 |
| E-08 | bloquant | 1 | Emballement non borné en sortie de piste : trois larsens et un écho à 0,95 | 03-03 |
| E-09 | bloquant | 1 | Le dub joué à la console (touche D) reste absent de tout export | 02-01 |
| E-10 | bloquant | 1 | Le réglage de réinjection « D ⟲ » change moins de 3,5 dB sur les cinq premières secondes | 02-02 |
| E-100 | détail | 1 | Axes des pads peu lisibles | 10-16 |
| E-11 | bloquant | 1 | Console au téléphone debout : touche D de 48 × 22 px, réglage « D ⟲ » hors de l'écran | 02-04 |
| E-12 | bloquant | 1 | Coupes peu contrastées ignorées : seuil fixe | 01-02 |
| E-13 | bloquant | 1 | Chaque prise au micro tombe trop tôt, de 114 à 892 ms ; les couches successives se décalent en cascade | 09-01, 09-04 |
| E-14 | bloquant | 1 | Le décompte décale la prise de −2,62 s au début du projet et ses 4 clics restent muets | 09-02 |
| E-15 | bloquant | 1 | Une seule piste armée et une seule entrée : zéro prise simultanée de deux musiciens | 09-03 |
| E-16 | important | 5 | Cibles sous 44 px et textes sous 11 px sur tous les formats | 10-04, 10-05, 08-10, 09-13, 05-02, 01-11 |
| E-17 | important | 3 | Catégories et requêtes d'Internet Archive peu pertinentes (régions, Classique, Jazz) | 07-03, 06-04, 09-10, 07-12 |
| E-18 | important | 3 | L'export avec cible de sonie refait jusqu'à 5 rendus complets | 03-06, 04-05, 06-06 |
| E-19 | important | 3 | Étalons absents des boîtes d'artistes : film, dark ambient, jazz, dub | 01-12, 04-08, 09-12 |
| E-20 | important | 3 | Le gros bouton + du projet vide passe par-dessus les tiroirs et la ligne de temps | 10-10, 09-14, 06-08 |
| E-21 | important | 2 | Le réglage d'export par défaut (Universal, cible −14 LUFS) écrase la dynamique | 06-02, 02-05, 06-10 |
| E-22 | important | 2 | Le swing suit la parité du compteur général : sur 15, 17, 19 ou 21 pas, le même pas alterne swing et grille droite | 05-03, 09-07 |
| E-23 | important | 2 | Zéro réponse impulsionnelle enregistrée, zéro position de micro | 04-06, 06-09 |
| E-24 | important | 2 | Plafonds d'étirement et de durée : ×64 et 600 s pour Paulstretch, 120 s pour le gel et le granulaire | 04-02, 08-11 |
| E-25 | important | 2 | Licences déclarées par les déposants et abrégées dans les crédits | 07-09, 09-10 |
| E-26 | important | 2 | Aimant aveugle aux coupes, aux notes et aux attaques ; pas de 100 ms en tempo libre | 01-06, 09-15 |
| E-27 | important | 2 | Stems en 44,1 kHz 16 bits sans dither, de durées inégales, sans 2-pop ni code temporel | 01-07, 04-09 |
| E-28 | important | 2 | Le sonomètre du pied ignore la plage de sonie, la vraie crête et la composante continue | 06-03, 03-12 |
| E-29 | important | 1 | Détection des coupes par lecture accélérée : images perdues sur un film de 60 s, sans barre de progression | 01-01, 01-10 |
| E-30 | important | 1 | Image en retard sur le son : recalage seulement au-delà de 120 ms | 01-03 |
| E-31 | important | 1 | Un seul tempo pour tout le film, un seul résultat proposé | 01-04, 01-05 |
| E-32 | important | 1 | Calage du tempo sur les coupes hors d'atteinte au doigt | 01-08 |
| E-33 | important | 1 | Écran du film sur téléphone par-dessus les pistes | 01-11 |
| E-34 | important | 1 | Temps d'écho du bus dub figé à 3/4 de temps | 02-03 |
| E-35 | important | 1 | Queues d'écho coupées à l'export (ping-pong, écho de bande) | 02-06 |
| E-36 | important | 1 | Sirène et laser figés et trop forts | 02-07 |
| E-37 | important | 1 | La boîte King Tubby prépare peu | 02-08 |
| E-38 | important | 1 | Zéro filtre sur la tranche de console | 02-09 |
| E-39 | important | 1 | Marche du larsen entre 0,6 et 0,7 | 03-08 |
| E-40 | important | 1 | Sauts de niveau des chaînes saturantes | 03-09 |
| E-41 | important | 1 | Zéro touche de coupure générale | 03-10 |
| E-42 | important | 1 | Export d'un projet vide : zéro fichier, zéro message | 03-04 |
| E-43 | important | 1 | Zoom arrière bloqué à 8 px/s | 04-03 |
| E-44 | important | 1 | La dérive ignore le master et reste hors de l'export | 04-07 |
| E-45 | important | 1 | La lecture en direct du séquenceur part en rafales quand le fil principal prend du retard | 05-01 |
| E-46 | important | 1 | Séquenceur au téléphone debout : cellules de 10,6 px, touche E et décalage hors de l'écran | 05-02 |
| E-47 | important | 1 | « Mesures écrites » compte des blocs de 16 pas et casse le cycle impair | 05-04 |
| E-48 | important | 1 | Zéro réglage par pas : ni décalage, ni probabilité, ni niveau | 05-05 |
| E-49 | important | 1 | Les enregistrements Musopen restent illisibles (FLAC, Ogg, ZIP) | 06-05 |
| E-50 | important | 1 | Zéro banque de notes d'orchestre | 06-07 |
| E-51 | important | 1 | Fiche de terrain vide à la pose et champs absents (collecteur, licence, cote, lieu) | 07-04, 07-05 |
| E-52 | important | 1 | Échelle réelle : cents ancrés sur La, vibrato lu comme plusieurs degrés, polyphonie non signalée | 07-06, 07-07, 07-08 |
| E-53 | important | 1 | Le morphing annule deux spectres disjoints | 08-03 |
| E-54 | important | 1 | Wavesets faux en stéréo | 08-04 |
| E-55 | important | 1 | Analyse-resynthèse par partiels absente | 08-05 |
| E-56 | important | 1 | Spatialisation stéréo seule | 08-06 |
| E-57 | important | 1 | Doppler éloigné de la physique | 08-07 |
| E-58 | important | 1 | Loupe spectrale sans graduation ni lecture sous le pointeur | 08-08 |
| E-59 | important | 1 | « Copier » duplique aussi le clip | 08-09 |
| E-60 | important | 1 | Téléprompteur sur les lettres M et S de la console | 10-06 |
| E-61 | important | 1 | Noms de clips coupés et poignées de fondu sur chaque clip après Écrire | 10-07 |
| E-62 | important | 1 | Onglets des modes de pads rognés et bas | 10-08 |
| E-63 | important | 1 | Proportions différentes d'un format à l'autre | 10-09 |
| E-64 | important | 1 | Le mode simple laisse 18 commandes dans l'en-tête de l'ordinateur | 10-11 |
| E-65 | important | 1 | Lettres et couleurs hors de `insertkoin/DA.md` | 10-12 |
| E-66 | important | 1 | Surfaces encore dessinées : pistes vides, bouton +, grille Master | 10-13 |
| E-67 | important | 1 | Saisie après coup (Flashback) limitée à 60 s | 09-08 |
| E-68 | important | 1 | La prise reste en mémoire jusqu'à l'arrêt | 09-09 |
| E-69 | important | 1 | Une nouvelle prise s'ajoute à l'ancienne : zéro rangée de prises | 09-05 |
| E-70 | important | 1 | Zéro niveau d'entrée et zéro forme d'onde pendant la prise | 09-06 |
| E-71 | détail | 4 | Libellés et requêtes en anglais dans l'interface française | 04-12, 08-12, 07-11, 05-12 |
| E-72 | détail | 3 | Pages fermées pendant les exports en série | 03-06, 04-05, 06-06 |
| E-73 | détail | 2 | Retard constant de 128 échantillons (2,9 ms) au rendu ; stem du film atténué de 2,5 dB | 05-10, 01-17 |
| E-74 | détail | 2 | La recherche ignore les boîtes à bruit et les noms français | 02-11, 04-12 |
| E-75 | détail | 1 | Sur ordinateur, la barre d'actions du clip passe par-dessus le rack | 03-13 |
| E-76 | détail | 1 | Compteur du film au dixième de seconde, sans images ni SMPTE | 01-13 |
| E-77 | détail | 1 | Fondus enchaînés du film non marqués | 01-14 |
| E-78 | détail | 1 | Décalage de départ du film non réglable | 01-15 |
| E-79 | détail | 1 | Zéro export du film avec la musique | 01-16 |
| E-80 | détail | 1 | Le nombre de coupes disparaît sous un autre toast | 01-18 |
| E-81 | détail | 1 | Le ressort du bus dub change à chaque construction | 02-10 |
| E-82 | détail | 1 | Les pads Écho coupent la queue au relâchement | 02-12 |
| E-83 | détail | 1 | Fondus linéaires seulement | 04-10 |
| E-84 | détail | 1 | Le gel spectral fluctue de 6,8 dB | 04-11 |
| E-85 | détail | 1 | Un décalage négatif s'annule sur le premier coup | 05-06 |
| E-86 | détail | 1 | Tirage sans graine | 05-07 |
| E-87 | détail | 1 | Euclidien sans k explicite ni rotation | 05-08 |
| E-88 | détail | 1 | La lecture en direct du séquenceur contourne la piste | 05-09 |
| E-89 | détail | 1 | Le SP-1200 ajoute un filtre de sortie absent de la machine | 05-11 |
| E-90 | détail | 1 | La feuille de son de rangée affiche « Kick », « Snare », « Hat » | 05-13 |
| E-91 | détail | 1 | « 1200 » écrit au lieu de 0 dans l'échelle | 07-10 |
| E-92 | détail | 1 | Gammes de référence limitées et idéalisées | 07-13 |
| E-93 | détail | 1 | Courbe de hauteur et export des mesures absents | 07-14 |
| E-94 | détail | 1 | La synthèse croisée perd 10,2 dB de contraste harmonique | 08-13 |
| E-95 | détail | 1 | L'étirement WSOLA à 50 % multiplie les clics | 08-14 |
| E-96 | détail | 1 | Zéro écoute avant validation dans l'Atelier | 08-15 |
| E-97 | détail | 1 | Zéro traitement spectral en temps réel dans le rack | 08-16 |
| E-98 | détail | 1 | Feuille Créer rognée sur téléphone | 10-14 |
| E-99 | détail | 1 | Case Créer coupée dans le pied de l'Atelier | 10-15 |

## 4. Les dix corrections qui gagnent le plus de points

Règle de calcul du gain, écrite avant le calcul :
1. Pour chaque correction, la liste des scénarios touchés, par expert, et des critères touchés (ceux que la preuve de la note cite : ergonomie, puissance, plaisir…).
2. Sur chaque note touchée : nouvelle note = min(10, note + Δ), avec Δ = 3 pour un écart bloquant, 2 pour un important, 1 pour un détail.
3. Gain d'un expert sur un critère = somme des hausses ÷ nombre de scénarios de l'expert. Gain sur la moyenne du critère (section 2) = somme des gains des experts ÷ 10.
4. Total = somme des gains sur les neuf critères, en points de moyenne. Rendement = total ÷ heures.
5. L'effort en heures est une estimation de l'agent de synthèse pour un développeur qui connaît index.html, tests compris : zéro mesure derrière ce chiffre. Les gains de deux corrections qui touchent le même scénario ne s'additionnent pas.

Le calcul s'applique à 18 corrections candidates ; le tableau donne les dix meilleurs totaux.

| Rang | Correction | Écarts | Effort (h) | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir | Total | Points / h |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Mise en page du téléphone couché | E-01 | 8,0 | +0,19 | 0 | 0 | +0,19 | +0,19 | 0 | 0 | 0 | +0,19 | +0,77 | 0,097 |
| 2 | Calage des prises et décompte | E-13, E-14 | 6,0 | 0 | 0 | +0,08 | +0,08 | 0 | +0,08 | +0,08 | 0 | +0,08 | +0,41 | 0,068 |
| 3 | Calculs spectraux et analyse de hauteur dans un Web Worker | E-03 | 12,0 | 0 | 0 | 0 | +0,19 | 0 | 0 | 0 | 0 | +0,19 | +0,39 | 0,032 |
| 4 | Cibles de 44 px et textes de 11 px au doigt | E-16 | 4,0 | +0,13 | 0 | 0 | +0,13 | +0,13 | 0 | 0 | 0 | 0 | +0,39 | 0,097 |
| 5 | Composante continue retirée | E-07 | 1,0 | 0 | 0 | +0,11 | 0 | 0 | 0 | +0,11 | 0 | +0,11 | +0,33 | 0,327 |
| 6 | Barre d'actions du clip au premier plan au doigt | E-02 | 2,0 | +0,08 | 0 | 0 | +0,08 | +0,08 | 0 | 0 | 0 | +0,08 | +0,32 | 0,159 |
| 7 | Requêtes d'Internet Archive par sujet et par pertinence | E-17 | 6,0 | 0 | 0 | +0,10 | 0 | 0 | +0,10 | +0,10 | 0 | 0 | +0,31 | 0,052 |
| 8 | Détection des coupes par positionnement et seuil adaptatif | E-12, E-29 | 6,0 | 0 | 0 | +0,07 | +0,07 | 0 | +0,07 | 0 | 0 | +0,07 | +0,27 | 0,044 |
| 9 | Sons d'archive entiers (fin des 240 s) | E-04 | 1,0 | 0 | 0 | +0,06 | 0 | 0 | +0,06 | +0,05 | 0 | +0,06 | +0,22 | 0,219 |
| 10 | Dub exporté et réinjection réglable | E-09, E-10 | 6,0 | 0 | 0 | +0,05 | 0 | 0 | +0,05 | +0,05 | 0 | +0,05 | +0,22 | 0,036 |

Scénarios touchés par correction (expert : scénarios) :
1. Mise en page du téléphone couché : 10 : S3, S8, S9 ; 06 : S11 ; 05 : S2 ; 02 : S3 ; 03 : S4.
2. Calage des prises et décompte : 09 : S4, S5, S6.
3. Calculs spectraux et analyse de hauteur dans un Web Worker : 04 : S3, S10 ; 07 : S11 ; 08 : S4, S5, S6, S7.
4. Cibles de 44 px et textes de 11 px au doigt : 10 : S2, S6, S8, S11 ; 08 : S10 ; 06 : S11 ; 05 : S2.
5. Composante continue retirée : 03 : S1, S3, S5, S6.
6. Barre d'actions du clip au premier plan au doigt : 07 : S4 ; 08 : S2 ; 10 : S5.
7. Requêtes d'Internet Archive par sujet et par pertinence : 07 : S1, S2, S3 ; 06 : S1, S3 ; 09 : S10.
8. Détection des coupes par positionnement et seuil adaptatif : 01 : S2, S9.
9. Sons d'archive entiers (fin des 240 s) : 06 : S4 ; 04 : S9.
10. Dub exporté et réinjection réglable : 02 : S4, S5.

Somme brute des dix totaux : +3,62 point de moyenne sur l'ensemble des neuf critères, pour 52,0 h estimées. Meilleurs rendements hors des dix : swing et cycles impairs (E-22, E-47, 1,5 h, +0,18), pistes affichées avant le kit (E-05, 3 h, +0,18), limiteur de piste (E-08, E-40, 3 h, +0,16). Une correction de détail gagne peu de points sur ce barème, parce que Δ vaut 1 ; le barème favorise ce que plusieurs experts relèvent.

## 5. Contradictions entre experts et règle qui tranche

Règle générale : PENSE-BETE.md prime, puis REQUESTS.md (demandes faites), puis la mesure de la session, puis la norme citée par le prompt (EBU R128, Bob Katz, cibles de 44 px).

1. Sonie de l'export. 09-11 demande de « ramener le gain du master sur la cible » (−17,6 LUFS mesurés pour −14) ; 02-05 et 06-02 mesurent au contraire un relèvement qui écrase la dynamique (15 répétitions d'écho à −1,9 dBFS ; écart doux / fort de 34,4 à 29,1 dB). Règle : la norme du prompt (EBU R128, Bob Katz) place vraie crête et nuance avant la sonie visée ; 03, 04, 06 et 08 mesurent la cible à 0,2 LU près sur des signaux musicaux, et le signal de 09 est un bip à pleine échelle. Décision : borner le relèvement, afficher l'écart (E-21) ; la partie vraie crête de 09-11 passe dans E-06.
2. Écriture du séquenceur. 10-07 veut un clip par mesure ou par rangée ; 05 garde « une région par coup » (0,000 ms d'écart mesuré). Règle : REQUESTS.md (fait) demande l'écriture en clips audio, et la fusion de clips existe. Décision : un clip par coup, affichage corrigé (E-61).
3. Mode simple sur ordinateur. 10-11 masque chronomètre, décompte, Flashback et écoute de l'en-tête ; 09 garde le chronomètre à 1 clic et Flashback. Règle : REQUESTS.md (20 nov. 14 h 30) place le mode simple par défaut et l'Atelier derrière un bouton. Décision : 10-11 s'applique ; ces touches restent dans l'Atelier, à 1 clic ; la case Voix peut passer le projet en secondes, comme la boîte Ν le fait déjà.
4. Plafond d'étirement. 04-02 demande ×1 000, 08-11 ×10 000 ; les deux demandent 3 600 s de sortie. Décision par calcul : ×1 000 atteint 3 600 s dès 3,6 s de source (E-24).
5. Queues d'export. 04 classe `tailSec` et `trimTail` à garder (T30 à 5 % de l'annonce) ; 02-06 mesure des échos coupés à −22 et −26 dBFS ; 03-05 mesure une queue jamais rognée. Décision : les trois mesures sont justes et visent trois causes distinctes ; le principe reste, `tailSec` se corrige pour le ping-pong et l'écho de bande (E-35), la composante continue se retire (E-07).
6. Langue des libellés. 04-12, 07-11 et 08-12 demandent du français ; 05-12 et 10 demandent des pictogrammes. Règle : PENSE-BETE.md, « le plus de pictogrammes possible, le moins de texte possible ». Décision : pictogrammes d'abord, français pour un mot qui reste (E-71).
7. Lettres des nouvelles boîtes. 01-12 (six boîtes), 04-08 (trois, sous ι, κ, λ), 09-12 (trois) et 02 (trois écoles dub) demandent quinze boîtes. Règle : PENSE-BETE.md, « aucun nom inventé », lettres grecques et « tribute to ». Mesure dans `BOXES` : 26 lettres prises (Α-Ζ, Ν-Ω, α-θ), Η à Μ réservées aux chaînes de power electronics, 16 minuscules libres (ι à ω). Décision : les quinze boîtes passent sous ces minuscules, attribuées une fois dans E-19.
8. Polices. 10-12 demande les quatre familles de insertkoin/DA.md (dont Press Start 2P, police à pixels) ; 02, 03 et 04 notent la DA actuelle entre 6 et 8. Règle : le prompt fixe la palette de DA.md, et PENSE-BETE.md exige la photographie d'un objet réel des années 1980. Décision : 10-12 s'applique, chaque écran repasse au contrôle « objet photographié de 1980-85 » avant la mise en ligne (E-65).

## 6. À garder sans y toucher

Chaque point vient de la section « À garder » d'au moins un rapport, avec sa mesure.

- Silence au repos : zéro échantillon au-dessus de −60 dBFS entre l'ouverture et le premier geste, sur les quatre formats (10) ; coupure au repos (`restGate`, ligne 963) qui rend −78,1 dBFS en 2 à 3 s (03). Ce plancher passe à −120 dBFS après la correction de la composante continue.
- Boucle de larsen bornée par `tanh` : ±0,6 dB sur 60 s, zéro NaN (03) ; Résonateur éteint à −147,7 dBFS au maximum (03) ; bus dub stable à tout réglage, zéro NaN, limiteur à −3 dBFS (02) ; Écho du rack stable à 0,95, −1,5 dB par seconde (02).
- Passe-haut de 160 Hz dans la boucle dub : −17,5 dB à 60 Hz, sub sec (02) ; écho de bande de Musik avec pleurage, scintillement et saturation (02).
- Placement des coups du séquenceur : 0,000 ms d'écart sur 15, 17, 19 et 21 pas, gigue sous un échantillon, polymétrie exacte sur 256 pas, euclidien maximalement régulier, décalage au ms, longueur impaire tirée à l'ouverture (05) ; une région par coup (05).
- Masterings Neutral et Classical : écart doux / fort de 34,3 à 34,4 dB pour 34,5 à la source, sonie à ±0,1 LU de −23 à −14 LUFS (06) ; 7 cibles de sonie ; MP3 fidèle à −14,2 LUFS (06) ; sonie d'export à 0,2 LU de la cible (03, 04, 08).
- Rendu long : 644,00 s exacts, 0 coupure, 0 saut, 1,5 LU d'écart sur neuf minutes (04) ; grands espaces à T30 à 5 % de l'annonce, de 6 à 57 s (04) ; queue de Concert hall jusqu'au silence (06).
- Calculs spectraux justes : séparation harmonique / percussive à 71,7 dB et 20,8 dB, reconstruction à −150,5 dB ; convolution à corrélation 1,0000 ; Paulstretch juste en hauteur (440,9 Hz) (08) ; zoom sémantique en spectrogramme dès 307 px/s (08).
- Scène en mètres réels : temps d'arrivée = distance ÷ 343 m/s (+2,9 ms fixes) ; objets qui se repoussent ou se fondent (08).
- Suivi de hauteur YIN : 0 cent d'écart sur slendro, rast, pelog et bourdon à 50 Hz ; histogramme de 0 à 1 200 cents ; fiche de terrain et passage aux crédits en 1,3 s (07).
- Prise sans clic par défaut (métronome et décompte éteints, −77,3 dBFS dans la prise) ; règle en secondes à 1 clic, prise posée à l'instant exact ; Flashback à l'échantillon près ; micro sans annulation d'écho ni gain automatique (09).
- Dérive à attracteurs de Lorenz et touche Garder, qui écrit l'état entendu dans le projet (04).
- Chemins courts : premier son en 3 touchers (10) ; boîtes d'artistes en 3 touchers, au doigt comme à la souris (02, 03, 04) ; pose d'un son par toucher bref, appui long, toucher (10, 06, 08) ; case Film en 3 touchers (01) ; case Voix en 2 touchers (09).
- Affinage des coupes par dichotomie : 0 à 7 ms d'écart quand la première passe trouve la zone (01) ; idée du calage du tempo sur les coupes avec « n/m marks on a beat » (01).
- Pistes séparées en un ZIP, pistes vides sautées, sans traitement, en 3,8 s (01, 06) ; import d'une prise de 70 s sans perte de niveau (06).
- Direction artistique photographique : scène voûtée sous le tube, pads en écran à phosphore, disque photographié, plaques d'acier et jonc riveté, Dymo photographiés, VU-mètre et plaque MAUK TENIEB (10, 02, 03, 04) ; masterings nommés en français (10) ; zéro débordement horizontal sur les quatre formats (10).
- Bibliothèque : filtre de licence d'Internet Archive, exclusion des 78 tours, licence, auteur et année sous chaque résultat (07, 09, 04) ; famille Orchestre nommée par articulation (06).
- Les boîtes Α à Ζ, Ν, Σ et Τ : lettres grecques et « tribute to », zéro son d'artiste copié (03, 04, 05).

## 7. Limites de la mesure

### 7.1 Charge de la machine de test

La machine compte 2 cœurs et 8 Go, partagés par dix navigateurs. Charges relevées par `uptime` dans les rapports :

| Expert | Charge relevée |
|---|---|
| 01 Musique de film | 40 à 53 |
| 02 Dub | 47 à 57 |
| 03 Power electronics | valeur absente du rapport (« machine saturée ») |
| 04 Dark ambient | 41 à 50, puis 10 à 12 |
| 05 IDM | 20 à 57 |
| 06 Néo-classique | 37 à 51 ; 13 pour les exports courts |
| 07 Ethnomusicologie | valeur absente du rapport |
| 08 Ircam | 35 à 50, puis 10 au banc final |
| 09 Jazz | 29,5 à 42,5 |
| 10 Design et DA | 41 à 108 |

Conséquence : les durées en secondes d'horloge sont gonflées, d'un facteur 9 entre deux essais pour 10. Les touchers, les écrans traversés, les seuils, les plafonds et les erreurs de calcul en restent indépendants. Classement appliqué dans ECARTS.md (ligne « Charge de la machine » de chaque écart) :

- Dépendent de la charge (2) : E-29 détection des coupes par lecture accélérée : images perdues sur un film de 60 s, sans barre de progression ; E-72 pages fermées pendant les exports en série.
- Mécanisme fixe, ampleur liée à la charge (3) : E-05 premier son lent et pistes absentes pendant le chargement ; le son d'un film tombe alors sur la piste 01 ; E-13 chaque prise au micro tombe trop tôt, de 114 à 892 ms ; les couches successives se décalent en cascade ; E-30 image en retard sur le son : recalage seulement au-delà de 120 ms. La gravité reste celle d'origine : le mécanisme (minuterie, seuil, ordre des appels) existe sans charge.
- Existent quelle que soit la charge (95) : tous les autres, dont les seuils fixes (E-12, E-30), les calculs sur le fil principal (E-03, E-45), les plafonds (E-04, E-24, E-43, E-67) et les erreurs de calcul (E-07, E-06, E-22, E-53, E-54, E-57).

Gravités baissées d'un cran parce que l'écart repose sur une durée ou une panne mesurée sous forte charge :
- 01-01 (bloquant → important) et 01-10 (important → détail), réunis dans E-29 : la perte d'images vient d'une lecture à ×15 sous charge 40-53 ; le film de 29 s lu à ×7,25 sous la même charge donne 3 coupes sur 3.
- 03-06, 04-05, 06-06, partie plantages (important → détail), dans E-72 : toutes les pages fermées le sont à charge 41 à 108.
- La partie « nombre de rendus » des mêmes écarts reste importante (E-18) : 5 rendus comptés par interception, et des rapports de durée mesurés à charge 10 à 13 (Universal 111,7 s contre Neutral 6,6 s pour 35 s de son).

### 7.2 Module musik-fx.js et AudioWorklet

Le harnais laissait insertkoin/musik-fx.js hors de l'AudioWorklet ; en ligne, le module se charge depuis la même origine (ligne 711). Contrôle par grep des rapports : zéro mention de musik-fx, d'AudioWorklet ou d'effet `mz_` dans 01, 09 et 10, donc zéro écart à écarter. Le mastering Jazz de 09-11 (ligne 909) ne passe par aucun effet `mz_`. 02 et 03 chargent le module en Blob et vérifient `ctx._mz = true` : leurs mesures d'écho de bande et de larsen restent valables. 04, 05, 06 et 07 écrivent qu'aucun de leurs écarts n'en dépend.

### 7.3 Sources refusées par le proxy

Freesound, Wikimedia Commons et Openverse répondent 403 ou 000 dans la session (04, 06, 07). Zéro note et zéro écart visent leur contenu ; le ✕ affiché par l'application vient de la session. Seul Internet Archive répond.

### 7.4 Liste de contrôle du prompt, expert par expert

| Expert | Téléphone au doigt | Ordinateur à la souris | Preuve de chaque note | Chiffres sans mesure de la session | Autres manques |
|---|---|---|---|---|---|
| 01 Musique de film | oui (S1, S2, S3, S5, S6, S8) | oui, pc1366 et pc1920 | preuves pour une partie des cases, regroupées par scénario | zéro relevé | S4 et S7 joués à la souris seulement ; boîte γ jamais cliquée (Playwright) ; MP4 non joué ; restauration du projet non mesurée ; export du mix inachevé en 300 s |
| 02 Dub | oui, debout et couché | oui, pc1366 seul (pc1920 absent) | une preuve principale par scénario | zéro relevé | S4 à S8 et S10 mesurés au banc (`dubBus`, `renderOffline`) ; S5 et S11 par lecture du code ; prise en direct inexploitable sous charge |
| 03 Power electronics | oui, debout et couché | oui, pc1366 et pc1920 | une preuve principale par scénario, plus un paragraphe hors son | zéro relevé | S3 non rejoué au doigt ; S6 à S9 au banc moteur ; voix sans micro simulé ; charge non chiffrée ; correction de 03-07 réduite à un renvoi vers 03-01 |
| 04 Dark ambient | oui, portrait et paysage | oui, pc1366 et pc1920 (S8) | une preuve par note, par scénario | l'ondulation de 0,51 dB de Paulstretch vient du juge son, hors session | S6 par appel direct de `AT.convx` ; fondus au doigt en échec (2 essais) ; fondus du projet S4 posés par le code |
| 05 IDM | oui, debout et couché | oui, pc1366 et pc1920 | une preuve principale par scénario | zéro relevé | secondes au téléphone jugées sans valeur ; S3 à S8 mesurés par `seqWrite` et `renderOffline`, un ZIP par l'interface ; outils IDM de l'Atelier listés, non mesurés ; export du mix inachevé |
| 06 Néo-classique | oui, portrait et paysage | oui, pc1366 et pc1920 | preuves par critère et par plage de notes | zéro relevé | comparaison à BandLab sans mesure (BandLab injoignable) ; S2 sans résultat (Openverse refusé) |
| 07 Ethnomusicologie | oui, portrait et paysage | oui, pc1366 et pc1920 | preuves par critère et par plage de notes | zéro relevé | S2 et S3 par la requête du Studio rejouée hors de l'application ; S7 à S11 par appel direct de `yinTrack` ; boîtes η et θ lues dans le code, sans poids ; charge non chiffrée |
| 08 Ircam | oui, debout et couché | oui, pc1366 et pc1920 | une preuve par critère, regroupée | 08-14 (8 et 22 clics WSOLA) sans scénario ni méthode dans le rapport | traitements appelés comme fonctions dans la page, sans interface, pour S4 à S10 |
| 09 Jazz | oui, portrait et paysage | oui, pc1366 et pc1920 | une preuve principale par scénario | zéro relevé | clip de S1 en paysage non vérifié ; cases « — » de la comparaison non vérifiées ; 09-09 par lecture du code, plantage non provoqué |
| 10 Design et DA | oui, portrait et paysage | oui, pc1366 et pc1920 | une preuve par scénario, chiffrée | zéro relevé | pc1366 simple : cibles rognées non mesurées ; deux lancements de Chromium rejoués |

Constats communs :
- Chaque expert joue sur téléphone et sur ordinateur ; 02 joue l'ordinateur en 1 366 × 768 seulement.
- Aucun rapport donne une preuve distincte pour chacune des 9 notes de chaque scénario : les preuves sont regroupées par scénario ou par critère. Les notes de neuf critères restent donc en partie des jugements ; les mesures sous-jacentes, elles, sont chiffrées.
- Chaque écart a sa correction. 03-07 se corrige par renvoi à 03-01, fusionnés dans E-07.
- Plusieurs mesures passent par des appels directs aux fonctions de l'application (banc moteur) plutôt que par l'écran : elles mesurent le moteur réel, pas le geste. Le prompt demande de juger ce qui se voit et s'entend ; les experts 02, 03, 05, 07 et 08 le signalent eux-mêmes.
- L'interface s'ouvre en anglais dans le Chromium de test (01, 05, 06) : une partie des libellés relevés en anglais dépend de la langue du navigateur.

### 7.5 Liens vers les captures

Les dix rapports citent 138 captures distinctes ; les 138 fichiers existent dans docs/analyse/captures/ (contrôle par script). ECARTS.md cite 56 captures distinctes ; toutes existent.

### 7.6 Ce que la synthèse ajoute de son propre chef

- Les heures d'effort de la section 4 : estimations, sans mesure.
- Les écarts de Δ (3, 2, 1) du barème de gain : convention écrite avant le calcul, qui suppose qu'une correction remonte chaque note touchée d'autant de points. Le tour suivant de la roue mesure le gain réel.
- Le décompte des lettres grecques libres (16) et les vérifications de lignes 29, 197, 397, 713, 937, 1016, 1038, 1057, 1390, 2051, 2458, 2655, 2795 d'index.html : relus par l'agent de synthèse, conformes aux citations des rapports.
