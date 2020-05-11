import React from "react";
import { render } from "react-dom";
import { Game, World } from "./components";
import { Engine } from "./components/Game/Engine";

render(
  <Game
    xDimension={5}
    yDimension={5}
    fillingPercentage={0}
    world={World}
    engine={Engine}
  />,
  document.getElementById("root")
);
