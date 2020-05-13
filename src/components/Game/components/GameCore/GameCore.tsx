import { WorldCreature } from "commonTypes/creature";
import { GameEngine } from "commonTypes/game";
import React, { useEffect, useState } from "react";

export interface GameCoreProps {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
  world: WorldPresenter;
  engine: GameEngine;
}

export type WorldPresenter = React.FC<{
  creatures: WorldCreature[][];
  onClick: (x: number, y: number) => void;
}>;

export const GameCore: React.FC<GameCoreProps> = ({
  xDimension,
  yDimension,
  fillingPercentage,
  world,
  engine,
}) => {
  const [creatures, setCreatures] = useState(
    engine.GenerateCreatures({ xDimension, yDimension, fillingPercentage })
  );

  useEffect(() => {
    setCreatures((prevState) =>
      Array.from({ length: xDimension }).map((_, i) =>
        Array.from({ length: yDimension }).map((_, j) => {
          return prevState[i] && prevState[i][j]
            ? prevState[i][j]
            : { IsAlive: false };
        })
      )
    );
  }, [xDimension, yDimension]);

  useEffect(
    () =>
      setCreatures(
        engine.GenerateCreatures({
          xDimension,
          yDimension,
          fillingPercentage,
        })
      ),
    [fillingPercentage]
  );

  const toggleCreatureState = (x: number, y: number) => {
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

  return <World creatures={creatures} onClick={toggleCreatureState} />;
};
