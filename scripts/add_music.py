"""Mix background music under the Hindi reels.

Usage, from the studio root:
  .venv\\Scripts\\python scripts\\add_music.py            (all episodes)
  .venv\\Scripts\\python scripts\\add_music.py ep14 ep16  (only these)

Each episode gets one of the tracks in music/ (see MOOD below). The music is levelled to
MUSIC_DB, fades in and out, and is ducked under the narration with a sidechain compressor,
so it dips while the voice speaks and comes back up in the pauses and on the final "जय श्री राम".
The mix is normalised to -14 LUFS (the usual level for Reels and Shorts).
The video stream is copied untouched. New files go to output/with-music/.
"""
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
STUDIO = os.path.normpath(os.path.join(HERE, ".."))
FF = os.path.join(STUDIO, "tools", "ffmpeg", "bin", "ffmpeg.exe")
FP = os.path.join(STUDIO, "tools", "ffmpeg", "bin", "ffprobe.exe")
OUT = os.path.join(STUDIO, "output")
DEST = os.path.join(OUT, "with-music")

TRACKS = {
    "calm": "music/calm-vrindavan-prayer.mp3",
    "action": "music/action-tabla-raga-pulse.mp3",
    "sad": "music/sad-classical-instrumental.mp3",
}
MOOD = {
    "ep14": "action", "ep15": "action", "ep16": "sad", "ep17": "calm", "ep18": "calm", "ep19": "calm", "ep20": "sad", "ep21": "action",
}
MUSIC_DB = -26.0  # average music level before ducking; under speech it ends up ~16 dB below the voice


def run(args):
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")


def mean_db(path):
    r = run([FF, "-hide_banner", "-i", path, "-af", "volumedetect", "-f", "null", "-"])
    return float(re.search(r"mean_volume: (-?[\d.]+) dB", r.stderr).group(1))


def duration(path):
    return float(run([FP, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).stdout.strip())


def main():
    only = set(sys.argv[1:])
    os.makedirs(DEST, exist_ok=True)
    gains = {k: MUSIC_DB - mean_db(os.path.join(STUDIO, v)) for k, v in TRACKS.items()}
    for name in sorted(os.listdir(OUT)):
        m = re.match(r"ramayan-hindi-(ep\d\d)-.+\.mp4$", name)
        if not m or (only and m.group(1) not in only):
            continue
        ep = m.group(1)
        mood = MOOD.get(ep, "calm")
        src = os.path.join(OUT, name)
        dur = duration(src)
        g = gains[mood]
        graph = (
            "[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[v][sc];"
            f"[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{dur:.3f},asetpts=N/SR/TB,"
            f"volume={g:.1f}dB,afade=t=in:d=1.5,afade=t=out:st={max(0, dur - 2.0):.3f}:d=2[m];"
            "[m][sc]sidechaincompress=threshold=0.08:ratio=2:attack=20:release=450[md];"
            "[v][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]"
        )
        dst = os.path.join(DEST, name)
        r = run([FF, "-hide_banner", "-loglevel", "error", "-y", "-i", src, "-i", os.path.join(STUDIO, TRACKS[mood]),
                 "-filter_complex", graph, "-map", "0:v", "-c:v", "copy", "-map", "[a]", "-c:a", "aac", "-b:a", "192k",
                 "-movflags", "+faststart", dst])
        if r.returncode:
            sys.exit(f"{name}: {r.stderr[-800:]}")
        print(f"{ep}  {mood:6}  music {g:+.1f} dB  ->  {os.path.relpath(dst, STUDIO)}")


if __name__ == "__main__":
    main()
