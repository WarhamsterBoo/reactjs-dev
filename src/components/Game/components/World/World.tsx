import React from "react";
import { Creature } from "./components";
import { WorldWrapper } from "./World.styled";

export interface CreatureState {
  IsAlive: boolean;
}

export interface WorldProps {
  creatures: CreatureState[][];
}

export const World: React.FC<WorldProps> = ({ creatures }) => {
  if (creatures.length == 0 || creatures[0].length == 0) {
    return null;
  }

  return (
    <WorldWrapper>
      {creatures.map((row, y) => [
        ...row.map((creature, x) => (
          <Creature key={`{${x}${y}}`} IsAlive={creature.IsAlive} />
        )),
        <br key={`${y}`} />,
      ])}
    </WorldWrapper>
  );
};
