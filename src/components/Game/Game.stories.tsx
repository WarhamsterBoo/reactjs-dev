import React from "react";
import { World } from "./components";
import { Game } from "./Game";
import { withKnobs, number } from "@storybook/addon-knobs";

export default { title: "Game component", decorators: [withKnobs] };

export const GameStory: React.FC<{}> = () => {
  const xDimension = number("X", 5);
  const yDimension = number("Y", 5);

  return <Game xDimension={xDimension} yDimension={yDimension} world={World} />;
};
