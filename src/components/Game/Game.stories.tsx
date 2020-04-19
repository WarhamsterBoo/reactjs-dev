import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { Game } from "./Game";

export default { title: "Game component", decorators: [withKnobs] };

export const GameStory: React.FC<{}> = () => {
  return <Game />;
};
