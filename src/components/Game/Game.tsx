import React, { useState, useEffect } from "react";
import { WorldCreature } from "commonTypes/creature";

export interface GameProps {
  xDimension: number;
  yDimension: number;
  world: WorldPresenter;
  engine: GameEngine;
}

export type WorldPresenter = React.FC<{
  creatures: WorldCreature[][];
  onClick: (x: number, y: number) => void;
}>;

export interface GameEngine {
  GenerateCreatures: (config: EngineInitConfig) => WorldCreature[][];
}

export interface EngineInitConfig {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export const Game: React.FC<GameProps> = ({
  xDimension,
  yDimension,
  world,
  engine,
}) => {
  const [creatures, setCreatures] = useState(
    engine.GenerateCreatures({ xDimension, yDimension, fillingPercentage: 0 })
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
