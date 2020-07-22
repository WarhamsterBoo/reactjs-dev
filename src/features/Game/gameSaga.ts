import { cancel, fork, put, select, take, delay } from "redux-saga/effects";
import { GameSettings, gameStore } from "./gameStore";
import { settingsSelector, gameSpeedSelector } from "./gameStoreSelectors";

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
    const controlAction = (yield take(
      gameStore.actions.executeControlAction.type
    )).payload;

    switch (controlAction) {
      case "run":
        yield put(gameStore.actions.run());
        break;
      case "stop":
        yield put(gameStore.actions.reset());
        break;
      case "pause":
        yield put(gameStore.actions.stop());
        break;
      case "faster":
        yield put(gameStore.actions.faster());
        break;
      case "slower":
        yield put(gameStore.actions.slower());
        break;
      case "normal":
        yield put(gameStore.actions.normal());
        break;
    }
  }
}

export function* gameLoop() {
  while (true) {
    const speed = yield select(gameSpeedSelector);
    yield put(gameStore.actions.newGeneration());
    yield delay(speed * 100);
  }
}

export function* gameFlow() {
  while (yield take(gameStore.actions.run.type)) {
    const loop = yield fork(gameLoop);

    yield take([gameStore.actions.stop.type, gameStore.actions.reset.type]);

    yield cancel(loop);
  }
}

export function* gameSaga() {
  yield fork(watchSettingsChange);
  yield fork(watchingControlActions);
  yield fork(gameFlow);
}
