import type { CSSProperties } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { accents, colorValues, grays } from "@/colors/index.js";

const polyForwardRef = forwardRef as PolyRefFunction;

export const rootAccents = accents;
export const defaultRootAccent: (typeof rootAccents)[number] = "blue";

export const rootGrays = grays;
export const defaultRootGray: (typeof rootGrays)[number] = "slate";

export const rootRadii = ["none", "medium", "full"] as const;
export const defaultRootRadius: (typeof rootRadii)[number] = "medium";

interface RootProps {
  accent?: (typeof accents)[number];
  gray?: (typeof grays)[number];
  radius?: (typeof rootRadii)[number];
  style?: CSSProperties;
}

const defaultRootElement = "div";

const Root = polyForwardRef<
  typeof defaultRootElement,
  RootProps,
  "body" | "div"
>(function (
  {
    as: Component = defaultRootElement,
    accent = defaultRootAccent,
    gray = defaultRootGray,
    radius = defaultRootRadius,
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
          "--radius": { none: 0, medium: 4, full: 999 }[radius],
        } as CSSProperties
      }
      ref={ref}
    />
  );
});

Root.displayName = "Root";

export default Root;
