import { action } from "@storybook/addon-actions";
import { object, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { World, WorldCreature } from "./World";

export default { title: "World component", decorators: [withKnobs] };

export const WorldStory: React.FC<{}> = () => {
  const creatures: WorldCreature[][] = object("Creatures", [
    [{ isAlive: true }, { isAlive: true }, { isAlive: true }],
    [{ isAlive: true }, { isAlive: false }, { isAlive: false }],
    [{ isAlive: true }, { isAlive: true }, { isAlive: false }],
  ]);

  return <World creatures={creatures} onClick={action("button-click")} />;
};
