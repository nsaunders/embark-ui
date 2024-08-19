import type { ElementType, HTMLProps } from "react";
import React from "react";
import type { PolyRefFunction } from "react-polymorphed";

import Box from "@/Box/index.js";
import { accent, gray } from "@/colors/index.js";

const forwardRef = React.forwardRef as PolyRefFunction;

export const defaultButtonAs = "button";

export const buttonSizes = ["small", "medium", "large", "xlarge"] as const;
export const defaultButtonSize: (typeof buttonSizes)[number] = "medium";

export const buttonVariants = ["solid", "subdued", "ghost"] as const;
export const defaultButtonVariant: (typeof buttonVariants)[number] = "solid";

export interface ButtonProps {
  className?: string;
  size?: (typeof buttonSizes)[number];
  variant?: (typeof buttonVariants)[number];
}

const Button = forwardRef<
  typeof defaultButtonAs,
  ButtonProps,
  typeof defaultButtonAs | ElementType<HTMLProps<HTMLElement>>
>(
  (
    {
      as = defaultButtonAs,
      className = "",
      size = defaultButtonSize,
      variant = defaultButtonVariant,
      ...restProps
    },
    ref,
  ) => (
    <Box
      as={as}
      className={[
        className,
        { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
        { solid: "e", subdued: "f", ghost: "g" }[variant],
      ]
        .filter(x => x)
        .join(" ")}
      conditions={{
        hover: { and: ["hover", { not: "focusVisible" }] },
        medium: { or: ["classB", "classC", "classD"] },
        mediumWithLeadingIcon: {
          and: [{ or: ["classB", "classC", "classD"] }, "hasLeadingIcon"],
        },
        mediumWithTrailingIcon: {
          and: [{ or: ["classB", "classC", "classD"] }, "hasTrailingIcon"],
        },
        large: { or: ["classC", "classD"] },
        largeWithLeadingIcon: {
          and: [{ or: ["classC", "classD"] }, "hasLeadingIcon"],
        },
        largeWithTrailingIcon: {
          and: [{ or: ["classC", "classD"] }, "hasTrailingIcon"],
        },
        xlarge: "classD",
        xlargeWithLeadingIcon: { and: ["classD", "hasLeadingIcon"] },
        xlargeWithTrailingIcon: { and: ["classD", "hasTrailingIcon"] },
        ghost: "classG",
        darkGhost: { and: ["dark", "classG"] },
        subdued: "classF",
        subduedHover: { and: ["classF", "hover"] },
        subduedActive: { and: ["classF", "active"] },
        darkSubdued: { and: ["dark", "classF"] },
        darkSubduedHover: { and: ["dark", "classF", "hover"] },
        darkSubduedActive: { and: ["dark", "classF", "active"] },
        solid: "classE",
        solidHover: { and: ["classE", "hover"] },
        solidActive: { and: ["classE", "active"] },
        solidDisabled: { and: ["classE", "disabled"] },
        darkSolidDisabled: { and: ["classE", "disabled", "dark"] },
        darkHover: { and: ["dark", "hover", { not: "focusVisible" }] },
        darkActive: { and: ["dark", "active"] },
        darkDisabled: { and: ["disabled", "dark"] },
      }}
      display="inline-flex"
      alignItems="center"
      textAlign="start"
      minHeight="1lh"
      boxSizing="content-box"
      borderWidth={0}
      ghost:innerStrokeWidth={1}
      hover:innerStrokeColor={gray(70, 0.5)}
      active:innerStrokeColor={gray(45, 0.5)}
      darkHover:innerStrokeColor={gray(55, 0.5)}
      darkActive:innerStrokeColor={gray(40, 0.5)}
      subdued:backgroundColor={gray(70, 0.5)}
      subduedHover:backgroundColor={gray(80, 0.5)}
      subduedActive:backgroundColor={gray(60, 0.5)}
      darkSubdued:backgroundColor={gray(40, 0.5)}
      darkSubduedHover:backgroundColor={gray(50, 0.5)}
      darkSubduedActive:backgroundColor={gray(30, 0.5)}
      solid:backgroundColor={accent(50)}
      solidHover:backgroundColor={accent(55)}
      solidActive:backgroundColor={accent(45)}
      solidDisabled:backgroundColor={gray(60)}
      darkSolidDisabled:backgroundColor={gray(40)}
      color="contrast"
      subdued:color="#000"
      darkSubdued:color="#fff"
      ghost:color="black"
      darkGhost:color="white"
      disabled:color={gray(30)}
      darkDisabled:color={gray(65)}
      disabled:cursor="not-allowed"
      lineHeight={1.25}
      fontSize={14}
      medium:fontSize={16}
      large:fontSize={20}
      xlarge:fontSize={24}
      paddingBlock={4}
      paddingInline={10}
      gap={5}
      hasLeadingIcon:paddingInlineStart="calc(10px - 0.125lh)"
      hasTrailingIcon:paddingInlineEnd="calc(10px - 0.125lh)"
      medium:paddingBlock={8}
      medium:paddingInline={14}
      medium:gap={7}
      mediumWithLeadingIcon:paddingInlineStart="calc(14px - 0.125lh)"
      mediumWithTrailingIcon:paddingInlineEnd="calc(14px - 0.125lh)"
      large:paddingBlock={8}
      large:paddingInline={16}
      large:gap={8}
      largeWithLeadingIcon:paddingInlineStart="calc(16px - 0.125lh)"
      largeWithTrailingIcon:paddingInlineEnd="calc(16px - 0.125lh)"
      xlarge:paddingBlock={10}
      xlarge:paddingInline={20}
      xlarge:gap={10}
      xlargeWithLeadingIcon:paddingInlineStart="calc(20px - 0.125lh)"
      xlargeWithTrailingIcon:paddingInlineEnd="calc(20px - 0.125lh)"
      borderRadius={2}
      outlineOffset={2}
      outlineWidth={0}
      outlineStyle="solid"
      outlineColor={gray(25, 0.25)}
      dark:outlineColor={gray(85, 0.25)}
      focusVisible:outlineWidth={2}
      transitionProperty="background-color"
      transitionDuration="150ms"
      ref={ref}
      {...restProps}
    />
  ),
);

Button.displayName = "Button";

export default Button;
