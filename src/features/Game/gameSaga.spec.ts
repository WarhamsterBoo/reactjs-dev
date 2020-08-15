import { createMockTask } from "@redux-saga/testing-utils";
import { testSaga } from "redux-saga-test-plan";
import {
  gameFlow,
  gameLoop,
  watchingControlActions,
  watchSettingsChange,
  gameSaga,
} from "./gameSaga";
import { gameStore } from "./gameStore";
import { gameSpeedSelector, settingsSelector } from "./gameStoreSelectors";

describe("game saga", () => {
  describe("watchSettingChange", () => {
    it("should not apply settings if fillingPercentage > 100", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 150, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type);
    });

    it("should not apply settings if fillingPercentage < 0", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: -10, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type);
    });

    it.each`
      fillingPercentage
      ${0}
      ${100}
      ${50}
    `(
      "should generate new creatures on apply settings",
      ({ fillingPercentage }) => {
        const sut = testSaga(watchSettingsChange);

        sut
          .next()
          .take(gameStore.actions.applySettings().type)
          .next()
          .select(settingsSelector)
          .next({
            fillingPercentage,
            xDimension: 2,
            yDimension: 2,
          })
          .put(gameStore.actions.generateNewCreatures())
          .next()
          .take(gameStore.actions.applySettings().type);
      }
    );
  });

  describe("watchingControlActions", () => {
    it.each`
      controlAction | storeAction
      ${"run"}      | ${() => gameStore.actions.run()}
      ${"pause"}    | ${() => gameStore.actions.pause()}
      ${"faster"}   | ${() => gameStore.actions.faster()}
      ${"slower"}   | ${() => gameStore.actions.slower()}
      ${"normal"}   | ${() => gameStore.actions.normal()}
    `(
      "should dispatch corresponding actions on $controlAction",
      ({ controlAction, storeAction }) => {
        const sut = testSaga(watchingControlActions);

        sut
          .next()
          .take(gameStore.actions.executeControlAction(controlAction).type)
          .next({ payload: controlAction })
          .put(storeAction())
          .next(gameStore.actions.executeControlAction(controlAction).type);
      }
    );

    it("should dispatch reset and generateNewCreatures actions on reset", () => {
      const sut = testSaga(watchingControlActions);

      sut
        .next()
        .take(gameStore.actions.executeControlAction("reset").type)
        .next({ payload: "reset" })
        .put(gameStore.actions.reset())
        .next()
        .put(gameStore.actions.generateNewCreatures())
        .next()
        .take(gameStore.actions.executeControlAction("reset").type);
    });
  });

  describe("game flow", () => {
    it("gameFlow should run gameLoop", () => {
      const sut = testSaga(gameFlow);
      const loop = createMockTask();

      sut
        .next()
        .take(gameStore.actions.run().type)
        .next(true)
        .fork(gameLoop)
        .next(loop)
        .take([gameStore.actions.pause().type, gameStore.actions.reset().type])
        .next()
        .cancel(loop)
        .next()
        .take(gameStore.actions.run().type);
    });

    it("gameLoop should generate new creatures with game speed", () => {
      const sut = testSaga(gameLoop);

      sut
        .next()
        .select(gameSpeedSelector)
        .next(10)
        .put(gameStore.actions.newGeneration())
        .next()
        .delay(10 * 100)
        .next()
        .select(gameSpeedSelector)
        .back(4)
        .next()
        .select(gameSpeedSelector)
        .next(1)
        .put(gameStore.actions.newGeneration())
        .next()
        .delay(1 * 100);
    });
  });

  it("should start sagas", () => {
    const sut = testSaga(gameSaga);

    sut
      .next()
      .fork(watchSettingsChange)
      .next()
      .fork(watchingControlActions)
      .next()
      .fork(gameFlow)
      .finish();
  });
});
