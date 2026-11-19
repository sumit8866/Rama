// Runtime rig, pasted into every scene's IIFE. `tl` is the scene's paused timeline.
// All tweens are fromTo with known start values, so any seek order renders the same frame.
const E = (id) => document.getElementById(id);
const ST = {};
const OP = {};
const HX = {};
function P(id) {
  if (!ST[id]) {
    const el = E(id);
    if (!el) throw new Error("rig: missing #" + id);
    const s = el.getAttribute("transform") || "rotate(0)";
    const n = (s.match(/-?\d*\.?\d+/g) || ["0"]).map(Number);
    const k = s.startsWith("translate") ? "T" : s.startsWith("scale") ? "S" : "R";
    ST[id] = { k, n };
  }
  return ST[id];
}
function F(k, n) {
  return k === "T"
    ? `translate(${n[0]},${n[1]}) rotate(${n[2]}) scale(${n[3]},${n[4]})`
    : k === "S"
      ? `scale(${n[0]},${n[1]})`
      : `rotate(${n[0]})`;
}
// move/rotate/scale an SVG group. c: {x,y,dx,dy,r,s,sx,sy} for T, {sx,sy,s} for S, number for R
function mv(id, t, d, c, ease, extra) {
  ease = ease || "power2.inOut";
  extra = extra || {};
  const p = P(id);
  const a = p.n.slice();
  const b = a.slice();
  if (p.k === "T") {
    if (c.x != null) b[0] = c.x;
    if (c.y != null) b[1] = c.y;
    if (c.dx != null) b[0] = a[0] + c.dx;
    if (c.dy != null) b[1] = a[1] + c.dy;
    if (c.r != null) b[2] = c.r;
    if (c.s != null) { b[3] = c.s; b[4] = c.s; }
    if (c.sx != null) b[3] = c.sx;
    if (c.sy != null) b[4] = c.sy;
  } else if (p.k === "S") {
    if (c.s != null) { b[0] = c.s; b[1] = c.s; }
    if (c.sx != null) b[0] = c.sx;
    if (c.sy != null) b[1] = c.sy;
  } else {
    b[0] = typeof c === "number" ? c : c.r;
  }
  tl.fromTo(E(id), { attr: { transform: F(p.k, a) } }, Object.assign({ attr: { transform: F(p.k, b) }, duration: d, ease, immediateRender: false }, extra), t);
  const reps = extra.repeat || 0;
  p.n = extra.yoyo && reps % 2 === 1 ? a : b;
}
// wiggle around the current value and come back (yoyo), n half-cycles of length d each
function osc(id, t, d, n, c, ease) {
  const cycles = n % 2 === 1 ? n : n + 1;
  mv(id, t, d, c, ease || "sine.inOut", { repeat: cycles, yoyo: true });
}
// opacity
function op(id, t, d, to, ease) {
  const el = E(id);
  if (!el) throw new Error("rig: missing #" + id);
  const from = id in OP ? OP[id] : el.style.opacity === "" ? 1 : Number(el.style.opacity);
  tl.fromTo(el, { opacity: from }, { opacity: to, duration: d, ease: ease || "power1.inOut", immediateRender: false }, t);
  OP[id] = to;
}
// HTML element: x/y/scale/opacity together
function hx(id, t, d, to, ease) {
  const el = E(id);
  const from = HX[id] || { x: 0, y: 0, scale: 1, opacity: el.style.opacity === "" ? 1 : Number(el.style.opacity) };
  const target = Object.assign({}, from, to);
  tl.fromTo(el, Object.assign({}, from), Object.assign({}, target, { duration: d, ease: ease || "power2.inOut", immediateRender: false }), t);
  HX[id] = target;
}
// a caption plate: rise in at t, leave at t2 (optional)
function label(id, t, t2) {
  if (!HX[id]) HX[id] = { x: 0, y: 18, scale: 1, opacity: 0 };
  hx(id, t, 0.5, { opacity: 1, y: 0 }, "power3.out");
  if (t2 != null) hx(id, t2, 0.35, { opacity: 0 }, "power1.in");
}
function blink(c, t) {
  mv(c + "-e", t, 0.06, { sy: 0.1 }, "power1.in");
  mv(c + "-e", t + 0.06, 0.09, { sy: 1 }, "power1.out");
}
function mood(c, t, which) {
  const ids = { smile: c + "-m1", sad: c + "-m2", open: c + "-m3" };
  for (const k in ids) op(ids[k], t, 0.18, k === which ? 1 : 0);
}
// walk the character's outer group to x over [t0,t1]
function walk(c, t0, t1, x, step) {
  step = step || 0.5;
  mv(c, t0, t1 - t0, { x }, "none");
  const n = Math.max(1, Math.floor((t1 - t0) / step));
  for (let i = 0; i < n; i++) {
    const ts = t0 + i * step;
    const foot = i % 2 ? c + "-fr" : c + "-fl";
    mv(foot, ts, step / 2, { dy: -14 }, "sine.out");
    mv(foot, ts + step / 2, step / 2, { dy: 14 }, "sine.in");
    mv(c + "-b", ts, step / 2, { y: -7, r: i % 2 ? 1.2 : -1.2 }, "sine.out");
    mv(c + "-b", ts + step / 2, step / 2, { y: 0, r: 0 }, "sine.in");
  }
}
// gentle idle: head tilts and blinks spread over [t0,t1], offset by seed so no two match
function idle(c, t0, t1, seed) {
  seed = seed || 0;
  let t = t0 + 0.3 + (seed % 5) * 0.27;
  let k = 0;
  while (t < t1 - 0.5) {
    blink(c, t);
    t += 2.1 + ((seed + k) % 3) * 0.55;
    k++;
  }
  let u = t0 + 0.6 + (seed % 3) * 0.4;
  let dir = seed % 2 ? 1 : -1;
  while (u < t1 - 1.4) {
    mv(c + "-h", u, 1.2, dir * (2 + (seed % 2)), "sine.inOut");
    u += 1.3 + (seed % 4) * 0.2;
    dir = -dir;
  }
}
