// Episode 23 (Hindi reel): the seven sal trees (Valmiki, Kishkindha 11-12). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, archer, bowReady, shoot, arrowFly } from "../../reel-kit.mjs";

reseed(2323);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });

// the arrow leaves an archer at (150, 1580, 0.85) at (323, 1368)
const AX = 323, AY = 1368;
const TREES = [400, 490, 580, 670, 760, 850, 940];
const salTree = `<path d="M-16 0 L-12 -210 L12 -210 L16 0 Z" fill="#6b4423" stroke="${C.ink}" stroke-width="4"/>
  <ellipse cy="-310" rx="78" ry="125" fill="#2f6a3a" stroke="${C.ink}" stroke-width="4"/><ellipse cx="-26" cy="-340" rx="38" ry="62" fill="#3f8a4a"/><ellipse cx="22" cy="-270" rx="28" ry="40" fill="#3f8a4a"/>`;
// seven sal trees in a row; each one sways from its base and can show the arrow hole
const grove = (p, s = 0.75, base = 1440) => TREES.map((x, i) => `<g id="${p}-t${i}" transform="${T(x, base, 0, s)}">${salTree}<circle id="${p}-h${i}" cy="${Math.round((AY - base) / s)}" r="15" fill="#1a0a0a" stroke="#fff3c4" stroke-width="3" style="opacity:0"/></g>`).join("");
const hill = `<path d="M930 1450 L990 1210 L1080 1110 L1080 1450 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>`;
const crack = (id, x, y) => `<path id="${id}" d="M${x - 70} ${y} L${x - 30} ${y + 20} L${x} ${y - 4} L${x + 30} ${y + 24} L${x + 80} ${y + 2}" stroke="${C.ink}" stroke-width="7" fill="none" style="opacity:0"/>`;
const dayBg = (p) => grad(`${p}-sky`, [[0, "#7aa8d0"], [1, "#f0e0b8"]]);
const field = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[220, 660], [820, 760]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.8)).join("")}<rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>`;
const pierceTrees = (k, p, t0, t1) => TREES.forEach((x, i) => { const t = t0 + ((x - AX) / (1000 - AX)) * (t1 - t0); k.op(`${p}-h${i}`, t, 0.06, 1); k.osc(`${p}-t${i}`, t, 0.12, 3, { r: 4 }); });
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const mark = (id, x, y, ch, col, r = 30) => `<g id="${id}" transform="${T(x, y, 0, 0.4)}" style="opacity:0"><circle r="${r}" fill="${col}" stroke="${C.ink}" stroke-width="3"/><text y="${r * 0.46}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${r * 1.4}" fill="#fff">${ch}</text></g>`;

export const SCENES = [
  // ---------- 1. hook: one arrow, seven trees, a hill, the earth... and back to the quiver ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      k.mv(`${p}-r-ar`, 0, 0.01, -90); k.mv(`${p}-r-al`, 0, 0.01, -40);
      k.label(`${p}-tb`, 0.3, L.w(1, "सात") - 0.2);
      const tS = L.w(1, "सात") - 0.2;
      k.op(`${p}-trail`, tS, 0.3, 0.8);
      pierceTrees(k, p, tS, tS + 0.9);
      const tH = L.w(1, "पहाड़") - 0.2;
      k.op(`${p}-flash`, tH, 0.06, 0.4); k.op(`${p}-flash`, tH + 0.06, 0.3, 0);
      const tE = L.w(1, "धरती") - 0.2;
      k.op(`${p}-crk`, tE, 0.1, 1); shake(k, p, tE, 6, 10);
      const sk = sparkles(p, 8, 130, 1290, 120);
      sk.run(k, L.w(1, "तरकश") - 0.3, 1.0);
      k.label(`${p}-tq`, L.w(1, "तरकश") - 0.2);
      return {
        defs: dayBg(p),
        art: `${field(p)}${hill}${grove(p)}
          <path id="${p}-trail" d="M${AX} ${AY} L1010 ${AY} L1010 1470" stroke="#fff3c4" stroke-width="7" stroke-dasharray="22 14" fill="none" style="opacity:0"/>
          ${crack(`${p}-crk`, 1010, 1470)}
          ${archer(`${p}-r`, 150, 1580, 0.85, RAM_LOOK)}${sk.art}`,
        html: tag(`${p}-tb`, 540, 440, "एक ही बाण!", "red") + tag(`${p}-tq`, 540, 440, "वापस तरकश में!"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Sugriva shows the seven sal trees; Vali could pierce just one ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-sg-ar`, 0.3, 0.4, -100, "back.out(1.4)");
      TREES.forEach((_, i) => k.osc(`${p}-t${i}`, 0.6 + i * 0.12, 0.3, 1, { r: 3 }));
      k.label(`${p}-ts`, L.w(1, "शाल") - 0.2, L(2) - 0.15);
      for (let i = 0; i < 3; i++) k.op(`${p}-dot${i}`, L(2) - 0.2 + i * 0.1, 0.15, 1);
      k.op(`${p}-vis`, L(2), 0.3, 1); k.mv(`${p}-vis`, L(2), 0.5, { s: 1 }, "back.out(1.8)");
      k.op(`${p}-vh`, L.w(2, "एक") - 0.2, 0.1, 1); k.osc(`${p}-vt`, L.w(2, "एक") - 0.2, 0.12, 3, { r: 4 });
      k.label(`${p}-tv`, L.w(2, "एक") - 0.2);
      return {
        defs: dayBg(p) + rgrad(`${p}-vg`, [[0, "#fff6d8", 0.96], [1, "#f0dcb8", 0.9]]),
        art: `${field(p)}${hill}${grove(p)}
          ${sugEx(`${p}-sg`, 170, 1580, 0.85)}
          ${[0, 1, 2].map((i) => `<circle id="${p}-dot${i}" cx="${230 + i * 50}" cy="${1200 - i * 60}" r="${10 + i * 6}" fill="#fff6d8" stroke="${C.ink}" stroke-width="2" style="opacity:0"/>`).join("")}
          <g transform="translate(560,880)"><g id="${p}-vis" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <ellipse rx="260" ry="150" fill="url(#${p}-vg)" stroke="${C.ink}" stroke-width="4"/>
            ${vali(`${p}-vv`, -110, 110, 0.4, { aR: -90 })}
            <g id="${p}-vt" transform="${T(110, 110, 0, 0.42)}">${salTree}<circle id="${p}-vh" cy="-150" r="18" fill="#1a0a0a" style="opacity:0"/></g></g></g>`,
        html: tag(`${p}-ts`, 540, 440, "सात शाल वृक्ष") + tag(`${p}-tv`, 540, 440, "बाली: सिर्फ़ एक पेड़", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Lakshman: what would convince you? Sugriva: pierce one sal tree ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-l`, L(1) + 0.3, "open"); k.mv(`${p}-l-ar`, L(1) + 0.3, 0.4, -60, "back.out(1.4)");
      k.mood(`${p}-l`, L.end(1), "smile");
      k.label(`${p}-tl`, L.w(1, "भरोसा") - 0.2, L(2) - 0.15);
      k.mood(`${p}-sg`, L(2) + 0.2, "open"); k.mv(`${p}-sg-al`, L(2) + 0.2, 0.4, 100, "back.out(1.4)");
      k.op(`${p}-h3g`, L.w(2, "शाल") - 0.2, 0.3, 1);
      k.label(`${p}-tc`, L.w(2, "शाल") - 0.2);
      return {
        defs: dayBg(p) + glowDef(`${p}-gl`, "#fff0b0"),
        art: `${field(p)}${hill}
          <circle id="${p}-h3g" cx="670" cy="1180" r="170" fill="url(#${p}-gl)" style="opacity:0"/>
          ${grove(p, 0.62, 1430)}
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 340, 1580, 0.92)}
          ${sugEx(`${p}-sg`, 900, 1580, 0.88)}`,
        html: tag(`${p}-tl`, 540, 440, "\"भरोसा कैसे होगा?\"") + tag(`${p}-tc`, 540, 440, "\"एक शाल वृक्ष भेद दें!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the arrow: seven trees, the hill, the earth ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      const tf = L.w(1, "छोड़ा") - 0.1;
      shoot(k, `${p}-r`, 0.4, 0.9, tf - 0.9, tf);
      k.label(`${p}-tb`, L.w(1, "धनुष") - 0.2, L(2) - 0.15);
      // flight across the grove to the hill, then down into the earth
      const tHill = L.w(2, "पहाड़") - 0.1, tEarth = L.w(2, "धरती") - 0.1;
      k.op(`${p}-af`, tf, 0.02, 1);
      k.mv(`${p}-af`, tf, tHill - tf, { x: 1010 }, "none");
      pierceTrees(k, p, tf, tHill);
      k.op(`${p}-flash`, tHill, 0.06, 0.4); k.op(`${p}-flash`, tHill + 0.06, 0.3, 0);
      shake(k, p, tHill, 4, 6);
      k.mv(`${p}-af`, tEarth - 0.15, 0.15, { r: 90 });
      k.mv(`${p}-af`, tEarth, 0.35, { y: 1700 }, "power2.in");
      k.op(`${p}-af`, tEarth + 0.3, 0.05, 0);
      k.op(`${p}-crk`, tEarth + 0.1, 0.1, 1); shake(k, p, tEarth + 0.1, 7, 12);
      k.label(`${p}-t7`, L.w(2, "सातों") - 0.2);
      return {
        defs: dayBg(p),
        art: `${field(p)}${hill}${grove(p)}${crack(`${p}-crk`, 1010, 1470)}
          ${archer(`${p}-r`, 150, 1580, 0.85, RAM_LOOK)}
          ${arrowFly(`${p}-af`, AX, AY, "#ffe08a")}`,
        html: tag(`${p}-tb`, 540, 440, "राम का बाण") + tag(`${p}-t7`, 540, 440, "7 पेड़ + पहाड़ + धरती!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. the arrow comes back into Ram's quiver ----------
  {
    id: "s05",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tR = L.w(1, "बाण") - 0.3;
      k.op(`${p}-ar`, tR, 0.1, 1);
      k.mv(`${p}-ar`, tR, 1.0, { x: 400, y: 1280 }, "power2.inOut");
      k.op(`${p}-ar`, tR + 0.95, 0.1, 0);
      const sk = sparkles(p, 8, 390, 1300, 120);
      sk.run(k, tR + 0.9, 1.0);
      k.mood(`${p}-l`, tR + 0.9, "open"); k.mood(`${p}-sg`, tR + 0.9, "open"); k.mood(`${p}-h`, tR + 1.0, "open");
      k.label(`${p}-tq`, L.w(1, "तरकश") - 0.2);
      return {
        defs: dayBg(p),
        art: `${field(p)}${hill}${grove(p, 0.62, 1430)}
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}
          ${hanEx(`${p}-h`, 700, 1580, 0.8)}${sugEx(`${p}-sg`, 900, 1580, 0.86)}
          ${arrowFly(`${p}-ar`, 1150, 1100, "#ffe08a").replace(`transform="${T(1150, 1100)}"`, `transform="${T(1150, 1100, 190)}"`)}
          ${sk.art}`,
        html: tag(`${p}-tq`, 540, 440, "तरकश में वापस!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Sugriva falls at Ram's feet ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tF = L.w(1, "चरणों") - 0.4;
      k.op(`${p}-sg`, tF, 0.3, 0); k.op(`${p}-sk`, tF, 0.3, 1);
      k.mv(`${p}-sk-h`, tF + 0.3, 0.4, -10);
      k.mv(`${p}-r-ar`, tF + 0.5, 0.4, -60, "back.out(1.4)");
      k.op(`${p}-glow`, tF, 0.5, 1);
      k.label(`${p}-tf`, tF + 0.1, L.w(1, "बाली") - 0.3);
      const tB = L.w(1, "बाली") - 0.2;
      k.osc(`${p}-v1`, tB, 0.25, 7, { dy: -34 }); k.osc(`${p}-h`, tB + 0.1, 0.25, 7, { dy: -30 });
      k.label(`${p}-tb`, tB);
      return {
        defs: dayBg(p) + glowDef(`${p}-gl`),
        art: `${field(p)}${hill}${grove(p, 0.62, 1430)}
          <circle id="${p}-glow" cx="360" cy="1280" r="300" fill="url(#${p}-gl)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 140, 1580, 0.84)}${ramEx(`${p}-r`, 360, 1580, 0.92)}
          ${hanEx(`${p}-h`, 780, 1580, 0.8, { aL: -26 })}${CAST.vanara(`${p}-v1`, 980, 1565, 0.6, { hs: HS })}
          ${sugEx(`${p}-sg`, 600, 1580, 0.86)}
          ${sugEx(`${p}-sk`, 570, 1590, 0.8, { seated: true, hidden: true, aL: -26, aR: 26 })}`,
        html: tag(`${p}-tf`, 540, 440, "राम के चरणों में") + tag(`${p}-tb`, 540, 440, "\"बाली का अंत निश्चित!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the first duel of Vali and Sugriva; Jai Shri Ram ----------
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
            <rect x="-400" y="-290" width="800" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${vali(`${p}-nv`, -200, 120, 0.56, { aR: -90, mood: "open" })}${sugEx(`${p}-ns`, -40, 120, 0.56, { aL: -90, mood: "open" })}
            ${tree(220, 130, 0.6)}${ramEx(`${p}-nr`, 260, 120, 0.5, { back: null })}${mark(`${p}-nq`, 300, -140, "?", "#6a6a7a", 30).replace('style="opacity:0"', "")}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="46" fill="#ffd23a">भाग 24: बाली-सुग्रीव का पहला युद्ध</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
