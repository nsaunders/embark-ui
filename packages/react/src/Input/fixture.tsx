import { Eye, EyeOff } from "lucide-react";
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import Button from "@/Button/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Input, {
  defaultInputSize,
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
    const [size] = useFixtureSelect(
      controlLabel({ type: "prop", text: "Size" }),
      {
        options: [...inputSizes],
        defaultValue: "medium",
      },
    );
    return (
      <Box display="flex" alignItems="center" gap={8}>
        <Input size={size} className={elementStateClasses} />
        <Button size={size} variant="subdued" className={elementStateClasses}>
          Submit
        </Button>
      </Box>
    );
  },
  "Basic Addons"() {
    return (
      <>
        <InputGroup>
          <InputCore type="number" defaultValue="123" width={100} />
          <InputAddon>kg</InputAddon>
        </InputGroup>
        <InputGroup>
          <InputAddon>$</InputAddon>
          <InputCore type="number" defaultValue="123" width={100} />
        </InputGroup>
      </>
    );
  },
  "Interactive Addon"() {
    const elementStateClasses = useElementStateClasses();
    const [passwordVisible, setPasswordVisible] = useFixtureInput(
      controlLabel({ type: "demo", text: "Password visible" }),
      false,
    );
    return (
      <InputGroup>
        <InputCore
          type={passwordVisible ? "text" : "password"}
          defaultValue="password"
        />
        <InputAddon
          as="button"
          className={elementStateClasses}
          onClick={() => {
            setPasswordVisible(x => !x);
          }}>
          {passwordVisible ? <EyeOff size="1em" /> : <Eye size="1em" />}
        </InputAddon>
      </InputGroup>
    );
  },
  Select() {
    const [size] = useFixtureSelect(
      controlLabel({ text: "Size", type: "prop" }),
      { options: [...inputSizes], defaultValue: defaultInputSize },
    );
    return (
      <Input as="select" size={size}>
        <optgroup label="Option 1">
          <option>Option 1a</option>
          <option>Option 1b</option>
        </optgroup>
        <option>Option 2</option>
        <option>Option 3</option>
      </Input>
    );
  },
  "Date Picker"() {
    const [size] = useFixtureSelect(
      controlLabel({ text: "Size", type: "prop" }),
      { options: [...inputSizes], defaultValue: defaultInputSize },
    );
    return <Input type="date" size={size} />;
  },
};
