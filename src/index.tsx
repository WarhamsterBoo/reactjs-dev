import React from "react";
import { render } from "react-dom";
import { Game, World } from "./components";

render(
  <Game xDimension={3} yDimension={3} world={World} />,
  document.getElementById("root")
);
