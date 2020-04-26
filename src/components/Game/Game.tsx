import React, { useState } from "react";

export interface GameProps {
  xDimension: number;
  yDimension: number;
  world: WorldPresenter;
}

export type WorldPresenter = React.FC<{
  creatures: WorldCreature[][];
  onClick: (x: number, y: number) => void;
}>;

interface WorldCreature {
  IsAlive: boolean;
}

export const Game: React.FC<GameProps> = ({
  xDimension,
  yDimension,
  world,
}) => {
  const [creatures, setCreatures] = useState(
    Array.from({ length: xDimension }).map(() =>
      Array.from({ length: yDimension }).map(() => ({ IsAlive: false }))
    )
  );
  const onClickCallback = (x: number, y: number) => {
    setCreatures((prevState) => {
      const newState = prevState.map((row, _) =>
        row.map((value, _) => ({
          IsAlive: value.IsAlive,
        }))
      );
      newState[x][y].IsAlive = !prevState[x][y].IsAlive;
      return newState;
    });
  };
  const World = world;

  return <World creatures={creatures} onClick={onClickCallback} />;
};
