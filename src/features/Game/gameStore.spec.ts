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
      speed: 10,
    },
    creatures: matrixGenerator<Creature>(10, 10, DEAD),
  };

  const initialSettings: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
    status: GameStatus.Stopped,
    speed: 10,
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
            fillingPercentage: 50,
            status: GameStatus.Stopped,
            speed: 10,
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
            fillingPercentage: 50,
            status: GameStatus.Stopped,
            speed: 10,
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
  });

  describe("applySettings", () => {
    it("should do nothing", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 20,
        status: GameStatus.Stopped,
        speed: 10,
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
        fillingPercentage: 20,
        status: GameStatus.Stopped,
        speed: 10,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.changeSettings(targetSettings)
        ).settings
      ).toEqual(targetSettings);
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
            speed: 10,
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

  describe("executeControlAction", () => {
    it("should do nothing", () => {
      const targetSettings: GameSettings = {
        xDimension: 11,
        yDimension: 11,
        fillingPercentage: 20,
        status: GameStatus.Stopped,
        speed: 10,
      };

      expect(
        gameStore.reducer(
          initialState,
          gameStore.actions.executeControlAction("run")
        )
      ).toEqual(initialState);
    });
  });

  describe("control actions", () => {
    it("should set GameStatus.Running when run action dispatched", () => {
      expect(
        gameStore.reducer(defaultState, gameStore.actions.run()).settings.status
      ).toEqual(GameStatus.Running);
    });

    it("should set GameStatus.Paused when stop action dispatched", () => {
      expect(
        gameStore.reducer(defaultState, gameStore.actions.stop()).settings
          .status
      ).toEqual(GameStatus.Paused);
    });

    it("should should reset state to initial when reset action dispatched", () => {
      expect(
        gameStore.reducer(
          {
            settings: {
              xDimension: 11,
              yDimension: 11,
              fillingPercentage: 90,
              speed: 15,
              status: GameStatus.Running,
            },
            creatures: matrixGenerator(11, 11, DEAD),
          },
          gameStore.actions.reset()
        )
      ).toEqual(defaultState);
    });

    it("should should reset state to initial when reset action dispatched", () => {
      expect(
        gameStore.reducer(
          {
            settings: {
              xDimension: 11,
              yDimension: 11,
              fillingPercentage: 90,
              speed: 15,
              status: GameStatus.Running,
            },
            creatures: matrixGenerator(11, 11, DEAD),
          },
          gameStore.actions.reset()
        )
      ).toEqual(defaultState);
    });

    it.each`
      initialGameSpeed | expectedGameSpeed
      ${10}            | ${9}
      ${1}             | ${0}
      ${0}             | ${0}
    `(
      "should change game speed from $initialGameSpeed to $expectedGameSpeed when dispatching faster action",
      ({ initialGameSpeed, expectedGameSpeed }) => {
        expect(
          gameStore.reducer(
            {
              ...initialState,
              settings: { ...initialState.settings, speed: initialGameSpeed },
            },
            gameStore.actions.faster()
          ).settings.speed
        ).toBe(expectedGameSpeed);
      }
    );

    it.each`
      initialGameSpeed | expectedGameSpeed
      ${10}            | ${11}
      ${19}            | ${20}
      ${20}            | ${20}
    `(
      "should change game speed from $initialGameSpeed to $expectedGameSpeed when dispatching slower action",
      ({ initialGameSpeed, expectedGameSpeed }) => {
        expect(
          gameStore.reducer(
            {
              ...initialState,
              settings: { ...initialState.settings, speed: initialGameSpeed },
            },
            gameStore.actions.slower()
          ).settings.speed
        ).toBe(expectedGameSpeed);
      }
    );

    it.each`
      initialGameSpeed | expectedGameSpeed
      ${10}            | ${10}
      ${15}            | ${10}
      ${5}             | ${10}
    `(
      "should change game speed from $initialGameSpeed to $expectedGameSpeed when dispatching normal action",
      ({ initialGameSpeed, expectedGameSpeed }) => {
        expect(
          gameStore.reducer(
            {
              ...initialState,
              settings: { ...initialState.settings, speed: initialGameSpeed },
            },
            gameStore.actions.normal()
          ).settings.speed
        ).toBe(expectedGameSpeed);
      }
    );
  });
});
