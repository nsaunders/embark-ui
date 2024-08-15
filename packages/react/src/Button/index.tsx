import type { ElementType, HTMLProps } from "react";
import React from "react";
import type { PolyRefFunction } from "react-polymorphed";

import Box from "@/Box/index.js";
import { accent, gray } from "@/colors.js";

const forwardRef = React.forwardRef as PolyRefFunction;

export const buttonSizes = ["small", "medium", "large", "xlarge"] as const;
export const defaultButtonSize: (typeof buttonSizes)[number] = "medium";

export interface ButtonProps {
  className?: string;
  size?: (typeof buttonSizes)[number];
}

const Button = forwardRef<
  "button",
  ButtonProps,
  "button" | ElementType<HTMLProps<HTMLElement>>
>(({ as, className = "", size = defaultButtonSize, ...restProps }, ref) => {
  const Component = as || "button";
  return (
    <Box
      as={Component}
      className={[
        className,
        { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
      ]
        .filter(x => x)
        .join(" ")}
      conditions={{
        sizeMedium: { or: ["classB", "classC", "classD"] },
        sizeMediumWithLeadingIcon: {
          and: [{ or: ["classB", "classC", "classD"] }, "hasLeadingIcon"],
        },
        sizeMediumWithTrailingIcon: {
          and: [{ or: ["classB", "classC", "classD"] }, "hasTrailingIcon"],
        },
        sizeLarge: { or: ["classC", "classD"] },
        sizeLargeWithLeadingIcon: {
          and: [{ or: ["classC", "classD"] }, "hasLeadingIcon"],
        },
        sizeLargeWithTrailingIcon: {
          and: [{ or: ["classC", "classD"] }, "hasTrailingIcon"],
        },
        sizeXlarge: "classD",
        sizeXlargeWithLeadingIcon: { and: ["classD", "hasLeadingIcon"] },
        sizeXlargeWithTrailingIcon: { and: ["classD", "hasTrailingIcon"] },
      }}
      display="inline-flex"
      alignItems="center"
      textAlign="start"
      backgroundColor={accent(53)}
      hover:backgroundColor={accent(60)}
      active:backgroundColor={accent(43)}
      disabled:backgroundColor={gray(43)}
      color="contrast"
      disabled:color={gray(63)}
      disabled:cursor="not-allowed"
      borderWidth={0}
      lineHeight={1.25}
      fontSize={14}
      sizeMedium:fontSize={16}
      sizeLarge:fontSize={20}
      sizeXlarge:fontSize={24}
      paddingBlock={4}
      paddingInline={10}
      gap={5}
      hasLeadingIcon:paddingInlineStart="calc(10px - 0.125lh)"
      hasTrailingIcon:paddingInlineEnd="calc(10px - 0.125lh)"
      sizeMedium:paddingBlock={8}
      sizeMedium:paddingInline={14}
      sizeMedium:gap={7}
      sizeMediumWithLeadingIcon:paddingInlineStart="calc(14px - 0.125lh)"
      sizeMediumWithTrailingIcon:paddingInlineEnd="calc(14px - 0.125lh)"
      sizeLarge:paddingBlock={8}
      sizeLarge:paddingInline={16}
      sizeLarge:gap={8}
      sizeLargeWithLeadingIcon:paddingInlineStart="calc(16px - 0.125lh)"
      sizeLargeWithTrailingIcon:paddingInlineEnd="calc(16px - 0.125lh)"
      sizeXlarge:paddingBlock={10}
      sizeXlarge:paddingInline={20}
      sizeXlarge:gap={10}
      sizeXlargeWithLeadingIcon:paddingInlineStart="calc(20px - 0.125lh)"
      sizeXlargeWithTrailingIcon:paddingInlineEnd="calc(20px - 0.125lh)"
      borderRadius={2}
      outlineOffset={2}
      outlineWidth={0}
      outlineStyle="solid"
      outlineColor={gray(80)}
      dark:outlineColor={gray(40)}
      focusVisible:outlineWidth={2}
      active:transform="scale(0.97)"
      transitionProperty="background-color,transform"
      transitionDuration="150ms"
      ref={ref}
      {...restProps}
    />
  );
});

Button.displayName = "Button";

export default Button;
