# Expert 08 : techniques de composition de l'Ircam

Étalons : Boulez, Risset, Grisey, Murail, Saariaho, Manoury ; le GRM (Schaeffer, Bayle, Parmegiani, GRM Tools) ; AudioSculpt, SuperVP, Spat, Modalys, OpenMusic, Max. Usages jugés : analyse spectrale, séparation harmonique et percussive, wavesets, étirement de Paul, convolution croisée, spatialisation, doppler, analyse et resynthèse.

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| Design | 5,5 |
| Direction artistique | 6,2 |
| Puissance | 5,5 |
| Ergonomie | 4,5 |
| Simplicité intuitive | 6,2 |
| Exhaustivité | 4,8 |
| Pertinence | 6,6 |
| Originalité | 5,5 |
| Plaisir potentiel | 5,6 |
| Moyenne générale | 5,6 |

Les calculs sont justes et mesurables : séparation harmonique et percussive à 71,7 dB sur les sinus, convolution exacte (corrélation 1,0000), Paulstretch juste en hauteur. Trois défauts dominent. Sur téléphone, la barre d'action du clip reste invisible et la loupe spectrale n'a aucun accès. Le calcul spectral gèle l'interface. L'analyse-resynthèse par partiels est absente.

## Méthode

1. Signaux de test fabriqués dans la page : sinus 440 Hz, sinus 440 + 1 000 Hz, dent de scie 110 Hz, bruit filtré à 1 kHz haché à 2 Hz, clics à 4 par seconde, impulsions à 1 par seconde, sinus amorti 1 kHz de 0,4 s, sinus stéréo 220 Hz à gauche et 331 Hz à droite. Fichier WAV importé par l'interface : `test-sinus-clics.wav` (sinus 440 + 1 000 Hz et clics à 4 par seconde, 4 s).
2. Les fonctions de l'application sont appelées telles quelles dans la page (`AT.paul.run`, `hpss`, `AT.cross.run`, `AT.convx.run`, `AT.morph.run`, `AT.freeze.run`, `AT.wavesets.run`, `wsola`, `buildChain`). Les sorties sont analysées en Python (numpy, scipy) : FFT, enveloppes de 50 ms, fréquence instantanée par transformée de Hilbert.
3. Les scénarios sont joués au doigt (iPhone 13 debout et couché : `tap`, appui long et glissé par CDP) et à la souris (1 366 × 768 et 1 920 × 1 080).
4. Le mix exporté est mesuré avec `mesure.py` (EBU R128).
5. Limite : la machine de test (2 cœurs) partage sa charge avec neuf autres experts. Charge moyenne de 35 à 50 pendant la plupart des essais, puis de 10 pendant le banc d'essai final. Les durées en secondes de l'interface sont donc gonflées. Les durées de calcul de référence viennent du banc d'essai à charge 10.
6. Scripts et mesures : `/tmp/expert08/` (t1.py, spat.py, pc.py, pc2.py, ph2.py, ls.py, p19.py, bench.py, fichiers JSON).

## Scénarios

### S1. Importer un son et le poser sur une piste (débutant)

- Attendu : un clip sur la piste 01 en 5 actions au plus.
- Souris (1 366) : 3 actions. Onglet Fichiers, « Importer un son ou un film », glisser le son sur la piste. Durée mesurée : 25,2 s sous charge 35, dialogue de fichier compris. Captures : [clip posé](../captures/08-pc-clip-pose.webp).
- Doigt (iPhone debout) : 4 touchers. Onglet, Importer, appui tenu 0,6 s sur le son, toucher la piste. Une touche brève sur le son le fait écouter, sans le prendre. Durée : 43 à 51 s sous charge 45. Captures : [son pris](../captures/08-iphone-son-choisi.webp), [clip posé](../captures/08-iphone-clip-pose.webp).
- Résultat : atteint.

### S2. Lire le spectre d'un son (loupe)

- Attendu : spectrogramme avec fréquences lisibles. Les raies à 440 et 1 000 Hz doivent apparaître à leur hauteur exacte.
- Souris : 3 clics (clip, ⋯, Loupe). Les raies tombent à 44 % et 56 % de la hauteur du cadre. Une échelle logarithmique de 20 Hz à 22 050 Hz donne 44,1 % et 55,8 % : l'échelle est exacte. Elle n'affiche en revanche aucune graduation en Hz, aucune graduation de temps et aucune lecture de la valeur sous le pointeur. Cadre : 953 × 340 px à 1 366 et 1 070 × 340 px à 1 920. Captures : [loupe 1366](../captures/08-pc-loupe-spectre.webp), [loupe 1920](../captures/08-pc1920-loupe-spectre.webp).
- Doigt : impossible. La barre du clip reste invisible (voir 08-01), et le menu de l'appui long (20 entrées) ne propose pas « Loupe ». Capture : [menu de l'appui long](../captures/08-iphone-menu-clip-appui-long.webp).
- Résultat : atteint à la souris, impossible au doigt.

### S3. Zoom sémantique (la forme d'onde devient spectrogramme)

- Attendu : spectrogramme dans le clip à partir de 300 px/s.
- Souris : 4 clics sur Zoom + pour passer de 80 à 307 px/s. Les deux raies apparaissent dans le clip, sur environ 80 px de haut. Capture : [zoom](../captures/08-pc-zoom-spectrogramme.webp).
- Doigt : les boutons Zoom − et Zoom + mesurent 38 × 36 px sur iPhone, sous les 44 px.
- Résultat : atteint.

### S4. Séparer l'harmonique du percussif

- Attendu : sinus dans H, clics dans P, séparation supérieure à 20 dB, H + P égal à l'original.
- Mesure (4 s mono, médianes de 17 trames, `hpss` ligne 2155) :

| Mesure | Valeur |
|---|---|
| Sinus dans H | −11,8 dB (niveau d'origine −11,9 dB) |
| Fuite du sinus dans P | −83,5 dB, soit 71,7 dB de séparation |
| Clics dans P | −23,5 dB |
| Fuite des clics dans H | −44,2 dB, soit 20,8 dB de séparation |
| Erreur de reconstruction H + P − x | −150,5 dB |

- Calcul, à charge 10 : 6,6 s pour 4 s mono et 15,8 s pour 6 s stéréo. Le calcul tourne sur le fil principal. Sous charge 40, l'interface reste figée 37,3 s (plus long écart entre deux images). Sur iPhone, un clip de 32 s demande 703 s, sous charge 45.
- Souris : 4 clics (clip, ⋯, Séparer, Harmonique / percussif). Doigt : 3 touchers (appui long, Séparer ▸, Harmonique / percussif). Le résultat occupe deux pistes libres et l'original est coupé. Captures : [menu Séparer](../captures/08-pc-menu-separer.webp), [résultat](../captures/08-pc-hpss-resultat.webp), [résultat iPhone](../captures/08-iphone-hpss-resultat.webp).
- Résultat : atteint, avec une interface figée pendant le calcul.

### S5. Étirement de Paul

- Attendu : durée × facteur, hauteur gardée, transitoires dissous.
- Mesures :

| Essai | Durée | Pic | Largeur à −20 dB | Ondulation (50 ms) | Calcul |
|---|---|---|---|---|---|
| Sinus 440 Hz, 2 s, ×8 | 16,0 s | 440,9 Hz | 12,2 Hz | 21,8 dB | 1,28 s pour 4 s ×8 à charge 10 |
| Sinus 440 Hz, 2 s, ×64 | 128,0 s | 439,9 Hz | 13,2 Hz | 27,3 dB | 13,1 s à charge 10 |

- Étalon : l'algorithme de Paul Nasca (fenêtre (1−t²)^1,25, phases aléatoires), recodé en numpy sur le même sinus, donne 18,7 dB d'ondulation. L'écart de +3,1 dB reste dans la nature de la méthode à phases aléatoires.
- Clics à 4 par seconde, ×8 : facteur de crête de 15,6 dB, les clics deviennent un souffle continu.
- Plafond : 10 s × 64 donnent 600 s au lieu de 640 s (ligne 2052 : `Math.min(…, b.sampleRate*600)`). Le curseur s'arrête à ×64.
- Souris : 5 clics (clip, ⋯, Atelier, Paulstretch, OK). Doigt : 4 touchers (appui long, Atelier ▸, Paulstretch, OK). L'interface reste figée 15,8 s sous charge. Le dialogue n'offre ni écoute avant validation ni saisie chiffrée. Captures : [menu Atelier](../captures/08-pc-menu-atelier.webp), [dialogue](../captures/08-pc-paulstretch-dialogue.webp), [résultat](../captures/08-pc-paulstretch-resultat.webp), [dialogue iPhone](../captures/08-iphone-paulstretch-dialogue.webp).
- Résultat : atteint jusqu'à ×64 et 600 s.

### S6. Gel spectral et flou

- Attendu : son fixe de durée choisie, raie dominante gardée.
- Sinus 440 Hz + bruit (2 s), gel de 12 s : durée 12,0 s, pic 442,8 Hz, ondulation de 15,8 dB sur des fenêtres de 50 ms. La durée plafonne à 120 s (ligne 2054).
- Gestes identiques à S5 : 5 clics à la souris, 4 touchers au doigt.
- Résultat : atteint, avec une durée bornée à 120 s.

### S7. Convolution croisée de deux clips

- Attendu : sortie égale au produit de convolution, de longueur A + B.
- Quatre impulsions à 1 par seconde, convoluées par un sinus amorti de 1 kHz : longueur 4,40 s (4 + 0,4), corrélation avec la réponse de 1,0000, retard nul (le pic du sinus tombe à l'échantillon 11). La crête est ramenée à celle de la source (−0,92 dBFS). Les canaux gauche et droit sont identiques (source mono).
- Souris : 7 actions (clip B, Copier, clip A, ⋯, Atelier, Convolution, OK). Calcul : 8,3 s sous charge, avec 3,4 s de gel de l'interface. Effet de bord mesuré : « Copier » duplique aussi le clip. Un second clip apparaît à 4,75 s sur la piste 02, car la ligne 1701 enchaîne `clipboard={...c}` et `dupSel()`. Capture : [dialogue](../captures/08-pc-convolution-dialogue.webp).
- Doigt : « Copier » figure dans le menu de l'appui long. Le parcours compte 6 touchers.
- Résultat : atteint, avec un clip en trop.

### S8. Synthèse croisée (vocodeur) et morphing

- Attendu (synthèse croisée) : les harmoniques de la porteuse, sous l'enveloppe et le hachage du modulateur.
- Porteuse en dent de scie 110 Hz, modulateur en bruit à 1 kHz haché à 2 Hz :
  - contraste harmoniques / inter-harmoniques de 26,6 dB, contre 36,8 dB dans la dent de scie seule, soit 10,2 dB perdus par les phases aléatoires de `synthRandom` (ligne 2037) ;
  - centroïde de 1 318 Hz ;
  - hachage du modulateur rendu en entier (silence complet entre les salves).
- Morphing de 4 s d'un sinus 440 Hz vers un sinus 880 Hz : creux de 48,6 dB au milieu (−13,5 dB au début, −62,1 dB à 2,1 s, −23,1 dB à la fin). La moyenne géométrique des amplitudes (ligne 2062, `A^(1−t)·B^t`) annule deux spectres qui ne se recouvrent pas.
- Souris : 7 actions, comme en S7. Calcul de la synthèse croisée : 19,4 s sous charge. Le dialogue affiche « Smooth » et « Window s » en mode français. Capture : [dialogue](../captures/08-pc-croisee-dialogue.webp).
- Résultat : partiel pour la synthèse croisée, faux pour le morphing de spectres disjoints.

### S9. Wavesets

- Attendu : répétition de chaque cycle ×3 sans saut, sur chaque canal.
- Source stéréo de 1 s, mode Répéter, N = 3 : sortie de 3,00 s, aucun saut sur le canal gauche, 852 sauts sur le canal droit (dérivée seconde > 0,05). Les passages par zéro viennent du seul canal gauche (ligne 2079 : `x0=b.getChannelData(0)`).
- Dialogue à 1 920 : le libellé « Repeat·Omit·Reverse·Shuffle » et la valeur « Repeat » restent en anglais en mode français. Capture : [dialogue](../captures/08-pc1920-wavesets-dialogue.webp).
- Résultat : juste en mono, faux en stéréo.

### S10. Spatialiser et faire un Doppler sur la scène

- Attendu : position audible (temps d'arrivée, niveau, filtrage), Doppler égal à la physique, scène utilisable au doigt.
- Rendu par `buildChain` (lignes 1021 à 1048), impulsion de test :

| Pan / profondeur | Arrivée mesurée | Arrivée attendue | Gauche | Droite | Coupure −3 dB | Réverbération − direct |
|---|---|---|---|---|---|---|
| 0 / 0 | 2,90 ms | 0 ms | −6,3 dB | −6,3 dB | 20 510 Hz | aucune |
| 1 / 0 | 20,41 ms | 17,49 ms | silence | −7,7 dB | 11 402 Hz | aucune |
| 0,5 / 0 | 11,66 ms | 8,75 ms | −13,5 dB | −5,9 dB | 13 049 Hz | aucune |
| 0,5 / 0,5 | 25,12 ms | 22,20 ms | −19,7 dB | −12,0 dB | 9 722 Hz | −12,7 dB |
| 0 / 1 (14 m) | 43,79 ms | 40,82 ms | −24,8 dB | −24,8 dB | 4 457 Hz | −5,4 dB |

  - Le temps de l'air suit la distance, avec une latence fixe de 2,9 ms.
  - L'écart de temps entre les oreilles reste nul (0 échantillon) : `StereoPanner` à puissance constante.
  - Aucun placement en hauteur ou derrière l'auditeur, aucune HRTF, aucune sortie ambisonique.
  - À 14 m, la coupure à 4,5 kHz dépasse de loin l'absorption réelle de l'air.
- Doppler : glissé de la profondeur 0 à 14 m, avec la logique de `apply()` (ligne 2719) rejouée en rendu hors ligne et un événement toutes les 16 ms, sur un sinus de 1 kHz.

| Durée du glissé | Vitesse | Physique | Studio |
|---|---|---|---|
| 0,2 s | 70 m/s | −322 cents | −219 cents |
| 0,5 s | 28 m/s | −136 cents | −181 cents |
| 2,0 s | 7 m/s | −35 cents | −79 cents |

- Souris : 2 clics (bouton Atelier, bouton Scène). Objets de 41 px. Deux objets superposés font apparaître trois touches de 44 à 47 px (se repoussent, se fondent, rien). Captures : [scène](../captures/08-pc1366-scene.webp), [après glissé](../captures/08-pc1366-scene-friction.webp).
- Doigt : 3 touchers (⋯, Atelier, Scène). Objets de 22 × 22 px. La scène mesure 390 × 127 px debout et 664 × 64 px couché. Le glissé au doigt fonctionne (pan 0,81, profondeur 0,90). Captures : [scène iPhone](../captures/08-iphone-scene-apres-glisse.webp), [scène paysage](../captures/08-iphone-paysage-scene.webp).
- Résultat : partiel (stéréo seule, Doppler faux d'un facteur de 0,7 à 2,3).

### S11. Analyse et resynthèse

- Attendu : suivi de partiels, édition, puis resynthèse additive, à la manière d'AudioSculpt ou de Partiel.
- Le code ne contient ni suivi de partiels ni resynthèse additive (0 occurrence de « partial », « resynth » ou « additive », hors du nom de son « Additive choir »). L'outil le plus proche est la gomme spectrale de la loupe, rectangulaire et accessible à la souris seulement.
- Résultat : absent.

### S12. Exporter et mesurer

- Export WAV du mix S4 + S7 + S8 : 3 clics (Export, WAV, téléchargement). Durée 8,83 s, −13,9 LUFS (cible −14), crête −6,29 dBFS, vraie crête −4,44 dBTP. Le mix respecte la cible de sonie.

## Notes par scénario

| Scénario | Design | DA | Puissance | Ergonomie | Simplicité | Exhaustivité | Pertinence | Originalité | Plaisir | Moy. |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 Import et pose | 7 | 7 | 6 | 7 | 8 | 6 | 8 | 5 | 7 | 6,8 |
| S2 Loupe spectrale | 6 | 7 | 5 | 4 | 6 | 4 | 7 | 6 | 6 | 5,7 |
| S3 Zoom sémantique | 7 | 7 | 6 | 7 | 8 | 5 | 7 | 8 | 7 | 6,9 |
| S4 Harmonique / percussif | 5 | 6 | 8 | 3 | 7 | 7 | 8 | 5 | 5 | 6,0 |
| S5 Paulstretch | 6 | 6 | 7 | 5 | 7 | 6 | 8 | 5 | 7 | 6,3 |
| S6 Gel et flou | 6 | 6 | 6 | 5 | 7 | 5 | 7 | 5 | 6 | 5,9 |
| S7 Convolution | 5 | 6 | 8 | 4 | 5 | 6 | 8 | 6 | 6 | 6,0 |
| S8 Synthèse croisée et morphing | 5 | 6 | 5 | 4 | 5 | 5 | 6 | 6 | 5 | 5,2 |
| S9 Wavesets | 5 | 6 | 4 | 5 | 6 | 5 | 6 | 6 | 5 | 5,3 |
| S10 Scène et Doppler | 6 | 8 | 4 | 4 | 7 | 3 | 5 | 7 | 6 | 5,6 |
| S11 Analyse et resynthèse | 2 | 3 | 1 | 2 | 2 | 1 | 3 | 2 | 2 | 2,0 |
| Moyenne | 5,5 | 6,2 | 5,5 | 4,5 | 6,2 | 4,8 | 6,6 | 5,5 | 5,6 | 5,6 |

Preuves des notes :

- Design. La barre du clip à la souris (boutons de 50 px de haut à 1 920) et la loupe en pictogrammes ◩ ♪ ✎ ✚ ▢ fonctionnent. La loupe n'a aucune graduation (S2). Sur téléphone, la barre du clip reste invisible (08-01).
- Direction artistique. La scène reprend la photographie d'une cave sous un tube, avec objets lumineux (S10). Les dialogues de l'Atelier restent des curseurs nus, avec des libellés anglais (S5, S8, S9).
- Puissance. Les mesures de S4 et S7 sont justes. Les plafonds ×64, 600 s et 120 s, le morphing faux, les wavesets stéréo faux et l'absence de resynthèse font baisser la note (S5, S6, S8, S9, S11).
- Ergonomie. L'interface se fige 37 s pendant la séparation (S4). Le téléphone n'a ni barre du clip, ni loupe. Les entrées de menu mesurent 26 px debout et 16 px couché. Les objets de scène mesurent 22 px (S10).
- Simplicité. Le chemin vers l'Atelier compte 4 ou 5 gestes, sans réglage obligatoire (S4, S5). Les outils à deux clips passent par « Copier », qui duplique aussi le clip (S7).
- Exhaustivité. Quinze traitements d'Atelier et cinq séparations existent. Le suivi de partiels, la spatialisation 3D, le spectre modifiable en temps réel et l'écoute avant validation manquent (S2, S10, S11).
- Pertinence. Les outils choisis (Paulstretch, gel, HPSS de FitzGerald, wavesets de Wishart, convolution) correspondent au répertoire de la musique concrète et spectrale.
- Originalité. Le zoom sémantique (S3), la scène en mètres réels avec Doppler, et les objets qui se repoussent ou se fondent (S10) sortent du lot.
- Plaisir. Le parcours son → étirement → séparation se fait sans menu caché à la souris. Les attentes figées et l'impossibilité d'agir au doigt l'entament.

## Comparaison aux outils de référence

| Usage | Studio (mesuré) | Référence | Source |
|---|---|---|---|
| Spectrogramme | échelle log exacte de 20 Hz à 22 kHz, sans graduation ni lecture, à la souris seulement | AudioSculpt : sonagramme d'analyse et de traitement | https://forum.ircam.fr/product/audiosculpt |
| Étirement, synthèse croisée | Paulstretch ×64 et 600 s au plus ; synthèse croisée à phases aléatoires (−10,2 dB de contraste harmonique) | SuperVP : moteur de vocodeur de phase d'AudioSculpt, synthèse croisée généralisée | https://forum.ircam.fr/topics/detail/210-SuperVP ; https://discussion.forum.ircam.fr/t/supervp-generalized-cross-synthesis/2761 |
| Étirement extrême | ondulation de 21,8 dB sur sinus, contre 18,7 dB pour l'algorithme de Nasca recodé | Paulstretch de Paul Nasca et ses dérivés | https://www.github.com/akx/paulstretch ; https://github.com/essej/paulxstretch/blob/main/README.md |
| Harmonique / percussif | 71,7 dB et 20,8 dB de séparation, reconstruction à −150,5 dB | FitzGerald, DAFx 2010 | https://www.audiolabs-erlangen.com/resources/aps-w23/papers/2010_FitzGerald_HarmonicPercussiveSep_DAFx.pdf ; https://audiolabs-erlangen.de/resources/MIR/FMP/C8/C8S1_HPS.html |
| Wavesets | juste en mono, 852 sauts sur le canal droit en stéréo | CDP Distort de Trevor Wishart | https://composersdesktop.com/docs/html/cdistort.htm |
| Spatialisation | stéréo à puissance constante, aucun écart de temps entre les oreilles, aucune HRTF ni ambisonie | Spat de l'Ircam : binaural, HOA, VBAP | https://discussion.forum.ircam.fr/t/best-ambisonic-binaural-combination/22780 ; https://www.ircam.fr/recherche/equipes-recherche/eac/panoramix |
| Traitement spectral en temps réel | absent : tout traitement est un calcul hors ligne qui remplace le clip | GRM Tools (Evolution, Spectral Transform) | https://www.kvraudio.com/product/grm-tools-evolution-by-ina---grm ; https://www.kvraudio.com/product/grm-tools-spectral-transform-by-ina---grm/details |
| Base grand public | quinze outils d'Atelier et cinq séparations | BandLab : le relevé du dépôt ne mentionne aucun outil spectral (Looper avec Filter, Gater, Stutter, Tape Stop) | BANDLAB-RELEVE.md ; https://help.bandlab.com/hc/en-us/articles/115004496573-Using-the-Looper |

Face à BandLab, le Studio offre plus d'outils de composition spectrale, avec des calculs justes. Face à AudioSculpt et Spat, il lui manque l'analyse par partiels, les axes de lecture, la 3D et le temps réel.

## Écarts

| N° | Gravité | Écart | Preuve | Correction |
|---|---|---|---|---|
| 08-01 | bloquant | Sur téléphone, la barre d'action du clip reste invisible. Le clip se sélectionne (contour, 5 boutons créés), mais `#abar` (y = 353, z-index 12) passe sous `.lane` debout et sous un `canvas` couché. `elementFromPoint` au centre de chaque bouton rend « lane » ou « CANVAS ». La loupe, la gomme spectrale, les Tranches et l'Étirement deviennent inaccessibles au doigt. | [debout](../captures/08-iphone-barre-clip-cachee.webp), [couché](../captures/08-iphone-paysage-barre-clip-cachee.webp) ; CSS ligne 197 | Sortir `#abar` du flux du pied de page : `position:fixed` juste au-dessus du pied, avec un z-index supérieur à `#tracks`. Ajouter « Loupe » au menu de l'appui long (`clipMenu`, vers la ligne 2246). |
| 08-02 | important | La séparation harmonique / percussive et les traitements de l'Atelier tournent sur le fil principal : interface figée 37,3 s (séparation) et 15,8 s (Paulstretch) sous charge. Calcul de 6,6 s pour 4 s mono à charge 10. | S4, S5 ; `hpss` ligne 2155, `processClip` ligne 2228 | Passer `hpss`, `spectralRender` et `wsola` dans un Worker (transfert des Float32Array), avec une jauge de progression et une touche d'arrêt. |
| 08-03 | important | Le morphing par moyenne géométrique annule deux spectres disjoints : creux de 48,6 dB entre 440 et 880 Hz. | S8 ; ligne 2062 | Interpoler les amplitudes linéairement, ou séparer l'enveloppe (interpolée) et les pics (fréquences glissées d'un spectre à l'autre). |
| 08-04 | important | Les wavesets en stéréo produisent 852 sauts sur le canal droit. | S9 ; ligne 2079 | Calculer les passages par zéro sur chaque canal, avec un plan propre à chaque canal. |
| 08-05 | important | L'analyse-resynthèse par partiels est absente. | S11 | Ajouter un onglet « Partiels » dans la loupe : détection de pics, suivi McAulay-Quatieri, partiels dessinés sur le spectre, suppression ou transposition au toucher, resynthèse par banc d'oscillateurs. |
| 08-06 | important | La spatialisation reste stéréo : écart de temps nul entre les oreilles, ni hauteur, ni arrière, ni HRTF, ni ambisonie. | S10 ; `createStereoPanner` ligne 1026 | Remplacer le panoramique par un `PannerNode` en `panningModel:"HRTF"` (x = pan × 3 m, z = −profondeur × 14 m), ajouter un axe de hauteur, et une option d'export ambisonique d'ordre 1 (4 canaux). |
| 08-07 | important | Le Doppler s'écarte de la physique : −219 cents pour −322 à 70 m/s, −79 cents pour −35 à 7 m/s. | S10 ; `apply` ligne 2719 | Échantillonner la trajectoire du doigt, lisser le temps de retard avec une constante unique (30 ms) par `setValueCurveAtTime`, sans annuler la rampe à chaque événement. Calculer le retard depuis la position seule. |
| 08-08 | important | Le spectrogramme de la loupe n'affiche aucune graduation en Hz ni en temps, et aucune lecture sous le pointeur. | [loupe](../captures/08-pc-loupe-spectre.webp) | Graduer le bord gauche (50, 100, 200, 500 Hz, 1, 2, 5, 10 kHz) et le bas en secondes. Afficher Hz, dB et temps sous le doigt ou la souris. |
| 08-09 | important | « Copier » duplique aussi le clip, ce qui ajoute un clip à chaque convolution, synthèse croisée ou morphing. | S7 ; ligne 1701 | Séparer Copier (presse-papier seul) de Dupliquer, qui existe déjà dans le menu de l'appui long. |
| 08-10 | important | Les cibles tactiles sont trop petites : entrées de menu de 26 px debout et 16 px couché, objets de scène de 22 px, scène de 664 × 64 px couché, Zoom de 38 × 36 px. | S2, S3, S10 ; `ph2-*.json`, `ls.py` | Entrées de menu de 44 px au moins. Scène en plein écran sur téléphone. Objets de scène de 44 px au moins. |
| 08-11 | important | Plafonds de durée : Paulstretch à ×64 et 600 s, gel à 120 s. | S5, S6 ; lignes 2051 à 2055 | Rendre par blocs successifs (fichier temporaire en OPFS ou IndexedDB), relever le facteur à ×10 000 et la durée à 3 600 s. |
| 08-12 | détail | Libellés anglais dans les dialogues de l'Atelier en mode français : « Window s », « Smooth », « Repeat·Omit·Reverse·Shuffle ». | [croisée](../captures/08-pc-croisee-dialogue.webp), [wavesets](../captures/08-pc1920-wavesets-dialogue.webp) ; `AT_PN` ligne 2103 | Table française, ou pictogrammes à la place des libellés. |
| 08-13 | détail | La synthèse croisée perd 10,2 dB de contraste harmonique, à cause des phases aléatoires. | S8 ; `synthRandom` ligne 2037 | Garder les phases de la porteuse et appliquer seulement le rapport des enveloppes. |
| 08-14 | détail | L'étirement WSOLA à 50 % multiplie les clics : 8 clics à l'entrée, 22 à la sortie au-dessus de 0,3. | `wsola` ligne 1158 | Verrouiller les attaques : copier les trames d'attaque une seule fois et étirer seulement entre deux attaques. |
| 08-15 | détail | Aucune écoute avant validation dans l'Atelier : pour entendre un réglage, il faut l'appliquer puis l'annuler. | dialogues S5 à S9 | Ajouter une touche ▶ qui calcule les 4 premières secondes et les joue en boucle. |
| 08-16 | détail | Aucun traitement spectral en temps réel dans le rack de piste (gel, flou), à la manière des GRM Tools. | S6 | Ajouter un AudioWorklet de gel et de flou spectral par piste, avec une commande tenue au doigt. |

## À garder tel quel

- La séparation harmonique / percussive : 71,7 dB sur les sinus, 20,8 dB sur les clics, reconstruction à −150,5 dB.
- La convolution entre deux clips : corrélation 1,0000, longueur A + B, crête ramenée à celle de la source.
- Paulstretch : hauteur juste (440,9 Hz), ondulation proche de l'algorithme d'origine.
- L'échelle logarithmique exacte de la loupe et le zoom sémantique en spectrogramme, à partir de 307 px/s.
- La scène en mètres réels : temps d'arrivée égal à la distance divisée par 343 m/s, plus 2,9 ms fixes.
- Les objets de scène qui se repoussent ou se fondent, avec des touches de 44 à 47 px à la souris.
- Le menu de l'appui long sur téléphone, qui donne l'Atelier et Séparer en 3 ou 4 touchers.
- Le mix exporté à −13,9 LUFS pour une cible de −14.
