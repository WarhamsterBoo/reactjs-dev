import React from "react";
import { StyledTextInput } from "./Input.styled";

export const InputText: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return <StyledTextInput type="text" {...props} />;
};

InputText.displayName = "InputText";
