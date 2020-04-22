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

export interface WorldCreature {
  xCoordinate: number;
  yCoordinate: number;
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
      .map(
        (_, i) =>
          Array(yDimension)
            .fill({})
            .map((_, j) => ({ xCoordinate: 0, yCoordinate: 0, IsAlive: false })) // TODO fix error through test
      )
  );
  const f = (x: number, y: number) => {
    console.log(x, ":", y);

    setCreatures((prevState) => {
      var t = [...prevState];
      t[x][y].IsAlive = !prevState[x][y].IsAlive;
      return t;
    });
  };
  const World = world;
  return <World creatures={creatures} onClick={f} />;
};
