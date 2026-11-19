"""Voice every scene of a narration.json with Kokoro, one wav per scene.

Usage (from a video folder):
  ..\\.venv\\Scripts\\python ..\\scripts\\voice_scenes.py build\\narration.json assets\\vo [--only s03,s05]

Writes assets/vo/<id>.wav and assets/vo/durations.json ({id: seconds}).
"""
import argparse
import json
import os
import re

import soundfile as sf
from kokoro_onnx import Kokoro
from kokoro_onnx.tokenizer import Tokenizer


def to_phonemes(tok, text, lexicon, lang):
    """Phonemize text, but use the lexicon's IPA for any word it lists."""
    if not lexicon:
        return None
    pattern = re.compile(r"\b(" + "|".join(re.escape(w) for w in sorted(lexicon, key=len, reverse=True)) + r")\b")
    parts, last = [], 0
    for m in pattern.finditer(text):
        before = text[last : m.start()]
        if before.strip():
            parts.append(tok.phonemize(before, lang))
        parts.append(lexicon[m.group(1)])
        last = m.end()
    rest = text[last:]
    if rest.strip():
        parts.append(tok.phonemize(rest, lang))
    out = " ".join(p.strip() for p in parts if p.strip())
    return re.sub(r"\s+([,.;:!?])", r"\1", out)

HERE = os.path.dirname(os.path.abspath(__file__))
MODELS = os.path.join(HERE, "..", "models")


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
    dur_path = os.path.join(a.outdir, "durations.json")
    durations = {}
    if os.path.exists(dur_path):
        with open(dur_path, encoding="utf-8") as f:
            durations = json.load(f)

    kokoro = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))
    tok = Tokenizer()
    lexicon = cfg.get("lexicon", {})
    for s in cfg["scenes"]:
        if only and s["id"] not in only:
            continue
        ph = to_phonemes(tok, s["say"], lexicon, "en-gb")
        voice, speed = s.get("voice", cfg["voice"]), s.get("speed", cfg["speed"])
        if ph:
            samples, sr = kokoro.create(ph, voice=voice, speed=speed, lang="en-gb", is_phonemes=True)
        else:
            samples, sr = kokoro.create(s["say"], voice=voice, speed=speed, lang="en-gb")
        out = os.path.join(a.outdir, s["id"] + ".wav")
        sf.write(out, samples, sr)
        durations[s["id"]] = round(len(samples) / sr, 3)
        print(f"{s['id']}: {durations[s['id']]:.2f}s")

    with open(dur_path, "w", encoding="utf-8") as f:
        json.dump(durations, f, indent=2)
    print(f"total voice: {sum(durations.values()):.1f}s")


if __name__ == "__main__":
    main()
