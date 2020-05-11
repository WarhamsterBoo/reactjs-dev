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
  GenerateCreatures: ({
    xDimension: xDimension,
    yDimension,
    fillingPercentage,
  }) => {
    return Array.from({ length: xDimension }).map((_, i) =>
      Array.from({ length: yDimension }).map((_, j) => {
        return { IsAlive: false };
      })
    );
  },
};
