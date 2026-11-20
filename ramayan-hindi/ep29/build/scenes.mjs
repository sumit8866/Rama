// Episode 29 (Hindi reel): Tara's lament and Vali's last words (Valmiki, Kishkindha 19-22). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, cloud, rays, throne, chhatra } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, hallV } from "../../reel-kit.mjs";

reseed(2929);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const vanara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, ...extra });
// Ram leaning on his bow (bow upright beside his right hand)
const LEAN_BOW = `<path d="M30 -70 Q80 95 30 260" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M30 -70 Q80 95 30 260" fill="none" stroke="#9a5b23" stroke-width="7" stroke-linecap="round"/><path d="M30 -70 L30 260" stroke="#f3ead2" stroke-width="2"/>`;
const ramLean = (id, x, y, s, extra = {}) => ramEx(id, x, y, s, { back: null, propR: LEAN_BOW, aR: -4, mood: "sad", ...extra });
// bead chains around a neck; seated people sit 80 units lower
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const FLOWER = [C.yellow, C.saffron], GOLDC = ["#ffe27a", "#f0b62a"];
const chainAt = (id, x, y, s, cols, seated = false, extra = "") => `<g${id ? ` id="${id}"` : ""} transform="${T(x, y + (seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}"${extra}>${beadsSvg(cols)}</g>`;
const GOLD = (p) => rgrad(`${p}-gold`, [[0, "#fff6c4", 0.75], [0.5, "#ffd23a", 0.35], [1, "#ffd23a", 0]]);

// talking Vali, sitting up (with his gold chain unless it has been handed over)
const VX = 270, VY = 1590, VS = 0.95;
const seatedVali = (p, chain = true, extra = {}) => `<g id="${p}-sv"><g transform="translate(${VX},${VY - 190})"><g id="${p}-vg" transform="${T()}"><circle r="150" fill="url(#${p}-gold)"/></g></g>
  ${vali(`${p}-v`, VX, VY, VS, { seated: true, mood: "sad", aL: -10, aR: 20, ...extra })}${chain ? chainAt(`${p}-ch`, VX, VY, VS, GOLDC, true) : ""}</g>`;
// Vali lying on his back (the wrapper rotates around his feet)
const lyingVali = (p, x, hidden = false, chain = true) => `<g id="${p}-ly" transform="${T(x, 1560, -82, 1)}"${hidden ? ' style="opacity:0"' : ""}>${vali(`${p}-lv`, 0, 0, VS, { mood: "sad" })}${chain ? chainAt("", 0, 0, VS, GOLDC) : ""}</g>`;
const VEYE = [VX - 14 * HS * VS, VY + (-262 + 80) * VS - 52 * HS * VS];
const eyeSeated = (x, y, s) => [x - 14 * HS * s, y + (-262 + 80) * s - 52 * HS * s];
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };

const skyBg = (p) => grad(`${p}-sky`, [[0, "#6a6a98"], [1, "#e0b890"]]);
const field = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.6)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5" opacity="0.75"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26" opacity="0.75"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>`;

export const SCENES = [
  // ---------- 1. hook: dying Vali gives his son to the brother he fought ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-ar`, 0.4, 0.5, -70, "back.out(1.4)");
      const tG = L.w(1, "सौंप") - 0.6;
      k.walk(`${p}-a`, tG, tG + 1.0, 660, 0.4);
      k.mv(`${p}-s-al`, tG + 1.0, 0.4, 60);
      k.mood(`${p}-a`, tG + 1.1, "smile");
      k.label(`${p}-tg`, L.w(1, "सौंप") - 0.2);
      return {
        defs: skyBg(p) + GOLD(p),
        art: `${field(p)}${seatedVali(p)}
          ${angada(`${p}-a`, 470, 1580, 0.72, { mood: "sad" })}
          ${sugEx(`${p}-s`, 790, 1580, 0.88, { mood: "sad" })}${chainAt("", 790, 1580, 0.88, FLOWER)}`,
        html: tag(`${p}-tg`, 540, 440, "\"अंगद अब तुम्हारा बेटा\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Tara runs out with Angada; she will not turn back ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-t`, 0.1, L.end(1) - 0.3, 640, 0.32);
      k.walk(`${p}-a`, 0.2, L.end(1) - 0.2, 830, 0.32);
      k.label(`${p}-tt`, L.w(1, "तारा") - 0.2, L(2) - 0.15);
      k.mv(`${p}-v1-ar`, L(2), 0.3, -80); k.mv(`${p}-v2-al`, L(2) + 0.1, 0.3, 80);
      k.mood(`${p}-v1`, L(2), "open"); k.mood(`${p}-v2`, L(2), "open");
      const tN = L.w(2, "पति") - 0.4;
      k.mv(`${p}-t-al`, tN, 0.3, 120, "back.out(1.4)");
      k.mood(`${p}-t`, tN, "open");
      k.label(`${p}-tn`, tN);
      return {
        defs: skyBg(p),
        art: `${field(p)}
          ${vanara(`${p}-v1`, 140, 1580, 0.7)}${vanara(`${p}-v2`, 330, 1580, 0.68)}
          ${angada(`${p}-a`, 1400, 1580, 0.72, { mood: "sad" })}
          ${tara(`${p}-t`, 1250, 1580, 0.86, { mood: "sad" })}`,
        html: tag(`${p}-tt`, 540, 440, "तारा दौड़ी चली आई") + tag(`${p}-tn`, 540, 440, "\"पति के बिना राज्य किस काम का?\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Ram leaning on his bow; Tara embraces Vali and weeps ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-rg`, L.w(1, "धनुष") - 0.5, 0.5, 1);
      k.label(`${p}-tr`, L.w(1, "धनुष") - 0.3, L(2) - 0.15);
      k.walk(`${p}-t`, L(2) - 0.3, L(2) + 0.5, 450, 0.35);
      k.op(`${p}-t`, L(2) + 0.5, 0.2, 0); k.op(`${p}-tk`, L(2) + 0.5, 0.2, 1);
      const [ex, ey] = eyeSeated(430, 1590, 0.84);
      cry(k, `${p}-t0`, ex, ey, L(2) + 0.8, 6);
      k.label(`${p}-tw`, L.w(2, "वीर") - 0.3);
      return {
        defs: skyBg(p) + glowDef(`${p}-rgg`, "#c8d8ff"),
        art: `${field(p)}
          <circle id="${p}-rg" cx="960" cy="1280" r="220" fill="url(#${p}-rgg)" style="opacity:0"/>
          ${lyingVali(p, 620)}
          ${angada(`${p}-a`, 760, 1580, 0.72, { mood: "sad" })}
          ${ramLean(`${p}-r`, 960, 1580, 0.86)}
          ${tara(`${p}-t`, 760, 1580, 0.86, { mood: "sad" })}
          ${tara(`${p}-tk`, 430, 1590, 0.84, { seated: true, hidden: true, mood: "sad", aL: -60, aR: 60 })}
          ${tear(`${p}-t0`, ex, ey)}`,
        html: tag(`${p}-tr`, 540, 440, "धनुष पर टिके राम") + tag(`${p}-tw`, 540, 440, "\"हे वीर! हे वानरश्रेष्ठ!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Hanuman: crown Angada; Tara: the kingdom is now Sugriva's ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-h`, 0.1, L.w(1, "समझाया"), 830, 0.4);
      k.mv(`${p}-h-ar`, L.w(1, "समझाया"), 0.4, -60, "back.out(1.4)");
      k.mood(`${p}-h`, L.w(1, "समझाया"), "open");
      k.label(`${p}-th`, L.w(1, "हनुमान") - 0.2, L(2) - 0.15);
      k.osc(`${p}-tk-h`, L(2), 0.3, 5, 10);
      k.mood(`${p}-tk`, L(2) + 0.2, "open");
      k.label(`${p}-ts`, L.w(2, "सुग्रीव") - 0.3);
      const [ex, ey] = eyeSeated(430, 1590, 0.84);
      cry(k, `${p}-t0`, ex, ey, 0.4, 4);
      return {
        defs: skyBg(p),
        art: `${field(p)}
          ${lyingVali(p, 620)}
          ${angada(`${p}-a`, 690, 1580, 0.72, { mood: "sad" })}
          ${ramLean(`${p}-r`, 1000, 1580, 0.8)}
          ${hanEx(`${p}-h`, 1250, 1580, 0.82, { propR: "" })}
          ${tara(`${p}-tk`, 430, 1590, 0.84, { seated: true, mood: "sad", aL: -60, aR: 60 })}
          ${tear(`${p}-t0`, ex, ey)}`,
        html: tag(`${p}-th`, 540, 440, "हनुमान ने समझाया") + tag(`${p}-ts`, 540, 440, "\"राज्य अब सुग्रीव का\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Vali's last words to Sugriva; the gold chain ----------
  {
    id: "s05",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-ar`, 0.4, 0.4, -60);
      k.label(`${p}-tf`, L.w(1, "भाग्य") - 0.3, L(2) - 0.15);
      // be Angada's father; follow Tara's counsel
      k.mv(`${p}-v-ar`, L(2), 0.4, -90);
      k.walk(`${p}-a`, L(2), L(2) + 0.8, 720, 0.4);
      k.mv(`${p}-s-ar`, L.w(2, "पिता"), 0.4, -60);
      k.label(`${p}-tp`, L.w(2, "पिता") - 0.3, L(3) - 0.15);
      // the gold chain passes to Sugriva
      const tC = L.w(3, "सोने") - 0.4;
      k.mv(`${p}-ch`, tC, 1.0, { x: 580, y: 1590 + 80 * 0.86 - 258 * 0.86, s: 0.86 * 0.9 }, "power2.inOut");
      k.op(`${p}-vg`, tC + 0.6, 0.5, 0);
      k.op(`${p}-sg`, tC + 0.9, 0.4, 1);
      const sk = sparkles(p, 8, 580, 1380, 160);
      sk.run(k, tC + 0.9, 1.0);
      k.label(`${p}-tc`, tC + 0.2);
      return {
        defs: skyBg(p) + GOLD(p) + glowDef(`${p}-sgg`),
        art: `${field(p)}
          ${tara(`${p}-tk`, 90, 1590, 0.8, { seated: true, mood: "sad", aL: -26, aR: 26 })}
          ${seatedVali(p)}
          <circle id="${p}-sg" cx="580" cy="1400" r="170" fill="url(#${p}-sgg)" style="opacity:0"/>
          ${sugEx(`${p}-s`, 580, 1590, 0.86, { seated: true, mood: "sad", aL: -26, aR: 26 })}${chainAt("", 580, 1590, 0.86, FLOWER, true)}
          ${angada(`${p}-a`, 860, 1580, 0.72, { mood: "sad" })}
          ${ramLean(`${p}-r`, 1010, 1580, 0.78)}
          ${sk.art}`,
        html: tag(`${p}-tf`, 540, 440, "\"भाग्य में मेल नहीं था\"") + tag(`${p}-tp`, 540, 440, "\"अंगद के पिता बनना\"", "red") + tag(`${p}-tc`, 540, 440, "इंद्र की सोने की माला सुग्रीव को"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. "obey Sugriva"; Vali breathes his last ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-ar`, 0.3, 0.4, -80);
      k.mv(`${p}-a-al`, L.w(1, "आज्ञा") - 0.4, 0.4, -26); k.mv(`${p}-a-ar`, L.w(1, "आज्ञा") - 0.35, 0.4, 26);
      k.label(`${p}-ta`, L.w(1, "आज्ञा") - 0.3, L(2) - 0.15);
      const tD = L.w(2, "प्राण") - 0.5;
      k.op(`${p}-sv`, tD, 0.6, 0); k.op(`${p}-ly`, tD, 0.6, 1);
      k.op(`${p}-flash`, tD, 0.1, 0.25); k.op(`${p}-flash`, tD + 0.1, 0.6, 0);
      for (const c of ["s", "a", "tk"]) k.mood(`${p}-${c}`, tD, "sad");
      k.mv(`${p}-tk`, tD + 0.3, 0.6, { x: 330 }, "power2.out");
      k.mv(`${p}-r-h`, tD + 0.4, 0.5, 10);
      k.label(`${p}-td`, tD + 0.3);
      return {
        defs: skyBg(p) + GOLD(p),
        art: `${field(p)}
          ${seatedVali(p, false)}${lyingVali(p, 560, true, false)}
          ${tara(`${p}-tk`, 90, 1590, 0.8, { seated: true, mood: "sad", aL: -40, aR: 40 })}
          ${angada(`${p}-a`, 650, 1580, 0.72, { mood: "sad" })}
          ${sugEx(`${p}-s`, 820, 1590, 0.84, { seated: true, mood: "sad", aL: -26, aR: 26 })}${chainAt("", 820, 1590, 0.84, GOLDC, true)}
          ${ramLean(`${p}-r`, 1000, 1580, 0.78)}`,
        html: tag(`${p}-ta`, 540, 440, "\"सुग्रीव की आज्ञा मानना\"") + tag(`${p}-td`, 540, 440, "बाली ने प्राण त्यागे", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: Sugriva's coronation; Jai Shri Ram ----------
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
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <g transform="translate(0,140) scale(0.5)">${throne(0, 0, 1)}</g>
            ${sugEx(`${p}-ns`, 0, 85, 0.5, { seated: true, aL: -20, aR: 20 })}
            ${angada(`${p}-na`, 200, 130, 0.46, { aL: -26, aR: 26 })}${hanEx(`${p}-nh`, -200, 130, 0.48, { aL: -26 })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="50" fill="#ffd23a">भाग 30: सुग्रीव का राज्याभिषेक</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}${chainAt("", 890, 1460, 0.82, GOLDC)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
