import { fork, put, select, take } from "redux-saga/effects";
import { GameSettings, gameStore } from "./gameStore";
import { settingsSelector } from "./gameStoreSelectors";

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

// export function* looper2() {
//   while (true) {
//     const state: AppState = yield select();
//     console.warn("!!!", state.game.settings.speed);
//     yield put(gameStore.actions.newGeneration())
//     yield delay(state.game.settings.speed * 100)
//   }
// }

// export function* looper() {
//   while (yield take(gameStore.actions.run.type)) {

//     const bgt = yield fork(looper2)

//     yield take([gameStore.actions.stop.type, gameStore.actions.reset.type])

//     yield cancel(bgt)
//   }
// }

export function* gameSaga() {
  yield fork(watchSettingsChange);
  yield fork(watchingControlActions);
  // yield fork(looper)
}
