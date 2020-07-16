import React from "react";
import { StyledCreature } from "./StyledCreature";

export interface CreatureProps {
  x: number;
  y: number;
  isAlive: boolean;
  onClick: (x: number, y: number) => void;
  transitionMs?: number;
}

export const Creature: React.FC<CreatureProps> = ({
  x,
  y,
  isAlive,
  onClick,
  transitionMs = 500,
}) => {
  return (
    <StyledCreature
      isAlive={isAlive}
      transitionMs={transitionMs}
      onClick={() => onClick(x, y)}
    />
  );
};
