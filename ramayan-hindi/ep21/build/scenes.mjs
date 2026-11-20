// Episode 21 (Hindi reel): Vali, Sugriva and the demon Mayavi (Valmiki, Kishkindha 9-10). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays, throne, chhatra } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, stars, sparkles, petals, glowDef, shake, hallV, darkTree, moon } from "../../reel-kit.mjs";

reseed(2121);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
// in the flashback Sugriva is the young prince (small crown); Vali is the king
const sugP = (id, x, y, s, extra = {}) => sugEx(id, x, y, s, { hat: "prince", ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const ruma = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, female: true, skin: "#b8844a", tail: "#b8844a", muzzle: "#ecc490", lower: "#2f7f6a", upper: "#7a3a5a", border: C.gold, hair: "#5a3a1a", ...extra });
const mayavi = (id, x, y, s, extra = {}) => CAST.demon(id, x, y, s, "#3a4a7a", { hs: HS, ...extra });
const minister = (id, x, y, s, extra = {}) => CAST.vanara(id, x, y, s, { hs: HS, lower: "#f3e3c3", sash: C.gold, hair: "#d9d4c7", aL: -26, aR: 26, ...extra });

// a rocky hill with a cave mouth; the boulder can roll in to seal it
const caveHill = (p, x = 540, y = 1450) => `<path d="M${x - 360} ${y} Q${x - 320} ${y - 430} ${x} ${y - 470} Q${x + 320} ${y - 430} ${x + 360} ${y} Z" fill="#6a5a4a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M${x - 260} ${y - 120} L${x - 200} ${y - 160} M${x + 200} ${y - 260} L${x + 250} ${y - 200} M${x - 120} ${y - 380} L${x - 60} ${y - 400}" stroke="${C.ink}" stroke-width="3" opacity="0.4"/>
  <path d="M${x - 125} ${y} L${x - 125} ${y - 170} Q${x} ${y - 310} ${x + 125} ${y - 170} L${x + 125} ${y} Z" fill="#0c0610" stroke="#3a2a2a" stroke-width="6"/>`;
const boulder = (id, x, y, hidden = false) => `<g id="${id}" transform="${T(x, y)}"${hidden ? ' style="opacity:0"' : ""}><circle r="160" fill="#8a8a8a" stroke="${C.ink}" stroke-width="6"/><path d="M-90 -60 L-30 -10 L-60 50 M40 -100 L70 -30 L130 0 M-20 80 L40 60" stroke="${C.ink}" stroke-width="4" fill="none" opacity="0.6"/><circle cx="-50" cy="-70" r="30" fill="#a4a4a4"/></g>`;
const forestNight = (p) => grad(`${p}-sky`, [[0, "#0e1430"], [1, "#3a3a6a"]]);
const forestDay = (p) => grad(`${p}-sky`, [[0, "#7a9ab8"], [1, "#e8d8b0"]]);
const caveScene = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
  ${[40, 1040].map((x) => darkTree(x, 1460, 1.0, "#2a3a2a")).join("")}
  <rect x="0" y="1440" width="${W}" height="1000" fill="#5a5a3a"/>${caveHill(p)}`;
const heart = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.5)}" style="opacity:0"><path d="M0 14 C-30 -6 -18 -30 0 -16 C18 -30 30 -6 0 14 Z" fill="#e8456a" stroke="${C.ink}" stroke-width="2"/></g>`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
const kingHall = (p) => `${hallV(p)}${chhatra(540, 1010, 0.9)}${throne(540, 1580, 0.9)}`;

export const SCENES = [
  // ---------- 1. hook: one cave made two brothers enemies ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.label(`${p}-tc`, 0.4, L.w(1, "दुश्मन") - 0.3);
      const tE = L.w(1, "दुश्मन") - 0.3;
      k.mood(`${p}-v`, tE, "open"); k.mood(`${p}-s`, tE, "sad");
      k.mv(`${p}-v-ar`, tE, 0.3, -100, "back.out(1.6)");
      k.op(`${p}-flash`, tE, 0.06, 0.5); k.op(`${p}-flash`, tE + 0.06, 0.35, 0);
      shake(k, p, tE, 6, 10);
      k.op(`${p}-crk`, tE, 0.1, 1);
      k.label(`${p}-te`, tE + 0.1);
      return {
        defs: forestNight(p),
        art: `${caveScene(p)}${stars(30, 1000)}${boulder(`${p}-b`, 540, 1290)}
          <path id="${p}-crk" d="M540 1140 L520 1220 L560 1280 L530 1360 L550 1440" stroke="#fff3c4" stroke-width="8" fill="none" style="opacity:0"/>
          ${vali(`${p}-v`, 210, 1580, 0.95)}${sugEx(`${p}-s`, 870, 1580, 0.9, { mood: "sad" })}`,
        html: tag(`${p}-tc`, 540, 560, "एक गुफा...") + tag(`${p}-te`, 540, 440, "दो भाई, दुश्मन!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. once, loving brothers; Vali the king of Kishkindha ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tP = L.w(1, "प्यारे") - 0.2;
      for (let i = 0; i < 4; i++) { const t = tP + i * 0.25; k.op(`${p}-hr${i}`, t, 0.15, 1); k.mv(`${p}-hr${i}`, t, 1.4, { dy: -220, s: 1 }, "power1.out"); k.op(`${p}-hr${i}`, t + 1.1, 0.3, 0); }
      k.mv(`${p}-v-ar`, tP, 0.4, -60, "back.out(1.4)");
      k.label(`${p}-tb`, tP, L.w(1, "बड़े") - 0.2);
      k.label(`${p}-tk`, L.w(1, "किष्किंधा") - 0.2);
      k.osc(`${p}-s-tl`, 0.5, 0.4, 7, 12);
      return {
        defs: "",
        art: `${kingHall(p)}
          ${minister(`${p}-m1`, 120, 1580, 0.62)}${minister(`${p}-m2`, 250, 1580, 0.6)}
          ${vali(`${p}-v`, 540, 1500, 0.9, { seated: true, brows: "calm", aL: -20 })}
          ${sugP(`${p}-s`, 830, 1580, 0.88, { aL: -26, aR: 26 })}
          ${[0, 1, 2, 3].map((i) => heart(`${p}-hr${i}`, 640 + i * 40, 1200)).join("")}`,
        html: tag(`${p}-tb`, 540, 560, "प्यारे भाई") + tag(`${p}-tk`, 540, 560, "किष्किंधा के राजा बाली"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. the demon Mayavi roars at the gate; the chase to the cave ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.op(`${p}-m`, 0.2, 0.3, 1);
      k.mv(`${p}-m`, 0.2, 0.8, { x: 760 }, "power2.out");
      k.mood(`${p}-m`, L.w(1, "मायावी") - 0.2, "open");
      k.mv(`${p}-m-ar`, L.w(1, "मायावी"), 0.4, -150, "back.out(1.4)");
      shake(k, p, L.w(1, "ललकारने") - 0.2, 5, 8);
      k.label(`${p}-tm`, L.w(1, "मायावी") - 0.2, L(2) - 0.15);
      k.walk(`${p}-v`, L.w(1, "बाली") - 0.1, L(2) + 0.4, 430, 0.4);
      k.walk(`${p}-s`, L.w(1, "बाली") + 0.2, L(2) + 0.4, 230, 0.4);
      // the chase: cut to the cave
      const tC = L(2) + 0.3;
      k.op(`${p}-a`, tC, 0.35, 0); k.op(`${p}-c`, tC, 0.35, 1);
      k.mv(`${p}-cm`, tC + 0.2, 1.4, { x: 540, y: 1430, s: 0.45 }, "power1.in");
      k.op(`${p}-cm`, tC + 1.3, 0.3, 0);
      k.walk(`${p}-cv`, tC + 0.3, tC + 2.0, 360, 0.36);
      k.walk(`${p}-cs`, tC + 0.5, tC + 2.2, 170, 0.36);
      k.label(`${p}-tg`, L.w(2, "गुफा") - 0.2);
      return {
        defs: forestNight(p),
        art: `<g id="${p}-a"><rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${stars(40, 1100)}${moon(840, 700, 60)}
            <path d="M0 1440 L0 1000 L300 1000 L300 1440 Z" fill="#5a3a2a" stroke="${C.ink}" stroke-width="5"/><path d="M300 1440 L300 1110 Q560 900 820 1110 L820 1440" fill="none" stroke="#7a5a3a" stroke-width="40"/>
            <rect x="0" y="1440" width="${W}" height="1000" fill="#4a4a3a"/>
            ${sugP(`${p}-s`, 40, 1580, 0.82)}${vali(`${p}-v`, 160, 1580, 0.9)}
            ${mayavi(`${p}-m`, 1200, 1580, 1.0)}</g>
          <g id="${p}-c" style="opacity:0">${caveScene(p)}${stars(20, 900)}
            ${mayavi(`${p}-cm`, 820, 1580, 0.9, { mood: "open" })}
            ${vali(`${p}-cv`, -100, 1580, 0.88)}${sugP(`${p}-cs`, -280, 1580, 0.82)}</g>`,
        html: tag(`${p}-tm`, 540, 440, "राक्षस मायावी!", "red") + tag(`${p}-tg`, 540, 440, "गुफा में घुसा"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. "guard the mouth"; Sugriva waits a whole year ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.mv(`${p}-v-ar`, L(1) + 0.2, 0.4, -60, "back.out(1.4)");
      k.mood(`${p}-v`, L(1) + 0.2, "open"); k.mood(`${p}-v`, L.end(1), "smile");
      k.label(`${p}-tp`, L.w(1, "पहरा") - 0.2, L(2) - 0.15);
      // Vali goes in
      const tI = L.end(1) - 0.3;
      k.mv(`${p}-v`, tI, 0.9, { x: 540, y: 1440, s: 0.5 }, "power1.in");
      k.op(`${p}-v`, tI + 0.7, 0.25, 0);
      // a year of waiting: day, night, day...
      const tY = L(2);
      k.op(`${p}-s`, tY, 0.3, 0); k.op(`${p}-ss`, tY, 0.3, 1);
      for (let i = 0; i < 4; i++) { const t = tY + i * 0.9; k.op(`${p}-night`, t, 0.4, 0.75); k.op(`${p}-night`, t + 0.45, 0.4, 0); }
      k.op(`${p}-yr`, L.w(2, "एक") - 0.2, 0.3, 1); k.mv(`${p}-yr`, L.w(2, "एक") - 0.2, 0.5, { s: 1 }, "back.out(2)");
      k.mood(`${p}-ss`, tY + 2.5, "sad");
      return {
        defs: forestDay(p),
        art: `${caveScene(p)}
          ${vali(`${p}-v`, 380, 1580, 0.88)}
          ${sugP(`${p}-s`, 720, 1580, 0.86, { aL: -26, aR: 26 })}
          ${sugP(`${p}-ss`, 760, 1580, 0.86, { seated: true, hidden: true, aL: -26, aR: 26 })}
          <g id="${p}-night" style="opacity:0"><rect width="${W}" height="2400" fill="#0e1430"/>${stars(40, 1200)}${moon(860, 760, 56)}</g>
          <g transform="translate(540,1000)"><g id="${p}-yr" transform="${T(0, 0, 0, 0.3)}" style="opacity:0"><rect x="-210" y="-70" width="420" height="130" rx="26" fill="rgba(20,10,30,0.82)" stroke="${C.gold}" stroke-width="5"/>
            <text y="22" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="64" fill="#ffd23a">पूरा 1 साल!</text></g></g>`,
        html: tag(`${p}-tp`, 540, 440, "\"यहीं पहरा दो\""),
        js: k.code(),
      };
    },
  },

  // ---------- 5. blood flows out; the cave sealed; the ministers crown Sugriva ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tB = L.w(1, "खून") - 0.4;
      k.op(`${p}-bl`, tB, 0.2, 1);
      k.mv(`${p}-bl`, tB, 1.6, { sx: 1, sy: 1 }, "power1.out");
      k.mood(`${p}-s`, tB + 0.3, "open");
      k.mv(`${p}-s-al`, tB + 0.3, 0.3, 150); k.mv(`${p}-s-ar`, tB + 0.3, 0.3, -150);
      k.label(`${p}-tb`, tB + 0.1, L(2) - 0.15);
      // the rock
      const tR = L.w(2, "पत्थर") - 0.6;
      k.mood(`${p}-s`, L(2), "sad");
      k.mv(`${p}-s-al`, L(2), 0.3, 40); k.mv(`${p}-s-ar`, L(2), 0.3, -40);
      k.op(`${p}-b`, tR, 0.1, 1);
      k.mv(`${p}-b`, tR, 1.0, { x: 540, r: 200 }, "power2.out");
      shake(k, p, tR + 0.95, 4, 8);
      k.label(`${p}-tr`, tR + 0.3, L(3) - 0.15);
      cry(k, `${p}-t0`, 863, 1285, L(2) + 0.2, 4);
      // crowned by the ministers
      const tK = L(3) - 0.1;
      k.op(`${p}-a`, tK, 0.35, 0); k.op(`${p}-k`, tK, 0.35, 1);
      k.mv(`${p}-km1-h`, tK + 0.4, 0.4, 8); k.mv(`${p}-km2-h`, tK + 0.5, 0.4, 8);
      k.label(`${p}-tk`, L.w(3, "राजा") - 0.2);
      return {
        defs: forestDay(p),
        art: `<g id="${p}-a">${caveScene(p)}
            <g transform="translate(540,1450)"><g id="${p}-bl" transform="${T(0, 0, 0, 0.05, 0.05)}" style="opacity:0"><path d="M-110 -6 Q0 -20 110 -6 Q240 40 120 110 Q0 150 -160 100 Q-260 40 -110 -6 Z" fill="#9a1a1a" stroke="#5a0a0a" stroke-width="4"/></g></g>
            ${boulder(`${p}-b`, -300, 1290, true)}
            ${sugP(`${p}-s`, 880, 1580, 0.88)}
            ${tear(`${p}-t0`, 863, 1285)}</g>
          <g id="${p}-k" style="opacity:0">${kingHall(p)}
            ${minister(`${p}-km1`, 200, 1580, 0.66)}${minister(`${p}-km2`, 880, 1580, 0.66)}
            ${sugEx(`${p}-ks`, 540, 1500, 0.9, { seated: true, mood: "sad", aL: -20, aR: 20 })}</g>`,
        html: tag(`${p}-tb`, 540, 440, "गुफा से खून!", "red") + tag(`${p}-tr`, 540, 440, "गुफा बंद") + tag(`${p}-tk`, 540, 440, "सुग्रीव बने राजा"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Vali returns alive, furious; Sugriva thrown out; Ruma taken ----------
  {
    id: "s06",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-v`, 0.2, L.w(1, "भाई") , 300, 0.42);
      k.mood(`${p}-s`, L.w(1, "ज़िंदा"), "open");
      const tA = L.w(1, "आग") - 0.4;
      k.mood(`${p}-v`, tA, "open");
      k.op(`${p}-flash`, tA, 0.06, 0.4); k.op(`${p}-flash`, tA + 0.06, 0.3, 0);
      shake(k, p, tA, 6, 10);
      k.op(`${p}-fire`, tA, 0.3, 1);
      k.label(`${p}-tv`, L.w(1, "ज़िंदा") - 0.2, L(2) - 0.15);
      // Sugriva gets off the throne, bows; Vali throws him out
      k.op(`${p}-s`, tA + 0.7, 0.3, 0); k.op(`${p}-s2`, tA + 0.7, 0.3, 1);
      k.mv(`${p}-s2-h`, tA + 0.9, 0.4, 10);
      const tX = L(2);
      k.mv(`${p}-v-ar`, tX, 0.35, -90, "power2.out");
      k.mood(`${p}-s2`, tX + 0.2, "sad");
      k.walk(`${p}-s2`, tX + 0.5, L.w(2, "रुमा") + 0.2, 1250, 0.45);
      // Ruma held back
      const tR = L.w(2, "रुमा") - 0.4;
      k.op(`${p}-r`, tR, 0.3, 1);
      k.mood(`${p}-r`, tR + 0.2, "sad");
      k.mv(`${p}-v-al`, tR, 0.35, 70);
      k.label(`${p}-tr`, tR);
      return {
        defs: rgrad(`${p}-fg`, [[0, "#ffcf6a", 0.6], [1, "#c2361f", 0]]),
        art: `${kingHall(p)}
          <circle id="${p}-fire" cx="300" cy="1300" r="260" fill="url(#${p}-fg)" style="opacity:0"/>
          ${sugEx(`${p}-s`, 540, 1500, 0.9, { seated: true, aL: -20, aR: 20 })}
          ${sugP(`${p}-s2`, 720, 1580, 0.86, { hidden: true, aL: -26, aR: 26 })}
          ${ruma(`${p}-r`, 100, 1580, 0.78, { hidden: true })}
          ${vali(`${p}-v`, -200, 1580, 0.95)}`,
        html: tag(`${p}-tv`, 540, 440, "बाली ज़िंदा लौटे!", "red") + tag(`${p}-tr`, 540, 440, "राज्य और रुमा छीन ली", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: Dundubhi and Matanga's curse; Jai Shri Ram ----------
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
      // a buffalo demon's head and the sage
      const buffalo = `<g transform="translate(-150,40)"><path d="M-70 -40 Q-150 -120 -120 -170 Q-100 -110 -50 -80 Z M70 -40 Q150 -120 120 -170 Q100 -110 50 -80 Z" fill="#e9e1cf" stroke="${C.ink}" stroke-width="4"/>
        <ellipse rx="80" ry="70" fill="#2a2030" stroke="${C.ink}" stroke-width="4"/><ellipse cy="40" rx="50" ry="32" fill="#4a3a4a" stroke="${C.ink}" stroke-width="3"/>
        <circle cx="-30" cy="-14" r="10" fill="#f5d742"/><circle cx="30" cy="-14" r="10" fill="#f5d742"/><circle cx="-30" cy="-14" r="4" fill="${C.verm}"/><circle cx="30" cy="-14" r="4" fill="${C.verm}"/></g>`;
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-400" y="-290" width="800" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${buffalo}
            ${CAST.vasishtha(`${p}-nm`, 160, 120, 0.56, { hs: HS, aR: -140, mood: "open" })}
            <text y="180" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="44" fill="#ffd23a">भाग 22: दुंदुभि और मतंग ऋषि का श्राप</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
