import React from "react";
import { render } from "react-dom";
import { GameCore, World } from "./components";
import { Engine } from "./components/Game/components/Engine/Engine";

render(
  <GameCore
    xDimension={5}
    yDimension={5}
    fillingPercentage={0}
    world={World}
    engine={Engine}
  />,
  document.getElementById("root")
);
