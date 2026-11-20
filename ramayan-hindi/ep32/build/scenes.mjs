// Episode 32 (Hindi reel): Lakshman's anger (Valmiki, Kishkindha 29-32). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, cloud, rays, throne, chhatra, birds } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, hallV } from "../../reel-kit.mjs";

reseed(3232);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const lakAngry = (id, x, y, s, extra = {}) => lakEx(id, x, y, s, { brows: "fierce", mood: "open", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const beadsSvg = (cols) => Array.from({ length: 13 }, (_, i) => { const t = i / 12; return `<circle cx="${(-56 + 112 * t).toFixed(1)}" cy="${(480 * t * (1 - t)).toFixed(1)}" r="10" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="1.5"/>`; }).join("");
const sug = (id, x, y, s, extra = {}) => `${CAST.sugriva(id, x, y, s, { hs: HS, ...extra })}<g transform="${T(x, y + (extra.seated ? 80 * s : 0) - 258 * s, 0, s * 0.9)}">${beadsSvg(["#ffe27a", "#f0b62a"])}</g>`;
const tara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#c49a5a", tail: "#c49a5a", muzzle: "#f0d29a", lower: "#7a1f6a", upper: "#c2361f", border: C.gold, hair: "#4a2a1a", ...extra });
const ruma = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, hat: "queen", skin: "#b8844a", tail: "#b8844a", muzzle: "#ecc490", lower: "#2f7f6a", upper: "#7a3a5a", border: C.gold, hair: "#5a3a1a", ...extra });
const angada = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, hat: "prince", skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: C.verm, sash: C.gold, ...extra });
const nila = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, skin: "#8a7a9a", tail: "#8a7a9a", muzzle: "#d8c8e0", lower: "#2f4a8a", sash: C.gold, ...extra });
const minister = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, lower: "#f3e3c3", sash: C.gold, hair: "#d9d4c7", aL: -26, aR: 26, ...extra });
const vanara = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, ...extra });

const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.4, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const badge = (id, x, y, text, size = 60) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><rect x="-210" y="-70" width="420" height="130" rx="26" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="5"/><text y="22" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${size}" fill="#ffd23a">${text}</text></g></g>`;
const bubble = (id, inner, w = 560, h = 300) => `<g transform="translate(560,960)"><g id="${id}" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><ellipse rx="${w / 2}" ry="${h / 2}" fill="#f6e6cc" stroke="${C.ink}" stroke-width="4"/>${inner}</g></g>`;
const showB = (k, id, t, hide = null) => { k.op(id, t, 0.25, 1); k.mv(id, t, 0.45, { s: 1 }, "back.out(1.8)"); if (hide != null) k.op(id, hide, 0.25, 0); };
const angerGlow = (p) => rgrad(`${p}-ang`, [[0, "#ff6a3a", 0.55], [1, "#c2361f", 0]]);
const zzz = (p) => [0, 1, 2].map((i) => `<g id="${p}-z${i}" transform="${T(640 + i * 30, 1250 - i * 40, 0, 0.6 + i * 0.2)}" style="opacity:0"><text font-family="Mukta" font-weight="800" font-size="48" fill="#fff3cf" stroke="#3a1408" stroke-width="2">Z</text></g>`).join("");
const runZ = (k, p, t0, t1) => { for (let i = 0; i < 3; i++) { k.op(`${p}-z${i}`, t0 + i * 0.3, 0.3, 1); k.osc(`${p}-z${i}`, t0 + i * 0.3, 0.6, Math.max(1, Math.floor((t1 - t0) / 0.6) - 1), { dy: -24 }); } };

const autumnSky = (p) => grad(`${p}-sky`, [[0, "#4a8ad0"], [1, "#e8f0f0"]]);
const gate = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.1, "#ffffff", 0.9)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#8a9a4a"/>`;
const cave = `<path d="M-40 1460 Q60 820 520 760 Q980 800 1120 1460 Z" fill="#6a5a4a" stroke="${C.ink}" stroke-width="5"/><path d="M140 1460 L140 1220 Q300 1000 460 1220 L460 1460 Z" fill="#1a1016" stroke="#3a2a2a" stroke-width="8"/>`;
const palace = (p) => `${hallV(p)}${chhatra(540, 1010, 0.9)}${throne(540, 1580, 0.9)}`;

export const SCENES = [
  // ---------- 1. hook: "the gate of death Vali went through is not closed" ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-l`, 0.2, dur - 0.5, 640, 0.42);
      k.op(`${p}-ag`, 0.3, 0.6, 1);
      k.mv(`${p}-ag`, 0.2, dur - 0.5, { x: 640 }, "none");
      k.label(`${p}-tm`, L.w(1, "मौत") - 0.3);
      shake(k, p, L.w(1, "बंद") - 0.2, 5, 8);
      return {
        defs: autumnSky(p) + angerGlow(p),
        art: `${gate(p)}
          <g id="${p}-ag" transform="${T(120, 0)}" style="opacity:0"><circle cx="0" cy="1300" r="280" fill="url(#${p}-ang)"/></g>
          ${lakAngry(`${p}-l`, 120, 1580, 0.95)}`,
        html: tag(`${p}-tm`, 540, 440, "\"मौत का द्वार बंद नहीं हुआ!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. autumn comes; Sugriva lost in pleasure; Hanuman reminds him ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.osc(`${p}-s-h`, 0.4, 0.6, Math.floor((L(2) - 0.6) / 0.6), 6);
      k.label(`${p}-ta`, L.w(1, "शरद") - 0.3, L(2) - 0.15);
      k.walk(`${p}-h`, L(2) - 0.4, L(2) + 0.7, 940, 0.42);
      k.mv(`${p}-h-ar`, L(2) + 0.7, 0.4, -70, "back.out(1.4)");
      k.mood(`${p}-h`, L(2) + 0.7, "open");
      k.mood(`${p}-s`, L.w(2, "वचन") - 0.3, "open");
      k.label(`${p}-th`, L.w(2, "हनुमान") - 0.3);
      return {
        defs: "",
        art: `${palace(p)}
          ${tara(`${p}-t`, 230, 1580, 0.78, { mood: "smile" })}
          ${sug(`${p}-s`, 540, 1500, 0.9, { seated: true, aL: -20, aR: 20 })}
          ${ruma(`${p}-r`, 760, 1580, 0.78, { mood: "smile" })}
          ${hanEx(`${p}-h`, 1250, 1580, 0.82, { propR: "" })}`,
        html: tag(`${p}-ta`, 540, 440, "शरद ऋतु, सुग्रीव सुख में") + tag(`${p}-th`, 540, 440, "हनुमान ने वचन याद दिलाया", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Sugriva orders Nila: gather the army within fifteen days ----------
  {
    id: "s03",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-ss`, 0.2, 0.3, 0); k.op(`${p}-st`, 0.2, 0.3, 1);
      k.mv(`${p}-sx-ar`, 0.5, 0.4, -150, "back.out(1.4)");
      k.mood(`${p}-sx`, 0.5, "open");
      k.mv(`${p}-n-h`, L.w(1, "नील") - 0.2, 0.4, 10);
      k.label(`${p}-tn`, L.w(1, "नील") - 0.3, L(2) - 0.15);
      pop(k, `${p}-15`, L.w(2, "पंद्रह") - 0.3);
      for (let i = 0; i < 3; i++) k.walk(`${p}-v${i}`, L(2) + i * 0.3, dur - 0.3, 1300, 0.3);
      k.label(`${p}-td`, L.w(2, "मृत्युदंड") - 0.4);
      return {
        defs: "",
        art: `${palace(p)}
          ${sug(`${p}-ss`, 540, 1500, 0.9, { seated: true, aL: -20, aR: 20 })}
          <g id="${p}-st" style="opacity:0">${sug(`${p}-sx`, 520, 1580, 0.92, { aR: 20 })}</g>
          ${nila(`${p}-n`, 800, 1580, 0.82, { aL: -26, aR: 26 })}
          ${[0, 1, 2].map((i) => vanara(`${p}-v${i}`, 900 + i * 60, 1580, 0.55)).join("")}
          ${badge(`${p}-15`, 540, 1000, "15 दिन!")}`,
        html: tag(`${p}-tn`, 540, 440, "नील को आदेश: सेना बुलाओ!") + tag(`${p}-td`, 540, 440, "देर की तो मृत्युदंड", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Ram sees the clear autumn sky and grieves; "Sugriva has forgotten" ----------
  {
    id: "s04",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-bd`, 0, dur, { dx: -300 }, "none");
      k.mood(`${p}-r`, L.w(1, "सीता") - 0.3, "sad"); k.mv(`${p}-r-h`, L.w(1, "सीता"), 0.5, -8);
      k.label(`${p}-ts`, L.w(1, "आकाश") - 0.3, L(2) - 0.15);
      k.mv(`${p}-r-ar`, L(2), 0.4, -100, "back.out(1.4)");
      k.mood(`${p}-r`, L(2), "open"); k.mood(`${p}-l`, L(2) + 0.3, "open");
      k.label(`${p}-tv`, L.w(2, "वचन") - 0.3);
      return {
        defs: autumnSky(p),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/><g id="${p}-bd" transform="${T()}">${birds(`${p}-b`, 700, 700, 6)}</g>
          ${cave}<rect x="0" y="1450" width="${W}" height="1000" fill="#8a9a4a"/>
          ${ramEx(`${p}-r`, 330, 1580, 0.92)}${lakEx(`${p}-l`, 720, 1580, 0.86)}`,
        html: tag(`${p}-ts`, 540, 440, "साफ़ आकाश, सीता की याद") + tag(`${p}-tv`, 540, 440, "\"सुग्रीव वचन भूल गया!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Ram's message: the path Vali took is not closed ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-r-ar`, 0.3, 0.4, -90);
      showB(k, `${p}-b1`, L.w(1, "बाली") - 0.4);
      k.op(`${p}-door`, L.w(1, "बंद") - 0.4, 0.4, 1);
      k.mood(`${p}-l`, 0.4, "open");
      k.label(`${p}-tb`, L.w(1, "बंद") - 0.3);
      return {
        defs: autumnSky(p) + angerGlow(p),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${cave}<rect x="0" y="1450" width="${W}" height="1000" fill="#8a9a4a"/>
          ${ramEx(`${p}-r`, 330, 1580, 0.92, { brows: "fierce" })}${lakAngry(`${p}-l`, 720, 1580, 0.86)}
          ${bubble(`${p}-b1`, `<path d="M-90 110 L-90 -60 Q0 -150 90 -60 L90 110 Z" fill="#1a0a14" stroke="#7a5a3a" stroke-width="10"/>
            <g id="${p}-door" style="opacity:0"><circle r="70" cy="20" fill="url(#${p}-ang)"/></g>
            <path d="M-90 110 L-160 130 L-160 -40 L-90 -60" fill="#8a6a4a" stroke="${C.ink}" stroke-width="4"/>
            <text x="170" y="10" font-family="Mukta" font-weight="800" font-size="40" fill="#8a1b1b" text-anchor="middle">खुला!</text>`, 520, 300)}`,
        html: tag(`${p}-tb`, 540, 440, "\"वो रास्ता बंद नहीं हुआ!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Lakshman at Kishkindha; the vanaras flee; Sugriva asleep, intoxicated ----------
  {
    id: "s06",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-l`, 0.2, L.w(1, "भाग") - 0.4, 420, 0.4);
      k.op(`${p}-ag`, 0.2, 0.5, 1); k.mv(`${p}-ag`, 0.2, L.w(1, "भाग") - 0.6, { x: 420 }, "none");
      for (let i = 0; i < 3; i++) { k.mood(`${p}-v${i}`, L.w(1, "डरकर") - 0.4, "open"); k.walk(`${p}-v${i}`, L.w(1, "डरकर") - 0.2 + i * 0.1, L.end(1), 1350, 0.25); }
      shake(k, p, L.w(1, "डरकर") - 0.3, 5, 8);
      k.label(`${p}-tl`, L.w(1, "लक्ष्मण") - 0.2, L(2) - 0.15);
      // inside: Sugriva asleep
      const tI = L(2) - 0.1;
      k.op(`${p}-a`, tI, 0.35, 0); k.op(`${p}-b`, tI, 0.35, 1);
      k.mv(`${p}-ang-ar`, tI + 0.4, 0.3, -110); k.mood(`${p}-ang`, tI + 0.4, "open");
      runZ(k, p, tI + 0.3, dur);
      k.label(`${p}-tz`, L.w(2, "मदमस्त") - 0.3);
      return {
        defs: autumnSky(p) + angerGlow(p),
        art: `<g id="${p}-a">${gate(p)}
            <g id="${p}-ag" transform="${T(-150, 0)}" style="opacity:0"><circle cx="0" cy="1300" r="260" fill="url(#${p}-ang)"/></g>
            ${[0, 1, 2].map((i) => vanara(`${p}-v${i}`, 640 + i * 120, 1580, 0.62)).join("")}
            ${lakAngry(`${p}-l`, -150, 1580, 0.95)}</g>
          <g id="${p}-b" style="opacity:0">${palace(p)}
            ${sug(`${p}-sl`, 540, 1500, 0.9, { seated: true, mood: "smile", aL: -20, aR: 20 })}
            ${[522, 558].map((ex) => `<ellipse cx="${ex}" cy="1271" rx="20" ry="11" fill="#b07a3a"/><path d="M${ex - 16} 1270 Q${ex} 1280 ${ex + 16} 1270" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join("")}
            ${zzz(p)}
            ${angada(`${p}-ang`, 830, 1580, 0.76)}</g>`,
        html: tag(`${p}-tl`, 540, 440, "क्रोधित लक्ष्मण!", "red") + tag(`${p}-tz`, 540, 440, "सुग्रीव मदमस्त सोए"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. the ministers and Hanuman: bow at Lakshman's feet and ask forgiveness ----------
  {
    id: "s07",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mood(`${p}-s`, 0.3, "open");
      k.osc(`${p}-s`, 0.3, 0.15, 5, { dx: 6 });
      k.mv(`${p}-h-ar`, 0.5, 0.4, -70, "back.out(1.4)"); k.mood(`${p}-h`, 0.5, "open");
      k.mv(`${p}-m1-h`, 0.6, 0.4, 8);
      k.label(`${p}-tc`, L.w(1, "चरणों") - 0.3);
      for (let i = 0; i < 3; i++) { const t = 0.4 + i * 0.4; k.op(`${p}-sw${i}`, t, 0.1, 1); k.mv(`${p}-sw${i}`, t, 0.6, { dy: 40 }, "power1.in"); k.op(`${p}-sw${i}`, t + 0.5, 0.1, 0); }
      return {
        defs: "",
        art: `${palace(p)}
          ${minister(`${p}-m1`, 170, 1580, 0.7)}
          ${sug(`${p}-s`, 540, 1500, 0.9, { seated: true, aL: 40, aR: -40 })}
          ${[0, 1, 2].map((i) => `<g id="${p}-sw${i}" transform="${T(500 + i * 40, 1180)}" style="opacity:0"><path d="M0 -8 Q6 4 0 10 Q-6 4 0 -8 Z" fill="#bfe6ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`).join("")}
          ${hanEx(`${p}-h`, 840, 1580, 0.84, { propR: "" })}`,
        html: tag(`${p}-tc`, 540, 440, "\"लक्ष्मण से क्षमा माँगिए!\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 8. next: Tara calms Lakshman; Jai Shri Ram ----------
  {
    id: "s08",
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
            ${lakAngry(`${p}-nl`, -130, 120, 0.58)}${tara(`${p}-nt`, 140, 120, 0.56, { aL: -26, aR: 26 })}
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="44" fill="#ffd23a">भाग 33: तारा ने लक्ष्मण को शांत किया</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sug(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
