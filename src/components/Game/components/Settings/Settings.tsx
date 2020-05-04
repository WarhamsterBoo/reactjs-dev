import React, { useCallback } from "react";
import { InputNumber } from ".";
import { SettingsContainer } from "./Settings.styled";

export interface SettingsProps {
  onSubmit: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onSubmit }) => {
  const onHandleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <SettingsContainer>
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
    </SettingsContainer>
  );
};
