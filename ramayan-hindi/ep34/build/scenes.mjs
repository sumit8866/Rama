// Episode 34 (Hindi reel): the vanara army gathers (Valmiki, Kishkindha 37-39). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, cloud, rays, tree } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake } from "../../reel-kit.mjs";

reseed(3434);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const sug = (id, x, y, s, extra = {}) => `${CAST.sugriva(id, x, y, s, { hs: HS, ...extra })}<g transform="${T(x, y + (extra.seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}">${beadsSvg(["#ffe27a", "#f0b62a"])}</g>`;
const vanara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, ...extra });
// Jambavan, the old king of the bears: dark fur, white beard, no tail
const jambavan = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, skin: "#4a3a2a", muzzle: "#8a7a6a", tail: null, beard: "sage", hair: "#e8e4dc", lower: "#6a4a2a", sash: C.gold, ...extra });
const kesari = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, hat: "royal", lower: "#8a1b1b", hair: "#d9d4c7", ...extra });
const labelAbove = (x, y, text) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="34" fill="#fff3cf" stroke="#3a1408" stroke-width="5" paint-order="stroke">${text}</text>`;
const crowd = (p, n, x0, y0, cols, dx = 58, dy = 40, colors = ["#a8743a", "#2a2020", "#c98a3a", "#e0a040"]) => Array.from({ length: n }, (_, i) => { const x = x0 + (i % cols) * dx + (Math.floor(i / cols) % 2) * 26, y = y0 - Math.floor(i / cols) * dy; return `<g transform="translate(${x},${y})"><circle r="24" fill="${colors[i % colors.length]}" stroke="${C.ink}" stroke-width="2"/><ellipse cy="8" rx="14" ry="10" fill="#e8c890"/><circle cx="-7" cy="-5" r="3" fill="${C.ink}"/><circle cx="7" cy="-5" r="3" fill="${C.ink}"/></g>`; }).join("");
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };

const autumnSky = (p) => grad(`${p}-sky`, [[0, "#5a8ac8"], [1, "#f0e6c8"]]);
const cave = `<path d="M-40 1460 Q60 900 420 860 Q760 900 860 1460 Z" fill="#6a5a4a" stroke="${C.ink}" stroke-width="5"/><path d="M120 1460 L120 1240 Q260 1060 400 1240 L400 1460 Z" fill="#1a1016" stroke="#3a2a2a" stroke-width="8"/>`;
const plain = (p, ground = "#9a9a5a") => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
  <path d="M0 1200 L180 1060 L360 1160 L560 1000 L760 1150 L900 1060 L1080 1180 L1080 1440 L0 1440 Z" fill="#8a7a8a" opacity="0.55"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="${ground}"/>`;
// a golden litter carried by four vanaras
const palki = (p, id) => `<g id="${id}" transform="${T(1400, 1580)}">
  <path d="M-300 -150 L300 -150" stroke="#7a4a22" stroke-width="14" stroke-linecap="round"/>
  <rect x="-150" y="-175" width="300" height="80" rx="14" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M-170 -330 L170 -330 L150 -300 L-150 -300 Z" fill="#fff3d6" stroke="${C.ink}" stroke-width="3"/><path d="M-140 -300 L-140 -175 M140 -300 L140 -175" stroke="${C.gold}" stroke-width="8"/>
  ${CAST.sugriva(`${p}-ps`, -50, -100, 0.48, { hs: HS, seated: true, aL: -20, aR: 20 })}${lakEx(`${p}-pl`, 70, -100, 0.44, { seated: true, back: null, aL: -20, aR: 20 })}
  ${[-260, -140, 140, 260].map((cx, i) => vanara(`${id}-c${i}`, cx, 0, 0.58, { aL: i < 2 ? -150 : 20, aR: i < 2 ? -20 : 150 })).join("")}</g>`;

export const SCENES = [
  // ---------- 1. hook: the sky dark with dust; crores of vanaras coming ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-dust`, 0.2, 1.2, 0.85); k.mv(`${p}-dust`, 0.2, dur, { dx: -240, s: 1.2 }, "none");
      k.op(`${p}-army`, 0.6, 0.8, 1); k.mv(`${p}-army`, 0.6, dur - 0.6, { dx: -300 }, "none");
      k.op(`${p}-dim`, 0.3, 1.2, 0.35);
      k.mood(`${p}-r`, L.w(1, "वानर") - 0.3, "open"); k.mood(`${p}-l`, L.w(1, "वानर") - 0.2, "open");
      k.label(`${p}-tv`, L.w(1, "करोड़ों") - 0.3);
      return {
        defs: autumnSky(p),
        art: `${plain(p)}
          <rect id="${p}-dim" width="${W}" height="2400" fill="#3a2a1a" style="opacity:0"/>
          <g id="${p}-dust" transform="${T(300, 0)}" style="opacity:0">${[[600, 1180, 300], [900, 1140, 260], [1200, 1200, 320], [400, 1230, 220]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.45}" fill="#c8a878" opacity="0.8"/>`).join("")}</g>
          <g id="${p}-army" transform="${T(300, 0)}" style="opacity:0">${crowd(p, 44, 420, 1440, 11, 62, 44)}</g>
          ${lakEx(`${p}-l`, 110, 1580, 0.84)}${ramEx(`${p}-r`, 290, 1580, 0.92)}`,
        html: tag(`${p}-tv`, 540, 440, "करोड़ों वानर!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Sugriva sends Hanuman to call vanaras from every mountain; black, golden, lion-maned ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-s-ar`, 0.3, 0.4, -150, "back.out(1.4)"); k.mood(`${p}-s`, 0.3, "open");
      k.mv(`${p}-h`, L.w(1, "हिमालय") - 0.3, 0.9, { x: 1300, y: 900, s: 0.5 }, "power2.in");
      k.label(`${p}-th`, L.w(1, "हनुमान") - 0.3, L(2) - 0.15);
      ["हिमालय", "विंध्य", "कैलाश"].forEach((w, i) => pop(k, `${p}-m${i}`, L.w(1, w) - 0.2));
      // the three kinds of vanaras arrive
      const tC = L(2) - 0.1;
      k.op(`${p}-a`, tC, 0.35, 0); k.op(`${p}-b`, tC, 0.35, 1);
      for (let i = 0; i < 3; i++) k.mv(`${p}-g${i}`, tC + i * 0.4, 1.6, { x: 0 }, "power2.out");
      k.label(`${p}-tc`, L.w(2, "काला") - 0.3);
      const mnt = (id, x, name) => `<g transform="translate(${x},1080)"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><path d="M-120 60 L0 -120 L120 60 Z" fill="#8a9ab0" stroke="${C.ink}" stroke-width="4"/><path d="M-40 -60 L0 -120 L40 -60 Z" fill="#fff"/>${labelAbove(0, 110, name)}</g></g>`;
      return {
        defs: autumnSky(p),
        art: `<g id="${p}-a">${plain(p, "#b08a5a")}
            ${mnt(`${p}-m0`, 220, "हिमालय")}${mnt(`${p}-m1`, 540, "विंध्य")}${mnt(`${p}-m2`, 860, "कैलाश")}
            ${sug(`${p}-s`, 330, 1580, 0.92)}${hanEx(`${p}-h`, 700, 1580, 0.86, { propR: "" })}</g>
          <g id="${p}-b" style="opacity:0">${plain(p)}
            <g id="${p}-g0" transform="${T(-700, 0)}">${[0, 1, 2].map((i) => vanara(`${p}-k${i}`, 180 + i * 130, 1240, 0.5, { skin: "#2a2224", tail: "#2a2224", muzzle: "#8a7a7a" })).join("")}${labelAbove(310, 1010, "काजल जैसे")}</g>
            <g id="${p}-g1" transform="${T(800, 0)}">${[0, 1, 2].map((i) => vanara(`${p}-o${i}`, 600 + i * 130, 1240, 0.5, { skin: "#e0b040", tail: "#e0b040", muzzle: "#fff0c0" })).join("")}${labelAbove(730, 1010, "सोने जैसे")}</g>
            <g id="${p}-g2" transform="${T(-800, 0)}">${[0, 1, 2, 3].map((i) => vanara(`${p}-y${i}`, 220 + i * 200, 1580, 0.62, { skin: "#c8702a", tail: "#c8702a", muzzle: "#f0c890", hair: "#e0a040" })).join("")}${labelAbove(520, 1300, "सिंह जैसे अयाल")}</g></g>`,
        html: tag(`${p}-th`, 540, 440, "हर पर्वत से वानर बुलाओ!") + tag(`${p}-tc`, 540, 440, "सब दौड़े चले आए", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Sugriva comes to Ram in a golden litter; Ram embraces him ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-pk`, 0.2, L.end(1) - 0.3, { x: 680 }, "power1.out");
      for (let i = 0; i < 4; i++) k.osc(`${p}-pk-c${i}-b`, 0.2, 0.25, Math.floor((L.end(1) - 0.5) / 0.25), { y: -6 });
      k.label(`${p}-tp`, L.w(1, "सोने") - 0.3, L(2) - 0.15);
      const tE = L.w(2, "गले") - 0.6;
      k.op(`${p}-a`, tE, 0.35, 0); k.op(`${p}-e`, tE, 0.35, 1);
      k.op(`${p}-gl`, tE, 0.5, 1);
      k.label(`${p}-tt`, L.w(2, "काम") - 0.3);
      return {
        defs: autumnSky(p) + glowDef(`${p}-gg`),
        art: `${plain(p)}${cave}
          <g id="${p}-a">${ramEx(`${p}-r`, 260, 1580, 0.92)}${palki(p, `${p}-pk`)}</g>
          <circle id="${p}-gl" cx="460" cy="1280" r="300" fill="url(#${p}-gg)" style="opacity:0"/>
          <g id="${p}-e" style="opacity:0">${lakEx(`${p}-el`, 760, 1580, 0.84)}
            ${sug(`${p}-es`, 540, 1580, 0.9, { aL: 64, aR: -8 })}${ramEx(`${p}-er`, 380, 1580, 0.92, { aR: -64, aL: 8 })}</g>`,
        html: tag(`${p}-tp`, 540, 440, "सोने की पालकी में सुग्रीव") + tag(`${p}-tt`, 540, 440, "\"अब काम का समय!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. the commanders: Jambavan, Nila, Mainda, Dvivida... and Kesari ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const names = ["जाम्बवान", "नील", "मैंद", "द्विविद"];
      names.forEach((w, i) => { const t = L.w(1, w) - 0.4; k.op(`${p}-c${i}`, t, 0.2, 1); k.mv(`${p}-c${i}`, t, 0.6, { y: 0 }, "back.out(1.6)"); });
      k.op(`${p}-cr`, L.w(1, "करोड़ों") - 0.4, 0.5, 1);
      k.label(`${p}-tc`, L.w(1, "करोड़ों") - 0.3, L(2) - 0.15);
      const tK = L.w(2, "केसरी") - 0.5;
      k.op(`${p}-k`, tK, 0.3, 1); k.mv(`${p}-k`, tK, 0.6, { y: 0 }, "back.out(1.6)");
      k.op(`${p}-kg`, tK, 0.4, 1);
      k.mv(`${p}-h-ar`, tK + 0.3, 0.4, -150, "back.out(1.4)"); k.mood(`${p}-h`, tK + 0.3, "open");
      k.label(`${p}-tk`, tK + 0.1);
      const lead = [[`jambavan`, 150, "जाम्बवान"], [`vanara`, 390, "नील"], [`vanara`, 630, "मैंद"], [`vanara`, 870, "द्विविद"]];
      const cols = [null, { skin: "#8a7a9a", tail: "#8a7a9a", muzzle: "#d8c8e0", lower: "#2f4a8a", sash: C.gold }, { skin: "#9a6a3a", tail: "#9a6a3a", lower: "#3a6a3a", sash: C.gold }, { skin: "#aa7a4a", tail: "#aa7a4a", lower: "#6a3a6a", sash: C.gold }];
      return {
        defs: autumnSky(p) + glowDef(`${p}-kgg`, "#ffd23a"),
        art: `${plain(p)}
          <g id="${p}-cr" style="opacity:0">${crowd(p, 33, 60, 1360, 11, 92, 46)}</g>
          ${lead.map(([kind, x, name], i) => `<g id="${p}-c${i}" transform="${T(0, 300)}" style="opacity:0">${kind === "jambavan" ? jambavan(`${p}-l${i}`, x, 1580, 0.82, { aL: -26, aR: 26 }) : vanara(`${p}-l${i}`, x, 1580, 0.78, { ...cols[i], aL: -26, aR: 26 })}${labelAbove(x, 1580 - 0.8 * 430, name)}</g>`).join("")}
          <circle id="${p}-kg" cx="540" cy="900" r="220" fill="url(#${p}-kgg)" style="opacity:0"/>
          <g id="${p}-k" transform="${T(0, 300)}" style="opacity:0"><g transform="translate(0,-560)">${kesari(`${p}-kk`, 460, 1580, 0.62, { aL: -26, aR: 26 })}${hanEx(`${p}-h`, 640, 1580, 0.56, { propR: "" })}</g></g>`,
        html: tag(`${p}-tc`, 540, 440, "हर सेनापति, करोड़ों वानर", "red") + tag(`${p}-tk`, 540, 440, "हनुमान के पिता केसरी"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. "together they will fight Ravana and bring Sita back" ----------
  {
    id: "s05",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-s-ar`, 0.3, 0.5, -110, "back.out(1.4)"); k.mood(`${p}-s`, 0.3, "open");
      k.op(`${p}-gl`, L.w(1, "सीता") - 0.4, 0.5, 1);
      k.mood(`${p}-r`, L.w(1, "सीता") - 0.2, "smile");
      k.mv(`${p}-rays`, 0, dur, 20, "none");
      const sk = sparkles(p, 10, 300, 1250, 260); sk.run(k, L.w(1, "सीता") - 0.2, 1.4);
      k.label(`${p}-tr`, L.w(1, "रावण") - 0.3);
      return {
        defs: autumnSky(p) + glowDef(`${p}-gg`),
        art: `${plain(p)}${rays(`${p}-rays`, 300, 1250, 900, 18, "#ffe08a", 0.18)}
          <g>${crowd(p, 40, 470, 1440, 10, 60, 44)}</g>
          <circle id="${p}-gl" cx="300" cy="1280" r="280" fill="url(#${p}-gg)" style="opacity:0"/>
          ${lakEx(`${p}-l`, 90, 1580, 0.82)}${ramEx(`${p}-r`, 280, 1580, 0.92)}${sug(`${p}-s`, 500, 1580, 0.88)}
          ${sk.art}`,
        html: tag(`${p}-tr`, 540, 440, "\"रावण से लड़ेंगे, सीता लाएँगे!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: the search in four directions; Jai Shri Ram ----------
  {
    id: "s06",
    extra: 2.0,
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
      const arrow = (r, lbl) => `<g transform="rotate(${r})"><path d="M0 -40 L0 -170" stroke="#ffd23a" stroke-width="14" stroke-linecap="round"/><path d="M-26 -150 L0 -200 L26 -150 Z" fill="#ffd23a"/></g>`;
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <g transform="translate(0,-70) scale(0.75)">${[0, 90, 180, 270].map((r) => arrow(r)).join("")}<circle r="36" fill="#a8743a" stroke="${C.ink}" stroke-width="3"/><ellipse cy="10" rx="20" ry="13" fill="#e8c890"/></g>
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="50" fill="#ffd23a">भाग 35: चारों दिशाओं में खोज</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sug(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
