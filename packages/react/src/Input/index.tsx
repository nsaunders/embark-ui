import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import type { PolyRefFunction } from "react-polymorphed";

import { Box } from "@/Box/index.js";
import { accent, gray } from "@/colors/index.js";

export const inputScaleOptions = [
  "small",
  "medium",
  "large",
  "xlarge",
] as const;
export const inputScaleDefault =
  "medium" satisfies (typeof inputScaleOptions)[number];

export interface InputGroupProps {
  children?: ReactNode;
  scale?: (typeof inputScaleOptions)[number];
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, scale = inputScaleDefault }, ref) => (
    <Box
      conditions={{
        focusVisible: "itemFocusVisible",
        small: "classA",
        medium: "classB",
        large: "classC",
        xlarge: "classD",
      }}
      className={[
        "group",
        { small: "a", medium: "b", large: "c", xlarge: "d" }[scale],
      ].join(" ")}
      overflow="hidden"
      position="relative"
      display="flex"
      alignItems="stretch"
      ref={ref}
      backgroundColor={gray(90)}
      dark:backgroundColor={gray(20)}
      fontSize={14}
      medium:fontSize={16}
      large:fontSize={20}
      xlarge:fontSize={24}
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

const inputGroupItemAsDefault = "div";

interface InputGroupItemProps {
  className?: string;
}

const InputGroupItem = polyForwardRef<
  typeof inputGroupItemAsDefault,
  InputGroupItemProps
>(({ as = inputGroupItemAsDefault, ...props }, ref) => (
  <Box
    conditions={{
      small: "groupClassA",
      medium: "groupClassB",
      large: "groupClassC",
      xlarge: "groupClassD",
      addon: "classA",
      mediumAddon: { and: ["groupClassB", "classA"] },
      largeAddon: { and: ["groupClassC", "classA"] },
      xlargeAddon: { and: ["groupClassD", "classA"] },
      opener: "classC",
      mediumOpener: { and: ["groupClassB", "classC"] },
      largeOpener: { and: ["groupClassC", "classC"] },
      xlargeOpener: { and: ["groupClassD", "classC"] },
      darkDisabled: { and: ["dark", "disabled"] },
      hover: { and: ["hover", "classA", "clickable"] },
      active: { and: ["active", "classA", "clickable"] },
      darkHover: { and: ["dark", "hover", "classA", "clickable"] },
      darkActive: { and: ["dark", "active", "classA", "clickable"] },
      coreWithLeadingAddon: {
        and: ["classB", "groupHasClassAFirstChild"],
      },
      coreWithTrailingAddon: {
        and: ["classB", "groupHasClassALastChild"],
      },
      openerWithTrailingAddon: {
        and: ["classC", "groupHasClassALastChild"],
      },
      mediumOpenerWithTrailingAddon: {
        and: ["groupClassB", "classC", "groupHasClassALastChild"],
      },
      largeOpenerWithTrailingAddon: {
        and: ["groupClassC", "classC", "groupHasClassALastChild"],
      },
      xlargeOpenerWithTrailingAddon: {
        and: ["groupClassD", "classC", "groupHasClassALastChild"],
      },
    }}
    as={as}
    display="flex"
    alignItems="center"
    placeholderColor={gray(55)}
    placeholderTextShadow="none"
    borderWidth={0}
    paddingBlock={4}
    medium:paddingBlock={8}
    large:paddingBlock={8}
    xlarge:paddingBlock={10}
    paddingInline={10}
    opener:paddingInlineEnd="calc(0.375lh + 20px)"
    medium:paddingInline={14}
    mediumOpener:paddingInlineEnd="calc(0.375lh + 28px)"
    large:paddingInline={16}
    largeOpener:paddingInlineEnd="calc(0.375lh + 32px)"
    xlarge:paddingInline={20}
    xlargeOpener:paddingInlineEnd="calc(0.375lh + 40px)"
    coreWithLeadingAddon:paddingInlineStart={0}
    coreWithTrailingAddon:paddingInlineEnd={0}
    openerWithTrailingAddon:paddingInlineEnd="calc(0.375lh + 10px)"
    mediumOpenerWithTrailingAddon:paddingInlineEnd="calc(0.375lh + 14px)"
    largeOpenerWithTrailingAddon:paddingInlineEnd="calc(0.375lh + 16px)"
    xlargeOpenerWithTrailingAddon:paddingInlineEnd="calc(0.375lh + 20px)"
    outlineWidth={0}
    outlineStyle="solid"
    disabled:cursor="not-allowed"
    color={gray(25)}
    hover:color={gray(35)}
    active:color={gray(15)}
    disabled:color={gray(67.5)}
    dark:color={gray(85)}
    darkHover:color={gray(90)}
    darkActive:color={gray(80)}
    darkDisabled:color={gray(40)}
    disabled:textShadow="1px 1px #fff"
    darkDisabled:textShadow={`1px 1px ${gray(55)}`}
    transitionProperty="color"
    transitionDuration="150ms"
    lineHeight={1.25}
    {...props}
    ref={ref}
  />
));

InputGroupItem.displayName = "InputGroupItem";

export const inputCoreAppearanceOptions = ["auto", "opener"] as const;
export const inputCoreAppearanceDefault =
  "auto" satisfies (typeof inputCoreAppearanceOptions)[number];

export const inputCoreAsOptions = ["button", "input", "select"] as const;
export const inputCoreAsDefault =
  "input" satisfies (typeof inputCoreAsOptions)[number];

export interface InputCoreProps {
  appearance?: (typeof inputCoreAppearanceOptions)[number];
  className?: string;
}

export const InputCore = polyForwardRef<
  typeof inputCoreAsDefault,
  InputCoreProps,
  (typeof inputCoreAsOptions)[number]
>(
  (
    {
      appearance = inputCoreAppearanceDefault,
      as = inputCoreAsDefault,
      ...props
    },
    ref,
  ) => {
    const opener =
      (as === "select" &&
        !("multiple" in props && props.multiple) &&
        !("size" in props && props.size)) ||
      appearance === "opener";
    return (
      <Box position="relative">
        <InputGroupItem
          as={({
            className,
            ...props
          }: ComponentPropsWithoutRef<typeof Box>) => (
            <Box
              as={as}
              className={[className, "item", "group", "b", opener && "c"]
                .filter(x => x)
                .join(" ")}
              WebkitDateAndTimeValueMinWidth="6ch"
              WebkitDateAndTimeValueMinHeight="1lh"
              dark:colorScheme="dark"
              appearance="none"
              {...props}
              ref={ref}
            />
          )}
          {...props}
        />
        {opener ? (
          <Box
            conditions={{
              medium: "groupClassB",
              large: "groupClassC",
              xlarge: "groupClassD",
              withTrailingAddon: "groupHasClassALastChild",
            }}
            as="svg"
            viewBox="0 0 8 4"
            position="absolute"
            right={10}
            medium:right={14}
            large:right={16}
            xlarge:right={20}
            withTrailingAddon:right={0}
            top="calc(50% - 0.09375lh)"
            height="0.1875lh"
            pointerEvents="none">
            <path d="M0,0 l4,4 l4,-4" fill="currentColor" />
          </Box>
        ) : undefined}
      </Box>
    );
  },
);

InputCore.displayName = "InputCore";

export const defaultInputAddonAs = "div";

export interface InputAddonProps {}

export const InputAddon = polyForwardRef<
  typeof defaultInputAddonAs,
  InputAddonProps,
  typeof defaultInputAddonAs | "a" | "button" | "div"
>(({ as = defaultInputAddonAs, ...props }, ref) => (
  <InputGroupItem
    as={({ className, ...props }: ComponentPropsWithoutRef<typeof Box>) => (
      <Box
        as={as}
        className={[className, "a"].filter(x => x).join(" ")}
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

export const inputOptionAsOptions = ["optgroup", "option"] as const;
export const inputOptionAsDefault =
  "option" satisfies (typeof inputOptionAsOptions)[number];

export interface InputOptionProps {}

export const InputOption = polyForwardRef<
  typeof inputOptionAsDefault,
  InputOptionProps,
  (typeof inputOptionAsOptions)[number]
>(({ as = inputOptionAsDefault, ...props }, ref) => (
  <Box
    conditions={{
      notListbox: { not: { or: ["groupAttrMultiple", "groupAttrSize"] } },
    }}
    as={as}
    notListbox:color="#000"
    {...props}
    ref={ref}
  />
));

InputOption.displayName = "InputOption";

export interface InputProps {
  scale?: (typeof inputScaleOptions)[number];
}

const Input = polyForwardRef<
  typeof inputCoreAsDefault,
  InputProps,
  typeof inputCoreAsDefault | "button" | "input" | "select"
>(({ scale = inputScaleDefault, ...props }, ref) => (
  <InputGroup scale={scale}>
    <InputCore {...props} ref={ref} />
  </InputGroup>
));

Input.displayName = "Input";

export default Input;
