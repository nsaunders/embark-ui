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

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

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
        ref={setContainer}
        width="100dvw"
        height="100dvh"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)">
        {["light", "dark"].map(theme => (
          <Box data-theme={theme} key={theme} display="contents">
            <Box
              as={Root}
              overflow="auto"
              accent={accent}
              gray={gray}
              radius={radius}
              backgroundColor={Colors.gray(98)}
              color={Colors.gray(10)}
              dark:backgroundColor={Colors.gray(10)}
              dark:color={Colors.gray(98)}>
              {children}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
