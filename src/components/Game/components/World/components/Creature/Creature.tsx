import styled from "@emotion/styled";
import React from "react";
import { BaseCreature, DeadCreature, AliveCreature } from "./Creature.styled";

export interface CreatureProps {
  Id: number;
  IsAlive: boolean;
}

export const Creature: React.FC<CreatureProps> = ({ Id, IsAlive }) => {
  const CreatureItem = styled.button`
    ${BaseCreature};
    ${IsAlive ? AliveCreature : DeadCreature}
  `;

  return <CreatureItem />;
};
