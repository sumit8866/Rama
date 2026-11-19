// Builds a vertical (1080x1920) Hindi reel from <episode>/build/{narration.json,scenes.mjs}.
// Usage, from inside an episode folder (e.g. ramayan-hindi\ep01):  node ..\build-vertical.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const EP = process.cwd();
const W = 1080, H = 1920;
const LEAD = 0.35, TAIL = 0.5;
const narr = JSON.parse(fs.readFileSync(path.join(EP, "build/narration.json"), "utf8"));
const durs = JSON.parse(fs.readFileSync(path.join(EP, "assets/vo/lines.json"), "utf8"));
const { SCENES } = await import(pathToFileURL(path.join(EP, "build/scenes.mjs")).href);
const RIG = fs.readFileSync(path.resolve(EP, "../../ramayan/build/rig.js"), "utf8");
const GAP = narr.gap ?? 0.2;
// NOCAPS=1 builds a clean version (no subtitles, title chips or tags) for grabbing thumbnail frames
const NOCAPS = !!process.env.NOCAPS;

const FONTS = `
  @font-face { font-family: "Mukta"; font-weight: 800; src: url("assets/fonts/Mukta-ExtraBold.ttf"); }
  @font-face { font-family: "Mukta"; font-weight: 700; src: url("assets/fonts/Mukta-Bold.ttf"); }
  @font-face { font-family: "Tiro Devanagari Hindi"; font-weight: 400; src: url("assets/fonts/TiroDevanagariHindi-Regular.ttf"); }`;

const CSS = `${FONTS}
  #root { position: absolute; inset: 0; overflow: hidden; background: #0c0816; }
  .cam { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; transform-origin: ${W / 2}px ${H / 2}px; }
  .cam svg { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; }
  .fade, .flash { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; }
  .fade { background: #000; } .flash { background: #fff7dc; }
  .lw { position: absolute; transform: translateX(-50%); }
  .chip { font-family: "Tiro Devanagari Hindi", serif; font-size: 50px; line-height: 1.25; color: #fff3cf;
    background: rgba(20, 10, 30, 0.72); border: 3px solid #e2a72e; border-radius: 40px; padding: 10px 40px 6px;
    white-space: nowrap; box-shadow: 0 6px 24px rgba(0,0,0,0.35); }
  .tag { font-family: "Mukta", sans-serif; font-weight: 800; font-size: 46px; color: #2a160f; background: #f7d77a;
    border: 3px solid #7a4a12; border-radius: 14px; padding: 4px 22px 0; white-space: nowrap; }
  .tag.red { background: #c2361f; color: #fff3cf; }${NOCAPS ? " .tag, .chip, .big { display: none !important; }" : ""}
  .big { font-family: "Tiro Devanagari Hindi", serif; font-size: 150px; line-height: 1.2; color: #f7d77a; white-space: nowrap;
    text-shadow: 0 6px 0 #3a1408, 0 0 30px rgba(0,0,0,0.6); text-align: center; }
  .big small { display: block; font-size: 60px; color: #fff3cf; }`;

let t = 0;
const hosts = [], audio = [], caps = [];
for (const sc of SCENES) {
  const nd = narr.scenes.find((s) => s.id === sc.id);
  const lines = nd ? nd.lines : [];
  // line timing inside the scene
  const starts = [];
  let u = LEAD + (sc.pre || 0);
  lines.forEach((_, i) => { starts.push(u); u += durs[`${sc.id}_${i + 1}`] + GAP; });
  const voiceEnd = lines.length ? u - GAP : LEAD;
  const dur = +(sc.fixed ?? voiceEnd + TAIL + (sc.extra || 0)).toFixed(3);
  const Lf = (i) => +starts[i - 1].toFixed(3);
  Lf.end = (i) => +(starts[i - 1] + durs[`${sc.id}_${i}`]).toFixed(3);
  // rough time a word is spoken: its position in the line's characters
  Lf.w = (i, word) => {
    const text = lines[i - 1].replace(/\*/g, "");
    const k = text.indexOf(word);
    if (k < 0) throw new Error(`${sc.id}: "${word}" not in line ${i}: ${text}`);
    return +(starts[i - 1] + (k / text.length) * durs[`${sc.id}_${i}`]).toFixed(3);
  };
  Lf.last = +voiceEnd.toFixed(3);

  const out = sc.build({ id: sc.id, dur, L: Lf, title: nd?.title || "" });
  const chip = nd?.title && !sc.noChip ? `<div class="lw" style="left:${W / 2}px;top:300px"><div id="${sc.id}-chip" class="chip" style="opacity:0">${nd.title}</div></div>` : "";
  const chipJs = chip ? `hx("${sc.id}-chip", 0.15, 0.4, { opacity: 1, y: 0 }, "back.out(1.6)");` : "";
  fs.writeFileSync(path.join(EP, "compositions", `${sc.id}.html`), `<template>
  <style>${CSS}${out.css || ""}</style>
  <div id="root" data-composition-id="${sc.id}" data-width="${W}" data-height="${H}">
    <div id="${sc.id}-cam" class="cam">
      <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><defs>${out.defs || ""}</defs><g transform="translate(0,${-(sc.shift ?? 230)})">${out.art}</g></svg>
    </div>
    ${out.html || ""}${chip}
    <div id="${sc.id}-flash" class="flash" style="opacity:0"></div>
    <div id="${sc.id}-fade" class="fade" style="opacity:1"></div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      ${RIG}
      const DUR = ${dur};
      op("${sc.id}-fade", 0, 0.3, 0);
      ${chip ? `HX["${sc.id}-chip"] = { x: 0, y: -20, scale: 1, opacity: 0 };` : ""}
      ${chipJs}
      ${out.js}
      op("${sc.id}-fade", DUR - 0.28, 0.25, 1);
      window.__timelines["${sc.id}"] = tl;
    })();
  </script>
</template>
`);
  hosts.push(`      <div id="${sc.id}" data-composition-id="${sc.id}" data-composition-src="compositions/${sc.id}.html" data-start="${t.toFixed(3)}" data-duration="${dur}" data-track-index="0" data-track-kind="graphics" data-width="${W}" data-height="${H}" style="z-index:1"></div>`);
  lines.forEach((line, i) => {
    const key = `${sc.id}_${i + 1}`;
    const st = (t + starts[i]).toFixed(3);
    audio.push(`      <audio id="vo-${key}" src="assets/vo/${key}.wav" data-start="${st}" data-duration="${durs[key]}" data-volume="1" data-track-index="2"></audio>`);
    const next = i + 1 < lines.length ? t + starts[i + 1] : t + dur - 0.3;
    caps.push({ key, start: +st, dur: +(next - +st).toFixed(3), html: line.replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>') });
  });
  console.log(`${sc.id}  start ${t.toFixed(2)}  dur ${dur}`);
  t += dur;
}
const total = +t.toFixed(3);

fs.writeFileSync(path.join(EP, "compositions", "captions.html"), `<template>
  <style>${FONTS}
    #root { position: absolute; inset: 0; pointer-events: none; }
    .cw { position: absolute; left: 70px; width: 820px; top: 1352px; height: 190px; display: flex; align-items: center; justify-content: center; }
    .cap { font-family: "Mukta", sans-serif; font-weight: 800; font-size: 54px; line-height: 1.3; color: #ffffff; text-align: center;
      background: rgba(12, 6, 20, 0.66); border-radius: 26px; padding: 14px 28px 6px; max-width: 820px; text-wrap: balance;
      text-shadow: 0 3px 0 #000, 0 0 12px rgba(0,0,0,0.6); }
    .hl { color: #ffd23a; }
  </style>
  <div id="root" data-composition-id="captions" data-width="${W}" data-height="${H}">
${caps.map((c) => `    <div id="cw-${c.key}" class="cw clip" data-start="${c.start}" data-duration="${c.dur}"><div id="cap-${c.key}" class="cap">${c.html}</div></div>`).join("\n")}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
${caps.map((c) => `      tl.fromTo("#cap-${c.key}", { opacity: 0, scale: 0.86, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "back.out(2)" }, ${c.start});`).join("\n")}
      window.__timelines["captions"] = tl;
    })();
  </script>
</template>
`);

fs.writeFileSync(path.join(EP, "index.html"), `<!doctype html>
<html lang="hi" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: #000; }
      #main { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: #000; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="${total}" data-width="${W}" data-height="${H}">
${hosts.join("\n")}
${NOCAPS ? "" : `      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="${total}" data-track-index="1" data-track-kind="captions" data-width="${W}" data-height="${H}" style="z-index:5"></div>`}
${audio.join("\n")}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`);
console.log(`total ${total}s`);
