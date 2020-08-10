import { ALIVE, Creature, DEAD, Population } from "@/features/Game/gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";

const numberOfAliveNeighbours = (
  creatures: Population,
  x: number,
  y: number
): number => {
  let alive = 0;

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (creatures[i] && creatures[i][j]?.isAlive) {
        alive++;
      }
    }
  }

  return creatures[y] && creatures[y][x]?.isAlive ? alive - 1 : alive;
};

export const Engine = {
  firstGeneration: (
    xDimension: number,
    yDimension: number,
    fillingPercentage: number
  ): Population => {
    if (fillingPercentage < 0) {
      throw new Error("fillingPercentage cannot be less than 0");
    }
    if (fillingPercentage > 100) {
      throw new Error("fillingPercentage cannot be greater than 100");
    }

    const creatures = matrixGenerator<Creature>(xDimension, yDimension, DEAD);

    const fillingFraction = fillingPercentage / 100;
    let NumberOfAliveCreatures = Math.trunc(
      xDimension * yDimension * fillingFraction
    );

    while (NumberOfAliveCreatures > 0) {
      const x = Math.floor(Math.random() * Math.floor(xDimension));
      const y = Math.floor(Math.random() * Math.floor(yDimension));
      if (!creatures[y][x].isAlive) {
        creatures[y][x].isAlive = true;
        NumberOfAliveCreatures--;
      }
    }

    return creatures;
  },
  nextGeneration(creatures: Population): Population {
    return creatures?.map((row, y) =>
      row.map((value, x) => {
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
