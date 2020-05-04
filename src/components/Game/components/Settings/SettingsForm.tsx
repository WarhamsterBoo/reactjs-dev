import React, { useCallback } from "react";
import { InputNumber } from ".";
import { InputsContainer } from "./SettingsForm.styled";

export interface SettingsFormProps {
  onSubmit: () => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {
  const onHandleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <InputsContainer>
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
    </InputsContainer>
  );
};
