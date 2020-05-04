import { action } from "@storybook/addon-actions";
import React from "react";
import { InputNumber } from "./InputNumber";

export default { title: "Input components" };

export const InputNumberStory: React.FC<{}> = () => {
  return <InputNumber onChange={action("onChange")} />;
};
