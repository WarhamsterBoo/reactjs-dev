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
    const initialCreatures = Array.from({ length: xDimension }).map((_, i) =>
      Array.from({ length: yDimension }).map((_, j) => {
        return { IsAlive: false };
      })
    );

    const totalNumberOfCreatures = xDimension * yDimension;
    let totalNumberOfAliveCreatures = Math.trunc(
      totalNumberOfCreatures * fillingPercentage
    );

    while (totalNumberOfAliveCreatures > 0) {
      const x = Math.floor(Math.random() * Math.floor(xDimension));
      const y = Math.floor(Math.random() * Math.floor(yDimension));

      if (!initialCreatures[x][y].IsAlive) {
        initialCreatures[x][y].IsAlive = true;
        totalNumberOfAliveCreatures--;
      }
    }

    return initialCreatures;
  },
};
