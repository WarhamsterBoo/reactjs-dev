import React from "react";
import { Cell } from "./components";
import { WorldWrapper } from "./World.styled";

export interface WorldCreature {
  isAlive: boolean;
}

export interface WorldProps {
  creatures: WorldCreature[][];
  onClick: (x: number, y: number) => void;
}

export const World: React.FC<WorldProps> = ({ creatures, onClick }) => {
  if (creatures.length == 0 || creatures[0].length == 0) {
    return null;
  }

  return (
    <WorldWrapper>
      {creatures.map((row, y) => [
        ...row.map((creature, x) => (
          <Cell
            key={`{${y}${x}}`}
            x={y}
            y={x}
            hasAliveCreature={creature.isAlive}
            onClick={onClick}
          />
        )),
        <br key={`${y}`} />,
      ])}
    </WorldWrapper>
  );
};
