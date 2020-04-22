import styled from "@emotion/styled";
import React from "react";
import { BaseCreature, DeadCreature, AliveCreature } from "./Creature.styled";

export interface CreatureProps {
  IsAlive: boolean;
  onClick: () => void;
}

export const Creature: React.FC<CreatureProps> = ({ IsAlive, onClick }) => {
  console.log(onClick);

  const Creature = styled.button`
    ${BaseCreature};
    ${IsAlive ? AliveCreature : DeadCreature}
  `;

  return <Creature onClick={onClick} />;
};
