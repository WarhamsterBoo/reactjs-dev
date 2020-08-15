import { matrixGenerator } from "@/utils/arrayUtils";
import { create } from "tests/dsl/create";
import { Engine } from "./Engine";
import {
  ALIVE,
  DEAD,
  GameSettings,
  GameState,
  GameStatus,
  gameStore,
} from "./gameStore";

describe("game store", () => {
  it("should return initial state", () => {
    expect(
      gameStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(create.defaultGameState());
  });

  describe("generateCreatures", () => {
    it("should generate first generation of the population", () => {
      Engine.firstGeneration = () => [
        [DEAD, DEAD],
        [ALIVE, ALIVE],
      ];

      const generatedCreatures = gameStore.reducer(
        {
          settings: create.gameSettings({
            xDimension: 2,
            yDimension: 2,
            fillingPercentage: 50,
          }),
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
          settings: create.gameSettings({
            xDimension: 2,
            yDimension: 2,
            fillingPercentage: 50,
          }),
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
      const initialState = create.gameState({
        creatures: matrixGenerator(11, 11, DEAD),
        settings: create.gameSettings({
          xDimension: 11,
          yDimension: 11,
        }),
      });

      expect(
        gameStore.reducer(initialState, gameStore.actions.applySettings())
      ).toEqual(initialState);
    });
  });

  describe("changeSettings", () => {
    it("should save settings", () => {
      const targetSettings: GameSettings = create.gameSettings({
        xDimension: 15,
        yDimension: 15,
        fillingPercentage: 20,
      });

      expect(
        gameStore.reducer(
          create.gameState(),
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
          settings: create.gameSettings({
            xDimension: 2,
            yDimension: 2,
          }),
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
      const initialState = create.gameState({
        creatures: matrixGenerator(11, 11, DEAD),
        settings: create.gameSettings({
          xDimension: 11,
          yDimension: 11,
        }),
      });

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
        gameStore.reducer(create.defaultGameState(), gameStore.actions.run())
          .settings.status
      ).toEqual(GameStatus.Running);
    });

    it("should set GameStatus.Paused when stop action dispatched", () => {
      expect(
        gameStore.reducer(create.defaultGameState(), gameStore.actions.pause())
          .settings.status
      ).toEqual(GameStatus.Paused);
    });

    it("should set GameStatus.Stopped when reset action dispatched", () => {
      expect(
        gameStore.reducer(create.defaultGameState(), gameStore.actions.reset())
          .settings.status
      ).toEqual(GameStatus.Stopped);
    });

    it.each`
      initialGameSpeed | expectedGameSpeed
      ${10}            | ${9}
      ${1}             | ${0}
      ${0}             | ${0}
    `(
      "should change game speed from $initialGameSpeed to $expectedGameSpeed when dispatching faster action",
      ({ initialGameSpeed, expectedGameSpeed }) => {
        const initialState = create.gameState();

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
        const initialState = create.gameState();

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
        const initialState = create.gameState();

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

  describe("resetGame", () => {
    it("should reset game state to default", () => {
      const initialState = create.gameState({
        creatures: matrixGenerator(11, 11, DEAD),
        settings: create.gameSettings({
          xDimension: 11,
          yDimension: 11,
        }),
      });

      expect(
        gameStore.reducer(initialState, gameStore.actions.resetGame())
      ).toEqual(create.defaultGameState());
    });
  });
});
