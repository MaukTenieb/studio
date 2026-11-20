# Expert 03 — Power electronics

Étalons : Whitehouse, Sutcliffe Jügend, Ramleh et Broken Flag, Con-Dom, Genocide Organ, Prurient, Pharmakon, Merzbow. Domaine mesuré : bruit du studio au repos, larsen, saturations empilées, emballement, voix saturée, boîtes « tribute to », exports (crête, vraie crête, sonie, composante continue, queue).

## Récapitulatif

| Critère | Note moyenne /10 |
|---|---|
| 1. Design | 6,1 |
| 2. Direction artistique | 6,4 |
| 3. Puissance | 4,8 |
| 4. Ergonomie | 5,5 |
| 5. Simplicité intuitive | 6,0 |
| 6. Exhaustivité | 6,0 |
| 7. Pertinence | 5,3 |
| 8. Originalité | 6,1 |
| 9. Plaisir potentiel | 4,6 |
| Moyenne générale | 5,6 |

Constat principal : le studio se tait presque au repos (−78,1 dBFS), le larsen reste borné et ne produit aucun NaN, mais toutes les saturations écrivent une composante continue (courant continu numérique) dans le son. Avec le mastering « Noise », l'export WAV contient −12,8 dBFS de composante continue et dépasse le plafond de vraie crête de 1,19 dB.

## Méthode

- Copie locale servie sur http://localhost:8765/, harnais Playwright de /home/claude/outil, Chromium sans écran.
- Formats joués : iPhone 13 debout et couché (touchers, appui long par CDP), ordinateur 1 366 × 768 et 1 920 × 1 080 (souris).
- Mesure en direct : un script injecté avant le chargement branche une prise d'écoute sur chaque connexion vers la sortie du contexte audio (blocs de 4 096 échantillons : crête, RMS, NaN). Elle mesure ce qui sort des haut-parleurs, sans rien changer au graphe du studio.
- Mesure des fichiers : python3 /home/claude/outil/mesure.py (crête, vraie crête ×4, LUFS EBU R128, repos, queue), plus la moyenne des échantillons pour la composante continue.
- Banc moteur : pour les mesures de stabilité (S7 à S9), j'appelle dans la page les fonctions du studio (mkFX, CHAINS, buildMaster, renderOffline, masteredRender) dans un OfflineAudioContext. Le son vient donc du moteur réel du studio, sans toucher d'écran.
- Limite 1 : le routage du harnais ne sert pas les modules AudioWorklet chargés depuis mauktenieb.github.io (le proxy refuse ce domaine, erreur 403). Sans correctif, les effets de Musik (Boucle de larsen, Résonateur métallique, Écho à bande…) passent le son tel quel, et un larsen mesuré ainsi s'éteint. J'ai ajouté un script injecté qui lit musik-fx.js par fetch (servi par le harnais depuis la copie locale d'insertkoin) et le charge en Blob. Toutes les mesures de larsen ci-dessous viennent de cette seconde série, avec `ctx._mz = true` vérifié.
- Limite 2 : la machine (2 cœurs) fait tourner les dix experts en même temps. Les durées d'export mesurées sont donc plus longues que sur un ordinateur seul ; je les donne telles quelles, avec ce biais.
- Limite 3 : aucun micro simulé dans le harnais. La voix hurlée se mesure sur un bruit d'entrée, pas sur une prise de voix.

## Scénarios

Chaque scénario donne : gestes au doigt et à la souris, écrans traversés, secondes, résultat attendu, résultat mesuré.

### S1. Premier contact : le studio vide se tait

- Attendu : sortie ≤ −90 dBFS au repos, sans composante continue.
- Doigt (iPhone debout) : 2 touchers (lecture, arrêt), 1 écran, 1,5 s. Souris (1 366) : 2 clics, 1 écran.
- Mesuré sur 6 s après l'arrêt : crête −78,1 dBFS, RMS −78,1 dBFS, zéro NaN, sur les deux formats. Crête égale RMS : c'est un niveau constant, donc une composante continue, pas un souffle.
- Cause mesurée au banc : la chaîne du master « Universal » (préréglage par défaut) rend −0,000124 sur une entrée nulle (−78,1 dBFS). « Neutral » rend 0,0 exact. La saturation de bande du master (`tapeCurve`, index.html ligne 937) calcule sa courbe avec `x=i/n*2-1` : le point milieu de la courbe ne tombe pas sur zéro.
- Capture : [ouverture](../captures/03-ouverture-iphone.webp).

### S2. Export d'un projet vide

- Attendu : un fichier de silence, ou un pictogramme qui dit « rien à exporter ».
- Doigt : 3 touchers (⋯, Export, WAV), 2 écrans (menu, dialogue). Souris : 2 clics (Export, WAV mix).
- Mesuré : zéro fichier après 15 s d'attente, zéro message (zone de message vide), sur iPhone et sur 1 366. Le code s'arrête sans rien dire : `renderOffline` rend `null` quand `projEnd()` vaut 0 (lignes 1295-1296), `doExport` sort par `if(!r)return;` (ligne 1323) et saute le toast.
- Captures : [menu ⋯](../captures/03-menu-plus-iphone.webp), [dialogue d'export](../captures/03-export-dialogue-iphone.webp), [après le toucher WAV](../captures/03-export-vide-iphone.webp), [ordinateur](../captures/03-export-vide-pc1366.webp).

### S3. Tronçonneuse suédoise (HM-2) posée sur une piste vide

- Attendu : piste vide = silence, en lecture comme à l'arrêt.
- Souris : 3 actions (bouton effets de la piste 01, liste « Chain preset », « Swedish chainsaw »), 1 écran, 4 s. Doigt : le rack s'ouvre par le même bouton ; non rejoué au doigt (machine saturée, voir limites).
- Mesuré en lecture (piste vide) : −28,3 dBFS crête et RMS, constant : composante continue de la distorsion. À l'arrêt : −74,3 dBFS dans la première demi-seconde, puis −78,1 dBFS. Chaque lecture et chaque arrêt font donc passer la sortie de −78 à −28 dBFS en continu, ce qui produit un choc grave à chaque départ.
- Capture : [rack de la piste](../captures/03-rack-piste-pc1366.webp).

### S4. Larsen micro + HM-2, lecture, arrêt, retour au silence, export

- Attendu : larsen fort en lecture ; silence en moins de 1 s après l'arrêt ; export sans queue infinie.
- Souris : ouvrir « Noise boxes » (1 clic, 6 s de calcul des 18 boîtes), glisser « Mic howl » sur la piste 01 (1 geste), lecture et arrêt (2 clics), export (2 clics) : 6 actions, 2 écrans (studio, dialogue).
- Doigt (iPhone couché) : appui long sur « Mic howl » puis toucher sur la piste : 2 gestes, mais aucun clip posé ; la liste des boîtes reste hors de vue sous le titre « Noise boxes » (1 piste et 1 ligne de bibliothèque visibles en paysage). Captures : [son pris](../captures/03-larsen-pris-iphone-paysage.webp), [après le toucher](../captures/03-larsen-pose-iphone-paysage.webp).
- Mesuré en lecture (ordinateur) : crête −2,1 dBFS, RMS −14,1 dBFS.
- Mesuré après l'arrêt, par demi-seconde : −38,8 ; −55,4 ; −63,8 (à 1 s) ; −76,4 (à 2 s) ; −78,0 (à 3 s) ; −78,1 dBFS (à 5 s). Le retour au plancher prend 3 s : la porte du repos ferme avec une constante de temps de 0,35 s (`restGate`, ligne 963).
- Export WAV : 17,13 s pour un clip de 4 s ; crête −12,76 dBFS ; vraie crête −12,63 dBTP ; −13,8 LUFS (cible −14) ; repos −40,7 dBFS ; queue « inf » ; composante continue −46,5 dBFS ; dernier échantillon −0,0093 (le fichier se coupe net). `trimTail` (ligne 1310) cherche le dernier échantillon au-dessus de 1e-4 : la composante continue reste au-dessus, donc la queue de 10 s n'est jamais rognée.
- Durée de l'export : 195,7 s.
- Capture : [larsen posé, rack HM-2](../captures/03-larsen-pose-pc1366.webp).

### S5. Boîte Α « tribute to Whitehouse »

- Attendu : en 3 touchers au plus, le studio prend la chaîne de la boîte et propose les sons à chercher.
- Doigt : 3 touchers (Artist boxes, Power electronics, Α), debout et couché ; la piste reçoit 4 effets (anneau, boucle de larsen, écraseur, distorsion). Souris : 3 clics. Le tiroir montre la chaîne, 4 recherches de sons et 2 gestes sur clip.
- Mesuré en lecture sans clip sous la tête : −34,1 dBFS constant (composante continue de la chaîne Α), en paysage comme sur ordinateur. Après l'arrêt : −58,3, −69,3, −76,6 (à 1 s), −78,1 dBFS (à 2 s).
- Export (Mic howl + Α) : premier essai par l'interface, aucun fichier après 601 s. Deuxième essai au banc : un rendu seul de 14 s prend 60,4 s (machine moins chargée) puis 124,6 s ; le rendu masterisé (boucle de sonie, jusqu'à 5 rendus) prend 370,8 s ; résultat −14,0 LUFS, crête −8,26 dBFS.
- La boîte garde le mastering « Universal » et le plafond −1 dB : elle ne touche pas au master.
- Captures : [tiroir des boîtes, téléphone](../captures/03-boites-pe-iphone.webp), [boîte ouverte, téléphone](../captures/03-boite-alpha-ouverte-iphone.webp), [paysage](../captures/03-boite-alpha-ouverte-iphone-paysage.webp), [ordinateur](../captures/03-boite-alpha-pc1366.webp).

### S6. Mastering « Noise » : repos et export

- Attendu : le préréglage du genre garde le silence au repos, et l'export respecte son plafond (−0,5 dB) en vraie crête.
- Souris : 2 actions (liste des masterings, « Noise »).
- Mesuré au repos, après arrêt : −10,2 dBFS dans la première demi-seconde, puis −28,7, −32,5, et −32,7 dBFS stables (constant, crête = RMS). En lecture avec la chaîne Α sans clip : −1,7 dBFS constant.
- Banc master seul, entrée nulle, 1 s : « Noise » avec limiteur rend −0,0231 (−32,7 dBFS) ; sans limiteur −0,0051 ; « Universal » −0,000124.
- Export au banc (boîte « Noise wall », chaîne « Mur de bruit », mastering « Noise », sans cible de sonie) : crête −1,42 dBFS ; vraie crête +0,69 dBTP, au-dessus du plafond de −0,5 de 1,19 dB ; −3,6 LUFS ; composante continue −12,8 dBFS sur chaque canal. Durée 123,5 s.
- `capPeak` (ligne 1004) borne la crête échantillon, jamais la vraie crête.

### S7. Larsen maîtrisé : dose de la Boucle de larsen

- Attendu : de 0 à 1, un larsen qui monte par degrés, tenu sans fin, borné, sans NaN.
- Banc : salve de bruit de 0,5 s à −12 dBFS, puis bruit de fond à −90 dBFS, 20 à 60 s.
- Mesuré (RMS tenu après la salve) : dose 0,5 et 0,6 : extinction (−91 dBFS, −240 dB à 5 s) ; 0,7 : −15,2 dBFS ; 0,75 : −11,9 ; 0,9 : −7,3 ; 1 : −5,5 dBFS. Sur 60 s, la dose 1 varie de −5,6 à −6,4 dBFS RMS, crête −3,9 dBFS ; zéro NaN.
- La chaîne Η (larsen 0,9, égaliseur, distorsion) reste à −12,7 dBFS RMS pendant 60 s ; la chaîne Α empilée deux fois reste à −12,7 dBFS. Stable.
- Écart : entre 0,6 et 0,7, la sortie passe du silence à −15 dBFS. Le réglage n'offre aucune zone de larsen naissant.

### S8. Emballement : trois larsens et un écho à réinjection 0,95

- Attendu : le studio borne la somme sous 0 dBFS, ou la réduit.
- Banc : Boucle de larsen dose 1 ×3, puis Écho réinjection 0,95, mélange 1, sur une piste.
- Mesuré à la sortie de la piste (avant le master) : RMS +8,8 dBFS dans les 5 premières secondes, +11,2 à 5 s, +12,2 à 20 s, +12,0 à 55 s ; crête +21,7 puis +24,6 dBFS à 55 s ; zéro NaN. Le son ne redescend jamais.
- Le Résonateur réglé au maximum s'éteint (−147,7 dBFS à 5 s) : la correction du juge son reste valable.

### S9. Saturations empilées : saut de niveau des chaînes

- Attendu : écart de niveau ≤ ±3 dB entre entrée et sortie, pour qu'on compare les chaînes à l'oreille ; aucune crête au-dessus de 0 dBFS.
- Banc : bruit blanc d'entrée, RMS −24,8 dBFS, 3 s, chaque chaîne seule.

| Chaîne | Écart RMS | Crête de sortie | Composante continue à vide |
|---|---|---|---|
| Α | +11,6 dB | −9,9 dBFS | −47,3 dBFS |
| Β | −19,2 dB | −30,4 dBFS | absente |
| Γ | +11,5 dB | −9,1 dBFS | −45,8 dBFS |
| Δ | +6,8 dB | −11,9 dBFS | −49,1 dBFS |
| Ε | +12,0 dB | −9,4 dBFS | −46,5 dBFS |
| Ζ | +4,0 dB | −9,2 dBFS | absente |
| Η | +12,0 dB | −9,7 dBFS | −44,1 dBFS |
| Θ | +8,6 dB | −7,9 dBFS | −39,7 dBFS |
| Ι | +5,9 dB | −7,6 dBFS | −33,7 dBFS |
| Κ | +16,0 dB | +1,1 dBFS | −29,8 dBFS |
| Λ | +4,7 dB | −10,3 dBFS | −41,4 dBFS |
| Μ | +6,7 dB | −6,3 dBFS | −38,4 dBFS |
| Voix saturée | +9,6 dB | −5,0 dBFS | −49,0 dBFS |
| Tronçonneuse suédoise (HM-2) | +8,4 dB | −6,7 dBFS | −38,4 dBFS |
| Mur de bruit | +21,0 dB | +4,3 dBFS | −24,5 dBFS |

- Effets seuls à vide : Distorsion −46,5 dBFS de composante continue ; Radio AM −48,6 dBFS RMS ; Vinyle −51,1 dBFS RMS (souffle voulu, coupé au repos en direct).
- Cause : `driveCurve` (ligne 713) calcule `x=i/n*2-1` sur 2 048 points ; le milieu de la courbe vaut alors −0,0196 pour la dose 0,5. La courbe de la ligne 935 (saturation douce) et celle de la ligne 1032 (chaleur de piste) utilisent `i/(n-1)` et rendent 0 sur une entrée nulle.

### S10. Voix hurlée et distordue

- Attendu : une chaîne de voix saturée prête, à niveau constant, sans souffle propre.
- Souris : 3 actions (effets, liste, « Voice saturated »).
- Mesuré au banc (bruit en entrée, faute de micro simulé) : +9,6 dB de RMS, crête −5,0 dBFS, composante continue −49,0 dBFS à vide. La chaîne enchaîne compresseur (seuil −34 dB, taux 20, gain 14 dB), distorsion 0,85, égaliseur, pièce (ligne 869).
- Prise de voix au micro : non mesurée (limite 3).

### S11. Temps d'export d'une session power electronics

- Attendu : un export de 4 s de son en moins de 10 s.
- Mesuré, machine partagée : HM-2 + Mic howl, 195,7 s par l'interface ; rendu seul HM-2, 25,4 s pour 7 s de son ; rendu seul Α, 60,4 s puis 124,6 s pour 14 s ; rendu masterisé Α, 370,8 s ; Noise wall + « Noise », 123,5 s. Un essai de trois rendus d'affilée dans la même page a fermé la page (« Target closed »).
- Cause : la queue de 10 s ajoutée pour la boucle de larsen (`tailSec`, ligne 1293), jamais rognée à cause de la composante continue (S4), puis jusqu'à 5 rendus complets pour viser la sonie (`masteredRender`, ligne 1313).

## Notes par scénario

Ordre des colonnes : 1 design, 2 DA, 3 puissance, 4 ergonomie, 5 simplicité, 6 exhaustivité, 7 pertinence, 8 originalité, 9 plaisir.

| Scénario | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Preuve principale |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 repos, projet vide | 7 | 7 | 6 | 8 | 9 | 6 | 7 | 5 | 6 | −78,1 dBFS constant ; 2 touchers |
| S2 export vide | 5 | 6 | 2 | 3 | 3 | 3 | 4 | 4 | 2 | zéro fichier, zéro message ; ligne 1323 |
| S3 HM-2 sur piste vide | 6 | 6 | 5 | 6 | 7 | 6 | 6 | 6 | 5 | −28,3 dBFS continu en lecture |
| S4 larsen micro + HM-2 | 7 | 7 | 7 | 6 | 7 | 7 | 7 | 7 | 7 | retour au plancher en 3 s ; queue inf ; 195,7 s |
| S5 boîte Α | 8 | 8 | 6 | 8 | 8 | 7 | 7 | 9 | 7 | 3 touchers ; −34,1 dBFS continu ; 370,8 s |
| S6 mastering Noise | 5 | 6 | 2 | 6 | 6 | 5 | 2 | 6 | 2 | continu −12,8 dBFS ; +0,69 dBTP |
| S7 dose du larsen | 6 | 6 | 7 | 5 | 5 | 6 | 7 | 7 | 6 | stable 60 s ; marche 0,6 → 0,7 |
| S8 emballement | 6 | 6 | 3 | 5 | 5 | 6 | 3 | 6 | 3 | +24,6 dBFS crête tenue |
| S9 saturations empilées | 6 | 6 | 6 | 5 | 5 | 8 | 5 | 7 | 5 | sauts de −19,2 à +21,0 dB |
| S10 voix saturée | 6 | 6 | 6 | 6 | 7 | 6 | 6 | 5 | 6 | +9,6 dB ; pas de micro |
| S11 temps d'export | 5 | 6 | 3 | 3 | 4 | 6 | 4 | 5 | 2 | 25 à 371 s ; page fermée |
| Moyenne | 6,1 | 6,4 | 4,8 | 5,5 | 6,0 | 6,0 | 5,3 | 6,1 | 4,6 | |

Justification des notes hors son :
- Design et DA : boîtes en étiquettes Dymo à lettre grecque, rack à boutons rotatifs photographiques ([capture](../captures/03-boite-alpha-pc1366.webp)) ; sur ordinateur, la barre d'actions du clip (Delete, Copy, Loop, Slice, More) recouvre les boutons du rack ([capture](../captures/03-larsen-pose-pc1366.webp)). Aucun vumètre de vraie crête ni témoin de composante continue.
- Ergonomie : la boîte Α s'applique en 3 touchers ; le larsen ne se pose pas au doigt en paysage dans mon essai ; aucune touche « couper tout le son » (recherche de « panic » ou « panique » dans index.html : zéro résultat).
- Originalité : boîtes « tribute to » avec dispositifs déclarés, boîtes à bruit synthétisées (table sans entrée, piézo, ressort), larsen tenu. Aucun studio en ligne de référence ne fournit ce rayon.

## Comparaison aux outils de référence

| Point | Référence | Studio (mesuré) |
|---|---|---|
| Vraie crête maximale | EBU R 128 : « the Maximum Permitted True Peak Level of a programme during production (linear audio) shall be -1 dBTP » — https://tech.ebu.ch/docs/r/r128-2014.pdf | +0,69 dBTP avec « Noise » (plafond affiché −0,5) ; −1,79 dBTP avec « Universal » sans cible |
| Filtre de composante continue | Ableton Live, Saturator : « The Pre-DC Filter mode activates a DC filter at Saturator's input stage » ; Utility : « The DC switch filters out DC offsets » — https://www.ableton.com/en/live-manual/12/live-audio-effect-reference/ | aucun filtre ; −24,5 à −49 dBFS de continu par chaîne saturante |
| Écrêtage de sortie d'une saturation | Ableton Saturator : « When Soft Clip or Hard Clip is selected, Saturator's output will never exceed the level set by the Output control. » (même page) | Mur de bruit +4,3 dBFS, Κ +1,1 dBFS en sortie de piste ; empilement de larsens +24,6 dBFS |
| Pédale HM-2 | Boss HM-2W, fiche produit : https://www.boss.info/UK/products/hm-2w/ | chaîne « Tronçonneuse suédoise (HM-2) » : égaliseur +6/−8/+7, distorsion 1, égaliseur ; +8,4 dB ; continu −38,4 dBFS |
| Rayon power electronics | BandLab : Drum Machine, Sampler, Looper, mastering (relevé BANDLAB-RELEVE.md, sources https://help.bandlab.com/hc/en-us/articles/115002959894-Using-the-Drum-Machine et https://help.bandlab.com/hc/en-us/articles/115004496573-Using-the-Looper) ; aucune boîte de larsen ni de table sans entrée dans ces pages | 6 boîtes Α à Ζ, 6 chaînes Η à Μ, 18 boîtes à bruit, larsen tenu sans fin et borné |

Les étalons du genre (Whitehouse, Broken Flag, Prurient, Merzbow) servent ici d'exigence d'usage : larsen tenu à la main, saturations empilées sans perte de contrôle, silence net entre deux pièces. Je ne leur prête aucune citation.

## Écarts

### 03-01 — Composante continue dans toutes les saturations et dans le master — bloquant
- Preuve : export « Noise » à −12,8 dBFS de continu ; repos « Noise » −32,7 dBFS ; lecture −1,7 dBFS ; 13 chaînes sur 15 entre −24,5 et −49,1 dBFS à vide ; export S4 fini à −0,0093. Lignes 713 (`driveCurve`) et 937 (`tapeCurve`) : `const x=i/n*2-1`.
- Correction : dans les deux fonctions, écrire `const x=i/(n-1)*2-1` (comme ligne 935), ou passer à n=2049 ; puis poser un passe-haut du premier ordre à 5 Hz (ou un biquad passe-haut 10 Hz, Q 0,707) après chaque WaveShaper de `dist`, de `fold`, du master (`m.sat`) et en tête de `buildMaster`. Contrôle : sortie à vide de chaque chaîne ≤ −120 dBFS ; repos « Noise » ≤ −120 dBFS.

### 03-02 — Vraie crête au-dessus du plafond — bloquant
- Preuve : export « Noise » +0,69 dBTP pour un plafond de −0,5 ; `capPeak` (ligne 1004) mesure la crête échantillon ; l'écrêteur de sortie `clip` (lignes 984 à 987) travaille sans suréchantillonnage.
- Correction : mesurer la vraie crête par suréchantillonnage ×4 (filtre polyphase, BS.1770 annexe 2) dans `capPeak`, et régler le gain sur cette valeur ; passer `clip.oversample="4x"` sur l'écrêteur final. Contrôle : vraie crête ≤ plafond sur les 26 masterings.

### 03-03 — Emballement non borné de l'empilement larsen + écho — bloquant
- Preuve : 3 Boucles de larsen dose 1 + Écho 0,95 : +12 dBFS RMS et +24,6 dBFS crête tenus 60 s en sortie de piste.
- Correction : sur chaque piste, après le rack, un limiteur de sécurité à −0,3 dBFS (DynamicsCompressor attaque 0,001, taux 20) suivi de la courbe douce de pente 1 de la ligne 935 ; témoin rouge sur la tête de piste dès qu'il agit. Contrôle : sortie de piste ≤ 0 dBFS pour toute pile d'effets.

### 03-04 — Export d'un projet vide sans fichier ni message — important
- Preuve : S2, zéro fichier, zéro toast, iPhone et 1 366 ; ligne 1323.
- Correction : si `projEnd()` vaut 0, afficher le pictogramme ∅ par `toast("∅")` comme le fait déjà l'export des pistes séparées (ligne 1322), ou rendre 1 s de silence.

### 03-05 — Queue d'export jamais rognée, fichier coupé net — important
- Preuve : S4, 17,13 s pour 4 s de son, queue « inf », dernier échantillon −0,0093.
- Correction : après 03-01, `trimTail` rogne à −80 dBFS ; ajouter un fondu de sortie de 50 ms sur les derniers échantillons pour la boucle de larsen tenue, dont la queue de 10 s (`tailSec`, ligne 1293) reste ouverte par nature.

### 03-06 — Temps d'export de plusieurs minutes, plantage en série — important
- Preuve : S11, 195,7 s, 370,8 s, page fermée au troisième rendu ; jusqu'à 5 rendus par export (ligne 1315).
- Correction : mesurer la sonie sur le premier rendu, appliquer le gain d'écart directement au tampon (l'écart reste linéaire tant que le limiteur ne travaille pas), ne refaire un rendu que si l'écart dépasse 1 LU ; afficher l'avancement en pictogramme (barre sur le bouton Export).

### 03-07 — Choc grave à chaque lecture et chaque arrêt — important
- Preuve : S3, la sortie passe de −78 à −28 dBFS continu au départ, et revient à l'arrêt ; S5, −34,1 dBFS.
- Correction : disparaît avec 03-01.

### 03-08 — Marche du larsen entre 0,6 et 0,7 — important
- Preuve : S7, extinction à 0,6, −15,2 dBFS tenu à 0,7.
- Correction : dans musik-fx.js (`case 'fdbk'`), rendre le gain de boucle progressif autour de 1 : par exemple `bp*(.3+amt*.75)*1.3` remplacé par une loi qui place le seuil d'accrochage à 0,5 et un niveau tenu qui monte de −40 dBFS (0,5) à −6 dBFS (1), avec la même saturation `tanh` comme borne.

### 03-09 — Sauts de niveau des chaînes saturantes — important
- Preuve : S9, de −19,2 dB (Β) à +21,0 dB (Mur de bruit), crêtes +4,3 et +1,1 dBFS.
- Correction : après chaque chaîne préréglée, un gain de rattrapage mesuré une fois au banc sur bruit rose à −24 dBFS RMS, pour ramener l'écart à ±3 dB ; même règle que la compensation déjà faite dans `dist` (`wet.gain.value=p.mix/curveGain(cv)`, ligne 737).

### 03-10 — Aucune touche de coupure générale — important
- Preuve : recherche de « panic » et « panique » dans index.html : zéro résultat ; la porte du repos met 2 à 3 s à rendre le silence (S4, S5).
- Correction : pictogramme ⏻ dans l'en-tête (et dans le menu ⋯ sur téléphone) : coupe le master en 10 ms, vide les lignes à retard et les boucles de réinjection (reconstruction des chaînes par `rebuildChains`).

### 03-11 — Pose d'une boîte à bruit au doigt en paysage — important
- Preuve : appui long sur « Mic howl » puis toucher sur la piste 01 : aucun clip ; l'écran couché montre 1 piste et 1 ligne de bibliothèque ([capture](../captures/03-larsen-pris-iphone-paysage.webp)).
- Correction : en paysage, ouvrir la bibliothèque en panneau latéral sur 40 % de la largeur, comme sur ordinateur, pour garder la liste et les pistes visibles ensemble.

### 03-12 — Témoins de sortie absents — détail
- Preuve : le pied de page affiche « −14.0 LUFS, crête −12.8 dB » : crête échantillon, sans vraie crête ni continu.
- Correction : afficher la vraie crête en dBTP et un point rouge quand la moyenne du signal dépasse −60 dBFS.

### 03-13 — Barre d'actions du clip sur le rack — détail
- Preuve : sur 1 366 × 768, Delete, Copy, Loop, Slice et More recouvrent les boutons de la Distorsion et de l'Écraseur ([capture](../captures/03-larsen-pose-pc1366.webp)).
- Correction : placer la barre au-dessus du clip choisi, dans la zone des pistes, ou la masquer quand le rack est ouvert.

## À garder tel quel

- La porte du repos : les effets qui produisent du son par eux-mêmes se taisent à l'arrêt (−78,1 dBFS à 2 ou 3 s), et le rack du master aussi.
- La Boucle de larsen bornée par `tanh` : tenue sans fin, ±0,6 dB sur 60 s, zéro NaN, crête −3,9 dBFS à la dose 1.
- Le Résonateur corrigé : extinction à −147,7 dBFS même au maximum.
- Les boîtes Α à Ζ : 3 touchers au doigt, chaîne, sons à chercher et gestes sur clip dans un tiroir ; lettres grecques et « tribute to », zéro son d'artiste copié.
- Les 18 boîtes à bruit synthétisées (table sans entrée, piézo, ressort, boulons, hurlement d'écho) : calcul en 6 s à l'ouverture du tiroir.
- La courbe douce de pente 1 (ligne 935) et la chaleur de piste (ligne 1032) : zéro continu.
- La sonie d'export juste : −13,8 et −14,0 LUFS pour une cible de −14.
