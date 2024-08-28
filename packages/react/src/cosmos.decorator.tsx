import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/noto-sans";
import "@fontsource-variable/roboto-mono";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useFixtureSelect } from "react-cosmos/client";
import { z } from "zod";

import Box, { StyleSheet } from "./Box/index.js";
import * as colors from "./colors/index.js";
import { controlLabel } from "./cosmos.utils.js";
import Root, {
  rootAccentDefault,
  rootAccentOptions,
  rootGrayDefault,
  rootGrayOptions,
  rootRadiusDefault,
  rootRadiusOptions,
} from "./Root/index.js";

const fonts = ["Inter", "Montserrat", "Noto Sans", "Roboto Mono"] as const;

const fontValues: { [F in (typeof fonts)[number]]: string } = {
  Inter: "'Inter Variable', sans-serif",
  Montserrat: "'Montserrat Variable', sans-serif",
  "Noto Sans": "'Noto Sans Variable', sans-serif",
  "Roboto Mono": "'Roboto Mono Variable', monospace",
};

function usePersistentSetting<T extends string>(
  key: string,
  parser: z.ZodSchema<T>,
  [value, setValue]: [T, (t: T) => void],
): [T, (t: T) => void] {
  useEffect(() => {
    const parsed = z
      .string()
      .transform((str, ctx): unknown => {
        try {
          return JSON.parse(str);
        } catch (e) {
          ctx.addIssue({ code: "custom", message: "Invalid JSON" });
          return z.NEVER;
        }
      })
      .pipe(parser)
      .safeParse(sessionStorage.getItem(key));
    if (parsed.success) {
      setValue(parsed.data);
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

export default function Decorator({ children }: { children?: ReactNode }) {
  const [gray] = usePersistentSetting(
    "gray",
    z.enum(rootGrayOptions),
    useFixtureSelect(controlLabel({ type: "global", text: "Gray" }), {
      options: [...rootGrayOptions],
      defaultValue: rootGrayDefault,
    }),
  );

  const [accent] = usePersistentSetting(
    "accent",
    z.enum(rootAccentOptions),
    useFixtureSelect(controlLabel({ type: "global", text: "Accent" }), {
      options: [...rootAccentOptions],
      defaultValue: rootAccentDefault,
    }),
  );

  const [fontSetting] = usePersistentSetting(
    "font",
    z.enum(fonts),
    useFixtureSelect(controlLabel({ type: "global", text: "Font" }), {
      options: [...fonts],
      defaultValue: "Inter",
    }),
  );

  const font = fontValues[fontSetting];

  const [radius] = usePersistentSetting(
    "radius",
    z.enum(rootRadiusOptions),
    useFixtureSelect(controlLabel({ type: "global", text: "Radius" }), {
      options: [...rootRadiusOptions],
      defaultValue: rootRadiusDefault,
    }),
  );

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
    <Box
      fontFamily={font}
      width="100dvw"
      height="100dvh"
      display="grid"
      containerType="size">
      <StyleSheet />
      <Box ref={setContainer} display="flex" flexWrap="wrap">
        {["light", "dark"].map(theme => (
          <Box
            data-theme={theme}
            key={theme}
            display="grid"
            width="100dvw"
            height="50dvh"
            wide:width="50dvw"
            wide:height="100dvh">
            <Box
              as={Root}
              overflow="auto"
              accent={accent}
              gray={gray}
              radius={radius}
              backgroundColor={colors.gray(98)}
              color={colors.gray(10)}
              dark:backgroundColor={colors.gray(10)}
              dark:color={colors.gray(98)}>
              {children}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
