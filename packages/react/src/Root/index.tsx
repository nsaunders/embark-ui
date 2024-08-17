import type { CSSProperties } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import type { accents, grays } from "@/colors/index.js";
import { colorValues } from "@/colors/index.js";

const polyForwardRef = forwardRef as PolyRefFunction;

interface RootProps {
  accent?: (typeof accents)[number];
  gray?: (typeof grays)[number];
  radius?: number;
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
    accent = "blue",
    gray = "slate",
    radius = 2,
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
          "--radius": radius,
        } as CSSProperties
      }
      ref={ref}
    />
  );
});

Root.displayName = "Root";

export default Root;
