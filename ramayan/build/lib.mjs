// Art kit for the Ramayan film: flat Indian folk-art characters and sets, drawn as SVG.
// Every movable part is a <g> whose transform is one of three shapes the runtime rig tweens:
//   T: "translate(x,y) rotate(r) scale(sx,sy)"   R: "rotate(r)"   S: "scale(sx,sy)"

export const C = {
  ink: "#2a160f",
  gold: "#e2a72e",
  goldL: "#f7d77a",
  cream: "#f6e7c8",
  maroon: "#6e1a16",
  verm: "#c2361f",
  saffron: "#e8892b",
  yellow: "#f0b62a",
  leaf: "#3f7a3a",
  leafD: "#28512a",
  teal: "#1f6f6b",
  indigo: "#1d1b3a",
  sand: "#e9c48a",
  sandD: "#c99a5b",
  white: "#fbf6ea",
};
export const SKIN = {
  ram: "#4f86c6",
  fair: "#eab581",
  tan: "#d4935e",
  sage: "#c98a58",
  king: "#dca06c",
  divine: "#f6c453",
  demon: "#5b2d5e",
};

const r1 = (n) => Math.round(n * 100) / 100;
export const T = (x = 0, y = 0, r = 0, s = 1, sy = s) => `translate(${r1(x)},${r1(y)}) rotate(${r1(r)}) scale(${r1(s)},${r1(sy)})`;
const st = (fill, sw = 3) => `fill="${fill}" stroke="${C.ink}" stroke-width="${sw}" stroke-linejoin="round"`;

// ---------- character parts ----------

function crown(scale = 1, color = C.gold) {
  return `<g transform="translate(0,-80) scale(${scale})">
    <path d="M-31 2 L-35 -38 L-19 -24 L0 -58 L19 -24 L35 -38 L31 2 Z" ${st(color)}/>
    <rect x="-33" y="-8" width="66" height="11" ${st(C.goldL, 2.5)}/>
    <circle cx="0" cy="-22" r="7" ${st(C.verm, 2)}/>
    <circle cx="-20" cy="-13" r="3.5" fill="${C.teal}"/><circle cx="20" cy="-13" r="3.5" fill="${C.teal}"/>
    <circle cx="0" cy="-60" r="5" ${st(C.goldL, 2)}/>
  </g>`;
}

function tiara() {
  return `<g transform="translate(0,-82)">
    <path d="M-28 4 Q0 -16 28 4 L22 -6 L12 -2 L0 -16 L-12 -2 L-22 -6 Z" ${st(C.gold, 2.5)}/>
    <circle cx="0" cy="-8" r="4" fill="${C.verm}"/></g>`;
}

function face(o) {
  const { id, skin, hair, hat, beard, female, tilak, mood, brows, longHair, fangs } = o;
  const back = [];
  if (female) back.push(`<ellipse cx="0" cy="-92" rx="24" ry="17" ${st(hair)}/><circle cx="-18" cy="-98" r="5" fill="${C.white}"/><circle cx="-8" cy="-104" r="5" fill="${C.white}"/><circle cx="4" cy="-106" r="5" fill="${C.white}"/>`);
  if (hat === "sage") back.push(`<ellipse cx="0" cy="-104" rx="23" ry="25" ${st(hair)}/><path d="M-18 -96 Q0 -88 18 -96" stroke="${C.ink}" stroke-width="2.5" fill="none"/><path d="M-12 -116 Q0 -108 12 -116" stroke="${C.ink}" stroke-width="2" fill="none"/>`);
  if (hat === "wild") back.push(`<path d="M-44 -50 L-70 -90 L-40 -84 L-46 -126 L-18 -96 L-6 -138 L10 -98 L34 -132 L34 -90 L66 -100 L46 -60 L74 -40 L40 -30 Z" ${st(hair)}/>`);

  const browPath = brows === "fierce"
    ? `<path d="M-27 -71 L-5 -61" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><path d="M5 -61 L27 -71" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`
    : `<path d="M-25 -64 Q-14 -71 -4 -65" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M4 -65 Q14 -71 25 -64" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const eyeFill = fangs ? "#f5d742" : "#fff";
  const iris = fangs ? C.verm : C.ink;

  let beardSvg = "";
  if (beard === "sage") beardSvg = `<path d="M-31 -38 Q-30 18 0 40 Q30 18 31 -38 Q16 -22 0 -26 Q-16 -22 -31 -38 Z" ${st("#f2efe6")}/><path d="M-16 -28 Q0 -36 16 -28 Q0 -22 -16 -28 Z" ${st("#f2efe6", 2)}/>`;
  if (beard === "king") beardSvg = `<path d="M-26 -30 Q-22 2 0 10 Q22 2 26 -30 Q12 -20 0 -22 Q-12 -20 -26 -30 Z" ${st("#d9d4c7")}/><path d="M0 -27 Q-16 -36 -27 -24 Q-20 -31 0 -24 Z M0 -27 Q16 -36 27 -24 Q20 -31 0 -24 Z" ${st("#d9d4c7", 2)}/>`;

  const hairFront = hat === "sage" || hat === "wild"
    ? `<path d="M-34 -66 Q0 -98 34 -66 L33 -78 Q0 -102 -33 -78 Z" fill="${hair}" stroke="${C.ink}" stroke-width="2.5"/>`
    : `<path d="M-34 -64 Q0 -94 34 -64 L34 -78 Q0 -100 -34 -78 Z" fill="${hair}" stroke="${C.ink}" stroke-width="2.5"/>`;

  let headwear = "";
  if (hat === "royal") headwear = crown(1.15);
  if (hat === "prince") headwear = crown(0.85);
  if (hat === "queen") headwear = tiara();
  if (hat === "divine") headwear = crown(1.05, C.goldL);
  if (hat === "wild") headwear = `<path d="M-22 -86 L-30 -120 L-10 -92 Z M22 -86 L30 -120 L10 -92 Z" ${st("#e9e1cf", 2.5)}/>`;

  const jewels = female
    ? `<circle cx="0" cy="-74" r="3.5" fill="${C.verm}"/><circle cx="-34" cy="-34" r="5" ${st(C.gold, 1.5)}/><circle cx="34" cy="-34" r="5" ${st(C.gold, 1.5)}/><circle cx="9" cy="-37" r="3.5" fill="none" stroke="${C.gold}" stroke-width="2"/>`
    : "";
  const tilakSvg = tilak ? `<path d="M-5 -86 L0 -70 L5 -86" fill="none" stroke="${C.white}" stroke-width="2.5"/><path d="M0 -84 L0 -72" stroke="${C.verm}" stroke-width="3"/>` : "";
  const mouthOpen = fangs
    ? `<g id="${id}-m3" style="opacity:0"><ellipse cx="0" cy="-18" rx="15" ry="12" fill="#3a0808" stroke="${C.ink}" stroke-width="2"/><path d="M-10 -28 L-6 -18 L-2 -28 Z M10 -28 L6 -18 L2 -28 Z" fill="#fff"/></g>`
    : `<ellipse id="${id}-m3" cx="0" cy="-20" rx="7" ry="6" fill="#5a1010" stroke="${C.ink}" stroke-width="2" style="opacity:0"/>`;
  const fangSvg = fangs ? `<path d="M-12 -24 L-9 -14 L-6 -24 Z M12 -24 L9 -14 L6 -24 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/>` : "";

  return `${back.join("")}
    <ellipse cx="-33" cy="-46" rx="6" ry="10" ${st(skin, 2.5)}/><ellipse cx="33" cy="-46" rx="6" ry="10" ${st(skin, 2.5)}/>
    <ellipse cx="0" cy="-48" rx="33" ry="38" ${st(skin)}/>
    ${hairFront}
    <g transform="translate(0,-52)"><g id="${id}-e" transform="scale(1,1)">
      <path d="M-25 0 Q-14 -10 -3 0 Q-14 8 -25 0 Z" fill="${eyeFill}" stroke="${C.ink}" stroke-width="2.2"/>
      <path d="M3 0 Q14 -10 25 0 Q14 8 3 0 Z" fill="${eyeFill}" stroke="${C.ink}" stroke-width="2.2"/>
      <g id="${id}-i" transform="${T()}"><circle cx="-14" cy="0" r="4.6" fill="${iris}"/><circle cx="14" cy="0" r="4.6" fill="${iris}"/></g>
    </g></g>
    ${browPath}
    <path d="M1 -50 Q-4 -37 3 -35" stroke="${C.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path id="${id}-m1" d="M-10 -23 Q0 -15 10 -23" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round" style="opacity:${mood === "sad" ? 0 : 1}"/>
    <path id="${id}-m2" d="M-10 -17 Q0 -25 10 -17" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round" style="opacity:${mood === "sad" ? 1 : 0}"/>
    ${mouthOpen}${fangSvg}
    ${beardSvg}${jewels}${tilakSvg}${headwear}`;
}

export function arm(id, side, rot, skin, sleeve, prop, L, claws) {
  const sleeveSvg = sleeve ? `<path d="M0 0 L3 38" stroke="${C.ink}" stroke-width="35" stroke-linecap="round"/><path d="M0 0 L3 38" stroke="${sleeve}" stroke-width="29" stroke-linecap="round"/>` : "";
  const hand = claws
    ? `<path d="M-14 118 L-20 146 L-8 132 L-2 150 L4 132 L14 148 L14 122 Z" ${st(skin, 2.5)}/>`
    : `<circle cx="2" cy="124" r="14" ${st(skin, 2.5)}/>`;
  return `<g transform="translate(${side * 44},${-250 + L})"><g id="${id}" transform="rotate(${rot})">
    <path d="M0 0 L4 62 L2 116" stroke="${C.ink}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M0 0 L4 62 L2 116" stroke="${skin}" stroke-width="23" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    ${sleeveSvg}
    <path d="M-11 40 L14 40" stroke="${C.gold}" stroke-width="6"/>
    <path d="M-10 102 L13 102" stroke="${C.gold}" stroke-width="6"/>
    ${prop || ""}
    ${hand}
  </g></g>`;
}

export const PROP = {
  staff: `<path d="M8 -40 L8 252" stroke="${C.ink}" stroke-width="13" stroke-linecap="round"/><path d="M8 -40 L8 252" stroke="#8a5a2b" stroke-width="8" stroke-linecap="round"/><circle cx="8" cy="-44" r="9" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>`,
  ladle: `<path d="M2 124 L2 214" stroke="#7a4a22" stroke-width="7" stroke-linecap="round"/><ellipse cx="2" cy="222" rx="13" ry="9" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>`,
  // a drawn bow held across the hand (arm raised to point at the target); string and nocked arrow are tweened
  bowArmed: (id) => `<g id="${id}-bow" style="opacity:0">
    <path d="M-82 96 Q0 176 82 96" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
    <path d="M-82 96 Q0 176 82 96" fill="none" stroke="#9a5b23" stroke-width="7" stroke-linecap="round"/>
    <path id="${id}-str" d="M-82 96 L0 96 L82 96" fill="none" stroke="#f3ead2" stroke-width="2.5"/>
    <g id="${id}-nock" transform="${T(0, 0)}" style="opacity:0">
      <path d="M0 96 L0 214" stroke="#5a3a1a" stroke-width="5"/><path d="M-9 206 L0 226 L9 206 Z" fill="#cfd3d6" stroke="${C.ink}" stroke-width="1.5"/>
      <path d="M-7 96 L0 108 L7 96" fill="${C.verm}"/>
    </g></g>`,
};

function backGear(back, L, id) {
  if (back !== "bow") return "";
  return `<g id="${id}-bk" transform="translate(0,${L})">
    <path d="M-70 -330 Q-118 -220 -60 -112" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
    <path d="M-70 -330 Q-118 -220 -60 -112" fill="none" stroke="#9a5b23" stroke-width="7" stroke-linecap="round"/>
    <path d="M-70 -330 L-60 -112" stroke="#f3ead2" stroke-width="2"/>
    <g transform="translate(40,-262) rotate(22)">
      <path d="M-4 -34 L-4 -52 M4 -34 L6 -54 M12 -34 L14 -50" stroke="${C.verm}" stroke-width="5"/>
      <rect x="-12" y="-36" width="30" height="96" rx="6" ${st("#7a4a22", 2.5)}/>
      <path d="M-12 -18 L18 -18 M-12 44 L18 44" stroke="${C.gold}" stroke-width="4"/>
    </g></g>`;
}

export function person(o) {
  const {
    id, x = 0, y = 0, s = 1, skin = SKIN.fair, lower = C.yellow, border = C.gold, upper = null, sash = C.verm,
    hat = "none", hair = "#1b1209", beard = null, female = false, seated = false, back = null,
    aL = 8, aR = -8, propL = "", propR = "", tilak = false, mood = "smile", hs = 1, brows = "calm",
    longHair = false, glow = null, hidden = false, fangs = false, claws = false, robe = null,
  } = o;
  const L = seated ? 80 : 0;

  const feet = seated
    ? `<ellipse cx="-44" cy="-22" rx="16" ry="8" ${st(skin, 2.5)}/><ellipse cx="44" cy="-22" rx="16" ry="8" ${st(skin, 2.5)}/>`
    : `<g id="${id}-fl" transform="${T(-19, -7)}"><ellipse rx="17" ry="8" ${st(skin, 2.5)}/></g>
       <g id="${id}-fr" transform="${T(19, -7)}"><ellipse rx="17" ry="8" ${st(skin, 2.5)}/></g>`;

  let lowerSvg;
  if (seated) {
    lowerSvg = `<path d="M-40 -98 L40 -98 Q94 -44 88 -14 Q0 6 -88 -14 Q-94 -44 -40 -98 Z" ${st(lower)}/>
      <path d="M-88 -14 Q0 6 88 -14 L86 -28 Q0 -10 -86 -28 Z" fill="${border}"/>
      <path d="M-30 -60 Q0 -48 30 -60" stroke="${C.ink}" stroke-width="2" fill="none" opacity="0.5"/>`;
  } else if (female) {
    lowerSvg = `<path d="M-38 -178 L38 -178 L62 -12 Q0 0 -62 -12 Z" ${st(lower)}/>
      <path d="M-62 -12 Q0 0 62 -12 L59 -32 Q0 -20 -59 -32 Z" fill="${border}"/>
      <path d="M-4 -170 L-10 -20 M10 -170 L14 -22" stroke="${C.ink}" stroke-width="2" opacity="0.35"/>`;
  } else {
    lowerSvg = `<path d="M-36 -178 L36 -178 L50 -18 Q0 -10 -50 -18 Z" ${st(lower)}/>
      <path d="M-50 -18 Q0 -10 50 -18 L49 -32 Q0 -24 -49 -32 Z" fill="${border}"/>
      <path d="M0 -172 L-4 -24 M-12 -150 L-18 -26" stroke="${C.ink}" stroke-width="2" opacity="0.35"/>`;
  }
  if (robe && !seated) lowerSvg = `<path d="M-40 -178 L40 -178 L58 -14 Q0 -4 -58 -14 Z" ${st(robe)}/><path d="M-58 -14 Q0 -4 58 -14 L56 -30 Q0 -20 -56 -30 Z" fill="${border}"/>`;

  const torsoPath = `M-46 -256 Q0 -268 46 -256 L37 -176 L-37 -176 Z`;
  let torso = `<path d="${torsoPath}" transform="translate(0,${L})" ${st(upper || skin)}/>`;
  if (female) {
    torso = `<g transform="translate(0,${L})"><path d="${torsoPath}" ${st(skin)}/>
      <path d="M-46 -256 Q0 -268 46 -256 L42 -214 Q0 -204 -42 -214 Z" ${st(upper || C.maroon, 2.5)}/>
      <path d="M-52 -258 L-20 -264 L46 -176 L8 -172 Z" ${st(lower, 2.5)}/>
      <path d="M-20 -264 L46 -176 L38 -174 L-28 -262 Z" fill="${border}"/></g>`;
  } else if (hat === "sage" || robe) {
    torso += `<path d="M-50 -258 L12 -264 L39 -178 L-39 -176 Z" transform="translate(0,${L})" ${st(robe || C.saffron, 2.5)}/>`;
  } else if (sash) {
    torso += `<path d="M-46 -250 L-28 -260 L40 -178 L22 -176 Z" transform="translate(0,${L})" ${st(sash, 2.5)}/>`;
  }
  const belt = female ? "" : `<rect x="-39" y="${-186 + L}" width="78" height="11" ${st(C.gold, 2)}/>`;
  const necklace = `<path d="M-22 ${-252 + L} Q0 ${-220 + L} 22 ${-252 + L}" stroke="${C.gold}" stroke-width="5" fill="none"/><circle cx="0" cy="${-226 + L}" r="5" fill="${fangs ? "#e9e1cf" : C.verm}" stroke="${C.ink}" stroke-width="1.5"/>`;
  const sleeve = upper && !female ? upper : female ? upper || C.maroon : null;

  const head = `<g transform="translate(0,${-262 + L}) scale(${hs})"><g id="${id}-h" transform="rotate(0)">
      <rect x="-12" y="-16" width="24" height="24" ${st(skin, 2.5)}/>
      ${face({ id, skin, hair, hat, beard, female, tilak, mood, brows, longHair, fangs })}
    </g></g>`;

  const aura = glow ? `<circle cx="0" cy="${-310 + L}" r="160" fill="url(#${glow})"/>` : "";
  // long hair falls behind the shoulders, so it is drawn before the torso
  const backHair = longHair || female
    ? `<g transform="translate(0,${-262 + L}) scale(${hs})"><path d="M-36 -66 Q-50 -30 -54 18 Q-46 34 -30 26 L-20 -10 L20 -10 L30 26 Q46 34 54 18 Q50 -30 36 -66 Z" fill="${hair}" stroke="${C.ink}" stroke-width="3"/></g>`
    : "";
  return `<g id="${id}" transform="${T(x, y, 0, s)}"${hidden ? ` style="opacity:0"` : ""}><g id="${id}-b" transform="${T()}">
    ${aura}${backGear(back, L, id)}${backHair}${feet}${lowerSvg}${torso}${belt}${necklace}
    ${arm(`${id}-al`, -1, aL, skin, sleeve, propL, L, claws)}
    ${arm(`${id}-ar`, 1, aR, skin, sleeve, propR, L, claws)}
    ${head}
  </g></g>`;
}

// ---------- characters ----------
export const CAST = {
  ram: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.ram, lower: C.yellow, sash: C.verm, hat: "prince", tilak: true, longHair: true, back: "bow", ...extra }),
  lakshman: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, lower: C.saffron, sash: C.teal, hat: "prince", tilak: true, longHair: true, back: "bow", ...extra }),
  dasharath: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.king, lower: "#f3e3c3", upper: C.maroon, hat: "royal", beard: "king", hair: "#3a3a3a", ...extra }),
  vasishtha: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.sage, lower: "#f3e9d2", robe: "#f3e9d2", hat: "sage", beard: "sage", hair: "#d9d4c7", tilak: true, ...extra }),
  sage: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.sage, lower: C.saffron, hat: "sage", beard: "sage", hair: "#8a8a8a", tilak: true, ...extra }),
  vishwamitra: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.tan, lower: "#b4471c", robe: "#b4471c", border: C.goldL, hat: "sage", beard: "sage", hair: "#4a4a4a", brows: "fierce", tilak: true, ...extra }),
  queen: (id, x, y, s, saree, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, female: true, lower: saree, upper: C.maroon, hat: "queen", ...extra }),
  divine: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.divine, lower: "#fff2c4", sash: C.verm, hat: "divine", longHair: true, hair: "#2a1a0a", ...extra }),
  tadaka: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.demon, lower: "#2f5a2a", border: "#8a1b1b", sash: null, hat: "wild", hair: "#1a0f1c", brows: "fierce", fangs: true, claws: true, mood: "sad", ...extra }),
};

export function baby(id, x, y, s, skin, cloth, tilak = false) {
  return `<g id="${id}" transform="${T(x, y, 0, s)}">
    <ellipse cx="10" cy="0" rx="50" ry="27" ${st(cloth)}/>
    <path d="M-20 -14 Q10 10 56 -6" stroke="${C.gold}" stroke-width="4" fill="none"/>
    <circle cx="-38" cy="-8" r="23" ${st(skin)}/>
    <path d="M-48 -10 Q-44 -6 -40 -10 M-34 -10 Q-30 -6 -26 -10" stroke="${C.ink}" stroke-width="2" fill="none"/>
    <path d="M-40 4 Q-37 6 -34 4" stroke="${C.ink}" stroke-width="2" fill="none"/>
    <path d="M-52 -26 Q-40 -38 -26 -26" stroke="#1b1209" stroke-width="5" fill="none"/>
    ${tilak ? `<path d="M-38 -22 L-38 -15" stroke="${C.verm}" stroke-width="2.5"/>` : ""}
  </g>`;
}

export function cradle(id, x, topY, inner) {
  return `<g transform="translate(${x},${topY})"><g id="${id}" transform="rotate(0)">
    <path d="M0 0 L-72 196 M0 0 L72 196" stroke="#6b4a2a" stroke-width="4"/>
    <circle cx="0" cy="0" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>
    <g transform="translate(0,200)">${inner || ""}</g>
    <path d="M-92 196 Q0 262 92 196 L80 236 Q0 280 -80 236 Z" ${st("#8a5a2b")}/>
    <path d="M-92 196 Q0 262 92 196" stroke="${C.gold}" stroke-width="6" fill="none"/>
    <circle cx="-92" cy="196" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/><circle cx="92" cy="196" r="7" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>
  </g></g>`;
}

// ---------- sets ----------
export function grad(id, stops, vertical = true) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("")}</linearGradient>`;
}
export function rgrad(id, stops) {
  return `<radialGradient id="${id}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</radialGradient>`;
}

export function sun(id, cx, cy, r, color = "#ffd36b") {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    const r0 = r * 1.15, r2 = r * (i % 2 ? 1.6 : 1.9);
    return `<path d="M${r1(Math.cos(a - 0.06) * r0)} ${r1(Math.sin(a - 0.06) * r0)} L${r1(Math.cos(a) * r2)} ${r1(Math.sin(a) * r2)} L${r1(Math.cos(a + 0.06) * r0)} ${r1(Math.sin(a + 0.06) * r0)} Z" fill="${color}" opacity="0.55"/>`;
  }).join("");
  return `<g id="${id}" transform="${T(cx, cy)}"><g id="${id}-rays" transform="rotate(0)">${rays}</g>
    <circle r="${r}" fill="${color}" stroke="${C.saffron}" stroke-width="4"/></g>`;
}

function dome(x, base, w, h, color = C.white) {
  return `<path d="M${x - w / 2} ${base} Q${x - w / 2} ${base - h * 0.75} ${x} ${base - h} Q${x + w / 2} ${base - h * 0.75} ${x + w / 2} ${base} Z" ${st(color)}/>
    <path d="M${x} ${base - h} L${x} ${base - h - 26}" stroke="${C.ink}" stroke-width="3"/><circle cx="${x}" cy="${base - h - 28}" r="6" ${st(C.gold, 2)}/>`;
}
function arches(x0, y, n, w, h, fill) {
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + i * w * 1.6;
    return `<path d="M${x} ${y} L${x} ${y - h * 0.6} Q${x} ${y - h} ${x + w / 2} ${y - h} Q${x + w} ${y - h} ${x + w} ${y - h * 0.6} L${x + w} ${y} Z" fill="${fill}" stroke="${C.ink}" stroke-width="2"/>`;
  }).join("");
}
export function flag(id, x, y, color = C.saffron) {
  return `<path d="M${x} ${y} L${x} ${y - 70}" stroke="${C.ink}" stroke-width="3"/>
    <g transform="translate(${x},${y - 70})"><g id="${id}" transform="scale(1,1)"><path d="M0 0 L46 10 L0 24 Z" ${st(color, 2)}/></g></g>`;
}

export function palace(p, baseY, opts = {}) {
  const { lit = false, warm = "#f6c35a" } = opts;
  const win = lit ? warm : "#5a3a2a";
  const winId = (k) => (lit ? ` class="${p}-win"` : "") + (lit ? ` id="${p}-w${k}"` : "");
  let k = 0;
  const W = (x, y, w, h) => `<path${winId(k++)} d="M${x} ${y} L${x} ${y - h * 0.6} Q${x} ${y - h} ${x + w / 2} ${y - h} Q${x + w} ${y - h} ${x + w} ${y - h * 0.6} L${x + w} ${y} Z" fill="${win}" stroke="${C.ink}" stroke-width="2"/>`;
  const out = [];
  // far city
  out.push(`<path d="M0 ${baseY - 120} L120 ${baseY - 120} L120 ${baseY - 170} L200 ${baseY - 170} L200 ${baseY - 130} L330 ${baseY - 130} L330 ${baseY - 200} L400 ${baseY - 200} L400 ${baseY - 120} L1560 ${baseY - 120} L1560 ${baseY - 190} L1640 ${baseY - 190} L1640 ${baseY - 140} L1780 ${baseY - 140} L1780 ${baseY - 180} L1920 ${baseY - 180} L1920 ${baseY} L0 ${baseY} Z" fill="${C.sandD}" opacity="0.7"/>`);
  // side towers (shikhara)
  for (const [x, h] of [[300, 300], [1620, 300]]) {
    out.push(`<path d="M${x - 70} ${baseY} L${x - 70} ${baseY - h * 0.55} Q${x - 60} ${baseY - h} ${x} ${baseY - h * 1.1} Q${x + 60} ${baseY - h} ${x + 70} ${baseY - h * 0.55} L${x + 70} ${baseY} Z" ${st(C.sand)}/>`);
    out.push(`<path d="M${x - 50} ${baseY - h * 0.6} Q${x} ${baseY - h * 0.66} ${x + 50} ${baseY - h * 0.6} M${x - 40} ${baseY - h * 0.8} Q${x} ${baseY - h * 0.86} ${x + 40} ${baseY - h * 0.8}" stroke="${C.ink}" stroke-width="2" fill="none" opacity="0.5"/>`);
    out.push(W(x - 18, baseY - 60, 36, 70));
  }
  // main palace body
  out.push(`<rect x="560" y="${baseY - 260}" width="800" height="260" ${st(C.sand)}/>`);
  out.push(`<rect x="540" y="${baseY - 280}" width="840" height="26" ${st(C.sandD)}/>`);
  for (let i = 0; i < 6; i++) out.push(W(610 + i * 120, baseY - 60, 60, 120));
  for (let i = 0; i < 9; i++) out.push(W(600 + i * 84, baseY - 180, 34, 60));
  // domes
  out.push(dome(960, baseY - 280, 300, 230));
  out.push(dome(700, baseY - 280, 130, 120));
  out.push(dome(1220, baseY - 280, 130, 120));
  out.push(`<rect x="430" y="${baseY - 200}" width="130" height="200" ${st(C.sand)}/><rect x="1360" y="${baseY - 200}" width="130" height="200" ${st(C.sand)}/>`);
  out.push(dome(495, baseY - 200, 100, 90));
  out.push(dome(1425, baseY - 200, 100, 90));
  out.push(W(475, baseY - 40, 40, 80), W(1405, baseY - 40, 40, 80));
  // gate
  out.push(`<path d="M900 ${baseY} L900 ${baseY - 90} Q960 ${baseY - 150} 1020 ${baseY - 90} L1020 ${baseY} Z" fill="#4a2a1a" stroke="${C.ink}" stroke-width="3"/>`);
  // wall with crenellations
  out.push(`<rect x="0" y="${baseY - 40}" width="1920" height="${1080 - baseY + 40}" ${st(C.sandD)}/>`);
  for (let x = 0; x < 1920; x += 48) out.push(`<rect x="${x + 6}" y="${baseY - 62}" width="30" height="24" ${st(C.sandD, 2)}/>`);
  // flags
  out.push(flag(`${p}-f1`, 960, baseY - 538, C.saffron), flag(`${p}-f2`, 700, baseY - 428, C.verm), flag(`${p}-f3`, 1220, baseY - 428, C.verm));
  out.push(flag(`${p}-f4`, 300, baseY - 330, C.saffron), flag(`${p}-f5`, 1620, baseY - 330, C.saffron));
  return out.join("\n");
}

export function hall(p, opts = {}) {
  const { wall = C.maroon, floor = "#b9853f" } = opts;
  const out = [`<rect x="0" y="0" width="1920" height="1080" fill="${wall}"/>`];
  // cusped arches on the back wall
  for (let i = 0; i < 5; i++) {
    const x = 120 + i * 380, w = 260, top = 170, base = 760;
    out.push(`<path d="M${x} ${base} L${x} ${top + 160} Q${x} ${top + 40} ${x + w / 2} ${top} Q${x + w} ${top + 40} ${x + w} ${top + 160} L${x + w} ${base} Z" fill="#4a0f0d" stroke="${C.gold}" stroke-width="6"/>`);
    out.push(`<path d="M${x + 30} ${top + 150} Q${x + w / 2} ${top + 60} ${x + w - 30} ${top + 150}" stroke="${C.gold}" stroke-width="3" fill="none" opacity="0.6"/>`);
  }
  for (let i = 0; i < 6; i++) {
    const x = 70 + i * 380;
    out.push(`<rect x="${x}" y="120" width="44" height="660" ${st("#d9a441")}/><rect x="${x - 10}" y="110" width="64" height="24" ${st(C.goldL, 2)}/><rect x="${x - 10}" y="760" width="64" height="24" ${st(C.goldL, 2)}/>`);
  }
  // top border / garland
  out.push(`<rect x="0" y="0" width="1920" height="110" fill="#3d0b09"/>`);
  for (let x = 0; x < 1920; x += 64) out.push(`<path d="M${x} 110 Q${x + 32} 150 ${x + 64} 110" stroke="${C.saffron}" stroke-width="10" fill="none"/><circle cx="${x + 32}" cy="146" r="7" fill="${C.verm}"/>`);
  // floor
  out.push(`<rect x="0" y="780" width="1920" height="300" fill="${floor}"/>`);
  for (let x = -200; x < 2100; x += 120) out.push(`<path d="M${x} 780 L${x + 160} 1080" stroke="#8d6129" stroke-width="3" opacity="0.6"/>`);
  out.push(`<path d="M0 860 L1920 860 M0 960 L1920 960" stroke="#8d6129" stroke-width="3" opacity="0.5"/>`);
  out.push(`<rect x="0" y="776" width="1920" height="10" fill="${C.gold}"/>`);
  return out.join("\n");
}

export function throne(cx, floorY, s = 1) {
  return `<g transform="translate(${cx},${floorY}) scale(${s})">
    <path d="M-150 0 L-150 -380 Q-150 -470 0 -500 Q150 -470 150 -380 L150 0 Z" ${st(C.gold, 4)}/>
    <path d="M-110 -40 L-110 -360 Q-110 -430 0 -450 Q110 -430 110 -360 L110 -40 Z" ${st(C.verm, 3)}/>
    <circle cx="0" cy="-380" r="34" ${st(C.goldL, 3)}/><circle cx="0" cy="-380" r="14" fill="${C.verm}"/>
    <rect x="-180" y="-110" width="360" height="110" rx="10" ${st("#c48a2a", 4)}/>
    <circle cx="-180" cy="-110" r="22" ${st(C.goldL, 3)}/><circle cx="180" cy="-110" r="22" ${st(C.goldL, 3)}/>
  </g>`;
}

export function chhatra(cx, y, s = 1) {
  return `<g transform="translate(${cx},${y}) scale(${s})">
    <path d="M0 0 L0 120" stroke="${C.ink}" stroke-width="6"/>
    <path d="M-150 30 Q0 -70 150 30 Z" ${st("#f3e3c3", 4)}/>
    <path d="M-150 30 Q-120 54 -90 30 Q-60 54 -30 30 Q0 54 30 30 Q60 54 90 30 Q120 54 150 30" ${st(C.gold, 3)}/>
    <circle cx="0" cy="-42" r="9" ${st(C.gold, 2)}/>
  </g>`;
}

export function tree(x, y, s = 1, c1 = C.leaf, c2 = C.leafD, trunk = "#6b4423") {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M-18 0 L-12 -170 L12 -170 L18 0 Z" ${st(trunk)}/>
    <circle cx="0" cy="-230" r="95" ${st(c2)}/>
    <circle cx="-70" cy="-180" r="65" ${st(c2)}/><circle cx="70" cy="-180" r="65" ${st(c2)}/>
    <circle cx="-30" cy="-250" r="55" fill="${c1}"/><circle cx="40" cy="-210" r="45" fill="${c1}"/><circle cx="-60" cy="-180" r="34" fill="${c1}"/>
    ${[[-40, -270], [10, -300], [50, -240], [-80, -200], [70, -170], [-10, -200]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="6" fill="${C.cream}" opacity="0.35"/>`).join("")}
  </g>`;
}

export function hut(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-130" y="-170" width="260" height="170" ${st("#c08a54")}/>
    <path d="M-40 0 L-40 -110 Q0 -150 40 -110 L40 0 Z" fill="#4a2a1a" stroke="${C.ink}" stroke-width="3"/>
    <path d="M-180 -150 L0 -320 L180 -150 Z" ${st("#d8b25e")}/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${-150 + i * 37} -160 L0 -310" stroke="#9a7a33" stroke-width="2"/>`).join("")}
  </g>`;
}

export function kund(cx, floorY) {
  return `<g transform="translate(${cx},${floorY})">
    <path d="M-200 0 L-170 -70 L170 -70 L200 0 Z" ${st("#a5462d")}/>
    <path d="M-170 -70 L-145 -120 L145 -120 L170 -70 Z" ${st("#c25a39")}/>
    ${[-120, -40, 40, 120].map((x) => `<path d="M${x} -70 L${x} -2" stroke="${C.ink}" stroke-width="2" opacity="0.5"/>`).join("")}
    <path d="M-180 -36 L180 -36 M-158 -96 L158 -96" stroke="${C.ink}" stroke-width="2" opacity="0.5"/>
  </g>`;
}

const FLAME = "M0 0 Q-44 -8 -34 -70 Q-24 -112 0 -176 Q24 -112 34 -70 Q44 -8 0 0 Z";
export function flames(p, cx, baseY, s = 1) {
  const layers = [
    [0, 1.0, "#c2361f", 1.0],
    [-60, 0.7, "#e8662b", 0.9],
    [60, 0.75, "#e8662b", 0.85],
    [0, 0.72, "#f39a2b", 1.0],
    [-20, 0.42, "#f8d14a", 1.0],
    [24, 0.4, "#f8d14a", 1.0],
    [0, 0.32, "#fff3c4", 1.0],
  ];
  return `<g transform="translate(${cx},${baseY}) scale(${s})"><g id="${p}-fire" transform="${T(0, 0, 0, 1)}">
    ${layers.map(([dx, sc, col, sy], i) => `<g transform="translate(${dx},0)"><g id="${p}-fl${i}" transform="scale(${sc},${r1(sc * sy)})"><path d="${FLAME}" fill="${col}"/></g></g>`).join("")}
  </g></g>`;
}

export function diya(id, x, y, s, gid) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle id="${id}-g" cx="0" cy="-26" r="34" fill="url(#${gid})" style="opacity:0"/>
    <path d="M-24 -6 Q0 16 24 -6 L18 -14 L-18 -14 Z" ${st("#a8552c", 2)}/>
    <g id="${id}" style="opacity:0"><path d="M0 -14 Q-7 -22 0 -40 Q7 -22 0 -14 Z" fill="#ffcf4a" stroke="#e8662b" stroke-width="1.5"/></g>
  </g>`;
}

export function treasure(x, y) {
  return `<g transform="translate(${x},${y})">
    <path d="M-120 0 Q-60 -90 0 -40 Q50 -100 120 0 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/>
    ${[[-70, -30], [-30, -50], [20, -40], [60, -20], [-10, -20], [90, -10], [-90, -10]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" ${st(C.gold, 2)}/>`).join("")}
    <rect x="-200" y="-90" width="90" height="90" ${st("#7a4a22")}/><path d="M-200 -60 L-110 -60" stroke="${C.gold}" stroke-width="6"/>
    <circle cx="-30" cy="-70" r="10" fill="${C.verm}"/><circle cx="40" cy="-60" r="8" fill="${C.teal}"/>
  </g>`;
}

export function soldiers(x, y, n, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">${Array.from({ length: n }, (_, i) => {
    const sx = i * 60 + (i % 2) * 14, sy = (i % 2) * 22;
    return `<g transform="translate(${sx},${sy})">
      <path d="M-18 0 L-14 -80 L14 -80 L18 0 Z" ${st("#7a2a1a", 2)}/>
      <circle cx="0" cy="-98" r="18" ${st(SKIN.tan, 2)}/>
      <path d="M-18 -104 Q0 -130 18 -104 Z" ${st(C.gold, 2)}/>
      <path d="M26 20 L26 -170" stroke="#5a3a1a" stroke-width="5"/><path d="M18 -168 L26 -196 L34 -168 Z" ${st("#cfd3d6", 2)}/>
      <ellipse cx="-22" cy="-50" rx="16" ry="26" ${st(C.gold, 2)}/>
    </g>`;
  }).join("")}</g>`;
}

export function target(id, x, y) {
  return `<g transform="translate(${x},${y})">
    ${tree(0, 120, 1.2)}
    <g id="${id}" transform="${T(0, 0)}">
      <circle r="64" ${st(C.cream)}/><circle r="46" ${st(C.verm, 2)}/><circle r="28" ${st(C.cream, 2)}/><circle r="12" fill="${C.verm}" stroke="${C.ink}" stroke-width="2"/>
    </g></g>`;
}

export function birds(id, x, y, n = 5) {
  return `<g id="${id}" transform="${T(x, y)}">${Array.from({ length: n }, (_, i) => `<path d="M${i * 46} ${(i % 2) * 22 + Math.floor(i / 2) * 8} q12 -12 22 0 q10 -12 22 0" stroke="${C.ink}" stroke-width="3.5" fill="none"/>`).join("")}</g>`;
}

export function demonsVision(p) {
  const dm = (x, s) => `<g transform="translate(${x},0) scale(${s})">
    <path d="M-30 0 L-24 -90 L24 -90 L30 0 Z" fill="#1a0a1c"/>
    <circle cx="0" cy="-112" r="26" fill="#1a0a1c"/>
    <path d="M-18 -128 L-30 -162 L-6 -134 Z M18 -128 L30 -162 L6 -134 Z" fill="#1a0a1c"/>
    <circle cx="-8" cy="-114" r="4" fill="#ff4a2a"/><circle cx="8" cy="-114" r="4" fill="#ff4a2a"/>
    <path d="M-24 -80 L-70 -130 M24 -80 L70 -120" stroke="#1a0a1c" stroke-width="16" stroke-linecap="round"/>
  </g>`;
  return `<circle r="220" fill="#3a1830" stroke="${C.gold}" stroke-width="6"/>
    <circle r="205" fill="url(#${p}-visionG)"/>
    <g transform="translate(0,120)">
      <path d="M-70 0 L-50 -40 L50 -40 L70 0 Z" fill="#6a2a1d"/>
      <g transform="translate(-20,-40) rotate(-30)"><path d="M0 0 Q-20 -40 0 -70 Q20 -40 0 0 Z" fill="#c2361f" opacity="0.8"/></g>
      ${dm(-120, 0.9)}${dm(120, 1.0)}
    </g>`;
}

// ================= Part 2 additions =================
Object.assign(CAST, {
  sita: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, female: true, lower: "#b3122a", upper: "#7a0d1e", border: C.goldL, hat: "queen", ...extra }),
  bride: (id, x, y, s, saree, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, female: true, lower: saree, upper: C.maroon, border: C.goldL, hat: "queen", ...extra }),
  janaka: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.king, lower: "#f3e9d2", upper: "#2f4a8a", sash: C.gold, hat: "royal", beard: "sage", hair: "#d9d4c7", ...extra }),
  ahalya: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, female: true, lower: "#f3efe6", upper: "#c9a86a", border: C.gold, ...extra }),
  suitor: (id, x, y, s, robe, extra = {}) => person({ id, x, y, s, skin: SKIN.tan, lower: "#f3e3c3", upper: robe, hat: "royal", hair: "#1b1209", ...extra }),
  bharat: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.tan, lower: C.leaf, sash: C.yellow, hat: "prince", tilak: true, longHair: true, ...extra }),
  shatrughna: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, lower: C.verm, sash: C.teal, hat: "prince", tilak: true, longHair: true, ...extra }),
  demon: (id, x, y, s, skin, extra = {}) => person({ id, x, y, s, skin, lower: "#2a1a2e", border: "#8a1b1b", sash: null, hat: "wild", hair: "#140a14", brows: "fierce", fangs: true, claws: true, mood: "sad", ...extra }),
  messenger: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: SKIN.tan, lower: "#f3e3c3", upper: C.verm, sash: C.gold, hair: "#1b1209", ...extra }),
});

// Shiva's bow. Local frame: string at x=0, tips at (0,±380), grip at (90,0).
// Halves pivot at the grip (ids -top/-bot, rotate); string path id -str.
export const BOW_STR = "M0 -380 L0 0 L0 380";
export function shivaBow(p, x, y, r = 0, s = 0.8) {
  const half = (d) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="22" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#2c3550" stroke-width="15" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#5a6a9a" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`;
  return `<g id="${p}" transform="${T(x, y, r, s)}">
    <path id="${p}-str" d="${BOW_STR}" fill="none" stroke="#f3ead2" stroke-width="4"/>
    <g transform="translate(90,0)">
      <g id="${p}-top" transform="rotate(0)">${half("M-90 -380 Q30 -200 0 0")}
        <path d="M-6 -150 L22 -150 M-30 -270 L-4 -264" stroke="${C.gold}" stroke-width="7"/><circle cx="-90" cy="-380" r="12" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/></g>
      <g id="${p}-bot" transform="rotate(0)">${half("M0 0 Q30 200 -90 380")}
        <path d="M-6 150 L22 150 M-30 270 L-4 264" stroke="${C.gold}" stroke-width="7"/><circle cx="-90" cy="380" r="12" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/></g>
      <rect x="-14" y="-34" width="30" height="68" rx="8" fill="${C.verm}" stroke="${C.ink}" stroke-width="3"/>
      <path d="M-14 -18 L16 -18 M-14 18 L16 18" stroke="${C.gold}" stroke-width="5"/>
    </g>
  </g>`;
}

// iron chest on eight wheels (four visible); lid id -lid rotates open about its back hinge
export function ironChest(p, x, y, s = 1) {
  const wheel = (wx) => `<g transform="translate(${wx},0)"><circle r="46" fill="#5a3a1a" stroke="${C.ink}" stroke-width="4"/>
      ${[0, 45, 90, 135].map((a) => `<path d="M-40 0 L40 0" stroke="${C.ink}" stroke-width="5" transform="rotate(${a})"/>`).join("")}<circle r="10" fill="${C.gold}"/></g>`;
  return `<g id="${p}" transform="${T(x, y, 0, s)}">
    <rect x="-330" y="-190" width="660" height="160" rx="10" fill="#3e4250" stroke="${C.ink}" stroke-width="4"/>
    ${[-260, -130, 0, 130, 260].map((bx) => `<rect x="${bx - 12}" y="-190" width="24" height="160" fill="${C.gold}" stroke="${C.ink}" stroke-width="2"/>`).join("")}
    <circle cx="0" cy="-110" r="26" fill="${C.verm}" stroke="${C.ink}" stroke-width="3"/>
    <g transform="translate(-340,-190)"><g id="${p}-lid" transform="rotate(0)"><path d="M0 0 L680 0 L660 -46 L20 -46 Z" fill="#4a4e5e" stroke="${C.ink}" stroke-width="4"/><path d="M80 -24 L600 -24" stroke="${C.gold}" stroke-width="6"/></g></g>
    <g id="${p}-wheels">${[-250, -90, 90, 250].map((wx) => wheel(wx)).join("")}</g>
  </g>`;
}

// a man pulling a rope, leaning forward (to the right)
export function puller(id, x, y, s = 1) {
  return `<g id="${id}" transform="${T(x, y, 0, s)}"><g id="${id}-b" transform="${T(0, 0, 14)}">
    <g id="${id}-fl" transform="${T(-14, -6)}"><ellipse rx="14" ry="7" fill="${SKIN.tan}" stroke="${C.ink}" stroke-width="2"/></g>
    <g id="${id}-fr" transform="${T(14, -6)}"><ellipse rx="14" ry="7" fill="${SKIN.tan}" stroke="${C.ink}" stroke-width="2"/></g>
    <path d="M-24 -100 L24 -100 L30 -12 L-30 -12 Z" fill="#f3e3c3" stroke="${C.ink}" stroke-width="2.5"/>
    <path d="M-28 -170 L28 -170 L24 -100 L-24 -100 Z" fill="${SKIN.tan}" stroke="${C.ink}" stroke-width="2.5"/>
    <path d="M-20 -164 L20 -104" stroke="${C.verm}" stroke-width="8"/>
    <circle cx="0" cy="-196" r="24" fill="${SKIN.tan}" stroke="${C.ink}" stroke-width="2.5"/>
    <path d="M-24 -204 Q0 -232 24 -204 Z" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/>
    <path d="M-20 -160 L-60 -120" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/><path d="M-20 -160 L-60 -120" stroke="${SKIN.tan}" stroke-width="11" stroke-linecap="round"/>
  </g></g>`;
}

export function garland(id, x, y, s = 1, hidden = false) {
  const dots = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12, gx = -56 + 112 * t, gy = 4 * 120 * t * (1 - t);
    return `<circle cx="${r1(gx)}" cy="${r1(gy)}" r="10" fill="${i % 2 ? C.saffron : C.yellow}" stroke="${C.ink}" stroke-width="1.5"/>`;
  }).join("");
  return `<g id="${id}" transform="${T(x, y, 0, s)}"${hidden ? ` style="opacity:0"` : ""}>${dots}<circle cx="0" cy="128" r="9" fill="${C.verm}" stroke="${C.ink}" stroke-width="1.5"/></g>`;
}

// divine weapon icons, drawn around (0,0), ~80px
export const WEAPONS = [
  `<circle r="34" fill="none" stroke="${C.goldL}" stroke-width="8"/>${[0, 45, 90, 135].map((a) => `<path d="M-34 0 L34 0" stroke="${C.goldL}" stroke-width="4" transform="rotate(${a})"/>`).join("")}${Array.from({ length: 12 }, (_, i) => `<path d="M0 -34 L5 -46 L-5 -46 Z" fill="${C.goldL}" transform="rotate(${i * 30})"/>`).join("")}`,
  `<path d="M0 50 L0 -30 M-26 -10 Q-26 -40 -18 -54 M26 -10 Q26 -40 18 -54 M-26 -10 L26 -10 M0 -30 L0 -58" stroke="${C.goldL}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  `<path d="M0 54 L0 -10" stroke="${C.goldL}" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="-26" r="24" fill="${C.goldL}"/>${[0, 60, 120].map((a) => `<path d="M-30 0 L30 0" stroke="#fff6d8" stroke-width="3" transform="translate(0,-26) rotate(${a})"/>`).join("")}`,
  `<path d="M0 54 L0 -40" stroke="${C.goldL}" stroke-width="6"/><path d="M-12 -34 L0 -62 L12 -34 Z" fill="#fff6d8"/><path d="M-10 54 L0 40 L10 54" stroke="${C.goldL}" stroke-width="5" fill="none"/>`,
  `<path d="M-14 -50 L14 -50 L4 -14 L22 -14 L-12 54 L-2 6 L-20 6 Z" fill="${C.goldL}"/>`,
  `<path d="M-40 40 L40 -40" stroke="${C.goldL}" stroke-width="7" stroke-linecap="round"/><path d="M30 -50 L50 -50 L50 -30 Z" fill="#fff6d8"/><path d="M-50 30 L-34 50" stroke="${C.goldL}" stroke-width="5"/>`,
];

// ================= Hindi reels additions =================
// a simple extra head (Ravana's ten heads, Brahma's side faces), drawn around its own centre
export function miniHead(skin, opts = {}) {
  const { crownC = C.gold, mustache = false, beard = false, fierce = false } = opts;
  const brows = fierce
    ? `<path d="M-24 -18 L-6 -10 M6 -10 L24 -18" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`
    : `<path d="M-22 -16 Q-13 -22 -5 -16 M5 -16 Q13 -22 22 -16" stroke="${C.ink}" stroke-width="3" fill="none"/>`;
  return `<g>
    <ellipse cx="0" cy="0" rx="30" ry="35" fill="${skin}" stroke="${C.ink}" stroke-width="3"/>
    <path d="M-30 -14 Q0 -46 30 -14 L30 -26 Q0 -52 -30 -26 Z" fill="#1b1209"/>
    <path d="M-22 -4 Q-13 -11 -5 -4 Q-13 2 -22 -4 Z M5 -4 Q13 -11 22 -4 Q13 2 5 -4 Z" fill="#fff" stroke="${C.ink}" stroke-width="2"/>
    <circle cx="-13" cy="-4" r="3.5" fill="${C.ink}"/><circle cx="13" cy="-4" r="3.5" fill="${C.ink}"/>
    ${brows}
    ${mustache ? `<path d="M0 14 Q-14 8 -24 18 Q-16 12 0 18 Z M0 14 Q14 8 24 18 Q16 12 0 18 Z" fill="#1b1209"/>` : `<path d="M-8 18 Q0 23 8 18" stroke="${C.ink}" stroke-width="2.5" fill="none"/>`}
    ${beard ? `<path d="M-28 6 Q-24 46 0 56 Q24 46 28 6 Q12 18 0 16 Q-12 18 -28 6 Z" fill="#f2efe6" stroke="${C.ink}" stroke-width="2.5"/>` : ""}
    <g transform="translate(0,-32) scale(0.8)"><path d="M-31 2 L-35 -38 L-19 -24 L0 -58 L19 -24 L35 -38 L31 2 Z" fill="${crownC}" stroke="${C.ink}" stroke-width="3"/><circle cx="0" cy="-22" r="6" fill="${C.verm}"/></g>
  </g>`;
}

function addToHead(svg, id, behind) {
  const key = `<g id="${id}-h" transform="rotate(0)">`;
  return svg.replace(key, key + behind);
}

Object.assign(CAST, {
  ravana: (id, x, y, s, extra = {}) => {
    const svg = person({ id, x, y, s, skin: "#c08050", lower: "#2a0a1e", upper: "#7a1020", sash: C.gold, hat: "royal", brows: "fierce", hair: "#140a0a", ...extra });
    const heads = [-4, -3, -2, -1, 1, 2, 3, 4, 5]
      .map((k) => `<g transform="translate(${k * 50},${-48 + Math.abs(k) * 3}) scale(0.78)">${miniHead("#c08050", { mustache: true, fierce: true })}</g>`)
      .join("");
    const moustache = `<path d="M0 -27 Q-18 -38 -30 -24 Q-22 -33 0 -23 Z M0 -27 Q18 -38 30 -24 Q22 -33 0 -23 Z" fill="#140a0a" stroke="${C.ink}" stroke-width="1.5"/>`;
    return addToHead(svg, id, heads).replace(`<path id="${id}-m2"`, `${moustache}<path id="${id}-m2"`);
  },
  brahma: (id, x, y, s, extra = {}) => {
    const svg = person({ id, x, y, s, skin: "#e8a070", lower: "#f7e6c4", robe: "#f0b62a", hat: "royal", beard: "sage", hair: "#e8e4da", seated: true, ...extra });
    const faces = [-1, 1].map((k) => `<g transform="translate(${k * 44},-46) scale(0.82)">${miniHead("#e8a070", { beard: true })}</g>`).join("");
    return addToHead(svg, id, faces);
  },
  vishnu: (id, x, y, s, extra = {}) => {
    const skin = "#3f74b8";
    const L = extra.seated ? 80 : 0;
    const svg = person({ id, x, y, s, skin, lower: C.yellow, sash: C.verm, hat: "royal", tilak: true, longHair: true, aL: 20, aR: -60, ...extra });
    const chakra = `<g transform="translate(2,150)"><g id="${id}-chk" transform="rotate(0)"><circle r="30" fill="${C.goldL}" stroke="${C.ink}" stroke-width="3"/><circle r="14" fill="${C.gold}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 -30 L5 -42 L-5 -42 Z" fill="${C.goldL}" stroke="${C.ink}" stroke-width="1.5" transform="rotate(${i * 45})"/>`).join("")}</g></g>`;
    const conch = `<g transform="translate(2,150) rotate(180)"><path d="M-26 6 Q-18 -22 10 -20 Q34 -16 30 6 Q26 22 4 22 Z" fill="#fbf1e2" stroke="${C.ink}" stroke-width="3"/><path d="M10 -20 Q22 -6 12 10" stroke="#e7b3a0" stroke-width="5" fill="none"/></g>`;
    const upper = arm(`${id}-al2`, -1, 150, skin, null, conch, L) + arm(`${id}-ar2`, 1, -150, skin, null, chakra, L);
    return svg.replace(`<g id="${id}-b" transform="${T()}">`, `<g id="${id}-b" transform="${T()}">${upper}`);
  },
  deva: (id, x, y, s, robe, extra = {}) => person({ id, x, y, s, skin: SKIN.fair, lower: "#f3e3c3", upper: robe, hat: "royal", ...extra }),
  indra: (id, x, y, s, extra = {}) => person({ id, x, y, s, skin: "#f0c08a", lower: "#f3e3c3", upper: "#2f7fc1", sash: C.gold, hat: "royal", ...extra }),
});

export function lotus(x, y, s = 1) {
  const petal = (r, c, sc) => `<path d="M0 0 Q-34 -40 0 -110 Q34 -40 0 0 Z" fill="${c}" stroke="#b0476a" stroke-width="2.5" transform="rotate(${r}) scale(${sc})"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="6" rx="190" ry="34" fill="#3f7a3a" stroke="${C.ink}" stroke-width="3"/>
    ${[-80, -56, 56, 80].map((r) => petal(r, "#f29bb0", 1.25)).join("")}
    ${[-34, -14, 14, 34].map((r) => petal(r, "#f7b7c6", 1.15)).join("")}
    ${petal(0, "#fcd3dc", 1.05)}
  </g>`;
}

// Sheshnag: coils to sit on, and a five-hooded canopy drawn behind the sitter
export function sheshCoils(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    ${[[0, 0, 260, 56], [0, -44, 220, 48], [0, -84, 180, 42]].map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2f8a7a" stroke="${C.ink}" stroke-width="4"/><path d="M${-rx * 0.8} ${cy + 6} Q0 ${cy + ry * 0.9} ${rx * 0.8} ${cy + 6}" stroke="#f3e3a0" stroke-width="8" fill="none" opacity="0.7"/>`).join("")}
  </g>`;
}
export function sheshHoods(x, y, s = 1) {
  const hood = (dx, r) => `<g transform="translate(${dx},0) rotate(${r})">
      <path d="M0 220 L0 40" stroke="#2f8a7a" stroke-width="40"/>
      <path d="M0 -60 Q-52 -40 -46 30 Q-30 70 0 76 Q30 70 46 30 Q52 -40 0 -60 Z" fill="#2f8a7a" stroke="${C.ink}" stroke-width="3"/>
      <path d="M0 -36 Q-26 -20 -22 24 Q0 40 22 24 Q26 -20 0 -36 Z" fill="#f3e3a0" opacity="0.85"/>
      <circle cx="-12" cy="-30" r="5" fill="#fff"/><circle cx="12" cy="-30" r="5" fill="#fff"/><circle cx="-12" cy="-30" r="2.5" fill="${C.ink}"/><circle cx="12" cy="-30" r="2.5" fill="${C.ink}"/>
    </g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${[[-150, -26], [-76, -12], [76, 12], [150, 26], [0, 0]].map(([dx, r]) => hood(dx, r)).join("")}</g>`;
}

export function milkOcean(p, y, w = 1080, h = 1920) {
  let s = `<rect x="0" y="${y}" width="${w}" height="${h - y}" fill="#dfeaf2"/>`;
  for (let i = 0; i < 5; i++) {
    const yy = y + 30 + i * 70;
    s += `<g id="${p}-wv${i}" transform="${T()}"><path d="M-200 ${yy} ${Array.from({ length: 18 }, () => "q40 -26 80 0").join(" ")}" stroke="#ffffff" stroke-width="8" fill="none" opacity="${(0.9 - i * 0.12).toFixed(2)}"/></g>`;
  }
  return s;
}

export function cloud(x, y, s = 1, c = "#ffffff", o = 0.9) {
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><ellipse cx="0" cy="0" rx="150" ry="48" fill="${c}"/><circle cx="-60" cy="-26" r="52" fill="${c}"/><circle cx="20" cy="-44" r="66" fill="${c}"/><circle cx="90" cy="-14" r="44" fill="${c}"/></g>`;
}

export function rays(id, x, y, r = 900, n = 18, color = "#ffe08a", op = 0.35) {
  const parts = Array.from({ length: n }, (_, i) => {
    const a0 = ((i * 2) / (n * 2)) * Math.PI * 2, a1 = ((i * 2 + 1) / (n * 2)) * Math.PI * 2;
    return `<path d="M0 0 L${Math.round(Math.cos(a0) * r)} ${Math.round(Math.sin(a0) * r)} L${Math.round(Math.cos(a1) * r)} ${Math.round(Math.sin(a1) * r)} Z" fill="${color}"/>`;
  }).join("");
  return `<g transform="translate(${x},${y})" opacity="${op}"><g id="${id}" transform="rotate(0)">${parts}</g></g>`;
}

// golden Lanka skyline
export function lanka(baseY, w = 1080) {
  const out = [];
  const towers = [[80, 220, 90], [220, 330, 110], [380, 260, 90], [540, 420, 130], [700, 300, 100], [860, 360, 110], [1000, 240, 90]];
  for (const [x, h, wd] of towers) {
    out.push(`<path d="M${x - wd / 2} ${baseY} L${x - wd / 2} ${baseY - h * 0.6} Q${x - wd / 2} ${baseY - h} ${x} ${baseY - h - 40} Q${x + wd / 2} ${baseY - h} ${x + wd / 2} ${baseY - h * 0.6} L${x + wd / 2} ${baseY} Z" fill="#e2a72e" stroke="#7a4a12" stroke-width="3"/>`);
    out.push(`<path d="M${x} ${baseY - h - 40} L${x} ${baseY - h - 80}" stroke="#7a4a12" stroke-width="3"/><circle cx="${x}" cy="${baseY - h - 84}" r="6" fill="${C.goldL}"/>`);
    for (let k = 0; k < 3; k++) out.push(`<path d="M${x - 14} ${baseY - 30 - k * 70} L${x - 14} ${baseY - 56 - k * 70} Q${x} ${baseY - 74 - k * 70} ${x + 14} ${baseY - 56 - k * 70} L${x + 14} ${baseY - 30 - k * 70} Z" fill="#7a3a12"/>`);
  }
  out.push(`<rect x="0" y="${baseY - 10}" width="${w}" height="60" fill="#c98a2a" stroke="#7a4a12" stroke-width="3"/>`);
  return out.join("");
}
