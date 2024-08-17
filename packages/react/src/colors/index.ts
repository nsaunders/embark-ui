export const colorValues = {
  red: [0.21, 0.135],
  orange: [0.135, 0.21],
  amber: [0.036, 0.247],
  yellow: [-0.07, 0.24],
  lime: [-0.104, 0.227],
  green: [-0.189, 0.164],
  emerald: [-0.24, 0.07],
  teal: [-0.247, -0.036],
  cyan: [-0.227, -0.104],
  sky: [-0.135, -0.21],
  blue: [-0.036, -0.247],
  indigo: [0.036, -0.247],
  violet: [0.07, -0.24],
  purple: [0.135, -0.21],
  fuchsia: [0.21, -0.135],
  pink: [0.24, -0.07],
  rose: [0.247, 0.036],

  slate: [0.005, -0.01],
  zinc: [0, 0.02],
  neutral: [0, 0],
  stone: [0, 0.02],
} as const;

export const grays = [
  "slate",
  "zinc",
  "neutral",
  "stone",
] as const satisfies (keyof typeof colorValues)[];

export const accents = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const satisfies Exclude<keyof typeof colorValues, keyof typeof grays>[];

export const {
  accent,
  gray,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  slate,
  zinc,
  neutral,
  stone,
} = new Proxy(
  {},
  {
    get:
      (_, p) =>
      (lightness: number, alpha: number = 1) => {
        const L = Math.min(Math.max(0, lightness), 100);
        const base = `color-mix(in lab,oklab(55% var(--${String(p)})),#${L < 55 ? "000" : "fff"} ${Math.abs(50 - L) * 2}%)`;

        const A = Math.min(Math.max(0, alpha), 1);

        if (A !== 1) {
          return `color-mix(in srgb,${base},transparent ${(1 - A) * 100}%)`;
        }

        return base;
      },
  },
) as {
  [Color in
    | "accent"
    | "gray"
    | (typeof accents)[number]
    | (typeof grays)[number]]: (lightness: number, alpha?: number) => string;
};
