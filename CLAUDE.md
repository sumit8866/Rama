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

## When the user asks for a new part: deliver the finished reel

Do the whole pipeline in one go, without stopping to ask questions, and end by giving the final files:
1. Take the next row of `ramayan-hindi\EPISODE-PLAN.md`. From Ep 19 on the series covers **every** event in Valmiki's order, not only the famous ones: check that sarga on valmikiramayan.net or vedapath.app before writing, follow Valmiki, and mark anything from a later telling in the README line. Write `narration.json` and `scenes.mjs` (continue the story from the last episode; the closing teaser names the next plan row).
2. Voice: use ElevenLabs if `eleven.py usage` shows enough characters left for the script; otherwise switch that episode to the free Microsoft voice automatically and say so.
3. Build, `hf check`, look at snapshots and fix layout problems, then render.
4. Add music (`add_music.py`, set its `MOOD`).
5. Make the cover (`output\covers\cover-epNN.png`).
6. Write the post text to `output\captions-epNN.txt`: Instagram caption (Hindi hook line, Roman-Hindi keywords line, "रामायण भाग N | Ramayan Part N", an episode-specific question, "📲 परिवार के साथ शेयर करें, ताकि बच्चे भी रामायण जानें 🙏", "💾 Save करें | अगला भाग: …", "Voice: ElevenLabs" if that voice was used, 8 hashtags), plus a YouTube title ending in `#shorts` and a 2-line description.
   Then append it to `output\captions-and-bio.txt` and rebuild the all-parts PDF: `.venv\Scripts\python scripts\captions_pdf.py`, then print `output\devlok-toons-captions.html` with Edge headless (`msedge --headless=new --print-to-pdf=output\devlok-toons-captions.pdf --no-pdf-header-footer --allow-file-access-from-files <file URL>`) and delete the HTML. Covers for Ep 1-13 come from the backup `Downloads\rama.zip`.
7. Send the user the finished video (`output\with-music\…mp4`), the cover and the caption file, with one short line each. Don't explain the build steps.

## Episodes

Done: Ep 14 सोने का हिरण, Ep 15 सीता हरण, Ep 16 जटायु का बलिदान, Ep 17 शबरी के बेर, Ep 18 हनुमान से भेंट, Ep 19 राम-सुग्रीव मित्रता, Ep 20 सीता जी के गहने, Ep 21 बाली और मायावी, Ep 22 दुंदुभि और मतंग का श्राप, Ep 23 सात साल के पेड़, Ep 24 बाली-सुग्रीव का पहला युद्ध, Ep 25 फूलों की माला, Ep 26 तारा की चेतावनी, Ep 27 बाली वध, Ep 28 बाली के प्रश्न, राम के उत्तर, Ep 29 तारा का विलाप, Ep 30 सुग्रीव का राज्याभिषेक, Ep 31 वर्षा ऋतु, Ep 32 लक्ष्मण का क्रोध, Ep 33 तारा ने लक्ष्मण को शांत किया (Ep 1-13 project folders were deleted; their videos are backed up outside the repo). Next: Ep 34 वानर सेना (sarga 37-39; wisdomlib ch. 37 = doc424528, follow each page's "Next" link); when valmikiramayan.net is down, the Shastri translation on wisdomlib.org works (Kishkindha ch. 17 = .../d/doc424190.html, ch. 18 = doc424191, so later chapters follow on); the full list is in `ramayan-hindi\EPISODE-PLAN.md`.

Each episode is `ramayan-hindi\epNN\` with:
- `build\narration.json`: Hindi lines per scene (`*word*` = yellow highlight), title chip per scene, engine/voice settings. Copy the settings block from ep16.
- `build\scenes.mjs`: each scene's art and GSAP animation. Imports characters and props from `ramayan\build\lib.mjs` (`CAST.ram`, `CAST.sita`, `CAST.hanuman`, `CAST.sugriva`, `CAST.vanara` (any person can take `muzzle` and `tail` colours), `PROP`, trees, huts...) and helpers from `ramayan-hindi\reel-kit.mjs` (tag, big, sparkles, petals, flames, archer, shoot, arrowFly...). Animation helpers (mv, osc, op, hx, walk, blink, mood) come from `ramayan\build\rig.js`.
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
