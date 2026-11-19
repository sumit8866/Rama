// Builds the episode thumbnails (covers/) and the profile picture (profile/) as HyperFrames
// projects: one 1-second still per image. Then grab them with `hf snapshot` (see README).
// Usage, from the studio root:  node covers/build-covers.mjs
import fs from "node:fs";
import path from "node:path";
import { C, T, lotus, rays } from "../ramayan/build/lib.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const BRAND = "Devlok Toons";
const SERIES = "रामायण";
export const EPISODES = [
  ["ep14", 14, "सोने का हिरण"], ["ep15", 15, "सीता हरण"], ["ep16", 16, "जटायु का बलिदान"],
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

// ---------- profile picture: 1080x1080, everything inside the centre circle ----------
const PROFILE_CSS = `
  .pf { position: absolute; inset: 0; }
  .pf svg { position: absolute; inset: 0; }
  .name { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "Mukta", sans-serif; font-weight: 800; font-size: 170px; line-height: 1.1;
    color: #ffd23a; -webkit-text-stroke: 10px #3a1408; paint-order: stroke fill; text-shadow: 0 7px 0 #3a1408, 0 0 30px rgba(0,0,0,0.5); }
  .sub { position: absolute; left: 0; right: 0; top: 818px; text-align: center; font-family: "Mukta", sans-serif; font-weight: 800; font-size: 66px;
    letter-spacing: 14px; color: #fff3cf; text-shadow: 0 4px 0 #3a1408; }`;
const profileSvg = `<svg viewBox="0 0 1080 1080" width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#ffb347"/><stop offset="0.45" stop-color="#c2361f"/><stop offset="1" stop-color="#2a0a3a"/></radialGradient>
    <radialGradient id="gl"><stop offset="0" stop-color="#fff4c8" stop-opacity="0.95"/><stop offset="0.5" stop-color="#f7d77a" stop-opacity="0.45"/><stop offset="1" stop-color="#f7d77a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  ${rays("pr", 540, 430, 900, 24, "#ffe08a", 0.22)}
  <circle cx="540" cy="430" r="330" fill="url(#gl)"/>
  <circle cx="540" cy="540" r="520" fill="none" stroke="#ffd23a" stroke-width="14" opacity="0.9"/>
  <g transform="translate(540,505) scale(2.05)">${lotus(0, 0, 1)}</g>
</svg>`;
const profile = `      <div id="pf" class="pf clip" data-start="0" data-duration="1" data-track-index="0">
        ${profileSvg}
        <div class="name">देवलोक</div>
        <div class="sub">TOONS</div>
      </div>`;
fs.writeFileSync(path.join(ROOT, "profile", "index.html"), page(1080, 1080, 1, PROFILE_CSS, profile));
console.log("covers:", EPISODES.length, "| profile: 1");
