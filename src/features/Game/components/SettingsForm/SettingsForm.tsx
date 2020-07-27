import { Button, InputNumber, Label } from "@/components";
import { GameSettings } from "@/features/Game/gameStore";
import React, { FormEvent, useCallback } from "react";
import { FieldSet, Form, Legend } from "./SettingsForm.styled";

export interface SettingsFormProps {
  gameSettings: GameSettings;
  applySettings: () => void;
  onSettingsChange: (settings: GameSettings) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  gameSettings,
  applySettings,
  onSettingsChange,
}) => {
  const onHandleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      applySettings();
    },
    [applySettings]
  );

  const onHandleInputChange = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      const { name, value } = ev.target as HTMLInputElement;
      const settingValue =
        name === "fillingPercentage" ? parseInt(value) / 100 : parseInt(value);
      onSettingsChange({ ...gameSettings, [name]: settingValue });
    },
    [onSettingsChange, gameSettings]
  );

  return (
    <Form onSubmit={onHandleSubmit}>
      <FieldSet>
        <Legend>Game settings</Legend>
        <Label>
          X dimension:
          <InputNumber
            value={gameSettings.xDimension}
            onChange={onHandleInputChange}
            name="xDimension"
          />
        </Label>
        <Label>
          Y dimension:
          <InputNumber
            value={gameSettings.yDimension}
            onChange={onHandleInputChange}
            name="yDimension"
          />
        </Label>
        <Label>
          Filling Percentage:
          <InputNumber
            min="0"
            value={Math.floor(gameSettings.fillingPercentage * 100)}
            onChange={onHandleInputChange}
            name="fillingPercentage"
          />
        </Label>
        <Button>Apply</Button>
      </FieldSet>
    </Form>
  );
};
