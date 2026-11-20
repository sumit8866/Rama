// Episode 17 (Hindi reel): Shabari's berries. Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, hut, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, darkTree } from "../../reel-kit.mjs";

reseed(1717);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
// Shabari: a Bhil woman in a plain brown sari; her hair turns white over the years
const shabari = (id, x, y, s, old = true, extra = {}) =>
  CAST.bride(id, x, y, s, "#8a5a3a", { hs: HS, hat: "none", upper: "#6a4a3a", border: "#d8b25e", skin: "#b07a4a", hair: old ? "#e4e1da" : "#1b1209", ...extra });
const matang = (id, x, y, s, extra = {}) => CAST.vasishtha(id, x, y, s, { hs: HS, ...extra });

const BERRY = (r = 11) => `<circle r="${r}" fill="#c2361f" stroke="${C.ink}" stroke-width="2.5"/><circle cx="${-r * 0.35}" cy="${-r * 0.35}" r="${r * 0.3}" fill="#ff8a7a"/><path d="M0 ${-r} L4 ${-r - 7}" stroke="#3f7a3a" stroke-width="3"/>`;
const handBerry = (id, hidden = false) => `<g id="${id}" transform="translate(2,142)"${hidden ? ' style="opacity:0"' : ""}>${BERRY()}</g>`;
const flyBerry = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0">${BERRY(12)}</g>`;
const BROOM = `<path d="M2 120 L2 236" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><path d="M2 120 L2 236" stroke="#8a5a2b" stroke-width="5"/><path d="M-12 226 L16 226 L30 286 L-26 286 Z" fill="#d8b25e" stroke="${C.ink}" stroke-width="3"/>`;
const basket = (x, y, s = 1.3) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60 0 L60 0 L46 50 L-46 50 Z" fill="#a8742a" stroke="${C.ink}" stroke-width="3"/><path d="M-52 18 L52 18 M-48 34 L48 34" stroke="#7a4a1a" stroke-width="2"/>${[[-30, -6], [-6, -10], [18, -6], [40, -2], [-18, -18], [8, -22]].map(([a, b]) => `<g transform="translate(${a},${b})">${BERRY(10)}</g>`).join("")}</g>`;
const flower = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.2)}" style="opacity:0">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-11" rx="7" ry="11" fill="#f7b7c6" stroke="#b0476a" stroke-width="1.5" transform="rotate(${r})"/>`).join("")}<circle r="6" fill="${C.yellow}"/></g>`;
const heart = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.5)}" style="opacity:0"><path d="M0 14 C-30 -6 -18 -30 0 -16 C18 -30 30 -6 0 14 Z" fill="#e8456a" stroke="${C.ink}" stroke-width="2"/></g>`;
const mark = (id, x, y, ch, col) => `<g id="${id}" transform="${T(x, y, 0, 0.4)}" style="opacity:0"><circle r="30" fill="${col}" stroke="${C.ink}" stroke-width="3"/><text y="14" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="42" fill="#fff">${ch}</text></g>`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
// a drop that falls from (x,y) n times
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
// Hanuman for the teaser: a chibi with a monkey muzzle, a tail and a mace on his shoulder
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanuman = (id, x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M40 -60 Q150 -60 150 -200 Q150 -280 100 -300" fill="none" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/><path d="M40 -60 Q150 -60 150 -200 Q150 -280 100 -300" fill="none" stroke="#d9702a" stroke-width="13" stroke-linecap="round"/>
  ${CAST.messenger(id, 0, 0, 1, { hs: HS, skin: "#d9702a", lower: "#c2361f", upper: null, sash: C.gold, hat: "royal", hair: "#7a3a1a", tilak: true, propR: GADA, aR: 30 })}
  <ellipse cx="0" cy="${-262 - 26 * HS}" rx="${23 * HS}" ry="${16 * HS}" fill="#f3c58a" stroke="${C.ink}" stroke-width="3"/>
  <path d="M-14 ${-262 - 22 * HS} Q0 ${-262 - 12 * HS} 14 ${-262 - 22 * HS}" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;

const forestDusk = (p) => grad(`${p}-sky`, [[0, "#3a2a5a"], [0.55, "#c2561f"], [1, "#f0b06a"]]);
const ground = (y = 1430, c = "#6a6a3a") => `<rect x="0" y="${y}" width="${W}" height="1100" fill="${c}"/>`;

export const SCENES = [
  // ---------- 1. hook: an old Bhil woman feeds Ram tasted berries ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-glow`, 0.1, 0.6, 1);
      k.mv(`${p}-s-al`, 0.3, 0.6, 70, "back.out(1.4)");
      k.label(`${p}-ts`, 0.4, L.w(1, "भगवान") - 0.2);
      k.label(`${p}-tr`, L.w(1, "भगवान"), L.w(1, "जूठे") - 0.25);
      // the berry leaves her hand and reaches Ram
      const tB = L.w(1, "जूठे") - 0.2;
      k.op(`${p}-hb`, tB, 0.05, 0);
      k.op(`${p}-bf`, tB, 0.05, 1);
      k.mv(`${p}-bf`, tB, 0.7, { x: 360, y: 1312, s: 0.7 }, "power2.inOut");
      k.op(`${p}-bf`, tB + 0.68, 0.08, 0);
      k.mood(`${p}-r`, tB + 0.6, "open");
      k.mood(`${p}-r`, tB + 1.0, "smile");
      k.mood(`${p}-l`, tB + 0.3, "open");
      k.label(`${p}-tb`, tB + 0.2);
      k.mv(`${p}-s-al`, tB + 0.6, 0.5, -26);
      k.mv(`${p}-s-ar`, tB + 0.6, 0.5, 26);
      const sk = sparkles(p, 8, 360, 1250, 220);
      sk.run(k, tB + 0.8, 1.4);
      return {
        defs: forestDusk(p) + glowDef(`${p}-gl`),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${[40, 1040].map((x, i) => darkTree(x, 1460, 0.95 + i * 0.1, "#2a3a2a")).join("")}
          ${ground()}${hut(880, 1450, 0.85)}
          <circle id="${p}-glow" cx="360" cy="1300" r="260" fill="url(#${p}-gl)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.95)}
          ${shabari(`${p}-s`, 740, 1580, 0.9, true, { propL: handBerry(`${p}-hb`) })}
          ${basket(860, 1520, 0.9)}
          ${flyBerry(`${p}-bf`, 581, 1400)}
          ${sk.art}`,
        html: tag(`${p}-ts`, 740, 560, "शबरी") + tag(`${p}-tr`, 360, 560, "भगवान राम") + tag(`${p}-tb`, 540, 440, "जूठे बेर?!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. flashback: young Shabari at Matang Rishi's ashram ----------
  {
    id: "s02",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.osc(`${p}-y-ar`, 0.3, 0.35, Math.floor((L(2) - 0.6) / 0.35), 24);
      k.label(`${p}-tm`, L.w(1, "मतंग") - 0.1, L(2) - 0.15);
      // the guru's promise
      const tP = L(2);
      k.op(`${p}-brm`, tP, 0.2, 0);
      k.mv(`${p}-y-al`, tP, 0.4, -26); k.mv(`${p}-y-ar`, tP + 0.05, 0.4, 26);
      k.mv(`${p}-m-ar`, tP, 0.5, -140, "back.out(1.4)");
      k.mood(`${p}-m`, tP, "open");
      k.mood(`${p}-m`, tP + 1.4, "smile");
      const tR = L.w(2, "राम") - 0.3;
      for (let i = 0; i < 3; i++) k.op(`${p}-dot${i}`, tR - 0.4 + i * 0.12, 0.15, 1);
      k.op(`${p}-vis`, tR, 0.3, 1);
      k.mv(`${p}-vis`, tR, 0.5, { s: 1 }, "back.out(1.8)");
      k.mood(`${p}-y`, tR + 0.3, "open");
      k.label(`${p}-tv`, tR + 0.1);
      return {
        defs: grad(`${p}-sky`, [[0, "#7aa0b8"], [1, "#f0dca0"]]) + rgrad(`${p}-vg`, [[0, "#fff6d8", 0.95], [1, "#fff6d8", 0.75]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${tree(140, 1440, 1.1)}${tree(980, 1430, 0.9)}
          ${ground(1430, "#8a9a5a")}${hut(780, 1430, 0.75)}
          ${matang(`${p}-m`, 300, 1580, 1.0, { seated: true, aL: -30, aR: 30 })}
          ${shabari(`${p}-y`, 760, 1580, 0.82, false, { propR: `<g id="${p}-brm">${BROOM}</g>` })}
          ${[0, 1, 2].map((i) => `<circle id="${p}-dot${i}" cx="${360 + i * 50}" cy="${1210 - i * 60}" r="${10 + i * 6}" fill="#fff6d8" stroke="${C.ink}" stroke-width="2" style="opacity:0"/>`).join("")}
          <g transform="translate(600,1000)"><g id="${p}-vis" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <ellipse rx="190" ry="140" fill="url(#${p}-vg)" stroke="${C.ink}" stroke-width="4"/>
            ${CAST.ram(`${p}-vr`, 0, 100, 0.42, { hs: HS, back: null, aL: -26, aR: 26 })}</g></g>
          <rect width="${W}" height="2400" fill="#a8742a" opacity="0.22" style="mix-blend-mode:multiply"/>`,
        html: tag(`${p}-tm`, 300, 560, "मतंग ऋषि") + tag(`${p}-tv`, 540, 440, "\"राम आएँगे!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. years of waiting: the swept path, flowers, white hair ----------
  {
    id: "s03",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      // she sweeps the path and lays flowers
      k.walk(`${p}-y`, 0.3, L.end(1), 560, 0.5);
      k.osc(`${p}-y-ar`, 0.3, 0.3, Math.floor((L.end(1) - 0.3) / 0.3), 24);
      const fl = [[860, 1610], [780, 1560], [690, 1600], [600, 1570], [510, 1610], [420, 1570], [330, 1600], [240, 1565]];
      fl.forEach((_, i) => { const t = L.w(1, "फूल") - 0.4 + i * 0.16; k.op(`${p}-f${i}`, t, 0.15, 1); k.mv(`${p}-f${i}`, t, 0.35, { s: 1 }, "back.out(2)"); });
      k.label(`${p}-tw`, L.w(1, "रोज़") - 0.1, L(2) - 0.15);
      // the years pass: day, night, day...
      const tY = L(2);
      for (let i = 0; i < 3; i++) { const t = tY + i * 0.8; k.op(`${p}-night`, t, 0.35, 0.7); k.op(`${p}-night`, t + 0.4, 0.35, 0); }
      const tW = L.w(2, "सफ़ेद") - 0.4;
      k.op(`${p}-y`, tW, 0.5, 0);
      k.op(`${p}-o`, tW, 0.5, 1);
      k.label(`${p}-th`, tW + 0.1, dur - 0.9);
      k.mv(`${p}-o-al`, L.w(2, "भरोसा") - 0.2, 0.4, -26); k.mv(`${p}-o-ar`, L.w(2, "भरोसा") - 0.15, 0.4, 26);
      k.mv(`${p}-o-h`, L.w(2, "भरोसा"), 0.6, -6);
      return {
        defs: grad(`${p}-sky`, [[0, "#8ab0c8"], [1, "#f3e0b0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${[60, 1010].map((x, i) => tree(x, 1450, 0.85 + i * 0.1)).join("")}
          ${ground(1440, "#8a9a5a")}${hut(900, 1450, 0.7)}
          <path d="M1000 1600 Q600 1560 0 1600" stroke="#d8c08a" stroke-width="70" fill="none" opacity="0.7"/>
          ${fl.map(([x, y], i) => flower(`${p}-f${i}`, x, y - 30)).join("")}
          ${shabari(`${p}-y`, 820, 1580, 0.86, false, { propR: BROOM })}
          ${shabari(`${p}-o`, 560, 1580, 0.86, true, { hidden: true })}
          <g id="${p}-night" style="opacity:0"><rect width="${W}" height="2400" fill="#0e1430"/>${stars(40, 1300)}<circle cx="820" cy="760" r="60" fill="#fbf1d0"/></g>`,
        html: tag(`${p}-tw`, 540, 560, "रोज़ राम का इंतज़ार") + tag(`${p}-th`, 540, 560, "बाल सफ़ेद हो गए", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Ram arrives; tears of joy ----------
  {
    id: "s04",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tA = L.w(1, "राम") - 0.2;
      k.walk(`${p}-r`, 0.2, tA + 0.4, 400, 0.5);
      k.walk(`${p}-l`, 0.3, tA + 0.4, 180, 0.48);
      k.op(`${p}-glow`, tA, 0.5, 1);
      k.mood(`${p}-s`, tA, "open");
      k.label(`${p}-ta`, tA + 0.1, L(2) - 0.15);
      // tears of joy
      const tT = L(2) - 0.1;
      k.mood(`${p}-s`, tT, "smile");
      k.mv(`${p}-s-al`, tT, 0.4, -26); k.mv(`${p}-s-ar`, tT + 0.05, 0.4, 26);
      k.mv(`${p}-s-h`, tT + 0.2, 0.5, 6);
      cry(k, `${p}-t0`, 742, 1290, tT + 0.2, 5);
      cry(k, `${p}-t1`, 778, 1290, tT + 0.45, 5);
      k.label(`${p}-tt`, L.w(2, "आँसू") - 0.2);
      k.mv(`${p}-r-ar`, L.w(2, "आँसू"), 0.5, -130, "back.out(1.4)");
      return {
        defs: forestDusk(p) + glowDef(`${p}-gl`),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${[40, 1040].map((x) => darkTree(x, 1460, 1.0, "#2a3a2a")).join("")}
          ${ground()}${hut(900, 1450, 0.8)}
          <circle id="${p}-glow" cx="400" cy="1300" r="280" fill="url(#${p}-gl)" style="opacity:0"/>
          ${lakEx(`${p}-l`, -320, 1580, 0.84)}${ramEx(`${p}-r`, -120, 1580, 0.95)}
          ${shabari(`${p}-s`, 760, 1580, 0.9)}
          ${tear(`${p}-t0`, 742, 1290)}${tear(`${p}-t1`, 778, 1290)}`,
        html: tag(`${p}-ta`, 540, 560, "राम आ गए!", "red") + tag(`${p}-tt`, 540, 560, "खुशी के आँसू"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. she tastes every berry; Ram eats them with love ----------
  {
    id: "s05",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      // berry A: sour, dropped
      const t0 = L(1) + 0.1;
      k.mv(`${p}-s-ar`, t0, 0.4, 132, "power2.out");
      k.mood(`${p}-s`, t0 + 0.5, "sad");
      k.op(`${p}-x`, t0 + 0.6, 0.15, 1); k.mv(`${p}-x`, t0 + 0.6, 0.3, { s: 1 }, "back.out(2)"); k.op(`${p}-x`, t0 + 1.3, 0.2, 0);
      k.op(`${p}-ba`, t0 + 0.8, 0.1, 0);
      k.mv(`${p}-s-ar`, t0 + 0.8, 0.35, -8);
      k.label(`${p}-tc`, L.w(1, "चखती") - 0.2, L(2) - 0.15);
      // berry B: sweet, kept for Ram
      const t1 = t0 + 1.3;
      k.op(`${p}-bb`, t1, 0.1, 1);
      k.mv(`${p}-s-ar`, t1, 0.4, 132, "power2.out");
      k.mood(`${p}-s`, t1 + 0.5, "smile");
      k.op(`${p}-ok`, t1 + 0.6, 0.15, 1); k.mv(`${p}-ok`, t1 + 0.6, 0.3, { s: 1 }, "back.out(2)"); k.op(`${p}-ok`, t1 + 1.4, 0.2, 0);
      k.mv(`${p}-s-ar`, L(2) - 0.3, 0.45, 60);
      // Lakshman is startled
      const tL = L(2) + 0.1;
      k.mood(`${p}-l`, tL, "open");
      k.op(`${p}-ex`, tL, 0.15, 1); k.mv(`${p}-ex`, tL, 0.3, { s: 1 }, "back.out(2)"); k.op(`${p}-ex`, tL + 1.2, 0.2, 0);
      k.osc(`${p}-l-h`, tL, 0.25, 3, 8);
      // Ram eats it with love
      const tE = L.w(2, "प्रेम") - 0.5;
      k.op(`${p}-bb`, tE, 0.05, 0);
      k.op(`${p}-bf`, tE, 0.05, 1);
      k.mv(`${p}-bf`, tE, 0.6, { x: 330, y: 1382, s: 0.7 }, "power2.inOut");
      k.op(`${p}-bf`, tE + 0.58, 0.08, 0);
      k.mood(`${p}-r`, tE + 0.5, "open"); k.mood(`${p}-r`, tE + 0.9, "smile");
      k.mv(`${p}-s-ar`, tE + 0.6, 0.4, 26); k.mv(`${p}-s-al`, tE + 0.6, 0.4, -26);
      for (let i = 0; i < 5; i++) { const t = tE + 0.7 + i * 0.25; k.op(`${p}-hr${i}`, t, 0.15, 1); k.mv(`${p}-hr${i}`, t, 1.4, { dy: -260, s: 1 }, "power1.out"); k.op(`${p}-hr${i}`, t + 1.1, 0.3, 0); }
      k.label(`${p}-tp`, L.w(2, "प्रेम") - 0.1);
      return {
        defs: forestDusk(p),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${[40, 1040].map((x) => darkTree(x, 1460, 1.0, "#2a3a2a")).join("")}
          ${ground()}${hut(960, 1450, 0.7)}
          ${lakEx(`${p}-l`, 110, 1580, 0.84)}
          ${ramEx(`${p}-r`, 330, 1580, 0.95, { seated: true, aL: -20, aR: 20 })}
          ${shabari(`${p}-s`, 760, 1580, 0.9, true, { seated: true, propR: handBerry(`${p}-ba`) + handBerry(`${p}-bb`, true) })}
          ${basket(560, 1500, 1.1)}
          ${flyBerry(`${p}-bf`, 690, 1492)}
          ${mark(`${p}-x`, 900, 1240, "✗", "#8a2a2a")}${mark(`${p}-ok`, 900, 1240, "✓", "#2a7a3a")}
          <g id="${p}-ex" transform="${T(110, 1180, 0, 0.4)}" style="opacity:0"><text text-anchor="middle" font-family="Mukta" font-weight="800" font-size="90" fill="#ffd23a" stroke="#3a1408" stroke-width="4">!</text></g>
          ${[0, 1, 2, 3, 4].map((i) => heart(`${p}-hr${i}`, 260 + i * 40, 1330)).join("")}`,
        html: tag(`${p}-tc`, 540, 560, "पहले खुद चखती") + tag(`${p}-tp`, 540, 560, "प्रेम के बेर", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. "I only know the bond of devotion"; the way to Sugriva ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-rays`, 0, dur, 30, "none");
      k.mv(`${p}-r-ar`, 0.3, 0.5, -140, "back.out(1.4)");
      k.label(`${p}-tb`, L.w(1, "भक्ति") - 0.2, L(2) - 0.15);
      const sk = sparkles(p, 10, 760, 1250, 260);
      sk.run(k, L.w(1, "भक्ति"), 1.6);
      // Shabari points the way
      const tS = L(2) + 0.2;
      k.mv(`${p}-r-ar`, tS - 0.2, 0.4, -8);
      k.mv(`${p}-s-al`, tS, 0.3, 8); k.mv(`${p}-s-ar`, tS, 0.45, -100, "back.out(1.4)");
      k.op(`${p}-sign`, L.w(2, "सुग्रीव") - 0.3, 0.3, 1);
      k.mv(`${p}-sign`, L.w(2, "सुग्रीव") - 0.3, 0.5, { s: 1 }, "back.out(2)");
      k.osc(`${p}-arw`, L.w(2, "सुग्रीव") + 0.2, 0.4, 7, { dx: 20 });
      k.mood(`${p}-l`, L.w(2, "सुग्रीव"), "open");
      k.label(`${p}-tg`, L.w(2, "सुग्रीव") - 0.1);
      return {
        defs: grad(`${p}-bg`, [[0, "#5a2a4a"], [0.6, "#c2561f"], [1, "#f0b06a"]]) + glowDef(`${p}-gl`),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-bg)"/>${rays(`${p}-rays`, 330, 1250, 1200, 20, "#ffe08a", 0.22)}
          ${ground(1440, "#6a5a3a")}
          <circle cx="330" cy="1260" r="300" fill="url(#${p}-gl)"/>
          ${lakEx(`${p}-l`, 110, 1580, 0.82, { aL: -26, aR: 26 })}${ramEx(`${p}-r`, 330, 1580, 0.95)}
          ${shabari(`${p}-s`, 740, 1580, 0.9, true, { aL: -26, aR: 26 })}
          <g transform="translate(760,1010)"><g id="${p}-sign" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">
            <rect x="-230" y="-80" width="460" height="160" rx="24" fill="rgba(20,10,30,0.82)" stroke="${C.gold}" stroke-width="5"/>
            <text x="-50" y="-12" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="40" fill="#fff3cf">ऋष्यमूक पर्वत</text>
            <text x="-50" y="48" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="52" fill="#ffd23a">सुग्रीव</text>
            <g id="${p}-arw" transform="${T()}"><path d="M110 18 L170 18 M150 -2 L175 18 L150 38" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round"/></g></g></g>
          ${sk.art}`,
        html: tag(`${p}-tb`, 540, 560, "भक्ति का नाता", "red") + tag(`${p}-tg`, 540, 440, "सुग्रीव से मिलो"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: meeting Hanuman; Jai Shri Ram ----------
  {
    id: "s07",
    extra: 2.4,
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
            <rect x="-380" y="-300" width="760" height="520" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${hanuman(`${p}-hn`, -10, 120, 0.8)}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="56" fill="#ffd23a">भाग 18: हनुमान से भेंट</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 360, 1460, 0.95)}${ramEx(`${p}-hr`, 720, 1460, 1.05)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
