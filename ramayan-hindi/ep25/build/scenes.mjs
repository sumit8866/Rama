// Episode 25 (Hindi reel): the flower garland (Valmiki, Kishkindha 12-14). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, hut, cloud, rays, garland, birds } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, archer, bowReady, shoot } from "../../reel-kit.mjs";

reseed(2525);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const twin = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#bf8a3a", tail: "#bf8a3a", muzzle: "#eccb94", lower: "#6a4a3a", ...extra });
// the gajapushpi garland around a standing person's neck at (x, y, s)
const neckGarland = (id, x, y, s, hidden = true) => garland(id, x, y - 258 * s, hidden ? s * 0.3 : s * 0.9, hidden);
// grow a hidden garland into place
const popG = (k, id, t, s) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.45, { s: s * 0.9 }, "back.out(2)"); };

const dayBg = (p) => grad(`${p}-sky`, [[0, "#7aa0c8"], [1, "#f0dcb0"]]);
const duskBg = (p) => grad(`${p}-sky`, [[0, "#3a2a5a"], [0.55, "#c2561f"], [1, "#f0b06a"]]);
const rishyamuk = `<path d="M420 1450 L560 1220 L640 1090 L700 1020 L900 1010 L980 1080 L1080 1160 L1080 1450 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>`;
const gate = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.8)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>`;
const bush = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${[[-90, -40, 70], [-20, -70, 80], [60, -45, 70], [0, -10, 90]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#2f6a3a" stroke="${C.ink}" stroke-width="4"/>`).join("")}<circle cx="-40" cy="-80" r="22" fill="#3f8a4a"/><circle cx="50" cy="-60" r="18" fill="#3f8a4a"/></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const chip = (id, x, y, text) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.4)}" style="opacity:0"><rect x="-95" y="-34" width="190" height="64" rx="18" fill="#2a7a3a" stroke="${C.ink}" stroke-width="3"/><text y="12" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="36" fill="#fff">${text} ✓</text></g></g>`;
// a flowering creeper hanging from a tree
const creeper = (id, x, y) => `<g id="${id}" transform="${T(x, y)}"><path d="M0 0 Q-20 60 0 120 Q20 180 0 230" stroke="#3f7a3a" stroke-width="6" fill="none"/>${[20, 70, 120, 170, 215].map((cy, i) => `<circle cx="${i % 2 ? 8 : -8}" cy="${cy}" r="10" fill="${i % 2 ? C.saffron : C.yellow}" stroke="${C.ink}" stroke-width="1.5"/>`).join("")}</g>`;

export const SCENES = [
  // ---------- 1. hook: one flower garland decided Vali's fate ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-gl`, 0.2, 0.5, 1);
      popG(k, `${p}-g`, 0.4, 1.05);
      k.osc(`${p}-g`, 0.9, 0.5, Math.floor((dur - 1.1) / 0.5), { s: 1.02 });
      const pt = petals(p, 14, 0.3, 1.6); pt.run(k);
      k.label(`${p}-tm`, L.w(1, "माला") - 0.2, L.w(1, "भाग्य") - 0.3);
      k.label(`${p}-tb`, L.w(1, "भाग्य") - 0.2);
      return {
        defs: duskBg(p) + glowDef(`${p}-gg`),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${rishyamuk}<rect x="0" y="1440" width="${W}" height="1000" fill="#6a6a3a"/>
          <circle id="${p}-gl" cx="540" cy="1240" r="330" fill="url(#${p}-gg)" style="opacity:0"/>
          ${sugEx(`${p}-s`, 540, 1580, 1.05, { aL: -26, aR: 26 })}
          ${neckGarland(`${p}-g`, 540, 1580, 1.05)}
          ${pt.art}`,
        html: tag(`${p}-tm`, 540, 440, "फूलों की माला") + tag(`${p}-tb`, 540, 440, "बाली का भाग्य तय!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Ram explains: everything about you two was the same ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-pn`, 0.2, 0.3, 1); k.mv(`${p}-pn`, 0.2, 0.5, { s: 1 }, "back.out(1.6)");
      k.mood(`${p}-r`, 0.4, "open");
      k.mv(`${p}-r-ar`, 0.4, 0.4, -50, "back.out(1.4)");
      ["गहने", "कद", "चाल", "आवाज़"].forEach((w, i) => pop(k, `${p}-c${i}`, L.w(1, w) - 0.1));
      k.label(`${p}-ts`, L.w(1, "एक") - 0.2, L(2) - 0.15);
      // "it would have been my greatest mistake"
      const tB = L(2);
      k.op(`${p}-pn`, tB, 0.3, 0);
      k.mood(`${p}-r`, tB, "sad"); k.mv(`${p}-r-ar`, tB, 0.4, 40);
      k.mood(`${p}-s`, tB + 0.5, "smile");
      k.label(`${p}-tb`, L.w(2, "भूल") - 0.3);
      return {
        defs: dayBg(p),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${rishyamuk}<rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>${tree(60, 1450, 0.85)}
          ${lakEx(`${p}-l`, 120, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.92)}
          ${sugEx(`${p}-s`, 700, 1590, 0.84, { seated: true, mood: "sad", aL: -30, aR: 30 })}${hanEx(`${p}-h`, 920, 1580, 0.8, { aL: -26 })}
          <g transform="translate(540,1010)"><g id="${p}-pn" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-360" y="-250" width="720" height="440" rx="36" fill="rgba(20,10,30,0.82)" stroke="${C.gold}" stroke-width="6"/>
            ${twin(`${p}-ta`, -150, 40, 0.5)}<text x="0" y="-40" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="110" fill="#ffd23a">=</text>${twin(`${p}-tb2`, 150, 40, 0.5)}
            ${chip(`${p}-c0`, -255, 120, "गहने")}${chip(`${p}-c1`, -85, 120, "कद")}${chip(`${p}-c2`, 85, 120, "चाल")}${chip(`${p}-c3`, 255, 120, "आवाज़")}</g></g>`,
        html: tag(`${p}-ts`, 540, 440, "सब एक जैसा!", "red") + tag(`${p}-tb`, 540, 440, "\"मेरी सबसे बड़ी भूल होती\""),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Lakshman puts the gajapushpi creeper on Sugriva; he shines like an evening cloud ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-l`, 0.2, 1.0, 230, 0.4);
      k.mv(`${p}-l-ar`, 1.0, 0.3, -150);
      k.op(`${p}-cr`, 1.3, 0.2, 0);
      k.walk(`${p}-l`, 1.4, L.w(1, "गले") - 0.4, 500, 0.4);
      k.mv(`${p}-l-ar`, L.w(1, "गले") - 0.4, 0.3, -70);
      popG(k, `${p}-g`, L.w(1, "गले") - 0.1, 0.95);
      k.mood(`${p}-s`, L.w(1, "गले"), "smile");
      k.label(`${p}-tg`, L.w(1, "गजपुष्पी") - 0.2, L(2) - 0.15);
      // dusk: the cloud and the cranes
      const tD = L(2);
      k.op(`${p}-dusk`, tD, 0.8, 1);
      k.op(`${p}-gl`, tD + 0.3, 0.6, 1);
      k.mv(`${p}-bd`, tD, dur - tD, { dx: -300 }, "none");
      k.op(`${p}-bd`, tD + 0.4, 0.4, 1);
      k.label(`${p}-tc`, L.w(2, "सांझ") - 0.2);
      return {
        defs: dayBg(p) + grad(`${p}-dk`, [[0, "#3a2a5a"], [0.55, "#c2561f"], [1, "#f0b06a"]]) + glowDef(`${p}-gg`),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <rect id="${p}-dusk" width="${W}" height="2400" fill="url(#${p}-dk)" style="opacity:0"/>
          <g transform="translate(700,820)">${cloud(0, 0, 2.2, "#f6c8a8", 0.9)}</g>
          <g id="${p}-bd" transform="${T(0, 0)}" style="opacity:0">${birds(`${p}-b`, 640, 780, 6)}</g>
          ${rishyamuk}<rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>
          ${tree(150, 1450, 0.95)}${creeper(`${p}-cr`, 200, 1180)}
          <circle id="${p}-gl" cx="700" cy="1260" r="300" fill="url(#${p}-gg)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 60, 1580, 0.84)}
          ${sugEx(`${p}-s`, 700, 1580, 0.95, { aL: -26, aR: 26 })}
          ${neckGarland(`${p}-g`, 700, 1580, 0.95)}`,
        html: tag(`${p}-tg`, 540, 440, "गजपुष्पी की माला") + tag(`${p}-tc`, 540, 440, "सांझ के बादल जैसे!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the Saptajana ashram on the way; everyone bows ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-hl`, 0.3, 0.6, 1);
      for (let i = 0; i < 7; i++) { const t = L.w(2, "सात") - 0.3 + i * 0.12; k.op(`${p}-o${i}`, t, 0.3, 1); k.mv(`${p}-o${i}`, t, 2.0, { dy: -200 }, "power1.out"); }
      k.label(`${p}-ta`, L.w(1, "सप्तजन") - 0.2, L(2) - 0.15);
      const tB = L.w(2, "प्रणाम") - 0.5;
      for (const c of ["r", "l", "s", "h"]) { k.mv(`${p}-${c}-al`, tB, 0.4, -26); k.mv(`${p}-${c}-ar`, tB + 0.05, 0.4, 26); k.mv(`${p}-${c}-h`, tB + 0.2, 0.4, 8); }
      k.label(`${p}-tp`, tB + 0.1);
      return {
        defs: grad(`${p}-sky`, [[0, "#8ab0d8"], [1, "#f6ecc8"]]) + glowDef(`${p}-ag`, "#fff0b0"),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <circle id="${p}-hl" cx="540" cy="1180" r="380" fill="url(#${p}-ag)" style="opacity:0"/>
          ${tree(80, 1450, 0.8)}${tree(1000, 1450, 0.8)}
          <rect x="0" y="1440" width="${W}" height="1000" fill="#8a9a5a"/>${hut(420, 1440, 0.55)}${hut(660, 1440, 0.6)}
          <rect x="300" y="1440" width="480" height="40" rx="18" fill="#6ab0d8" opacity="0.7"/>
          ${Array.from({ length: 7 }, (_, i) => `<g id="${p}-o${i}" transform="${T(330 + i * 70, 1120 - (i % 2) * 40)}" style="opacity:0"><circle r="22" fill="#fff6d8" opacity="0.9"/><circle r="12" fill="#fffbe8"/></g>`).join("")}
          ${lakEx(`${p}-l`, 110, 1580, 0.8)}${ramEx(`${p}-r`, 300, 1580, 0.88)}
          ${sugEx(`${p}-s`, 760, 1580, 0.85)}${neckGarland(`${p}-g`, 760, 1580, 0.85, false)}${hanEx(`${p}-h`, 950, 1580, 0.78, { propR: "" })}`,
        html: tag(`${p}-ta`, 540, 440, "सप्तजन आश्रम") + tag(`${p}-tp`, 540, 440, "सात ऋषियों को प्रणाम"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. the second challenge at Kishkindha; this time the garland marks Sugriva ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      const tR = L.w(1, "गर्जना") - 0.3;
      k.mood(`${p}-s`, tR, "open");
      k.mv(`${p}-s-al`, tR, 0.3, 150); k.mv(`${p}-s-ar`, tR, 0.3, -150);
      for (let i = 0; i < 3; i++) { const t = tR + i * 0.35; k.op(`${p}-rg${i}`, t, 0.05, 0.9); k.mv(`${p}-rg${i}`, t, 0.6, { s: 3 }, "power1.out"); k.op(`${p}-rg${i}`, t + 0.4, 0.2, 0); }
      shake(k, p, tR, 6, 8);
      k.label(`${p}-tr`, tR + 0.1, L(2) - 0.15);
      // Ram is ready; the garland marks Sugriva
      shoot(k, `${p}-r`, L(2), L(2) + 0.4, 0.8, null);
      k.op(`${p}-gl`, L.w(2, "माला") - 0.3, 0.3, 1);
      pop(k, `${p}-ok`, L.w(2, "माला"));
      k.mood(`${p}-r`, L.w(2, "माला"), "smile");
      k.label(`${p}-tm`, L.w(2, "माला") - 0.2);
      return {
        defs: dayBg(p) + glowDef(`${p}-gg`),
        art: `${gate(p)}${tree(70, 1450, 0.95)}${tree(300, 1440, 0.8)}
          <circle id="${p}-gl" cx="740" cy="1290" r="200" fill="url(#${p}-gg)" style="opacity:0"/>
          ${sugEx(`${p}-s`, 740, 1580, 0.9)}${neckGarland(`${p}-g`, 740, 1580, 0.9, false)}
          ${[0, 1, 2].map((i) => `<g transform="translate(740,1290)"><g id="${p}-rg${i}" transform="${T(0, 0, 0, 1)}" style="opacity:0"><circle r="60" fill="none" stroke="#fff3c4" stroke-width="7"/></g></g>`).join("")}
          <g id="${p}-ok" transform="${T(860, 1150, 0, 0.4)}" style="opacity:0"><circle r="34" fill="#2a7a3a" stroke="${C.ink}" stroke-width="3"/><text y="16" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="48" fill="#fff">✓</text></g>
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-tr`, 540, 440, "दूसरी ललकार!", "red") + tag(`${p}-tm`, 540, 440, "माला से पहचान साफ़!"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: Tara's warning; Jai Shri Ram ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-next`, L(1) - 0.2, 0.3, 1);
      k.mv(`${p}-next`, L(1) - 0.2, 0.5, { s: 0.9 }, "back.out(1.8)");
      k.op(`${p}-next`, L(2) - 0.25, 0.25, 0);
      k.hx(`${p}-chip`, L(2) - 0.3, 0.3, { opacity: 0 });
      k.op(`${p}-hw`, L(2) - 0.2, 0.3, 1);
      k.mv(`${p}-hw`, L(2) - 0.2, 0.5, { y: 0 }, "back.out(1.5)");
      k.mv(`${p}-hr-ar`, L(2), 0.4, -150, "back.out(1.6)");
      k.mv(`${p}-rays`, 0, dur, 40, "none");
      k.label(`${p}-jsr`, L(2) - 0.1);
      const pt = petals(p, 18, L(2) - 0.3, 1.4);
      pt.run(k);
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${vali(`${p}-nv`, -110, 120, 0.6, { mood: "open" })}
            ${tara(`${p}-nt`, 130, 120, 0.58, { aL: 80, mood: "sad" })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 26: तारा की चेतावनी</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}${neckGarland(`${p}-hg`, 890, 1460, 0.82, false)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
