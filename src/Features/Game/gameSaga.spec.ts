import { testSaga } from "redux-saga-test-plan";
import { changeSettings } from "./gameSaga";
import { gameStore } from "./gameStore";

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

    it("should save valid settings", () => {
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
        .put(
          gameStore.actions.saveSettings({
            fillingPercentage: 0.5,
            xDimension: 1,
            yDimension: 2,
          })
        )
        .next()
        .isDone();
    });
  });
});
