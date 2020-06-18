import { gameStore, GameState } from "./gameStore";
import { arrayGenerator } from "@/utils/arrayGenerator";

describe("game store", () => {
  const defaultState: GameState = {
    settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
    creatures: arrayGenerator<WorldCreature>(10, 10, { isAlive: false }),
  };

  const initialState: GameState = {
    settings: { xDimension: 11, yDimension: 11, fillingPercentage: 0 },
    creatures: arrayGenerator<WorldCreature>(11, 11, { isAlive: false }),
  };

  it("should return initial state", () => {
    expect(
      gameStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(defaultState);
  });

  describe("changeSettingsTo", () => {
    it("should change xDimension and yDimension settings when CHANGE action dispatched", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 0,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        )
      ).toEqual(initialState);
    });

    it("should transform fillingPercentage from percents to fraction", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 60,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        )
      ).toEqual({
        ...initialState,
        settings: {
          ...targetSettings,
          fillingPercentage: 0.6,
        },
      });
    });
  });

  describe("control actions", () => {
    // TODO rework reaction on stop button click. it should not set to defaultState
    it("should reset settings to default when stop action dispatched", () => {
      expect(gameStore.reducer(initialState, gameStore.actions.stop())).toEqual(
        defaultState
      );
    });
  });

  describe("generateCreatures", () => {
    it("should set empty creatures if setting's demensions are negative", () => {
      expect(
        gameStore.reducer(
          {
            settings: {
              xDimension: -1,
              yDimension: -3,
              fillingPercentage: 0,
            },
            creatures: arrayGenerator(1, 2, { isAlive: false }),
          },
          gameStore.actions.generateCreatures()
        ).creatures
      ).toEqual([]);
    });
  });
});
