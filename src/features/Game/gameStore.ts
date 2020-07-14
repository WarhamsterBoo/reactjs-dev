import { matrixGenerator, resizeMatrix } from "@/utils/arrayUtils";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorldCreature {
  isAlive: boolean;
}

export interface GameSettings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
}

export interface GameState {
  settings: GameSettings;
  creatures: WorldCreature[][];
}

export interface CreatureCoordinates {
  x: number;
  y: number;
}

const initialState: GameState = {
  settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
  creatures: matrixGenerator(10, 10, { isAlive: false }),
};

const generateRandomCreatures = ({
  xDimension,
  yDimension,
  fillingPercentage,
}: GameSettings): WorldCreature[][] => {
  const creatures = matrixGenerator<WorldCreature>(xDimension, yDimension, {
    isAlive: false,
  });

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
  creatures: WorldCreature[][],
  xDimension: number,
  yDimension: number
): WorldCreature[][] => {
  return resizeMatrix(creatures, xDimension, yDimension, {
    isAlive: false,
  });
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    applySettings: (state, _: AnyAction) => state,
    saveSettings: (state, action: PayloadAction<GameSettings>) => {
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
    changeSettingsTo: (state, _: PayloadAction<GameSettings>) => state,
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
