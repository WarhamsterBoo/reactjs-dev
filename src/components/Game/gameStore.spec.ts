import { gameStore, GameState } from "./gameStore";

describe("settings reducer", () => {
  const initialState: GameState = {
    settings: { xDimension: 11, yDimension: 11, fillingPercentage: 0 },
    creatures: [[]],
  };

  const defaultState: GameState = {
    settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
    creatures: [[]],
  };

  it("should return initial state", () => {
    expect(
      gameStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(defaultState);
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
    ).toEqual({
      ...initialState,
      creatures: [[]],
    });
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

  it("should reset settings to default when stop action dispatched", () => {
    expect(gameStore.reducer(initialState, gameStore.actions.stop())).toEqual(
      defaultState
    );
  });
});
