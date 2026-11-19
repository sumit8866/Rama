# Setup on a new computer

You only need to install **Node.js**, **Python** and **Git** yourself (one time):

- Node.js 24 or newer: https://nodejs.org
- Python 3.13: https://www.python.org/downloads/ (tick "Add python.exe to PATH")
- Git: https://git-scm.com

## Easiest: let Claude do it

Get the code, then open the `history-studio` folder in Claude Code and say **"set up the studio"**. Claude reads `CLAUDE.md` and runs `setup.ps1`, which installs everything and downloads the music. Then say **"make Ep 17"**.

```powershell
git clone https://github.com/sumit8866/Rama.git history-studio
```

## Or run the setup yourself

```powershell
cd history-studio
```

```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

It takes about 2 minutes and does all of this:
- installs HyperFrames (`npm install`)
- makes the Python voice tools (`.venv`)
- downloads ffmpeg into `tools\ffmpeg\bin`
- downloads the 3 background music tracks into `music\`

It's safe to run again; it skips what is already there.

## The one thing you add by hand: your voice key

Make your own key at https://elevenlabs.io (Developers > API keys, with Text to Speech access). Never share or upload it.

```powershell
Set-Content .elevenlabs-key "PASTE_YOUR_KEY_HERE"
```

No key? Use the free Microsoft voice: at the top of the episode's `build\narration.json` set
`"engine": "edge", "voice": "hi-IN-MadhurNeural", "rate": "+10%", "pitch": "+24Hz"`.

## Music (only if the automatic download fails)

| Save as | Pixabay page |
|---|---|
| `music\calm-vrindavan-prayer.mp3` | https://pixabay.com/music/india-vrindavan-prayer-564673/ |
| `music\action-tabla-raga-pulse.mp3` | https://pixabay.com/music/percussion-tabla-rhythmic-raga-pulse-578507/ |
| `music\sad-classical-instrumental.mp3` | https://pixabay.com/music/world-classical-instrumental-sad-music-300916/ |

How to build, render and add music to an episode is in `CLAUDE.md` and `README.md`.
