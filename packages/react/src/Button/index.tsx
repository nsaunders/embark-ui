import type { ElementType, HTMLProps } from "react";
import React from "react";
import type { PolyRefFunction } from "react-polymorphed";

import Box from "@/Box/index.js";
import { accent, gray } from "@/colors.js";

const forwardRef = React.forwardRef as PolyRefFunction;

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
  "button",
  ButtonProps,
  "button" | ElementType<HTMLProps<HTMLElement>>
>(
  (
    {
      as,
      className = "",
      size = defaultButtonSize,
      variant = defaultButtonVariant,
      ...restProps
    },
    ref,
  ) => {
    const Component = as || "button";
    return (
      <Box
        as={Component}
        className={[
          className,
          { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
          { solid: "e", subdued: "f", ghost: "g" }[variant],
        ]
          .filter(x => x)
          .join(" ")}
        conditions={{
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
          ghostHover: { and: ["classG", "hover"] },
          ghostActive: { and: ["classG", "active"] },
          darkGhost: { and: ["dark", "classG"] },
          darkGhostHover: { and: ["dark", "classG", "hover"] },
          darkGhostActive: { and: ["dark", "classG", "active"] },
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
          darkHover: { and: ["dark", "hover"] },
          darkActive: { and: ["dark", "active"] },
        }}
        display="inline-flex"
        alignItems="center"
        textAlign="start"
        minHeight="1lh"
        boxSizing="content-box"
        borderWidth={0}
        ghost:innerStrokeWidth={1}
        hover:innerStrokeColor={`color-mix(in srgb,${gray(70)},transparent 50%)`}
        active:innerStrokeColor={`color-mix(in srgb,${gray(45)},transparent 50%)`}
        darkHover:innerStrokeColor={`color-mix(in srgb,${gray(55)},transparent 50%)`}
        darkActive:innerStrokeColor={`color-mix(in srgb,${gray(40)},transparent 50%)`}
        subdued:backgroundColor={`color-mix(in srgb,${gray(70)},transparent 50%)`}
        subduedHover:backgroundColor={`color-mix(in srgb,${gray(80)},transparent 50%)`}
        subduedActive:backgroundColor={`color-mix(in srgb,${gray(60)},transparent 50%)`}
        darkSubdued:backgroundColor={`color-mix(in srgb,${gray(40)},transparent 50%)`}
        darkSubduedHover:backgroundColor={`color-mix(in srgb,${gray(50)},transparent 50%)`}
        darkSubduedActive:backgroundColor={`color-mix(in srgb,${gray(30)},transparent 50%)`}
        solid:backgroundColor={accent(55)}
        solidHover:backgroundColor={accent(65)}
        solidActive:backgroundColor={accent(45)}
        solidDisabled:backgroundColor={gray(45)}
        color="contrast"
        subdued:color="#000"
        darkSubdued:color="#fff"
        ghost:color="black"
        darkGhost:color="white"
        disabled:color={gray(65)}
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
        outlineColor={gray(80)}
        dark:outlineColor={gray(40)}
        focusVisible:outlineWidth={2}
        transitionProperty="background-color"
        transitionDuration="150ms"
        ref={ref}
        {...restProps}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
