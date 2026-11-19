// Episode 15 (Hindi reel): Sita haran. Vertical 1080x1920.
import { C, T, CAST, PROP, grad, rgrad, tree, hut, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, shake, flames, flicker } from "../../reel-kit.mjs";

reseed(421);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", aL: -26, aR: 26, ...extra });
const BOWL = `<path d="M-26 118 Q2 150 30 118 Z" fill="#8a5a2b" stroke="${C.ink}" stroke-width="3"/>`;
const sadhu = (id, x, y, s, extra = {}) => CAST.sage(id, x, y, s, { hs: HS, propL: PROP.staff, propR: BOWL, aR: -40, ...extra });
const alms = `<g><path d="M-40 0 Q0 34 40 0 Z" fill="#c98a2a" stroke="${C.ink}" stroke-width="3"/><circle cx="-14" cy="-6" r="10" fill="#e8364a"/><circle cx="10" cy="-8" r="9" fill="#f7d77a"/><circle cx="-2" cy="-14" r="8" fill="#7aa64a"/></g>`;
const puff = (id, x, y) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">${[[-50, 0, 80], [50, -10, 74], [0, -70, 90], [-40, -140, 60], [40, -150, 64]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#d8c8e8" opacity="0.9"/>`).join("")}</g></g>`;
const puffAt = (k, id, t) => { k.op(id, t, 0.12, 1); k.mv(id, t, 0.5, { s: 1.2 }, "power2.out"); k.op(id, t + 0.4, 0.4, 0); };
// the Pushpak vimana: a flying golden chariot (people drawn inside)
const vimana = (inner) => `<g>
  <path d="M-120 -50 L-120 -230 Q0 -330 120 -230 L120 -50" fill="none" stroke="${C.gold}" stroke-width="10"/><circle cy="-300" r="16" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/>
  ${inner}
  <path d="M-230 -10 L-340 -90 L-250 -40 Z M230 -10 L340 -90 L250 -40 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M-240 0 Q0 96 240 0 L210 -56 L-210 -56 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="5"/>
  <path d="M-210 -56 L210 -56" stroke="${C.verm}" stroke-width="9"/>${[-150, -75, 0, 75, 150].map((x) => `<circle cx="${x}" cy="-10" r="10" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/>`).join("")}
</g>`;
const jatayu = (id) => `<g id="${id}" transform="${T()}">
  <g id="${id}-wl" transform="rotate(0)"><path d="M-10 -10 Q-120 -150 -280 -90 Q-190 -60 -220 -20 Q-130 -30 -110 10 Z" fill="#7a4a22" stroke="${C.ink}" stroke-width="4"/></g>
  <path d="M-60 10 L-130 40 L-110 0 Z" fill="#5a3a1a" stroke="${C.ink}" stroke-width="3"/>
  <ellipse rx="74" ry="40" fill="#6b4423" stroke="${C.ink}" stroke-width="4"/>
  <g id="${id}-wr" transform="rotate(0)"><path d="M10 -10 Q-40 -170 -180 -150 Q-110 -110 -130 -70 Q-60 -70 -40 -20 Z" fill="#8a5a2b" stroke="${C.ink}" stroke-width="4"/></g>
  <path d="M60 -10 Q74 -40 84 -46" stroke="#f3efe6" stroke-width="22" stroke-linecap="round"/>
  <circle cx="92" cy="-50" r="26" fill="#f3efe6" stroke="${C.ink}" stroke-width="4"/>
  <path d="M112 -56 L150 -40 L112 -34 Z" fill="#e2b33e" stroke="${C.ink}" stroke-width="3"/><circle cx="100" cy="-58" r="4" fill="${C.ink}"/>
</g>`;
const flap = (k, id, t0, t1, per = 0.3) => { const n = Math.max(1, Math.floor((t1 - t0) / per) - 1); k.osc(`${id}-wl`, t0, per, n, 28); k.osc(`${id}-wr`, t0, per, n, -24); };
const ashram = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${cloud(240, 740, 1.0, "#ffffff", 0.9)}
  <rect x="0" y="1150" width="${W}" height="120" fill="#4a9ac8"/>
  ${[30, 990].map((x, i) => tree(x, 1300, 0.8 + i * 0.1)).join("")}
  <rect x="0" y="1270" width="${W}" height="1100" fill="#8aa04a"/>${hut(800, 1380, 0.8)}`;
const REKHA = "M240 1500 Q620 1560 1000 1500";
const rekha = (id) => `<path id="${id}" d="${REKHA}" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round"/>`;
const skyDefs = (p) => grad(`${p}-sky`, [[0, "#8fd0ff"], [1, "#fdf0d0"]]);

export const SCENES = [
  // ---------- 1. hook: one offering changed the Ramayan ----------
  {
    id: "s01",
    pre: 0.3,
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-bg`, 0.3, 0.6, 1);
      k.osc(`${p}-al`, 0.6, 0.5, 5, { dy: -8 });
      const sk = sparkles(p, 8, 540, 1340, 260);
      sk.run(k, 0.4, 1.6);
      k.label(`${p}-tb`, L.w(1, "भिक्षा") - 0.1);
      k.op(`${p}-dark`, L.w(1, "बदल") - 0.3, 1.6, 0.85);
      k.mood(`${p}-s`, L.w(1, "बदल"), "sad");
      k.hx(`${p}-cam`, 0, dur, { scale: 1.12, y: 30 }, "sine.inOut");
      return {
        defs: skyDefs(p) + glowDef(`${p}-glow`) + rgrad(`${p}-vig`, [[0, "#000", 0], [0.5, "#000", 0], [1, "#1a0408", 1]]),
        art: `${ashram(p)}
          <circle id="${p}-bg" cx="540" cy="1360" r="260" fill="url(#${p}-glow)" style="opacity:0"/>
          ${sitaEx(`${p}-s`, 540, 1560, 0.96, { aL: -40, aR: 40 })}
          <g transform="translate(540,1400)"><g id="${p}-al" transform="${T()}">${alms}</g></g>
          ${sk.art}
          <rect id="${p}-dark" width="${W}" height="2400" fill="url(#${p}-vig)" style="opacity:0"/>`,
        html: tag(`${p}-tb`, 540, 560, "एक भिक्षा..."),
        js: k.code(),
      };
    },
  },

  // ---------- 2. the sadhu asks for alms; the line bursts into fire ----------
  {
    id: "s02",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-sd`, 0.1, L.w(1, "भिक्षा") + 0.2, 330, 0.5);
      k.mood(`${p}-sd`, L.w(1, "भिक्षा"), "smile");
      k.label(`${p}-tb`, L.w(1, "भिक्षा") - 0.1, L(2) - 0.15);
      // he steps on the line: fire
      const tF = L.w(2, "आग") - 0.5;
      k.mv(`${p}-sd`, tF - 0.3, 0.3, { y: 1520 }, "power1.out");
      [0, 1, 2].forEach((i) => { k.op(`${p}-fw${i}`, tF + i * 0.08, 0.1, 1); k.mv(`${p}-fw${i}`, tF + i * 0.08, 0.3, { s: 1 }, "back.out(2)"); flicker(k, `${p}-f${i}`, tF, dur); });
      k.op(`${p}-flash`, tF, 0.05, 0.5); k.op(`${p}-flash`, tF + 0.05, 0.4, 0);
      k.mv(`${p}-sd`, tF + 0.1, 0.4, { x: 200, y: 1600 }, "power2.out");
      k.mood(`${p}-sd`, tF + 0.1, "open");
      k.mood(`${p}-s`, tF + 0.2, "open");
      k.label(`${p}-tf`, tF + 0.1);
      return {
        defs: skyDefs(p),
        art: `${ashram(p)}
          ${sitaEx(`${p}-s`, 640, 1470, 0.82)}
          ${rekha(`${p}-rk`)}
          ${[[400, 1528], [620, 1540], [840, 1528]].map(([x, y], i) => `<g transform="translate(${x},${y})"><g id="${p}-fw${i}" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">${flames(`${p}-f${i}`, 0, 0, 0.5)}</g></g>`).join("")}
          ${sadhu(`${p}-sd`, -160, 1580, 0.9)}`,
        html: tag(`${p}-tb`, 540, 560, "भिक्षा दो, देवी!") + tag(`${p}-tf`, 540, 560, "रेखा से आग!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Sita crosses the line ----------
  {
    id: "s03",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-sd`, 0.2, "sad");
      k.mv(`${p}-sd-h`, 0.3, 0.5, 8);
      const tC = L.w(1, "रेखा") - 0.8;
      k.mv(`${p}-s`, tC, 1.4, { x: 470, y: 1590 }, "sine.inOut");
      for (let i = 0; i < 3; i++) { k.mv(`${p}-s-b`, tC + i * 0.45, 0.22, { y: -7 }, "sine.out"); k.mv(`${p}-s-b`, tC + i * 0.45 + 0.22, 0.22, { y: 0 }, "sine.in"); }
      k.op(`${p}-rk`, tC + 1.0, 0.6, 0.25);
      k.mood(`${p}-sd`, tC + 1.4, "smile");
      k.label(`${p}-tc`, L.w(1, "रेखा") - 0.1);
      k.hx(`${p}-cam`, tC, 1.6, { scale: 1.08, y: -30 }, "sine.inOut");
      return {
        defs: skyDefs(p),
        art: `${ashram(p)}
          ${sitaEx(`${p}-s`, 640, 1470, 0.82, { aL: -40, aR: 40, propR: `<g transform="translate(-20,124)">${alms}</g>` })}
          ${rekha(`${p}-rk`)}
          ${sadhu(`${p}-sd`, 200, 1600, 0.9)}`,
        html: tag(`${p}-tc`, 540, 560, "सीता ने रेखा पार की!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the ten-headed Ravana; the Pushpak ----------
  {
    id: "s04",
    extra: 3.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tR = L.w(1, "दस") - 0.5;
      puffAt(k, `${p}-pf`, tR);
      k.op(`${p}-sd`, tR + 0.1, 0.1, 0); k.op(`${p}-rw`, tR + 0.1, 0.1, 1);
      k.op(`${p}-dark`, tR, 0.6, 1);
      k.op(`${p}-aura`, tR + 0.1, 0.4, 1);
      k.mood(`${p}-rv`, tR + 0.3, "open");
      k.mv(`${p}-rv-al`, tR + 0.3, 0.4, 120, "back.out(1.6)"); k.mv(`${p}-rv-ar`, tR + 0.35, 0.4, -120, "back.out(1.6)");
      shake(k, p, tR + 0.2, 8, 12);
      k.mood(`${p}-s`, tR + 0.2, "open");
      k.label(`${p}-tr`, tR + 0.2, L(2) - 0.15);
      // the Pushpak comes down, takes them, and flies off
      const tV = L(2) - 0.2;
      k.op(`${p}-vw`, tV, 0.3, 1);
      k.mv(`${p}-vw`, tV, 1.0, { x: 560, y: 1380 }, "power2.out");
      const tIn = tV + 1.0;
      k.op(`${p}-rw`, tIn, 0.2, 0); k.op(`${p}-s`, tIn, 0.2, 0); k.op(`${p}-aura`, tIn, 0.3, 0);
      k.op(`${p}-crew`, tIn, 0.2, 1);
      k.mv(`${p}-vw`, tIn + 0.4, dur - tIn - 0.6, { x: 260, y: 300, s: 0.5 }, "power2.in");
      k.label(`${p}-tv`, L.w(2, "पुष्पक") - 0.1);
      return {
        defs: skyDefs(p) + grad(`${p}-dk`, [[0, "#12040a"], [0.6, "#3a0f1a"], [1, "#6a1a1a"]]) + rgrad(`${p}-redG`, [[0, "#ff4a2a", 0.6], [1, "#ff4a2a", 0]]),
        art: `${ashram(p)}
          <rect id="${p}-dark" width="${W}" height="1270" fill="url(#${p}-dk)" style="opacity:0"/>
          <path d="${REKHA}" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.25"/>
          <circle id="${p}-aura" cx="300" cy="1280" r="360" fill="url(#${p}-redG)" style="opacity:0"/>
          ${sitaEx(`${p}-s`, 470, 1590, 0.82, { aL: -40, aR: 40 })}
          ${sadhu(`${p}-sd`, 200, 1600, 0.9)}
          <g id="${p}-rw" style="opacity:0">${CAST.ravana(`${p}-rv`, 230, 1600, 0.95, { hs: 1.3 })}</g>
          ${puff(`${p}-pf`, 200, 1440)}
          <g id="${p}-vw" transform="${T(1300, 400, 0, 0.8)}" style="opacity:0">${vimana(`<g id="${p}-crew" style="opacity:0">${CAST.ravana(`${p}-vr`, -60, -56, 0.55, { hs: 1.3 })}${sitaEx(`${p}-vs`, 70, -56, 0.5, { mood: "sad", aR: -150 })}</g>`)}</g>`,
        html: tag(`${p}-tr`, 540, 560, "दस सिर वाला रावण!", "red") + tag(`${p}-tv`, 540, 560, "पुष्पक विमान"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Sita cries out, drops her jewels ----------
  {
    id: "s05",
    extra: 3.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -700 }, "none");
      k.osc(`${p}-vw`, 0, 0.6, Math.floor(dur / 0.6) - 1, { dy: -14 });
      const tC = L.w(1, "राम") - 0.3;
      k.op(`${p}-cry`, tC, 0.2, 1); k.mv(`${p}-cry`, tC, 0.4, { s: 1 }, "back.out(2)");
      k.osc(`${p}-cry`, tC + 0.4, 0.1, 7, { dx: 5 });
      k.op(`${p}-cry`, L(2) - 0.2, 0.3, 0);
      // the jewels fall
      const tG = L.w(2, "गहने") - 0.5;
      for (let i = 0; i < 4; i++) {
        const t = tG + i * 0.45;
        k.op(`${p}-j${i}`, t, 0.1, 1);
        k.mv(`${p}-j${i}`, t, 1.6, { dy: 900, r: 360 }, "power1.in");
      }
      k.label(`${p}-tg`, L.w(2, "गहने") - 0.2);
      return {
        defs: grad(`${p}-sky`, [[0, "#5a3a6a"], [1, "#f0a06a"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <g id="${p}-cl" transform="${T()}">${[[200, 700], [700, 860], [1200, 760], [1600, 900], [450, 1300], [1000, 1400]].map(([x, y]) => cloud(x, y, 1.6, "#ffffff", 0.75)).join("")}</g>
          <g id="${p}-vw" transform="${T(560, 1250, 0, 0.9)}">${vimana(`${CAST.ravana(`${p}-vr`, -60, -56, 0.55, { hs: 1.3 })}${sitaEx(`${p}-vs`, 70, -56, 0.5, { mood: "open", aR: -150 })}`)}</g>
          ${[0, 1, 2, 3].map((i) => `<g id="${p}-j${i}" transform="${T(620 + i * 18, 1150, 0, 2.2)}" style="opacity:0">${i % 2 ? `<path d="M-18 -10 Q0 14 18 -10" stroke="${C.gold}" stroke-width="6" fill="none"/><circle cy="6" r="6" fill="${C.verm}"/>` : `<circle r="12" fill="${C.goldL}" stroke="${C.ink}" stroke-width="2"/><circle r="5" fill="${C.teal}"/>`}</g>`).join("")}
          <g transform="translate(700,780)"><g id="${p}-cry" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">
            <path d="M-220 -60 L-150 -110 L-60 -80 L20 -130 L90 -80 L200 -100 L170 -20 L230 40 L140 60 L110 120 L20 70 L-80 110 L-110 50 L-220 60 L-170 0 Z" fill="#fff6c4" stroke="${C.ink}" stroke-width="5"/>
            <text y="14" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#c2361f">राम! लक्ष्मण!</text></g></g>`,
        html: tag(`${p}-tg`, 540, 560, "गहने गिराती गईं..."),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Jatayu blocks Ravana; next episode ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-cl`, 0, dur, { dx: -500 }, "none");
      k.osc(`${p}-vw`, 0, 0.6, Math.floor(L(2) / 0.6), { dy: -12 });
      const tJ = L.w(1, "जटायु") - 0.6;
      k.op(`${p}-jw`, tJ, 0.2, 1);
      k.mv(`${p}-jw`, tJ, 1.0, { x: 620, y: 860 }, "power2.out");
      flap(k, `${p}-jt`, tJ, L(2) + 1);
      k.label(`${p}-tj`, L.w(1, "जटायु") - 0.1, L(2) - 0.2);
      k.mood(`${p}-vr`, tJ + 0.8, "open");
      // next card
      k.hx(`${p}-chip`, L(2) - 0.3, 0.3, { opacity: 0 });
      k.op(`${p}-next`, L(2) - 0.2, 0.3, 1);
      k.mv(`${p}-next`, L(2) - 0.2, 0.5, { s: 0.9 }, "back.out(1.8)");
      k.op(`${p}-next`, L(3) - 0.25, 0.25, 0);
      // Jai Shri Ram: Ram and Lakshman, searching
      k.op(`${p}-gold`, L(3) - 0.2, 0.4, 1);
      k.mv(`${p}-rays`, L(3) - 0.2, dur - L(3), 40, "none");
      k.op(`${p}-hw`, L(3) - 0.2, 0.3, 1);
      k.mv(`${p}-hw`, L(3) - 0.2, 0.5, { y: 0 }, "back.out(1.5)");
      k.mv(`${p}-hr-ar`, L(3), 0.4, -150, "back.out(1.6)");
      k.label(`${p}-jsr`, L(3) - 0.1);
      const pt = petals(p, 16, L(3) - 0.3, 1.4);
      pt.run(k);
      return {
        defs: grad(`${p}-sky`, [[0, "#5a3a6a"], [1, "#f0a06a"]]) + grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <g id="${p}-cl" transform="${T()}">${[[200, 700], [700, 860], [1200, 760], [450, 1300], [1000, 1400]].map(([x, y]) => cloud(x, y, 1.6, "#ffffff", 0.75)).join("")}</g>
          <g id="${p}-vw" transform="${T(380, 1300, 0, 0.85)}">${vimana(`${CAST.ravana(`${p}-vr`, -60, -56, 0.55, { hs: 1.3 })}${sitaEx(`${p}-vs`, 70, -56, 0.5, { mood: "sad", aR: -150 })}`)}</g>
          <g id="${p}-jw" transform="${T(1400, 600, 0, 1.25)}" style="opacity:0"><g transform="scale(-1,1)">${jatayu(`${p}-jt`)}</g></g>
          <g transform="translate(540,950)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-280" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <g transform="translate(-20,-20) scale(0.85)">${jatayu(`${p}-nj`)}</g>
            <text y="170" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="56" fill="#ffd23a">भाग 16: जटायु का बलिदान</text>
          </g></g>
          <g id="${p}-gold" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 360, 1460, 0.95)}${ramEx(`${p}-hr`, 720, 1460, 1.05)}</g>
          ${pt.art}`,
        html: tag(`${p}-tj`, 540, 420, "जटायु!") + big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
