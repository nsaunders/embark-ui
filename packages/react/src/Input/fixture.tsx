import { Eye } from "lucide-react";
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import Button from "@/Button/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Input, {
  InputAddon,
  InputCore,
  InputGroup,
  inputSizes,
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

export default {
  Default() {
    const elementStateClasses = useElementStateClasses();
    return (
      <Input defaultValue="User input text" className={elementStateClasses} />
    );
  },
  Placeholder() {
    const elementStateClasses = useElementStateClasses();
    return (
      <Input
        placeholder="Placeholder text"
        readOnly
        className={elementStateClasses}
      />
    );
  },
  Sizes() {
    return (
      <>
        {inputSizes.map(size => (
          <Input key={size} size={size} placeholder={size} />
        ))}
      </>
    );
  },
  "Next to Button"() {
    const elementStateClasses = useElementStateClasses();
    const [size] = useFixtureSelect("Size", {
      options: [...inputSizes],
      defaultValue: "medium",
    });
    return (
      <Box display="flex" alignItems="center" gap={8}>
        <Input size={size} className={elementStateClasses} />
        <Button size={size} variant="subdued" className={elementStateClasses}>
          Submit
        </Button>
      </Box>
    );
  },
  Addon() {
    return (
      <InputGroup>
        <InputCore defaultValue="hello" />
        <InputAddon as="button">
          <Eye size="1em" />
        </InputAddon>
      </InputGroup>
    );
  },
};
