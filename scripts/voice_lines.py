"""Voice every subtitle line of a narration.json, one wav per line.

Usage (from an episode folder):
  ..\\..\\.venv\\Scripts\\python ..\\..\\scripts\\voice_lines.py build\\narration.json assets\\vo [--only s03]

narration.json:
  {engine: "eleven" | "edge" | "kokoro", voice, speed (kokoro), rate (edge, e.g. "-5%"), lang (kokoro),
   model + settings (eleven: model id such as "eleven_v3", optional voice_settings object),
   scenes: [{id, title, lines: ["text with *highlight* words", ...]}]}
  engine "edge" uses Microsoft's online neural voices (e.g. hi-IN-MadhurNeural) through edge-tts:
  the line text is sent to Microsoft's service. engine "kokoro" (default) runs on this computer.
Writes assets/vo/<scene>_<n>.wav and assets/vo/lines.json ({"s01_1": seconds, ...}).
"""
import argparse
import asyncio
import json
import os
import subprocess

import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
MODELS = os.path.join(HERE, "..", "models")
FFMPEG = os.path.join(HERE, "..", "tools", "ffmpeg", "bin", "ffmpeg.exe")


def edge_line(text, voice, rate, pitch, out_wav):
    import edge_tts

    mp3 = out_wav[:-4] + ".mp3"

    async def go():
        await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(mp3)

    asyncio.run(go())
    return mp3_to_wav(mp3, out_wav)


def eleven_line(text, voice, model, settings, out_wav):
    import sys

    sys.path.insert(0, HERE)  # python -I leaves the script's folder off the import path
    import eleven

    mp3 = out_wav[:-4] + ".mp3"
    eleven.tts(text, voice, mp3, model, settings)
    return mp3_to_wav(mp3, out_wav)


def mp3_to_wav(mp3, out_wav):
    # 24 kHz mono wav, with the silence the voice service leaves at both ends trimmed to ~60 ms
    trim = "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,areverse"
    subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", mp3, "-af", trim, "-ar", "24000", "-ac", "1", out_wav], check=True)
    os.remove(mp3)
    info = sf.info(out_wav)
    return info.frames / info.samplerate


def main():
    p = argparse.ArgumentParser()
    p.add_argument("narration")
    p.add_argument("outdir")
    p.add_argument("--only", default="")
    a = p.parse_args()

    with open(a.narration, encoding="utf-8") as f:
        cfg = json.load(f)
    only = {s for s in a.only.split(",") if s}
    os.makedirs(a.outdir, exist_ok=True)
    out_json = os.path.join(a.outdir, "lines.json")
    durs = {}
    if os.path.exists(out_json):
        with open(out_json, encoding="utf-8") as f:
            durs = json.load(f)

    engine = cfg.get("engine", "kokoro")
    kokoro = None
    if engine == "kokoro":
        from kokoro_onnx import Kokoro

        kokoro = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))

    for sc in cfg["scenes"]:
        if only and sc["id"] not in only:
            continue
        for i, line in enumerate(sc["lines"], 1):
            text = line.replace("*", "")
            key = f"{sc['id']}_{i}"
            out = os.path.join(a.outdir, key + ".wav")
            if engine == "eleven":
                d = eleven_line(text, sc.get("voice", cfg["voice"]), cfg.get("model", "eleven_v3"), cfg.get("settings"), out)
            elif engine == "edge":
                d = edge_line(text, sc.get("voice", cfg["voice"]), cfg.get("rate", "+0%"), cfg.get("pitch", "+0Hz"), out)
            else:
                samples, sr = kokoro.create(text, voice=sc.get("voice", cfg["voice"]), speed=sc.get("speed", cfg.get("speed", 1.0)), lang=cfg.get("lang", "en-us"))
                sf.write(out, samples, sr)
                d = len(samples) / sr
            durs[key] = round(d, 3)
            print(f"{key}: {durs[key]:.2f}s")

    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(durs, f, indent=2)
    print(f"total voice: {sum(durs.values()):.1f}s")


if __name__ == "__main__":
    main()
