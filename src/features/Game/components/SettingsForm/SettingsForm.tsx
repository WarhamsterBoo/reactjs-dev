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
      onSettingsChange({ ...gameSettings, [name]: parseInt(value) });
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
            max="100"
            value={gameSettings.fillingPercentage}
            onChange={onHandleInputChange}
            name="fillingPercentage"
          />
        </Label>
        <Button>Apply</Button>
      </FieldSet>
    </Form>
  );
};
