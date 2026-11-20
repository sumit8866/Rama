# History Studio

Everything lives inside this folder. Nothing was installed system-wide. Delete the folder to remove all of it (about 1.1 GB).

## What's installed

| Tool | Where | What it does |
|---|---|---|
| HyperFrames 0.9.56 | `node_modules/` | Turns HTML scenes into MP4 video, frame by frame, in headless Chrome. Official HeyGen package. |
| ffmpeg + ffprobe | `tools/ffmpeg/bin/` | Encodes video and audio. BtbN Windows build. |
| whisper.cpp (whisper-cli) | `tools/whisper/Release/` | Word-level timing for narration. Official ggml-org prebuilt binary. |
| Kokoro TTS (kokoro-onnx) | `.venv/` + `models/` | Local narration voice, CPU only. Model `kokoro-v1.0.onnx` plus `voices-v1.0.bin`. |
| `hf.cmd` | studio root | Wrapper that runs HyperFrames with the ffmpeg and whisper above. Always use it instead of plain `npx hyperframes`. |
| `scripts/voice.py` | studio root | Voices a line or a text file with Kokoro. |

## How to run each tool

All commands are for PowerShell or cmd. Run them from inside a video folder.

Voice a line (or a whole script file):

```
..\.venv\Scripts\python ..\scripts\voice.py "Your line here." assets\narration.wav --voice bm_george
..\.venv\Scripts\python ..\scripts\voice.py script.txt assets\narration.wav --voice bm_george --speed 0.95
```

Voices to try: `bm_george`, `bm_daniel`, `am_michael`, `bf_emma`, `af_heart`.

Word timings (writes `assets\transcript.json`):

```
..\hf transcribe assets\narration.wav --model base.en
```

Check the scene, take still frames, then render:

```
..\hf check
..\hf snapshot --at 1,3,5
..\hf render -o ..\output\my-video.mp4
..\hf render -q draft -o ..\output\preview.mp4
```

Live preview in the browser: `..\hf preview`.

## New video

From the studio root:

```
node_modules\.bin\hyperframes init my-topic --example blank --non-interactive --skip-skills
```

Then put images in `my-topic\assets\` and ask Claude Code to build the scenes.

## Hindi reels (`ramayan-hindi/`)

These are vertical 1080×1920 reels for Instagram and Shorts, in the style of cute (chibi) characters with Hindi subtitles. Each episode is its own folder (`ep14`, `ep15`, `ep16`). Episodes 1–13 and the old English test films were deleted on 2026-11-19; `ramayan/build/` keeps only the shared art kit (`lib.mjs`) and animation helpers (`rig.js`).

The narrator is ElevenLabs' built-in voice "George" (`JBFqnCBsd6RMkjVDRZzb`) with the `eleven_v3` model, set with `"engine": "eleven"` in `narration.json`. The script uses `...` for dramatic pauses and `!` for excited lines. The API key lives in `.elevenlabs-key` in the studio root (keep that file private). Each line's text is sent to ElevenLabs. On the free plan you must credit ElevenLabs (for example "Voice: ElevenLabs" in the post caption), you can't monetize, and only built-in voices work through the API; the Voice Library voices need the Starter plan. Check usage with `.venv\Scripts\python scripts\eleven.py usage`.

The free Microsoft voice is the backup: set `"engine": "edge", "voice": "hi-IN-MadhurNeural", "rate": "+10%", "pitch": "+24Hz"` at the top of `narration.json`.

Subtitles sit about 75% down the frame, just above where Instagram draws the username and caption.

| File | What it holds |
|---|---|
| `ramayan-hindi/build-vertical.mjs` | Shared build for every episode: title tag at the top, subtitles with yellow keywords, and every line placed inside the Reels/Shorts safe area. |
| `epNN/build/narration.json` | The Hindi script: scenes, the title tag for each, and one subtitle line per entry. Wrap a word in `*…*` to highlight it in yellow. |
| `epNN/build/scenes.mjs` | That episode's art and animation. Positions are in art coordinates; the build moves the art up 380 px so it sits in the safe area. |
| `epNN/assets/fonts/` | Mukta (subtitles) and Tiro Devanagari Hindi (titles). |

To change narration and rebuild, run these from inside an episode folder, for example `ramayan-hindi\ep14\`:

```
..\..\.venv\Scripts\python ..\..\scripts\voice_lines.py build\narration.json assets\vo
node ..\build-vertical.mjs
..\..\hf render -o ..\..\output\ramayan-hindi-ep14-sone-ka-hiran.mp4
```














Episode 14 (1:06) is "सोने का हिरण": Ravana forcing Maricha, the golden deer, Sita asking for it, the chase, Maricha's death cry in Ram's voice, Lakshman leaving and drawing the Lakshman Rekha (from the popular tradition), and the sadhu at the door. Run the same commands from inside `ramayan-hindi\ep14\`; the output is `output/ramayan-hindi-ep14-sone-ka-hiran.mp4`.

Episode 15 (0:56) is "सीता हरण": the sadhu asking for alms, the Lakshman Rekha bursting into flame, Sita crossing it, the ten-headed Ravana, the Pushpak flying off, Sita's cry and falling jewels, and Jatayu blocking Ravana. Run the same commands from inside `ramayan-hindi\ep15\`; the output is `output/ramayan-hindi-ep15-sita-haran.mp4`.

Episode 16 (0:54) is "जटायु का बलिदान": Jatayu attacking Ravana in the sky, Ravana's sword, Ram returning to the empty hut, the dying Jatayu pointing south, Jatayu dying in Ram's lap, and Ram's last rites for him. Run the same commands from inside `ramayan-hindi\ep16\`; the output is `output/ramayan-hindi-ep16-jatayu.mp4`.

Episode 17 (1:04) is "शबरी के बेर": a flashback to young Shabari serving Matang Rishi and his promise that Ram would come, years of sweeping the path and laying flowers until her hair turns white, Ram's arrival and her tears, the berries she tastes before giving only the sweet ones to Ram (from the popular tradition), Ram's "bond of devotion", the way to Sugriva, and a Hanuman teaser. Run the same commands from inside `ramayan-hindi\ep17\`; the output is `output/ramayan-hindi-ep17-shabari.mp4`.

Episode 18 (0:59) is "हनुमान से भेंट": the brahmin who is really Hanuman, Sugriva hiding on Rishyamuk and fearing the two archers, Hanuman sent in disguise (his tail peeks out), "I am Ram", the true form and Hanuman at Ram's feet, the embrace, Hanuman carrying Ram and Lakshman on his shoulders up to Sugriva, and a Ram-Sugriva friendship teaser. Hanuman, Sugriva and other vanaras come from `CAST.hanuman`, `CAST.sugriva` and `CAST.vanara` in `lib.mjs`. Output: `output/ramayan-hindi-ep18-hanuman-milan.mp4`.

Episode 19 (0:56) is "राम-सुग्रीव मित्रता" (Valmiki, Kishkindha Kanda sarga 5): Hanuman brings Ram and Lakshman to Sugriva, the flowering sala branch laid as Ram's seat, Hanuman kindling fire by rubbing two sticks, Ram and Sugriva walking around the fire as friends, Sugriva's sorrow over Vali, and Ram's promise. From this episode on every event follows `ramayan-hindi/EPISODE-PLAN.md`. Output: `output/ramayan-hindi-ep19-ram-sugriva-mitrata.mp4`.

Episode 20 (0:57) is "सीता जी के गहने" (Valmiki, Kishkindha Kanda sarga 6-7): the hook question about the anklets, a flashback of Sita dropping her ornaments tied in her yellow upper cloth to the vanaras on the mountain, Ram pressing them to his chest and weeping, Lakshman knowing only the anklets because he bowed at her feet daily, Sugriva's promise to find Sita, and Ram embracing him. Output: `output/ramayan-hindi-ep20-sita-ke-gahne.mp4`.

Episode 21 (1:11) is "बाली और मायावी" (Valmiki, Kishkindha Kanda sarga 9-10): the sealed cave as a hook, Vali and Sugriva as loving brothers with Vali king of Kishkindha, the demon Mayavi's challenge at night, the chase into the cave, Sugriva guarding the mouth for a whole year, blood flowing out, the cave sealed with a rock, the ministers crowning Sugriva, Vali's return and rage, Sugriva thrown out and Ruma taken. Output: `output/ramayan-hindi-ep21-bali-mayavi.mp4`.

Episode 22 (1:14) is "दुंदुभि और मतंग का श्राप" (Valmiki, Kishkindha Kanda sarga 11): the toe-flick hook, the buffalo demon Dundubhi with the strength of a thousand elephants, the ocean and the Himalaya each sending him on to Vali, Vali seizing his horns, slamming him down and hurling the body a yojana, the blood falling on Matanga's ashram and the curse that keeps Vali off Rishyamuka, Sugriva safe there, the giant skeleton, Ram flicking it ten yojanas with his big toe, and Sugriva's doubt that dry bones prove little. Output: `output/ramayan-hindi-ep22-dundubhi-matang.mp4`.

Episode 23 (1:02) is "सात साल के पेड़" (Valmiki, Kishkindha Kanda sarga 11-12): the one-arrow hook, Sugriva showing the seven sal trees, Vali able to pierce only one, Lakshman asking what would convince him, Ram's single arrow piercing all seven trees, the hill and the earth, the arrow returning to his quiver, and Sugriva bowing at Ram's feet. Output: `output/ramayan-hindi-ep23-saat-saal-vriksh.mp4`.

Episode 24 (1:00) is "बाली-सुग्रीव का पहला युद्ध" (Valmiki, Kishkindha Kanda sarga 12): the held-arrow hook, Ram hiding behind trees at Kishkindha, Sugriva's roaring challenge, Vali bursting out, the fight (a cartoon dust cloud), the two brothers looking exactly alike so Ram does not shoot, Sugriva beaten and fleeing to Rishyamuka, and his complaint to Ram. Output: `output/ramayan-hindi-ep24-pehla-yuddh.mp4`.

Episode 25 (1:01) is "फूलों की माला" (Valmiki, Kishkindha Kanda sarga 12-14): Ram explaining that the brothers matched in ornaments, size, gait and voice, Lakshman putting the flowering gajapushpi creeper on Sugriva's neck (he shines like an evening cloud with a row of cranes), the Saptajana ashram of seven sages on the way, and Sugriva's second roaring challenge with Ram ready. Output: `output/ramayan-hindi-ep25-phoolon-ki-mala.mp4`.

Episode 26 (1:07) is "तारा की चेतावनी" (Valmiki, Kishkindha Kanda sarga 15-16): Vali rising in rage at Sugriva's second roar, Tara stopping him (a beaten Sugriva back so soon must have strong help), Angada's spies' news that Ram and Lakshman are Sugriva's friends, her plea to make Sugriva crown prince, Vali's refusal (a hero cannot ignore a challenge, Ram knows dharma, he will only break Sugriva's pride), Tara's blessing walk around him, and Vali going out to fight. Output: `output/ramayan-hindi-ep26-tara-ki-chetavani.mp4`.

Episode 27 (0:59) is "बाली वध" (Valmiki, Kishkindha Kanda sarga 16-17): Vali charging Sugriva in his garland, Sugriva striking with an uprooted sal tree, Sugriva tiring and looking to Ram, Ram's thunderbolt-like arrow striking Vali's chest (a flash, no blood), Vali falling like a cut tree, Indra's golden chain still holding his life, and Ram and Lakshman stepping out. Output: `output/ramayan-hindi-ep27-bali-vadh.mp4`.

The shared scene helpers (labels, petals, sparkles, archery, the cropped hall) live in `ramayan-hindi/reel-kit.mjs`, so a new episode's `scenes.mjs` only holds its own art and timing.

## Background music (`music/`)

Three free tracks from Pixabay (Pixabay Content License: free to use, no credit needed, none is Content ID registered):

| File | Track | Used for |
|---|---|---|
| `music/calm-vrindavan-prayer.mp3` | "Vrindavan Prayer" by LunarBoomMusic | calm episodes |
| `music/action-tabla-raga-pulse.mp3` | "Tabla Rhythmic Raga Pulse" by alex-morgan | action episodes 14, 15 |
| `music/sad-classical-instrumental.mp3` | "Classical instrumental sad music" by fictionvfxstudio | sad episode 16 |

`scripts/add_music.py` mixes the right track under each reel: it dips under the narration (sidechain ducking) and comes back up in the pauses, fades in and out, and the whole mix is normalised to -14 LUFS for Reels and Shorts. The results go to `output/with-music/`; the originals in `output/` are untouched. Change the mood of an episode in the `MOOD` table at the top of the script. Run it from the studio root after rendering a new episode:

```
.venv\Scripts\python scripts\add_music.py ep17
```

## Thumbnails and profile picture (`covers/`, `profile/`)

- `output/covers/cover-epNN.png`: 1080x1920 cover for each episode. The text sits in the middle 4:5 area, so the Instagram grid crop keeps it.
- `output/covers/profile-devlok-toons.png`: 1080x1080 profile picture for Instagram and YouTube.
- `output/covers/frames/`: the clean key frame behind each cover (rendered without subtitles).

To make covers for new episodes:
1. Grab a clean frame: inside the episode folder run `set NOCAPS=1 && node ..\build-vertical.mjs`, then `..\..\hf.cmd snapshot --at <seconds>`. Afterwards run `node ..\build-vertical.mjs` again to restore the normal build.
2. Copy that frame to `covers/assets/frames/epNN.png` and add the episode to `EPISODES` in `covers/build-covers.mjs`.
3. From the studio root, run `node covers/build-covers.mjs`, then from inside `covers\` run `..\hf.cmd snapshot --at <N - 0.5>`.

## Not done yet (optional)

- **HyperFrames Claude Code skills** (`/hyperframes`, `/hyperframes-cli`, `/hyperframes-registry`, `/media-use`, `/reverse-any-video`, `/style-sampling`) are installed for your whole Windows user, in `C:\Users\SIS\.claude\skills\` and `C:\Users\SIS\.agents\skills\`. They load in every Claude session, not just this folder. To update them, run `npx hyperframes skills update`.
- **Telemetry.** HyperFrames sends anonymous usage data. To turn it off, run `node_modules\.bin\hyperframes telemetry disable`.
