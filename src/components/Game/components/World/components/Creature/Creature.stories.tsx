import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { Creature } from "./Creature";

export default { title: "Creature component", decorators: [withKnobs] };

export const CreatureStory: React.FC<{}> = () => {
  const isAlive = boolean("Creature is alive", false);
  return <Creature IsAlive={isAlive} onClick={action("button-click")} />;
};
