import React from "react";

export const InputNumber: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props
) => {
  return <input type="number" min="1" max="100" {...props} />;
};

InputNumber.displayName = "InputNumber";
