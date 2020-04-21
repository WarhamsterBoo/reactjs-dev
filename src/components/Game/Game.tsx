import React from "react";

export interface GameProps {
  x: number;
  y: number;
  world: WorldPresenter;
}

export type WorldPresenter = React.FC<{
  creatures: WorldCreature[][];
}>;

export interface WorldCreature {
  IsAlive: boolean;
}

export const Game: React.FC<GameProps> = ({ x, y, world }) => {
  const creatures: WorldCreature[][] = [[{ IsAlive: true }]];
  const World = world;
  return <World creatures={creatures} />;
};
