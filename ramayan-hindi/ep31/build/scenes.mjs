// Episode 31 (Hindi reel): the rainy season on Prasravana (Valmiki, Kishkindha 27-28). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, cloud, rays, throne, tree, lotus } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, shake, moon } from "../../reel-kit.mjs";

reseed(3131);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const ruma = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#b8844a", tail: "#b8844a", muzzle: "#ecc490", lower: "#2f7f6a", upper: "#7a3a5a", border: C.gold, hair: "#5a3a1a", ...extra });
const sitaEx = (id, x, y, s, extra = {}) => CAST.sita(id, x, y, s, { hs: HS, hat: "none", lower: "#c9a86a", upper: "#8a6a3a", border: "#6a4a2a", ...extra });
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
const eyeS = (x, y, s, seated = false) => [x - 14 * HS * s, y + (-262 + (seated ? 80 : 0)) * s - 52 * HS * s];

// the cave on Prasravana: a rock mass with a dark mouth; Ram sits in front of it
const cave = (fill = "#6a5a4a") => `<path d="M-40 1460 Q60 820 520 760 Q980 800 1120 1460 Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
  <path d="M140 1460 L140 1220 Q300 1000 460 1220 L460 1460 Z" fill="#1a1016" stroke="#3a2a2a" stroke-width="8"/>
  <path d="M600 900 L660 960 M760 880 L800 950 M880 1040 L940 1080" stroke="${C.ink}" stroke-width="4" opacity="0.4"/>`;
const pond = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="190" ry="44" fill="#3a7ab8" stroke="${C.ink}" stroke-width="3"/>${[-90, 0, 90].map((dx) => `<g transform="translate(${x + dx},${y - 12}) scale(0.45)">${lotus(0, 0, 1)}</g>`).join("")}`;
const peacock = (id, x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <g transform="translate(-10,-70)"><g id="${id}-fan" transform="${T(0, 0, 0, 0.3)}">${Array.from({ length: 11 }, (_, i) => { const a = -75 + i * 15; return `<g transform="rotate(${a})"><path d="M0 0 L0 -150" stroke="#2f7a4a" stroke-width="6"/><ellipse cy="-150" rx="16" ry="22" fill="#1f8a6a" stroke="${C.ink}" stroke-width="2"/><circle cy="-152" r="8" fill="#1f4aa8"/><circle cy="-152" r="3.5" fill="#f0b62a"/></g>`; }).join("")}</g></g>
  <ellipse cx="0" cy="-60" rx="38" ry="30" fill="#1f5ab8" stroke="${C.ink}" stroke-width="3"/>
  <path d="M20 -78 Q36 -130 30 -150" stroke="#1f5ab8" stroke-width="16" fill="none" stroke-linecap="round"/><circle cx="30" cy="-155" r="14" fill="#1f5ab8" stroke="${C.ink}" stroke-width="2"/>
  <path d="M42 -156 L58 -150 L42 -146 Z" fill="#e2a72e"/><circle cx="32" cy="-158" r="3" fill="#fff"/>
  <path d="M26 -170 L22 -186 M32 -170 L32 -188 M38 -170 L42 -186" stroke="#1f5ab8" stroke-width="3"/>
  <path d="M-10 -32 L-14 0 M10 -32 L12 0" stroke="#c9993a" stroke-width="5"/></g>`;
const frog = (id, x, y) => `<g id="${id}" transform="${T(x, y)}"><ellipse rx="34" ry="22" fill="#4a9a3a" stroke="${C.ink}" stroke-width="3"/><circle cx="-16" cy="-20" r="10" fill="#4a9a3a" stroke="${C.ink}" stroke-width="2"/><circle cx="16" cy="-20" r="10" fill="#4a9a3a" stroke="${C.ink}" stroke-width="2"/><circle cx="-16" cy="-20" r="4" fill="${C.ink}"/><circle cx="16" cy="-20" r="4" fill="${C.ink}"/><path d="M-14 4 Q0 12 14 4" stroke="${C.ink}" stroke-width="2" fill="none"/></g>`;
const rain = (id, n = 90) => `<g id="${id}" transform="${T()}" style="opacity:0">${Array.from({ length: n }, (_, i) => `<path d="M${(i * 137) % 1100} ${300 + ((i * 271) % 1300)} l-14 46" stroke="#b8d8f8" stroke-width="4" stroke-linecap="round" opacity="0.75"/>`).join("")}</g>`;
const runRain = (k, id, t0, t1) => { k.op(id, t0, 0.4, 1); k.osc(id, t0, 0.12, Math.max(1, Math.floor((t1 - t0) / 0.12) - 1), { dy: 46, dx: -14 }, "none"); };
const bolt = (id, x, y) => `<path id="${id}" d="M${x} ${y} L${x - 40} ${y + 120} L${x + 10} ${y + 120} L${x - 30} ${y + 260}" stroke="#fff6c4" stroke-width="10" fill="none" stroke-linejoin="round" style="opacity:0"/>`;
const flashBolt = (k, p, id, t) => { k.op(id, t, 0.05, 1); k.op(id, t + 0.12, 0.2, 0); k.op(`${p}-flash`, t, 0.05, 0.35); k.op(`${p}-flash`, t + 0.05, 0.3, 0); };
const darkClouds = (p, y = 620) => [[160, y], [560, y - 60], [920, y + 20]].map(([x, yy]) => cloud(x, yy, 2.2, "#4a4a6a", 0.95)).join("");
const bubble = (id, inner, w = 600, h = 300) => `<g transform="translate(560,960)"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><ellipse rx="${w / 2}" ry="${h / 2}" fill="#f6e6cc" stroke="${C.ink}" stroke-width="4"/>${inner}</g></g>`;
const showB = (k, id, t, hide = null) => { k.op(id, t, 0.25, 1); k.mv(id, t, 0.45, { s: 1 }, "back.out(1.8)"); if (hide != null) k.op(id, hide, 0.25, 0); };
const notes = (p) => [0, 1, 2].map((i) => `<g id="${p}-n${i}" transform="${T(940 + i * 30, 1040)}" style="opacity:0"><text font-family="Mukta" font-weight="800" font-size="48" fill="#fff3cf">♪</text></g>`).join("");

export const SCENES = [
  // ---------- 1. hook: lightning in the clouds, like Sita struggling in Ravana's grip ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      runRain(k, `${p}-rn`, 0, dur);
      const tL = L.w(1, "बिजली") - 0.2;
      flashBolt(k, p, `${p}-bt`, tL);
      k.op(`${p}-vis`, tL, 0.3, 0.85);
      flashBolt(k, p, `${p}-bt`, tL + 1.6);
      k.mood(`${p}-r`, tL + 0.2, "sad");
      k.mv(`${p}-r-h`, tL + 0.3, 0.6, -8);
      const [ex, ey] = eyeS(300, 1590, 0.92, true);
      cry(k, `${p}-t0`, ex, ey, tL + 0.8, 5);
      k.label(`${p}-ts`, L.w(1, "रावण") - 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#0e0e24"], [1, "#2a2a44"]]) + rgrad(`${p}-vg`, [[0, "#fff6d8", 0.55], [1, "#fff6d8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${darkClouds(p, 700)}
          ${cave("#3a3040")}<rect x="0" y="1450" width="${W}" height="1000" fill="#2a3a2a"/>
          <g id="${p}-vis" style="opacity:0"><circle cx="870" cy="700" r="190" fill="url(#${p}-vg)"/>
            <g opacity="0.8">${sitaEx(`${p}-vs`, 870, 820, 0.48, { mood: "sad", aL: 60, aR: -150 })}<path d="M760 700 Q820 760 850 720" stroke="#3a1a3a" stroke-width="22" stroke-linecap="round" fill="none"/></g></g>
          ${bolt(`${p}-bt`, 700, 600)}
          ${ramEx(`${p}-r`, 300, 1590, 0.92, { seated: true, aL: -26, aR: 26 })}${tear(`${p}-t0`, ex, ey)}
          ${rain(`${p}-rn`)}`,
        html: tag(`${p}-ts`, 540, 440, "बिजली में सीता की याद", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. the cave on Prasravana; the lotus pool, the river, music from Kishkindha ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-r`, 0.2, L.end(1) - 0.3, 300, 0.45);
      k.walk(`${p}-l`, 0.3, L.end(1) - 0.2, 470, 0.45);
      k.label(`${p}-tp`, L.w(1, "प्रस्रवण") - 0.3, L(2) - 0.15);
      k.op(`${p}-pd`, L.w(2, "कमल") - 0.3, 0.5, 1);
      for (let i = 0; i < 3; i++) { const t = L.w(2, "संगीत") - 0.4 + i * 0.3; k.op(`${p}-n${i}`, t, 0.2, 1); k.mv(`${p}-n${i}`, t, 1.4, { dy: -160, dx: -40 }, "power1.out"); k.op(`${p}-n${i}`, t + 1.0, 0.4, 0); }
      k.label(`${p}-tk`, L.w(2, "संगीत") - 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#7aa0c8"], [1, "#e8dcb0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${cloud(200, 640, 1.2, "#ffffff", 0.8)}
          <g transform="translate(980,1120)"><path d="M-80 0 L-80 -90 L-40 -120 L0 -90 L40 -130 L80 -90 L80 0 Z" fill="#9a7a5a" stroke="${C.ink}" stroke-width="3" opacity="0.8"/></g>
          ${notes(p)}
          ${cave()}<rect x="0" y="1450" width="${W}" height="1000" fill="#7a8a4a"/>
          <path d="M600 1460 Q800 1500 1080 1470 L1080 1520 Q800 1550 600 1500 Z" fill="#5a9ac8" opacity="0.9"/>
          <g id="${p}-pd" style="opacity:0">${pond(790, 1600)}</g>
          ${ramEx(`${p}-r`, -150, 1580, 0.9)}${lakEx(`${p}-l`, -320, 1580, 0.82)}`,
        html: tag(`${p}-tp`, 540, 440, "प्रस्रवण पर्वत की गुफा") + tag(`${p}-tk`, 540, 440, "किष्किंधा से संगीत"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. sleepless under the moon; Lakshman: "one who grieves never succeeds" ----------
  {
    id: "s03",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-mn`, 0.2, 0.8, 1); k.mv(`${p}-mn`, 0.2, 2.5, { dy: -120 }, "power1.out");
      k.mood(`${p}-r`, 0.5, "sad"); k.mv(`${p}-r-h`, 0.6, 0.6, -10);
      const [ex, ey] = eyeS(300, 1590, 0.92, true);
      cry(k, `${p}-t0`, ex, ey, 1.0, 5);
      k.label(`${p}-tn`, L.w(1, "नींद") - 0.3, L(2) - 0.15);
      k.walk(`${p}-l`, L(2) - 0.4, L(2) + 0.6, 520, 0.45);
      k.mv(`${p}-l-al`, L(2) + 0.6, 0.4, 70, "back.out(1.4)");
      k.mood(`${p}-l`, L(2) + 0.6, "open");
      k.mv(`${p}-r-h`, L.w(2, "धैर्य") - 0.3, 0.5, 0);
      k.label(`${p}-ts`, L.w(2, "सफल") - 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#0e1430"], [1, "#2a2a5a"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${stars(40, 1100)}
          <g id="${p}-mn" transform="${T(0, 0)}" style="opacity:0">${moon(840, 820, 70)}</g>
          ${cave("#3a3a4a")}<rect x="0" y="1450" width="${W}" height="1000" fill="#2a3a3a"/>
          ${ramEx(`${p}-r`, 300, 1590, 0.92, { seated: true, aL: -26, aR: 26 })}${tear(`${p}-t0`, ex, ey)}
          ${lakEx(`${p}-l`, 820, 1580, 0.86)}`,
        html: tag(`${p}-tn`, 540, 440, "नींद नहीं, सीता की याद") + tag(`${p}-ts`, 540, 440, "\"शरद ऋतु तक धैर्य रखिए\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the rains: hill-like clouds, dancing peacocks, frogs, rivers racing to the sea ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      runRain(k, `${p}-rn`, 0.2, dur);
      flashBolt(k, p, `${p}-bt`, L.w(1, "बादल") - 0.2);
      const tM = L.w(1, "मोर") - 0.4;
      for (const pc of ["pc1", "pc2"]) { k.mv(`${p}-${pc}-fan`, tM, 0.5, { s: 1 }, "back.out(1.6)"); k.osc(`${p}-${pc}-fan`, tM + 0.5, 0.3, Math.floor((dur - tM - 0.6) / 0.3), { r: 8 }); }
      const tF = L.w(1, "मेंढक") - 0.3;
      for (let i = 0; i < 3; i++) k.osc(`${p}-fr${i}`, tF + i * 0.15, 0.22, 9, { dy: -40 });
      k.label(`${p}-tr`, L.w(1, "वर्षा") - 0.3, L(2) - 0.15);
      // the river swells toward the sea
      k.mv(`${p}-rv`, L(2) - 0.1, 1.6, { sy: 2.4 }, "power1.out");
      k.mv(`${p}-wv`, L(2) - 0.1, dur - L(2), { dx: 260 }, "none");
      k.label(`${p}-ts`, L.w(2, "सागर") - 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#3a4a6a"], [1, "#8aa0b0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${darkClouds(p, 680)}${bolt(`${p}-bt`, 300, 660)}
          ${tree(80, 1440, 0.85, "#2f6a3a", "#1f4a2a")}${tree(1000, 1430, 0.8, "#2f6a3a", "#1f4a2a")}
          <rect x="0" y="1440" width="${W}" height="1000" fill="#4a7a3a"/>
          <g transform="translate(0,1500)"><g id="${p}-rv" transform="${T(0, 0, 0, 1, 1)}"><rect x="0" y="-30" width="${W}" height="60" fill="#3a7ab8"/></g></g>
          <g id="${p}-wv" transform="${T()}">${[0, 1, 2, 3, 4].map((i) => `<path d="M${i * 220 - 200} 1500 q30 -16 60 0 t60 0" stroke="#bfe6ff" stroke-width="5" fill="none"/>`).join("")}</g>
          ${peacock(`${p}-pc1`, 300, 1440, 1.0)}${peacock(`${p}-pc2`, 760, 1430, 0.85)}
          ${frog(`${p}-fr0`, 160, 1600)}${frog(`${p}-fr1`, 560, 1610)}${frog(`${p}-fr2`, 920, 1600)}
          ${rain(`${p}-rn`)}`,
        html: tag(`${p}-tr`, 540, 440, "वर्षा ऋतु", "red") + tag(`${p}-ts`, 540, 440, "नदियाँ सागर की ओर"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. trusting Sugriva: he is happy now; the roads are flooded; he'll keep his word ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      runRain(k, `${p}-rn`, 0, dur);
      showB(k, `${p}-b1`, L.w(1, "राज्य") - 0.4, L(2) - 0.1);
      k.label(`${p}-ts`, L.w(1, "पत्नी") - 0.3, L(2) - 0.15);
      k.mv(`${p}-r-ar`, L(2), 0.4, -60);
      k.mood(`${p}-r`, L.w(2, "वचन"), "smile");
      k.label(`${p}-tv`, L.w(2, "वचन") - 0.3);
      return {
        defs: grad(`${p}-sky`, [[0, "#3a4a6a"], [1, "#8aa0b0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${darkClouds(p, 620)}
          ${cave("#5a4a4a")}<rect x="0" y="1450" width="${W}" height="1000" fill="#4a6a3a"/>
          ${ramEx(`${p}-r`, 300, 1590, 0.92, { seated: true, aL: -26, aR: 26 })}${lakEx(`${p}-l`, 640, 1580, 0.86, { aL: -26, aR: 26 })}
          ${bubble(`${p}-b1`, `<g transform="translate(-40,130) scale(0.42)">${throne(0, 0, 1)}</g>${sugEx(`${p}-bs`, -40, 90, 0.42, { seated: true, aL: -20, aR: 20 })}${ruma(`${p}-bru`, 140, 120, 0.4, { aL: -26, aR: 26 })}`)}
          ${rain(`${p}-rn`)}`,
        html: tag(`${p}-ts`, 540, 440, "सुग्रीव सुख में") + tag(`${p}-tv`, 540, 440, "\"वो वचन याद रखेगा\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: Lakshman's anger; Jai Shri Ram ----------
  {
    id: "s06",
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
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]) + rgrad(`${p}-ang`, [[0, "#ff6a3a", 0.6], [1, "#c2361f", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <circle cy="-40" r="170" fill="url(#${p}-ang)"/>
            ${lakEx(`${p}-nl`, 0, 120, 0.62, { mood: "open", brows: "fierce", aL: -60, aR: -150 })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 32: लक्ष्मण का क्रोध</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
