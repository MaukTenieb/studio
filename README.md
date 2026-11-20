# Studio

![Studio](img/social.jpg)

Studio is a multitrack audio workstation that runs in the browser, in a single HTML file.

https://mauktenieb.github.io/studio/

## What it does

- Thirty-two tracks, numbered 01 to 32. Tracks 01 to 18 hold the eighteen Masks of the Korhogo Fauna, drawn at random each session from SkopoRhogo (three.js figurines from the Insert Koin repository); each figurine sways, jumps on attacks and gives off a bioluminescent glow that follows its track's level. Tracks 19 to 32 hold the videos and sounds recorded with KamOrhogo and diktaTfaune in the same browser; a double click drops one onto its track at the playhead. Every track has volume, pan, mute, solo, colour, order, duplication, and volume and pan automation.
- An effect rack per track, in any order: EQ, compressor, distortion, bitcrusher, chorus, flanger, phaser, tremolo, auto-pan, wah, filter, delay with ping-pong, reverb, vibrato, gate, ring modulator, frequency shifter (Hilbert), resonator, glitch buffer, vinyl, AM radio, room; 33 chain presets (Voice, Radio, Telephone, Lo-fi, Robot, Space, Cathedral, Doubler, Noise wall, Dub).
- Clips that move, trim from both edges, fade in and out, split, duplicate, copy, paste, repeat, mute, rename and change track.
- Clip processing: reverse, normalize, gain, transpose with duration kept, speed change with pitch kept (WSOLA), denoise, bounce.
- Selection: Shift or Ctrl click, a box drawn over the lanes, Ctrl+A; selected clips move, duplicate and delete together.
- Fusion and separation: fuse selected clips into one (Ctrl+J), bounce a track with its effects, slice a clip at its attacks (spectral flux), remove silences, split harmonic from percussive parts (median filtering after FitzGerald, DAFx 2010), split low, mid and high bands (Linkwitz-Riley), split mid from side.
- Flashback: the armed input stays in a 60-second memory; F drops the last minute onto the timeline.
- Workshop (clip menu): Paulstretch, spectral freeze, spectral blur, spectral morph and cross-synthesis (vocoder) with a copied clip, granular brassage, shred, wavesets (repeat, omit, reverse, shuffle), stutter, circuit bend, tape stop, varispeed, reverse each beat, ring modulation and convolution with a copied clip.
- Master bus with its own effect rack and 26 mastering presets (Universal, Fire, Clarity, Tape, Warm, Punch, Bright, Loud, Wide, Vintage, Lo-fi, Bass boost, Vocal, Acoustic, Classical, Jazz, Hip-hop, EDM, Rock, Ambient, Podcast, Noise, Neutral): shelving EQ, three-band compression, tape saturation, stereo width, glue compression, limiter and soft clipper.
- Loudness targets measured in LUFS after ITU-R BS.1770 (K-weighting, gating): −9 club, −11 CD, −14 streaming, −16 Apple and podcast, −23 EBU R128, −24 ATSC A/85; the export iterates until the mix lands on the target, with the peak held under the preset ceiling.
- Room reverbs modelled from early reflections and frequency-dependent decay: closet, bathroom, kitchen, bedroom, living room, vocal booth, studio, classroom, car, stairwell, parking garage, club, theatre, concert hall, church, cathedral, cave, tunnel, plate, spring.
- Tempo, metronome, count-in, snap to the sixteenth, loop region drawn on the ruler, chromatic tuner, lyrics pad.
- Sampler colours (SP-1200, MPC60, ASR-10, S950), sub octave with mono lows, large spaces (cave, silo, cathedral) with a hold up to one minute, dub siren and analog laser noise boxes.
- Stage friction: two overlapping objects repel (each carves the other's dominant frequency) or fuse (same place, cross ring modulation).
- Field sheet per clip (place, date, musicians, function, season, instruments, measured tuning in cents, sung text, translation), exported with the credits.
- Artist boxes: 26 Greek-letter boxes, each a tribute to an artist named by the annexes or by Musik; one tap sets track racks, master chain, tempo or seconds, swing, sequencer, dub feedback, then offers sounds to search and gestures for the selected clip. Freesound's Broad Sound Taxonomy and Internet Archive's large free collections (old radio, broadcasts, read books, rites, NASA, Free Music Archive).
- Tempo fitted to video cuts and field notes; spectral eraser and repair on boxes drawn over the spectrogram.
- Stage in real distances (6 m wide, 14 m deep): each object's sound takes the time of the air to arrive, so a fast move bends its pitch (Doppler). The object reddens moving away, turns blue coming closer.
- Routing view, inside the Stage drawer: each track through its effects to the master, the master rack and the output, with the stage and dub sends. Tap a track to mute it, an effect to bypass it, hold the orange port to send to the dub. Links thicken with the signal level.
- Actual scale of a clip: pitch tracked every 20 ms, a 0–1200 cent histogram with peaks named to the cent, compared with equal temperament, just intonation, maqam rast and bayati, slendro, pelog and raga bhairav.
- Microphone recording onto the armed track, with optional input monitoring.
- Live search in Internet Archive, restricted to public domain, CC0, CC BY and CC BY-SA items, with 29 listening categories: field recordings, city, forest, animals, factory, vehicles, firearms, voices, languages, ethnography, traditional music, chants, jazz, classical, concerts, oral history, sound effects. Freesound gets sixteen quick searches on the same themes.
- A built-in kit in eleven drawers (drums, 808, 909, basses and synths, Polivoks, chaos, industrial, metal and bells, vinyl and radio, infrasound and sub-bass, synthesis), synthesized by the browser at load time: drums, basses, pads, drones, vinyl and radio noises, chaotic oscillators (Lorenz, logistic map, Hénon, Chua) and Polivoks-style voices.
- Live search in Freesound, restricted to CC0 and CC BY sounds.
- Collections: themed doors into Freesound, Wikimedia Commons and Jamendo — music styles (loops and samples), animals, voices, forty languages (Lingua Libre recordings), chants and songs, places and environments, recording gear (hydrophone, contact microphone, geophone, VLF, cassette, wax cylinder…), infrasound and sub-bass, synthesised and reworked sounds.
- Live search in Wikimedia Commons (about four million audio files) and Jamendo (CC0, CC BY and CC BY-SA music) through the Openverse and MediaWiki APIs, without a key.
- Import of any audio file the browser decodes.
- Export as WAV mix, MP3 mix or WAV stems, with a credits file listing every borrowed sound.
- Automatic saving of the project and its sounds in the browser (IndexedDB).
- Undo on every edit.

## Touch and mouse

The console (sliders pictogram, bottom left) lays the 32 tracks out as channel strips with long faders, pan knobs, mute, solo, effects and level meters, plus the master strip with AutoMix, which brings every track to the same loudness. Several faders move at once under several fingers. A tap on a clip opens its action bar in the order of BandLab's mobile region menu: delete, copy, loop, slice, then More: shift, gain, transpose, timestretch, fades, denoise, reverse, fuse, workshop, separate. Shift, gain, transpose, timestretch and fades open a sheet of sliders at the bottom of the screen; shift, gain and fades sound live while the sliders move, and ✓ applies. A double tap opens its full menu. Two fingers pinch the timeline to zoom. A double tap on a fader, a slider or a knob resets it. The A button of a track opens its automation envelope menu: volume, pan, or any parameter of the effects in its rack; effect envelopes play live and render into exports. During playback, automation moves the faders and pan sliders. The track menu folds a track to a thin strip.

The pads pictogram next to the console opens two XY pads on the master bus. A finger or the mouse sets two parameters at once, live; lifting releases the effect, the lock button keeps it on. Modes: Envelope × Pitch (X transposes from −12 to +12 semitones, Y carves a tempo-synced volume envelope), Scratch (the horizontal hand movement drives a turntable-style buffer forwards and backwards, Y opens the tone), Filter, Gater, Stutter, Tape stop, Delay, Reverb, Crush and Flanger. Two fingers play both pads together.

Clips take the colours of the Korhogo Fauna: each track from 01 to 18 takes the colour of the Mask it shows, and tracks 19 to 32 take a second draw of the same eighteen colours.

The kit holds, besides the synthesised sounds: Fauna Korhogo, the cuts from the releases of each Mask's alias (© Korhogo); 26 style kits of ten synthesised sounds each (kick, snare, clap, hat, open hat, perc, bass, chord, lead, riser), from techno, trap, drill, amapiano, gqom, baile funk and footwork to chiptune, industrial and power electronics; and the Borne, 88 recordings of real objects (CC0). The effects rack adds the seven sample-by-sample effects of Musik (gross beat, granulizer, reverse slices, octaver, tape echo, feedback loop, metal resonator), and the chain presets add the twelve kits Α to Μ.

The collections count 1,171 entries: genre packs in eleven families, each with its elements (loop, drum loop, beat, bass, chords, melody, vocal, fx, one shot, kick, snare, hihat, percussion); instruments in ten families; artist kits, with the Korhogo catalogue on Internet Archive (Mauk Tenieb, C7H5N3O6, dogXim, Ts'ui Pên, Auvergne) and thirty Freesound sound recordists; objects and foley; vehicles and machines; weapons and conflict; media, radio and vinyl; moods; animals in five families; voices, languages, chants, places, recording gear, infrasound, synthesis.

The interface takes the materials of a Korhogo kave: burnished steel plates for the bars, a painted cabinet flank behind the track column, a reel-to-reel deck in the top bar, the vaulted cellar behind the pads, green phosphor screens in the pads, a record under the hand in the Scratch pad, backlit fader caps, tape shelves behind the sound library, Dymo labels on the Fauna drawer, and the Fauna gathered around the desk at opening. Images: Mauk Tenieb.

The Master button opens a mastering drawer in the manner of BandLab Mastering: the mix renders once, then plays through Universal, Fire, Clarity, Tape, Natural, Cinematic, Spatial, Punch or one of the studio's own masterings. A and B switch between the original and the master, = matches their loudness, the intensity runs on eleven levels, a three-band EQ trims the tone, the target sets the output loudness, and Reference matches loudness and tonal balance to a track you load. Export writes the chosen master, or every ticked master in one go.

Every area follows the screen: track height, side panel, bottom drawer. A grip between the tracks and the drawer sets their share; a double tap resets it.

The steps drawer, taken from Musik, writes audio clips from a step grid: 15, 16, 17, 19 or 21 steps, odd by default, a dice for patterns, a loop preview. Drift lets the settings of every effect and every pan evolve with the music, each track driven by a Lorenz attractor fed by its own level and its neighbour's; the heart keeps what you hear, the arrow brings the starting point back. The noise boxes and the kits Α to Μ come from the setups that power electronics artists describe: contact mics on sheet metal, springs, bolts, a no-input mixer, fuzz, delay, ring modulation.

One search field at the top of the side panel looks through the kit, the collections, the user's sounds, Freesound, Wikimedia Commons, Jamendo and Internet Archive at once.

## Keys

Space plays and stops. R records. L toggles the loop. M toggles the metronome. S splits. D duplicates. Ctrl+C and Ctrl+V copy and paste. Arrows nudge the selected clip (Shift: a sixteenth). Delete removes the selected clip. Ctrl+Z undoes. Ctrl+wheel, + and − zoom. Right click or long press on a clip opens its menu.

## Sounds and licences

The built-in kit comes from Web Audio oscillators and noise, rendered offline at load time; it carries zero third-party rights.

Internet Archive items stream straight from archive.org. The studio skips the 78rpm and bootleg collections, whose public-domain labels rest on uploader statements disputed in court.

Freesound sounds come through the Openverse API (WordPress Foundation), which indexes the Freesound catalogue and answers without a key. The studio shows CC0 and CC BY sounds only, and the export writes the credit line that CC BY requires. A personal Freesound API key, entered with the gear button and kept in the user's browser, switches the search to the official Freesound API with full depth. The file `worker.js` holds an optional Cloudflare relay for a shared key.

## Code

Plain HTML, CSS and JavaScript, Web Audio API, zero dependencies. MIT licence.

---

## Français

Studio est une station audio multipiste qui tourne dans le navigateur, en un seul fichier HTML : pistes, clips, rack d'effets, automation, fondus, inversion, transposition, timestretch, master, accordeur, enregistrement au micro, kit synthétisé par le navigateur, recherche en direct dans Freesound (sons CC0 et CC BY) et dans Internet Archive (domaine public, CC0, CC BY, CC BY-SA), import de fichiers audio, export WAV, MP3 ou pistes séparées avec le fichier des crédits, sauvegarde automatique dans le navigateur.

Le pictogramme des pads, à côté de la console, ouvre deux pads XY sur le bus master. Le doigt ou la souris règle deux paramètres à la fois, en direct ; lever le doigt relâche l'effet, le bouton de verrou le garde actif. Modes : Enveloppe × Hauteur (X transpose de −12 à +12 demi-tons, Y découpe une enveloppe de volume calée sur le tempo), Scratch (le mouvement horizontal de la main fait avancer et reculer la mémoire tampon comme un disque sous la main, Y ouvre le timbre), Filtre, Gate, Stutter, Arrêt de bande, Écho, Réverb, Crush et Flanger. Deux doigts jouent les deux pads ensemble.

Les clips prennent les couleurs de la Fauna Korhogo : chaque piste de 01 à 18 prend la couleur du Mask qu'elle montre, les pistes 19 à 32 un second tirage des mêmes dix-huit couleurs. Le kit ajoute la Fauna Korhogo (les coupes des sorties de chaque Mask), 26 kits par style de dix sons synthétisés, et la Borne (88 enregistrements d'objets réels, CC0). Le rack reçoit les sept effets de Musik, les préréglages de chaîne les six kits Α à Ζ. Les collections comptent environ 900 entrées : packs par genre avec leurs éléments, instruments, kits d'artistes (catalogue Korhogo sur Internet Archive, trente preneurs de son de Freesound), objets et bruitages, véhicules et machines, armes et conflits, médias, humeurs, animaux.

L'interface prend les matières d'une kave Korhogo : plaques d'acier bruni, flanc peint derrière les pistes, magnétophone à bandes dans la barre du haut, cave voûtée derrière les pads, écrans à phosphore vert, disque sous la main dans le pad Scratch, capuchons rétroéclairés, étagères de bandes derrière la bibliothèque, étiquettes Dymo sur le tiroir Fauna, et la Fauna réunie autour de la console à l'ouverture. Images : Mauk Tenieb.

Le bouton Master ouvre un tiroir de mastering à la manière de BandLab Mastering : écoute A/B à sonie égale, intensité sur onze niveaux, égaliseur trois bandes, cible de sonie, mastering de référence, export d'une ou de plusieurs sorties. Chaque aire suit l'écran ; une poignée partage les pistes et le tiroir.

La touche Échelle du menu d'un clip montre l'échelle réellement jouée : la hauteur est suivie toutes les 20 ms, rangée dans un histogramme de 0 à 1 200 cents, et chaque pic reçoit sa valeur au cent près. Un sélecteur superpose une gamme de référence : tempérament égal, gamme juste, maqâm rast, maqâm bayati, slendro, pelog, raga bhairav.

Dans le tiroir Scène, une touche ouvre le plan des branchements : chaque piste traverse ses effets jusqu'au master, puis le rack du master et la sortie, avec les envois vers la scène et le dub. Toucher une piste la coupe, toucher un effet le contourne, appuyer sur la pastille orange envoie la piste au dub. Les liaisons s'épaississent avec le niveau.

La scène mesure 6 m de large et 14 m de profondeur. Le son de chaque objet met le temps de l'air à arriver ; déplacé vite, il glisse en hauteur comme une sirène qui passe (effet Doppler). L'objet rougit en s'éloignant, bleuit en s'approchant.

Le rack reçoit la couleur des échantillonneurs SP-1200, MPC60, ASR-10 et S950, un sous-grave à l'octave inférieure avec graves au centre, et trois grands espaces : grotte, silo, cathédrale, avec une tenue jusqu'à une minute. Les boîtes à bruit ajoutent la sirène dub et le laser analogique.

Le tempo peut se caler sur les coupes vidéo et les notes de terrain : les temps forts tombent sur l'image. La gomme spectrale du menu d'un clip efface ou répare les zones encadrées sur son spectrogramme.

L'onglet Kit ouvre 26 boîtes d'artistes, sous lettres grecques, chacune « tribute to » un artiste : power electronics, dark ambient, hip-hop, IDM, sound design, dub, musique à l'image, instruments du monde, ethnomusicologie. Une touche prépare le studio selon ses procédés ; la boîte propose ensuite les sons à chercher et les gestes à faire sur un clip. Les collections ajoutent la taxonomie officielle de Freesound ; Internet Archive ajoute la radio ancienne, les émissions, les livres lus, les rites et cultes, la NASA et le Free Music Archive.

Chaque clip reçoit une fiche de terrain : lieu, date, musiciens, fonction, saison, lutherie, accordage mesuré en cents, texte chanté et traduction. La fiche part dans le fichier des crédits.

Sur la scène, deux objets posés l'un sur l'autre se repoussent, chacun creusant le spectre de l'autre, ou se fondent en se modulant l'un l'autre.

La loupe d'un clip réunit son spectre, qu'on gomme ou répare, son échelle réelle en cents et sa fiche de terrain. Les boîtes d'artistes sont des étiquettes Dymo sur les étagères. La dérive apprend de ce qu'on garde : chaque état gardé devient une branche du projet et oriente les dérives suivantes. Les sauvegardes datées restent jouables sur https://mauktenieb.github.io/studio/versions/

Pour une musique de film, on importe la vidéo : elle passe sur un écran au-dessus des pistes, calée sur la tête de lecture. Son son va sur une piste, ses coupes deviennent des repères sur la règle, et le tempo se cale sur l'image.
