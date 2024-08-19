import { useFixtureInput } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import Button from "@/Button/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Input from "./index.js";

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
      <>
        <Input placeholder="Placeholder text" className={elementStateClasses} />
        <Input defaultValue="User input text" className={elementStateClasses} />
      </>
    );
  },
  "Next to Button"() {
    return (
      <Box display="flex" gap={8}>
        <Input />
        <Button>Submit</Button>
      </Box>
    );
  },
};
