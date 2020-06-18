import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameSettings = {
  xDimension: 10,
  yDimension: 10,
  fillingPercentage: 0,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSettingsTo: (_, action: PayloadAction<GameSettings>) => {
      return {
        ...action.payload,
        fillingPercentage: action.payload.fillingPercentage / 100,
      };
    },
  },
});

export const { reducer, actions } = settingsSlice;
