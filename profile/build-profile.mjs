// The Devlok Toons profile picture (1080x1080): Vishnu, Ram and Brahma at sunset, a saffron Om flag,
// a glowing scripture, and "DEVLOK TOONS" in big gold letters inside a gold ring.
// Usage, from the studio root:  node profile/build-profile.mjs   then from profile\: ..\hf.cmd snapshot --at 0.5
import fs from "node:fs";
import path from "node:path";
import { C, CAST, rays } from "../ramayan/build/lib.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const HS = 1.4;
// place a figure so its face is centred near (x, faceY)
const at = (faceY, s) => faceY + 318 * s;

const defs = `
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0e1a4a"/><stop offset="0.38" stop-color="#3a2a6a"/><stop offset="0.62" stop-color="#c2561f"/><stop offset="0.78" stop-color="#ffb347"/><stop offset="1" stop-color="#6a2a1a"/>
  </linearGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#fff4c8" stop-opacity="0.95"/><stop offset="0.45" stop-color="#ffd27a" stop-opacity="0.55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
  <radialGradient id="sunG"><stop offset="0" stop-color="#fff6c4"/><stop offset="0.5" stop-color="#ffcf6a" stop-opacity="0.8"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fffbd0"/><stop offset="0.35" stop-color="#ffd23a"/><stop offset="0.7" stop-color="#ff9a1f"/><stop offset="1" stop-color="#e8561f"/>
  </linearGradient>
  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset="0.5" stop-color="#d89a2a"/><stop offset="1" stop-color="#fff0a0"/></linearGradient>
  <radialGradient id="bookG"><stop offset="0" stop-color="#fff6c4" stop-opacity="0.95"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#1a0408" flood-opacity="0.85"/></filter>
  <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0a14" stop-opacity="0"/><stop offset="0.45" stop-color="#1a0a14" stop-opacity="0.45"/><stop offset="1" stop-color="#1a0a14" stop-opacity="0"/></linearGradient>
  <clipPath id="disc"><circle cx="540" cy="540" r="512"/></clipPath>`;

const gods = `
  <g opacity="0.9">
    ${CAST.vishnu("pv", 255, at(330, 1.05), 1.05, { hs: HS })}
    ${CAST.brahma("pb", 825, at(335, 1.0), 1.0, { hs: HS, aL: -26, aR: 26 })}
  </g>
  <circle cx="540" cy="270" r="230" fill="url(#halo)"/>
  ${CAST.ram("pr", 540, at(265, 1.45), 1.45, { hs: HS, back: null, aL: -26, aR: 26 })}
  <rect x="0" y="470" width="1080" height="360" fill="url(#veil)"/>`;

const flag = `<g transform="translate(900,300)">
  <path d="M0 0 L0 330" stroke="#5a3a1a" stroke-width="10" stroke-linecap="round"/><circle r="12" fill="#ffd23a" stroke="${C.ink}" stroke-width="3"/>
  <path d="M6 14 Q90 30 150 70 Q90 96 6 116 Z" fill="#ff7a1a" stroke="#a83a10" stroke-width="5"/>
  <text x="62" y="86" text-anchor="middle" font-family="Tiro Devanagari Hindi" font-size="56" fill="#fff3cf">ॐ</text></g>`;

const land = `
  <circle cx="540" cy="840" r="150" fill="url(#sunG)"/>
  <path d="M0 860 L120 790 L230 840 L360 760 L470 830 L560 790 L690 845 L810 770 L930 830 L1080 790 L1080 1080 L0 1080 Z" fill="#3a1a2a"/>
  <path d="M0 930 Q270 900 540 935 Q810 970 1080 925 L1080 1080 L0 1080 Z" fill="#2a3a5a"/>
  <path d="M380 950 Q540 940 700 955" stroke="#ffcf6a" stroke-width="6" opacity="0.6" fill="none"/>
  <circle cx="540" cy="960" r="150" fill="url(#bookG)"/>
  <g transform="translate(540,975)">
    <path d="M0 -10 Q-80 -40 -170 -20 L-170 40 Q-80 20 0 50 Z" fill="#fbf1e2" stroke="#7a4a12" stroke-width="5"/>
    <path d="M0 -10 Q80 -40 170 -20 L170 40 Q80 20 0 50 Z" fill="#f3e3c3" stroke="#7a4a12" stroke-width="5"/>
    <path d="M-140 0 L-30 10 M-140 18 L-30 28 M30 10 L140 0 M30 28 L140 18" stroke="#c98a2a" stroke-width="4"/>
  </g>`;

const title = `<g filter="url(#shadow)">
  <text x="540" y="660" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="215" fill="url(#gold)" stroke="#3a0a08" stroke-width="16" paint-order="stroke" letter-spacing="6">DEVLOK</text>
  <text x="552" y="800" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="128" fill="url(#gold)" stroke="#3a0a08" stroke-width="12" paint-order="stroke" letter-spacing="24">TOONS</text>
</g>`;

const art = `<svg viewBox="0 0 1080 1080" width="1080" height="1080" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs>
  <rect width="1080" height="1080" fill="#1a0a14"/>
  <g clip-path="url(#disc)">
    <rect width="1080" height="1080" fill="url(#sky)"/>
    ${rays("prr", 540, 300, 900, 28, "#ffe08a", 0.12)}
    ${gods}
    ${flag}
    ${land}
    ${title}
  </g>
  <circle cx="540" cy="540" r="518" fill="none" stroke="url(#ring)" stroke-width="22"/>
  <circle cx="540" cy="540" r="500" fill="none" stroke="#7a4a12" stroke-width="4" opacity="0.7"/>
</svg>`;

fs.writeFileSync(path.join(ROOT, "profile", "index.html"), `<!doctype html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1080px; overflow: hidden; background: #000; }
      #main { position: relative; width: 1080px; height: 1080px; overflow: hidden; background: #000; }
      .pf { position: absolute; inset: 0; }
      @font-face { font-family: "Mukta"; font-weight: 800; src: url("assets/fonts/Mukta-ExtraBold.ttf"); }
      @font-face { font-family: "Tiro Devanagari Hindi"; font-weight: 400; src: url("assets/fonts/TiroDevanagariHindi-Regular.ttf"); }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="1" data-width="1080" data-height="1080">
      <div id="pf" class="pf clip" data-start="0" data-duration="1" data-track-index="0">${art}</div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`);
console.log("profile built");
