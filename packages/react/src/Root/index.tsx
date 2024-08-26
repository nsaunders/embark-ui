import type { CSSProperties } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { accents, colorValues, grays } from "@/colors/index.js";

const polyForwardRef = forwardRef as PolyRefFunction;

export const rootAccentOptions = accents;
export const rootAccentDefault =
  "blue" satisfies (typeof rootAccentOptions)[number];

export const rootGrayOptions = grays;
export const rootGrayDefault =
  "slate" satisfies (typeof rootGrayOptions)[number];

export const rootRadiusOptions = ["none", "medium"] as const;
export const rootRadiusDefault =
  "medium" satisfies (typeof rootRadiusOptions)[number];

interface RootProps {
  accent?: (typeof rootAccentOptions)[number];
  gray?: (typeof rootGrayOptions)[number];
  radius?: (typeof rootRadiusOptions)[number];
  style?: CSSProperties;
}

export const rootAsOptions = ["body", "div"] as const;
export const rootAsDefault = "div" satisfies (typeof rootAsOptions)[number];

const Root = polyForwardRef<
  typeof rootAsDefault,
  RootProps,
  (typeof rootAsOptions)[number]
>(function (
  {
    as: Component = rootAsDefault,
    accent = rootAccentDefault,
    gray = rootGrayDefault,
    radius = rootRadiusDefault,
    style,
    ...restProps
  },
  ref,
) {
  return (
    <Component
      {...restProps}
      style={
        {
          ...style,
          ...Object.fromEntries(
            Object.entries(colorValues).map(([name, [a, b]]) => [
              `--${name}`,
              `${a} ${b}`,
            ]),
          ),
          "--accent": `var(--${accent})`,
          "--gray": `var(--${gray})`,
          "--radius": { none: 0, medium: 4 }[radius],
        } as CSSProperties
      }
      ref={ref}
    />
  );
});

Root.displayName = "Root";

export default Root;
