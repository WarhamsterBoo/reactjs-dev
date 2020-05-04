import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import React from "react";
import { InputNumber } from "./InputNumber";

export default { title: "Input components", decorators: [withKnobs] };

export const InputNumberStory: React.FC<{}> = () => {
  const value = number("Value", 10);

  return <InputNumber value={value} onChange={action("onChange")} />;
};
