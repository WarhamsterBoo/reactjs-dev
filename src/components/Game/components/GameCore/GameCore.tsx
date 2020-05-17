import { GameEngine, GameSettings, WorldPresenter } from "commonTypes/GameSettings";
import React, { useEffect, useState } from "react";

export interface GameCoreProps {
  settings: GameSettings;
  world: WorldPresenter;
  engine: GameEngine;
}

export const GameCore: React.FC<GameCoreProps> = ({
  settings,
  world,
  engine,
}) => {
  const [creatures, setCreatures] = useState(
    engine.GenerateCreatures(settings)
  );

  useEffect(() => {
    setCreatures((prevState) =>
      Array.from({ length: settings.xDimension }).map((_, i) =>
        Array.from({ length: settings.yDimension }).map((_, j) => {
          return prevState[i] && prevState[i][j]
            ? prevState[i][j]
            : { isAlive: false };
        })
      )
    );
  }, [settings.xDimension, settings.yDimension]);

  useEffect(() => setCreatures(engine.GenerateCreatures(settings)), [
    settings.fillingPercentage,
  ]);

  const toggleCreatureState = (x: number, y: number) => {
    setCreatures((prevState) => {
      const newState = prevState.map((row, _) =>
        row.map((value, _) => ({
          isAlive: value.isAlive,
        }))
      );
      newState[x][y].isAlive = !prevState[x][y].isAlive;
      return newState;
    });
  };
  const World = world;

  return <World creatures={creatures} onClick={toggleCreatureState} />;
};
