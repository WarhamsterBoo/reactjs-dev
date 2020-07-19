import { fork, put, select, take } from "redux-saga/effects";
import { GameSettings, gameStore, GameStatus } from "./gameStore";
import { settingsSelector, gameStatusSelector } from "./gameStoreSelectors";

export function* watchSettingsChange() {
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

export function* watchingControlActions() {
  while (true) {
    yield take(gameStore.actions.executeControlAction.type);
    const gameStatus = yield select(gameStatusSelector);
    if (gameStatus == GameStatus.Stopped) {
      yield put(gameStore.actions.reset());
    } else {
      yield put(gameStore.actions.newGeneration());
    }
  }
}

export function* gameSaga() {
  yield fork(watchSettingsChange);
  yield fork(watchingControlActions);
}
