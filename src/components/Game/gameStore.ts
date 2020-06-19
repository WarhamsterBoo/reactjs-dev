import { twoDimArrayGenerator, resizeTwoDimArray } from "@/utils/arrayUtils";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  settings: GameSettings;
  creatures: WorldCreature[][];
}

const initialState: GameState = {
  settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
  creatures: twoDimArrayGenerator(10, 10, { isAlive: false }),
};

const generateRandomCreatures = ({
  xDimension,
  yDimension,
  fillingPercentage,
}: GameSettings): WorldCreature[][] => {
  const creatures = twoDimArrayGenerator<WorldCreature>(
    xDimension,
    yDimension,
    {
      isAlive: false,
    }
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
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    generateNewCreatures: (state, _: AnyAction) => {
      state.creatures = generateRandomCreatures(state.settings);
    },
    changeSettingsTo: (state, action: PayloadAction<GameSettings>) => {
      if (action.payload.fillingPercentage > 1) {
        throw "FillingPercentage cannot be greater than 1";
      }
      if (action.payload.fillingPercentage < 0) {
        throw "FillingPercentage cannot be less than 0";
      }

      if (
        state.settings.fillingPercentage != action.payload.fillingPercentage
      ) {
        state.creatures = generateRandomCreatures(action.payload);
      }

      if (
        state.settings.xDimension != action.payload.xDimension ||
        state.settings.yDimension != action.payload.yDimension
      ) {
        state.creatures = resizeTwoDimArray(
          state.creatures,
          action.payload.xDimension,
          action.payload.yDimension,
          { isAlive: false }
        );
      }
      state.settings = action.payload;
    },
    stop: () => ({ ...initialState }),
  },
});
