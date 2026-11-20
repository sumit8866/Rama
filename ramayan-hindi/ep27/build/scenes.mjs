// Episode 27 (Hindi reel): the fall of Vali (Valmiki, Kishkindha 16-17). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
// Shown without blood: a flash where the arrow strikes, and Vali falling like a cut tree.
import { C, T, CAST, grad, rgrad, tree, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, archer, bowReady, shoot, arrowFly } from "../../reel-kit.mjs";

reseed(2727);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const beads = (x, y, s, cols) => `<g transform="translate(${x},${y - 258 * s}) scale(${s * 0.9})">${Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("")}</g>`;
const flowerGarland = (x, y, s) => beads(x, y, s, [C.yellow, C.saffron]);
const goldChain = (x, y, s) => beads(x, y, s, ["#ffe27a", "#f0b62a"]);
// Vali inside a wrapper whose rotation makes him fall (pivot at his feet); Indra's gold chain moves with him
const valiFall = (p, x, y, s, r = 0, extra = {}) => `<g id="${p}-fall" transform="${T(x, y, r, 1)}">
  <g transform="translate(0,${-200 * s})"><g id="${p}-cg" transform="${T()}" style="opacity:0"><circle r="${120 * s}" fill="url(#${p}-gold)"/></g></g>
  ${vali(`${p}-v`, 0, 0, s, extra)}${goldChain(0, 0, s)}</g>`;
const SAL = `<g transform="translate(2,130) rotate(180) scale(0.45)"><path d="M-14 0 L-10 -260 L10 -260 L14 0 Z" fill="#6b4423" stroke="${C.ink}" stroke-width="5"/><ellipse cy="-320" rx="80" ry="110" fill="#2f6a3a" stroke="${C.ink}" stroke-width="5"/></g>`;

const dayBg = (p) => grad(`${p}-sky`, [[0, "#7aa0c8"], [1, "#f0dcb0"]]);
const gate = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.8)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>${tree(70, 1450, 0.95)}${tree(300, 1440, 0.8)}`;
const bush = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${[[-90, -40, 70], [-20, -70, 80], [60, -45, 70], [0, -10, 90]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#2f6a3a" stroke="${C.ink}" stroke-width="4"/>`).join("")}<circle cx="-40" cy="-80" r="22" fill="#3f8a4a"/><circle cx="50" cy="-60" r="18" fill="#3f8a4a"/></g>`;
const burst = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.3)}" style="opacity:0"><path d="M0 -70 L18 -18 L70 0 L18 18 L0 70 L-18 18 L-70 0 L-18 -18 Z" fill="#fff6c4" stroke="#ffd23a" stroke-width="5"/></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.12, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const GOLD_DEF = (p) => rgrad(`${p}-gold`, [[0, "#fff6c4", 0.9], [0.5, "#ffd23a", 0.5], [1, "#ffd23a", 0]]);

export const SCENES = [
  // ---------- 1. hook: one arrow, and the mightiest vanara of Kishkindha fell ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-cg`, 0.3, 0.5, 1);
      k.osc(`${p}-cg`, 0.8, 0.6, Math.floor((dur - 1) / 0.6), { s: 1.15 });
      k.mood(`${p}-v`, 0, "sad");
      k.label(`${p}-tf`, L.w(1, "धरती") - 0.3);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          ${valiFall(p, 720, 1560, 0.95, -82)}
          ${sugEx(`${p}-s`, 930, 1580, 0.86, { mood: "sad", aL: -26, aR: 26 })}${flowerGarland(930, 1580, 0.86)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-tf`, 540, 440, "बाली वध", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Vali sees Sugriva in the garland and charges ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-fall`, 0.2, 0.2, 1);
      k.mv(`${p}-fall`, 0.2, 0.8, { x: 560, y: 1580, s: 1 }, "back.out(1.3)");
      k.mood(`${p}-v`, L.w(1, "सुग्रीव") - 0.2, "open");
      k.mv(`${p}-v-al`, L.w(1, "कमर") - 0.3, 0.3, 30); k.mv(`${p}-v-ar`, L.w(1, "कमर") - 0.3, 0.3, -30);
      const tC = L.w(1, "टूट") - 0.4;
      k.mv(`${p}-fall`, tC, 0.4, { x: 700 }, "power2.in");
      k.mv(`${p}-v-ar`, tC, 0.3, -90);
      k.mv(`${p}-s-b`, tC + 0.35, 0.12, { r: 12 }); k.mv(`${p}-s-b`, tC + 0.5, 0.25, { r: 0 });
      pop(k, `${p}-bs`, tC + 0.35, 0.4);
      shake(k, p, tC + 0.35, 6, 10);
      k.label(`${p}-tv`, L.w(1, "सुग्रीव") - 0.2);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          ${sugEx(`${p}-s`, 860, 1580, 0.9, { aL: -40, aR: 40 })}${flowerGarland(860, 1580, 0.9)}
          <g style="opacity:1">${valiFall(p, 730, 1300, 0.95).replace(`transform="${T(730, 1300, 0, 1)}"`, `transform="${T(730, 1300, 0, 0.4)}" style="opacity:0"`)}</g>
          ${burst(`${p}-bs`, 790, 1330)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-tv`, 540, 440, "बाली vs सुग्रीव", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. the fierce fight; Sugriva tires and looks to Ram ----------
  {
    id: "s03",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      // Sugriva swings the sal tree
      const tT = L.w(1, "पेड़") - 0.4;
      k.mv(`${p}-s-ar`, tT, 0.3, -160, "power2.out"); k.mv(`${p}-s-ar`, tT + 0.3, 0.25, -40, "power3.in");
      pop(k, `${p}-b1`, tT + 0.55, 0.3);
      k.mv(`${p}-v-b`, tT + 0.55, 0.12, { r: -10 }); k.mv(`${p}-v-b`, tT + 0.7, 0.25, { r: 0 });
      shake(k, p, tT + 0.55, 5, 8);
      for (let i = 0; i < 3; i++) {
        const t = tT + 1.2 + i * 0.6;
        k.mv(`${p}-v-ar`, t, 0.12, -90, "power3.out"); k.mv(`${p}-v-ar`, t + 0.15, 0.2, -20);
        k.mv(`${p}-s-b`, t + 0.1, 0.12, { r: 10 }); k.mv(`${p}-s-b`, t + 0.25, 0.2, { r: 0 });
        pop(k, `${p}-b2`, t + 0.1, 0.2);
      }
      k.label(`${p}-tf`, L.w(1, "भयंकर") - 0.3, L(2) - 0.15);
      // he tires and looks to Ram
      const tW = L.w(2, "थकने") - 0.3;
      k.mood(`${p}-s`, tW, "sad");
      k.mv(`${p}-s-h`, tW, 0.5, 12);
      k.mv(`${p}-s-ar`, tW, 0.4, -8);
      k.mv(`${p}-s-al`, L.w(2, "राम") - 0.2, 0.4, 100, "back.out(1.4)");
      k.mv(`${p}-s-i`, L.w(2, "राम") - 0.2, 0.3, { dx: -6 });
      k.label(`${p}-tw`, tW + 0.1);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          ${valiFall(p, 560, 1580, 0.95)}
          ${sugEx(`${p}-s`, 800, 1580, 0.9, { propR: SAL })}${flowerGarland(800, 1580, 0.9)}
          ${burst(`${p}-b1`, 620, 1250)}${burst(`${p}-b2`, 720, 1330)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-tf`, 540, 440, "भयंकर युद्ध!", "red") + tag(`${p}-tw`, 540, 440, "सुग्रीव थकने लगे"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Ram draws and looses the arrow; it strikes Vali's chest ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      const tf = L.w(1, "छोड़ा") - 0.2;
      shoot(k, `${p}-r`, 0.3, 0.7, tf - 0.7, tf);
      k.label(`${p}-tb`, L.w(1, "वज्र") - 0.3, L(2) - 0.15);
      // the arrow flies from (347, 1375) to Vali's chest
      const tHit = Math.max(tf + 0.4, L.w(2, "छाती") - 0.2);
      k.op(`${p}-af`, tf, 0.02, 1);
      k.mv(`${p}-af`, tf, tHit - tf, { x: 665 }, "power1.in");
      k.op(`${p}-af`, tHit, 0.05, 0);
      pop(k, `${p}-hit`, tHit, 0.5);
      k.op(`${p}-flash`, tHit, 0.06, 0.6); k.op(`${p}-flash`, tHit + 0.06, 0.4, 0);
      shake(k, p, tHit, 7, 12);
      k.mood(`${p}-v`, tHit, "open");
      k.mv(`${p}-v-al`, tHit, 0.2, 60); k.mv(`${p}-v-ar`, tHit, 0.2, -60);
      k.mood(`${p}-s`, tHit + 0.2, "open");
      k.label(`${p}-th`, tHit + 0.1);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          ${valiFall(p, 720, 1580, 0.95)}
          ${sugEx(`${p}-s`, 930, 1580, 0.88, { mood: "sad" })}${flowerGarland(930, 1580, 0.88)}
          ${burst(`${p}-hit`, 720, 1375)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}
          ${arrowFly(`${p}-af`, 347, 1375, "#ffe08a")}`,
        html: tag(`${p}-tb`, 540, 440, "वज्र जैसा बाण!", "red") + tag(`${p}-th`, 540, 440, "बाली की छाती पर"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Vali falls like a cut tree; Indra's gold chain still holds his life ----------
  {
    id: "s05",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-v`, 0, "open");
      const tF = L.w(1, "धरती") - 0.8;
      k.mv(`${p}-fall`, tF, 0.9, { r: -82, y: 1560 }, "power2.in");
      shake(k, p, tF + 0.9, 7, 12);
      k.mood(`${p}-v`, tF + 0.9, "sad");
      k.op(`${p}-dust`, tF + 0.85, 0.15, 0.8); k.mv(`${p}-dust`, tF + 0.85, 0.8, { s: 1.4 }, "power1.out"); k.op(`${p}-dust`, tF + 1.3, 0.4, 0);
      k.label(`${p}-tf`, L.w(1, "धरती") - 0.3, L(2) - 0.15);
      const tG = L.w(2, "सोने") - 0.3;
      k.op(`${p}-cg`, tG, 0.4, 1);
      k.osc(`${p}-cg`, tG + 0.4, 0.6, Math.floor((dur - tG - 0.6) / 0.6), { s: 1.15 });
      k.label(`${p}-tg`, tG);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          <g transform="translate(540,1570)"><g id="${p}-dust" transform="${T(0, 0, 0, 0.6)}" style="opacity:0"><ellipse rx="260" ry="50" fill="#d8c8a8"/></g></g>
          ${valiFall(p, 720, 1580, 0.95)}
          ${sugEx(`${p}-s`, 930, 1580, 0.86, { mood: "sad", aL: -26, aR: 26 })}${flowerGarland(930, 1580, 0.86)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-tf`, 540, 440, "बाली गिर पड़ा") + tag(`${p}-tg`, 540, 440, "इंद्र की सोने की माला", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Ram and Lakshman step out from behind the trees ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-cg`, 0, 0.01, 1);
      k.walk(`${p}-r`, 0.3, L.end(1), 300, 0.45);
      k.walk(`${p}-l`, 0.6, L.end(1) + 0.3, 120, 0.45);
      k.mood(`${p}-v`, 0, "sad");
      k.mv(`${p}-s-h`, 0.5, 0.5, 10);
      k.label(`${p}-to`, L.w(1, "बाहर") - 0.3);
      return {
        defs: dayBg(p) + GOLD_DEF(p),
        art: `${gate(p)}
          ${valiFall(p, 720, 1560, 0.95, -82)}
          ${sugEx(`${p}-s`, 950, 1580, 0.84, { mood: "sad", aL: -26, aR: 26 })}${flowerGarland(950, 1580, 0.84)}
          ${lakEx(`${p}-l`, 40, 1580, 0.82)}${ramEx(`${p}-r`, 180, 1580, 0.9)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-to`, 540, 440, "राम सामने आए"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: Vali's questions, Ram's answers; Jai Shri Ram ----------
  {
    id: "s07",
    extra: 2.2,
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
            <rect x="-400" y="-290" width="800" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${ramEx(`${p}-nr`, -150, 120, 0.58)}
            <g transform="translate(160,130) rotate(70)">${vali(`${p}-nv`, 0, 0, 0.5, { mood: "open", aR: -120 })}</g>
            <text x="20" y="-150" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="90" fill="#ffd23a">?</text>
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="44" fill="#ffd23a">भाग 28: बाली के प्रश्न, राम के उत्तर</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}${flowerGarland(890, 1460, 0.82)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
