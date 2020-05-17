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
  const {
    settings,
    onSettingsSubmit,
    onControlActionClick,
  } = useGameSettings();
  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsSubmit={onSettingsSubmit}
      />
      <GameCore settings={settings} world={World} engine={Engine} />
      <ControlPanel onControlButtonClick={onControlActionClick} />
    </GameWrapper>
  );
};
