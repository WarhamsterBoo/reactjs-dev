import React from "react";
import { render } from "react-dom";
import { Game, World } from "./components";

render(<Game x={3} y={3} world={World} />, document.getElementById("root"));
