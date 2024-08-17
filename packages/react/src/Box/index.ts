import {
  createComponent,
  createConditions,
  createHooks,
  createStyleProps,
} from "@embellish/react";
import type {} from "csstype";
import type { CSSProperties } from "react";

const { StyleSheet, hooks } = createHooks([
  "@media (hover:hover)",
  "@media (prefers-color-scheme: dark)",
  "@container (min-width: 100cqh)",
  "&:has(svg:first-child)",
  "&:has(svg:last-child)",
  '[data-theme="auto"] &',
  '[data-theme="dark"] &',
  "&:active",
  "&.\\:active",
  "&:disabled",
  "&.\\:disabled",
  '&[aria-disabled="true"]',
  "&:focus-visible",
  "&.\\:focus-visible",
  "&:hover",
  "&.\\:hover",
  "&.a",
  "&.b",
  "&.c",
  "&.d",
  "&.e",
  "&.f",
  "&.g",
]);

export { StyleSheet };

function parseLengths(
  [char, ...str]: string,
  values: string[] = [],
  acc = "",
): string[] {
  if (!char) {
    return values.concat(acc);
  }
  if (/\s/.test(char)) {
    const balanced =
      (acc.match(/\(/) || []).length === (acc.match(/\)/) || []).length;
    return balanced
      ? parseLengths(str.join(""), [...values, acc], "")
      : parseLengths(str.join(""), values, `${acc}${char}`);
  }
  return parseLengths(str.join(""), values, `${acc}${char}`);
}

function createStartEndShorthand<P extends keyof CSSProperties>(
  property: P,
  parseShorthand: (shorthand: string) => string[],
  longhandPropertyName: (startEnd: "Start" | "End") => keyof CSSProperties,
) {
  return (value: CSSProperties[P]): CSSProperties => {
    if (typeof value !== "string") {
      return {
        [longhandPropertyName("Start")]: value,
        [longhandPropertyName("End")]: value,
      };
    }
    const values = parseShorthand(value);
    return {
      [longhandPropertyName("Start")]: values[0],
      [longhandPropertyName("End")]: values[1] || values[0],
    };
  };
}

function createTRBLShorthand<P extends keyof CSSProperties>(
  property: P,
  parseShorthand: (shorthand: string) => string[],
  longhandPropertyName: (
    trbl: "Top" | "Right" | "Bottom" | "Left",
  ) => keyof CSSProperties,
) {
  return (value: CSSProperties[P]): CSSProperties => {
    if (typeof value !== "string") {
      return { [property]: value };
    }
    const values = parseShorthand(value);
    return {
      [longhandPropertyName("Top")]: values[0],
      [longhandPropertyName("Right")]: values[1] || values[0],
      [longhandPropertyName("Bottom")]: values[2] || values[0],
      [longhandPropertyName("Left")]: values[3] || values[1] || values[0],
    };
  };
}

export const Box = createComponent({
  displayName: "Box",
  defaultAs: "div",
  defaultStyle: is => {
    const style: CSSProperties = {
      ...({
        "--background-color": "initial",
        "--box-shadow": "initial",
        "--inner-stroke-color": "transparent",
        "--inner-stroke-width": 0,
        "--line-height": "initial",
        "--outer-stroke-color": "transparent",
        "--outer-stroke-width": 0,
      } as CSSProperties),
      backgroundColor: "var(--background-color)",
      boxShadow:
        "var(--box-shadow, 0 0), 0 0 0 calc(var(--outer-stroke-width, 0) * 1px) var(--outer-stroke-color, transparent), inset 0 0 0 calc(var(--inner-stroke-width, 0) * 1px) var(--inner-stroke-color, transparent)",
      boxSizing: "border-box",
      margin: 0,
      lineHeight: "round(up, calc(var(--line-height, 1.5) * 1em), 4px)",
    };

    if (
      is === "img" ||
      is === "picture" ||
      is === "video" ||
      is === "canvas" ||
      is === "svg"
    ) {
      style.display = "block";
      style.maxWidth = "100%";
    } else if (
      is === "input" ||
      is === "button" ||
      is === "textarea" ||
      is === "select"
    ) {
      style.fontFamily = "inherit";
      style.fontSize = "inherit";
      style.fontWeight = "inherit";
    } else if (is === "p" || (typeof is === "string" && /^h[1-6]$/.test(is))) {
      style.overflowWrap = "break-word";
    }

    return style;
  },
  conditions: createConditions(hooks, {
    active: {
      and: [
        { or: ["&:active", "&.\\:active"] },
        {
          not: {
            or: ["&:disabled", "&.\\:disabled", '&[aria-disabled="true"]'],
          },
        },
      ],
    },
    classA: "&.a",
    classB: "&.b",
    classC: "&.c",
    classD: "&.d",
    classE: "&.e",
    classF: "&.f",
    classG: "&.g",
    dark: {
      or: [
        {
          and: ["@media (prefers-color-scheme: dark)", '[data-theme="auto"] &'],
        },
        '[data-theme="dark"] &',
      ],
    },
    disabled: {
      or: ["&:disabled", "&.\\:disabled", '&[aria-disabled="true"]'],
    },
    focusVisible: {
      and: [
        { or: ["&:focus-visible", "&.\\:focus-visible"] },
        {
          not: {
            or: ["&:disabled", "&.\\:disabled", '&[aria-disabled="true"]'],
          },
        },
      ],
    },
    hover: {
      and: [
        { or: [{ and: ["@media (hover:hover)", "&:hover"] }, "&.\\:hover"] },
        {
          not: {
            or: ["&:disabled", "&.\\:disabled", '&[aria-disabled="true"]'],
          },
        },
      ],
    },
    hasLeadingIcon: "&:has(svg:first-child)",
    hasTrailingIcon: "&:has(svg:last-child)",
    wide: "@container (min-width: 100cqh)",
  }),
  styleProps: createStyleProps({
    alignItems: true,
    alignSelf: true,
    aspectRatio: true,
    backgroundColor: (value: CSSProperties["backgroundColor"]) =>
      ({
        "--background-color": value,
      }) as CSSProperties,
    backgroundImage: true,
    backgroundSize: true,
    borderColor: true,
    borderInlineStartWidth: true,
    borderRadius: (value: CSSProperties["borderRadius"]) => ({
      borderRadius: `calc(${typeof value === "number" ? `${value}px` : value} * var(--radius))`,
    }),
    borderStyle: true,
    borderWidth: true,
    boxShadow: (value: CSSProperties["boxShadow"]) =>
      ({
        "--box-shadow": value,
      }) as CSSProperties,
    boxSizing: true,
    clip: true,
    color: (value: CSSProperties["color"]) => {
      if (value === "contrast") {
        return {
          "--y-threshold": 0.26,
          "--y": "clamp(0, (var(--y-threshold) / y - 1) * infinity, 1)",
          color:
            "color(from var(--background-color) xyz-d65 var(--y) var(--y) var(--y))",
        } as CSSProperties;
      }
      return {
        color: value,
      };
    },
    containerType: true,
    cursor: true,
    display: true,
    flexBasis: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    float: true,
    fontFamily: true,
    fontSize: (value: CSSProperties["fontSize"]) => ({
      fontSize: typeof value === "number" ? `${value / 16}rem` : value,
    }),
    fontWeight: true,
    gap: true,
    gridAutoFlow: true,
    gridColumn: true,
    gridRow: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    height: true,
    innerStrokeColor: (value: CSSProperties["color"]) =>
      ({
        "--inner-stroke-color": value,
      }) as CSSProperties,
    innerStrokeWidth: (value: number) =>
      ({
        "--inner-stroke-width": value,
      }) as CSSProperties,
    inset: true,
    justifyContent: true,
    left: true,
    letterSpacing: true,
    lineHeight: (value: CSSProperties["lineHeight"]) =>
      typeof value === "number"
        ? ({
            "--line-height": value,
          } as CSSProperties)
        : {
            lineHeight: value,
          },
    listStyleType: true,
    margin: createTRBLShorthand("margin", parseLengths, x => `margin${x}`),
    marginBlock: true,
    marginBlockStart: true,
    marginBottom: true,
    marginInline: true,
    marginLeft: true,
    marginRight: true,
    marginTop: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    objectFit: true,
    order: true,
    outerStrokeColor: (value: CSSProperties["color"]) =>
      ({
        "--outer-stroke-color": value,
      }) as CSSProperties,
    outerStrokeWidth: (value: number) =>
      ({
        "--outer-stroke-width": value,
      }) as CSSProperties,
    outlineColor: true,
    outlineOffset: true,
    outlineStyle: true,
    outlineWidth: true,
    overflow: true,
    overflowX: true,
    overflowY: true,
    padding: createTRBLShorthand("padding", parseLengths, x => `padding${x}`),
    paddingBlock: createStartEndShorthand(
      "paddingBlock",
      parseLengths,
      x => `paddingBlock${x}`,
    ),
    paddingBottom: true,
    paddingInline: createStartEndShorthand(
      "paddingInline",
      parseLengths,
      x => `paddingInline${x}`,
    ),
    paddingInlineEnd: true,
    paddingInlineStart: true,
    paddingLeft: true,
    paddingRight: true,
    paddingTop: true,
    placeItems: true,
    position: true,
    stroke: true,
    textAlign: true,
    textDecorationColor: true,
    textDecorationLine: true,
    textDecorationThickness: true,
    textUnderlineOffset: true,
    transform: true,
    transitionProperty: true,
    transitionDuration: true,
    visibility: true,
    width: true,
  }),
});

export default Box;
