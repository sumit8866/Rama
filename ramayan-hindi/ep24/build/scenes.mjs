// Episode 24 (Hindi reel): the first duel of Vali and Sugriva (Valmiki, Kishkindha 12). Vertical 1080x1920.
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays, garland } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, archer, bowReady, shoot } from "../../reel-kit.mjs";

reseed(2424);

const RAM_LOOK = { hat: "sage", lower: "#a8742a", sash: "#6a4a2a" };
const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, ...RAM_LOOK, ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
// how Ram saw them in the dust: the very same vanara twice
const twin = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#bf8a3a", tail: "#bf8a3a", muzzle: "#eccb94", lower: "#6a4a3a", brows: "fierce", mood: "open", ...extra });

const dayBg = (p) => grad(`${p}-sky`, [[0, "#7aa0c8"], [1, "#f0dcb0"]]);
// Kishkindha: a rocky gate
const gate = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>${[[180, 640], [860, 720]].map(([x, y]) => cloud(x, y, 1.3, "#ffffff", 0.8)).join("")}
  <path d="M380 1440 L380 1020 L560 960 L560 1440 Z M900 1440 L900 980 L1080 1040 L1080 1440 Z" fill="#7a5a3a" stroke="${C.ink}" stroke-width="5"/>
  <path d="M560 1440 L560 1110 Q730 940 900 1110 L900 1440" fill="#2a1a14" stroke="#9a7a5a" stroke-width="26"/>
  <rect x="0" y="1440" width="${W}" height="1000" fill="#7a7a4a"/>`;
// trees and a bush on the left, where Ram hides
const hideTrees = `${tree(70, 1450, 0.95)}${tree(300, 1440, 0.8)}`;
const bush = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${[[-90, -40, 70], [-20, -70, 80], [60, -45, 70], [0, -10, 90]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#2f6a3a" stroke="${C.ink}" stroke-width="4"/>`).join("")}<circle cx="-40" cy="-80" r="22" fill="#3f8a4a"/><circle cx="50" cy="-60" r="18" fill="#3f8a4a"/></g>`;
// a cartoon fight cloud with tails, fists and stars poking out
const dust = (p, x, y, s = 1) => `<g id="${p}-dust" transform="${T(x, y, 0, s)}" style="opacity:0">
  <g id="${p}-tl1" transform="${T(-150, -60, -30)}"><path d="M0 0 Q-60 -20 -70 -90" stroke="${C.ink}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M0 0 Q-60 -20 -70 -90" stroke="#c9993a" stroke-width="11" fill="none" stroke-linecap="round"/></g>
  <g id="${p}-tl2" transform="${T(150, -40, 30)}"><path d="M0 0 Q60 -20 70 -90" stroke="${C.ink}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M0 0 Q60 -20 70 -90" stroke="#b07a3a" stroke-width="11" fill="none" stroke-linecap="round"/></g>
  <g id="${p}-fst" transform="${T(140, -170)}"><circle r="26" fill="#c9993a" stroke="${C.ink}" stroke-width="4"/></g>
  ${[[-110, -40, 90], [-30, -110, 100], [80, -80, 95], [120, 10, 80], [-90, 40, 85], [10, 20, 110]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#e6d6b4" stroke="${C.ink}" stroke-width="5"/>`).join("")}
  ${[[-60, -60], [50, -30], [-10, 40]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="26" fill="#f3e8d0"/>`).join("")}
  ${[[-170, -190], [190, -150], [0, -230]].map(([a, b], i) => `<g id="${p}-st${i}" transform="${T(a, b)}"><path d="M0 -24 L7 -7 L24 0 L7 7 L0 24 L-7 7 L-24 0 L-7 -7 Z" fill="#ffd23a" stroke="${C.ink}" stroke-width="3"/></g>`).join("")}
</g>`;
const runDust = (k, p, t0, t1) => {
  const n = Math.max(1, Math.floor((t1 - t0) / 0.18) - 1);
  k.osc(`${p}-dust`, t0, 0.18, n, { r: 6, s: 1.05 });
  k.osc(`${p}-tl1`, t0, 0.2, n, { r: -60 }); k.osc(`${p}-tl2`, t0 + 0.1, 0.2, n, { r: 60 });
  k.osc(`${p}-fst`, t0, 0.15, n, { dx: -60, dy: 40 });
  [0, 1, 2].forEach((i) => k.osc(`${p}-st${i}`, t0 + i * 0.07, 0.2, n, { r: 90, s: 1.3 }));
};
const mark = (id, x, y, ch, col, r = 30) => `<g id="${id}" transform="${T(x, y, 0, 0.4)}" style="opacity:0"><circle r="${r}" fill="${col}" stroke="${C.ink}" stroke-width="3"/><text y="${r * 0.46}" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="${r * 1.4}" fill="#fff">${ch}</text></g>`;
const pop = (k, id, t, hold = null) => { k.op(id, t, 0.15, 1); k.mv(id, t, 0.3, { s: 1 }, "back.out(2)"); if (hold != null) k.op(id, t + hold, 0.2, 0); };
const ring = (id, x, y) => `<circle id="${id}" cx="${x}" cy="${y}" r="60" fill="none" stroke="#fff3c4" stroke-width="8" style="opacity:0"/>`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
const scratch = (id, x, y) => `<path id="${id}" d="M${x - 14} ${y - 10} L${x + 14} ${y + 10} M${x - 4} ${y - 14} L${x + 18} ${y + 2}" stroke="#b01a1a" stroke-width="5" stroke-linecap="round" style="opacity:0"/>`;

export const SCENES = [
  // ---------- 1. hook: bow ready, Vali in front... the arrow didn't fly. Why? ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      shoot(k, `${p}-r`, 0.2, 0.6, 1.0, null);
      k.op(`${p}-dust`, 0.3, 0.2, 1); runDust(k, p, 0.3, dur);
      k.label(`${p}-tb`, L.w(1, "बाली") - 0.2, L.w(1, "फिर") - 0.2);
      const tN = L.w(1, "बाण") - 0.2;
      pop(k, `${p}-q`, tN);
      k.mood(`${p}-r`, tN, "sad");
      k.label(`${p}-tq`, L.w(1, "क्यों") - 0.3);
      return {
        defs: dayBg(p),
        art: `${gate(p)}${hideTrees}
          ${dust(p, 720, 1420, 0.95)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}
          ${mark(`${p}-q`, 200, 1180, "?", "#6a6a7a", 34)}`,
        html: tag(`${p}-tb`, 540, 440, "सामने बाली!") + tag(`${p}-tq`, 540, 440, "बाण क्यों नहीं चला?", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. at Kishkindha: Ram hides; Sugriva roars his challenge ----------
  {
    id: "s02",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-r`, 0.1, L.w(1, "पीछे"), 190, 0.45);
      k.walk(`${p}-l`, 0.2, L.w(1, "पीछे"), 60, 0.45);
      k.walk(`${p}-s`, 0.3, L(2), 730, 0.45);
      k.label(`${p}-th`, L.w(1, "पीछे") - 0.2, L(2) - 0.15);
      const tR = L.w(2, "गर्जना") - 0.3;
      k.mood(`${p}-s`, tR, "open");
      k.mv(`${p}-s-al`, tR, 0.3, 150); k.mv(`${p}-s-ar`, tR, 0.3, -150);
      for (let i = 0; i < 3; i++) { const t = tR + i * 0.35; k.op(`${p}-rg${i}`, t, 0.05, 0.9); k.mv(`${p}-rg${i}`, t, 0.6, { s: 3 }, "power1.out"); k.op(`${p}-rg${i}`, t + 0.4, 0.2, 0); }
      shake(k, p, tR, 6, 8);
      k.label(`${p}-tr`, tR + 0.1);
      return {
        defs: dayBg(p),
        art: `${gate(p)}${hideTrees}
          ${lakEx(`${p}-l`, -260, 1580, 0.78)}${ramEx(`${p}-r`, -100, 1580, 0.82)}${bush(200, 1600, 0.95)}
          ${sugEx(`${p}-s`, -400, 1580, 0.9)}
          ${[0, 1, 2].map((i) => `<g transform="translate(730,1290)"><g id="${p}-rg${i}" transform="${T(0, 0, 0, 1)}" style="opacity:0"><circle r="60" fill="none" stroke="#fff3c4" stroke-width="7"/></g></g>`).join("")}`,
        html: tag(`${p}-th`, 540, 440, "राम पेड़ों के पीछे") + tag(`${p}-tr`, 540, 440, "सुग्रीव की ललकार!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Vali bursts out; the fierce fight ----------
  {
    id: "s03",
    extra: 1.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tV = L.w(1, "बाली") - 0.4;
      k.op(`${p}-v`, tV, 0.2, 1);
      k.mv(`${p}-v`, tV, 0.7, { x: 560, y: 1580, s: 0.95 }, "back.out(1.4)");
      k.op(`${p}-vg`, tV + 0.4, 0.3, 1);
      shake(k, p, tV + 0.6, 5, 8);
      k.mood(`${p}-s`, tV + 0.3, "open");
      k.label(`${p}-tv`, tV + 0.2, L(2) - 0.15);
      // they clash: the dust cloud
      const tF = L(2) - 0.1;
      k.mv(`${p}-v`, tF - 0.3, 0.3, { x: 650 }); k.mv(`${p}-s`, tF - 0.3, 0.3, { x: 760 });
      k.op(`${p}-v`, tF, 0.2, 0); k.op(`${p}-s`, tF, 0.2, 0); k.op(`${p}-vg`, tF, 0.2, 0);
      k.op(`${p}-dust`, tF, 0.2, 1); runDust(k, p, tF, dur);
      k.label(`${p}-tf`, L.w(2, "भयंकर") - 0.2);
      return {
        defs: dayBg(p) + rgrad(`${p}-ag`, [[0, "#ff8a3a", 0.6], [1, "#c2361f", 0]]),
        art: `${gate(p)}${hideTrees}${bush(200, 1600, 0.95)}
          <circle id="${p}-vg" cx="560" cy="1300" r="240" fill="url(#${p}-ag)" style="opacity:0"/>
          ${sugEx(`${p}-s`, 880, 1580, 0.9)}
          ${vali(`${p}-v`, 730, 1300, 0.4, { hidden: true, mood: "open" })}
          ${dust(p, 720, 1420, 0.95)}`,
        html: tag(`${p}-tv`, 540, 440, "क्रोधित बाली!", "red") + tag(`${p}-tf`, 540, 440, "भयंकर युद्ध"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Ram aims, but the brothers look exactly alike; he holds the arrow ----------
  {
    id: "s04",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      bowReady(k, `${p}-r`);
      shoot(k, `${p}-r`, 0.3, 0.7, 0.9, null);
      k.label(`${p}-ta`, L.w(1, "एक") - 0.2, L(2) - 0.15);
      // they swap places, again and again
      for (let i = 0; i < 4; i++) {
        const t = 0.8 + i * 0.9;
        k.mv(`${p}-a`, t, 0.4, { x: i % 2 ? 640 : 860 }, "power2.inOut");
        k.mv(`${p}-b`, t, 0.4, { x: i % 2 ? 860 : 640 }, "power2.inOut");
      }
      pop(k, `${p}-qa`, L.w(1, "एक") - 0.1); pop(k, `${p}-qb`, L.w(1, "एक") + 0.1);
      // he lowers the bow
      const tL = L.w(2, "बाण") - 0.4;
      k.mv(`${p}-r-ar`, tL, 0.5, -20); k.mv(`${p}-r-al`, tL, 0.5, 8);
      k.op(`${p}-r-nock`, tL, 0.2, 0);
      k.mood(`${p}-r`, tL, "sad");
      k.label(`${p}-tn`, tL);
      return {
        defs: dayBg(p),
        art: `${gate(p)}${hideTrees}
          ${twin(`${p}-a`, 640, 1580, 0.88, { aR: -90 })}${twin(`${p}-b`, 860, 1580, 0.88, { aL: 80 })}
          ${mark(`${p}-qa`, 640, 1170, "?", "#6a6a7a", 30)}${mark(`${p}-qb`, 860, 1170, "?", "#6a6a7a", 30)}
          ${archer(`${p}-r`, 180, 1580, 0.82, RAM_LOOK)}${bush(230, 1600, 0.95)}`,
        html: tag(`${p}-ta`, 540, 440, "दोनों एक जैसे!", "red") + tag(`${p}-tn`, 540, 440, "बाण नहीं छोड़ा"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Vali beats Sugriva, who runs for Rishyamuka ----------
  {
    id: "s05",
    extra: 1.6,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      const tP = L.w(1, "घायल") - 0.6;
      for (let i = 0; i < 2; i++) {
        const t = tP + i * 0.5;
        k.mv(`${p}-v-ar`, t, 0.12, -90, "power3.out"); k.mv(`${p}-v-ar`, t + 0.15, 0.2, -20);
        k.mv(`${p}-s-b`, t + 0.1, 0.12, { r: 14 }); k.mv(`${p}-s-b`, t + 0.25, 0.25, { r: 0 });
        k.op(`${p}-flash`, t + 0.1, 0.05, 0.3); k.op(`${p}-flash`, t + 0.15, 0.2, 0);
      }
      k.mood(`${p}-s`, tP + 0.2, "sad");
      k.op(`${p}-sc1`, tP + 0.2, 0.1, 1); k.op(`${p}-sc2`, tP + 0.7, 0.1, 1);
      k.label(`${p}-th`, L.w(1, "घायल") - 0.2, L(2) - 0.15);
      // he flees
      const tR = L(2);
      k.op(`${p}-sc1`, tR, 0.2, 0); k.op(`${p}-sc2`, tR, 0.2, 0);
      k.walk(`${p}-s`, tR, L.w(2, "ऋष्यमूक") + 0.3, 1300, 0.3);
      k.mv(`${p}-v-ar`, tR + 0.3, 0.3, -150); k.osc(`${p}-v-ar`, tR + 0.6, 0.2, 5, -120);
      k.mood(`${p}-v`, tR + 0.3, "open");
      k.label(`${p}-tr`, L.w(2, "ऋष्यमूक") - 0.3);
      return {
        defs: dayBg(p),
        art: `${gate(p)}${hideTrees}${bush(200, 1600, 0.95)}
          ${vali(`${p}-v`, 560, 1580, 0.95)}${sugEx(`${p}-s`, 780, 1580, 0.9)}
          ${scratch(`${p}-sc1`, 760, 1290)}${scratch(`${p}-sc2`, 800, 1420)}`,
        html: tag(`${p}-th`, 540, 440, "सुग्रीव घायल!", "red") + tag(`${p}-tr`, 540, 440, "ऋष्यमूक की ओर भागे"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. Sugriva, hurt: "Ram, why didn't you shoot?" ----------
  {
    id: "s06",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-r`, 0.1, 1.2, 380, 0.45);
      k.walk(`${p}-l`, 0.2, 1.2, 170, 0.45);
      cry(k, `${p}-t0`, 673, 1371, 0.3, 4);
      const tQ = L.w(1, "बाण") - 0.4;
      k.mood(`${p}-s`, tQ, "open");
      k.mv(`${p}-s-al`, tQ, 0.4, 70, "back.out(1.4)");
      k.mood(`${p}-r`, tQ + 0.4, "sad");
      k.label(`${p}-tq`, tQ);
      return {
        defs: grad(`${p}-sky`, [[0, "#6a7aa8"], [1, "#e8c8a0"]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
          <path d="M420 1450 L560 1220 L640 1090 L700 1020 L900 1010 L980 1080 L1080 1160 L1080 1450 Z" fill="#7a6a5a" stroke="${C.ink}" stroke-width="4"/>
          <rect x="0" y="1440" width="${W}" height="1000" fill="#7a8a4a"/>${tree(60, 1450, 0.85)}
          ${hanEx(`${p}-h`, 900, 1580, 0.82, { aL: -26 })}
          ${sugEx(`${p}-s`, 690, 1590, 0.86, { seated: true, mood: "sad", aL: -30, aR: 30 })}
          ${scratch(`${p}-sc1`, 680, 1400).replace('style="opacity:0"', "")}
          ${tear(`${p}-t0`, 673, 1371)}
          ${lakEx(`${p}-l`, -250, 1580, 0.82)}${ramEx(`${p}-r`, -80, 1580, 0.92)}`,
        html: tag(`${p}-tq`, 540, 440, "\"राम, बाण क्यों नहीं चलाया?\"", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 7. next: the flower garland; Jai Shri Ram ----------
  {
    id: "s07",
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
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            ${lakEx(`${p}-nl`, -130, 120, 0.6, { aR: -70 })}
            ${sugEx(`${p}-ns`, 130, 120, 0.6, { aL: -26, aR: 26 })}
            <g transform="translate(130,-30)">${garland(`${p}-ng`, 0, 0, 0.9)}</g>
            <text y="185" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 25: फूलों की माला</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
