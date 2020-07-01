import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery, select } from "redux-saga/effects";
import { GameSettings, gameStore } from "./gameStore";
import { settingsSelector } from "./gameStoreSelectors";

export function* changeSettings(action: PayloadAction<GameSettings>) {
  const settings = action.payload;
  if (settings.fillingPercentage >= 0 && settings.fillingPercentage <= 1) {
    const currentSettings = yield select(settingsSelector);
    yield put(gameStore.actions.saveSettings(action.payload));
    yield put(gameStore.actions.resizeCreatures);
  }
}

export function* gameSaga() {
  yield takeEvery(gameStore.actions.changeSettingsTo, changeSettings);
}
