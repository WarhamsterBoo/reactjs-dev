import React from "react";
import { StyledInput } from "./Input.styled";

export const InputNumber: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return <StyledInput type="number" min="1" max="100" {...props} />;
};

InputNumber.displayName = "InputNumber";

export const InputText: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return <StyledInput type="text" {...props} />;
};

InputText.displayName = "InputText";
