# Devlok Toons studio: notes for Claude

Animated Hindi Ramayan reels (1080x1920, about 55-70 s) for Instagram Reels and YouTube Shorts, page name "Devlok Toons". Characters are drawn in code (SVG) and animated with HyperFrames + GSAP. Narrator: ElevenLabs built-in voice George.

## First time on a computer: set it up yourself

If `node_modules\`, `.venv\`, `tools\ffmpeg\bin\ffmpeg.exe` or `music\*.mp3` is missing, run the setup without asking the user to do any step by hand:

```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

It installs HyperFrames (npm), the Python voice tools (.venv), ffmpeg, and downloads the three Pixabay music tracks. It is safe to re-run. Only these need the user:
- Node.js or Python not installed: tell them the link the script prints.
- `.elevenlabs-key` missing: ask the user to create it themselves (`Set-Content .elevenlabs-key "KEY"`). Never print, log or commit the key. Without a key, use the free Microsoft voice (`"engine": "edge", "voice": "hi-IN-MadhurNeural", "rate": "+10%", "pitch": "+24Hz"` in `narration.json`).

## Episodes

Done: Ep 14 सोने का हिरण, Ep 15 सीता हरण, Ep 16 जटायु का बलिदान (Ep 1-13 were deleted). Next: Ep 17 शबरी के बेर, then सुग्रीव मित्रता, बाली वध, हनुमान लंका, ...

Each episode is `ramayan-hindi\epNN\` with:
- `build\narration.json`: Hindi lines per scene (`*word*` = yellow highlight), title chip per scene, engine/voice settings. Copy the settings block from ep16.
- `build\scenes.mjs`: each scene's art and GSAP animation. Imports characters and props from `ramayan\build\lib.mjs` (`CAST.ram`, `CAST.sita`, `PROP`, trees, huts...) and helpers from `ramayan-hindi\reel-kit.mjs` (tag, big, sparkles, petals, flames, archer, shoot, arrowFly...). Animation helpers (mv, osc, op, hx, walk, blink, mood) come from `ramayan\build\rig.js`.
- `assets\vo\`: voice lines made by `voice_lines.py` (do not delete: they cost ElevenLabs credits).

Start a new episode by copying the closest one (`Copy-Item -Recurse ramayan-hindi\ep16 ramayan-hindi\ep17`), delete its `assets\vo\*.wav` and `compositions\`, then rewrite `narration.json` and `scenes.mjs`.

## Build an episode (from inside `ramayan-hindi\epNN\`)

```powershell
..\..\.venv\Scripts\python ..\..\scripts\voice_lines.py build\narration.json assets\vo
node ..\build-vertical.mjs
..\..\hf.cmd check
..\..\hf.cmd snapshot --at 2,10,20
..\..\hf.cmd render -o ..\..\output\ramayan-hindi-epNN-name.mp4
```

Then from the studio root: add the episode to `MOOD` in `scripts\add_music.py` (calm / action / sad) and run `.venv\Scripts\python scripts\add_music.py epNN`. Final file: `output\with-music\`.

Cover: in the episode folder `$env:NOCAPS=1; node ..\build-vertical.mjs; ..\..\hf.cmd snapshot --at <s>`, then `Remove-Item Env:NOCAPS; node ..\build-vertical.mjs`. Copy the frame to `covers\assets\frames\epNN.png`, add it to `EPISODES` in `covers\build-covers.mjs`, run `node covers\build-covers.mjs`, then in `covers\` run `..\hf.cmd snapshot --at <index + 0.5>`.

## Rules learned the hard way

- ElevenLabs free plan: 10,000 characters a month. Keep a script around 400-900 characters and check `.venv\Scripts\python scripts\eleven.py usage` first. Add "Voice: ElevenLabs" to every caption (free-plan rule).
- Look at snapshots before rendering. Keep faces, labels and tags inside the safe area: y 269-1248 (Reels UI) and x 48-888 (Shorts buttons). Subtitles sit at top 1352; never put art text there.
- Rotating a group pivots at its origin: wrap the object so it sits at the group origin (`T(x,y)`) and rotate that group.
- Two `mv` tweens on the same element at the same time fight each other; combine them into one. `osc` overrides later moves, so end it before an `mv`.
- Avoid full-white flashes under subtitles (unreadable); cross-fade instead.
- Hold labels at least 1.5 s so they can be read.
- Never edit `compositions\*.html` or `index.html` by hand: `build-vertical.mjs` overwrites them.

## Git

Code only goes to GitHub. `.gitignore` keeps out the API key, videos (`output\`), music (Pixabay license forbids sharing the files), and installed tools. Captions live in `output\captions-and-bio.txt` (local only).
