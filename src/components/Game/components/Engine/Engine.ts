import { GameEngine } from "commonTypes/GameSettings";

export const Engine: GameEngine = {
  GenerateCreatures: ({ xDimension, yDimension, fillingPercentage }) => {
    if (fillingPercentage > 1) {
      throw "FillingPercentage cannot be greater than 1";
    }
    if (fillingPercentage < 0) {
      throw "FillingPercentage cannot be less than 0";
    }

    const creatures = Array.from({ length: xDimension }).map(() =>
      Array.from({ length: yDimension }).map(() => {
        return { isAlive: false };
      })
    );

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
};
