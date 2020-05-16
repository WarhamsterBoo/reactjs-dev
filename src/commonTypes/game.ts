import { WorldCreature } from "./creature";

export interface GameEngine {
  GenerateCreatures: (settings: GameSettings) => WorldCreature[][];
}

export type WorldPresenter = React.FC<{
  creatures: WorldCreature[][];
  onClick: (x: number, y: number) => void;
}>;

export interface GameSettings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}
