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

All commands are for PowerShell or cmd. Run them from inside a video folder, for example `test-video\`.

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

## Test result (2026-11-16)

`output/test-video.mp4`: one title card plus one Kokoro line (bm_george). 1920×1080, 30 fps, 10 s, H.264/AAC, 2.2 MB.

- Voice: an 8 s line generated in about 6 s.
- Render: about 26 s for 10 s of video (6 workers, GPU capture). At that rate a 15-minute film takes roughly 40 minutes; scenes with many images will take longer.

## Ramayan film (`ramayan/`)

"The Birth of Ram": 2:02, 11 scenes. Characters are drawn in code (SVG) and narrated by Kokoro `bm_george`.

| File | What it holds |
|---|---|
| `ramayan/build/narration.json` | The script, one line per scene, plus the name pronunciations (`lexicon`, in IPA). |
| `ramayan/build/lib.mjs` | The art kit: characters (Ram, Lakshman, Dasharath, queens, sages, Tadaka), sets, props. |
| `ramayan/build/scenes.mjs` | Each scene's layout and animation, timed to the narration words. |
| `ramayan/build/rig.js` | Animation helpers used by every scene: walk, blink, mood, arm moves. |
| `ramayan/build/build.mjs` | Writes `index.html` and `compositions/*.html` from the files above. |

To change a line of narration, run these from inside `ramayan\`:

```
..\.venv\Scripts\python ..\scripts\voice_scenes.py build\narration.json assets\vo --only s05
..\hf transcribe assets\vo\s05.wav --model base.en
move /y assets\vo\transcript.json build\s05.words.json
node build\build.mjs
..\hf render -o ..\output\ramayan-birth-of-ram.mp4
```

Don't edit `compositions/*.html` by hand: `build.mjs` overwrites them. Change `scenes.mjs` or `lib.mjs` instead.

### Part 2 (`ramayan-2/`)

"The Bow of Shiva": 2:24, 11 scenes. It covers the divine weapons, Maricha and Subahu, Ahalya, Janaka's court, the breaking of Shiva's bow, the garland and the four weddings, and ends on Kaikeyi's promise.

It has its own `build/narration.json` and `build/scenes.mjs`. It shares the art kit (`ramayan/build/lib.mjs`) and the animation helpers (`ramayan/build/rig.js`) with Part 1, so a character changed in `lib.mjs` changes in both parts the next time each one is built. The commands are the same as for Part 1, run from inside `ramayan-2\`. The output is `output/ramayan-part2-bow-of-shiva.mp4`.

## Hindi reels (`ramayan-hindi/`)

These are vertical 1080×1920 reels for Instagram and Shorts, in the style of cute (chibi) characters with Hindi subtitles. Each episode is its own folder (`ep01`, `ep02`, …).

The narrator is ElevenLabs' built-in voice "George" (`JBFqnCBsd6RMkjVDRZzb`) with the `eleven_v3` model, set with `"engine": "eleven"` in `narration.json`. The script uses `...` for dramatic pauses and `!` for excited lines. The API key lives in `.elevenlabs-key` in the studio root (keep that file private). Each line's text is sent to ElevenLabs. On the free plan you must credit ElevenLabs (for example "Voice: ElevenLabs" in the post caption), you can't monetize, and only built-in voices work through the API; the Voice Library voices need the Starter plan. Check usage with `.venv\Scripts\python scripts\eleven.py usage`.

The free Microsoft voice is kept as a backup under `edge_voice_backup` in Episode 1's `narration.json`: copy those four settings to the top of the file to switch back.

Subtitles sit about 75% down the frame, just above where Instagram draws the username and caption.

| File | What it holds |
|---|---|
| `ramayan-hindi/build-vertical.mjs` | Shared build for every episode: title tag at the top, subtitles with yellow keywords, and every line placed inside the Reels/Shorts safe area. |
| `epNN/build/narration.json` | The Hindi script: scenes, the title tag for each, and one subtitle line per entry. Wrap a word in `*…*` to highlight it in yellow. |
| `epNN/build/scenes.mjs` | That episode's art and animation. Positions are in art coordinates; the build moves the art up 380 px so it sits in the safe area. |
| `epNN/assets/fonts/` | Mukta (subtitles) and Tiro Devanagari Hindi (titles). |

To change narration and rebuild, run these from inside `ramayan-hindi\ep01\`:

```
..\..\.venv\Scripts\python ..\..\scripts\voice_lines.py build\narration.json assets\vo
node ..\build-vertical.mjs
..\..\hf render -o ..\..\output\ramayan-hindi-ep01-vishnu-ram.mp4
```

Episode 1 (1:09) is "विष्णु राम क्यों बने": Ravana's boon, the gods at Kshirsagar, and Vishnu's promise.

Episode 2 (1:00) is "राम का जन्म": Dasharath's sorrow, Guru Vasishtha, the Putrakameshti yagna and the divine kheer, the three queens, the four princes, and Ayodhya lit with diyas. Run the same commands from inside `ramayan-hindi\ep02\`; the output is `output/ramayan-hindi-ep02-ram-janm.mp4`.

Episode 3 (1:07) is "ताड़का वध": Vishwamitra asks for Ram, Dasharath's fear, the road to the forest, Tadaka's attack, Ram's single arrow, and the divine weapons. Run the same commands from inside `ramayan-hindi\ep03\`; the output is `output/ramayan-hindi-ep03-tadaka-vadh.mp4`.

Episode 4 (1:06) is "मारीच और सुबाहु": the golden-deer hook, Siddhashram and the six-day yagna, the guard, the demon attack, and Ram's three astras. Run the same commands from inside `ramayan-hindi\ep04\`; the output is `output/ramayan-hindi-ep04-marich-subahu.mp4`.

Episode 5 (1:02) is "अहल्या उद्धार": the waiting stone, Gautama's deserted ashram, a sepia flashback of Indra's deceit and Gautama's curse, Ram's feet freeing Ahalya, and the ashram blooming again. It follows the popular telling, where Ahalya becomes stone; in Valmiki she lives unseen in the ashram. Run the same commands from inside `ramayan-hindi\ep05\`; the output is `output/ramayan-hindi-ep05-ahalya-uddhar.mp4`.

Episode 6 (1:08) is "शिव धनुष भंग": the bow 5000 men hauled, Janaka's court, Sita found in the furrow, Janaka's vow, the kings who failed, Ram lifting, stringing and breaking the bow, and Sita's varmala (the varmala is from the popular telling). Run the same commands from inside `ramayan-hindi\ep06\`; the output is `output/ramayan-hindi-ep06-shiv-dhanush.mp4`.

Episode 7 (1:03) is "राम-सीता विवाह": the message to Ayodhya, Dasharath's baraat on an elephant, the four brides (Sita, Urmila, Mandavi, Shrutakirti), the seven pheras around the fire, flowers from the gods, the farewell, and a Parashurama teaser. Run the same commands from inside `ramayan-hindi\ep07\`; the output is `output/ramayan-hindi-ep07-ram-sita-vivah.mp4`.

Episode 8 (1:08) is "परशुराम का क्रोध": the storm on the road home, Parashurama with his axe and Vishnu's bow, Dasharath's plea, the challenge, Ram stringing the bow in an instant while Parashurama sees Vishnu in him, his anger calming, and the return to a lit-up Ayodhya. Run the same commands from inside `ramayan-hindi\ep08\`; the output is `output/ramayan-hindi-ep08-parshuram.mp4`.

Episode 9 (1:01) is "कैकेयी के दो वरदान": the coronation announced, Manthara poisoning Kaikeyi's mind, a sepia flashback of Kaikeyi saving Dasharath in battle and the two boons, the kop bhavan, Bharat's throne and Ram's 14-year exile, and Dasharath fainting. Run the same commands from inside `ramayan-hindi\ep09\`; the output is `output/ramayan-hindi-ep09-kaikeyi-vardan.mp4`.

Episode 10 (1:00) is "राम वनवास": the king-to-be walking smiling into the forest, Ram accepting his father's word, Kaushalya's tears and blessing, Sita and Lakshman choosing to go, the bark clothes, Ayodhya running after the chariot, Dasharath calling "Ram", and a Kevat teaser. Run the same commands from inside `ramayan-hindi\ep10\`; the output is `output/ramayan-hindi-ep10-ram-vanvas.mp4`.

Episode 11 (1:04) is "केवट की भक्ति" (from Tulsidas's Ramcharitmanas): the Kevat refusing the boat, his fear that the boat would become a woman like Ahalya, washing Ram's feet, the Ganga crossing, refusing Sita's ring because "we are both boatmen", and Ram embracing him. Run the same commands from inside `ramayan-hindi\ep11\`; the output is `output/ramayan-hindi-ep11-kevat.mp4`.

Episode 12 (1:02) is "भरत मिलाप": the throne Bharat refused, Dasharath's death calling "Ram", Bharat confronting Kaikeyi, the march to Chitrakoot, Bharat at Ram's feet and the embrace, Ram keeping his word, the padukas, and Bharat ruling as their servant. Run the same commands from inside `ramayan-hindi\ep12\`; the output is `output/ramayan-hindi-ep12-bharat-milap.mp4`.

Episode 13 (1:05) is "शूर्पणखा": the hut at Panchavati, Shurpanakha disguised as a beauty, the brothers' joke, her true form lunging at Sita, Lakshman's sword (shown without gore), Ram alone against Khara-Dushana's 14,000, and her flight to Ravana. Run the same commands from inside `ramayan-hindi\ep13\`; the output is `output/ramayan-hindi-ep13-shurpanakha.mp4`.

Episode 14 (1:06) is "सोने का हिरण": Ravana forcing Maricha, the golden deer, Sita asking for it, the chase, Maricha's death cry in Ram's voice, Lakshman leaving and drawing the Lakshman Rekha (from the popular tradition), and the sadhu at the door. Run the same commands from inside `ramayan-hindi\ep14\`; the output is `output/ramayan-hindi-ep14-sone-ka-hiran.mp4`.

Episode 15 (0:56) is "सीता हरण": the sadhu asking for alms, the Lakshman Rekha bursting into flame, Sita crossing it, the ten-headed Ravana, the Pushpak flying off, Sita's cry and falling jewels, and Jatayu blocking Ravana. Run the same commands from inside `ramayan-hindi\ep15\`; the output is `output/ramayan-hindi-ep15-sita-haran.mp4`.

Episode 16 (0:54) is "जटायु का बलिदान": Jatayu attacking Ravana in the sky, Ravana's sword, Ram returning to the empty hut, the dying Jatayu pointing south, Jatayu dying in Ram's lap, and Ram's last rites for him. Run the same commands from inside `ramayan-hindi\ep16\`; the output is `output/ramayan-hindi-ep16-jatayu.mp4`.

From Episode 4 on, the shared scene helpers (labels, petals, sparkles, archery, the cropped hall) live in `ramayan-hindi/reel-kit.mjs`, so a new episode's `scenes.mjs` only holds its own art and timing.

## Background music (`music/`)

Three free tracks from Pixabay (Pixabay Content License: free to use, no credit needed, none is Content ID registered):

| File | Track | Used for |
|---|---|---|
| `music/calm-vrindavan-prayer.mp3` | "Vrindavan Prayer" by LunarBoomMusic | calm episodes 1, 2, 5, 7, 11, 12 |
| `music/action-tabla-raga-pulse.mp3` | "Tabla Rhythmic Raga Pulse" by alex-morgan | action episodes 3, 4, 6, 8, 13, 14, 15 |
| `music/sad-classical-instrumental.mp3` | "Classical instrumental sad music" by fictionvfxstudio | sad episodes 9, 10, 16 |

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
