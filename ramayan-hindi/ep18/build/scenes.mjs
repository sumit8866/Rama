// Episode 18 (Hindi reel): Ram meets Hanuman. Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays, kund, flames } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, flicker, darkTree } from "../../reel-kit.mjs";

reseed(1818);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
// Hanuman in disguise: a young brahmin with a topknot and a saffron shawl
const brahmin = (id, x, y, s, extra = {}) => CAST.sage(id, x, y, s, { hs: HS, beard: null, hair: "#1b1209", skin: "#d4935e", lower: "#f3e9d2", ...extra });

const heart = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.5)}" style="opacity:0"><path d="M0 14 C-30 -6 -18 -30 0 -16 C18 -30 30 -6 0 14 Z" fill="#e8456a" stroke="${C.ink}" stroke-width="2"/></g>`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
const bang = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.4)}" style="opacity:0"><text text-anchor="middle" font-family="Mukta" font-weight="800" font-size="90" fill="#ffd23a" stroke="#3a1408" stroke-width="4">!</text></g>`;
const pop = (k, id, t, hold = 1.2) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); k.op(id, t + hold, 0.2, 0); };

const daySky = (p) => grad(`${p}-sky`, [[0, "#6aa8d8"], [1, "#f3e6c0"]]);
const pampa = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
  <g id="${p}-cl" transform="${T()}">${[[200, 640], [760, 760], [1150, 600]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.8)).join("")}</g>
  <path d="M0 1300 L180 1120 L330 1220 L520 1040 L700 1190 L880 1080 L1080 1230 L1080 1440 L0 1440 Z" fill="#8a7a6a" opacity="0.55"/>
  <rect x="0" y="1380" width="${W}" height="70" fill="#5a9ac8"/><path d="M80 1410 L200 1410 M480 1420 L640 1420 M840 1405 L980 1405" stroke="#d8f0ff" stroke-width="5" opacity="0.7"/>
  ${tree(60, 1450, 0.85)}${tree(1030, 1450, 0.8)}
  <rect x="0" y="1440" width="${W}" height="1000" fill="#8a9a5a"/>`;
// Rishyamuk: a rocky mountain on the right with a ledge at the top (art y ~1010)
const rishyamuk = (op = 1) => `<g opacity="${op}"><path d="M420 1450 L560 1220 L640 1090 L700 1020 L900 1010 L980 1080 L1080 1160 L1080 1450 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>
  <path d="M560 1220 L640 1240 L700 1180 M700 1020 L760 1080 L820 1060 M900 1010 L940 1090 L1010 1110" stroke="${C.ink}" stroke-width="3" fill="none" opacity="0.45"/>
  <path d="M620 1300 Q700 1260 800 1300 M860 1220 Q940 1190 1040 1230" stroke="#5a4a3a" stroke-width="6" fill="none" opacity="0.6"/></g>`;

export const SCENES = [
  // ---------- 1. hook: an ordinary brahmin... who is really Hanuman ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 2.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.label(`${p}-tb`, 0.4, L.w(1, "हनुमान") - 0.25);
      k.osc(`${p}-b-h`, 0.6, 0.5, 3, 5);
      const tH = L.w(1, "हनुमान") - 0.3;
      k.op(`${p}-flash`, tH, 0.08, 0.55); k.op(`${p}-flash`, tH + 0.08, 0.4, 0);
      k.op(`${p}-b`, tH, 0.15, 0);
      k.op(`${p}-hn`, tH, 0.2, 1);
      k.mv(`${p}-hn`, tH, 0.5, { s: 1.05 }, "back.out(1.8)");
      k.op(`${p}-glow`, tH, 0.4, 1);
      k.mv(`${p}-hn-al`, tH + 0.5, 0.4, -26);
      k.osc(`${p}-hn-tl`, tH + 0.4, 0.4, 7, 14);
      k.label(`${p}-th`, tH + 0.1);
      const sk = sparkles(p, 10, 540, 1250, 360);
      sk.run(k, tH, 1.2);
      return {
        defs: daySky(p) + glowDef(`${p}-gl`),
        art: `${pampa(p)}
          <circle id="${p}-glow" cx="540" cy="1260" r="320" fill="url(#${p}-gl)" style="opacity:0"/>
          ${brahmin(`${p}-b`, 540, 1580, 1.0, { aL: -26, aR: 26 })}
          ${hanEx(`${p}-hn`, 540, 1580, 0.85, { hidden: true })}
          ${sk.art}`,
        html: tag(`${p}-tb`, 540, 560, "एक साधारण ब्राह्मण?") + tag(`${p}-th`, 540, 440, "हनुमान!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Sugriva hides on Rishyamuk; two archers below scare him ----------
  {
    id: "s02",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -200 }, "none");
      k.label(`${p}-ts`, L.w(1, "सुग्रीव") - 0.1, L(2) - 0.15);
      k.osc(`${p}-sg-tl`, 0.4, 0.5, 5, 10);
      k.walk(`${p}-r`, L(2) - 0.4, dur - 0.3, 300, 0.45);
      k.walk(`${p}-l`, L(2) - 0.3, dur - 0.3, 150, 0.45);
      const tD = L.w(2, "डर") - 0.3;
      k.mood(`${p}-sg`, tD, "open"); k.mood(`${p}-v1`, tD + 0.1, "open"); k.mood(`${p}-v2`, tD + 0.15, "open");
      pop(k, `${p}-ex`, tD);
      shake(k, p, tD, 5, 7);
      k.mv(`${p}-sg-al`, tD + 0.1, 0.3, 140); k.mv(`${p}-sg-ar`, tD + 0.1, 0.3, -140);
      k.label(`${p}-tf`, tD + 0.1);
      return {
        defs: daySky(p),
        art: `${pampa(p)}${rishyamuk()}
          ${CAST.vanara(`${p}-v1`, 730, 1015, 0.5, { hs: HS })}${CAST.vanara(`${p}-v2`, 960, 1050, 0.5, { hs: HS })}
          ${sugEx(`${p}-sg`, 840, 1012, 0.62)}
          ${bang(`${p}-ex`, 840, 700)}
          ${lakEx(`${p}-l`, -260, 1580, 0.62)}${ramEx(`${p}-r`, -120, 1580, 0.66)}`,
        html: tag(`${p}-ts`, 540, 440, "सुग्रीव") + tag(`${p}-tf`, 540, 440, "बाली के भेजे वीर?", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Hanuman comes as a brahmin and asks who they are ----------
  {
    id: "s03",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-b-tl`, 0, 0.01, 0);
      k.walk(`${p}-b`, 0.2, L.end(1) - 0.2, 740, 0.48);
      k.label(`${p}-th`, L.w(1, "हनुमान") - 0.1, L(2) - 0.15);
      // the tail gives him away for a moment
      const tT = L.w(1, "ब्राह्मण") - 0.2;
      k.op(`${p}-b-tl`, tT, 0.15, 1); k.osc(`${p}-b-tl`, tT, 0.2, 3, 16); k.op(`${p}-b-tl`, tT + 0.8, 0.15, 0);
      pop(k, `${p}-ex`, tT + 0.1, 0.8);
      // he folds his hands and asks
      const tA = L(2);
      k.mv(`${p}-b-al`, tA, 0.4, -26); k.mv(`${p}-b-ar`, tA + 0.05, 0.4, 26);
      k.mv(`${p}-b-h`, tA + 0.2, 0.4, -6);
      k.mood(`${p}-b`, L.w(2, "कौन") - 0.3, "open");
      k.label(`${p}-tq`, L.w(2, "कौन") - 0.2);
      return {
        defs: daySky(p),
        art: `${pampa(p)}
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}
          ${brahmin(`${p}-b`, 1260, 1580, 0.9, { tail: "#d9702a" })}
          ${bang(`${p}-ex`, 860, 1150)}`,
        html: tag(`${p}-th`, 540, 560, "ब्राह्मण के भेष में हनुमान") + tag(`${p}-tq`, 540, 560, "\"आप कौन हैं?\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. "I am Ram"; the true form; at the Lord's feet ----------
  {
    id: "s04",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-r`, L(1) + 0.3, "open");
      k.mv(`${p}-r-ar`, L(1) + 0.3, 0.4, 30);
      k.mood(`${p}-r`, L.end(1), "smile");
      k.label(`${p}-tr`, L.w(1, "राम") - 0.2, L(2) - 0.15);
      // the true form
      const tF = L.w(2, "असली") - 0.3;
      k.op(`${p}-flash`, tF, 0.08, 0.55); k.op(`${p}-flash`, tF + 0.08, 0.4, 0);
      k.op(`${p}-b`, tF, 0.15, 0);
      k.op(`${p}-hn`, tF, 0.2, 1);
      k.mv(`${p}-hn`, tF, 0.5, { s: 0.9 }, "back.out(1.8)");
      k.osc(`${p}-hn-tl`, tF + 0.3, 0.4, 5, 14);
      k.label(`${p}-tf`, tF + 0.1, L.w(2, "चरणों") - 0.3);
      const sk = sparkles(p, 10, 740, 1250, 320);
      sk.run(k, tF, 1.2);
      // at his feet
      const tP = L.w(2, "चरणों") - 0.4;
      k.op(`${p}-hn`, tP, 0.3, 0);
      k.op(`${p}-hk`, tP, 0.3, 1);
      k.mv(`${p}-hk-h`, tP + 0.3, 0.5, -10);
      k.mv(`${p}-r-ar`, tP + 0.4, 0.5, -60, "back.out(1.4)");
      k.op(`${p}-glow`, tP, 0.5, 1);
      k.label(`${p}-tp`, tP + 0.1);
      cry(k, `${p}-t0`, 574, 1388, tP + 0.8, 4);
      return {
        defs: daySky(p) + glowDef(`${p}-gl`),
        art: `${pampa(p)}
          <circle id="${p}-glow" cx="420" cy="1280" r="300" fill="url(#${p}-gl)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}
          ${brahmin(`${p}-b`, 740, 1580, 0.9, { aL: -26, aR: 26 })}
          ${hanEx(`${p}-hn`, 740, 1580, 0.75, { hidden: true })}
          ${hanEx(`${p}-hk`, 590, 1590, 0.82, { hidden: true, seated: true, propR: "", aL: -26, aR: 26 })}
          ${tear(`${p}-t0`, 574, 1388)}
          ${sk.art}`,
        html: tag(`${p}-tr`, 540, 560, "\"मैं राम हूँ\"") + tag(`${p}-tf`, 540, 440, "असली रूप!", "red") + tag(`${p}-tp`, 540, 560, "प्रभु के चरणों में"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Ram lifts him up and embraces him ----------
  {
    id: "s05",
    extra: 2.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tE = L.w(1, "गले") - 0.6;
      k.mv(`${p}-r-ar`, 0.4, 0.5, -60);
      k.op(`${p}-a`, tE, 0.35, 0); k.op(`${p}-e`, tE, 0.35, 1);
      k.op(`${p}-glow`, tE, 0.5, 1);
      k.label(`${p}-tg`, tE + 0.3);
      for (let i = 0; i < 5; i++) { const t = tE + 0.5 + i * 0.3; k.op(`${p}-hr${i}`, t, 0.15, 1); k.mv(`${p}-hr${i}`, t, 1.4, { dy: -260, s: 1 }, "power1.out"); k.op(`${p}-hr${i}`, t + 1.1, 0.3, 0); }
      k.osc(`${p}-eh-tl`, tE + 0.4, 0.35, 9, 14);
      return {
        defs: daySky(p) + glowDef(`${p}-gl`),
        art: `${pampa(p)}
          <circle id="${p}-glow" cx="560" cy="1260" r="320" fill="url(#${p}-gl)" style="opacity:0"/>
          <g id="${p}-a">${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}
            ${hanEx(`${p}-h`, 590, 1590, 0.82, { seated: true, propR: "", aL: -26, aR: 26 })}</g>
          <g id="${p}-e" style="opacity:0">${lakEx(`${p}-l2`, 150, 1580, 0.84)}
            ${hanEx(`${p}-eh`, 640, 1580, 0.86, { propR: "", aL: 64, aR: -8 })}
            ${ramEx(`${p}-er`, 470, 1580, 0.92, { aR: -64, aL: 8 })}</g>
          ${[0, 1, 2, 3, 4].map((i) => heart(`${p}-hr${i}`, 470 + i * 40, 1200)).join("")}`,
        html: tag(`${p}-tg`, 540, 560, "राम ने गले लगा लिया", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Hanuman carries Ram and Lakshman on his shoulders up the mountain ----------
  {
    id: "s06",
    extra: 2.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -200 }, "none");
      k.label(`${p}-tk`, L.w(1, "कंधों") - 0.2, L.end(1) - 0.3);
      const t0 = L.w(1, "कंधों");
      k.mv(`${p}-grp`, t0, 0.9, { x: 470, y: 1400 }, "sine.inOut");
      k.mv(`${p}-grp`, t0 + 0.9, 0.9, { x: 640, y: 1170, s: 0.7 }, "sine.inOut");
      k.osc(`${p}-hc-tl`, t0, 0.3, 9, 14);
      k.mood(`${p}-sg`, t0 + 1.6, "open");
      k.mv(`${p}-sg-al`, t0 + 1.6, 0.4, -26); k.mv(`${p}-sg-ar`, t0 + 1.65, 0.4, 26);
      k.label(`${p}-ts`, L.end(1) - 0.1);
      return {
        defs: daySky(p),
        art: `${pampa(p)}${rishyamuk()}
          ${sugEx(`${p}-sg`, 900, 1012, 0.56)}
          <g id="${p}-grp" transform="${T(240, 1590, 0, 0.82)}">
            ${hanEx(`${p}-hc`, 0, 0, 1, { propR: "", aL: 112, aR: -112 })}
            ${ramEx(`${p}-cr`, -118, -238, 0.44, { seated: true, aL: -20, aR: 20, back: null })}
            ${lakEx(`${p}-cl2`, 118, -238, 0.42, { seated: true, aL: -20, aR: 20, back: null })}
          </g>`,
        html: tag(`${p}-tk`, 540, 440, "प्रभु कंधों पर", "red") + tag(`${p}-ts`, 540, 440, "सुग्रीव के पास"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the friendship of Ram and Sugriva; Jai Shri Ram ----------
  {
    id: "s07",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-next`, L(1) - 0.2, 0.3, 1);
      k.mv(`${p}-next`, L(1) - 0.2, 0.5, { s: 0.9 }, "back.out(1.8)");
      flicker(k, `${p}-nf`, L(1) - 0.2, L(2));
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
            <rect x="-400" y="-300" width="800" height="520" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <g transform="translate(0,120) scale(0.45)">${kund(0, 0)}</g>${flames(`${p}-nf`, 0, 86, 0.45)}
            ${ramEx(`${p}-nr`, -170, 130, 0.6, { back: null, aR: -62 })}
            ${sugEx(`${p}-ns`, 170, 130, 0.6, { aL: 62 })}
            <text y="190" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="52" fill="#ffd23a">भाग 19: राम-सुग्रीव मित्रता</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 290, 1460, 0.9)}${ramEx(`${p}-hr`, 560, 1460, 1.02)}${hanEx(`${p}-hh`, 830, 1460, 0.9, { aL: -26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
