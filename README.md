# Studio

![Studio](img/social.jpg)

Studio is a multitrack audio workstation that runs in the browser, in a single HTML file.

https://mauktenieb.github.io/studio/

## What it does

- Tracks with volume, pan, mute, solo, colour, order, duplication, and volume and pan automation.
- An effect rack per track, in any order: EQ, compressor, distortion, bitcrusher, chorus, flanger, phaser, tremolo, auto-pan, wah, filter, delay with ping-pong, reverb, vibrato, gate, ring modulator, frequency shifter (Hilbert), resonator, glitch buffer, vinyl, AM radio, room; ten chain presets (Voice, Radio, Telephone, Lo-fi, Robot, Space, Cathedral, Doubler, Noise wall, Dub).
- Clips that move, trim from both edges, fade in and out, split, duplicate, copy, paste, repeat, mute, rename and change track.
- Clip processing: reverse, normalize, gain, transpose with duration kept, speed change with pitch kept (WSOLA), denoise, bounce.
- Selection: Shift or Ctrl click, a box drawn over the lanes, Ctrl+A; selected clips move, duplicate and delete together.
- Fusion and separation: fuse selected clips into one (Ctrl+J), bounce a track with its effects, slice a clip at its attacks (spectral flux), remove silences, split harmonic from percussive parts (median filtering after FitzGerald, DAFx 2010), split low, mid and high bands (Linkwitz-Riley), split mid from side.
- Flashback: the armed input stays in a 60-second memory; F drops the last minute onto the timeline.
- Workshop (clip menu): Paulstretch, spectral freeze, spectral blur, spectral morph and cross-synthesis (vocoder) with a copied clip, granular brassage, shred, wavesets (repeat, omit, reverse, shuffle), stutter, circuit bend, tape stop, varispeed, reverse each beat, ring modulation and convolution with a copied clip.
- Master bus with its own effect rack and 23 mastering presets (Universal, Fire, Clarity, Tape, Warm, Punch, Bright, Loud, Wide, Vintage, Lo-fi, Bass boost, Vocal, Acoustic, Classical, Jazz, Hip-hop, EDM, Rock, Ambient, Podcast, Noise, Neutral): shelving EQ, three-band compression, tape saturation, stereo width, glue compression, limiter and soft clipper.
- Loudness targets measured in LUFS after ITU-R BS.1770 (K-weighting, gating): −9 club, −11 CD, −14 streaming, −16 Apple and podcast, −23 EBU R128, −24 ATSC A/85; the export iterates until the mix lands on the target, with the peak held under the preset ceiling.
- Room reverbs modelled from early reflections and frequency-dependent decay: closet, bathroom, kitchen, bedroom, living room, vocal booth, studio, classroom, car, stairwell, parking garage, club, theatre, concert hall, church, cathedral, cave, tunnel, plate, spring.
- Tempo, metronome, count-in, snap to the sixteenth, loop region drawn on the ruler, chromatic tuner, lyrics pad.
- Microphone recording onto the armed track, with optional input monitoring.
- Live search in Internet Archive, restricted to public domain, CC0, CC BY and CC BY-SA items, with seventeen listening categories: field recordings, city, forest, animals, factory, vehicles, firearms, voices, languages, ethnography, traditional music, chants, jazz, classical, concerts, oral history, sound effects. Freesound gets sixteen quick searches on the same themes.
- A built-in kit in nine drawers (drums, 808, 909, basses and synths, Polivoks, chaos, industrial, metal and bells, vinyl and radio), synthesized by the browser at load time: drums, basses, pads, drones, vinyl and radio noises, chaotic oscillators (Lorenz, logistic map, Hénon, Chua) and Polivoks-style voices.
- Live search in Freesound, restricted to CC0 and CC BY sounds.
- Live search in Wikimedia Commons (about four million audio files) and Jamendo (CC0, CC BY and CC BY-SA music) through the Openverse and MediaWiki APIs, without a key.
- Import of any audio file the browser decodes.
- Export as WAV mix, MP3 mix or WAV stems, with a credits file listing every borrowed sound.
- Automatic saving of the project and its sounds in the browser (IndexedDB).
- Undo on every edit.

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
