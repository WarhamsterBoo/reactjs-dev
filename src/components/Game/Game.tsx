import React from "react";
import {
  ControlPanel,
  Engine,
  GameCore,
  SettingsForm,
  World,
} from "./components";
import { GameWrapper } from "./Game.styled";

export const Game: React.FC<{}> = () => {
  return (
    <GameWrapper>
      <SettingsForm onSettingsSubmit={() => {}} />
      <GameCore
        xDimension={10}
        yDimension={10}
        fillingPercentage={0}
        world={World}
        engine={Engine}
      />
      <ControlPanel onClick={() => {}} />
    </GameWrapper>
  );
};
