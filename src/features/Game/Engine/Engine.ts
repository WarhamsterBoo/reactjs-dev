import { ALIVE, DEAD, Population } from "@/features/Game/gameStore";

const numberOfAliveNeighbours = (
  creatures: Population,
  x: number,
  y: number
): number => {
  let alive = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (creatures[i] && creatures[i][j]?.isAlive) {
        alive++;
      }
    }
  }

  return creatures[x] && creatures[x][y]?.isAlive ? alive - 1 : alive;
};

export const Engine = {
  firstGeneration: (
    x: number,
    y: number,
    fillngPercentage: number
  ): Population => {
    return [];
  },
  nextGeneration(creatures: Population): Population {
    return creatures?.map((row, x) =>
      row.map((value, y) => {
        const aliveCreatures = numberOfAliveNeighbours(creatures, x, y);
        if (value.isAlive && (aliveCreatures == 2 || aliveCreatures == 3)) {
          return ALIVE;
        }
        return DEAD;
      })
    );
  },
};
