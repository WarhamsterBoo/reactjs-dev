import React, { useCallback } from "react";
import { InputNumber } from "../Input";
import { SettingsContainer as FormContainer } from "./Form.styled";

export interface FormProps {
  onSubmit: () => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const onHandleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <FormContainer>
      <form onSubmit={onHandleSubmit}>
        <fieldset>
          <legend>Game settings</legend>
          <label>
            X dimension:
            <InputNumber />
          </label>
          <label>
            Y dimension:
            <InputNumber />
          </label>
          <label>
            Filling Percentage:
            <InputNumber />
          </label>
          <button>Apply</button>
        </fieldset>
      </form>
    </FormContainer>
  );
};
