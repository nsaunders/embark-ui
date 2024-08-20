import type { ElementType, HTMLProps } from "react";
import * as React from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { Box } from "@/Box/index.js";
import { accent, gray } from "@/colors/index.js";

const forwardRef = React.forwardRef as PolyRefFunction;

export const defaultInputAs = "input";

export const inputSizes = ["small", "medium", "large", "xlarge"] as const;
export const defaultInputSize: (typeof inputSizes)[number] = "medium";

export interface InputProps {
  className?: string;
  size?: (typeof inputSizes)[number];
}

const Input = forwardRef<
  typeof defaultInputAs,
  InputProps,
  typeof defaultInputAs | ElementType<HTMLProps<HTMLElement>>
>(
  (
    { as = defaultInputAs, size = defaultInputSize, className, ...props },
    ref,
  ) => (
    <Box
      conditions={{
        small: "classA",
        medium: "classB",
        large: "classC",
        xlarge: "classD",
        darkFocusVisible: { and: ["dark", "focusVisible"] },
        darkDisabled: { and: ["dark", "disabled"] },
      }}
      className={[
        className,
        { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
      ]
        .filter(x => x)
        .join(" ")}
      as={as}
      {...props}
      backgroundColor={gray(90)}
      color={gray(20)}
      placeholderColor={gray(55)}
      dark:backgroundColor={gray(20)}
      dark:color={gray(90)}
      disabled:color={gray(67.5)}
      darkDisabled:color={gray(40)}
      disabled:textShadow="1px 1px #fff"
      placeholderTextShadow="none"
      darkDisabled:textShadow={`1px 1px ${gray(55)}`}
      borderWidth={0}
      fontSize={14}
      medium:fontSize={16}
      large:fontSize={20}
      xlarge:fontSize={24}
      lineHeight={1.25}
      paddingBlock={4}
      paddingInline={10}
      medium:paddingBlock={8}
      medium:paddingInline={14}
      large:paddingBlock={8}
      large:paddingInline={16}
      xlarge:paddingBlock={10}
      xlarge:paddingInline={20}
      xlarge:gap={10}
      borderRadius={2}
      outlineWidth={0}
      outlineStyle="solid"
      outlineColor={accent(45, 0.375)}
      dark:outlineColor={accent(65, 0.375)}
      focusVisible:outlineWidth={2}
      disabled:cursor="not-allowed"
      ref={ref}
    />
  ),
);

Input.displayName = "Input";

export default Input;
