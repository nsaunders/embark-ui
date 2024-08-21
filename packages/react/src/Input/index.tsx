import type { ElementType, HTMLProps, ReactNode } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { Box } from "@/Box/index.js";
import { accent, gray } from "@/colors/index.js";

export const inputSizes = ["small", "medium", "large", "xlarge"] as const;
export const defaultInputSize: (typeof inputSizes)[number] = "medium";

export interface InputWrapProps {
  children?: ReactNode;
  size?: (typeof inputSizes)[number];
}

export const InputWrap = forwardRef<HTMLDivElement, InputWrapProps>(
  ({ children }, ref) => (
    <Box
      conditions={{
        disabled: "itemDisabled",
        darkDisabled: { and: ["dark", "itemDisabled"] },
        focusVisible: "itemFocusVisible",
        darkFocusVisible: { and: ["dark", "itemFocusVisible"] },
        small: "itemClassA",
        medium: "itemClassB",
        large: "itemClassC",
        xlarge: "itemClassD",
      }}
      as="div"
      display="flex"
      alignItems="center"
      ref={ref}
      backgroundColor={gray(90)}
      color={gray(20)}
      dark:backgroundColor={gray(20)}
      dark:color={gray(90)}
      disabled:color={gray(67.5)}
      darkDisabled:color={gray(40)}
      disabled:textShadow="1px 1px #fff"
      darkDisabled:textShadow={`1px 1px ${gray(55)}`}
      fontSize={14}
      medium:fontSize={16}
      large:fontSize={20}
      xlarge:fontSize={24}
      lineHeight={1.25}
      borderRadius={2}
      outlineWidth={0}
      outlineStyle="solid"
      outlineColor={accent(45, 0.375)}
      dark:outlineColor={accent(65, 0.375)}
      focusVisible:outlineWidth={2}
      disabled:cursor="not-allowed">
      {children}
    </Box>
  ),
);

InputWrap.displayName = "InputWrap";

const polyForwardRef = forwardRef as PolyRefFunction;

export const defaultInputCoreAs = "input";

export interface InputCoreProps {
  className?: string;
  size?: (typeof inputSizes)[number];
}

export const InputCore = polyForwardRef<
  typeof defaultInputCoreAs,
  InputCoreProps,
  typeof defaultInputCoreAs | "div" | ElementType<HTMLProps<HTMLElement>>
>(({ as = defaultInputCoreAs, className, size = "medium", ...props }, ref) => (
  <Box
    conditions={{
      small: "classA",
      medium: "classB",
      large: "classC",
      xlarge: "classD",
      darkFocusVisible: { and: ["dark", "focusVisible"] },
    }}
    className={[
      className,
      "item",
      { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
    ].join(" ")}
    as={as}
    {...props}
    display="flex"
    color="inherit"
    textShadow="inherit"
    placeholderColor={gray(55)}
    placeholderTextShadow="none"
    borderWidth={0}
    paddingBlock={4}
    paddingInline={10}
    medium:paddingBlock={8}
    medium:paddingInline={14}
    large:paddingBlock={8}
    large:paddingInline={16}
    xlarge:paddingBlock={10}
    xlarge:paddingInline={20}
    outlineWidth={0}
    ref={ref}
  />
));

InputCore.displayName = "InputCore";

export interface InputProps {
  size?: (typeof inputSizes)[number];
}

const Input = polyForwardRef<
  typeof defaultInputCoreAs,
  InputProps,
  typeof defaultInputCoreAs | ElementType<HTMLProps<HTMLElement>>
>(({ size = defaultInputSize, ...props }, ref) => (
  <InputWrap>
    <InputCore {...props} size={size} ref={ref} />
  </InputWrap>
));

Input.displayName = "Input";

export default Input;
