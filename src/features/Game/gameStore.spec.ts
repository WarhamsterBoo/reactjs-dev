import {
  gameStore,
  GameState,
  GameSettings,
  Creature,
  DEAD,
  Population,
  ALIVE,
} from "./gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";

describe("game store", () => {
  const defaultState: GameState = {
    settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
    creatures: matrixGenerator<Creature>(10, 10, DEAD),
  };

  const initialSettings: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
  };

  const initialState: GameState = {
    settings: initialSettings,
    creatures: matrixGenerator<Creature>(11, 11, DEAD),
  };

  it("should return initial state", () => {
    expect(
      gameStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(defaultState);
  });

  describe("resizeCreatures", () => {
    it("should be able to increase creatures size according to settings without creatures state reset", () => {
      const originalCreatures: Population = [
        [ALIVE, ALIVE],
        [DEAD, ALIVE],
      ];
      const expectedCreatures: Population = [
        [ALIVE, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, DEAD, DEAD],
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
      const originalCreatures: Population = [
        [ALIVE, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, DEAD, DEAD],
      ];
      const expectedCreatures: Population = [
        [ALIVE, ALIVE],
        [DEAD, ALIVE],
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
      ${1}       | ${1}       | ${matrixGenerator(1, 1, DEAD)}
      ${2}       | ${2}       | ${matrixGenerator(2, 2, DEAD)}
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
              creatures: matrixGenerator(1, 2, DEAD),
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

  describe("applySettings", () => {
    it("should do nothing", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 2,
      };

      expect(
        gameStore.reducer(initialState, gameStore.actions.applySettings())
      ).toEqual(initialState);
    });
  });

  describe("changeSettings", () => {
    it("should save settings", () => {
      const targetSettings: GameSettings = {
        xDimension: 15,
        yDimension: 15,
        fillingPercentage: 0.2,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettings(targetSettings)
        ).settings
      ).toEqual(targetSettings);
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
            [ALIVE, { isAlive: initialState }],
            [DEAD, ALIVE],
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
