"""Voice a line or a text file with Kokoro (runs locally on CPU).

Usage:
  .venv\\Scripts\\python scripts\\voice.py "Some text" out.wav [--voice bm_george] [--speed 0.95]
  .venv\\Scripts\\python scripts\\voice.py script.txt out.wav
"""
import argparse
import os
import sys

import soundfile as sf
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
MODELS = os.path.join(HERE, "..", "models")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("text", help="text to speak, or a path to a .txt/.md file")
    p.add_argument("out", help="output .wav path")
    p.add_argument("--voice", default="bm_george")
    p.add_argument("--speed", type=float, default=0.95)
    p.add_argument("--lang", default="en-gb")
    a = p.parse_args()

    text = a.text
    if os.path.isfile(text):
        with open(text, encoding="utf-8") as f:
            text = f.read()

    kokoro = Kokoro(
        os.path.join(MODELS, "kokoro-v1.0.onnx"),
        os.path.join(MODELS, "voices-v1.0.bin"),
    )
    samples, sr = kokoro.create(text, voice=a.voice, speed=a.speed, lang=a.lang)
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    sf.write(a.out, samples, sr)
    print(f"wrote {a.out}: {len(samples) / sr:.2f}s at {sr} Hz, voice {a.voice}")


if __name__ == "__main__":
    sys.exit(main())
