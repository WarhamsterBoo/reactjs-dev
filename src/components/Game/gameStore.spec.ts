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
    it("should throw if fillingPercentage > 1", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 2,
      };

      expect(() =>
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        )
      ).toThrow("FillingPercentage cannot be greater than 1");
    });

    it("should throw if fillingPercentage < 0", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: -0.67,
      };

      expect(() =>
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        )
      ).toThrow("FillingPercentage cannot be less than 0");
    });

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
    it.each`
      xDimension | yDimension | expected
      ${-1}      | ${-3}      | ${[]}
      ${0}       | ${0}       | ${[]}
      ${1}       | ${1}       | ${arrayGenerator(1, 1, { isAlive: false })}
      ${2}       | ${2}       | ${arrayGenerator(2, 2, { isAlive: false })}
    `(
      "should generate creatures array of corresponding size if setting's demensions are $xDimension x $yDimension",
      ({ xDimension, yDimension, expected }) => {
        expect(
          gameStore.reducer(
            {
              settings: {
                xDimension: xDimension,
                yDimension: yDimension,
                fillingPercentage: 0,
              },
              creatures: arrayGenerator(1, 2, { isAlive: false }),
            },
            gameStore.actions.generateNewCreatures()
          ).creatures
        ).toEqual(expected);
      }
    );
  });
});
