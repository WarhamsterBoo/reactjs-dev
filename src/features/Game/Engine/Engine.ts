import { Population, DEAD } from "@/features/Game/gameStore";

export const Engine = {
  firstGeneration: (
    x: number,
    y: number,
    fillngPercentage: number
  ): Population => {
    return [];
  },
  nextGeneration(creatures: Population): Population {
    return creatures?.map((row) => row.map(() => DEAD));
  },
};
