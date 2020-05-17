import { WorldCreature } from "./WorldCreature";

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

export type ControlAction =
  | "stop"
  | "run"
  | "pause"
  | "slower"
  | "normal"
  | "faster";
