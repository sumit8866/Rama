// Episode 20 (Hindi reel): Sita's ornaments (Valmiki, Kishkindha 6-7). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef } from "../../reel-kit.mjs";

reseed(2020);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", aL: -26, aR: 26, ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });

// Ravana's flying chariot (as in Ep 15-16)
const vimana = (inner) => `<g>
  <path d="M-120 -50 L-120 -230 Q0 -330 120 -230 L120 -50" fill="none" stroke="${C.gold}" stroke-width="10"/><circle cy="-300" r="16" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/>
  ${inner}
  <path d="M-230 -10 L-340 -90 L-250 -40 Z M230 -10 L340 -90 L250 -40 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M-240 0 Q0 96 240 0 L210 -56 L-210 -56 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="5"/>
  <path d="M-210 -56 L210 -56" stroke="${C.verm}" stroke-width="9"/>${[-150, -75, 0, 75, 150].map((x) => `<circle cx="${x}" cy="-10" r="10" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/>`).join("")}
</g>`;

// the ornaments
const kundal = (x, y) => `<g transform="translate(${x},${y})"><circle r="17" fill="none" stroke="${C.ink}" stroke-width="10"/><circle r="17" fill="none" stroke="${C.gold}" stroke-width="6"/><path d="M0 16 Q-16 42 0 60 Q16 42 0 16 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="2.5"/><circle cy="44" r="6" fill="${C.verm}"/></g>`;
const keyura = (x, y) => `<g transform="translate(${x},${y})"><rect x="-46" y="-16" width="92" height="32" rx="16" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/><path d="M-30 -16 L-30 16 M30 -16 L30 16" stroke="#b07a1a" stroke-width="3"/><circle r="11" fill="${C.teal}" stroke="${C.ink}" stroke-width="2"/></g>`;
const anklet = (x, y) => `<g transform="translate(${x},${y})"><ellipse rx="50" ry="22" fill="none" stroke="${C.ink}" stroke-width="10"/><ellipse rx="50" ry="22" fill="none" stroke="#e8e8f0" stroke-width="6"/>${[-40, -20, 0, 20, 40].map((a) => `<circle cx="${a}" cy="${Math.round(22 - Math.abs(a) * 0.2)}" r="7" fill="#f3f3f8" stroke="${C.ink}" stroke-width="1.5"/>`).join("")}</g>`;
const necklace = (x, y) => `<g transform="translate(${x},${y})"><path d="M-60 -20 Q0 50 60 -20" stroke="${C.ink}" stroke-width="10" fill="none"/><path d="M-60 -20 Q0 50 60 -20" stroke="${C.gold}" stroke-width="6" fill="none"/><circle cy="18" r="13" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/></g>`;
// the yellow silk upper cloth, opened, with all the ornaments on it
const jewelCloth = (p) => `<path d="M-300 150 Q-330 -120 -200 -170 L200 -170 Q330 -120 300 150 Q0 200 -300 150 Z" fill="#f0c23a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M-270 125 Q0 175 270 125" stroke="#c2361f" stroke-width="8" fill="none"/>
  <g id="${p}-jk">${kundal(-200, -90)}${kundal(-130, -90)}</g>
  <g id="${p}-jb">${keyura(150, -100)}${keyura(150, -40)}</g>
  ${necklace(0, -90)}
  <g id="${p}-ja">${anklet(-70, 60)}${anklet(70, 60)}</g>`;
// a closed bundle (the cloth knotted around the ornaments)
const BUNDLE = `<path d="M-40 10 Q-50 -30 -14 -36 L0 -54 L14 -36 Q50 -30 40 10 Q0 30 -40 10 Z" fill="#f0c23a" stroke="${C.ink}" stroke-width="3"/><path d="M-10 -44 L10 -44" stroke="#c2361f" stroke-width="5"/>`;
const handBundle = (id) => `<g id="${id}" transform="translate(2,158)">${BUNDLE}</g>`;
const mark = (id, x, y, ch, col, r = 30) => `<g id="${id}" transform="${T(x, y, 0, 0.4)}" style="opacity:0"><circle r="${r}" fill="${col}" stroke="${C.ink}" stroke-width="3"/><text y="${r * 0.46}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${r * 1.4}" fill="#fff">${ch}</text></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };

const duskSky = (p) => grad(`${p}-sky`, [[0, "#2a2a5a"], [0.55, "#a84a3a"], [1, "#f0a05a"]]);
const malaya = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
  <path d="M0 1260 L160 1100 L300 1180 L470 1020 L640 1170 L820 1060 L1080 1200 L1080 1440 L0 1440 Z" fill="#4a3a4a" opacity="0.7"/>
  ${tree(70, 1450, 0.9, "#3f6a3a", "#28452a")}${tree(1010, 1450, 0.85, "#3f6a3a", "#28452a")}
  <rect x="0" y="1430" width="${W}" height="1000" fill="#6a6a3a"/>`;
const panel = (id, inner, hidden = false) => `<g transform="translate(540,1010)"><g id="${id}" transform="${T(0, 0, 0, hidden ? 0.3 : 1)}"${hidden ? ' style="opacity:0"' : ""}>
  <rect x="-360" y="-230" width="720" height="440" rx="36" fill="rgba(20,10,30,0.82)" stroke="${C.gold}" stroke-width="6"/>${inner}</g></g>`;

export const SCENES = [
  // ---------- 1. hook: Lakshman knew only the anklets... why? ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-pn`, 0.1, 0.3, 1); k.mv(`${p}-pn`, 0.1, 0.5, { s: 1 }, "back.out(1.6)");
      pop(k, `${p}-x1`, L.w(1, "कुंडल") - 0.1);
      pop(k, `${p}-x2`, L.w(1, "कुंडल") + 0.2);
      const tA = L.w(1, "पायल") - 0.2;
      pop(k, `${p}-ok`, tA);
      k.op(`${p}-ag`, tA, 0.3, 1);
      k.mood(`${p}-l`, tA, "smile");
      k.mv(`${p}-l-al`, L.w(1, "कुंडल"), 0.4, -26); k.mv(`${p}-l-ar`, L.w(1, "कुंडल") + 0.05, 0.4, 26);
      k.mv(`${p}-l-h`, tA, 0.4, -8);
      k.label(`${p}-tq`, L.w(1, "क्यों") - 0.2);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`, "#fff0b0"),
        art: `${malaya(p)}
          ${panel(`${p}-pn`, `${jewelCloth(p)}<circle id="${p}-ag" cx="0" cy="60" r="150" fill="url(#${p}-gl)" style="opacity:0"/>${anklet(-70, 60)}${anklet(70, 60)}
            ${mark(`${p}-x1`, -165, -150, "✗", "#8a2a2a", 26)}${mark(`${p}-x2`, 150, -150, "✗", "#8a2a2a", 26)}${mark(`${p}-ok`, 180, 70, "✓", "#2a7a3a", 34)}`, true)}
          ${lakEx(`${p}-l`, 540, 1580, 0.92)}`,
        html: tag(`${p}-tq`, 540, 440, "पर क्यों?", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. flashback: a woman in Ravana's chariot drops her ornaments to the vanaras ----------
  {
    id: "s02",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-vw`, 0, dur, { x: 100 }, "none");
      k.osc(`${p}-vb`, 0, 0.6, Math.floor(dur / 0.6) - 1, { dy: -12 });
      k.label(`${p}-tc`, L.w(1, "राम") - 0.2, L(2) - 0.15);
      k.mood(`${p}-s`, 0.3, "open");
      k.mv(`${p}-s-ar`, L.w(1, "राम") - 0.2, 0.4, -140, "back.out(1.4)");
      for (const v of ["sg", "hn", "v1", "v2"]) k.mood(`${p}-${v}`, L.w(1, "राम"), "open");
      k.mv(`${p}-sg-ar`, L.w(1, "राम") + 0.2, 0.4, -140);
      // the bundle falls
      const tB = L.w(2, "गहने") - 0.6;
      k.op(`${p}-bd`, tB, 0.1, 1);
      k.mv(`${p}-bd`, tB, 1.5, { x: 250, y: 1200, r: 300 }, "power2.in");
      k.label(`${p}-tb`, tB + 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#7a9ab8"], [1, "#f0d8a8"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${[[200, 620], [860, 700]].map(([x, y]) => cloud(x, y, 1.4, "#ffffff", 0.7)).join("")}
          <g id="${p}-vw" transform="${T(860, 1000, 0, 0.72)}"><g id="${p}-vb" transform="${T()}">${vimana(`${CAST.ravana(`${p}-r`, -60, -56, 0.6, { hs: 1.3 })}${sitaEx(`${p}-s`, 80, -56, 0.52, { mood: "sad" })}`)}</g></g>
          <path d="M0 1460 L0 1260 L110 1225 L380 1240 L560 1460 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#8a9a5a"/>
          ${CAST.vanara(`${p}-v1`, 60, 1250, 0.46, { hs: HS })}${sugEx(`${p}-sg`, 170, 1236, 0.5)}${hanEx(`${p}-hn`, 280, 1236, 0.5, { propR: "" })}${CAST.vanara(`${p}-v2`, 380, 1246, 0.46, { hs: HS })}
          <g id="${p}-bd" transform="${T(518, 960, 0, 0.9)}" style="opacity:0">${BUNDLE}</g>
          <rect width="${W}" height="2400" fill="#a8742a" opacity="0.2" style="mix-blend-mode:multiply"/>`,
        html: tag(`${p}-tc`, 540, 440, "\"राम! लक्ष्मण!\"", "red") + tag(`${p}-tb`, 540, 440, "गहने नीचे गिराए"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Ram presses the ornaments to his chest and weeps ----------
  {
    id: "s03",
    pre: 1.2,
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-sg`, 0.1, 1.3, 720, 0.45);
      k.mv(`${p}-sg-al`, 1.3, 0.4, 70);
      const tC = L.w(1, "सीने") - 0.6;
      k.op(`${p}-hb`, tC, 0.1, 0);
      k.op(`${p}-cb`, tC, 0.2, 1);
      k.mv(`${p}-sg-al`, tC + 0.2, 0.4, -26); k.mv(`${p}-sg-ar`, tC + 0.25, 0.4, 26);
      k.mood(`${p}-r`, tC, "sad");
      k.mv(`${p}-r-h`, tC + 0.2, 0.5, 8);
      cry(k, `${p}-t0`, 382, 1338, tC + 0.4, 7);
      cry(k, `${p}-t1`, 418, 1338, tC + 0.7, 6);
      k.mood(`${p}-l`, tC + 0.5, "sad"); k.mood(`${p}-sg`, tC + 0.6, "sad");
      k.label(`${p}-tr`, L.w(1, "रो") - 0.2);
      return {
        defs: duskSky(p),
        art: `${malaya(p)}
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}
          ${ramEx(`${p}-r`, 400, 1580, 0.95, { seated: true, aL: -34, aR: 34 })}
          <g id="${p}-cb" transform="${T(400, 1452, 0, 1.1)}" style="opacity:0">${BUNDLE}</g>
          ${sugEx(`${p}-sg`, 1200, 1580, 0.9, { propL: handBundle(`${p}-hb`) })}
          ${tear(`${p}-t0`, 382, 1338)}${tear(`${p}-t1`, 418, 1338)}`,
        html: tag(`${p}-tr`, 540, 560, "राम रो पड़े", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Lakshman: not the earrings or armlets, only the anklets ----------
  {
    id: "s04",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-pn`, 0.1, 0.3, 1); k.mv(`${p}-pn`, 0.1, 0.5, { s: 1 }, "back.out(1.6)");
      const tK = L.w(1, "कुंडल") - 0.2;
      pop(k, `${p}-q1`, tK); pop(k, `${p}-q2`, L.w(1, "बाजूबंद") - 0.2);
      k.mv(`${p}-l-h`, tK, 0.4, 8);
      k.label(`${p}-tk`, tK, L(2) - 0.15);
      const tA = L.w(2, "पायल") - 0.3;
      k.op(`${p}-ag`, tA, 0.3, 1); pop(k, `${p}-ok`, tA);
      k.mv(`${p}-l-h`, tA, 0.4, 0); k.mood(`${p}-l`, tA, "smile");
      k.mv(`${p}-l-al`, tA, 0.4, -26); k.mv(`${p}-l-ar`, tA + 0.05, 0.4, 26);
      // memory: bowing at her feet every day
      const tF = L.w(2, "चरण") - 0.6;
      k.op(`${p}-pn`, tF, 0.3, 0);
      k.op(`${p}-fb`, tF, 0.3, 1); k.mv(`${p}-fb`, tF, 0.5, { s: 1 }, "back.out(1.6)");
      k.mv(`${p}-fl-h`, tF + 0.4, 0.5, -12);
      const sk = sparkles(p, 8, 540, 1060, 260);
      sk.run(k, tF + 0.3, 1.2);
      k.label(`${p}-tf`, tF + 0.2);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`, "#fff0b0") + rgrad(`${p}-mg`, [[0, "#fff6d8", 0.95], [1, "#f6e0c0", 0.9]]),
        art: `${malaya(p)}
          ${panel(`${p}-pn`, `${jewelCloth(p)}<circle id="${p}-ag" cx="0" cy="60" r="150" fill="url(#${p}-gl)" style="opacity:0"/>${anklet(-70, 60)}${anklet(70, 60)}
            ${mark(`${p}-q1`, -165, -150, "?", "#6a6a7a", 26)}${mark(`${p}-q2`, 150, -150, "?", "#6a6a7a", 26)}${mark(`${p}-ok`, 180, 70, "✓", "#2a7a3a", 34)}`, true)}
          ${panel(`${p}-fb`, `<rect x="-350" y="-220" width="700" height="420" rx="30" fill="url(#${p}-mg)"/>
            ${sitaEx(`${p}-fs`, -90, 170, 0.62, { hat: "queen", lower: "#b3122a", upper: "#7a0d1e", border: C.goldL })}
            ${lakEx(`${p}-fl`, 120, 170, 0.6, { seated: true, aL: -26, aR: 26, back: null })}`, true)}
          ${ramEx(`${p}-r`, 300, 1580, 0.9, { seated: true, aL: -34, aR: 34, mood: "sad" })}
          ${lakEx(`${p}-l`, 760, 1580, 0.92)}
          ${sk.art}`,
        html: tag(`${p}-tk`, 540, 440, "कुंडल? बाजूबंद?") + tag(`${p}-tf`, 540, 440, "रोज़ चरण छूते थे", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Sugriva's promise; Ram wipes his tears and embraces him ----------
  {
    id: "s05",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-sg-ar`, 0.4, 0.5, -150, "back.out(1.4)");
      k.mood(`${p}-sg`, 0.4, "open");
      k.osc(`${p}-v1`, L.w(1, "सीता"), 0.25, 5, { dy: -30 }); k.osc(`${p}-v2`, L.w(1, "सीता") + 0.15, 0.25, 5, { dy: -30 });
      k.label(`${p}-tv`, L.w(1, "सीता") - 0.2, L(2) - 0.15);
      const tE = L.w(2, "गले") - 0.6;
      k.op(`${p}-a`, tE, 0.35, 0); k.op(`${p}-e`, tE, 0.35, 1);
      k.op(`${p}-glow`, tE, 0.5, 1);
      k.osc(`${p}-es-tl`, tE + 0.3, 0.35, 7, 14);
      const sk = sparkles(p, 8, 560, 1250, 300);
      sk.run(k, tE + 0.3, 1.4);
      k.label(`${p}-tg`, tE + 0.2);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`),
        art: `${malaya(p)}
          <circle id="${p}-glow" cx="560" cy="1260" r="320" fill="url(#${p}-gl)" style="opacity:0"/>
          ${CAST.vanara(`${p}-v1`, 990, 1560, 0.6, { hs: HS })}${CAST.vanara(`${p}-v2`, 880, 1545, 0.55, { hs: HS })}
          <g id="${p}-a">${lakEx(`${p}-l`, 130, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}${sugEx(`${p}-sg`, 650, 1580, 0.9)}</g>
          <g id="${p}-e" style="opacity:0">${lakEx(`${p}-l2`, 150, 1580, 0.84)}
            ${sugEx(`${p}-es`, 640, 1580, 0.9, { aL: 64, aR: -8 })}
            ${ramEx(`${p}-er`, 470, 1580, 0.92, { aR: -64, aL: 8 })}</g>
          ${sk.art}`,
        html: tag(`${p}-tv`, 540, 440, "\"सीता जी को ढूँढ लाऊँगा!\"", "red") + tag(`${p}-tg`, 540, 440, "राम ने गले लगाया"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: Vali and the demon Mayavi; Jai Shri Ram ----------
  {
    id: "s06",
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
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <path d="M-150 130 L-150 -60 Q0 -220 150 -60 L150 130 Z" fill="#100814" stroke="#6a5a4a" stroke-width="14"/>
            ${vali(`${p}-nv`, -210, 130, 0.58, { aR: -70 })}
            ${CAST.demon(`${p}-nd`, 210, 130, 0.6, "#3a5a8a", { hs: HS, aL: 70 })}
            <text y="180" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 21: बाली और मायावी</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
