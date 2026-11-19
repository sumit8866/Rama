"""ElevenLabs text-to-speech helpers (standard library only).

The API key is read from the ELEVENLABS_API_KEY environment variable, or from the file
D:\\history-studio\\.elevenlabs-key (one line, nothing else). It is never printed.

Command line, from the studio root:
  .venv\\Scripts\\python scripts\\eleven.py usage
      characters used and left this month
  .venv\\Scripts\\python scripts\\eleven.py search [--gender male] [--n 12] [--q story]
      lists Hindi voices from the ElevenLabs Voice Library (free, uses no characters)
  .venv\\Scripts\\python scripts\\eleven.py sample OWNER_ID:VOICE_ID [...] --out hindi-test\\eleven
      adds each library voice to your account and speaks one test line with it
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
STUDIO = os.path.normpath(os.path.join(HERE, ".."))
API = "https://api.elevenlabs.io"
SAMPLE = "लंका का राजा रावण... बहुत बड़ा ज्ञानी था! पर उससे भी बड़ा... अहंकारी। उसने हज़ारों साल तक, ब्रह्मा जी की कठोर तपस्या की!"


def key():
    k = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    path = os.path.join(STUDIO, ".elevenlabs-key")
    if not k and os.path.exists(path):
        with open(path, encoding="utf-8-sig") as f:
            for line in f:  # accepts the bare key, or ELEVENLABS_API_KEY=key as ElevenLabs' own guide writes it
                line = line.strip().strip('"')
                if line and not line.startswith("#"):
                    k = line.split("=", 1)[1].strip().strip('"') if "=" in line else line
                    break
    if not k:
        sys.exit("No ElevenLabs key. Put it in D:\\history-studio\\.elevenlabs-key (one line).")
    return k


def call(method, path, body=None, query=None, raw=False):
    url = API + path + ("?" + urllib.parse.urlencode(query, doseq=True) if query else "")
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={"xi-api-key": key(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            out = r.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:600]
        sys.exit(f"ElevenLabs {method} {path} failed: HTTP {e.code} {detail}")
    return out if raw else json.loads(out or b"{}")


def tts(text, voice_id, out_mp3, model="eleven_v3", settings=None):
    body = {"text": text, "model_id": model}
    if settings:
        body["voice_settings"] = settings
    audio = call("POST", f"/v1/text-to-speech/{voice_id}", body, {"output_format": "mp3_44100_128"}, raw=True)
    with open(out_mp3, "wb") as f:
        f.write(audio)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    p = argparse.ArgumentParser()
    p.add_argument("cmd", choices=["usage", "search", "sample"])
    p.add_argument("ids", nargs="*")
    p.add_argument("--gender", default="male")
    p.add_argument("--q", default="")
    p.add_argument("--n", type=int, default=12)
    p.add_argument("--model", default="eleven_v3")
    p.add_argument("--out", default=os.path.join(STUDIO, "hindi-test", "eleven"))
    a = p.parse_args()

    if a.cmd == "usage":
        s = call("GET", "/v1/user/subscription")
        print(f"plan {s.get('tier')}: {s.get('character_count')} of {s.get('character_limit')} characters used")
        return

    if a.cmd == "search":
        q = {"language": "hi", "page_size": a.n, "sort": "usage_character_count_1y"}
        if a.gender:
            q["gender"] = a.gender
        if a.q:
            q["search"] = a.q
        r = call("GET", "/v1/shared-voices", query=q)
        for v in r.get("voices", []):
            print(f"{v['public_owner_id']}:{v['voice_id']}  {v.get('name')}  [{v.get('age')}, {v.get('use_case')}, {v.get('descriptive')}]")
            if v.get("description"):
                print("    " + v["description"][:160].replace("\n", " "))
        return

    os.makedirs(a.out, exist_ok=True)
    mine = {v["voice_id"]: v["name"] for v in call("GET", "/v1/voices").get("voices", [])}
    for pair in a.ids:
        owner, vid = pair.split(":")
        use = vid
        if vid not in mine:
            r = call("POST", f"/v1/voices/add/{owner}/{vid}", {"new_name": f"hi-{vid[:6]}"})
            use = r.get("voice_id", vid)
        out = os.path.join(a.out, f"{use}.mp3")
        tts(SAMPLE, use, out, a.model)
        print(f"{use} -> {out}")


if __name__ == "__main__":
    main()
