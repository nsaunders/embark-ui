import { LifeBuoy } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Button, {
  buttonSizes,
  buttonVariants,
  defaultButtonSize,
  defaultButtonVariant,
} from "./index.js";

function useElementStateClasses() {
  const [hover] = useFixtureInput(
    controlLabel({ type: "demo", text: "Hover" }),
    false,
  );
  const [focusVisible] = useFixtureInput(
    controlLabel({ type: "demo", text: "Focus" }),
    false,
  );
  const [active] = useFixtureInput(
    controlLabel({ type: "demo", text: "Active" }),
    false,
  );
  const [disabled] = useFixtureInput(
    controlLabel({ type: "demo", text: "Disabled" }),
    false,
  );
  return [
    hover && ":hover",
    focusVisible && ":focus-visible",
    active && ":active",
    disabled && ":disabled",
  ]
    .filter(x => x)
    .join(" ");
}

function useVariant() {
  return useFixtureSelect(controlLabel({ type: "prop", text: "Variant" }), {
    options: [...buttonVariants],
    defaultValue: defaultButtonVariant,
  })[0];
}

export default {
  Default() {
    const [size] = useFixtureSelect(
      controlLabel({ type: "prop", text: "Size" }),
      {
        options: [...buttonSizes],
        defaultValue: defaultButtonSize,
      },
    );

    const variant = useVariant();

    const [text] = useFixtureInput(
      controlLabel({ type: "demo", text: "Text" }),
      "Button text",
    );

    const elementStateClasses = useElementStateClasses();

    const [leadingIcon] = useFixtureInput(
      controlLabel({ type: "demo", text: "Leading icon" }),
      false,
    );

    const [trailingIcon] = useFixtureInput(
      controlLabel({ type: "demo", text: "Trailing icon" }),
      false,
    );

    const TextWrap = text && (leadingIcon || trailingIcon) ? "span" : Fragment;

    const [wrap] = useFixtureInput(
      controlLabel({ type: "demo", text: "Wrap text" }),
      false,
    );

    return (
      <Button size={size} variant={variant} className={elementStateClasses}>
        {leadingIcon ? <LifeBuoy size="1lh" /> : null}
        <TextWrap>
          {text}
          {wrap ? (
            <>
              <br />
              line two
            </>
          ) : (
            " "
          )}
        </TextWrap>
        {trailingIcon ? <LifeBuoy size="1lh" /> : null}
      </Button>
    );
  },
  Sizes() {
    const variant = useVariant();
    return (
      <Box display="flex" gap={8} alignItems="center">
        {buttonSizes.map(size => (
          <Button key={size} size={size} variant={variant}>
            {size}
          </Button>
        ))}
      </Box>
    );
  },
  Variants() {
    const elementStateClasses = useElementStateClasses();
    return (
      <Box display="flex" gap={8} alignItems="center">
        {buttonVariants.map(variant => (
          <Button
            key={variant}
            variant={variant}
            className={elementStateClasses}>
            {variant}
          </Button>
        ))}
      </Box>
    );
  },
};
