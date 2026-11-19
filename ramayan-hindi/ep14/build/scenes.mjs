// Episode 14 (Hindi reel): the golden deer. Vertical 1080x1920.
import { C, T, CAST, PROP, grad, rgrad, tree, hut, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, shake, archer, bowReady, shoot, arrowFly, darkTree } from "../../reel-kit.mjs";

reseed(401);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", aL: -26, aR: 26, ...extra });
const archerEx = (id, x, y, s, extra = {}) => archer(id, x, y, s, { hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const MARICHA = "#3a6a3a";
// the golden deer, facing right, standing on y = 0
const deer = (id) => `<g id="${id}" transform="${T()}">
  ${[[-50, 1], [-30, 0], [34, 1], [52, 0]].map(([x, b]) => `<path d="M${x} 0 L${x + 2} 70" stroke="${C.ink}" stroke-width="11" stroke-linecap="round"/><path d="M${x} 0 L${x + 2} 70" stroke="${b ? C.goldL : "#e2b33e"}" stroke-width="6" stroke-linecap="round"/>`).join("")}
  <path d="M-74 -14 Q-66 -56 0 -54 Q56 -52 70 -24 Q74 8 40 12 L-48 12 Q-80 8 -74 -14 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M44 -40 L64 -104 L88 -100 L74 -30 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <ellipse cx="88" cy="-110" rx="30" ry="18" transform="rotate(18 88 -110)" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
  <circle cx="92" cy="-114" r="4" fill="${C.ink}"/>
  <path d="M78 -124 L70 -170 L58 -186 M70 -170 L86 -184 M84 -126 L96 -168 L90 -188 M96 -168 L112 -178" stroke="#a8742a" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${[[-44, -30], [-14, -38], [16, -30], [-30, -12], [2, -14], [34, -16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#f3f3ff" opacity="0.95"/>`).join("")}
</g>`;
const puff = (id, x, y) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">${[[-50, 0, 80], [50, -10, 74], [0, -70, 90]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#d8c8e8" opacity="0.9"/>`).join("")}</g></g>`;
const puffAt = (k, id, t) => { k.op(id, t, 0.12, 1); k.mv(id, t, 0.5, { s: 1.2 }, "power2.out"); k.op(id, t + 0.4, 0.4, 0); };
const panchavati = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${cloud(240, 760, 1.0, "#ffffff", 0.9)}
  <rect x="0" y="1200" width="${W}" height="140" fill="#4a9ac8"/>
  ${[30, 980].map((x, i) => tree(x, 1360, 0.8 + i * 0.1)).join("")}
  <rect x="0" y="1340" width="${W}" height="1100" fill="#8aa04a"/>${hut(780, 1440, 0.82)}`;
const skyDefs = (p) => grad(`${p}-sky`, [[0, "#8fd0ff"], [1, "#fdf0d0"]]);
const deepForest = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-fs)"/>
  ${[60, 280, 520, 760, 980].map((x, i) => darkTree(x, 1450, 0.8 + (i % 2) * 0.2, "#2a4a2a")).join("")}
  <rect x="0" y="1430" width="${W}" height="1000" fill="#3a5a2a"/>`;
const forestDefs = (p) => grad(`${p}-fs`, [[0, "#3a5a5a"], [1, "#8aa06a"]]);

export const SCENES = [
  // ---------- 1. hook: a golden deer that was a demon ----------
  {
    id: "s01",
    pre: 0.3,
    extra: 0.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-dw`, 0.2, 0.4, 1);
      k.mv(`${p}-dw`, 0.2, 0.6, { s: 1.7 }, "back.out(1.6)");
      k.osc(`${p}-d`, 0.8, 0.5, 5, { dy: -12 });
      const sk = sparkles(p, 10, 540, 1260, 420);
      sk.run(k, 0.4, 2.0);
      const tR = L.w(1, "राक्षस") - 0.3;
      k.op(`${p}-shadow`, tR, 0.5, 0.7);
      k.op(`${p}-red`, tR, 0.5, 1);
      k.label(`${p}-tr`, tR + 0.1, L(2) - 0.15);
      // Sita and the looming shadow
      const tS = L(2) - 0.1;
      k.op(`${p}-a`, tS, 0.35, 0); k.op(`${p}-b`, tS, 0.35, 1);
      k.mv(`${p}-rs`, tS, 1.6, { s: 1.15 }, "power1.out");
      k.mood(`${p}-s`, tS + 0.3, "open");
      k.label(`${p}-th`, L.w(2, "सीता") - 0.1);
      return {
        defs: forestDefs(p) + grad(`${p}-rd`, [[0, "#1a0508"], [0.6, "#5a0f1a"], [1, "#a8361f"]]) + glowDef(`${p}-glow`),
        art: `<g id="${p}-a">${deepForest(p)}
            <rect id="${p}-red" width="${W}" height="2400" fill="url(#${p}-rd)" style="opacity:0" opacity="0.7"/>
            <circle cx="540" cy="1300" r="380" fill="url(#${p}-glow)"/>
            <g id="${p}-shadow" style="opacity:0">${CAST.demon(`${p}-m`, 540, 1560, 1.25, "#0a0a0a", { hs: 1.3, aL: 120, aR: -120 })}</g>
            <g transform="translate(520,1500)"><g id="${p}-dw" transform="${T(0, 0, 0, 0.6)}" style="opacity:0">${deer(`${p}-d`)}</g></g>
            ${sk.art}</g>
          <g id="${p}-b" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-rd)"/>
            <g transform="translate(540,1600)"><g id="${p}-rs" transform="${T(0, 0, 0, 1)}"><g opacity="0.85">${CAST.ravana(`${p}-rv`, 0, 0, 1.6, { hs: 1.3 }).replace(/fill="[^"]*"/g, 'fill="#0a0408"').replace(/stroke="[^"]*"/g, 'stroke="#0a0408"')}</g></g></g>
            ${sitaEx(`${p}-s`, 540, 1600, 0.86)}</g>`,
        html: tag(`${p}-tr`, 540, 560, "असल में राक्षस!", "red") + tag(`${p}-th`, 540, 560, "सीता हरण", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Ravana forces Maricha ----------
  {
    id: "s02",
    extra: 0.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-rv`, 0.1, L.w(1, "मारीच") + 0.1, 330, 0.5);
      k.label(`${p}-tm`, L.w(1, "मारीच") - 0.1, L(2) - 0.15);
      // Maricha is afraid
      const tD = L.w(2, "डर") - 0.3;
      k.mood(`${p}-m`, tD, "sad");
      k.osc(`${p}-m-b`, tD, 0.06, 13, { x: 3 });
      k.op(`${p}-bub`, tD, 0.3, 1); k.mv(`${p}-bub`, tD, 0.45, { s: 1 }, "back.out(2)");
      // Ravana threatens him
      const tT = L.w(2, "धमकी") - 0.6;
      k.op(`${p}-bub`, tT, 0.3, 0);
      k.op(`${p}-aura`, tT, 0.4, 1);
      k.mood(`${p}-rv`, tT, "open");
      k.mv(`${p}-rv-ar`, tT, 0.35, -110, "back.out(1.6)");
      k.osc(`${p}-rv-h`, tT + 0.2, 0.14, 7, 5);
      shake(k, p, tT + 0.2, 6, 10);
      k.label(`${p}-tt`, tT + 0.1);
      return {
        defs: forestDefs(p) + rgrad(`${p}-redG`, [[0, "#ff4a2a", 0.6], [1, "#ff4a2a", 0]]),
        art: `${deepForest(p)}${hut(860, 1440, 0.7)}
          <circle id="${p}-aura" cx="330" cy="1260" r="360" fill="url(#${p}-redG)" style="opacity:0"/>
          ${CAST.demon(`${p}-m`, 760, 1600, 0.88, MARICHA, { hs: 1.3, mood: "smile" })}
          ${CAST.ravana(`${p}-rv`, -200, 1600, 0.86, { hs: 1.3 })}
          <g transform="translate(780,980)"><g id="${p}-bub" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">
            <circle cx="-20" cy="150" r="14" fill="#fff"/><circle cx="-10" cy="114" r="22" fill="#fff"/>
            <ellipse rx="170" ry="110" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
            ${ramEx(`${p}-br`, -60, 80, 0.36)}
            <path d="M-10 -10 L110 -10" stroke="#5a3a1a" stroke-width="5"/><path d="M100 -18 L122 -10 L100 -2 Z" fill="#cfd3d6" stroke="${C.ink}" stroke-width="2"/></g></g>`,
        html: tag(`${p}-tm`, 760, 560, "मारीच") + tag(`${p}-tt`, 540, 560, "मौत की धमकी!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. the golden deer; Sita wants it ----------
  {
    id: "s03",
    extra: 0.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tD = L.w(1, "सोने") - 0.4;
      puffAt(k, `${p}-pf`, tD);
      k.op(`${p}-dw`, tD + 0.1, 0.2, 1);
      k.osc(`${p}-d`, tD + 0.5, 0.45, Math.floor((dur - tD) / 0.45) - 1, { dy: -14 });
      const sk = sparkles(p, 10, 600, 1430, 300);
      sk.run(k, tD + 0.2, 1.8);
      k.label(`${p}-td`, tD + 0.2, L(2) - 0.15);
      // Sita: I want it
      const tS = L(2) - 0.1;
      k.mood(`${p}-s`, tS, "smile");
      k.mv(`${p}-s-ar`, tS + 0.2, 0.4, -70, "back.out(1.6)");
      k.mood(`${p}-r`, L.w(2, "प्रभु"), "smile");
      k.label(`${p}-ts`, L.w(2, "हिरण") - 0.3);
      return {
        defs: skyDefs(p) + glowDef(`${p}-glow`),
        art: `${panchavati(p)}
          <circle cx="620" cy="1440" r="220" fill="url(#${p}-glow)"/>
          ${ramEx(`${p}-r`, 140, 1600, 0.88)}${sitaEx(`${p}-s`, 320, 1600, 0.84)}
          <g transform="translate(620,1530)"><g id="${p}-dw" transform="${T(0, 0, 0, 1.15)}" style="opacity:0">${deer(`${p}-d`)}</g></g>
          ${puff(`${p}-pf`, 620, 1480)}
          ${sk.art}`,
        html: tag(`${p}-td`, 620, 560, "सोने का हिरण!") + tag(`${p}-ts`, 400, 560, "मुझे यह हिरण चाहिए!"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Lakshman guards Sita; Ram chases the deer ----------
  {
    id: "s04",
    extra: 0.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-rr`);
      k.mv(`${p}-r-ar`, L.w(1, "सीता") - 0.3, 0.4, -96, "back.out(1.6)");
      k.mv(`${p}-l-h`, L.w(1, "रक्षा") - 0.2, 0.3, 8); k.mv(`${p}-l-h`, L.w(1, "रक्षा") + 0.1, 0.3, 0);
      k.label(`${p}-tl`, L.w(1, "रक्षा") - 0.3, L(2) - 0.2);
      // the chase
      const tC = L(2) - 0.2;
      k.op(`${p}-a`, tC, 0.35, 0); k.op(`${p}-b`, tC, 0.35, 1);
      k.mv(`${p}-mid`, tC, dur - tC, { dx: -900 }, "none");
      k.walk(`${p}-rr`, tC, dur, 420, 0.3);
      for (let i = 0; i < Math.floor((dur - tC) / 0.5); i++) {
        const t = tC + i * 0.5;
        k.mv(`${p}-dd`, t, 0.25, { dy: -60 }, "sine.out");
        k.mv(`${p}-dd`, t + 0.25, 0.25, { dy: 60 }, "sine.in");
      }
      k.mv(`${p}-dw2`, tC, dur - tC, { x: 1000 }, "none");
      k.label(`${p}-tf`, L.w(3, "दूर") - 0.2);
      return {
        defs: skyDefs(p) + forestDefs(p),
        art: `<g id="${p}-a">${panchavati(p)}
            ${sitaEx(`${p}-s`, 160, 1600, 0.82)}${ramEx(`${p}-r`, 380, 1600, 0.9)}${lakEx(`${p}-l`, 580, 1600, 0.84)}</g>
          <g id="${p}-b" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-fs)"/>
            <g id="${p}-mid" transform="${T()}">${Array.from({ length: 9 }, (_, i) => darkTree(60 + i * 260, 1450, 0.8 + (i % 2) * 0.2, "#2a4a2a")).join("")}</g>
            <rect x="0" y="1430" width="${W}" height="1000" fill="#3a5a2a"/>
            <g id="${p}-dw2" transform="${T(700, 1500)}"><g id="${p}-dd" transform="${T()}"><g transform="scale(0.9)">${deer(`${p}-d2`)}</g></g></g>
            ${archerEx(`${p}-rr`, 140, 1600, 0.88, { aR: -20 })}</g>`,
        html: tag(`${p}-tl`, 480, 560, "सीता की रक्षा करना") + tag(`${p}-tf`, 540, 560, "दूर... बहुत दूर जंगल में"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. the arrow; Maricha cries out in Ram's voice ----------
  {
    id: "s05",
    extra: 0.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      k.osc(`${p}-d`, 0, 0.45, 5, { dy: -12 });
      const tB = L.w(1, "बाण") - 0.6;
      shoot(k, `${p}-r`, tB - 0.3, tB, 0.35, tB + 0.45);
      k.op(`${p}-a`, tB + 0.45, 0.02, 1);
      k.mv(`${p}-a`, tB + 0.45, 0.25, { x: 740 }, "power1.in");
      const tH = tB + 0.7;
      k.op(`${p}-a`, tH, 0.1, 0);
      k.op(`${p}-flash`, tH, 0.05, 0.6); k.op(`${p}-flash`, tH + 0.05, 0.4, 0);
      const tM = L.w(1, "असली") - 0.3;
      puffAt(k, `${p}-pf`, tM);
      k.op(`${p}-dw`, tM + 0.1, 0.1, 0); k.op(`${p}-mw`, tM + 0.1, 0.1, 1);
      k.mood(`${p}-m`, tM + 0.2, "open");
      k.label(`${p}-tm`, tM + 0.1, L(2) - 0.15);
      // he falls, crying "Ha Lakshman!"
      const tF = L(2) + 0.2;
      k.mv(`${p}-mw`, tF, 1.0, { r: -80, y: 1540 }, "power2.in");
      const tC = L.w(2, "हा") - 0.2;
      k.op(`${p}-cry`, tC, 0.2, 1); k.mv(`${p}-cry`, tC, 0.4, { s: 1 }, "back.out(2)");
      k.osc(`${p}-cry`, tC + 0.4, 0.08, 9, { dx: 5 });
      k.mood(`${p}-r`, tC + 0.2, "open");
      return {
        defs: forestDefs(p),
        art: `${deepForest(p)}
          ${archerEx(`${p}-r`, 280, 1600, 0.92, { aR: -20 })}
          <g transform="translate(800,1500)"><g id="${p}-dw" transform="${T()}">${deer(`${p}-d`)}</g></g>
          <g id="${p}-mw" transform="${T(800, 1600)}" style="opacity:0">${CAST.demon(`${p}-m`, 0, 0, 0.9, MARICHA, { hs: 1.3, aL: 120, aR: -120 })}</g>
          ${puff(`${p}-pf`, 800, 1460)}
          ${arrowFly(`${p}-a`, 468, 1370)}
          <g transform="translate(700,1000)"><g id="${p}-cry" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">
            <path d="M-220 -60 L-150 -110 L-60 -80 L20 -130 L90 -80 L200 -100 L170 -20 L230 40 L140 60 L110 120 L20 70 L-80 110 L-110 50 L-220 60 L-170 0 Z" fill="#fff6c4" stroke="${C.ink}" stroke-width="5"/>
            <text y="12" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="56" fill="#c2361f">हा लक्ष्मण!</text></g></g>`,
        html: tag(`${p}-tm`, 640, 560, "मारीच का असली रूप!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Sita sends Lakshman; the Lakshman rekha ----------
  {
    id: "s06",
    extra: 0.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-s`, 0.2, "open");
      k.mv(`${p}-s-ar`, L.w(1, "भेजा") - 0.4, 0.4, -90, "back.out(1.6)");
      k.label(`${p}-tg`, L.w(1, "घबरा") - 0.1, L(2) - 0.15);
      k.mood(`${p}-l`, L.w(1, "भेजा"), "sad");
      // Lakshman draws the line
      const tR = L.w(2, "रेखा") - 1.0;
      k.mv(`${p}-s-ar`, L(2), 0.4, 26);
      k.walk(`${p}-l`, L(2), tR, 460, 0.45);
      k.mv(`${p}-l-ar`, tR, 0.3, -30);
      k.attrD(`${p}-rekha`, tR + 0.1, 1.0, "M280 1550 Q280 1550 280 1550", "M280 1550 Q620 1610 960 1550", "power1.inOut");
      k.op(`${p}-rekha`, tR, 0.1, 1); k.op(`${p}-rg`, tR + 0.6, 0.5, 1);
      k.label(`${p}-tr`, L.w(2, "रेखा") - 0.1);
      k.walk(`${p}-l`, tR + 1.2, dur, -250, 0.45);
      return {
        defs: skyDefs(p) + glowDef(`${p}-glow`, "#ffb347"),
        art: `${panchavati(p)}
          <ellipse id="${p}-rg" cx="620" cy="1575" rx="360" ry="50" fill="url(#${p}-glow)" style="opacity:0"/>
          ${sitaEx(`${p}-s`, 640, 1530, 0.84)}
          ${lakEx(`${p}-l`, 300, 1540, 0.86)}
          <path id="${p}-rekha" d="M280 1550 Q280 1550 280 1550" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round" style="opacity:0"/>`,
        html: tag(`${p}-tg`, 640, 560, "सीता घबरा गईं") + tag(`${p}-tr`, 620, 560, "लक्ष्मण रेखा"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. a sadhu at the door; next: Sita haran ----------
  {
    id: "s07",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-rg`, 0, 0.01, 1);
      k.walk(`${p}-sd`, 0.2, L.w(1, "द्वार") + 0.2, 240, 0.5);
      k.label(`${p}-ts`, L.w(1, "साधु") - 0.1, L(2) - 0.2);
      k.op(`${p}-shadow`, L.w(1, "द्वार") - 0.2, 0.6, 0.5);
      k.mood(`${p}-sd`, L.w(1, "द्वार"), "smile");
      // next card
      k.hx(`${p}-chip`, L(2) - 0.3, 0.3, { opacity: 0 });
      k.op(`${p}-next`, L(2) - 0.2, 0.3, 1);
      k.mv(`${p}-next`, L(2) - 0.2, 0.5, { s: 0.9 }, "back.out(1.8)");
      k.op(`${p}-next`, L(3) - 0.25, 0.25, 0);
      // Jai Shri Ram
      k.op(`${p}-gold`, L(3) - 0.2, 0.4, 1);
      k.mv(`${p}-rays`, L(3) - 0.2, dur - L(3), 40, "none");
      k.op(`${p}-hw`, L(3) - 0.2, 0.3, 1);
      k.mv(`${p}-hw`, L(3) - 0.2, 0.5, { y: 0 }, "back.out(1.5)");
      k.mv(`${p}-hr-ar`, L(3), 0.4, -150, "back.out(1.6)");
      k.label(`${p}-jsr`, L(3) - 0.1);
      const pt = petals(p, 18, L(3) - 0.3, 1.4);
      pt.run(k);
      return {
        defs: skyDefs(p) + glowDef(`${p}-glow`, "#ffb347") + grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `${panchavati(p)}
          <ellipse id="${p}-rg" cx="620" cy="1575" rx="360" ry="50" fill="url(#${p}-glow)" style="opacity:0"/>
          <path d="M280 1550 Q620 1610 960 1550" stroke="#ffd23a" stroke-width="10" fill="none" stroke-linecap="round"/>
          <g id="${p}-shadow" style="opacity:0" transform="translate(240,1540) scale(1.25)">${CAST.ravana(`${p}-shr`, 0, 0, 1, { hs: 1.3 }).replace(/fill="[^"]*"/g, 'fill="#1a0a14"').replace(/stroke="[^"]*"/g, 'stroke="#1a0a14"')}</g>
          ${sitaEx(`${p}-s`, 640, 1530, 0.84)}
          ${CAST.sage(`${p}-sd`, -160, 1540, 0.86, { hs: HS, propL: PROP.staff })}
          <g transform="translate(540,950)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-280" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${CAST.ravana(`${p}-nr`, -110, 110, 0.5, { hs: 1.3 })}
            ${sitaEx(`${p}-ns`, 130, 110, 0.48, { mood: "sad" })}
            <text y="170" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="58" fill="#ffd23a">भाग 15: सीता हरण</text>
          </g></g>
          <g id="${p}-gold" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 260, 1460, 0.9)}${sitaEx(`${p}-hs`, 540, 1460, 0.88)}${ramEx(`${p}-hr`, 800, 1460, 1.0)}</g>
          ${pt.art}`,
        html: tag(`${p}-ts`, 400, 560, "एक साधु?") + big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
