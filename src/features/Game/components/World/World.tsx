import React from "react";
import { Creature } from "./components";
import { WorldWrapper } from "./World.styled";

export interface CreatureState {
  isAlive: boolean;
}

export interface WorldProps {
  creatures: CreatureState[][];
  onClick: (x: number, y: number) => void;
}

export const World: React.FC<WorldProps> = ({ creatures, onClick }) => {
  if (creatures.length == 0 || creatures[0].length == 0) {
    return null;
  }

  return (
    <WorldWrapper>
      {creatures.map((row, x) => [
        ...row.map((creature, y) => (
          <Creature
            key={`{${x}${y}}`}
            x={x}
            y={y}
            isAlive={creature.isAlive}
            onClick={onClick}
          />
        )),
        <br key={`${x}`} />,
      ])}
    </WorldWrapper>
  );
};
