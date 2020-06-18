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
    generateCreatures: (state, action: AnyAction) => ({
      ...state,
      creatures: [],
    }),
    changeSettingsTo: (state, action: PayloadAction<GameSettings>) => ({
      ...state,
      settings: {
        ...action.payload,
        fillingPercentage: action.payload.fillingPercentage / 100,
      },
    }),
    stop: () => ({ ...initialState }),
  },
});
