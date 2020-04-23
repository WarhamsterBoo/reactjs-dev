import React from "react";
import { World } from "./components";
import { Game } from "./Game";

export default { title: "Game component" };

export const GameStory: React.FC<{}> = () => {
  return <Game xDimension={5} yDimension={5} world={World} />;
};
