// Episode 26 (Hindi reel): Tara's warning (Valmiki, Kishkindha 15-16). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, rays, throne, chhatra } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, hallV, archer, bowReady, shoot } from "../../reel-kit.mjs";

reseed(2626);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const garlandOn = (x, y, s) => `<g transform="translate(${x},${y - 258 * s}) scale(${s * 0.9})">${Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${i % 2 ? C.saffron : C.yellow}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("")}</g>`;

// Vali's palace at night
const palace = (p) => `${hallV(p)}${chhatra(540, 1010, 0.9)}${throne(540, 1580, 0.9)}<rect width="${W}" height="2400" fill="#0a0a30" opacity="0.38"/>
  ${[150, 930].map((x) => `<g transform="translate(${x},1300)"><rect x="-8" y="0" width="16" height="140" fill="#7a5a2a"/><path d="M0 -6 Q-12 -24 0 -50 Q12 -24 0 -6 Z" fill="#ffcf4a" stroke="#e8662b" stroke-width="2"/><circle cy="-26" r="40" fill="#ffcf6a" opacity="0.25"/></g>`).join("")}`;
const bubble = (id, x, y, inner, w = 560, h = 300) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><ellipse rx="${w / 2}" ry="${h / 2}" fill="#f6e6cc" stroke="${C.ink}" stroke-width="4"/>${inner}</g></g>`;
const showB = (k, id, t) => { k.op(id, t, 0.25, 1); k.mv(id, t, 0.45, { s: 1 }, "back.out(1.8)"); };
const ring = (k, p, i, t) => { k.op(`${p}-rg${i}`, t, 0.05, 0.9); k.mv(`${p}-rg${i}`, t, 0.6, { s: 3 }, "power1.out"); k.op(`${p}-rg${i}`, t + 0.4, 0.2, 0); };
const rings = (p, x, y) => [0, 1, 2].map((i) => `<g transform="translate(${x},${y})"><g id="${p}-rg${i}" transform="${T(0, 0, 0, 1)}" style="opacity:0"><circle r="60" fill="none" stroke="#fff3c4" stroke-width="7"/></g></g>`).join("");
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
// eyes of a standing person at (x, y, s): left eye
const eyeL = (x, y, s) => [x - 14 * HS * s, y - 262 * s - 52 * HS * s];

export const SCENES = [
  // ---------- 1. hook: a wife tried everything to save her husband from death ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.osc(`${p}-v-b`, 0.4, 0.4, Math.floor((dur - 0.8) / 0.4), { r: 6 });
      k.mood(`${p}-v`, 0.3, "open");
      const [ex, ey] = eyeL(380, 1580, 0.85);
      cry(k, `${p}-t0`, ex, ey, 0.6, 6);
      k.label(`${p}-tk`, L.w(1, "कोशिश") - 0.3);
      return {
        defs: "",
        art: `${palace(p)}
          ${tara(`${p}-t`, 380, 1580, 0.85, { aR: -70, mood: "sad" })}
          ${vali(`${p}-v`, 640, 1580, 0.95, { aL: 70, aR: -30 })}
          ${tear(`${p}-t0`, ex, ey)}`,
        html: tag(`${p}-tk`, 540, 440, "तारा की आख़िरी कोशिश", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Sugriva's second roar: Vali rises in rage ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      for (let i = 0; i < 3; i++) ring(k, p, i, 0.5 + i * 0.35);
      const tA = L.w(1, "क्रोध") - 0.4;
      k.op(`${p}-vs`, tA, 0.25, 0); k.op(`${p}-v`, tA, 0.25, 1);
      k.op(`${p}-fg`, tA, 0.3, 1);
      k.mv(`${p}-v-al`, tA + 0.1, 0.3, 150); k.mv(`${p}-v-ar`, tA + 0.1, 0.3, -150);
      shake(k, p, tA + 0.2, 6, 10);
      k.mood(`${p}-t`, tA + 0.2, "open");
      k.label(`${p}-tv`, tA + 0.1);
      return {
        defs: rgrad(`${p}-fgg`, [[0, "#ff8a3a", 0.6], [1, "#c2361f", 0]]),
        art: `${palace(p)}
          <circle id="${p}-fg" cx="540" cy="1300" r="300" fill="url(#${p}-fgg)" style="opacity:0"/>
          ${vali(`${p}-vs`, 540, 1500, 0.9, { seated: true, brows: "calm", aL: -20, aR: 20 })}
          ${vali(`${p}-v`, 540, 1580, 0.95, { hidden: true, mood: "open" })}
          ${tara(`${p}-t`, 820, 1580, 0.82, { aL: -26, aR: 26 })}
          ${rings(p, 1060, 1180)}`,
        html: tag(`${p}-tv`, 540, 440, "बाली का क्रोध!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Tara stops him: Sugriva must have powerful help ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-t`, 0.2, L.end(1), 760, 0.4);
      k.mv(`${p}-t-al`, L.end(1) - 0.3, 0.3, 90); k.mv(`${p}-t-ar`, L.end(1) - 0.3, 0.3, -90);
      k.label(`${p}-tt`, L.w(1, "तारा") - 0.2, L(2) - 0.15);
      showB(k, `${p}-bb`, L.w(2, "सुग्रीव") - 0.2);
      k.op(`${p}-sh`, L.w(2, "बड़ी") - 0.4, 0.4, 1);
      k.label(`${p}-tb`, L.w(2, "बड़ी") - 0.2);
      return {
        defs: glowDef(`${p}-sg`, "#ffd23a"),
        art: `${palace(p)}
          ${vali(`${p}-v`, 380, 1580, 0.95, { mood: "open" })}
          ${tara(`${p}-t`, 1000, 1580, 0.85, { mood: "sad" })}
          ${bubble(`${p}-bb`, 560, 930, `<g id="${p}-sh" style="opacity:0"><circle cx="70" cy="20" r="130" fill="url(#${p}-sg)"/><path d="M70 -110 Q30 -40 70 120 M70 -110 L150 120" stroke="#2a1a30" stroke-width="10" fill="none" opacity="0.5"/></g>${sugEx(`${p}-bs`, -40, 120, 0.5)}${garlandOn(-40, 120, 0.5)}<text x="120" y="-60" font-family="Mukta" font-weight="800" font-size="80" fill="#6a6a7a">?</text>`)}`,
        html: tag(`${p}-tt`, 540, 440, "तारा ने रोका") + tag(`${p}-tb`, 540, 440, "\"साथ में बड़ी ताकत!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Angada's news: Ram and Lakshman are Sugriva's friends; make peace ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      showB(k, `${p}-b1`, L.w(1, "अंगद") - 0.3);
      k.label(`${p}-ta`, L.w(1, "अंगद") - 0.2, L(2) - 0.15);
      // make peace: Sugriva as crown prince
      const tP = L(2);
      k.op(`${p}-b1`, tP, 0.3, 0);
      showB(k, `${p}-b2`, L.w(2, "युवराज") - 0.3);
      k.mv(`${p}-t-al`, tP, 0.4, -26); k.mv(`${p}-t-ar`, tP + 0.05, 0.4, 26);
      k.mv(`${p}-t-h`, tP + 0.2, 0.4, 8);
      k.label(`${p}-tm`, L.w(2, "मेल") - 0.3);
      return {
        defs: "",
        art: `${palace(p)}
          ${vali(`${p}-v`, 380, 1580, 0.95, { mood: "open" })}
          ${tara(`${p}-t`, 760, 1580, 0.85, { aL: 90, aR: -90, mood: "sad" })}
          ${bubble(`${p}-b1`, 540, 930, `${angada(`${p}-ba`, -190, 120, 0.42, { aR: -100 })}${lakEx(`${p}-bl`, -40, 120, 0.4)}${ramEx(`${p}-br`, 80, 120, 0.44)}${sugEx(`${p}-bs`, 200, 120, 0.42)}`, 600)}
          ${bubble(`${p}-b2`, 540, 930, `${vali(`${p}-bv`, -110, 120, 0.46, { brows: "calm", aR: -60 })}${sugEx(`${p}-bs2`, 110, 120, 0.46, { hat: "prince", aL: 60 })}<text x="0" y="-80" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="42" fill="#2a7a3a">युवराज सुग्रीव</text>`, 600)}`,
        html: tag(`${p}-ta`, 540, 440, "अंगद की खबर: राम सुग्रीव के मित्र") + tag(`${p}-tm`, 540, 440, "\"भाई से मेल कर लो!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Vali refuses: no hero ignores a challenge; Ram knows dharma; he'll only humble Sugriva ----------
  {
    id: "s05",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-al`, 0.4, 0.3, 150); k.mv(`${p}-v-ar`, 0.4, 0.3, -150);
      k.mood(`${p}-t`, 0.5, "sad");
      k.label(`${p}-tc`, L.w(1, "चुप") - 0.3, L(2) - 0.15);
      // "Ram is righteous"
      k.mv(`${p}-v-al`, L(2), 0.4, 8); k.mv(`${p}-v-ar`, L(2), 0.4, 40);
      k.mood(`${p}-v`, L(2) + 0.1, "smile");
      k.label(`${p}-tr`, L.w(2, "पाप") - 0.4, L(3) - 0.15);
      // "I'll only break his pride"
      k.mv(`${p}-v-ar`, L.w(3, "घमंड") - 0.4, 0.25, -110, "back.out(1.6)");
      k.mood(`${p}-v`, L.w(3, "घमंड") - 0.4, "open");
      k.label(`${p}-tg`, L.w(3, "घमंड") - 0.3);
      return {
        defs: "",
        art: `${palace(p)}
          ${vali(`${p}-v`, 440, 1580, 1.0, { mood: "open" })}
          ${tara(`${p}-t`, 800, 1580, 0.85, { aL: -26, aR: 26 })}`,
        html: tag(`${p}-tc`, 540, 440, "\"वीर चुप नहीं बैठता!\"", "red") + tag(`${p}-tr`, 540, 440, "\"राम धर्मात्मा हैं\"") + tag(`${p}-tg`, 540, 440, "\"बस घमंड तोड़ूँगा!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Tara walks around him with a blessing; Vali goes out to fight ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const t0 = 0.3, half = (L.w(1, "प्रार्थना") - t0) / 2;
      k.mv(`${p}-t`, t0, half, { x: 540, y: 1470, s: 0.65 }, "sine.inOut");
      k.mv(`${p}-t`, t0 + half, half, { x: 760, y: 1580, s: 0.85 }, "sine.inOut");
      k.label(`${p}-tp`, L.w(1, "परिक्रमा") - 0.2, L(2) - 0.15);
      const sk = sparkles(p, 10, 460, 1250, 280);
      sk.run(k, L.w(1, "प्रार्थना") - 0.3, 1.2);
      k.mv(`${p}-t-al`, L.w(1, "प्रार्थना") - 0.2, 0.4, -26); k.mv(`${p}-t-ar`, L.w(1, "प्रार्थना") - 0.15, 0.4, 26);
      // he leaves
      const tL = L(2);
      k.walk(`${p}-v`, tL, dur - 0.2, -300, 0.4);
      k.mood(`${p}-t`, tL + 0.4, "sad");
      const [ex, ey] = eyeL(760, 1580, 0.85);
      cry(k, `${p}-t0`, ex, ey, tL + 0.6, 4);
      k.label(`${p}-tn`, L.w(2, "निकल") - 0.2);
      return {
        defs: "",
        art: `${palace(p)}
          ${tara(`${p}-t`, 320, 1580, 0.85, { aL: -26, aR: 26 })}
          ${vali(`${p}-v`, 460, 1580, 0.95, { mood: "open" })}
          ${tear(`${p}-t0`, ex, ey)}${sk.art}`,
        html: tag(`${p}-tp`, 540, 440, "तारा की प्रार्थना") + tag(`${p}-tn`, 540, 440, "बाली युद्ध को चला", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the death of Vali; Jai Shri Ram ----------
  {
    id: "s07",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-nr`);
      shoot(k, `${p}-nr`, 0, 0.1, 0.4, null);
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
            ${tree(-150, 130, 0.62)}${archer(`${p}-nr`, -200, 120, 0.5, RAM_LOOK)}
            ${vali(`${p}-nv`, 170, 120, 0.56, { mood: "open" })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 27: बाली वध</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}${garlandOn(890, 1460, 0.82)}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
