// Episode 19 (Hindi reel): Ram and Sugriva become friends with fire as witness (Valmiki, Kishkindha 5).
// Art y = screen y + 230. Characters stand at art y 1580 (screen 1350, just above the subtitles).
import { C, T, CAST, grad, rgrad, tree, cloud, rays, flames } from "../../../ramayan/build/lib.mjs";
import { W, HS, reseed, kit, tag, big, sparkles, petals, glowDef, shake, flicker } from "../../reel-kit.mjs";

reseed(1919);

const ramEx = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, hat: "sage", lower: "#a8742a", sash: "#6a4a2a", ...extra });
const lakEx = (id, x, y, s, extra = {}) => CAST.lakshman(id, x, y, s, { hs: HS, hat: "sage", lower: "#9a6a3a", sash: "#5a3a1a", ...extra });
const GADA = `<path d="M2 124 L2 30" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M2 124 L2 30" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><circle cx="2" cy="8" r="36" fill="${C.gold}" stroke="${C.ink}" stroke-width="4"/><path d="M-28 8 L32 8 M2 -22 L2 38" stroke="#b07a1a" stroke-width="4"/>`;
const hanEx = (id, x, y, s, extra = {}) => CAST.hanuman(id, x, y, s, { hs: HS, propR: GADA, aR: 30, ...extra });
const sugEx = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, ...extra });
const vali = (id, x, y, s, extra = {}) => CAST.sugriva(id, x, y, s, { hs: HS, skin: "#c9993a", tail: "#c9993a", muzzle: "#f0d29a", lower: "#8a1b1b", brows: "fierce", ...extra });
const ARROW_UP = `<path d="M2 120 L2 300" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/><path d="M2 120 L2 300" stroke="#8a5a2b" stroke-width="4"/><path d="M-12 296 L2 330 L16 296 Z" fill="#e8e8f0" stroke="${C.ink}" stroke-width="2.5"/><path d="M-8 120 L2 140 L12 120" fill="${C.verm}"/>`;
const STICKS = `<g transform="translate(2,140)"><path d="M-30 -10 L34 10" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M-30 -10 L34 10" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/></g>`;
// a flowering sala branch laid as a seat
const salaBranch = (id, x, y, s = 1) => `<g transform="translate(${x},${y})"><g id="${id}" transform="${T(0, 0, 0, 0.2)}" style="opacity:0"><g transform="scale(${s})">
  <path d="M-170 0 Q0 -20 170 4" stroke="${C.ink}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M-170 0 Q0 -20 170 4" stroke="#7a4a22" stroke-width="9" fill="none" stroke-linecap="round"/>
  ${[-140, -90, -40, 10, 60, 110, 150].map((a, i) => `<ellipse cx="${a}" cy="${i % 2 ? -18 : 10}" rx="30" ry="13" fill="#3f7a3a" stroke="${C.ink}" stroke-width="2" transform="rotate(${i % 2 ? -20 : 20} ${a} ${i % 2 ? -18 : 10})"/>`).join("")}
  ${[-120, -60, 0, 50, 100, 140].map((a, i) => `<circle cx="${a}" cy="${i % 2 ? -26 : -6}" r="9" fill="${i % 3 ? "#fff3d6" : "#f7b7c6"}" stroke="#b0476a" stroke-width="1.5"/>`).join("")}</g></g></g>`;
const smoke = (id, x, y) => `<g id="${id}" transform="${T(x, y, 0, 0.5)}" style="opacity:0"><circle r="18" fill="#d8d4cc" opacity="0.8"/><circle cx="14" cy="-10" r="12" fill="#e8e4dc" opacity="0.8"/></g>`;
const tear = (id, x, y) => `<g id="${id}" transform="${T(x, y)}" style="opacity:0"><path d="M0 -8 Q7 4 0 10 Q-7 4 0 -8 Z" fill="#8fd0ff" stroke="#2a6a9a" stroke-width="1.5"/></g>`;
const cry = (k, id, x, y, t0, n, gap = 0.55) => { for (let i = 0; i < n; i++) { const t = t0 + i * gap; k.mv(id, t, 0.01, { x, y }); k.op(id, t, 0.08, 1); k.mv(id, t + 0.02, 0.45, { y: y + 60 }, "power1.in"); k.op(id, t + 0.35, 0.12, 0); } };
// a ground fire on a small pile of logs; the flame layers flicker
const groundFire = (p, x, y, s = 0.8) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-90 10 L90 -10 M-90 -10 L90 10" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/><path d="M-90 10 L90 -10 M-90 -10 L90 10" stroke="#7a4a22" stroke-width="15" stroke-linecap="round"/></g>${flames(p, x, y - 4, s)}`;
// footsteps without moving the outer group (that one is moved by mv along a curve)
const steps = (k, c, t0, t1, step = 0.5) => { const n = Math.max(1, Math.floor((t1 - t0) / step)); for (let i = 0; i < n; i++) { const ts = t0 + i * step; const f = i % 2 ? `${c}-fr` : `${c}-fl`; k.mv(f, ts, step / 2, { dy: -14 }, "sine.out"); k.mv(f, ts + step / 2, step / 2, { dy: 14 }, "sine.in"); } };

const duskSky = (p) => grad(`${p}-sky`, [[0, "#2a2a5a"], [0.55, "#a84a3a"], [1, "#f0a05a"]]);
const malaya = (p) => `<rect width="${W}" height="2400" fill="url(#${p}-sky)"/>
  <path d="M0 1260 L160 1100 L300 1180 L470 1020 L640 1170 L820 1060 L1080 1200 L1080 1440 L0 1440 Z" fill="#4a3a4a" opacity="0.7"/>
  ${tree(70, 1450, 0.9, "#3f6a3a", "#28452a")}${tree(1010, 1450, 0.85, "#3f6a3a", "#28452a")}
  <rect x="0" y="1430" width="${W}" height="1000" fill="#6a6a3a"/>`;

export const SCENES = [
  // ---------- 1. hook: with fire as witness, Ram and Sugriva became friends ----------
  {
    id: "s01",
    pre: 0.2,
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      flicker(k, `${p}-f`, 0, dur);
      k.op(`${p}-glow`, 0, 0.6, 1);
      k.label(`${p}-ta`, 0.5, L.w(1, "मित्र") - 0.3);
      const tM = L.w(1, "मित्र") - 0.4;
      k.mv(`${p}-r-ar`, tM, 0.4, -62, "back.out(1.4)");
      k.mv(`${p}-s-al`, tM, 0.4, 62, "back.out(1.4)");
      k.mood(`${p}-s`, tM + 0.3, "open"); k.mood(`${p}-s`, tM + 0.8, "smile");
      k.osc(`${p}-s-tl`, tM + 0.3, 0.35, 7, 14);
      k.label(`${p}-tm`, tM + 0.1);
      const sk = sparkles(p, 10, 540, 1150, 300);
      sk.run(k, tM + 0.3, 1.4);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`, "#ffb347"),
        art: `${malaya(p)}
          <circle id="${p}-glow" cx="540" cy="1420" r="340" fill="url(#${p}-gl)" style="opacity:0"/>
          ${ramEx(`${p}-r`, 330, 1580, 0.95)}${sugEx(`${p}-s`, 750, 1580, 0.9)}
          ${groundFire(`${p}-f`, 540, 1560, 0.75)}
          ${sk.art}`,
        html: tag(`${p}-ta`, 540, 560, "अग्नि साक्षी") + tag(`${p}-tm`, 540, 440, "राम-सुग्रीव मित्रता!", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 2. Hanuman brings them; Sugriva lays a flowering sala branch for Ram ----------
  {
    id: "s02",
    extra: 1.8,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      k.walk(`${p}-h`, 0.1, L.end(1) - 0.3, 520, 0.5);
      k.walk(`${p}-r`, 0.2, L.end(1) - 0.3, 330, 0.5);
      k.walk(`${p}-l`, 0.3, L.end(1) - 0.3, 140, 0.48);
      k.label(`${p}-ts`, L.w(1, "सुग्रीव") - 0.1, L(2) - 0.15);
      k.mv(`${p}-s-al`, L.w(1, "सुग्रीव"), 0.4, -26); k.mv(`${p}-s-ar`, L.w(1, "सुग्रीव") + 0.05, 0.4, 26);
      // the branch is laid; Ram sits on it
      const tB = L.w(2, "शाल") - 0.3;
      k.mv(`${p}-s-al`, tB - 0.2, 0.3, 8); k.mv(`${p}-s-ar`, tB - 0.2, 0.3, -50);
      k.op(`${p}-br`, tB, 0.2, 1);
      k.mv(`${p}-br`, tB, 0.5, { s: 1 }, "back.out(1.8)");
      k.label(`${p}-tb`, tB + 0.1);
      const tS = L.w(2, "बैठाया") - 0.5;
      k.op(`${p}-r`, tS, 0.3, 0);
      k.op(`${p}-rs`, tS, 0.3, 1);
      k.mood(`${p}-rs`, tS + 0.4, "smile");
      return {
        defs: duskSky(p),
        art: `${malaya(p)}
          ${CAST.vanara(`${p}-v1`, 960, 1560, 0.6, { hs: HS })}
          ${sugEx(`${p}-s`, 800, 1580, 0.9)}
          ${salaBranch(`${p}-br`, 330, 1560, 0.95)}
          ${lakEx(`${p}-l`, -260, 1580, 0.82)}${ramEx(`${p}-r`, -80, 1580, 0.92)}
          ${ramEx(`${p}-rs`, 330, 1560, 0.92, { seated: true, hidden: true, aL: -20, aR: 20 })}
          ${hanEx(`${p}-h`, -420, 1580, 0.82, { aL: -26 })}`,
        html: tag(`${p}-ts`, 800, 440, "सुग्रीव") + tag(`${p}-tb`, 540, 440, "शाल की डाल का आसन"),
        js: k.code(),
      };
    },
  },

  // ---------- 3. Hanuman kindles fire with two sticks; they walk around it ----------
  {
    id: "s03",
    extra: 2.0,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      // rubbing the sticks
      k.osc(`${p}-h-al`, 0.3, 0.12, 15, -14);
      k.osc(`${p}-h-ar`, 0.36, 0.12, 15, 14);
      for (let i = 0; i < 4; i++) { const t = 0.6 + i * 0.35; k.op(`${p}-sm${i}`, t, 0.2, 0.9); k.mv(`${p}-sm${i}`, t, 1.0, { dy: -120, s: 1.2 }, "power1.out"); k.op(`${p}-sm${i}`, t + 0.6, 0.4, 0); }
      const tF = L.w(1, "अग्नि") - 0.3;
      k.op(`${p}-fire`, tF, 0.3, 1);
      k.mv(`${p}-fire`, tF, 0.6, { s: 1 }, "back.out(1.6)");
      flicker(k, `${p}-f`, tF, dur);
      k.op(`${p}-glow`, tF, 0.5, 1);
      k.mv(`${p}-h`, tF + 0.4, 0.8, { x: 1000 }, "power2.inOut");
      k.label(`${p}-tf`, tF + 0.1, L(2) - 0.15);
      // the walk around the fire: Ram leads, Sugriva follows, round the back to the other side
      const t0 = L(2) + 0.1, half = (L.end(2) - 0.4 - t0) / 2;
      k.op(`${p}-ring`, t0 - 0.2, 0.3, 0.9);
      k.mv(`${p}-ring`, t0 - 0.2, L.end(2) - t0 + 0.5, 360, "none");
      k.mv(`${p}-r`, t0, half, { x: 560, y: 1450, s: 0.72 }, "sine.inOut");
      k.mv(`${p}-r`, t0 + half, half, { x: 850, y: 1580, s: 0.92 }, "sine.inOut");
      k.mv(`${p}-s`, t0 + 0.3, half, { x: 460, y: 1450, s: 0.7 }, "sine.inOut");
      k.mv(`${p}-s`, t0 + 0.3 + half, half, { x: 690, y: 1580, s: 0.88 }, "sine.inOut");
      steps(k, `${p}-r`, t0, t0 + 2 * half);
      steps(k, `${p}-s`, t0 + 0.3, t0 + 0.3 + 2 * half);
      k.op(`${p}-ring`, L.end(2) - 0.2, 0.3, 0);
      k.label(`${p}-tp`, L.w(2, "परिक्रमा") - 0.2);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`, "#ffb347"),
        art: `${malaya(p)}
          <circle id="${p}-glow" cx="540" cy="1420" r="340" fill="url(#${p}-gl)" style="opacity:0"/>
          <g transform="translate(540,1520)"><g id="${p}-ring" transform="rotate(0)" style="opacity:0"><g transform="scale(1,0.3)">
            <circle r="260" fill="none" stroke="#ffd23a" stroke-width="10" stroke-dasharray="40 30"/><path d="M250 -40 L280 10 L230 4 Z" fill="#ffd23a"/></g></g></g>
          ${sugEx(`${p}-s`, 330, 1580, 0.88)}${ramEx(`${p}-r`, 120, 1580, 0.92)}
          ${hanEx(`${p}-h`, 540, 1580, 0.86, { propR: STICKS, aL: -40, aR: 40 })}
          <g transform="translate(540,1560)"><g id="${p}-fire" transform="${T(0, 0, 0, 0.2)}" style="opacity:0">${groundFire(`${p}-f`, 0, 0, 0.7)}</g></g>
          ${[0, 1, 2, 3].map((i) => smoke(`${p}-sm${i}`, 520 + i * 14, 1440)).join("")}`,
        html: tag(`${p}-tf`, 540, 560, "दो लकड़ियों से अग्नि") + tag(`${p}-tp`, 540, 440, "अग्नि की परिक्रमा", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 4. Sugriva's sorrow: Vali took his kingdom and his wife ----------
  {
    id: "s04",
    extra: 2.4,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      flicker(k, `${p}-f`, 0, dur);
      k.mood(`${p}-s`, 0.3, "sad");
      k.mv(`${p}-s-h`, 0.4, 0.6, 8);
      cry(k, `${p}-t0`, 762, 1279, 0.6, 7);
      const tV = L.w(1, "बाली") - 0.4;
      for (let i = 0; i < 3; i++) k.op(`${p}-dot${i}`, tV - 0.3 + i * 0.1, 0.15, 1);
      k.op(`${p}-vis`, tV, 0.3, 1);
      k.mv(`${p}-vis`, tV, 0.5, { s: 1 }, "back.out(1.8)");
      k.label(`${p}-tv`, tV + 0.1, L.w(1, "राज्य") - 0.2);
      // Vali pushes young Sugriva out and keeps the crown
      const tK = L.w(1, "राज्य") - 0.2;
      k.mv(`${p}-vv-ar`, tK, 0.3, -90, "power2.out");
      k.mv(`${p}-vs`, tK + 0.2, 0.5, { dx: 110, r: 14 }, "power2.out");
      k.op(`${p}-vs`, tK + 0.6, 0.3, 0);
      k.mood(`${p}-r`, tK + 0.3, "sad");
      k.label(`${p}-tk`, tK + 0.1);
      return {
        defs: duskSky(p) + rgrad(`${p}-vg`, [[0, "#f6e0c8", 0.96], [1, "#e6c8a8", 0.9]]),
        art: `${malaya(p)}
          ${groundFire(`${p}-f`, 540, 1590, 0.5)}
          ${lakEx(`${p}-l`, 110, 1580, 0.82)}${ramEx(`${p}-r`, 310, 1580, 0.92)}
          ${sugEx(`${p}-s`, 780, 1580, 0.92)}
          ${tear(`${p}-t0`, 762, 1279)}
          ${[0, 1, 2].map((i) => `<circle id="${p}-dot${i}" cx="${740 - i * 40}" cy="${1150 - i * 50}" r="${10 + i * 6}" fill="#f6e0c8" stroke="${C.ink}" stroke-width="2" style="opacity:0"/>`).join("")}
          <g transform="translate(520,920)"><g id="${p}-vis" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <ellipse rx="270" ry="170" fill="url(#${p}-vg)" stroke="${C.ink}" stroke-width="4"/>
            ${vali(`${p}-vv`, -70, 130, 0.5)}${sugEx(`${p}-vs`, 90, 130, 0.42, { hat: "none", mood: "sad" })}</g></g>`,
        html: tag(`${p}-tv`, 540, 440, "भाई बाली", "red") + tag(`${p}-tk`, 540, 440, "राज्य और पत्नी छीन ली", "red"),
        js: k.code(),
      };
    },
  },

  // ---------- 5. Ram's promise: my arrows will end Vali; Sugriva's fear is gone ----------
  {
    id: "s05",
    extra: 2.2,
    build: ({ id: p, dur, L }) => {
      const k = kit();
      flicker(k, `${p}-f`, 0, dur);
      k.mv(`${p}-rays`, 0, dur, 30, "none");
      const tA = L.w(1, "बाण") - 0.5;
      k.mv(`${p}-r-ar`, tA, 0.5, -170, "back.out(1.4)");
      k.op(`${p}-glow`, tA, 0.4, 1);
      k.op(`${p}-flash`, tA + 0.4, 0.06, 0.4); k.op(`${p}-flash`, tA + 0.46, 0.35, 0);
      k.label(`${p}-tr`, tA + 0.2, L(2) - 0.15);
      const sk = sparkles(p, 8, 330, 960, 200);
      sk.run(k, tA + 0.3, 1.2);
      // Sugriva smiles; the vanaras jump for joy
      const tJ = L.w(2, "डर") - 0.3;
      k.mood(`${p}-s`, tJ, "smile");
      k.mv(`${p}-s-al`, tJ, 0.3, 150); k.mv(`${p}-s-ar`, tJ, 0.3, -150);
      k.osc(`${p}-s`, tJ + 0.2, 0.25, 5, { dy: -40 });
      k.osc(`${p}-v1`, tJ + 0.1, 0.25, 7, { dy: -36 }); k.osc(`${p}-v2`, tJ + 0.25, 0.25, 7, { dy: -36 });
      k.osc(`${p}-s-tl`, tJ, 0.3, 9, 14);
      k.label(`${p}-tj`, tJ + 0.1);
      return {
        defs: duskSky(p) + glowDef(`${p}-gl`),
        art: `${malaya(p)}${rays(`${p}-rays`, 330, 1000, 1100, 18, "#ffe08a", 0.16)}
          <circle id="${p}-glow" cx="330" cy="1060" r="240" fill="url(#${p}-gl)" style="opacity:0"/>
          ${groundFire(`${p}-f`, 540, 1590, 0.5)}
          ${lakEx(`${p}-l`, 110, 1580, 0.82)}${ramEx(`${p}-r`, 330, 1580, 0.95, { propR: ARROW_UP })}
          ${CAST.vanara(`${p}-v1`, 960, 1560, 0.6, { hs: HS })}${CAST.vanara(`${p}-v2`, 620, 1555, 0.55, { hs: HS })}
          ${sugEx(`${p}-s`, 790, 1580, 0.9)}
          ${sk.art}`,
        html: tag(`${p}-tr`, 540, 440, "\"बाली का अंत करूँगा\"", "red") + tag(`${p}-tj`, 540, 440, "सुग्रीव का डर दूर"),
        js: k.code(),
      };
    },
  },

  // ---------- 6. next: Sita's ornaments; Jai Shri Ram ----------
  {
    id: "s06",
    extra: 2.4,
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
      const anklet = (x, y) => `<g transform="translate(${x},${y})"><ellipse rx="46" ry="20" fill="none" stroke="${C.ink}" stroke-width="10"/><ellipse rx="46" ry="20" fill="none" stroke="${C.gold}" stroke-width="6"/>${[-36, -18, 0, 18, 36].map((a) => `<circle cx="${a}" cy="${Math.round(20 - Math.abs(a) * 0.2)}" r="6" fill="${C.goldL}" stroke="${C.ink}" stroke-width="1.5"/>`).join("")}</g>`;
      return {
        defs: grad(`${p}-goldG`, [[0, "#3a0f12"], [0.5, "#a83a1a"], [1, "#f0a03a"]]) + rgrad(`${p}-glow2`, [[0, "#fff4c8", 0.9], [1, "#fff4c8", 0]]),
        art: `<rect width="${W}" height="2400" fill="url(#${p}-goldG)"/>${rays(`${p}-rays`, 540, 1100, 1300, 22, "#ffe08a", 0.25)}<circle cx="540" cy="1100" r="420" fill="url(#${p}-glow2)"/>
          <g transform="translate(540,1080)"><g id="${p}-next" transform="${T(0, 0, 0, 0.3)}" style="opacity:0">
            <rect x="-380" y="-290" width="760" height="500" rx="40" fill="rgba(20,10,30,0.85)" stroke="${C.gold}" stroke-width="6"/>
            <path d="M-230 60 Q-250 -120 -120 -160 L120 -160 Q250 -120 230 60 Q0 120 -230 60 Z" fill="#f0b62a" stroke="${C.ink}" stroke-width="5"/>
            <path d="M-200 40 Q0 90 200 40" stroke="#c2361f" stroke-width="8" fill="none"/>
            ${anklet(-90, -40)}${anklet(90, -40)}
            <path d="M-70 -110 Q0 -40 70 -110" stroke="${C.gold}" stroke-width="10" fill="none"/><circle cy="-72" r="14" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/>
            <circle cx="-150" cy="-110" r="16" fill="none" stroke="${C.gold}" stroke-width="7"/><circle cx="150" cy="-110" r="16" fill="none" stroke="${C.gold}" stroke-width="7"/>
            <text y="175" text-anchor="middle" font-family="Mukta" font-weight="800" font-size="54" fill="#ffd23a">भाग 20: सीता जी के गहने</text>
          </g></g>
          <g id="${p}-hw" transform="${T(0, 300)}" style="opacity:0">${lakEx(`${p}-hl`, 190, 1460, 0.82)}${ramEx(`${p}-hr`, 420, 1460, 0.95)}${hanEx(`${p}-hh`, 660, 1460, 0.82, { aL: -26 })}${sugEx(`${p}-hs`, 890, 1460, 0.82, { aL: -26, aR: 26 })}</g>
          ${pt.art}`,
        html: big(`${p}-jsr`, 540, 320, "जय श्री राम", "", 110),
        js: k.code(),
      };
    },
  },
];
