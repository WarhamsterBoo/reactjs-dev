import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameSettings = {
  xDimension: 10,
  yDimension: 10,
  fillingPercentage: 0,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSettingsTo: (_, action: PayloadAction<GameSettings>) => ({
      ...action.payload,
      fillingPercentage: action.payload.fillingPercentage / 100,
    }),
    stop: () => initialState,
  },
});
