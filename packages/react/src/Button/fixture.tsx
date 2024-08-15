import { LifeBuoy } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Button, { buttonSizes, defaultButtonSize } from "./index.js";

export default {
  Default() {
    const [size] = useFixtureSelect(
      controlLabel({ type: "prop", text: "Size" }),
      {
        options: [...buttonSizes],
        defaultValue: defaultButtonSize,
      },
    );
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
    const [disabled] = useFixtureInput("Disabled", false);
    const [leadingIcon] = useFixtureInput(
      controlLabel({ type: "demo", text: "Leading icon" }),
      false,
    );
    const [trailingIcon] = useFixtureInput(
      controlLabel({ type: "demo", text: "Trailing icon" }),
      false,
    );
    const TextWrap = leadingIcon || trailingIcon ? "span" : Fragment;
    const [wrap] = useFixtureInput(
      controlLabel({ type: "demo", text: "Wrap text" }),
      false,
    );
    return (
      <Button
        size={size}
        className={[
          hover && ":hover",
          focusVisible && ":focus-visible",
          active && ":active",
          disabled && ":disabled",
        ]
          .filter(x => x)
          .join("")}>
        {leadingIcon ? <LifeBuoy size="1lh" /> : null}
        <TextWrap>
          Button
          {wrap ? <br /> : " "}
          text
        </TextWrap>
        {trailingIcon ? <LifeBuoy size="1lh" /> : null}
      </Button>
    );
  },
  Sizes() {
    return (
      <Box display="flex" gap={8} alignItems="center">
        {buttonSizes.map(size => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </Box>
    );
  },
};
