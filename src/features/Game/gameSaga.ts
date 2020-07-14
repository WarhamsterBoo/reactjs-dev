import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery, select, fork, take } from "redux-saga/effects";
import { GameSettings, gameStore } from "./gameStore";
import { settingsSelector } from "./gameStoreSelectors";

export function* changeSettings(action: PayloadAction<GameSettings>) {
  const newSettings = action.payload;
  if (
    newSettings.fillingPercentage >= 0 &&
    newSettings.fillingPercentage <= 1
  ) {
    const oldSettings: GameSettings = yield select(settingsSelector);

    yield put(gameStore.actions.saveSettings(newSettings));

    if (oldSettings.fillingPercentage != newSettings.fillingPercentage) {
      yield put(gameStore.actions.generateNewCreatures());
    } else if (
      oldSettings.xDimension != newSettings.xDimension ||
      oldSettings.yDimension != newSettings.yDimension
    ) {
      yield put(gameStore.actions.resizeCreatures());
    }
  }
}

export function* watchSettingChange() {
  while (true) {
    const oldSettings: GameSettings = yield select(settingsSelector);
    yield take(gameStore.actions.applySettings.type);
    const newSettings: GameSettings = yield select(settingsSelector);
    if (newSettings.fillingPercentage < 0 || newSettings.fillingPercentage > 1)
      continue;

    if (oldSettings.fillingPercentage != newSettings.fillingPercentage) {
      yield put(gameStore.actions.generateNewCreatures());
    } else if (
      oldSettings.xDimension != newSettings.xDimension ||
      oldSettings.yDimension != newSettings.yDimension
    ) {
      yield put(gameStore.actions.resizeCreatures());
    }
  }
}

export function* gameSaga() {
  yield fork(watchSettingChange);
  yield takeEvery(gameStore.actions.changeSettingsTo, changeSettings);
}
