import { gameStore, GameState, GameSettings, WorldCreature } from "./gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";

describe("game store", () => {
  const defaultState: GameState = {
    settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
    creatures: matrixGenerator<WorldCreature>(10, 10, { isAlive: false }),
  };

  const initialSettings: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
  };

  const initialState: GameState = {
    settings: initialSettings,
    creatures: matrixGenerator<WorldCreature>(11, 11, { isAlive: false }),
  };

  it("should return initial state", () => {
    expect(
      gameStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(defaultState);
  });

  describe("saveSettings", () => {
    it("should replace settings in state", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 2,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.saveSettings(targetSettings)
        ).settings
      ).toEqual(targetSettings);
    });
  });

  describe("resizeCreatures", () => {
    it("should be able to increase creatures size according to settings without creatures state reset", () => {
      const originalCreatures: WorldCreature[][] = [
        [{ isAlive: true }, { isAlive: true }],
        [{ isAlive: false }, { isAlive: true }],
      ];
      const expectedCreatures: WorldCreature[][] = [
        [{ isAlive: true }, { isAlive: true }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      ];

      expect(
        gameStore.reducer(
          {
            settings: {
              xDimension: 3,
              yDimension: 3,
              fillingPercentage: 0,
            },
            creatures: originalCreatures,
          },
          gameStore.actions.resizeCreatures()
        ).creatures
      ).toEqual(expectedCreatures);
    });

    it("should be able to reduce creatures size according to settings without creatures state reset", () => {
      const originalCreatures: WorldCreature[][] = [
        [{ isAlive: true }, { isAlive: true }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      ];
      const expectedCreatures: WorldCreature[][] = [
        [{ isAlive: true }, { isAlive: true }],
        [{ isAlive: false }, { isAlive: true }],
      ];

      expect(
        gameStore.reducer(
          {
            settings: {
              xDimension: 2,
              yDimension: 2,
              fillingPercentage: 0,
            },
            creatures: originalCreatures,
          },
          gameStore.actions.resizeCreatures()
        ).creatures
      ).toEqual(expectedCreatures);
    });
  });

  describe("generateCreatures", () => {
    it.each`
      xDimension | yDimension | expected
      ${-1}      | ${-3}      | ${[]}
      ${0}       | ${0}       | ${[]}
      ${1}       | ${1}       | ${matrixGenerator(1, 1, { isAlive: false })}
      ${2}       | ${2}       | ${matrixGenerator(2, 2, { isAlive: false })}
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
              creatures: matrixGenerator(1, 2, { isAlive: false }),
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

  describe("changeSettingsTo", () => {
    it("should do nothing", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 2,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettingsTo(targetSettings)
        )
      ).toEqual(initialState);
    });
  });

  describe("applySettings", () => {
    it("should do nothing", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 2,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.applySettings()
        )
      ).toEqual(initialState);
    });
  });

  describe("control actions", () => {
    it("should reset settings to default when stop action dispatched", () => {
      expect(gameStore.reducer(initialState, gameStore.actions.stop())).toEqual(
        defaultState
      );
    });
  });

  describe("toggleCreatureState", () => {
    it.each`
      initialState | expectedState
      ${true}      | ${false}
      ${false}     | ${true}
    `(
      "should change Creature isAlive from $initialState to $expectedState when toggleCreatureState action dispatched",
      ({ initialState, expectedState }) => {
        const originState: GameState = {
          settings: {
            xDimension: 2,
            yDimension: 2,
            fillingPercentage: 0,
          },
          creatures: [
            [{ isAlive: true }, { isAlive: initialState }],
            [{ isAlive: false }, { isAlive: true }],
          ],
        };

        const creatures = gameStore.reducer(
          originState,
          gameStore.actions.toggleCreatureState({ x: 0, y: 1 })
        ).creatures;

        expect(creatures[0][1]).toEqual({ isAlive: expectedState });
      }
    );
  });
});
