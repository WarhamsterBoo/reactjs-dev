import styled from "@emotion/styled";
import React from "react";
import { BaseCreature, DeadCreature, AliveCreature } from "./Creature.styled";

export interface CreatureProps {
  IsAlive: boolean;
}

export const Creature: React.FC<CreatureProps> = ({ IsAlive }) => {
  const CreatureType = styled.button`
    ${BaseCreature};
    ${IsAlive ? AliveCreature : DeadCreature}
  `;

  return <CreatureType />;
};
