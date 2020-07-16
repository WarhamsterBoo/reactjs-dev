import { ALIVE, Creature, DEAD, Population } from "@/features/Game/gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";

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
    xDimension: number,
    yDimension: number,
    fillingPercentage: number
  ): Population => {
    const creatures = matrixGenerator<Creature>(xDimension, yDimension, DEAD);

    let NumberOfAliveCreatures = Math.trunc(
      xDimension * yDimension * fillingPercentage
    );
    while (NumberOfAliveCreatures > 0) {
      const x = Math.floor(Math.random() * Math.floor(xDimension));
      const y = Math.floor(Math.random() * Math.floor(yDimension));
      if (!creatures[x][y].isAlive) {
        creatures[x][y].isAlive = true;
        NumberOfAliveCreatures--;
      }
    }

    return creatures;
  },
  nextGeneration(creatures: Population): Population {
    return creatures?.map((row, x) =>
      row.map((value, y) => {
        const aliveCreatures = numberOfAliveNeighbours(creatures, x, y);
        if (value.isAlive && (aliveCreatures == 2 || aliveCreatures == 3)) {
          return ALIVE;
        }
        if (!value.isAlive && aliveCreatures == 3) {
          return ALIVE;
        }
        return DEAD;
      })
    );
  },
};
