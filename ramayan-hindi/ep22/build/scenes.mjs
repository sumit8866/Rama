// Episode 22 (Hindi reel): Dundubhi and Matanga's curse (Valmiki, Kishkindha 11). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, hut, cloud, rays } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, shake, darkTree, moon } from "../../reel-kit.mjs";

reseed(2222);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const matang = (id, x, y, s, extra = {}) => CAST.vasishtha(id, x, y, s, { hs: HS, ...extra });

// Dundubhi: a huge buffalo demon, facing right, feet at 0. The head nods on its own group.
const buffalo = (id, x, y, s, flip = false) => `<g id="${id}" transform="${T(x, y, 0, s)}"><g transform="scale(${flip ? -1 : 1},1)">
  <path d="M-200 -200 Q-260 -170 -250 -110" stroke="${C.ink}" stroke-width="12" fill="none" stroke-linecap="round"/>
  ${[-150, -90, 90, 150].map((lx) => `<rect x="${lx - 18}" y="-110" width="36" height="110" rx="10" fill="#241a28" stroke="${C.ink}" stroke-width="4"/><rect x="${lx - 20}" y="-14" width="40" height="16" rx="4" fill="#5a4a3a"/>`).join("")}
  <ellipse cx="0" cy="-190" rx="210" ry="115" fill="#2a2030" stroke="${C.ink}" stroke-width="5"/>
  <path d="M-150 -260 Q0 -310 150 -260" stroke="#4a3a4a" stroke-width="10" fill="none"/>
  <g transform="translate(210,-210)"><g id="${id}-hd" transform="${T()}">
    <path d="M-30 -40 Q-110 -120 -70 -170 Q-60 -110 -10 -70 Z M30 -40 Q110 -120 70 -170 Q60 -110 10 -70 Z" fill="#e9e1cf" stroke="${C.ink}" stroke-width="4" transform="translate(0,-10)"/>
    <ellipse rx="78" ry="70" fill="#2a2030" stroke="${C.ink}" stroke-width="5"/>
    <ellipse cx="30" cy="40" rx="52" ry="34" fill="#4a3a4a" stroke="${C.ink}" stroke-width="3"/><circle cx="20" cy="40" r="6" fill="${C.ink}"/><circle cx="48" cy="40" r="6" fill="${C.ink}"/>
    <circle cx="-14" cy="-14" r="13" fill="#f5d742" stroke="${C.ink}" stroke-width="2"/><circle cx="34" cy="-14" r="13" fill="#f5d742" stroke="${C.ink}" stroke-width="2"/>
    <circle cx="-14" cy="-14" r="5" fill="${C.verm}"/><circle cx="34" cy="-14" r="5" fill="${C.verm}"/>
    <path d="M-30 -36 L0 -24 M50 -36 L20 -24" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g></g>
</g></g>`;
// its dried skeleton, lying down
const skeleton = (id, x, y, s = 1) => `<g id="${id}" transform="${T(x, y, 0, s)}">
  <path d="M-210 -40 L190 -60" stroke="#e9e3d6" stroke-width="18" stroke-linecap="round"/><path d="M-210 -40 L190 -60" stroke="${C.ink}" stroke-width="2" fill="none" opacity="0.4"/>
  ${[-160, -110, -60, -10, 40, 90, 140].map((rx) => `<path d="M${rx} -48 Q${rx - 30} 30 ${rx + 10} 60 M${rx} -48 Q${rx - 30} -130 ${rx + 10} -150" stroke="#f3efe6" stroke-width="12" fill="none" stroke-linecap="round"/>`).join("")}
  ${[[-190, 0], [-140, 10], [120, 0], [170, 12]].map(([bx, by]) => `<path d="M${bx} ${by} L${bx + 20} ${by + 60}" stroke="#e9e3d6" stroke-width="14" stroke-linecap="round"/>`).join("")}
  <g transform="translate(250,-70) rotate(20)"><path d="M-30 -40 Q-110 -120 -70 -170 Q-60 -110 -10 -70 Z M30 -40 Q110 -120 70 -170 Q60 -110 10 -70 Z" fill="#e9e1cf" stroke="${C.ink}" stroke-width="4"/>
    <path d="M-60 -40 Q0 -80 60 -40 L50 40 Q0 70 -50 40 Z" fill="#f3efe6" stroke="${C.ink}" stroke-width="4"/><circle cx="-22" cy="-8" r="14" fill="#2a2030"/><circle cx="22" cy="-8" r="14" fill="#2a2030"/></g>
</g>`;
const drop = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -14 Q11 4 0 14 Q-11 4 0 -14 Z" fill="#b01a1a" stroke="#5a0a0a" stroke-width="2"/></g>`;
const badge = (id, x, y, text, size = 64) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><rect x="-230" y="-70" width="460" height="130" rx="26" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="5"/><text y="22" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${size}" fill="#ffd23a">${text}</text></g></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const dayBg = (p, top = "#7a9ab8", bot = "#e8d8b0") => grad(`${p}-sky`, [[0, top], [1, bot]]);
const forest = (p, ground = "#6a7a3a") => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[40, 1040].map((x) => darkTree(x, 1460, 1.0, "#2a3a2a")).join("")}<rect x="0" y="1440" width="${W}" height="1000" fill="${ground}"/>`;
const rishyamuk = (x = 760) => `<path d="M${x - 420} 1450 L${x - 300} 1180 L${x - 200} 1060 L${x - 120} 1000 L${x + 120} 990 L${x + 220} 1070 L${x + 340} 1190 L${x + 420} 1450 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>
  <path d="M${x - 300} 1180 L${x - 220} 1200 L${x - 160} 1140 M${x + 220} 1070 L${x + 160} 1120" stroke="${C.ink}" stroke-width="3" fill="none" opacity="0.45"/>`;

export const SCENES = [
  // ---------- 1. hook: with his big toe, Ram flicks a demon's skeleton ten yojanas ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tT = L.w(1, "अँगूठे") - 0.1;
      k.mv(`${p}-r-fr`, tT, 0.15, { dy: -40 }, "power2.out"); k.mv(`${p}-r-fr`, tT + 0.15, 0.25, { dy: 40 }, "power2.in");
      k.label(`${p}-tt`, tT, L.w(1, "दस") - 0.3);
      const tF = L.w(1, "उछाल") - 0.5;
      k.mv(`${p}-sk`, tF, 1.4, { x: 1100, y: -100, r: 520, s: 0.2 }, "power2.in");
      k.op(`${p}-sk`, tF + 1.2, 0.2, 0);
      pop(k, `${p}-yj`, L.w(1, "दस") - 0.2);
      k.mood(`${p}-sg`, tF + 0.3, "open"); k.mood(`${p}-l`, tF + 0.3, "open");
      k.mood(`${p}-r`, tF + 0.2, "smile");
      return {
        defs: dayBg(p),
        art: `${forest(p)}
          ${lakEx(`${p}-l`, 110, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.95)}
          ${skeleton(`${p}-sk`, 620, 1560, 0.85)}
          ${sugEx(`${p}-sg`, 990, 1580, 0.8)}
          ${badge(`${p}-yj`, 540, 980, "10 योजन दूर!")}`,
        html: tag(`${p}-tt`, 540, 440, "पैर का अँगूठा!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Dundubhi: the ocean and the Himalaya both send him to Vali ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-b`, 0.1, 0.3, 1);
      k.mv(`${p}-b`, 0.1, 1.2, { x: 330 }, "power2.out");
      k.osc(`${p}-b-hd`, 1.0, 0.25, 7, { r: -10 });
      shake(k, p, L.w(1, "बलवान") - 0.3, 5, 8);
      k.label(`${p}-td`, L.w(1, "दुंदुभि") - 0.2, L(2) - 0.15);
      // the ocean
      const tO = L(2) - 0.1;
      k.op(`${p}-o`, tO, 0.35, 1);
      k.mv(`${p}-sd`, tO + 0.3, 0.8, { y: 1580 }, "power2.out");
      k.mv(`${p}-sd-ar`, L.w(2, "हिमालय") - 0.3, 0.4, -150, "back.out(1.4)");
      k.label(`${p}-to`, L.w(2, "समुद्र") - 0.2, L(3) - 0.15);
      // the Himalaya
      const tH = L(3) - 0.1;
      k.op(`${p}-hm`, tH, 0.35, 1);
      k.mv(`${p}-hv-al`, L.w(3, "बाली") - 0.4, 0.4, -100, "back.out(1.4)");
      k.label(`${p}-th`, L.w(3, "बाली") - 0.3);
      return {
        defs: dayBg(p, "#5a3a5a", "#d89a5a") + grad(`${p}-sea`, [[0, "#2a6aa8"], [1, "#0e3a6a"]]) + grad(`${p}-snow`, [[0, "#8ab0d8"], [1, "#f3f0ea"]]),
        art: `${forest(p, "#5a5a3a")}
          <g id="${p}-o" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-snow)"/>
            ${CAST.divine(`${p}-sd`, 780, 1900, 0.95, { hs: HS, skin: "#3a7ac8", lower: "#1f6f9b", sash: "#9ad0f0", hair: "#0e2a4a" })}
            <rect x="0" y="1380" width="${W}" height="1000" fill="url(#${p}-sea)"/>${[1400, 1460, 1520].map((wy, i) => `<path d="M0 ${wy} ${Array.from({ length: 9 }, (_, j) => `Q${j * 120 + 60} ${wy - 30} ${j * 120 + 120} ${wy}`).join(" ")}" stroke="#bfe6ff" stroke-width="6" fill="none" opacity="${0.8 - i * 0.2}"/>`).join("")}</g>
          <g id="${p}-hm" style="opacity:0"><rect width="${W}" height="2400" fill="url(#${p}-snow)"/>
            <path d="M0 1460 L200 1020 L340 1160 L560 760 L780 1120 L920 980 L1080 1200 L1080 1460 Z" fill="#8a9ab0" stroke="${C.ink}" stroke-width="4"/>
            <path d="M200 1020 L250 1090 L160 1100 Z M560 760 L640 880 L600 860 L540 900 L480 870 Z M920 980 L960 1040 L880 1040 Z" fill="#ffffff"/>
            <rect x="0" y="1440" width="${W}" height="1000" fill="#dfe6ee"/>
            ${matang(`${p}-hv`, 700, 1580, 0.9, { hair: "#ffffff", lower: "#e8f0f8", robe: "#e8f0f8" })}</g>
          ${buffalo(`${p}-b`, -400, 1580, 0.95)}`,
        html: tag(`${p}-td`, 540, 440, "भैंसा राक्षस दुंदुभि", "red") + tag(`${p}-to`, 540, 440, "समुद्र: \"हिमालय से लड़ो\"") + tag(`${p}-th`, 540, 440, "हिमालय: \"बाली से लड़ो!\""),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Vali grabs the horns, slams him down, hurls the body ----------
  {
    id: "s03",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.osc(`${p}-b-hd`, 0.3, 0.25, 9, { r: 10 });
      shake(k, p, 0.6, 5, 8);
      k.walk(`${p}-v`, 0.6, L.w(1, "सींग") - 0.3, 420, 0.38);
      const tG = L.w(1, "सींग") - 0.2;
      k.mv(`${p}-v-al`, tG, 0.3, -80); k.mv(`${p}-v-ar`, tG, 0.3, -110);
      k.mood(`${p}-v`, tG, "open");
      k.label(`${p}-tg`, tG, L(2) - 0.15);
      const tS = L.w(1, "पटक") - 0.3;
      k.mv(`${p}-b`, tS, 0.35, { r: 70, y: 1640 }, "power3.in");
      k.op(`${p}-flash`, tS + 0.35, 0.06, 0.45); k.op(`${p}-flash`, tS + 0.41, 0.3, 0);
      shake(k, p, tS + 0.35, 7, 14);
      // hurled away
      const tH = L.w(2, "फेंक") - 0.6;
      k.mv(`${p}-v-al`, tH, 0.3, 150); k.mv(`${p}-v-ar`, tH, 0.3, -150);
      k.mv(`${p}-b`, tH + 0.1, 1.3, { x: -500, y: 300, r: -340, s: 0.3 }, "power2.out");
      k.label(`${p}-tf`, tH + 0.2);
      return {
        defs: grad(`${p}-sky`, [[0, "#1a1440"], [1, "#5a3a6a"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${stars(30, 1100)}${moon(200, 680, 50)}
          <path d="M0 1440 L0 1040 L260 1040 L260 1440 Z M820 1440 L820 1040 L1080 1040 L1080 1440 Z" fill="#5a3a2a" stroke="${C.ink}" stroke-width="5"/><path d="M260 1440 L260 1120 Q540 920 820 1120 L820 1440" fill="none" stroke="#7a5a3a" stroke-width="40"/>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#4a4a3a"/>
          ${buffalo(`${p}-b`, 760, 1580, 0.9, true)}
          ${vali(`${p}-v`, -150, 1580, 0.95)}`,
        html: tag(`${p}-tg`, 540, 440, "सींग पकड़कर पटका!", "red") + tag(`${p}-tf`, 540, 440, "एक योजन दूर फेंका"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the blood falls on Matanga's ashram; his curse on Vali ----------
  {
    id: "s04",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      for (let i = 0; i < 5; i++) { const t = 0.4 + i * 0.25; k.op(`${p}-d${i}`, t, 0.1, 1); k.mv(`${p}-d${i}`, t, 0.9, { dy: 560 }, "power2.in"); k.op(`${p}-d${i}`, t + 0.85, 0.1, 0); }
      k.label(`${p}-tm`, L.w(1, "मतंग") - 0.2, L(2) - 0.15);
      k.mood(`${p}-m`, 1.6, "open");
      const tC = L(2);
      k.mv(`${p}-m-ar`, tC, 0.4, -140, "back.out(1.4)");
      k.op(`${p}-ring`, L.w(2, "बाली") - 0.2, 0.4, 1);
      k.op(`${p}-flash`, L.w(2, "मर") - 0.3, 0.06, 0.35); k.op(`${p}-flash`, L.w(2, "मर") - 0.24, 0.3, 0);
      k.label(`${p}-tc`, L.w(2, "मर") - 0.3);
      return {
        defs: dayBg(p, "#6a7aa8", "#e8c8a0"),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          ${rishyamuk(560)}${tree(150, 1450, 0.8)}${tree(980, 1440, 0.75)}
          <rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>${hut(820, 1440, 0.6)}
          <ellipse id="${p}-ring" cx="540" cy="1260" rx="520" ry="320" fill="none" stroke="#ff5a3a" stroke-width="10" stroke-dasharray="30 20" opacity="0.9" style="opacity:0"/>
          ${matang(`${p}-m`, 430, 1580, 0.95, { seated: true, brows: "fierce", aL: -30, aR: 30 })}
          ${[0, 1, 2, 3, 4].map((i) => drop(`${p}-d${i}`, 330 + i * 70, 860 + (i % 2) * 40)).join("")}`,
        html: tag(`${p}-tm`, 540, 440, "मतंग ऋषि का आश्रम") + tag(`${p}-tc`, 540, 440, "\"बाली आया तो मृत्यु!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. so Sugriva is safe on Rishyamuka; he shows Dundubhi's skeleton ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-dome`, 0.3, 0.5, 1);
      k.walk(`${p}-v`, 0.3, L.end(1) - 0.6, 230, 0.4);
      k.mv(`${p}-v`, L.end(1) - 0.6, 0.25, { x: 170 }, "power2.out");
      k.mood(`${p}-v`, L.end(1) - 0.6, "open");
      k.label(`${p}-ts`, L.w(1, "ऋष्यमूक") - 0.2, L(2) - 0.15);
      const tK = L(2) - 0.1;
      k.op(`${p}-a`, tK, 0.35, 0); k.op(`${p}-k`, tK, 0.35, 1);
      k.mv(`${p}-sg-ar`, L.w(2, "कंकाल") - 0.4, 0.4, -100, "back.out(1.4)");
      k.mood(`${p}-l`, L.w(2, "कंकाल"), "open");
      k.label(`${p}-tk`, L.w(2, "कंकाल") - 0.2);
      return {
        defs: dayBg(p) + rgrad(`${p}-dg`, [[0, "#ffffff", 0], [0.8, "#bfe6ff", 0.15], [1, "#bfe6ff", 0.5]]),
        art: `<g id="${p}-a"><rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
            <rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>${rishyamuk(760)}
            <ellipse id="${p}-dome" cx="760" cy="1200" rx="430" ry="380" fill="url(#${p}-dg)" stroke="#bfe6ff" stroke-width="5" style="opacity:0"/>
            ${sugEx(`${p}-s`, 760, 990, 0.55)}
            ${vali(`${p}-v`, -150, 1580, 0.82)}</g>
          <g id="${p}-k" style="opacity:0">${forest(p)}
            ${lakEx(`${p}-l`, 110, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.95)}
            ${skeleton(`${p}-sk`, 620, 1560, 0.85)}
            ${sugEx(`${p}-sg`, 990, 1580, 0.8)}</g>`,
        html: tag(`${p}-ts`, 540, 440, "ऋष्यमूक पर सुग्रीव सुरक्षित") + tag(`${p}-tk`, 540, 440, "दुंदुभि का कंकाल"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Ram's toe; "but those were dry bones!" ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-r`, 0.4, "smile");
      const tT = L.w(1, "अँगूठे") - 0.2;
      k.mv(`${p}-r-fr`, tT, 0.15, { dy: -40 }, "power2.out"); k.mv(`${p}-r-fr`, tT + 0.15, 0.25, { dy: 40 }, "power2.in");
      k.mv(`${p}-sk`, tT + 0.15, 1.4, { x: 1100, y: -100, r: 520, s: 0.2 }, "power2.in");
      k.op(`${p}-sk`, tT + 1.35, 0.2, 0);
      k.mood(`${p}-sg`, tT + 0.4, "open"); k.mood(`${p}-l`, tT + 0.4, "open");
      pop(k, `${p}-yj`, L.w(1, "दस") - 0.2, L(2) - L.w(1, "दस") - 0.1);
      const sk = sparkles(p, 8, 380, 1520, 160);
      sk.run(k, tT, 1.0);
      // Sugriva is still unsure
      const tD = L(2);
      k.mood(`${p}-l`, tD, "smile");
      k.mv(`${p}-sg-al`, tD, 0.4, 60); k.mv(`${p}-sg-ar`, tD, 0.4, -60);
      k.mv(`${p}-sg-h`, tD + 0.2, 0.4, 10);
      k.label(`${p}-tdr`, L.w(2, "सूखी") - 0.2);
      return {
        defs: dayBg(p),
        art: `${forest(p)}
          ${lakEx(`${p}-l`, 110, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.95)}
          ${skeleton(`${p}-sk`, 620, 1560, 0.85)}
          ${sugEx(`${p}-sg`, 990, 1580, 0.82)}
          ${badge(`${p}-yj`, 540, 980, "10 योजन दूर!")}
          ${sk.art}`,
        html: tag(`${p}-tdr`, 540, 440, "\"ये तो सूखी हड्डियाँ थीं!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the seven sal trees; Jai Shri Ram ----------
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
      const sal = (x) => `<g transform="translate(${x},110) scale(0.5)"><path d="M-14 0 L-10 -260 L10 -260 L14 0 Z" fill="#6b4423" stroke="${C.ink}" stroke-width="4"/><ellipse cy="-300" rx="70" ry="90" fill="#3f7a3a" stroke="${C.ink}" stroke-width="4"/></g>`;
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-400" y="-290" width="800" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${[-270, -180, -90, 0, 90, 180, 270].map(sal).join("")}
            <path d="M-360 40 L360 40" stroke="#fff3c4" stroke-width="6"/><path d="M340 26 L372 40 L340 54 Z" fill="#e8e8f0" stroke="${C.ink}" stroke-width="2"/>
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 23: सात साल के पेड़</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
