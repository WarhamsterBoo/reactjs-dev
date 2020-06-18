import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

const CHANGE = "game/settings/CHANGE";

export const changeSettings = createAction<GameSettings>(CHANGE);

const initialState: GameSettings = {
  xDimension: 10,
  yDimension: 10,
  fillingPercentage: 0,
};

export default createReducer<GameSettings>(initialState, {
  [changeSettings.type]: (_, action: PayloadAction<GameSettings>) => {
    return {
      ...action.payload,
      fillingPercentage: action.payload.fillingPercentage / 100,
    };
  },
});
