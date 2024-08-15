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
        sizeLarge: { or: ["classC", "classD"] },
        sizeXlarge: "classD",
      }}
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
      sizeMedium:paddingBlock={8}
      sizeMedium:paddingInline={14}
      sizeLarge:paddingBlock={8}
      sizeLarge:paddingInline={20}
      sizeXlarge:paddingBlock={10}
      sizeXlarge:paddingInline={24}
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
