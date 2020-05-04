import { action } from "@storybook/addon-actions";
import React from "react";
import { InputNumber } from "./InputNumber";
import { InputText } from "./InputText";

export default { title: "Input components" };

export const InputNumberStory: React.FC<{}> = () => {
  return <InputNumber onChange={action("onChange")} />;
};

export const InputTextStory: React.FC<{}> = () => {
  return <InputText onChange={action("onChange")} />;
};
