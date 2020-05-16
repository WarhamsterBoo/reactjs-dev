import React from "react";
import {
  ControlPanel,
  Engine,
  GameCore,
  SettingsForm,
  World,
} from "./components";
import { GameWrapper } from "./Game.styled";
import { useGame } from "./useGame";

export const Game: React.FC<{}> = () => {
  const [gameSettings, onSettingsSubmit] = useGame();
  return (
    <GameWrapper>
      <SettingsForm onSettingsSubmit={onSettingsSubmit} />
      <GameCore settings={gameSettings} world={World} engine={Engine} />
      <ControlPanel onControlButtonClick={() => {}} />
    </GameWrapper>
  );
};
