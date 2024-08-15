import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/noto-sans";
import "@fontsource-variable/roboto-mono";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useFixtureSelect } from "react-cosmos/client";

import Box, { StyleSheet } from "./Box/index.js";
import * as Colors from "./colors.js";
import { controlLabel } from "./cosmos.utils.js";
import Root from "./Root/index.js";

type ArrayIndex<
  A extends Readonly<Array<unknown>>,
  Acc = never,
> = A extends readonly [infer _, ...infer Tail]
  ? ArrayIndex<Tail, Tail["length"] | Acc>
  : Acc;

const radii = [
  "none",
  "xsmall",
  "small",
  "medium",
  "large",
  "xlarge",
  "xxlarge",
] as const;

const fonts = {
  Inter: "'Inter Variable', sans-serif",
  Montserrat: "'Montserrat Variable', sans-serif",
  "Noto Sans": "'Noto Sans Variable', sans-serif",
  "Roboto Mono": "'Roboto Mono Variable', monospace",
} as const;

export default function Decorator({ children }: { children?: ReactNode }) {
  const [gray] = useFixtureSelect(
    controlLabel({ type: "global", text: "Gray" }),
    {
      options: [...Colors.grays],
      defaultValue: "slate",
    },
  );

  const [accent] = useFixtureSelect(
    controlLabel({ type: "global", text: "Accent" }),
    {
      options: [...Colors.accents],
      defaultValue: "blue",
    },
  );

  const [fontSetting] = useFixtureSelect(
    controlLabel({ type: "global", text: "Font" }),
    {
      options: Object.keys(fonts) as (keyof typeof fonts)[],
      defaultValue: "Inter",
    },
  );

  const font = fonts[fontSetting];

  const [radiusSetting] = useFixtureSelect(
    controlLabel({ type: "global", text: "Radius" }),
    {
      options: [...radii],
      defaultValue: "medium",
    },
  );

  const radius = radii.indexOf(radiusSetting) as ArrayIndex<typeof radii>;

  const [theme] = useFixtureSelect(
    controlLabel({ type: "global", text: "Theme" }),
    {
      defaultValue: "auto",
      options: ["auto", "dark", "light"],
    },
  );

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    for (
      let current = container?.parentElement;
      current && current !== document.body;
      current = current.parentElement
    ) {
      if (current instanceof HTMLElement) {
        current.style.width = "100dvw";
        current.style.height = "100dvh";
      }
    }
  }, [container]);

  return (
    <Box fontFamily={font}>
      <StyleSheet />
      <Box
        as={Root}
        ref={setContainer}
        width="100dvw"
        height="100dvh"
        overflow="auto"
        accent={accent}
        gray={gray}
        radius={radius}
        backgroundColor={Colors.gray(98)}
        dark:backgroundColor={Colors.gray(10)}>
        {children}
      </Box>
    </Box>
  );
}
