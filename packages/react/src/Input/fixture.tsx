import { Eye, EyeOff } from "lucide-react";
import { useFixtureInput, useFixtureSelect } from "react-cosmos/client.js";

import Box from "@/Box/index.js";
import Button from "@/Button/index.js";
import { controlLabel } from "@/cosmos.utils.js";

import Input, {
  InputAddon,
  InputCore,
  InputGroup,
  InputOption,
  inputScaleDefault,
  inputScaleOptions,
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

function useScale() {
  return useFixtureSelect(controlLabel({ text: "Scale", type: "prop" }), {
    options: [...inputScaleOptions],
    defaultValue: inputScaleDefault,
  });
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
  Scale() {
    return (
      <>
        {inputScaleOptions.map(scale => (
          <Input key={scale} scale={scale} placeholder={scale} />
        ))}
      </>
    );
  },
  "Next to Button"() {
    const elementStateClasses = useElementStateClasses();
    const [scale] = useScale();
    return (
      <Box display="flex" alignItems="center" gap={8}>
        <Input scale={scale} className={elementStateClasses} />
        <Button scale={scale} variant="subdued" className={elementStateClasses}>
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
  "Date Picker"() {
    const [scale] = useScale();
    return <Input type="date" scale={scale} />;
  },
  "Select dropdown"() {
    const [scale] = useScale();
    return (
      <Input as="select" scale={scale}>
        <InputOption as="optgroup" label="Option 1">
          <InputOption>Option 1a</InputOption>
          <InputOption>Option 1b</InputOption>
        </InputOption>
        <InputOption>Option 2</InputOption>
        <InputOption>Option 3</InputOption>
      </Input>
    );
  },
  "Select dropdown with addons"() {
    const [scale] = useScale();
    return (
      <InputGroup scale={scale}>
        <InputAddon>addon</InputAddon>
        <InputCore as="select">
          {[...Array(3).keys()].map(i => (
            <InputOption key={i}>Option {i + 1}</InputOption>
          ))}
        </InputCore>
        <InputAddon>addon</InputAddon>
      </InputGroup>
    );
  },
  "Select listbox"() {
    const [scale] = useScale();
    return (
      <Input as="select" size={5} scale={scale}>
        <InputOption as="optgroup" label="Option 1">
          <InputOption>Option 1a</InputOption>
          <InputOption>Option 1b</InputOption>
        </InputOption>
        <InputOption>Option 2</InputOption>
        <InputOption>Option 3</InputOption>
      </Input>
    );
  },
  "Select listbox with addons"() {
    const [scale] = useScale();
    return (
      <InputGroup scale={scale}>
        <InputAddon>addon</InputAddon>
        <InputCore as="select" size={5}>
          {[...Array(5).keys()].map(i => (
            <InputOption key={i}>Option {i + 1}</InputOption>
          ))}
        </InputCore>
        <InputAddon>addon</InputAddon>
      </InputGroup>
    );
  },
};
