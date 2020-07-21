import { testSaga } from "redux-saga-test-plan";
import { watchingControlActions, watchSettingsChange } from "./gameSaga";
import { gameStore } from "./gameStore";
import { settingsSelector } from "./gameStoreSelectors";

describe("game saga", () => {
  describe("watchSettingChange", () => {
    it("should not apply settings if fillingPercentage > 1", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 1.5, xDimension: 1, yDimension: 1 })
        .select(settingsSelector);
    });

    it("should not apply settings if fillingPercentage < 0", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: -0.1, xDimension: 1, yDimension: 1 })
        .select(settingsSelector);
    });

    it("should resize creatures with same state if filling percentage does not change", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 2, yDimension: 2 })
        .put(gameStore.actions.resizeCreatures())
        .next()
        .select(settingsSelector);
    });

    it("should generate new creatures if filling percentage and dimensions change", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.7, xDimension: 2, yDimension: 2 })
        .put(gameStore.actions.generateNewCreatures())
        .next()
        .select(settingsSelector);
    });

    it("should generate new creatures if only filling percentage changes", () => {
      const sut = testSaga(watchSettingsChange);

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .take(gameStore.actions.applySettings().type)
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.7, xDimension: 1, yDimension: 1 })
        .put(gameStore.actions.generateNewCreatures())
        .next()
        .select(settingsSelector);
    });
  });

  describe("watchingControlActions", () => {
    it("should dispatch corresponding actions", () => {
      const sut = testSaga(watchingControlActions);

      sut
        .next()
        .take(gameStore.actions.executeControlAction("run").type)
        .next({ payload: "run" })
        .put(gameStore.actions.run())
        .back(2)
        .next()
        .take(gameStore.actions.executeControlAction("stop").type)
        .next({ payload: "stop" })
        .put(gameStore.actions.reset())
        .back(2)
        .next()
        .take(gameStore.actions.executeControlAction("pause").type)
        .next({ payload: "pause" })
        .put(gameStore.actions.stop())
        .back(2)
        .next()
        .take(gameStore.actions.executeControlAction("faster").type)
        .next({ payload: "faster" })
        .put(gameStore.actions.faster())
        .back(2)
        .next()
        .take(gameStore.actions.executeControlAction("slower").type)
        .next({ payload: "slower" })
        .put(gameStore.actions.slower())
        .back(2)
        .next()
        .take(gameStore.actions.executeControlAction("normal").type)
        .next({ payload: "normal" })
        .put(gameStore.actions.normal());
    });
  });
});
