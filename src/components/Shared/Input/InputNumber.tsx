import React from "react";
import { StyledNumberInput } from "./Input.styled";

export const InputNumber: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return <StyledNumberInput type="number" min="1" max="100" {...props} />;
};

InputNumber.displayName = "InputNumber";
