import React from "react";
import { World, CreatureState } from "./World";
import { withKnobs, object } from "@storybook/addon-knobs";

export default { title: "World component", decorators: [withKnobs] };

export const WorldStory: React.FC<{}> = () => {
  const creatures: CreatureState[][] = object("Creatures", [
    [{ IsAlive: true }, { IsAlive: true }, { IsAlive: true }],
    [{ IsAlive: true }, { IsAlive: false }, { IsAlive: false }],
    [{ IsAlive: true }, { IsAlive: true }, { IsAlive: false }],
  ]);
  return <World creatures={creatures} />;
};
