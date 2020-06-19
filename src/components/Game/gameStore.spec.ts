import { gameStore, GameState } from "./gameStore";
import { arrayGenerator } from "@/utils/arrayGenerator";

describe("game store", () => {
  const defaultState: GameState = {
    settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
    creatures: arrayGenerator<WorldCreature>(10, 10, { isAlive: false }),
  };

  const initialSettings: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
  };

  const initialState: GameState = {
    settings: initialSettings,
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

    it("should change settings when CHANGE action dispatched", () => {
      const targetSettings: GameSettings = {
        xDimension: 12,
        yDimension: 12,
        fillingPercentage: 0.1,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        ).settings
      ).toEqual(targetSettings);
    });

    it("should regenerate creatures if filling percentage changes", () => {
      const targetSettings: GameSettings = {
        ...initialSettings,
        fillingPercentage: 0.5,
      };

      const creatures = gameStore.reducer(
        initialState,
        gameStore.actions.changeSettingsTo(targetSettings)
      ).creatures;

      expect(
        creatures.reduce<number>(
          (accumulator, creauresRow) =>
            accumulator +
            creauresRow.filter((creature) => creature.isAlive).length,
          0
        )
      ).toBe(60);
    });
  });

  describe("control actions", () => {
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

    it.each`
      xDimension | yDimension | fillingPercentage | expectedAliveCount
      ${1}       | ${1}       | ${0}              | ${0}
      ${1}       | ${1}       | ${1}              | ${1}
      ${2}       | ${2}       | ${0.5}            | ${2}
      ${2}       | ${2}       | ${0.25}           | ${1}
      ${5}       | ${2}       | ${0.75}           | ${7}
      ${5}       | ${5}       | ${1}              | ${25}
      ${5}       | ${5}       | ${0}              | ${0}
      ${5}       | ${5}       | ${0.6}            | ${15}
    `(
      "should return array with $expectedAliveCount alive creatures with settings: {x: $xDimension, y: $yDimension, %: $fillingPercentage} ",
      ({ xDimension, yDimension, fillingPercentage, expectedAliveCount }) => {
        const generatedCreatures = gameStore.reducer(
          {
            settings: {
              xDimension: xDimension,
              yDimension: yDimension,
              fillingPercentage: fillingPercentage,
            },
            creatures: [],
          },
          gameStore.actions.generateNewCreatures()
        ).creatures;

        const numberOfAliveCreatures = generatedCreatures.reduce<number>(
          (accumulator, creauresRow) =>
            accumulator +
            creauresRow.filter((creature) => creature.isAlive).length,
          0
        );
        expect(generatedCreatures.length).toBe(xDimension);
        expect(generatedCreatures[0].length).toBe(yDimension);
        expect(numberOfAliveCreatures).toBe(expectedAliveCount);
      }
    );
  });
});
