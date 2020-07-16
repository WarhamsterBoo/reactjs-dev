import { matrixGenerator, resizeMatrix } from "@/utils/arrayUtils";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Creature {
  isAlive: boolean;
}

export const ALIVE: Creature = {
  isAlive: true,
};

export const DEAD: Creature = {
  isAlive: false,
};

export type Population = Creature[][];

export interface GameSettings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export interface GameState {
  settings: GameSettings;
  creatures: Population;
}

export interface CreatureCoordinates {
  x: number;
  y: number;
}

const initialState: GameState = {
  settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
  creatures: matrixGenerator(10, 10, DEAD),
};

const generateRandomCreatures = ({
  xDimension,
  yDimension,
  fillingPercentage,
}: GameSettings): Population => {
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
};

const changeCreaturesSize = (
  creatures: Population,
  xDimension: number,
  yDimension: number
): Creature[][] => {
  return resizeMatrix(creatures, xDimension, yDimension, DEAD);
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    applySettings: (state, _: AnyAction) => state,
    changeSettings: (state, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
    },
    resizeCreatures: (state, _: AnyAction) => {
      state.creatures = changeCreaturesSize(
        state.creatures,
        state.settings.xDimension,
        state.settings.yDimension
      );
    },
    generateNewCreatures: (state, _: AnyAction) => {
      state.creatures = generateRandomCreatures(state.settings);
    },
    toggleCreatureState: (
      state,
      action: PayloadAction<CreatureCoordinates>
    ) => {
      const { x, y } = action.payload;
      state.creatures = state.creatures.map((row, rowIndex) => {
        if (rowIndex == x) {
          return row.map((value, inRowIndex) => ({
            isAlive: inRowIndex == y ? !value.isAlive : value.isAlive,
          }));
        }
        return row;
      });
    },
    stop: () => ({ ...initialState }),
  },
});
