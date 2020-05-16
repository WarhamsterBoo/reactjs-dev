import React from "react";
import {
  ControlPanel,
  Engine,
  GameCore,
  SettingsForm,
  World,
} from "./components";
import { GameWrapper } from "./Game.styled";
import { useGameSettings } from "./useGameSettings";

export const Game: React.FC<{}> = () => {
  const [gameSettings, onSettingsSubmit] = useGameSettings();
  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={gameSettings}
        onSettingsSubmit={onSettingsSubmit}
      />
      <GameCore settings={gameSettings} world={World} engine={Engine} />
      <ControlPanel onControlButtonClick={() => {}} />
    </GameWrapper>
  );
};
