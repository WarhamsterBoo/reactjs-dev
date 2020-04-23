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
    Array(xDimension)
      .fill([])
      .map(() =>
        Array(yDimension)
          .fill({})
          .map(() => ({ IsAlive: false }))
      )
  );
  const onClickCallback = (x: number, y: number) => {
    setCreatures((prevState) => {
      var result = [...prevState];
      result[x][y].IsAlive = !prevState[x][y].IsAlive;
      return [...prevState];
    });
  };
  const World = world;

  return <World creatures={creatures} onClick={onClickCallback} />;
};
