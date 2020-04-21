import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { World } from "./components";
import { Game } from "./Game";

export default { title: "Game component", decorators: [withKnobs] };

export const GameStory: React.FC<{}> = () => {
  return <Game x={1} y={1} world={World} />;
};
