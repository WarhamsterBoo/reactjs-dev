import { WorldCreature } from "./creature";

export interface EngineInitConfig {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export interface GameEngine {
  GenerateCreatures: (config: EngineInitConfig) => WorldCreature[][];
}
