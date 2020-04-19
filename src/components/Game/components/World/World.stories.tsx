import React from "react";
import { World, CreatureState } from "./World";
import { withKnobs, object } from "@storybook/addon-knobs";

export default { title: "World component", decorators: [withKnobs] };

export const WorldStory: React.FC<{}> = () => {
  const creatures: CreatureState[][] = object("Creatures", [
    [
      { id: 1, isAlive: true },
      { id: 2, isAlive: true },
      { id: 3, isAlive: true },
    ],
    [
      { id: 4, isAlive: true },
      { id: 5, isAlive: false },
      { id: 6, isAlive: false },
    ],
    [
      { id: 7, isAlive: true },
      { id: 8, isAlive: true },
      { id: 9, isAlive: false },
    ],
  ]);
  return <World creatures={creatures} />;
};
