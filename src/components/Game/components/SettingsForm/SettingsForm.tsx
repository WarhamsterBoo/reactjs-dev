import React, { useCallback, useState, FormEvent } from "react";
import { InputNumber } from ".";
import { InputsContainer } from "./SettingsForm.styled";

export interface SettingsFormProps {
  onSubmit: () => void;
}

export interface Settings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {
  const [settings, setSettings] = useState({
    xDimension: 0,
    yDimension: 0,
    fillingPercentage: 0,
  });

  const onHandleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { name, value } = ev.target as HTMLInputElement;
    console.log("###", name, value);

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value),
    }));
  }, []);

  return (
    <InputsContainer>
      <form onSubmit={onHandleSubmit}>
        <fieldset>
          <legend>Game settings</legend>
          <label>
            X dimension:
            <InputNumber
              value={settings.xDimension}
              onChange={onHandleInputChange}
              name="xDimension"
            />
          </label>
          <label>
            Y dimension:
            <InputNumber
              value={settings.yDimension}
              onChange={onHandleInputChange}
              name="yDimension"
            />
          </label>
          <label>
            Filling Percentage:
            <InputNumber
              value={settings.fillingPercentage}
              onChange={onHandleInputChange}
              name="fillingPercentage"
            />
          </label>
          <button>Apply</button>
        </fieldset>
      </form>
    </InputsContainer>
  );
};
