import { testSaga } from "redux-saga-test-plan";
import { changeSettings } from "./gameSaga";
import { gameStore } from "./gameStore";
import { settingsSelector } from "./gameStoreSelectors";

describe("game saga", () => {
  describe("change settings", () => {
    it("should not save settings if fillingPercentage > 1", () => {
      const sut = testSaga(
        changeSettings,
        gameStore.actions.changeSettingsTo({
          fillingPercentage: 2,
          xDimension: 1,
          yDimension: 2,
        })
      );

      sut.next().isDone();
    });

    it("should not save settings if fillingPercentage < 0", () => {
      const sut = testSaga(
        changeSettings,
        gameStore.actions.changeSettingsTo({
          fillingPercentage: -1,
          xDimension: 1,
          yDimension: 2,
        })
      );

      sut.next().isDone();
    });

    it("should save valid settings and resize creatures if filling percentage does not change", () => {
      const sut = testSaga(
        changeSettings,
        gameStore.actions.changeSettingsTo({
          fillingPercentage: 0.5,
          xDimension: 1,
          yDimension: 2,
        })
      );

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .put(
          gameStore.actions.saveSettings({
            fillingPercentage: 0.5,
            xDimension: 1,
            yDimension: 2,
          })
        )
        .next()
        .put(gameStore.actions.resizeCreatures())
        .next()
        .isDone();
    });

    it("should save valid settings and generate new creatures if filling percentage and dimensions change", () => {
      const sut = testSaga(
        changeSettings,
        gameStore.actions.changeSettingsTo({
          fillingPercentage: 0.6,
          xDimension: 1,
          yDimension: 2,
        })
      );

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .put(
          gameStore.actions.saveSettings({
            fillingPercentage: 0.6,
            xDimension: 1,
            yDimension: 2,
          })
        )
        .next()
        .put(gameStore.actions.generateNewCreatures())
        .next()
        .isDone();
    });

    it("should save valid settings and generate new creatures if only filling percentage changes", () => {
      const sut = testSaga(
        changeSettings,
        gameStore.actions.changeSettingsTo({
          fillingPercentage: 0.6,
          xDimension: 1,
          yDimension: 1,
        })
      );

      sut
        .next()
        .select(settingsSelector)
        .next({ fillingPercentage: 0.5, xDimension: 1, yDimension: 1 })
        .put(
          gameStore.actions.saveSettings({
            fillingPercentage: 0.6,
            xDimension: 1,
            yDimension: 1,
          })
        )
        .next()
        .put(gameStore.actions.generateNewCreatures())
        .next()
        .isDone();
    });
  });
});
