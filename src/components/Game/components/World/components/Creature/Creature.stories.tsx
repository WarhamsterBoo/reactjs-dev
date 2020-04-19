import React from "react";
import { Creature } from "./Creature";

export default { title: "Creature component" };

export const DeadCreature: React.FC<{}> = () => {
  return <Creature Id={1} IsAlive={false} />;
};

export const AliveCreature: React.FC<{}> = () => {
  return <Creature Id={1} IsAlive={true} />;
};
