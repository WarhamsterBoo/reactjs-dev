import React from "react";
import { World } from "..";
import { GameCore } from "./GameCore";
import { withKnobs, number } from "@storybook/addon-knobs";
import { Engine } from "../Engine";

export default { title: "Game component", decorators: [withKnobs] };

export const GameStory: React.FC<{}> = () => {
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
