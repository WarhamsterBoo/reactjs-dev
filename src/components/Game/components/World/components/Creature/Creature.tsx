import styled from "@emotion/styled";
import React from "react";
import { AliveCreature, BaseCreature, DeadCreature } from "./Creature.styled";

export interface CreatureProps {
  x: number;
  y: number;
  IsAlive: boolean;
  onClick: (x: number, y: number) => void;
}

export const Creature: React.FC<CreatureProps> = ({
  x,
  y,
  IsAlive,
  onClick,
}) => {
  const Creature = styled.button`
    ${BaseCreature};
    ${IsAlive ? AliveCreature : DeadCreature}
  `;

  return <Creature onClick={() => onClick(x, y)} />;
};
