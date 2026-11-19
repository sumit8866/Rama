// Episode 16 (Hindi reel): Jatayu's sacrifice. Vertical 1080x1920.
import { C, T, CAST, PROP, grad, rgrad, tree, hut, cloud, rays, kund } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, flames, flicker, darkTree } from "../../reel-kit.mjs";

reseed(443);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", aL: -26, aR: 26, ...extra });
const SWORD = `<path d="M2 124 L2 -60" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><path d="M2 124 L2 -60" stroke="#cfd3d6" stroke-width="5" stroke-linecap="round"/><path d="M-12 110 L16 110" stroke="${C.gold}" stroke-width="6"/>`;
const vimana = (inner) => `<g>
  <path d="M-120 -50 L-120 -230 Q0 -330 120 -230 L120 -50" fill="none" stroke="${C.gold}" stroke-width="10"/><circle cy="-300" r="16" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/>
  ${inner}
  <path d="M-230 -10 L-340 -90 L-250 -40 Z M230 -10 L340 -90 L250 -40 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M-240 0 Q0 96 240 0 L210 -56 L-210 -56 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="5"/>
  <path d="M-210 -56 L210 -56" stroke="${C.verm}" stroke-width="9"/>${[-150, -75, 0, 75, 150].map((x) => `<circle cx="${x}" cy="-10" r="10" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/>`).join("")}
</g>`;
// Jatayu, facing right; wings pivot at the body
const jatayu = (id, folded = false) => `<g id="${id}" transform="${T()}">
  <g id="${id}-wl" transform="rotate(${folded ? -38 : 0})"><path d="M-10 -10 Q-120 -150 -280 -90 Q-190 -60 -220 -20 Q-130 -30 -110 10 Z" fill="#7a4a22" stroke="${C.ink}" stroke-width="4"/></g>
  <path d="M-60 10 L-130 40 L-110 0 Z" fill="#5a3a1a" stroke="${C.ink}" stroke-width="3"/>
  <ellipse rx="74" ry="40" fill="#6b4423" stroke="${C.ink}" stroke-width="4"/>
  <g id="${id}-wr" transform="rotate(${folded ? -52 : 0})"><path d="M10 -10 Q-40 -170 -180 -150 Q-110 -110 -130 -70 Q-60 -70 -40 -20 Z" fill="#8a5a2b" stroke="${C.ink}" stroke-width="4"/></g>
  <path d="M60 -10 Q74 -40 84 -46" stroke="#f3efe6" stroke-width="22" stroke-linecap="round"/>
  <circle cx="92" cy="-50" r="26" fill="#f3efe6" stroke="${C.ink}" stroke-width="4"/>
  <path d="M112 -56 L150 -40 L112 -34 Z" fill="#e2b33e" stroke="${C.ink}" stroke-width="3"/>
  <g id="${id}-eo"><circle cx="100" cy="-58" r="4" fill="${C.ink}"/></g>
  <path d="M-20 36 L-30 60 M10 38 L4 62" stroke="#e2b33e" stroke-width="6" stroke-linecap="round"/>
</g>`;
const flap = (k, id, t0, t1, per = 0.3) => { const n = Math.max(1, Math.floor((t1 - t0) / per) - 1); k.osc(`${id}-wl`, t0, per, n, 28); k.osc(`${id}-wr`, t0, per, n, -24); };
const feather = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -20 Q10 0 0 20 Q-10 0 0 -20 Z" fill="#7a4a22" stroke="${C.ink}" stroke-width="2"/></g>`;
const skyDefs = (p) => grad(`${p}-sky`, [[0, "#5a3a6a"], [1, "#f0a06a"]]);
const sky = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/><g id="${p}-cl" transform="${T()}">${[[200, 700], [700, 860], [1200, 760], [450, 1300], [1000, 1400]].map(([x, y]) => cloud(x, y, 1.6, "#ffffff", 0.75)).join("")}</g>`;

export const SCENES = [
  // ---------- 1. hook: an old bird against ten-headed Ravana ----------
  {
    id: "s01",
    pre: 0.3,
    extra: 2.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -400 }, "none");
      k.osc(`${p}-vw`, 0, 0.6, Math.floor(dur / 0.6) - 1, { dy: -12 });
      k.op(`${p}-jw`, 0.2, 0.3, 1);
      k.mv(`${p}-jw`, 0.2, 1.2, { x: 720, y: 960 }, "power2.out");
      flap(k, `${p}-jt`, 0.2, dur);
      k.label(`${p}-tj`, 0.8, L.w(1, "रावण") - 0.3);
      k.mood(`${p}-vr`, L.w(1, "रावण") - 0.2, "open");
      k.label(`${p}-tr`, L.w(1, "रावण") - 0.1);
      return {
        defs: skyDefs(p),
        art: `${sky(p)}
          <g id="${p}-vw" transform="${T(330, 1330, 0, 0.9)}">${vimana(`${CAST.ravana(`${p}-vr`, -60, -56, 0.6, { hs: 1.3 })}${sitaEx(`${p}-vs`, 80, -56, 0.52, { mood: "sad" })}`)}</g>
          <g id="${p}-jw" transform="${T(1300, 500, 0, 1.3)}" style="opacity:0"><g transform="scale(-1,1)">${jatayu(`${p}-jt`)}</g></g>`,
        html: tag(`${p}-tj`, 700, 440, "बूढ़ा जटायु") + tag(`${p}-tr`, 540, 440, "जटायु vs रावण!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. the fight; Ravana's sword ----------
  {
    id: "s02",
    extra: 3.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -400 }, "none");
      flap(k, `${p}-jt`, 0, L(2) + 0.6, 0.22);
      // he dives at Ravana, again and again
      for (let i = 0; i < 3; i++) {
        const t = 0.4 + i * 1.1;
        k.mv(`${p}-jw`, t, 0.4, { x: 520, y: 1120 }, "power2.in");
        k.mv(`${p}-jw`, t + 0.4, 0.5, { x: 720, y: 960 }, "power2.out");
        k.op(`${p}-ft${i}`, t + 0.4, 0.1, 1); k.mv(`${p}-ft${i}`, t + 0.4, 1.2, { dy: 300, r: 200 }, "power1.in"); k.op(`${p}-ft${i}`, t + 1.2, 0.3, 0);
        k.mv(`${p}-vr-b`, t + 0.4, 0.15, { r: -8 }); k.mv(`${p}-vr-b`, t + 0.55, 0.2, { r: 0 });
      }
      k.label(`${p}-tc`, L.w(1, "पंजों") - 0.1, L(2) - 0.15);
      // the sword
      const tS = L.w(2, "तलवार") - 0.3;
      k.mv(`${p}-vr-ar`, tS, 0.3, -160, "power2.out");
      k.mv(`${p}-jw`, tS + 0.2, 0.3, { x: 560, y: 1080 }, "power2.in");
      k.mv(`${p}-vr-ar`, tS + 0.5, 0.15, -40, "power3.in");
      k.op(`${p}-slash`, tS + 0.6, 0.05, 1); k.op(`${p}-slash`, tS + 0.7, 0.3, 0);
      k.op(`${p}-flash`, tS + 0.6, 0.05, 0.6); k.op(`${p}-flash`, tS + 0.65, 0.4, 0);
      shake(k, p, tS + 0.6, 6, 10);
      k.mv(`${p}-jw`, tS + 0.8, 1.6, { x: 700, y: 2200, r: 200 }, "power2.in");
      k.label(`${p}-ts`, tS + 0.1);
      return {
        defs: skyDefs(p),
        art: `${sky(p)}
          <g id="${p}-vw" transform="${T(330, 1330, 0, 0.9)}">${vimana(`${CAST.ravana(`${p}-vr`, -60, -56, 0.6, { hs: 1.3, propR: SWORD, aR: -20 })}${sitaEx(`${p}-vs`, 80, -56, 0.52, { mood: "open" })}`)}</g>
          <g id="${p}-jw" transform="${T(720, 960, 0, 1.3)}"><g transform="scale(-1,1)">${jatayu(`${p}-jt`)}</g></g>
          ${[0, 1, 2].map((i) => feather(`${p}-ft${i}`, 500 + i * 30, 1040)).join("")}
          <path id="${p}-slash" d="M420 900 Q520 980 600 1100" stroke="#fff6c4" stroke-width="12" fill="none" stroke-linecap="round" style="opacity:0"/>`,
        html: tag(`${p}-tc`, 540, 440, "पंजों से हमला!") + tag(`${p}-ts`, 540, 440, "रावण की तलवार", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Ram returns to an empty hut ----------
  {
    id: "s03",
    extra: 3.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-r`, 0.1, L.w(1, "सूनी") - 0.2, 330, 0.48);
      k.walk(`${p}-l`, 0.2, L.w(1, "सूनी") - 0.2, 150, 0.46);
      const tE = L.w(1, "सूनी") - 0.2;
      k.mood(`${p}-r`, tE, "open"); k.mood(`${p}-l`, tE, "open");
      k.label(`${p}-te`, tE, L(2) - 0.15);
      // searching
      const tS = L(2) - 0.1;
      k.mv(`${p}-r-ar`, tS, 0.4, -100, "back.out(1.6)");
      k.osc(`${p}-r-h`, tS + 0.3, 0.5, 5, 8);
      k.walk(`${p}-r`, tS + 0.4, dur - 0.3, 620, 0.5);
      k.label(`${p}-ts`, L.w(2, "सीता") - 0.2);
      for (let i = 0; i < 3; i++) { const t = tS + 0.5 + i * 0.9; k.op(`${p}-q${i}`, t, 0.2, 1); k.mv(`${p}-q${i}`, t, 0.8, { dy: -60 }, "power1.out"); k.op(`${p}-q${i}`, t + 0.6, 0.3, 0); }
      return {
        defs: grad(`${p}-sky`, [[0, "#7a8a9a"], [1, "#e8dcc0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <rect x="0" y="1150" width="${W}" height="120" fill="#5a8aa8"/>
          ${[30, 990].map((x, i) => tree(x, 1300, 0.8 + i * 0.1, "#6a8a4a", "#4a6a3a")).join("")}
          <rect x="0" y="1270" width="${W}" height="1100" fill="#8a9a5a"/>${hut(800, 1380, 0.8)}
          <path d="M240 1500 Q620 1560 1000 1500" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.2"/>
          ${CAST.lakshman(`${p}-l`, -200, 1580, 0.84, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a" })}
          ${ramEx(`${p}-r`, -40, 1580, 0.9)}
          ${[0, 1, 2].map((i) => `<g id="${p}-q${i}" transform="${T(460 + i * 120, 1080 - i * 40)}" style="opacity:0"><text text-anchor="middle" font-family="Mukta" font-weight="800" font-size="46" fill="#fff3cf" stroke="#3a1408" stroke-width="2">सीता!</text></g>`).join("")}`,
        html: tag(`${p}-te`, 540, 560, "कुटिया सूनी!", "red") + tag(`${p}-ts`, 540, 560, "सीता कहाँ हो?"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the wounded Jatayu points south ----------
  {
    id: "s04",
    extra: 3.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-r`, 0.1, L.w(1, "जटायु") + 0.2, 330, 0.48);
      k.walk(`${p}-l`, 0.2, L.w(1, "जटायु") + 0.2, 150, 0.46);
      k.mood(`${p}-r`, L.w(1, "जटायु"), "open");
      k.label(`${p}-tj`, L.w(1, "जटायु") - 0.1, L.w(1, "दक्षिण") - 0.3);
      k.osc(`${p}-jt-wr`, 0.3, 0.8, 3, -30);
      // "south"
      const tD = L.w(1, "दक्षिण") - 0.3;
      k.op(`${p}-sign`, tD, 0.3, 1);
      k.mv(`${p}-sign`, tD, 0.5, { s: 1 }, "back.out(2)");
      k.osc(`${p}-arw`, tD + 0.5, 0.4, 7, { dx: 20 });
      k.label(`${p}-td`, tD + 0.1);
      return {
        defs: grad(`${p}-fs`, [[0, "#3a5a5a"], [1, "#8aa06a"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-fs)"/>
          ${[60, 300, 540, 780, 1000].map((x, i) => darkTree(x, 1450, 0.8 + (i % 2) * 0.2, "#2a4a2a")).join("")}
          <rect x="0" y="1430" width="${W}" height="1000" fill="#5a6a3a"/>
          <g transform="translate(700,1480) scale(1.05)">${jatayu(`${p}-jt`, true)}</g>
          ${lakEx(`${p}-l`, -200, 1580, 0.82)}${ramEx(`${p}-r`, -40, 1580, 0.88)}
          <g transform="translate(700,1060)"><g id="${p}-sign" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">
            <rect x="-170" y="-70" width="340" height="140" rx="24" fill="rgba(20,10,30,0.8)" stroke="${C.gold}" stroke-width="5"/>
            <text x="-40" y="18" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="52" fill="#ffd23a">दक्षिण</text>
            <g id="${p}-arw" transform="${T()}"><path d="M70 0 L130 0 M110 -20 L135 0 L110 20" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round"/></g></g></g>`,
        html: tag(`${p}-tj`, 540, 560, "घायल जटायु") + tag(`${p}-td`, 540, 560, "रावण सीता को दक्षिण ले गया!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Jatayu dies in Ram's lap; the last rites ----------
  {
    id: "s05",
    extra: 3.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-glow`, 0.2, 0.6, 1);
      const tG = L.w(1, "प्राण") - 0.3;
      k.op(`${p}-jt-eo`, tG, 0.3, 0);
      k.op(`${p}-soul`, tG, 0.4, 1);
      k.mv(`${p}-soul`, tG, 2.0, { y: 700 }, "power1.in");
      k.op(`${p}-soul`, tG + 1.6, 0.4, 0);
      k.mood(`${p}-r`, tG, "sad");
      k.label(`${p}-tg`, L.w(1, "गोद") - 0.1, L(2) - 0.15);
      // the last rites
      const tA = L(2) - 0.1;
      k.op(`${p}-a`, tA, 0.4, 0); k.op(`${p}-b`, tA, 0.4, 1);
      flicker(k, `${p}-pf`, tA, dur);
      k.mv(`${p}-r2-al`, tA + 0.3, 0.4, -26); k.mv(`${p}-r2-ar`, tA + 0.3, 0.4, 26);
      k.mv(`${p}-r2-h`, tA + 0.5, 0.5, 8);
      k.label(`${p}-ta`, L.w(2, "अंतिम") - 0.2);
      const sk = sparkles(p, 8, 540, 1250, 300);
      sk.run(k, tA + 0.6, 1.6);
      return {
        defs: grad(`${p}-fs`, [[0, "#3a4a6a"], [1, "#d8a06a"]]) + glowDef(`${p}-gl`) + glowDef(`${p}-sg`),
        art: `<g id="${p}-a"><rect width="${W}" height="2400" fill="url(#${p}-fs)"/>
            ${[60, 1000].map((x) => darkTree(x, 1450, 0.9, "#2a4a2a")).join("")}
            <rect x="0" y="1430" width="${W}" height="1000" fill="#5a6a3a"/>
            <circle id="${p}-glow" cx="520" cy="1360" r="300" fill="url(#${p}-gl)" style="opacity:0"/>
            ${ramEx(`${p}-r`, 480, 1560, 0.95, { seated: true, aL: -40, aR: 40 })}
            <g transform="translate(560,1470) scale(0.7)">${jatayu(`${p}-jt`, true)}</g>
            ${lakEx(`${p}-l`, 200, 1580, 0.82, { mood: "sad" })}
            <g id="${p}-soul" transform="${T(590, 1400)}" style="opacity:0"><circle r="60" fill="url(#${p}-sg)"/></g></g>
          <g id="${p}-b" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-fs)"/>
            <rect x="0" y="1430" width="${W}" height="1000" fill="#5a6a3a"/>
            <g transform="translate(620,1520) scale(0.75)">${kund(0, 0)}</g>${flames(`${p}-pf`, 620, 1440, 0.7)}
            ${ramEx(`${p}-r2`, 280, 1580, 0.92)}${lakEx(`${p}-l2`, 110, 1580, 0.82, { aL: -26, aR: 26 })}</g>
          ${sk.art}`,
        html: tag(`${p}-tg`, 540, 560, "राम की गोद में") + tag(`${p}-ta`, 540, 560, "पिता समान अंतिम संस्कार"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: Shabari's berries; Jai Shri Ram ----------
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
            <rect x="-380" y="-280" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${CAST.bride(`${p}-sb`, -90, 130, 0.85, "#8a6a4a", { hs: HS, hat: "none", upper: "#6a4a3a", skin: "#a8724a", hair: "#c8c8c8", aL: -40, aR: 40 })}
            <g transform="translate(130,70) scale(1.3)"><path d="M-60 0 L60 0 L46 50 L-46 50 Z" fill="#a8742a" stroke="${C.ink}" stroke-width="3"/>${[[-30, -6], [-6, -10], [18, -6], [40, -2], [-18, -18], [8, -22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#c2361f" stroke="${C.ink}" stroke-width="2"/>`).join("")}</g>
            <text y="175" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="58" fill="#ffd23a">भाग 17: शबरी के बेर</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 360, 1460, 0.95)}${ramEx(`${p}-hr`, 720, 1460, 1.05)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
