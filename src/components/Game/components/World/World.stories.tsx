import React from "react";
import { World, CreatureState } from "./World";
import { withKnobs, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default { title: "World component", decorators: [withKnobs] };

export const WorldStory: React.FC<{}> = () => {
  const creatures: CreatureState[][] = object("Creatures", [
    [{ isAlive: true }, { isAlive: true }, { isAlive: true }],
    [{ isAlive: true }, { isAlive: false }, { isAlive: false }],
    [{ isAlive: true }, { isAlive: true }, { isAlive: false }],
  ]);

  return <World creatures={creatures} onClick={action("button-click")} />;
};
