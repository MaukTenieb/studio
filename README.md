# Studio

Studio is a multitrack audio workstation that runs in the browser, in a single HTML file.

https://mauktenieb.github.io/studio/

## What it does

- Tracks with volume, pan, mute, solo and an effect chain: high-pass, low-pass with resonance, drive, tempo-synced delay, reverb.
- Clips that move, trim from both edges, split at the playhead, duplicate and change track.
- Tempo, metronome, snap to the sixteenth, loop region drawn on the ruler.
- Microphone recording onto the armed track.
- A built-in kit of sixteen sounds, synthesized by the browser at load time.
- Live search in Freesound, restricted to CC0 and CC BY sounds.
- Import of any audio file the browser decodes.
- WAV export, 44.1 kHz stereo, with a credits file listing every Freesound sound used.
- Automatic saving of the project and its sounds in the browser (IndexedDB).
- Undo on every edit.

## Keys

Space plays and stops. R records. L toggles the loop. S splits. D duplicates. Delete removes the selected clip. Ctrl+Z undoes. Ctrl+wheel zooms.

## Sounds and licences

The built-in kit comes from Web Audio oscillators and noise, rendered offline at load time; it carries zero third-party rights.

Freesound sounds stream through its official API. The studio shows CC0 and CC BY sounds only, and the export writes the credit line that CC BY requires. The file `worker.js` is a Cloudflare Worker that keeps the Freesound API key out of the public code. Without the worker, each user enters a personal key with the gear button, and the key stays in the user's browser.

## Code

Plain HTML, CSS and JavaScript, Web Audio API, zero dependencies. MIT licence.

---

## Français

Studio est une station audio multipiste qui tourne dans le navigateur, en un seul fichier HTML : pistes, clips, effets, enregistrement au micro, kit synthétisé par le navigateur, recherche en direct dans Freesound (sons CC0 et CC BY), import de fichiers audio, export WAV avec le fichier des crédits, sauvegarde automatique dans le navigateur.
