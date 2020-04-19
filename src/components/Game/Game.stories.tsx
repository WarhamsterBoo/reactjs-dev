import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { Game } from "./Game";

export default { title: "Hello component", decorators: [withKnobs] };

export const HelloStory: React.FC<{}> = () => {
  return <Game />;
};
