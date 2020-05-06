import React, { FormEvent, useCallback, useState } from "react";
import { Button, InputNumber, Label } from "shared";
import { FieldSet, Form, Legend } from "./SettingsForm.styled";

export interface SettingsFormProps {
  onSettingsSubmit: (settings: Settings) => void;
}

export interface Settings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  onSettingsSubmit,
}) => {
  const [settings, setSettings] = useState<Settings>({
    xDimension: 0,
    yDimension: 0,
    fillingPercentage: 0,
  });

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { name, value } = ev.target as HTMLInputElement;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: parseInt(value),
    }));
  }, []);

  const onHandleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      onSettingsSubmit({ ...settings });
    },
    [onSettingsSubmit, settings]
  );

  return (
    <Form onSubmit={onHandleSubmit}>
      <FieldSet>
        <Legend>Game settings</Legend>
        <Label>
          X dimension:
          <InputNumber
            value={settings.xDimension}
            onChange={onHandleInputChange}
            name="xDimension"
          />
        </Label>
        <Label>
          Y dimension:
          <InputNumber
            value={settings.yDimension}
            onChange={onHandleInputChange}
            name="yDimension"
          />
        </Label>
        <Label>
          Filling Percentage:
          <InputNumber
            value={settings.fillingPercentage}
            onChange={onHandleInputChange}
            name="fillingPercentage"
          />
        </Label>
        <Button>Apply</Button>
      </FieldSet>
    </Form>
  );
};