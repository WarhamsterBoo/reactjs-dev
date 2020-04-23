import React from "react";
import { render } from "react-dom";
import { Game, World } from "./components";

render(
  <Game xDimension={5} yDimension={5} world={World} />,
  document.getElementById("root")
);
