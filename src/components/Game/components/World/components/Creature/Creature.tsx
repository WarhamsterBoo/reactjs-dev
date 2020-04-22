import styled from "@emotion/styled";
import React from "react";
import { BaseCreature, DeadCreature, AliveCreature } from "./Creature.styled";

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
  console.log("creatire = ", x, ":", y);

  const Creature = styled.button`
    ${BaseCreature};
    ${IsAlive ? AliveCreature : DeadCreature}
  `;

  return <Creature onClick={() => onClick(x, y)} />;
};
