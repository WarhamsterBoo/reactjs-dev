import {
  ControlAction,
  ControlPanel,
  CreatureCoordinates,
  GameSettings,
  Population,
  SettingsForm,
  World,
} from "@/features/Game";
import React, { useCallback } from "react";
import { GameFieldWrapper } from "./GameField.styled";

interface GameFieldProps {
  settings: GameSettings;
  onControlActionClick: (action: ControlAction) => void;
  creatures: Population;
  toggleCreatureState: (coordinates: CreatureCoordinates) => void;
  applySettings: () => void;
  onSettingsChange: (settings: GameSettings) => void;
}

export const GameField: React.FC<GameFieldProps> = ({
  settings,
  onControlActionClick,
  creatures,
  toggleCreatureState,
  applySettings,
  onSettingsChange,
}) => {
  const onCreatureClick = useCallback(
    (x: number, y: number) => toggleCreatureState({ x, y }),
    [toggleCreatureState]
  );

  return (
    <GameFieldWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsChange={onSettingsChange}
        applySettings={applySettings}
      />
      <World creatures={creatures} onClick={onCreatureClick} />
      <ControlPanel onControlButtonClick={onControlActionClick} />
    </GameFieldWrapper>
  );
};
