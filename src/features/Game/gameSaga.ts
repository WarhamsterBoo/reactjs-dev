import { cancel, delay, fork, put, select, take } from "redux-saga/effects";
import { ControlAction } from "./components";
import { GameSettings, gameStore } from "./gameStore";
import { gameSpeedSelector, settingsSelector } from "./gameStoreSelectors";

export function* watchSettingsChange() {
  while (true) {
    yield take(gameStore.actions.applySettings.type);
    const settings: GameSettings = yield select(settingsSelector);

    const fillingPercentageIsInvalid =
      settings.fillingPercentage < 0 || settings.fillingPercentage > 100;

    if (fillingPercentageIsInvalid) {
      continue;
    }

    yield put(gameStore.actions.generateNewCreatures());
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
