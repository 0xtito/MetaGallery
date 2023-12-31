import { PlaneTypes, Pointers, ButtonsType, nft } from "@/utils/types";

export const METAGALLERY_ADDRESS = "0xD7a1f5de17ebcC376889128a5d6C7696508f0A69";

export const DEFAULT_PLANE_STRUCTURE: Record<PlaneTypes, XRPlane[]> = {
  desk: [],
  couch: [],
  floor: [],
  ceiling: [],
  wall: [],
  door: [],
  window: [],
  table: [],
  other: [],
};

export const DEFAULT_MESH_STRUCTURE: Record<PlaneTypes, XRMesh[]> = {
  desk: [],
  couch: [],
  floor: [],
  ceiling: [],
  wall: [],
  door: [],
  window: [],
  table: [],
  other: [],
};

export const initialPointerState: Pointers = {
  left: {
    z: 0,
    state: "NOT_SET",
    heldObject: null,
  },
  right: {
    z: 0,
    state: "NOT_SET",
    heldObject: null,
  },
};

export const BUTTONS_TO_CHECK: ButtonsType[] = [
  "a-button",
  "b-button",
  "x-button",
  "y-button",
];

export const DEMO_NFT_URL =
  "https://dl.openseauserdata.com/cache/originImage/files/feb1cb3253570179744438bb08eb569c.jpg";

export const three_colors = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};

// https://i.seadn.io/gcs/files/feb1cb3253570179744438bb08eb569c.jpg?auto=format&dpr
export const DEMO_NFTS: nft[] = [
  {
    name: "Lonely Nights",
    imageUrl: "/assets/demo/lonely_nights.jpeg",
    nftId: "4325421",
    collection: "Eponym by ART AI",
  },
  {
    collection: "gwei-guzzlers",
    name: "GWEI GUZZLERS #597",
    nftId: "597",
    imageUrl:
      "https://i.seadn.io/s/raw/files/350166d11e15e80b35bf6a4cc586d69b.png?w=500&auto=format",
    price: 100000000000000000,
  },
  {
    collection: "gwei-guzzlers",
    name: "GWEI GUZZLERS #600",
    nftId: "600",
    imageUrl:
      "https://i.seadn.io/s/raw/files/7b33b43025c2f3e0f7f9a8c7cfb488a0.png?w=500&auto=format",
    price: 100000000000000000,
  },
  {
    collection: "gwei-guzzlers",
    name: "GWEI GUZZLERS #596",
    nftId: "596",
    imageUrl:
      "https://i.seadn.io/s/raw/files/07190e78c6ee5fe5eeba4b785bd449d7.png?w=500&auto=format",
    price: 100000000000000000,
  },
  {
    collection: "gwei-guzzlers",
    name: "GWEI GUZZLERS #595",
    nftId: "595",
    imageUrl:
      "https://i.seadn.io/s/raw/files/914b08cf17fa2545826ffbce60b27fb2.png?w=500&auto=format",
    price: 10000000000000000000,
  },
  {
    collection: "gwei-guzzlers",
    name: "GWEI GUZZLERS #594",
    nftId: "594",
    imageUrl:
      "https://i.seadn.io/s/raw/files/8ef09adae6fb38fa29767714b4698206.png?w=500&auto=format",
    price: 100000000000000000,
  },
  {
    collection: "robotos-genesis",
    name: "Vroomba Kittyboto",
    nftId: "14",
    imageUrl:
      "https://i.seadn.io/gae/cK9ECdn7CxZZkQVLnFpGOgK7n_cGcbz1USutKfVQUKoSvxMUVTPUrRRoVyCWO92DxQDVBo8rXboyBrrdneN7t5jLcf7ksmQR6ENmRh0?w=500&auto=format",
    price: 40000000000000000,
  },
  {
    collection: "robotos-genesis",
    name: "Kitty Camboto",
    nftId: "13",
    imageUrl:
      "https://i.seadn.io/gae/bkOwNesGyXyyNqxoFIIq5HsDYm_BGo8ec3xMIQalSxR6vlgaQjBTht_MHAUl6I9G5nCPrREy0-Llr7d-A6ZmMFe5vRqQB-_0ae_w?w=500&auto=format",
    price: 60000000000000000,
  },
  {
    collection: "robotos-genesis",
    name: "Skate Kittyboto",
    nftId: "12",
    imageUrl:
      "https://i.seadn.io/gae/eWxqtlMO8JWFQYeHef2dnIlOuvMpNfy7ZOB0yj_I4cN74dWB609_ZMknVNqCFyRqCHUqJbhev5zdeilD8DwHSf1UBlGggOdKGVGK5w?w=500&auto=format",
    price: 30000000000000000,
  },
  {
    collection: "robotos-genesis",
    name: "Wheels Kittyboto",
    nftId: "10",
    imageUrl:
      "https://i.seadn.io/gae/uU27yIQydI33Pv5A63zy0oNDr6klZADm9SXrISo9RczkwCzpalnrDW96-rZp-yO0nPcjGfq0AVyufQAn0QMJlZIzUxT0dLQCn3H_?w=500&auto=format",
    price: 80000000000000000,
  },
];
