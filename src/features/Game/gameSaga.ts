import { cancel, delay, fork, put, select, take } from "redux-saga/effects";
import { ControlAction } from "./components";
import { GameSettings, gameStore } from "./gameStore";
import { gameSpeedSelector, settingsSelector } from "./gameStoreSelectors";

export function* watchSettingsChange() {
  while (true) {
    const oldSettings: GameSettings = yield select(settingsSelector);
    yield take(gameStore.actions.applySettings.type);
    const newSettings: GameSettings = yield select(settingsSelector);

    const fillingPercentageIsInvalid =
      newSettings.fillingPercentage < 0 || newSettings.fillingPercentage > 1;
    const fillingPercentageChanged =
      oldSettings.fillingPercentage != newSettings.fillingPercentage;
    const creturesSizeChanged =
      oldSettings.xDimension != newSettings.xDimension ||
      oldSettings.yDimension != newSettings.yDimension;

    if (fillingPercentageIsInvalid) {
      continue;
    }

    if (fillingPercentageChanged) {
      yield put(gameStore.actions.generateNewCreatures());
    } else if (creturesSizeChanged) {
      yield put(gameStore.actions.resizeCreatures());
    }
  }
}

export function* watchingControlActions() {
  while (true) {
    const controlAction: ControlAction = (yield take(
      gameStore.actions.executeControlAction.type
    )).payload;

    yield put(gameStore.actions[controlAction]());

    if (controlAction == "reset") {
      yield put(gameStore.actions.generateNewCreatures());
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
