import { withKnobs, number } from "@storybook/addon-knobs";
import React from "react";
import { World } from "./components";
import { Game } from "./Game";

export default { title: "Game component", decorators: [withKnobs] };

export const GameStory: React.FC<{}> = () => {
  const x = number("X", 3);
  const y = number("Y", 3);

  return <Game xDimension={x} yDimension={y} world={World} />;
};
