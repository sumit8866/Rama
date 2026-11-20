// Episode 35 (Hindi reel): Sugriva sends search parties in four directions (Valmiki, Kishkindha 40-43). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, rays, treasure } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, rnd, kit, tag, big, sparkles, petals, glowDef, stars } from "../../reel-kit.mjs";

reseed(3535);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const sug = (id, x, y, s, extra = {}) => `${CAST.sugriva(id, x, y, s, { hs: HS, ...extra })}<g transform="${T(x, y + (extra.seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}">${beadsSvg(["#ffe27a", "#f0b62a"])}</g>`;
const vanara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const jambavan = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, skin: "#4a3a2a", muzzle: "#8a7a6a", tail: null, beard: "sage", hair: "#e8e4dc", lower: "#6a4a2a", sash: C.gold, ...extra });
const nila = (id, x, y, s, extra = {}) => vanara(id, x, y, s, { skin: "#8a7a9a", tail: "#8a7a9a", muzzle: "#d8c8e0", lower: "#2f4a8a", sash: C.gold, ...extra });
// the three new leaders: Vinata (east), Sushena (west, Tara's father), Shatabali (north)
const vinata = (id, x, y, s, extra = {}) => vanara(id, x, y, s, { skin: "#7a7a8a", tail: "#7a7a8a", muzzle: "#d0d0d8", lower: "#2f6a4a", sash: C.gold, ...extra });
const sushena = (id, x, y, s, extra = {}) => vanara(id, x, y, s, { hat: "royal", skin: "#9a8068", tail: "#9a8068", muzzle: "#e8d8c0", hair: "#e8e4dc", lower: "#6a2a4a", sash: C.gold, ...extra });
const shatabali = (id, x, y, s, extra = {}) => vanara(id, x, y, s, { skin: "#6a4a3a", tail: "#6a4a3a", muzzle: "#d8b890", lower: "#2f4a8a", sash: C.gold, ...extra });
const labelAbove = (x, y, text, size = 34) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${size}" fill="#fff3cf" stroke="#3a1408" stroke-width="5" paint-order="stroke">${text}</text>`;
const crowd = (n, x0, y0, cols, dx = 58, dy = 40, colors = ["#a8743a", "#2a2020", "#c98a3a", "#e0a040"]) => Array.from({ length: n }, (_, i) => { const x = x0 + (i % cols) * dx + (Math.floor(i / cols) % 2) * 26, y = y0 - Math.floor(i / cols) * dy; return `<g transform="translate(${x},${y})"><circle r="24" fill="${colors[i % colors.length]}" stroke="${C.ink}" stroke-width="2"/><ellipse cy="8" rx="14" ry="10" fill="#e8c890"/><circle cx="-7" cy="-5" r="3" fill="${C.ink}"/><circle cx="7" cy="-5" r="3" fill="${C.ink}"/></g>`; }).join("");
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const popLabel = (id, x, y, text, size = 38) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">${labelAbove(0, 0, text, size)}</g></g>`;
// a party marches: the wrapper slides to x = 0, every member's body bobs
const march = (k, wrap, members, t0, t1) => {
  k.mv(wrap, t0, t1 - t0, { x: 0 }, "power1.out");
  const n = Math.max(1, Math.floor((t1 - t0 - 0.3) / 0.25));
  members.forEach((m) => k.osc(`${m}-b`, t0, 0.25, n, { y: -6 }));
};
const peak = (x, base, w, h, fill, snow = null) => `<path d="M${x - w / 2} ${base} L${x} ${base - h} L${x + w / 2} ${base} Z" fill="${fill}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>${snow ? `<path d="M${x - w * 0.16} ${base - h * 0.68} L${x} ${base - h} L${x + w * 0.16} ${base - h * 0.68} L${x + w * 0.06} ${base - h * 0.62} L${x - w * 0.04} ${base - h * 0.7} Z" fill="${snow}"/>` : ""}`;
const sky = (p, stops) => grad(`${p}-sky`, stops);
const skyRect = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>`;
const AUTUMN = [[0, "#5a8ac8"], [1, "#f0e6c8"]];

// a sun whose position can be tweened: outer group at (x,y), spinning rays inside
function sunGroup(id, x, y, r, color = "#ffc84a") {
  const rs = Array.from({ length: 16 }, (_, i) => { const a = (i * 22.5 * Math.PI) / 180; return `<path d="M${(Math.cos(a - 0.08) * r * 1.15).toFixed(1)} ${(Math.sin(a - 0.08) * r * 1.15).toFixed(1)} L${(Math.cos(a) * r * 1.8).toFixed(1)} ${(Math.sin(a) * r * 1.8).toFixed(1)} L${(Math.cos(a + 0.08) * r * 1.15).toFixed(1)} ${(Math.sin(a + 0.08) * r * 1.15).toFixed(1)} Z" fill="${color}" opacity="0.6"/>`; }).join("");
  return `<g id="${id}" transform="${T(x, y)}"><g id="${id}-rays" transform="${T(0, 0)}">${rs}</g><circle r="${r}" fill="${color}" stroke="${C.saffron}" stroke-width="4"/></g>`;
}

export const SCENES = [
  // ---------- 1. hook: Sugriva's order — search all four directions ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-s-ar`, 0.3, 0.4, -150, "back.out(1.4)"); k.mood(`${p}-s`, 0.3, "open");
      pop(k, `${p}-map`, 0.3);
      const tA = L.w(1, "चारों") - 0.3;
      [0, 1, 2, 3].forEach((i) => pop(k, `${p}-d${i}`, tA + i * 0.22));
      k.mv(`${p}-rose`, tA + 1.0, 1.2, 45, "power2.inOut");
      k.label(`${p}-tc`, L.w(1, "सीता") - 0.3);
      const dirs = [[0, "उत्तर", 0, -168], [90, "पूर्व", 180, 14], [180, "दक्षिण", 0, 205], [270, "पश्चिम", -178, 14]];
      return {
        defs: sky(p, AUTUMN),
        art: `${skyRect(p)}
          <path d="M0 1200 L180 1060 L360 1160 L560 1000 L760 1150 L900 1060 L1080 1180 L1080 1440 L0 1440 Z" fill="#8a7a8a" opacity="0.55"/>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#9a9a5a"/>
          ${crowd(22, 420, 1440, 11, 62, 44)}
          <g transform="translate(640,1000)"><g id="${p}-map" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <circle r="240" fill="#f3e2b8" stroke="${C.ink}" stroke-width="6"/><circle r="214" fill="none" stroke="#b0884a" stroke-width="3" stroke-dasharray="10 8"/>
            <g id="${p}-rose" transform="${T(0, 0)}"><path d="M0 -70 L14 -14 L70 0 L14 14 L0 70 L-14 14 L-70 0 L-14 -14 Z" fill="#c9993a" stroke="${C.ink}" stroke-width="3"/></g>
            ${dirs.map(([r, name, lx, ly], i) => `<g id="${p}-d${i}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><g transform="rotate(${r})"><path d="M0 -76 L0 -100" stroke="${C.verm}" stroke-width="12" stroke-linecap="round"/><path d="M-18 -96 L0 -126 L18 -96 Z" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/></g><text x="${lx}" y="${ly}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="40" fill="#5a1a0a">${name}</text></g>`).join("")}
          </g></g>
          ${sug(`${p}-s`, 220, 1580, 0.9)}`,
        html: tag(`${p}-tc`, 540, 440, "सीता जी को खोजो!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. EAST: Vinata, across Ganga-Yamuna, to the sunrise mountain Udaya ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-sun`, 0.2, dur - 0.2, { y: 830 }, "power1.out");
      k.mv(`${p}-sun-rays`, 0, dur, 40, "none");
      march(k, `${p}-party`, [`${p}-v`, `${p}-f1`, `${p}-f2`], 0.2, L.w(1, "उदय"));
      k.label(`${p}-tg`, L.w(1, "गंगा") - 0.3, L.w(1, "उदय") - 0.4);
      pop(k, `${p}-lu`, L.w(1, "उदय") - 0.2);
      k.label(`${p}-tu`, L.w(1, "सूरज") - 0.3);
      return {
        defs: sky(p, [[0, "#4a6aa8"], [0.55, "#f0a0a0"], [1, "#ffd8a0"]]) + glowDef(`${p}-sg`, "#ffb84a"),
        art: `${skyRect(p)}
          <circle cx="780" cy="900" r="320" fill="url(#${p}-sg)" opacity="0.7"/>
          ${sunGroup(`${p}-sun`, 780, 1180, 80)}
          <path d="M0 1260 L160 1150 L330 1230 L480 1140 L560 1440 L0 1440 Z" fill="#9a7a9a" opacity="0.7"/>
          ${peak(780, 1440, 560, 440, "#6a5a8a")}
          ${popLabel(`${p}-lu`, 780, 1300, "उदय पर्वत", 40)}
          <rect x="0" y="1420" width="${W}" height="1000" fill="#7a9a5a"/>
          <path d="M0 1432 Q270 1414 540 1432 T1080 1432 L1080 1490 Q810 1508 540 1490 T0 1490 Z" fill="#5a9ad8" stroke="#3a6aa8" stroke-width="3"/>
          <path d="M60 1458 q30 -10 60 0 M300 1466 q30 -10 60 0 M620 1456 q30 -10 60 0 M880 1464 q30 -10 60 0" stroke="#cfe6ff" stroke-width="4" fill="none"/>
          <g id="${p}-party" transform="${T(-700, 0)}">
            ${vanara(`${p}-f2`, 120, 1580, 0.64)}${vanara(`${p}-f1`, 280, 1580, 0.7, { skin: "#c98a3a", tail: "#c98a3a" })}
            ${vinata(`${p}-v`, 460, 1580, 0.8)}${labelAbove(460, 1580 - 0.8 * 475, "विनत")}</g>`,
        html: tag(`${p}-tg`, 540, 440, "गंगा-यमुना पार") + tag(`${p}-tu`, 540, 440, "पूर्व: जहाँ सूरज उगता है", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. SOUTH: Angada with Hanuman, Jambavan, Nila; Vindhya, Malaya, the ocean ----------
  {
    id: "s03",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      ["अंगद", "हनुमान", "जाम्बवान", "नील"].forEach((w, i) => { const t = L.w(1, w) - 0.4; k.op(`${p}-c${i}`, t, 0.2, 1); k.mv(`${p}-c${i}`, t, 0.6, { y: 0 }, "back.out(1.6)"); });
      k.mv(`${p}-l1-ar`, L.w(1, "हनुमान"), 0.4, -150, "back.out(1.4)"); k.mood(`${p}-l1`, L.w(1, "हनुमान"), "smile");
      k.label(`${p}-ts`, L.w(1, "दक्षिण") - 0.2, L(2) - 0.2);
      pop(k, `${p}-lv`, L.w(2, "विंध्य") - 0.2);
      const tM = L.w(2, "मलय") - 0.4;
      k.op(`${p}-a`, tM, 0.4, 0); k.op(`${p}-b`, tM, 0.4, 1);
      pop(k, `${p}-lm`, tM + 0.2);
      k.osc(`${p}-wv`, tM, 0.8, Math.floor((dur - tM) / 0.8), { x: 30 });
      k.label(`${p}-tsg`, L.w(2, "सागर") - 0.3);
      for (let i = 0; i < 4; i++) k.mood(`${p}-l${i}`, L.w(2, "सागर"), "open");
      const lead = [[angada, 160, 0.74, "अंगद"], [hanEx, 390, 0.8, "हनुमान"], [jambavan, 630, 0.78, "जाम्बवान"], [nila, 860, 0.72, "नील"]];
      return {
        defs: sky(p, AUTUMN),
        art: `${skyRect(p)}
          <g id="${p}-a">
            ${[[140, 300, 300], [330, 340, 360], [540, 300, 320], [740, 340, 380], [940, 300, 300]].map(([x, w, h]) => peak(x, 1440, w + 120, h, "#5a8a4a")).join("")}
            ${popLabel(`${p}-lv`, 540, 1040, "विंध्य पर्वत", 42)}</g>
          <g id="${p}-b" style="opacity:0">
            <rect x="0" y="1120" width="${W}" height="330" fill="#3a7ab8"/>
            <g id="${p}-wv" transform="${T(0, 0)}">${[1170, 1240, 1310, 1380].map((y, j) => Array.from({ length: 9 }, (_, i) => `<path d="M${-60 + i * 140 + (j % 2) * 60} ${y} q30 -16 60 0" stroke="#cfe6ff" stroke-width="5" fill="none"/>`).join("")).join("")}</g>
            ${peak(160, 1440, 420, 420, "#4a7a3a")}<circle cx="110" cy="1300" r="40" fill="#3a6a2a"/><circle cx="210" cy="1330" r="36" fill="#3a6a2a"/>
            ${popLabel(`${p}-lm`, 230, 980, "मलय पर्वत", 40)}
            ${labelAbove(700, 1090, "सागर", 54)}</g>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#c9a86a"/>
          ${lead.map(([fn, x, s, name], i) => `<g id="${p}-c${i}" transform="${T(0, 300)}" style="opacity:0">${fn(`${p}-l${i}`, x, 1580, s, { aL: -26, aR: 26, ...(i === 1 ? { propR: "" } : {}) })}${labelAbove(x, 1580 - s * 475, name)}</g>`).join("")}`,
        html: tag(`${p}-ts`, 540, 440, "दक्षिण: युवराज अंगद का दल") + tag(`${p}-tsg`, 540, 440, "आगे विशाल सागर!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. WEST: Sushena, Tara's father, 2 lakh vanaras, to Astachal where the sun sets ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-sun`, 0.2, dur - 0.2, { y: 1200 }, "power1.in");
      k.mv(`${p}-sun-rays`, 0, dur, -40, "none");
      march(k, `${p}-party`, [`${p}-su`, `${p}-f1`], 0.2, L.w(1, "दो") + 0.2);
      k.label(`${p}-tt`, L.w(1, "तारा") - 0.3, L.w(1, "दो") - 0.3);
      k.op(`${p}-cr`, L.w(1, "दो") - 0.3, 0.6, 1);
      k.label(`${p}-tl`, L.w(1, "दो") - 0.2, L.w(1, "अस्ताचल") - 0.4);
      pop(k, `${p}-la`, L.w(1, "अस्ताचल") - 0.2);
      k.label(`${p}-ta`, L.w(1, "सूरज") - 0.3);
      return {
        defs: sky(p, [[0, "#3a2a6a"], [0.5, "#d8604a"], [1, "#ffb060"]]) + glowDef(`${p}-sg`, "#ff9a4a"),
        art: `${skyRect(p)}
          <circle cx="300" cy="1000" r="340" fill="url(#${p}-sg)" opacity="0.7"/>
          ${sunGroup(`${p}-sun`, 300, 820, 80, "#ff8a3a")}
          <path d="M520 1440 L680 1220 L820 1320 L960 1180 L1080 1260 L1080 1440 Z" fill="#6a3a5a" opacity="0.75"/>
          ${peak(300, 1440, 560, 470, "#4a3a5a")}
          ${popLabel(`${p}-la`, 300, 1310, "अस्ताचल", 42)}
          <rect x="0" y="1430" width="${W}" height="1000" fill="#b0784a"/>
          <g id="${p}-cr" style="opacity:0">${crowd(30, 500, 1450, 10, 60, 40, ["#9a8068", "#a8743a", "#7a5a3a", "#c98a3a"])}</g>
          <g id="${p}-party" transform="${T(600, 0)}">
            ${sushena(`${p}-su`, 560, 1580, 0.8)}${labelAbove(560, 1580 - 0.8 * 475, "सुषेण")}
            ${vanara(`${p}-f1`, 790, 1580, 0.68, { skin: "#7a5a3a", tail: "#7a5a3a" })}</g>`,
        html: tag(`${p}-tt`, 540, 440, "तारा के पिता सुषेण") + tag(`${p}-tl`, 540, 440, "दो लाख वानर!", "red") + tag(`${p}-ta`, 540, 440, "पश्चिम: जहाँ सूरज डूबता है"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. NORTH: Shatabali, to the snowy Himalaya and Kailash ----------
  {
    id: "s05",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      march(k, `${p}-party`, [`${p}-sh`, `${p}-f1`, `${p}-f2`], 0.2, L.w(1, "कैलाश"));
      k.mv(`${p}-snow`, 0, dur, { y: 260 }, "none");
      k.label(`${p}-tn`, L.w(1, "उत्तर") - 0.2, L.w(1, "हिमालय") - 0.3);
      pop(k, `${p}-lh`, L.w(1, "हिमालय") - 0.2);
      pop(k, `${p}-lk`, L.w(1, "कैलाश") - 0.2);
      k.op(`${p}-kg`, L.w(1, "कैलाश") - 0.2, 0.6, 1);
      k.label(`${p}-tb`, L.w(1, "बर्फ़ीले") - 0.3);
      const flakes = Array.from({ length: 46 }, () => `<circle cx="${Math.round(rnd() * W)}" cy="${Math.round(200 + rnd() * 1300)}" r="${(3 + rnd() * 4).toFixed(1)}" fill="#fff" opacity="${(0.6 + rnd() * 0.4).toFixed(2)}"/>`).join("");
      return {
        defs: sky(p, [[0, "#7aa8d8"], [1, "#eef6ff"]]) + glowDef(`${p}-kgg`, "#fff4c8"),
        art: `${skyRect(p)}
          <circle id="${p}-kg" cx="600" cy="900" r="300" fill="url(#${p}-kgg)" style="opacity:0"/>
          ${peak(220, 1440, 480, 420, "#8a9ab8", "#ffffff")}${peak(920, 1440, 420, 380, "#8a9ab8", "#ffffff")}
          ${peak(600, 1440, 520, 560, "#9aa8c4", "#ffffff")}
          ${popLabel(`${p}-lh`, 220, 1150, "हिमालय", 40)}${popLabel(`${p}-lk`, 600, 840, "कैलाश", 42)}
          <rect x="0" y="1430" width="${W}" height="1000" fill="#e8eef6"/>
          <g id="${p}-party" transform="${T(-700, 0)}">
            ${vanara(`${p}-f2`, 170, 1580, 0.64, { skin: "#8a6a4a", tail: "#8a6a4a" })}${vanara(`${p}-f1`, 330, 1580, 0.7)}
            ${shatabali(`${p}-sh`, 520, 1580, 0.8)}${labelAbove(520, 1580 - 0.8 * 475, "शतबली")}</g>
          <g id="${p}-snow" transform="${T(0, 0)}">${flakes}</g>`,
        html: tag(`${p}-tn`, 540, 440, "उत्तर: शतबली का दल") + tag(`${p}-tb`, 540, 440, "बर्फ़ीले पहाड़ों तक", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. "Return within one month. Whoever finds Sita gets a big reward." ----------
  {
    id: "s06",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-s-ar`, 0.3, 0.4, -150, "back.out(1.4)"); k.mood(`${p}-s`, 0.3, "open");
      const tM = L.w(1, "महीने") - 0.4;
      for (let i = 0; i < 7; i++) pop(k, `${p}-m${i}`, tM + i * 0.16);
      k.label(`${p}-tm`, L.w(1, "महीने") - 0.3, L(2) - 0.2);
      k.op(`${p}-moons`, L(2) - 0.1, 0.4, 0.35);
      k.mv(`${p}-s-ar`, L(2), 0.4, -40, "power2.out");
      const tI = L.w(2, "इनाम") - 0.4;
      pop(k, `${p}-tr`, tI); k.op(`${p}-gl`, tI, 0.5, 1);
      const sk = sparkles(p, 10, 560, 1430, 300); sk.run(k, tI + 0.2, 1.4);
      k.mood(`${p}-h`, tI + 0.2, "smile"); k.mood(`${p}-a`, tI + 0.2, "smile");
      k.label(`${p}-ti`, tI + 0.1);
      const dx = [0, 26, 52, 100, -52, -26, 0];
      const moonsSvg = dx.map((d, i) => `<g transform="translate(${190 + i * 110},900)"><g id="${p}-m${i}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><clipPath id="${p}-mc${i}"><circle r="40"/></clipPath><circle r="40" fill="#fbf1d0"/><circle cx="${d}" r="42" fill="#2a2a58" clip-path="url(#${p}-mc${i})"/><circle r="40" fill="none" stroke="#fff4d6" stroke-width="2" opacity="0.6"/></g></g>`).join("");
      return {
        defs: sky(p, [[0, "#0e1238"], [1, "#3a3a6a"]]) + glowDef(`${p}-gg`),
        art: `${skyRect(p)}${stars(40, 760)}
          <g id="${p}-moons">${moonsSvg}</g>
          <path d="M0 1300 L200 1180 L380 1260 L600 1150 L820 1250 L1080 1160 L1080 1440 L0 1440 Z" fill="#2a2a4a"/>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#4a4a5a"/>
          <circle id="${p}-gl" cx="560" cy="1460" r="260" fill="url(#${p}-gg)" style="opacity:0"/>
          <g transform="translate(500,1560)"><g id="${p}-tr" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">${treasure(40, 0)}</g></g>
          ${sug(`${p}-s`, 220, 1580, 0.9)}
          ${angada(`${p}-a`, 745, 1580, 0.66, { aL: -26, aR: 26 })}${hanEx(`${p}-h`, 880, 1580, 0.7, { propR: "", aL: -26, aR: 26 })}
          ${sk.art}`,
        html: tag(`${p}-tm`, 540, 440, "एक महीने में लौटना!", "red") + tag(`${p}-ti`, 540, 440, "सीता जी का पता = बड़ा इनाम"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: Ram's ring; Jai Shri Ram ----------
  {
    id: "s07",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-next`, L(1) - 0.2, 0.3, 1);
      k.mv(`${p}-next`, L(1) - 0.2, 0.5, { s: 0.9 }, "back.out(1.8)");
      k.mv(`${p}-ring`, L(1) + 0.3, 1.2, 360, "power2.inOut");
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
            <g transform="translate(0,-40)"><g id="${p}-ring" transform="${T(0, 0)}">
              <circle r="100" fill="none" stroke="${C.ink}" stroke-width="34"/><circle r="100" fill="none" stroke="${C.gold}" stroke-width="26"/><circle r="100" fill="none" stroke="#fff3b0" stroke-width="5" opacity="0.7"/>
              <rect x="-62" y="-160" width="124" height="74" rx="18" fill="${C.goldL}" stroke="${C.ink}" stroke-width="4"/>
              <text y="-108" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="40" fill="#7a1a0a">राम</text></g></g>
            <text y="175" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="52" fill="#ffd23a">भाग 36: राम की अंगूठी</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sug(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
