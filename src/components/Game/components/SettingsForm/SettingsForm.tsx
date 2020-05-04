import React, { FormEvent, useCallback, useState } from "react";
import { Button, InputNumber } from "shared/";
import { FormWrapper } from "./SettingsForm.styled";

export interface SettingsFormProps {
  onSubmit: (settings: Settings) => void;
}

export interface Settings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {
  const [settings, setSettings] = useState<Settings>({
    xDimension: 0,
    yDimension: 0,
    fillingPercentage: 0,
  });

  const onHandleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      onSubmit({ ...settings });
    },
    [onSubmit, settings]
  );

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { name, value } = ev.target as HTMLInputElement;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value),
    }));
  }, []);

  return (
    <FormWrapper>
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
          <Button>Apply</Button>
        </fieldset>
      </form>
    </FormWrapper>
  );
};
