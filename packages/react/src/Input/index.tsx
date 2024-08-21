import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { Box } from "@/Box/index.js";
import { accent, gray } from "@/colors/index.js";

export const inputSizes = ["small", "medium", "large", "xlarge"] as const;
export const defaultInputSize: (typeof inputSizes)[number] = "medium";

export interface InputGroupProps {
  children?: ReactNode;
  size?: (typeof inputSizes)[number];
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, size = defaultInputSize }, ref) => (
    <Box
      conditions={{
        disabled: "itemDisabled",
        darkDisabled: { and: ["dark", "itemDisabled"] },
        focusVisible: "itemFocusVisible",
        small: "classA",
        medium: "classB",
        large: "classC",
        xlarge: "classD",
      }}
      className={[
        "group",
        { small: "a", medium: "b", large: "c", xlarge: "d" }[size],
      ].join(" ")}
      as="div"
      display="flex"
      alignItems="center"
      ref={ref}
      backgroundColor={gray(90)}
      dark:backgroundColor={gray(20)}
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
      focusVisible:outlineWidth={2}>
      {children}
    </Box>
  ),
);

InputGroup.displayName = "InputGroup";

const polyForwardRef = forwardRef as PolyRefFunction;

const defaultInputGroupItemAs = "div";

interface InputGroupItemProps {
  className?: string;
}

const InputGroupItem = polyForwardRef<
  typeof defaultInputGroupItemAs,
  InputGroupItemProps
>(({ as = defaultInputGroupItemAs, ...props }, ref) => (
  <Box
    conditions={{
      small: "groupClassA",
      medium: "groupClassB",
      large: "groupClassC",
      xlarge: "groupClassD",
      darkDisabled: { and: ["dark", "disabled"] },
    }}
    as={as}
    display="flex"
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
    disabled:cursor="not-allowed"
    color={gray(20)}
    disabled:color={gray(67.5)}
    dark:color={gray(90)}
    darkDisabled:color={gray(40)}
    disabled:textShadow="1px 1px #fff"
    darkDisabled:textShadow={`1px 1px ${gray(55)}`}
    {...props}
    ref={ref}
  />
));

InputGroupItem.displayName = "InputGroupItem";

export const defaultInputCoreAs = "input";

export interface InputCoreProps {
  className?: string;
}

export const InputCore = polyForwardRef<
  typeof defaultInputCoreAs,
  InputCoreProps,
  typeof defaultInputCoreAs | "button" | "input" | "select"
>(({ as = defaultInputCoreAs, className, ...props }, ref) => (
  <InputGroupItem
    as={(props: ComponentPropsWithoutRef<typeof Box>) => (
      <Box
        as={as}
        notFirstChild:paddingInlineStart={0}
        notLastChild:paddingInlineEnd={0}
        {...props}
        ref={ref}
      />
    )}
    className={[className, "item"].filter(x => x).join(" ")}
    {...props}
  />
));

InputCore.displayName = "InputCore";

export const defaultInputAddonAs = "div";

export interface InputAddonProps {}

export const InputAddon = polyForwardRef<
  typeof defaultInputAddonAs,
  InputCoreProps,
  typeof defaultInputAddonAs | "a" | "button" | "div"
>(({ as = defaultInputAddonAs, ...props }, ref) => (
  <InputGroupItem
    as={(props: ComponentPropsWithoutRef<typeof Box>) => (
      <Box
        as={as}
        borderRadius="inherit"
        firstChild:borderStartEndRadius={0}
        firstChild:borderEndEndRadius={0}
        lastChild:borderStartStartRadius={0}
        lastChild:borderEndStartRadius={0}
        outlineWidth={0}
        outlineOffset={-2}
        outlineStyle="solid"
        outlineColor={accent(45, 0.375)}
        dark:outlineColor={accent(65, 0.375)}
        focusVisible:outlineWidth={2}
        {...props}
        ref={ref}
      />
    )}
    {...props}
  />
));

InputAddon.displayName = "InputAddon";

export interface InputProps {
  size?: (typeof inputSizes)[number];
}

const Input = polyForwardRef<
  typeof defaultInputCoreAs,
  InputProps,
  typeof defaultInputCoreAs | "button" | "input" | "select"
>(({ size = defaultInputSize, ...props }, ref) => (
  <InputGroup size={size}>
    <InputCore {...props} ref={ref} />
  </InputGroup>
));

Input.displayName = "Input";

export default Input;
