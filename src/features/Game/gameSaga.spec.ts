import { testSaga } from "redux-saga-test-plan";
import { watchSettingsChange } from "./gameSaga";
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
});
