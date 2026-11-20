# Juge « son » — deuxième passage (commit c02f630)

Méthode : j'ai rejoué mes scripts sans les modifier (t4 à t22, résultats dans /home/claude/judges/son/p2/). Pour le Doppler, j'ai repris la constante de temps du code corrigé (0,18 s). Je n'ai rien touché dans /home/claude/studio.

| # | Constat | Verdict | Avant → après |
|---|---|---|---|
| 1 | Résonateur divergent | corrigé | Au réglage d'origine : +695 dB puis NaN → décroît sous −160 dB en 1 s. Même à fb 0,995, la sortie décroît. Le mix de 20 s ne contient plus de NaN et dure 24 s (avant : 4 408 NaN, coupé à 11 s). |
| 2 | Bus dub auto-oscillant | corrigé | Avec une salve : +9,2 dBFS tenus → −19 dB à 1 s, puis −84 à −184 dB à 20 s selon le retour (0 à 0,7). |
| 3 | Sonomètre faux dans le grave | corrigé | `lufsOf` égale la référence BS.1770 au centième de 30 Hz à 1 kHz. Les exports tombent à ±0,1 LU de la cible, sauf Loud −9 : −8,21 (+0,8 LU). |
| 4 | `lr4` et multibande | partiel | La somme LR4 est plate (±0,0 dB, avant +7,4 dB) ; le Pompage à profondeur 0 est plat (+0,9 dB) ; la somme des 3 bandes égale l'original. Reste le rattrapage automatique des compresseurs : à −50 dBFS, Neutral avec multibande 0,35 donne +8,6 à +10,2 dB, et Universal +13,4 à +16,7 dB. Ce relèvement est désormais à peu près plat en fréquence, mais il reste. |
| 5 | Queues d'export coupées | corrigé en grande partie | À la coupure, par rapport à la salve : Cathédrale −19 → −59 dB ; Grotte hold 4 +6,9 → −64 dB ; Réverbération −23 → −59 dB. Restent l'Écho fb 0,8 (−36 dB) et la Pièce « Cave » (−37 dB, `room` absent de `tailSec`). |
| 6 | Dérive | partiel | Écho : 508 clics → 0. Réverbération, Pièce, Cathédrale : 0 régénération de réponse (avant 133, 133 et 54). Le cache `SPACE_IR` est limité à 6 entrées. Restent les gains : Compresseur, crête −5,7 → +1,2 dBFS (inchangé) ; Égaliseur, +6,7 dB ; Résonateur, 74 clics (sa fréquence saute). |
| 7 | Grands espaces trop lourds | partiel | Les boîtes envoient désormais les espaces au master. Tim Hecker : 33,7 s → 17,7 s de calcul pour 26 s d'audio ; Lustmord : 11,5 s pour 18 s ; Roly Porter : 21 s pour 24 s (limite). Une Cathédrale hold 4 posée à la main sur une piste demande 81 s de calcul pour 41 s d'audio. La page plante encore après des rendus en série : 3 plantages, l'un dans le balayage des effets (Cathédrale, sinus), l'autre dans la série des boîtes (Hans Zimmer, qui passe trois fois de suite isolé). |
| 8 | Sauts de niveau | partiel | Grotte : +11,4 → +7 dB au réglage d'origine, et sa crête mix au maximum passe de +14,7 à +2 dBFS. Silo et Cathédrale tombent à −3 à −5 dB. `grain`, `ringx` et `convx` gardent la crête d'entrée (−26 → −26 dBFS). Inchangés : Distorsion +8,5 à +10,7 dB, Radio AM +10,6, Repli d'onde +10 à +12, `mz_metal` +9,3, Wah −11 à −24 dB. |
| 9 | Doppler sans limite | partiel | Geste brusque : −4 309 → −443 cents ; retour : +1 322 → +352 cents, avec 489 → 3 clics ; glissé de 300 ms : −212 cents. C'est encore au-dessus du ±170 cents visé : la constante de temps est allongée, mais aucune vitesse n'est plafonnée. |
| 10 | Ondulation de Paulstretch | corrigé | 3,04 → 0,51 dB. |
| 11 | Sous-grave | corrigé | À amt 0, sur une source mono : 0,0 dB de 30 Hz à 1 kHz (avant −3,9 dB). |
| 12 | Porte de bruit inerte à l'export | toujours faux | Entrée −63 dB, sortie −63,1 dB. |
| 13 | Wavesets en stéréo | toujours faux | 2 496 discontinuités sur le canal droit. |
| 14 | « Chaleur » de piste | inchangé (choix de son) | 3,8 % de distorsion harmonique avec le fader d'origine. |
| 15 | YIN | partiel | 50 Hz et 40 Hz se lisent juste (0 et 1 cent). Au-dessus de 990 Hz, l'octave basse reste (sans effet sur l'échelle). L'échelle en cents reste juste au cent. |
| 16 | HPSS sur le fil principal | toujours faux | 11,1 s pour un clip de 6 s. |
| 17 | Export : tramage, crête vraie | toujours faux, en hausse | Les exports sont plus forts, donc la crête vraie dépasse davantage le plafond : Loud −9 à −0,14 dBTP pour un plafond de −0,8 (+0,66 dB, avant +0,23) ; Universal −9 à −0,59 dBTP pour −1 (+0,41 dB). |

## Régressions

- Ni NaN, ni saturation, ni silence : les 39 effets aux réglages d'origine sur trois signaux sont sains. Aux extrêmes, aucun NaN ; le Résonateur au maximum sort à −7,2 dBFS (avant +760 dB). Les 26 boîtes sortent du master à −1,9 dBFS de crête, sans NaN, avec une sonie interne de −5,2 à −13,9 LUFS.
- Nouveau effet secondaire : les rendus s'allongent avec la queue d'export (jusqu'à 60 s ajoutées), ce qui augmente le temps d'export et, selon toute vraisemblance, la mémoire, d'où les plantages en série.
- À signaler hors de ma liste d'origine : l'Écho à fb 0,95 diverge encore lentement (+14 dB en 14 s), par le même passe-bas de boucle à Q 1.

## Note : 7/10 (avant 4/10)

Les deux dangers bloquants sont levés, la sonie est exacte et les séparations de bandes sont plates.
Restent le relèvement des passages calmes par le multibande, les sauts de niveau des effets saturants, un Doppler encore trop vif, une crête vraie au-dessus du plafond et des plantages en série.
