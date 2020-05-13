import React from "react";
import { Engine, GameCore, World } from "./components";

export const Game: React.FC<{}> = () => {
  return (
    <GameCore
      xDimension={10}
      yDimension={10}
      fillingPercentage={0}
      world={World}
      engine={Engine}
    />
  );
};
