export const colorValues = {
  red: "#e72805",
  orange: "#c14c20",
  amber: "#af6805",
  yellow: "#907e00",
  lime: "#848500",
  green: "#1a9d01",
  emerald: "#09a44f",
  teal: "#0ca5a1",
  cyan: "#00a2c4",
  sky: "#137fcf",
  blue: "#4a6deb",
  indigo: "#6c55fd",
  violet: "#8557ff",
  purple: "#a14cdf",
  fuchsia: "#a04c9b",
  pink: "#a04c9b",
  rose: "#d02863",
  slate: "#717076",
  zinc: "#757165",
  neutral: "#717171",
  stone: "#757165",
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
] as const satisfies Exclude<
  keyof typeof colorValues,
  (typeof grays)[number]
>[];

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
        const base = `color-mix(in lab,var(--${String(p)}),#${L < 55 ? "000" : "fff"} ${Math.abs(50 - L) * 2}%)`;

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
