import React from "react";
import { Creature } from "./components";
import { WorldWrapper } from "./World.styled";

export interface CreatureState {
  xCoordinate: number;
  yCoordinate: number;
  IsAlive: boolean;
}

export interface WorldProps {
  creatures: CreatureState[][];
  onClick: () => void;
}

export const World: React.FC<WorldProps> = ({ creatures, onClick }) => {
  if (creatures.length == 0 || creatures[0].length == 0) {
    return null;
  }

  return (
    <WorldWrapper>
      {creatures.map((row, y) => [
        ...row.map((creature, x) => (
          <Creature
            key={`{${x}${y}}`}
            x={creature.xCoordinate}
            y={creature.yCoordinate}
            IsAlive={creature.IsAlive}
            onClick={onClick}
          />
        )),
        <br key={`${y}`} />,
      ])}
    </WorldWrapper>
  );
};
