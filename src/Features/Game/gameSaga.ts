import { takeEvery, put } from "redux-saga/effects";
import { gameStore, GameSettings } from "./gameStore";
import { PayloadAction } from "@reduxjs/toolkit";

export function* changeSettings(action: PayloadAction<GameSettings>) {
  const settings = action.payload;
  if (settings.fillingPercentage >= 0 && settings.fillingPercentage <= 1) {
    yield put(gameStore.actions.saveSettings(action.payload));
  }
}

export function* gameSaga() {
  yield takeEvery(gameStore.actions.changeSettingsTo, changeSettings);
}
