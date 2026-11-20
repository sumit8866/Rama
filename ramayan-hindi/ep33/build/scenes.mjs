// Episode 33 (Hindi reel): Tara calms Lakshman (Valmiki, Kishkindha 33-36). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, PROP, grad, rgrad, rays, throne, chhatra } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, hallV, STR_REST, STR_PULL } from "../../reel-kit.mjs";

reseed(3333);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
// Lakshman holding his strung bow out to the right (for the twang)
const lakBow = (id, x, y, s, extra = {}) => lakEx(id, x, y, s, { back: null, propR: PROP.bowArmed(id), aR: -90, aL: -60, brows: "fierce", mood: "open", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const sug = (id, x, y, s, extra = {}) => `${CAST.sugriva(id, x, y, s, { hs: HS, ...extra })}<g transform="${T(x, y + (extra.seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}">${beadsSvg(["#ffe27a", "#f0b62a"])}</g>`;
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const ruma = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#b8844a", tail: "#b8844a", muzzle: "#ecc490", lower: "#2f7f6a", upper: "#7a3a5a", border: C.gold, hair: "#5a3a1a", ...extra });

const palace = (p) => `${hallV(p)}${chhatra(720, 1010, 0.85)}${throne(720, 1580, 0.85)}`;
const angerGlow = (p) => rgrad(`${p}-ang`, [[0, "#ff6a3a", 0.55], [1, "#c2361f", 0]]);
const rings = (p, x, y) => [0, 1, 2].map((i) => `<g transform="translate(${x},${y})"><g id="${p}-rg${i}" transform="${T(0, 0, 0, 1)}" style="opacity:0"><circle r="70" fill="none" stroke="#fff3c4" stroke-width="8"/></g></g>`).join("");
const ringOut = (k, p, t) => { for (let i = 0; i < 3; i++) { const ti = t + i * 0.22; k.op(`${p}-rg${i}`, ti, 0.05, 0.9); k.mv(`${p}-rg${i}`, ti, 0.7, { s: 5 }, "power1.out"); k.op(`${p}-rg${i}`, ti + 0.45, 0.25, 0); } };
// pull the string and let go
const twang = (k, id, t) => { k.op(`${id}-bow`, 0, 0.01, 1); k.attrD(`${id}-str`, t, 0.3, STR_REST, STR_PULL); k.attrD(`${id}-str`, t + 0.3, 0.1, STR_PULL, STR_REST, "power4.out"); k.osc(`${id}-bow`, t + 0.4, 0.05, 7, { r: 2 }); };
const notes = (p) => [0, 1, 2].map((i) => `<g id="${p}-n${i}" transform="${T(860 + i * 40, 1180)}" style="opacity:0"><text font-family="Mukta" font-weight="800" font-size="52" fill="#fff3cf">♪</text></g>`).join("");
const runNotes = (k, p, t0) => { for (let i = 0; i < 3; i++) { const t = t0 + i * 0.35; k.op(`${p}-n${i}`, t, 0.2, 1); k.mv(`${p}-n${i}`, t, 1.5, { dy: -200, dx: -60 }, "power1.out"); k.op(`${p}-n${i}`, t + 1.1, 0.4, 0); } };
const bubble = (id, inner, w = 600, h = 300) => `<g transform="translate(540,960)"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><ellipse rx="${w / 2}" ry="${h / 2}" fill="#f6e6cc" stroke="${C.ink}" stroke-width="4"/>${inner}</g></g>`;
const showB = (k, id, t, hide = null) => { k.op(id, t, 0.25, 1); k.mv(id, t, 0.45, { s: 1 }, "back.out(1.8)"); if (hide != null) k.op(id, hide, 0.25, 0); };
const crowd = (n, cols = 9) => Array.from({ length: n }, (_, i) => { const x = -240 + (i % cols) * 60, y = 40 - Math.floor(i / cols) * 46; return `<g transform="translate(${x},${y})"><circle r="24" fill="#a8743a" stroke="${C.ink}" stroke-width="2"/><ellipse cy="8" rx="14" ry="10" fill="#e0b680"/><circle cx="-7" cy="-5" r="3" fill="${C.ink}"/><circle cx="7" cy="-5" r="3" fill="${C.ink}"/></g>`; }).join("");
const badge = (id, x, y, text, size = 56) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><rect x="-170" y="-60" width="340" height="110" rx="24" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="5"/><text y="18" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${size}" fill="#ffd23a">${text}</text></g></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };

export const SCENES = [
  // ---------- 1. hook: the twang of the bow; Sugriva trembles on his throne ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tT = L.w(1, "टंकार") - 0.4;
      twang(k, `${p}-l`, tT);
      ringOut(k, p, tT + 0.4);
      shake(k, p, tT + 0.4, 7, 10);
      k.op(`${p}-ag`, tT, 0.4, 1);
      k.mood(`${p}-s`, tT + 0.5, "open");
      k.osc(`${p}-s`, tT + 0.6, 0.08, Math.floor((dur - tT - 0.8) / 0.08), { dx: 5 });
      k.label(`${p}-tt`, L.w(1, "काँप") - 0.4);
      return {
        defs: angerGlow(p),
        art: `${palace(p)}
          <circle id="${p}-ag" cx="260" cy="1300" r="260" fill="url(#${p}-ang)" style="opacity:0"/>
          ${rings(p, 420, 1340)}
          ${sug(`${p}-s`, 720, 1500, 0.86, { seated: true, aL: -26, aR: 26 })}
          ${lakBow(`${p}-l`, 230, 1580, 0.95)}`,
        html: tag(`${p}-tt`, 540, 440, "सुग्रीव काँप उठे!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Lakshman in the palace full of music; the twang echoes everywhere ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      runNotes(k, p, 0.3);
      k.walk(`${p}-l`, 0.2, L.w(1, "महल") + 0.4, 230, 0.42);
      k.label(`${p}-tm`, L.w(1, "महल") - 0.3, L(2) - 0.15);
      const tT = L.w(2, "टंकार") - 0.4;
      k.op(`${p}-l`, tT - 0.3, 0.2, 0); k.op(`${p}-lb`, tT - 0.3, 0.2, 1);
      twang(k, `${p}-lb`, tT);
      ringOut(k, p, tT + 0.4);
      shake(k, p, tT + 0.4, 7, 10);
      k.mood(`${p}-r`, tT + 0.5, "open"); k.mood(`${p}-t`, tT + 0.5, "open");
      k.label(`${p}-tt`, L.w(2, "गूँज") - 0.4);
      return {
        defs: "",
        art: `${palace(p)}${notes(p)}
          ${rings(p, 420, 1340)}
          ${tara(`${p}-t`, 900, 1580, 0.78)}${ruma(`${p}-r`, 1020, 1580, 0.74)}
          ${sug(`${p}-s`, 720, 1500, 0.86, { seated: true, mood: "smile", aL: -26, aR: 26 })}
          ${lakEx(`${p}-l`, -150, 1580, 0.95, { brows: "fierce", mood: "open" })}
          ${lakBow(`${p}-lb`, 230, 1580, 0.95, { hidden: true })}`,
        html: tag(`${p}-tm`, 540, 440, "लक्ष्मण महल में") + tag(`${p}-tt`, 540, 440, "धनुष की टंकार!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Tara comes forward: forgive him; millions of vanaras have already come ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-t`, 0.2, L.w(1, "तारा") + 0.6, 560, 0.42);
      k.mv(`${p}-t-al`, L.w(1, "क्रोध") - 0.3, 0.4, -26); k.mv(`${p}-t-ar`, L.w(1, "क्रोध") - 0.25, 0.4, 26);
      k.label(`${p}-tq`, L.w(1, "क्षमा") - 0.4, L(2) - 0.15);
      showB(k, `${p}-b1`, L(2) - 0.1);
      k.label(`${p}-ta`, L.w(2, "लाखों") - 0.3);
      return {
        defs: angerGlow(p),
        art: `${palace(p)}
          <circle cx="250" cy="1300" r="230" fill="url(#${p}-ang)"/>
          ${lakEx(`${p}-l`, 250, 1580, 0.95, { brows: "fierce", mood: "open" })}
          ${tara(`${p}-t`, 1200, 1580, 0.86)}
          ${bubble(`${p}-b1`, crowd(27))}`,
        html: tag(`${p}-tq`, 540, 440, "\"क्रोध छोड़िए, क्षमा कीजिए\"") + tag(`${p}-ta`, 540, 440, "लाखों वानर आ चुके!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. before a woman, Lakshman bows his head and holds back his anger ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tB = L.w(1, "सिर") - 0.4;
      k.mv(`${p}-l-h`, tB, 0.6, 12);
      k.mood(`${p}-l`, tB, "smile");
      k.mv(`${p}-l-al`, tB + 0.2, 0.4, -26); k.mv(`${p}-l-ar`, tB + 0.25, 0.4, 26);
      k.op(`${p}-ag`, tB, 0.8, 0);
      k.op(`${p}-cg`, tB + 0.3, 0.8, 1);
      k.label(`${p}-tb`, tB);
      return {
        defs: angerGlow(p) + glowDef(`${p}-cgg`, "#c8e0ff"),
        art: `${palace(p)}
          <circle id="${p}-ag" cx="250" cy="1300" r="230" fill="url(#${p}-ang)"/>
          <circle id="${p}-cg" cx="250" cy="1300" r="230" fill="url(#${p}-cgg)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 250, 1580, 0.95, { mood: "open" })}
          ${tara(`${p}-t`, 560, 1580, 0.86, { aL: -26, aR: 26 })}`,
        html: tag(`${p}-tb`, 540, 440, "लक्ष्मण ने सिर झुकाया"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Tara: even Vishwamitra forgot ten years ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-t-ar`, 0.3, 0.4, -70, "back.out(1.4)"); k.mood(`${p}-t`, 0.3, "open");
      showB(k, `${p}-b1`, L.w(1, "विश्वामित्र") - 0.3);
      pop(k, `${p}-10`, L.w(1, "दस") - 0.3);
      k.label(`${p}-tv`, L.w(1, "विश्वामित्र") - 0.2);
      return {
        defs: "",
        art: `${palace(p)}
          ${lakEx(`${p}-l`, 250, 1580, 0.95, { aL: -26, aR: 26 })}
          ${tara(`${p}-t`, 560, 1580, 0.86)}
          ${bubble(`${p}-b1`, `${CAST.vishwamitra(`${p}-bv`, -110, 120, 0.46, { hs: HS, seated: true, aL: -26, aR: 26, mood: "smile" })}
            ${CAST.divine(`${p}-ba`, 110, 120, 0.44, { hs: HS, female: true, hat: "queen", skin: "#f0c8a0", lower: "#e85a9a", upper: "#f7b7c6", border: C.gold, hair: "#2a1a0a", aL: 40, aR: -40 })}`)}
          ${badge(`${p}-10`, 820, 760, "10 साल!")}`,
        html: tag(`${p}-tv`, 540, 440, "विश्वामित्र भी समय भूले"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Sugriva: Ram alone can slay Ravana; Lakshman too asks pardon ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-s`, 0.2, 1.2, 640, 0.42);
      k.mv(`${p}-s-al`, 1.2, 0.4, -26); k.mv(`${p}-s-ar`, 1.25, 0.4, 26); k.mv(`${p}-s-h`, 1.4, 0.4, 8);
      k.label(`${p}-tr`, L.w(1, "रावण") - 0.3, L(2) - 0.15);
      showB(k, `${p}-b1`, L.w(1, "रावण") - 0.4, L(2) - 0.1);
      k.mv(`${p}-l-al`, L.w(2, "क्षमा") - 0.6, 0.4, -26); k.mv(`${p}-l-ar`, L.w(2, "क्षमा") - 0.55, 0.4, 26);
      k.mv(`${p}-l-h`, L.w(2, "क्षमा") - 0.4, 0.4, 8);
      k.op(`${p}-gl`, L.w(2, "क्षमा") - 0.4, 0.6, 1);
      const sk = sparkles(p, 8, 450, 1280, 260); sk.run(k, L.w(2, "क्षमा") - 0.2, 1.2);
      k.label(`${p}-tk`, L.w(2, "क्षमा") - 0.3);
      return {
        defs: glowDef(`${p}-gg`),
        art: `${palace(p)}<circle id="${p}-gl" cx="450" cy="1300" r="300" fill="url(#${p}-gg)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 250, 1580, 0.95)}
          ${tara(`${p}-t`, 920, 1580, 0.8, { aL: -26, aR: 26 })}
          ${sug(`${p}-s`, 1200, 1580, 0.88)}
          ${bubble(`${p}-b1`, `${ramEx(`${p}-br`, -80, 120, 0.46, { aR: -150 })}<path d="M-40 -60 L140 -20" stroke="#fff3c4" stroke-width="6"/><g transform="translate(150,110)">${CAST.ravana(`${p}-bra`, 0, 0, 0.36, { hs: 1.3, mood: "sad" })}</g>`, 520, 300)}
          ${sk.art}`,
        html: tag(`${p}-tr`, 540, 440, "\"राम अकेले ही काफ़ी हैं\"") + tag(`${p}-tk`, 540, 440, "दोनों ने क्षमा माँगी", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the vanara army; Jai Shri Ram ----------
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
            <g transform="translate(20,40)">${crowd(36)}</g>
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 34: वानर सेना</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sug(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
