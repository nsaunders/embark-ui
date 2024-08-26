import { Eye, EyeOff } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
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

function inputTypes(
  ...types: ComponentPropsWithoutRef<"input">["type"][]
): Record<
  `"${Exclude<ComponentPropsWithoutRef<"input">["type"], undefined>}" type`,
  () => JSX.Element
> {
  return Object.fromEntries(
    types.map(type => [
      `"${type}" type`,
      () => {
        const [scale] = useScale();
        const elementStateClasses = useElementStateClasses();
        return (
          <Input type={type} scale={scale} className={elementStateClasses} />
        );
      },
    ]),
  );
}

function useElementStateClasses(prefix: string = "") {
  const labelText = (x: string) => `${prefix}${prefix ? " " : ""}${x}`;
  const [hover] = useFixtureInput(
    controlLabel({ type: "demo", text: labelText("Hover") }),
    false,
  );
  const [focusVisible] = useFixtureInput(
    controlLabel({ type: "demo", text: labelText("Focus") }),
    false,
  );
  const [active] = useFixtureInput(
    controlLabel({ type: "demo", text: labelText("Active") }),
    false,
  );
  const [disabled] = useFixtureInput(
    controlLabel({ type: "demo", text: labelText("Disabled") }),
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

function useValue(defaultValue: string = "") {
  return useFixtureInput(
    controlLabel({ text: "Value", type: "demo" }),
    defaultValue,
  );
}

export default {
  Default() {
    const [scale] = useScale();
    const elementStateClasses = useElementStateClasses();
    return (
      <Input
        defaultValue="User input text"
        scale={scale}
        className={elementStateClasses}
      />
    );
  },
  Placeholder() {
    const [scale] = useScale();
    const elementStateClasses = useElementStateClasses();
    return (
      <Input
        scale={scale}
        placeholder="Placeholder text"
        readOnly
        className={elementStateClasses}
      />
    );
  },
  Scale() {
    const elementStateClasses = useElementStateClasses();
    const [value, setValue] = useValue();
    return (
      <>
        {inputScaleOptions.map(scale => (
          <Input
            key={scale}
            scale={scale}
            placeholder={scale}
            className={elementStateClasses}
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />
        ))}
      </>
    );
  },
  "Next to Button"() {
    const [scale] = useScale();
    const inputElementStateClasses = useElementStateClasses("Input");
    const buttonElementStateClasses = useElementStateClasses("Button");
    return (
      <Box display="flex" alignItems="center" gap={8}>
        <Input scale={scale} className={inputElementStateClasses} />
        <Button
          scale={scale}
          variant="solid"
          className={buttonElementStateClasses}>
          Submit
        </Button>
      </Box>
    );
  },
  "Basic Addons"() {
    const [scale] = useScale();
    const elementStateClasses = useElementStateClasses();
    return (
      <>
        <InputGroup scale={scale}>
          <InputCore
            type="number"
            defaultValue="123"
            width={100}
            className={elementStateClasses}
          />
          <InputAddon>kg</InputAddon>
        </InputGroup>
        <InputGroup scale={scale}>
          <InputAddon>$</InputAddon>
          <InputCore
            type="number"
            defaultValue="123"
            width={100}
            className={elementStateClasses}
          />
        </InputGroup>
      </>
    );
  },
  "Interactive Addon"() {
    const [scale] = useScale();
    const coreElementStateClasses = useElementStateClasses("Core");
    const addonElementStateClasses = useElementStateClasses("Addon");
    const [passwordVisible, setPasswordVisible] = useFixtureInput(
      controlLabel({ type: "demo", text: "Password visible" }),
      false,
    );
    return (
      <InputGroup scale={scale}>
        <InputCore
          className={coreElementStateClasses}
          type={passwordVisible ? "text" : "password"}
          defaultValue="password"
        />
        <InputAddon
          as="button"
          className={addonElementStateClasses}
          onClick={() => {
            setPasswordVisible(x => !x);
          }}>
          {passwordVisible ? <EyeOff size="1em" /> : <Eye size="1em" />}
        </InputAddon>
      </InputGroup>
    );
  },
  "Select dropdown"() {
    const [scale] = useScale();
    const elementStateClasses = useElementStateClasses();
    return (
      <Input as="select" scale={scale} className={elementStateClasses}>
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
    const elementStateClasses = useElementStateClasses();
    return (
      <InputGroup scale={scale}>
        <InputAddon>addon</InputAddon>
        <InputCore as="select" className={elementStateClasses}>
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
    const elementStateClasses = useElementStateClasses();
    return (
      <Input as="select" size={5} scale={scale} className={elementStateClasses}>
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
    const elementStateClasses = useElementStateClasses();
    return (
      <InputGroup scale={scale}>
        <InputAddon>addon</InputAddon>
        <InputCore as="select" size={5} className={elementStateClasses}>
          {[...Array(5).keys()].map(i => (
            <InputOption key={i}>Option {i + 1}</InputOption>
          ))}
        </InputCore>
        <InputAddon>addon</InputAddon>
      </InputGroup>
    );
  },
  ...inputTypes(
    "date",
    "time",
    "datetime-local",
    "week",
    "month",
    "url",
    "email",
    "tel",
    "search",
    "text",
    "number",
    "password",
  ),
};
