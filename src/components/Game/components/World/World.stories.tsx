import React from "react";
import { World, CreatureState } from "./World";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default { title: "World component", decorators: [withKnobs] };

export const WorldStory: React.FC<{}> = () => {
  const creatures: CreatureState[][] = object("Creatures", [
    [
      { xCoordinate: 0, yCoordinate: 0, IsAlive: true },
      { xCoordinate: 0, yCoordinate: 1, IsAlive: true },
      { xCoordinate: 0, yCoordinate: 2, IsAlive: true },
    ],
    [
      { xCoordinate: 1, yCoordinate: 0, IsAlive: true },
      { xCoordinate: 1, yCoordinate: 1, IsAlive: false },
      { xCoordinate: 1, yCoordinate: 2, IsAlive: false },
    ],
    [
      { xCoordinate: 2, yCoordinate: 0, IsAlive: true },
      { xCoordinate: 2, yCoordinate: 1, IsAlive: true },
      { xCoordinate: 2, yCoordinate: 2, IsAlive: false },
    ],
  ]);

  return <World creatures={creatures} onClick={action("button-click")} />;
};
