// Episode 30 (Hindi reel): Sugriva's remorse, Vali's funeral, Sugriva's coronation (Valmiki, Kishkindha 23-26). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, cloud, rays, throne, chhatra, flames } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, hallV, flicker, moon } from "../../reel-kit.mjs";

reseed(3030);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "calm", mood: "sad", ...extra });
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const vanara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, ...extra });
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const GOLDC = ["#ffe27a", "#f0b62a"];
const chainAt = (x, y, s, seated = false) => `<g transform="${T(x, y + (seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}">${beadsSvg(GOLDC)}</g>`;
const sug = (id, x, y, s, extra = {}) => `${sugEx(id, x, y, s, extra)}${chainAt(x, y, s, !!extra.seated)}`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
const eyeS = (x, y, s, seated = false) => [x - 14 * HS * s, y + (-262 + (seated ? 80 : 0)) * s - 52 * HS * s];

// a pyre of logs with Vali lying on it; flames can be lit
const pyre = (p, x, y, lit = true) => `<g transform="translate(${x},${y})">
  ${[0, 1, 2].map((r) => `<g transform="translate(0,${-r * 34})">${[-150, -50, 50, 150].map((lx) => `<rect x="${lx - 48}" y="-30" width="96" height="30" rx="12" fill="#7a4a22" stroke="${C.ink}" stroke-width="3"/>`).join("")}</g>`).join("")}
  <g transform="translate(150,-104) rotate(-90)">${vali(`${p}-pv`, 0, 0, 0.62)}</g></g>
  <g id="${p}-fire" style="opacity:${lit ? 1 : 0}">${flames(`${p}-f`, x - 90, y - 90, 0.75)}${flames(`${p}-f2`, x + 90, y - 90, 0.7)}</g>`;
const palki = (id, x, y) => `<g id="${id}" transform="${T(x, y)}">
  <path d="M-260 -150 L260 -150" stroke="#7a4a22" stroke-width="14" stroke-linecap="round"/>
  <rect x="-130" y="-170" width="260" height="90" rx="14" fill="#c2361f" stroke="${C.ink}" stroke-width="4"/>
  <path d="M-150 -170 Q0 -260 150 -170 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/>
  <g transform="translate(-60,-120) scale(0.5) rotate(-90)"><circle r="40" fill="#c9993a" stroke="${C.ink}" stroke-width="4"/></g>
  ${vanara(`${id}-c1`, -220, 0, 0.62, { aL: -150, aR: 20 })}${vanara(`${id}-c2`, 220, 0, 0.62, { aL: -20, aR: 150 })}</g>`;
const badge = (id, x, y, text, size = 64) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><rect x="-200" y="-70" width="400" height="130" rx="26" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="5"/><text y="22" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${size}" fill="#ffd23a">${text}</text></g></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };

const nightBg = (p) => grad(`${p}-sky`, [[0, "#141434"], [1, "#4a3a5a"]]);
const duskBg = (p) => grad(`${p}-sky`, [[0, "#5a4a7a"], [1, "#e0a070"]]);
const riverbank = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${stars(30, 1000)}${moon(860, 640, 52)}
  <rect x="0" y="1380" width="${W}" height="80" fill="#2a4a7a"/><path d="M60 1410 L220 1410 M500 1420 L700 1420 M860 1405 L1020 1405" stroke="#9ac0f0" stroke-width="5" opacity="0.6"/>
  <rect x="0" y="1450" width="${W}" height="1000" fill="#8a7a5a"/>`;
const field = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.6)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>`;

export const SCENES = [
  // ---------- 1. hook: about to be king, Sugriva wanted to leap into the pyre ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      flicker(k, `${p}-f`, 0, dur); flicker(k, `${p}-f2`, 0, dur);
      const tC = L.w(1, "चिता") - 0.6;
      k.walk(`${p}-s`, tC, tC + 0.6, 760, 0.25);
      k.mv(`${p}-s-al`, tC, 0.3, 120); k.mv(`${p}-s-ar`, tC, 0.3, -120);
      k.walk(`${p}-h`, tC + 0.3, tC + 0.9, 880, 0.25);
      k.mv(`${p}-h-al`, tC + 0.9, 0.3, 90);
      k.label(`${p}-tc`, L.w(1, "चिता") - 0.3);
      return {
        defs: nightBg(p),
        art: `${riverbank(p)}${pyre(p, 380, 1560)}
          ${sug(`${p}-s`, 900, 1580, 0.88, { mood: "open" })}${hanEx(`${p}-h`, 1100, 1580, 0.82, { propR: "" })}`,
        html: tag(`${p}-tc`, 540, 440, "सुग्रीव चिता की ओर!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Sugriva's remorse ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const [ex, ey] = eyeS(560, 1590, 0.86, true);
      cry(k, `${p}-t0`, ex, ey, 0.3, 10);
      k.mv(`${p}-s-h`, 0.3, 0.5, 10);
      k.label(`${p}-tb`, L.w(1, "भाई") - 0.3, L(2) - 0.15);
      k.mv(`${p}-s-al`, L(2), 0.4, 60);
      k.mood(`${p}-r`, L(2), "sad"); k.mood(`${p}-l`, L(2), "open");
      k.label(`${p}-tc`, L.w(2, "चिता") - 0.3);
      return {
        defs: duskBg(p),
        art: `${field(p)}
          ${sug(`${p}-s`, 560, 1590, 0.86, { seated: true, mood: "sad", aL: -40, aR: 40 })}${tear(`${p}-t0`, ex, ey)}
          ${lakEx(`${p}-l`, 140, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.9)}
          ${hanEx(`${p}-h`, 830, 1580, 0.8, { aL: -26 })}`,
        html: tag(`${p}-tb`, 540, 440, "\"भाई को मरवा दिया!\"") + tag(`${p}-tc`, 540, 440, "\"मैं भी चिता में जलूँगा\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Tara: "kill me with the same arrow"; Ram consoles her ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-t-al`, 0.4, 0.4, 80, "back.out(1.4)");
      k.mood(`${p}-t`, 0.4, "open");
      const [ex, ey] = eyeS(680, 1580, 0.86);
      cry(k, `${p}-t0`, ex, ey, 0.6, 7);
      k.label(`${p}-tb`, L.w(1, "बाण") - 0.3, L(2) - 0.15);
      k.mv(`${p}-r-ar`, L(2), 0.5, -130, "back.out(1.4)");
      k.op(`${p}-gl`, L(2), 0.5, 1);
      k.mood(`${p}-t`, L.w(2, "युवराज") - 0.3, "sad"); k.mv(`${p}-t-al`, L.w(2, "विधि"), 0.4, -26); k.mv(`${p}-t-ar`, L.w(2, "विधि"), 0.4, 26);
      k.label(`${p}-tv`, L.w(2, "विधि") - 0.3);
      return {
        defs: duskBg(p) + glowDef(`${p}-gg`),
        art: `${field(p)}<circle id="${p}-gl" cx="360" cy="1280" r="280" fill="url(#${p}-gg)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 130, 1580, 0.82)}${ramEx(`${p}-r`, 360, 1580, 0.92, { mood: "sad" })}
          ${tara(`${p}-t`, 680, 1580, 0.86, { mood: "sad" })}${tear(`${p}-t0`, ex, ey)}
          ${angada(`${p}-a`, 880, 1580, 0.72, { mood: "sad" })}`,
        html: tag(`${p}-tb`, 540, 440, "\"उसी बाण से मुझे भी मारो\"", "red") + tag(`${p}-tv`, 540, 440, "\"ये विधि का विधान है\""),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the palanquin to the riverbank; Angada lights the pyre ----------
  {
    id: "s04",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-pk`, 0.2, L.end(1) - 0.2, { x: 400 }, "none");
      for (const c of ["c1", "c2"]) k.osc(`${p}-pk-${c}-b`, 0.2, 0.25, Math.floor((L.end(1) - 0.4) / 0.25), { y: -6 });
      k.label(`${p}-tp`, L.w(1, "पालकी") - 0.3, L(2) - 0.15);
      // the pyre scene
      const tF = L(2) - 0.1;
      k.op(`${p}-a1`, tF, 0.4, 0); k.op(`${p}-b1`, tF, 0.4, 1);
      const tL = L.w(2, "अग्नि") - 0.4;
      k.mv(`${p}-ag-al`, tL, 0.3, 70);
      k.op(`${p}-fire`, tL + 0.3, 0.4, 1);
      flicker(k, `${p}-f`, tL + 0.3, dur); flicker(k, `${p}-f2`, tL + 0.3, dur);
      k.mv(`${p}-ag`, L.w(2, "परिक्रमा") - 0.4, 1.4, { x: 780, y: 1520, s: 0.6 }, "sine.inOut");
      k.label(`${p}-tf`, L.w(2, "अग्नि") - 0.3);
      return {
        defs: nightBg(p),
        art: `<g id="${p}-a1">${riverbank(p)}${palki(`${p}-pk`, 1350, 1580)}
            ${tara(`${p}-t1`, 900, 1580, 0.8, { mood: "sad", aL: -26, aR: 26 })}</g>
          <g id="${p}-b1" style="opacity:0">${riverbank(p)}${pyre(p, 420, 1560, false)}
            ${sug(`${p}-s`, 900, 1580, 0.84, { mood: "sad", aL: -26, aR: 26 })}${tara(`${p}-t2`, 1020, 1580, 0.78, { mood: "sad", aL: -26, aR: 26 })}
            ${angada(`${p}-ag`, 700, 1580, 0.72, { mood: "sad", propL: `<g transform="translate(2,124)"><path d="M0 0 L0 -110" stroke="#7a4a22" stroke-width="8"/><path d="M0 -110 Q-14 -130 0 -160 Q14 -130 0 -110 Z" fill="#ffcf4a" stroke="#e8662b" stroke-width="2"/></g>`, aL: 30 })}</g>`,
        html: tag(`${p}-tp`, 540, 440, "पालकी में बाली") + tag(`${p}-tf`, 540, 440, "अंगद ने अग्नि दी", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Hanuman invites Ram into Kishkindha; Ram keeps his 14-year vow ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-h-ar`, 0.4, 0.4, -90, "back.out(1.4)");
      k.mood(`${p}-h`, 0.4, "open");
      k.label(`${p}-ti`, L.w(1, "किष्किंधा") - 0.3, L(2) - 0.15);
      k.mv(`${p}-r-ar`, L(2), 0.4, -60, "back.out(1.4)");
      pop(k, `${p}-14`, L.w(2, "चौदह") - 0.3);
      k.mood(`${p}-h`, L.w(2, "चौदह"), "smile");
      k.mv(`${p}-h-al`, L.w(2, "चौदह"), 0.4, -26); k.mv(`${p}-h-ar`, L.w(2, "चौदह") + 0.05, 0.4, 26);
      k.label(`${p}-tv`, L.w(2, "नगर") - 0.4);
      return {
        defs: duskBg(p),
        art: `${field(p)}
          ${lakEx(`${p}-l`, 120, 1580, 0.82)}${ramEx(`${p}-r`, 320, 1580, 0.92)}
          ${hanEx(`${p}-h`, 640, 1580, 0.84, { propR: "" })}${sug(`${p}-s`, 860, 1580, 0.84, { aL: -26, aR: 26 })}
          ${badge(`${p}-14`, 540, 1000, "14 साल का वचन", 58)}`,
        html: tag(`${p}-ti`, 540, 440, "\"किष्किंधा पधारिए\"") + tag(`${p}-tv`, 540, 440, "\"नगर में नहीं जाऊँगा\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Sugriva is crowned; Angada becomes heir ----------
  {
    id: "s06",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const pt = petals(p, 18, 0.3, 1.8); pt.run(k);
      k.op(`${p}-wt`, 0.4, 0.2, 1); k.mv(`${p}-wt`, 0.4, 1.2, { sy: 1 }, "power1.out"); k.op(`${p}-wt`, 1.6, 0.3, 0);
      k.op(`${p}-gl`, L.w(1, "राज्याभिषेक") - 0.3, 0.5, 1);
      k.label(`${p}-tk`, L.w(1, "राज्याभिषेक") - 0.3, L(2) - 0.15);
      const tA = L.w(2, "युवराज") - 0.4;
      k.mv(`${p}-s-ar`, tA - 0.2, 0.4, -60);
      k.op(`${p}-ag`, tA, 0.4, 1);
      k.mood(`${p}-a`, tA, "smile");
      pop(k, `${p}-yv`, tA);
      const sk = sparkles(p, 8, 760, 1300, 200); sk.run(k, tA, 1.2);
      return {
        defs: glowDef(`${p}-gg`) + glowDef(`${p}-agg`, "#ffd23a"),
        art: `${hallV(p)}${chhatra(540, 1010, 0.9)}${throne(540, 1580, 0.9)}
          <circle id="${p}-gl" cx="540" cy="1300" r="300" fill="url(#${p}-gg)" style="opacity:0"/>
          <g transform="translate(540,1080)"><g id="${p}-wt" transform="${T(0, 0, 0, 1, 0.05)}" style="opacity:0"><path d="M-20 0 L-30 260 M0 0 L0 270 M20 0 L30 260" stroke="#8fd0ff" stroke-width="8" stroke-linecap="round" opacity="0.8"/></g></g>
          ${sug(`${p}-s`, 540, 1500, 0.9, { seated: true, aL: -20, aR: 20 })}
          ${tara(`${p}-t`, 230, 1580, 0.8, { aL: -26, aR: 26 })}
          <circle id="${p}-ag" cx="780" cy="1330" r="170" fill="url(#${p}-agg)" style="opacity:0"/>
          ${angada(`${p}-a`, 780, 1580, 0.76, { aL: -26, aR: 26, mood: "sad" })}
          ${badge(`${p}-yv`, 780, 1060, "युवराज अंगद", 56)}
          ${pt.art}${sk.art}`,
        html: tag(`${p}-tk`, 540, 440, "सुग्रीव का राज्याभिषेक!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the rainy season; Jai Shri Ram ----------
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
            ${cloud(-120, -180, 1.1, "#8a8aa8", 0.95)}${cloud(150, -200, 1.0, "#8a8aa8", 0.95)}
            ${Array.from({ length: 14 }, (_, i) => `<path d="M${-300 + i * 45} ${-120 + (i % 3) * 20} l-14 40" stroke="#9ac0f0" stroke-width="5" stroke-linecap="round"/>`).join("")}
            <path d="M-200 130 L-200 10 Q0 -80 200 10 L200 130 Z" fill="#2a1a24" stroke="#6a5a4a" stroke-width="12"/>
            ${ramEx(`${p}-nr`, -50, 120, 0.42, { mood: "sad" })}${lakEx(`${p}-nl`, 70, 120, 0.4)}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 31: वर्षा ऋतु</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sug(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
