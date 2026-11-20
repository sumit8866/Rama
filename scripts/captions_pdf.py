# Builds output/devlok-toons-captions.html from output/captions-and-bio.txt; print it to PDF with Edge headless
# (see CLAUDE.md). Usage from the studio root:  .venv\Scripts\python scripts\captions_pdf.py
import html, re, sys, pathlib
R = pathlib.Path(r"D:\history-studio")
src = (R / "output" / "captions-and-bio.txt").read_text(encoding="utf-8")
uri = lambda p: (R / p).as_uri()
esc = lambda s: html.escape(s.strip("\n"))

def section(name):
    m = re.search(r"={50}\n" + re.escape(name) + r"[^\n]*\n={50}\n(.*?)(?=\n={50}|\n#{50}|\Z)", src, re.S)
    return m.group(1).strip("\n")

bio_all = section("INSTAGRAM BIO")
bio, _, name_note = bio_all.partition("\n\nName field:")
name_field = name_note.split("\n")[0].strip()
ytdesc = section("YOUTUBE CHANNEL DESCRIPTION")
tips = [l[2:] for l in section("HOW TO USE THE CAPTIONS").split("\n") if l.startswith("- ")]

eps = []
for m in re.finditer(r"#{50}\nEPISODE (\d+) - ([^\n]+)\n#{50}\n(.*?)(?=\n#{50}|\Z)", src, re.S):
    n, title, body = int(m.group(1)), m.group(2), m.group(3)
    ig = re.search(r"INSTAGRAM:\n(.*?)\n\nYT TITLE:", body, re.S).group(1)
    ytt = re.search(r"YT TITLE:\s*(.*)", body).group(1)
    ytd = re.search(r"YT DESCRIPTION:\n(.*)", body, re.S).group(1)
    eps.append((n, title, ig, ytt, ytd))
assert eps, "no episodes found"

# Covers for Ep 1-13 are not on disk any more; read them from the backup zip if it is there.
import os, tempfile, zipfile
BACKUP_ZIP = pathlib.Path(os.environ.get("DEVLOK_BACKUP_ZIP", str(pathlib.Path.home() / "Downloads" / "rama.zip")))
TMP = pathlib.Path(tempfile.gettempdir()) / "devlok-zipcovers"
def cover(n):
    local = R / "output" / "covers" / f"cover-ep{n:02d}.png"
    if local.exists():
        return local.as_uri()
    out = TMP / f"cover-ep{n:02d}.png"
    if not out.exists() and BACKUP_ZIP.exists():
        TMP.mkdir(exist_ok=True)
        with zipfile.ZipFile(BACKUP_ZIP) as z:
            name = f"New folder/covers/cover-ep{n:02d}.png"
            if name in z.namelist():
                out.write_bytes(z.read(name))
    return out.as_uri() if out.exists() else ""

def box(label, text, cls=""):
    return f'<div class="box {cls}"><div class="lbl">{label}</div><pre>{esc(text)}</pre></div>'

ep_pages = "".join(f"""
<section class="page ep">
  <header><span class="pill">भाग {n}</span><h2>{html.escape(t)}</h2><span class="day">Ramayan Part {n}</span></header>
  <div class="row">
    <img class="cover" src="{cover(n)}" alt="">
    <div class="col">
      {box("Instagram caption", ig, "ig")}
      {box("YouTube title", ytt, "yt")}
      {box("YouTube description", ytd, "yt")}
    </div>
  </div>
</section>""" for n, t, ig, ytt, ytd in eps)

page = f"""<!doctype html><html lang="hi"><head><meta charset="utf-8"><title>Devlok Toons captions</title>
<style>
@font-face {{ font-family: Mukta; font-weight: 800; src: url("{uri('covers/assets/fonts/Mukta-ExtraBold.ttf')}"); }}
@page {{ size: A4; margin: 14mm; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: "Nirmala UI", "Segoe UI", "Segoe UI Emoji", sans-serif; color: #2a160f; font-size: 11.5pt; }}
h1, h2, .pill, .lbl, .brand {{ font-family: Mukta, "Nirmala UI", sans-serif; font-weight: 800; }}
.page {{ break-after: page; }}
.page:last-child {{ break-after: auto; }}
.hero {{ display: flex; align-items: center; gap: 18px; background: linear-gradient(135deg, #3a1408, #7a1f1f 55%, #c2561f); color: #fff3cf;
  border-radius: 16px; padding: 18px 22px; margin-bottom: 16px; }}
.hero img {{ width: 92px; height: 92px; border-radius: 50%; border: 3px solid #ffd23a; }}
h1 {{ margin: 0; font-size: 26pt; line-height: 1.05; color: #ffd23a; }}
.hero p {{ margin: 4px 0 0; font-size: 11pt; }}
.box {{ border: 1.5px solid #e2c48a; background: #fffaf0; border-radius: 12px; padding: 10px 14px 8px; margin-bottom: 10px; break-inside: avoid; }}
.box.ig {{ border-color: #d4537a; background: #fff6f8; }}
.box.yt {{ border-color: #d23a2a; background: #fff7f5; }}
.lbl {{ font-size: 9pt; letter-spacing: .08em; text-transform: uppercase; color: #a0522d; margin-bottom: 4px; }}
.ig .lbl {{ color: #b0306a; }} .yt .lbl {{ color: #b8261a; }}
pre {{ margin: 0; white-space: pre-wrap; word-break: break-word; font-family: inherit; font-size: 11.5pt; line-height: 1.55; }}
.note {{ font-size: 9.5pt; color: #7a5a3a; margin: -4px 0 10px; }}
ul.tips {{ margin: 0; padding-left: 18px; line-height: 1.5; font-size: 10.5pt; }}
ul.tips li {{ margin-bottom: 3px; }}
header {{ display: flex; align-items: center; gap: 12px; border-bottom: 3px solid #e2a72e; padding-bottom: 8px; margin-bottom: 14px; }}
header h2 {{ margin: 0; font-size: 24pt; color: #7a1f1f; }}
.pill {{ background: #c2361f; color: #fff; border: 2px solid #ffd23a; border-radius: 10px; padding: 2px 12px 0; font-size: 14pt; }}
.day {{ margin-left: auto; color: #a0522d; font-size: 10pt; }}
.row {{ display: flex; gap: 16px; align-items: flex-start; }}
.cover {{ width: 46mm; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,.25); flex: none; }}
.col {{ flex: 1; min-width: 0; }}
.foot {{ font-size: 9pt; color: #7a5a3a; margin-top: 8px; }}
</style></head><body>
<section class="page">
  <div class="hero"><img src="{uri('output/covers/profile-devlok-toons.png')}" alt="">
    <div><h1>Devlok Toons</h1><p>Post captions · Ramayan Part {eps[0][0]}–{eps[-1][0]} · copy-paste ready</p></div></div>
  {box("Instagram bio", bio)}
  <div class="note">Name field: <b>{html.escape(name_field)}</b> (Instagram search reads it)</div>
  {box("YouTube channel description", ytdesc)}
  <div class="box"><div class="lbl">How to post</div><ul class="tips">{"".join(f"<li>{html.escape(t)}</li>" for t in tips)}</ul></div>
</section>
{ep_pages}
</body></html>"""
out = R / "output" / "devlok-toons-captions.html"
out.write_text(page, encoding="utf-8")
print(out, len(eps), "episodes")
