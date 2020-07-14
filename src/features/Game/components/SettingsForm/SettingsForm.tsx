import { Button, InputNumber, Label } from "@/components";
import React, { FormEvent, useCallback, useState } from "react";
import { FieldSet, Form, Legend } from "./SettingsForm.styled";

interface Settings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export interface SettingsFormProps {
  gameSettings: Settings;
  onSettingsSubmit: (settings: Settings) => void;
  applySettings?: () => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  gameSettings,
  onSettingsSubmit,
  applySettings
}) => {
  const [settings, setSettings] = useState<Settings>({
    ...gameSettings,
    fillingPercentage: Math.round(gameSettings.fillingPercentage * 100),
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
      onSettingsSubmit({
        ...settings,
        fillingPercentage: settings.fillingPercentage / 100,
      });
      if (applySettings) applySettings();
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
            min="0"
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
