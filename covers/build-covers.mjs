// Builds the episode thumbnails (covers/) as a HyperFrames project: one 1-second still per
// cover. The profile picture has its own builder, profile/build-profile.mjs. Then grab them with `hf snapshot` (see README).
// Usage, from the studio root:  node covers/build-covers.mjs
import fs from "node:fs";
import path from "node:path";
import { C, T } from "../ramayan/build/lib.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const BRAND = "Devlok Toons";
const SERIES = "रामायण";
export const EPISODES = [
  ["ep14", 14, "सोने का हिरण"], ["ep15", 15, "सीता हरण"], ["ep16", 16, "जटायु का बलिदान"], ["ep17", 17, "शबरी के बेर"], ["ep18", 18, "हनुमान से भेंट"], ["ep19", 19, "राम-सुग्रीव मित्रता"], ["ep20", 20, "सीता जी के गहने"],
];

const FONTS = `
  @font-face { font-family: "Mukta"; font-weight: 800; src: url("assets/fonts/Mukta-ExtraBold.ttf"); }
  @font-face { font-family: "Mukta"; font-weight: 700; src: url("assets/fonts/Mukta-Bold.ttf"); }
  @font-face { font-family: "Tiro Devanagari Hindi"; font-weight: 400; src: url("assets/fonts/TiroDevanagariHindi-Regular.ttf"); }`;

function page(w, h, total, css, body) {
  return `<!doctype html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${w}, height=${h}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${w}px; height: ${h}px; overflow: hidden; background: #000; }
      #main { position: relative; width: ${w}px; height: ${h}px; overflow: hidden; background: #000; }
      ${FONTS}
      ${css}
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="${total}" data-width="${w}" data-height="${h}">
${body}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
}

// ---------- episode covers: 1080x1920, text kept inside the 4:5 grid crop (y 285-1635) ----------
const COVER_CSS = `
  .cv { position: absolute; inset: 0; }
  .cv img { position: absolute; inset: 0; width: 1080px; height: 1920px; object-fit: cover; }
  .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,4,20,0.92) 0%, rgba(10,4,20,0.75) 26%, rgba(10,4,20,0) 48%, rgba(10,4,20,0) 74%, rgba(10,4,20,0.85) 100%); }
  .top { position: absolute; left: 0; right: 0; top: 330px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .series { font-family: "Tiro Devanagari Hindi", serif; font-size: 56px; color: #2a160f; background: linear-gradient(180deg, #ffe07a, #e2a72e);
    border: 4px solid #7a4a12; border-radius: 50px; padding: 12px 48px 4px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); }
  .num { font-family: "Mukta", sans-serif; font-weight: 800; font-size: 70px; color: #fff; background: #c2361f; border: 5px solid #ffd23a;
    border-radius: 24px; padding: 6px 34px 0; line-height: 1.15; box-shadow: 0 6px 20px rgba(0,0,0,0.5); }
  .title { font-family: "Mukta", sans-serif; font-weight: 800; font-size: 132px; line-height: 1.12; color: #ffd23a; text-align: center;
    max-width: 960px; text-wrap: balance; -webkit-text-stroke: 10px #2a0a08; paint-order: stroke fill;
    text-shadow: 0 8px 0 #2a0a08, 0 0 40px rgba(0,0,0,0.7); margin-top: 6px; }
  .brand { position: absolute; left: 0; right: 0; top: 1500px; display: flex; justify-content: center; }
  .brand span { font-family: "Mukta", sans-serif; font-weight: 800; font-size: 46px; color: #fff3cf; background: rgba(20,10,30,0.8);
    border: 3px solid #e2a72e; border-radius: 40px; padding: 8px 36px 2px; letter-spacing: 1px; }
  .brand b { color: #ffd23a; }`;

const covers = EPISODES.map(([ep, n, title], i) => `      <div id="cv-${ep}" class="cv clip" data-start="${i}" data-duration="1" data-track-index="0">
        <img src="assets/frames/${ep}.png" alt="" />
        <div class="shade"></div>
        <div class="top"><div class="series">${SERIES}</div><div class="num">भाग ${n}</div><div class="title">${title}</div></div>
        <div class="brand"><span><svg width="44" height="34" viewBox="-60 -110 120 120" style="vertical-align:-4px"><path d="M0 0 Q-34 -40 0 -110 Q34 -40 0 0 Z" fill="#fcd3dc" stroke="#b0476a" stroke-width="5"/><path d="M0 0 Q-34 -40 0 -110 Q34 -40 0 0 Z" fill="#f29bb0" stroke="#b0476a" stroke-width="5" transform="rotate(-50) scale(0.85)"/><path d="M0 0 Q-34 -40 0 -110 Q34 -40 0 0 Z" fill="#f29bb0" stroke="#b0476a" stroke-width="5" transform="rotate(50) scale(0.85)"/></svg> <b>Devlok</b> Toons</span></div>
      </div>`).join("\n");
fs.writeFileSync(path.join(ROOT, "covers", "index.html"), page(1080, 1920, EPISODES.length, COVER_CSS, covers));

console.log("covers:", EPISODES.length, "(profile picture: node profile/build-profile.mjs)");
