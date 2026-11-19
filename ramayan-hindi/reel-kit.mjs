// Shared helpers for the vertical Hindi reels (from Episode 4 on). Episodes 1-3 keep their own copies.
// Art coordinates: the build moves the art up 230 px, so screen y = art y - 230.
import { C, T, PROP, CAST, rgrad, hall, flames } from "../ramayan/build/lib.mjs";

export const W = 1080, HS = 1.4; // frame width, chibi head scale
const r2 = (n) => Math.round(n * 1000) / 1000;

let seed = 97;
export const reseed = (s) => { seed = s; };
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// collects rig calls (see ramayan/build/rig.js) as JS source
export function kit() {
  const js = [];
  const call = (fn, ...a) => {
    while (a.length && a[a.length - 1] === undefined) a.pop();
    js.push(`${fn}(${a.map((v) => (typeof v === "number" ? String(r2(v)) : JSON.stringify(v))).join(",")});`);
  };
  const k = {};
  for (const fn of ["mv", "osc", "op", "hx", "label", "blink", "mood", "walk"]) k[fn] = (...a) => call(fn, ...a);
  k.attrD = (id, t, d, from, to, ease = "power2.out") =>
    js.push(`tl.fromTo(E("${id}"),{attr:{d:"${from}"}},{attr:{d:"${to}"},duration:${r2(d)},ease:"${ease}",immediateRender:false},${r2(t)});`);
  k.code = () => js.join("\n      ");
  return k;
}

// HTML labels (screen coordinates)
export const tag = (id, x, y, text, cls = "") => `<div class="lw" style="left:${x}px;top:${y}px"><div id="${id}" class="tag ${cls}" style="opacity:0">${text}</div></div>`;
export const big = (id, x, y, text, sub = "", size = 150) => `<div class="lw" style="left:${x}px;top:${y}px"><div id="${id}" class="big" style="opacity:0;font-size:${size}px">${text}${sub ? `<small>${sub}</small>` : ""}</div></div>`;

export function stars(n, h = 900) {
  let s = "";
  for (let i = 0; i < n; i++) s += `<circle cx="${Math.round(30 + rnd() * 1020)}" cy="${Math.round(30 + rnd() * h)}" r="${(1.5 + rnd() * 3).toFixed(1)}" fill="#fff6d8" opacity="${(0.4 + rnd() * 0.6).toFixed(2)}"/>`;
  return s;
}
export function sparkles(p, n, cx, cy, spread) {
  let art = "";
  for (let i = 0; i < n; i++) {
    const x = Math.round(cx + (rnd() - 0.5) * spread), y = Math.round(cy + (rnd() - 0.5) * spread);
    art += `<g transform="translate(${x},${y})"><g id="${p}-sk${i}" transform="scale(0.4,0.4)" style="opacity:0"><path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" fill="#fffbe6"/></g></g>`;
  }
  return { art, run: (k, t, span) => { for (let i = 0; i < n; i++) { const ts = t + (i / n) * span; k.op(`${p}-sk${i}`, ts, 0.2, 1); k.mv(`${p}-sk${i}`, ts, 0.5, { s: 1.1 }, "back.out(2)"); k.op(`${p}-sk${i}`, ts + 0.6, 0.4, 0); } } };
}
export function petals(p, n, t0, span) {
  let art = "";
  const moves = [];
  const cols = ["#f29bb0", "#f7b7c6", C.saffron, C.yellow];
  for (let i = 0; i < n; i++) {
    art += `<g id="${p}-pt${i}" transform="${T(40 + rnd() * 1000, 160, rnd() * 90)}"><ellipse rx="12" ry="7" fill="${cols[i % 4]}"/></g>`;
    moves.push([`${p}-pt${i}`, t0 + (i / n) * span, 4 + rnd() * 2, { y: 2150, dx: (rnd() - 0.5) * 300, r: 200 + rnd() * 300 }]);
  }
  return { art, run: (k) => moves.forEach(([id, t, d, c]) => k.mv(id, t, d, c, "none")) };
}
export const glowDef = (id, c = "#f7d77a") => rgrad(id, [[0, "#fff4c8", 0.95], [0.4, c, 0.5], [1, c, 0]]);
export const moon = (x, y, r = 70) => `<circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="#fff4d6" opacity="0.12"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fbf1d0"/>`;
// the 1920x1080 hall cropped to a vertical frame (floor line at art y 1180)
export const hallV = (p, wall) => `<rect width="${W}" height="2400" fill="#3d0b09"/><g transform="translate(-420,400)">${hall(p, { wall })}</g><rect x="0" y="1478" width="${W}" height="1000" fill="#b9853f"/>`;
export function darkTree(x, y, s, c) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-16 0 L-10 -200 L10 -200 L16 0 Z" fill="${c}"/>
    <path d="M0 -480 L-120 -300 L-60 -310 L-150 -170 L-70 -180 L-170 -40 L170 -40 L70 -180 L150 -170 L60 -310 L120 -300 Z" fill="${c}"/></g>`;
}
export const flicker = (k, id, t0, t1) => { for (let j = 0; j < 7; j++) k.osc(`${id}-fl${j}`, t0 + j * 0.02, 0.15 + (j % 3) * 0.02, Math.max(1, Math.floor((t1 - t0) / 0.16) - 1), { sx: 0.9, sy: 1.12 }); };
export const shake = (k, p, t, n = 8, a = 12) => {
  for (let i = 0; i < n; i++) k.hx(`${p}-cam`, t + i * 0.07, 0.07, { x: i % 2 ? -a : a, y: i % 3 ? a * 0.6 : -a * 0.6 }, "none");
  k.hx(`${p}-cam`, t + n * 0.07, 0.1, { x: 0, y: 0 });
};

// archery: Ram holding his bow; aR -90 aims level to the right.
// The arrow leaves the bow at (x + 204 s, y - 250 s) for an archer at (x, y) and scale s.
export const STR_REST = "M-82 96 L0 96 L82 96";
export const STR_PULL = "M-82 96 L0 30 L82 96";
export const archer = (id, x, y, s, extra = {}) => CAST.ram(id, x, y, s, { hs: HS, back: null, propR: PROP.bowArmed(id), ...extra });
export const bowReady = (k, id) => k.op(`${id}-bow`, 0, 0.01, 1);
export function shoot(k, id, td, tp, pull, tf) {
  k.mv(`${id}-nock`, td, 0.01, { y: 0 });
  k.mv(`${id}-ar`, td, 0.35, -90, "power2.out");
  k.op(`${id}-nock`, td, 0.15, 1);
  k.mv(`${id}-al`, td + 0.2, 0.4, -70);
  k.attrD(`${id}-str`, tp, pull, STR_REST, STR_PULL);
  k.mv(`${id}-nock`, tp, pull, { y: -66 });
  if (tf == null) return;
  k.attrD(`${id}-str`, tf, 0.12, STR_PULL, STR_REST, "power4.out");
  k.op(`${id}-nock`, tf, 0.02, 0);
  k.mv(`${id}-al`, tf, 0.3, -40, "power2.out");
}
export const arrowFly = (id, x, y, glow = "") => `<g id="${id}" transform="${T(x, y)}" style="opacity:0">
  ${glow ? `<circle cx="-4" r="34" fill="${glow}" opacity="0.55"/>` : ""}
  <path d="M-230 0 L-170 0" stroke="#fff3c4" stroke-width="4" opacity="0.6"/>
  <path d="M-170 0 L-4 0" stroke="#5a3a1a" stroke-width="6"/><path d="M-16 -10 L8 0 L-16 10 Z" fill="#cfd3d6" stroke="${C.ink}" stroke-width="1.5"/>
  <path d="M-172 -9 L-150 0 L-172 9 Z" fill="${C.verm}"/></g>`;
export { flames };
