import {
  gameStore,
  GameState,
  GameSettings,
  Creature,
  DEAD,
  Population,
  ALIVE,
  GameStatus,
} from "./gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";
import { Engine } from "./Engine";

describe("game store", () => {
  const defaultState: GameState = {
    settings: {
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 0,
      status: GameStatus.Stopped,
      speed: 1,
    },
    creatures: matrixGenerator<Creature>(10, 10, DEAD),
  };

  const initialSettings: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
    status: GameStatus.Stopped,
    speed: 1,
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
              status: GameStatus.Stopped,
              speed: 1,
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
              status: GameStatus.Stopped,
              speed: 1,
            },
            creatures: originalCreatures,
          },
          gameStore.actions.resizeCreatures()
        ).creatures
      ).toEqual(expectedCreatures);
    });
  });

  describe("generateCreatures", () => {
    it("should generate first generation of the population", () => {
      Engine.firstGeneration = () => [
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ];

      const generatedCreatures = gameStore.reducer(
        {
          settings: {
            xDimension: 2,
            yDimension: 2,
            fillingPercentage: 0.5,
            status: GameStatus.Stopped,
            speed: 1,
          },
          creatures: [],
        },
        gameStore.actions.generateNewCreatures()
      ).creatures;

      expect(generatedCreatures).toEqual([
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ]);
    });
  });

  describe("newGeneration", () => {
    it("should generate next generation of the population", () => {
      Engine.nextGeneration = () => [
        [DEAD, DEAD],
        [DEAD, DEAD],
      ];

      const nextGeneration = gameStore.reducer(
        {
          settings: {
            xDimension: 2,
            yDimension: 2,
            fillingPercentage: 0.5,
            status: GameStatus.Stopped,
            speed: 1,
          },
          creatures: [
            [DEAD, DEAD],
            [ALIVE, ALIVE],
          ],
        },
        gameStore.actions.newGeneration()
      ).creatures;

      expect(nextGeneration).toEqual([
        [DEAD, DEAD],
        [DEAD, DEAD],
      ]);
    });

    describe("applySettings", () => {
      it("should do nothing", () => {
        const targetSettings: GameSettings = {
          xDimension: 11,
          yDimension: 11,
          fillingPercentage: 2,
          status: GameStatus.Stopped,
          speed: 1,
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
          status: GameStatus.Stopped,
          speed: 1,
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
        expect(
          gameStore.reducer(initialState, gameStore.actions.stop())
        ).toEqual(defaultState);
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
              status: GameStatus.Stopped,
              speed: 1,
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
});
