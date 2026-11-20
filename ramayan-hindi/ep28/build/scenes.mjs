// Episode 28 (Hindi reel): Vali's questions, Ram's answers (Valmiki, Kishkindha 17-18). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays, throne } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, archer } from "../../reel-kit.mjs";

reseed(2828);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const ruma = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, skin: "#b8844a", tail: "#b8844a", muzzle: "#ecc490", lower: "#2f7f6a", upper: "#7a3a5a", border: C.gold, hair: "#5a3a1a", ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", aL: -26, aR: 26, ...extra });
const beads = (x, y, s, cols) => `<g transform="translate(${x},${y - 258 * s}) scale(${s * 0.9})">${Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("")}</g>`;
const flowerGarland = (x, y, s) => beads(x, y, s, [C.yellow, C.saffron]);

// the wounded Vali, sitting up against the ground, Indra's gold chain glowing
const VX = 270, VY = 1590, VS = 0.95;
const wounded = (p, extra = {}) => `<g transform="translate(${VX},${VY - 190})"><circle r="150" fill="url(#${p}-gold)"/></g>
  ${vali(`${p}-v`, VX, VY, VS, { seated: true, mood: "open", aL: -10, aR: 30, ...extra })}
  ${beads(VX, VY + 80 * VS, VS, ["#ffe27a", "#f0b62a"])}`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
// seated eye position (left eye)
const VEYE = [VX - 14 * HS * VS, VY + (-262 + 80) * VS - 52 * HS * VS];

const dayBg = (p) => grad(`${p}-sky`, [[0, "#8a8ab0"], [1, "#e8c8a0"]]);
const field = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.7)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5" opacity="0.8"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26" opacity="0.8"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>`;
const cast = (p, ram = {}) => `${ramEx(`${p}-r`, 600, 1580, 0.95, ram)}${lakEx(`${p}-l`, 790, 1580, 0.84)}${sugEx(`${p}-s`, 960, 1580, 0.82, { mood: "sad", aL: -26, aR: 26 })}${flowerGarland(960, 1580, 0.82)}`;
const bubble = (id, inner, w = 620, h = 320) => `<g transform="translate(560,960)"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><ellipse rx="${w / 2}" ry="${h / 2}" fill="#f6e6cc" stroke="${C.ink}" stroke-width="4"/>${inner}</g></g>`;
const showB = (k, id, t, hide = null) => { k.op(id, t, 0.25, 1); k.mv(id, t, 0.45, { s: 1 }, "back.out(1.8)"); if (hide != null) k.op(id, hide, 0.25, 0); };
const xMark = `<g transform="translate(220,-90)"><circle r="40" fill="#8a2a2a" stroke="${C.ink}" stroke-width="3"/><text y="18" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="56" fill="#fff">✗</text></g>`;
const scales = `<g transform="translate(0,20)"><path d="M0 -110 L0 90 M-60 90 L60 90" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M0 -110 L0 90" stroke="${C.gold}" stroke-width="7"/>
  <path d="M-150 -90 L150 -90" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/><circle cy="-112" r="14" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/>
  ${[-150, 150].map((x) => `<path d="M${x} -90 L${x - 50} -10 M${x} -90 L${x + 50} -10" stroke="${C.ink}" stroke-width="3"/><path d="M${x - 60} -10 Q${x} 30 ${x + 60} -10 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/>`).join("")}</g>`;
const GOLD = (p) => rgrad(`${p}-gold`, [[0, "#fff6c4", 0.75], [0.5, "#ffd23a", 0.35], [1, "#ffd23a", 0]]);

export const SCENES = [
  // ---------- 1. hook: "why did you shoot from hiding?" ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-ar`, 0.4, 0.4, -75, "back.out(1.4)");
      k.mood(`${p}-r`, 0.5, "sad");
      k.label(`${p}-tq`, L.w(1, "छिपकर") - 0.3);
      return {
        defs: dayBg(p) + GOLD(p),
        art: `${field(p)}${wounded(p)}${cast(p)}`,
        html: tag(`${p}-tq`, 540, 440, "\"छिपकर क्यों?\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. "I was fighting someone else; what harm did I do you? Is this dharma?" ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      showB(k, `${p}-b1`, 0.3);
      k.op(`${p}-br-bow`, 0, 0.01, 1);
      k.mv(`${p}-v-ar`, 0.4, 0.4, -75);
      k.label(`${p}-th`, L.w(1, "क्या") - 0.3, L(2) - 0.15);
      k.label(`${p}-td`, L.w(2, "धर्मात्मा") - 0.2);
      k.mv(`${p}-r-h`, L(2) + 0.2, 0.5, 6);
      return {
        defs: dayBg(p) + GOLD(p),
        art: `${field(p)}${wounded(p)}${cast(p)}
          ${bubble(`${p}-b1`, `${tree(-140, 120, 0.5)}${archer(`${p}-br`, -170, 110, 0.42, RAM_LOOK)}<g transform="translate(-110,110) scale(0.5)"><circle r="1" fill="none"/></g>
            ${vali(`${p}-bv`, 90, 110, 0.4, { aR: -90 })}${sugEx(`${p}-bs`, 210, 110, 0.4, { aL: 90 })}`)}`,
        html: tag(`${p}-th`, 540, 440, "\"मैंने क्या बिगाड़ा था?\"") + tag(`${p}-td`, 540, 440, "\"ये कैसा धर्म?\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. "I'd have brought Sita in a single day, and Ravana in chains" ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      showB(k, `${p}-b1`, L.w(1, "सीता") - 0.6, L(2) - 0.1);
      k.mv(`${p}-v-ar`, 0.3, 0.4, -140, "back.out(1.4)");
      k.label(`${p}-t1`, L.w(1, "एक") - 0.2, L(2) - 0.15);
      showB(k, `${p}-b2`, L(2));
      k.label(`${p}-t2`, L.w(2, "गले") - 0.3);
      return {
        defs: dayBg(p) + GOLD(p),
        art: `${field(p)}${wounded(p)}${cast(p)}
          ${bubble(`${p}-b1`, `${sitaEx(`${p}-bsi`, -80, 120, 0.46)}<g transform="translate(140,10)"><rect x="-90" y="-50" width="180" height="90" rx="20" fill="#c2361f" stroke="${C.ink}" stroke-width="3"/><text y="18" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="50" fill="#fff">1 दिन</text></g>`)}
          ${bubble(`${p}-b2`, `${vali(`${p}-bv`, -140, 120, 0.44, { aR: -60 })}${CAST.ravana(`${p}-bra`, 130, 120, 0.42, { hs: 1.3, mood: "sad" })}
            <path d="M-80 -20 Q20 30 105 -30" stroke="#8a8a8a" stroke-width="8" fill="none" stroke-dasharray="14 8"/>`)}`,
        html: tag(`${p}-t1`, 540, 440, "\"एक दिन में सीता!\"") + tag(`${p}-t2`, 540, 440, "\"रावण ज़ंजीर में!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Ram: this earth is the Ikshvakus', ruled by Bharat; you took Ruma ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-rg`, 0.2, 0.5, 1);
      k.mv(`${p}-rays`, 0, dur, 25, "none");
      k.mv(`${p}-r-ar`, 0.3, 0.5, -130, "back.out(1.4)");
      k.mood(`${p}-v`, 0.3, "sad"); k.mv(`${p}-v-ar`, 0.3, 0.4, 30);
      showB(k, `${p}-b1`, L.w(1, "इक्ष्वाकुओं") - 0.3, L(2) - 0.1);
      k.label(`${p}-t1`, L.w(1, "भरत") - 0.3, L(2) - 0.15);
      showB(k, `${p}-b2`, L(2));
      k.label(`${p}-t2`, L.w(2, "रुमा") - 0.2);
      return {
        defs: dayBg(p) + GOLD(p) + glowDef(`${p}-rgg`),
        art: `${field(p)}
          <g id="${p}-rg" style="opacity:0">${rays(`${p}-rays`, 600, 1250, 700, 18, "#ffe08a", 0.25)}<circle cx="600" cy="1250" r="260" fill="url(#${p}-rgg)"/></g>
          ${wounded(p)}${cast(p)}
          ${bubble(`${p}-b1`, `<g transform="translate(-60,130) scale(0.42)">${throne(0, 0, 1)}</g>${CAST.bharat(`${p}-bb`, -60, 85, 0.42, { hs: HS, seated: true, hat: "sage", aL: -26, aR: 26 })}
            <text x="170" y="10" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="44" fill="#7a1f1f">भरत का राज</text>`)}
          ${bubble(`${p}-b2`, `${vali(`${p}-bv`, -120, 120, 0.42, { aR: -70 })}${ruma(`${p}-bru`, 10, 120, 0.4, { mood: "sad" })}${sugEx(`${p}-bs`, 170, 120, 0.4, { mood: "sad", hat: "prince" })}${xMark}`)}`,
        html: tag(`${p}-t1`, 540, 440, "इक्ष्वाकुओं की धरती, भरत का राज") + tag(`${p}-t2`, 540, 440, "रुमा को छीनना: महापाप", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. the law of the forest: kings may strike from cover ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      showB(k, `${p}-b1`, 0.3);
      k.osc(`${p}-sc`, 0.8, 0.5, 5, { r: 6 });
      k.mv(`${p}-r-ar`, 0.3, 0.4, -60);
      k.label(`${p}-tr`, L.w(1, "धर्म") - 0.3);
      return {
        defs: dayBg(p) + GOLD(p),
        art: `${field(p)}${wounded(p, { mood: "sad", aR: 20 })}${cast(p)}
          ${bubble(`${p}-b1`, `<g id="${p}-sc" transform="${T()}">${scales}</g>`, 420, 320)}`,
        html: tag(`${p}-tr`, 540, 440, "राजधर्म"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Vali: you are right, forgive me; protect Angada, respect Tara ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-al`, 0.3, 0.4, -26); k.mv(`${p}-v-ar`, 0.35, 0.4, 26);
      k.mv(`${p}-v-h`, 0.5, 0.4, 8);
      k.mood(`${p}-v`, L.w(1, "सही") - 0.2, "smile");
      cry(k, `${p}-t0`, VEYE[0], VEYE[1], 0.6, 6);
      k.mv(`${p}-r-ar`, L.w(1, "क्षमा") - 0.3, 0.5, -130, "back.out(1.4)");
      k.op(`${p}-gl`, L.w(1, "क्षमा") - 0.3, 0.5, 1);
      k.label(`${p}-tk`, L.w(1, "क्षमा") - 0.3, L(2) - 0.15);
      showB(k, `${p}-b1`, L.w(2, "अंगद") - 0.3);
      k.label(`${p}-ta`, L.w(2, "अंगद") - 0.2);
      const sk = sparkles(p, 8, VX, 1340, 200);
      sk.run(k, L.w(1, "क्षमा"), 1.2);
      return {
        defs: dayBg(p) + GOLD(p) + glowDef(`${p}-gg`),
        art: `${field(p)}<circle id="${p}-gl" cx="450" cy="1300" r="320" fill="url(#${p}-gg)" style="opacity:0"/>
          ${wounded(p)}${cast(p)}${tear(`${p}-t0`, VEYE[0], VEYE[1])}
          ${bubble(`${p}-b1`, `${angada(`${p}-ba`, -110, 120, 0.46)}${tara(`${p}-bt`, 110, 120, 0.44, { aL: -26, aR: 26 })}`)}
          ${sk.art}`,
        html: tag(`${p}-tk`, 540, 440, "\"मुझे क्षमा करें\"") + tag(`${p}-ta`, 540, 440, "\"अंगद की रक्षा करना\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: Tara's lament; Jai Shri Ram ----------
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
            <g transform="translate(-60,120) rotate(-82)">${vali(`${p}-nv`, 0, 0, 0.5, { mood: "sad" })}</g>
            ${tara(`${p}-nt`, 160, 120, 0.56, { mood: "sad", aL: 60 })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 29: तारा का विलाप</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}${flowerGarland(890, 1460, 0.82)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
