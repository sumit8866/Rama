# Setup on a new computer

Windows, PowerShell. Run every command from the studio folder unless it says otherwise.

## 1. Install Node.js and Python (once per computer)

- Node.js 24 or newer: https://nodejs.org
- Python 3.13: https://www.python.org/downloads/ (tick "Add python.exe to PATH")
- Git: https://git-scm.com

## 2. Get the code

```powershell
git clone https://github.com/sumit8866/Rama.git history-studio
```

```powershell
cd history-studio
```

## 3. Install the video tool (HyperFrames)

```powershell
npm install
```

## 4. Install the voice tools (Python)

```powershell
py -3 -m venv .venv
```

```powershell
.venv\Scripts\python -m pip install edge-tts soundfile numpy
```

## 5. Install ffmpeg (into tools\ffmpeg\bin)

```powershell
Invoke-WebRequest https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip -OutFile ffmpeg.zip
```

```powershell
Expand-Archive ffmpeg.zip ffmpeg-tmp; New-Item -ItemType Directory -Force tools\ffmpeg\bin | Out-Null; Move-Item ffmpeg-tmp\*\bin\* tools\ffmpeg\bin\; Remove-Item -Recurse -Force ffmpeg-tmp, ffmpeg.zip
```

## 6. ElevenLabs voice key

Make your own key at https://elevenlabs.io (Developers > API keys, with Text to Speech access). Never share or upload it.

```powershell
Set-Content .elevenlabs-key "PASTE_YOUR_KEY_HERE"
```

Check it works and see how many characters are left this month:

```powershell
.venv\Scripts\python scripts\eleven.py usage
```

No key? Use the free Microsoft voice: at the top of the episode's `build\narration.json` set
`"engine": "edge", "voice": "hi-IN-MadhurNeural", "rate": "+10%", "pitch": "+24Hz"`.

## 7. Background music

The music is not on GitHub (Pixabay's license doesn't allow sharing the files). Download these three free tracks and save them in a `music` folder with exactly these names:

| Save as | Pixabay page |
|---|---|
| `music\calm-vrindavan-prayer.mp3` | https://pixabay.com/music/india-vrindavan-prayer-564673/ |
| `music\action-tabla-raga-pulse.mp3` | https://pixabay.com/music/percussion-tabla-rhythmic-raga-pulse-578507/ |
| `music\sad-classical-instrumental.mp3` | https://pixabay.com/music/world-classical-instrumental-sad-music-300916/ |

```powershell
New-Item -ItemType Directory -Force music, output\with-music | Out-Null
```

## 8. Test: rebuild Episode 16

```powershell
cd ramayan-hindi\ep16
```

```powershell
node ..\build-vertical.mjs
```

```powershell
..\..\hf.cmd check
```

```powershell
..\..\hf.cmd render -o ..\..\output\ramayan-hindi-ep16-jatayu.mp4
```

```powershell
cd ..\..
```

```powershell
.venv\Scripts\python scripts\add_music.py ep16
```

The finished reel is `output\with-music\ramayan-hindi-ep16-jatayu.mp4`.

## Making the next part (for example Ep 17)

Easiest way: open this folder in Claude Code and ask "make Ep 17, शबरी के बेर, like Ep 14-16". It writes the episode folder for you.

By hand, copy Ep 16 and change its script and scenes:

```powershell
Copy-Item -Recurse ramayan-hindi\ep16 ramayan-hindi\ep17
```

Edit `ramayan-hindi\ep17\build\narration.json` (the Hindi lines) and `ramayan-hindi\ep17\build\scenes.mjs` (the drawings and animation). Then:

```powershell
cd ramayan-hindi\ep17
```

```powershell
..\..\.venv\Scripts\python ..\..\scripts\voice_lines.py build\narration.json assets\vo
```

```powershell
node ..\build-vertical.mjs
```

```powershell
..\..\hf.cmd render -o ..\..\output\ramayan-hindi-ep17-shabari.mp4
```

```powershell
cd ..\..
```

Add `"ep17": "calm",` to `MOOD` in `scripts\add_music.py`, then:

```powershell
.venv\Scripts\python scripts\add_music.py ep17
```

More detail (covers, profile picture, captions) is in `README.md`.
