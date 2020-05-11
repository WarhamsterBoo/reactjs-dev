import { WorldCreature } from "commonTypes/creature";

export interface EngineInitConfig {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export interface GameEngine {
  GenerateCreatures: (config: EngineInitConfig) => WorldCreature[][];
}

export const Engine: GameEngine = {
  GenerateCreatures: ({ xDimension, yDimension, fillingPercentage }) => {
    const creatures = Array.from({ length: xDimension }).map(() =>
      Array.from({ length: yDimension }).map(() => {
        return { IsAlive: false };
      })
    );

    let NumberOfAliveCreatures = Math.trunc(
      xDimension * yDimension * fillingPercentage
    );

    while (NumberOfAliveCreatures > 0) {
      const x = Math.floor(Math.random() * Math.floor(xDimension));
      const y = Math.floor(Math.random() * Math.floor(yDimension));

      if (!creatures[x][y].IsAlive) {
        creatures[x][y].IsAlive = true;
        NumberOfAliveCreatures--;
      }
    }

    return creatures;
  },
};
