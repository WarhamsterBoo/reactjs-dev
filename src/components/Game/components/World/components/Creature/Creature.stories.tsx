import React from "react";
import { Creature } from "./Creature";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default { title: "Creature component", decorators: [withKnobs] };

export const CreatureStory: React.FC<{}> = () => {
  const isAlive = boolean("Creature is alive", false);
  return <Creature IsAlive={isAlive} />;
};
