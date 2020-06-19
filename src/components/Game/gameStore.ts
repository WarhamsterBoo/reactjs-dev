import { arrayGenerator } from "@/utils/arrayGenerator";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  settings: GameSettings;
  creatures: WorldCreature[][];
}

const initialState: GameState = {
  settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
  creatures: arrayGenerator(10, 10, { isAlive: false }),
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    generateNewCreatures: (state, _: AnyAction) => ({
      ...state,
      creatures: arrayGenerator(
        state.settings.xDimension,
        state.settings.yDimension,
        { isAlive: false }
      ),
    }),
    changeSettingsTo: (state, action: PayloadAction<GameSettings>) => {
      if (action.payload.fillingPercentage > 1) {
        throw "FillingPercentage cannot be greater than 1";
      }
      return {
        ...state,
        settings: {
          ...action.payload,
        },
      };
    },
    stop: () => ({ ...initialState }),
  },
});
