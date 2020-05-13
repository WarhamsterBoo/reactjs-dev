import { number, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { World } from "..";
import { Engine } from "../Engine";
import { GameCore } from "./GameCore";

export default { title: "GameCore component", decorators: [withKnobs] };

export const GameCoreStory: React.FC<{}> = () => {
  const xDimension = number("X", 5);
  const yDimension = number("Y", 5);
  const fillingPercentage = number("%", 0) / 100;

  return (
    <GameCore
      xDimension={xDimension}
      yDimension={yDimension}
      fillingPercentage={fillingPercentage}
      world={World}
      engine={Engine}
    />
  );
};
