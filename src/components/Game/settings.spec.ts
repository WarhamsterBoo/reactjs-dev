import { settingsSlice } from "./settings";

describe("settings reducer", () => {
  const initialState: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
  };

  const defaultState: GameSettings = {
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
  };

  it("should return initial state", () => {
    expect(
      settingsSlice.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(defaultState);
  });

  it("should change xDimension and yDimension settings when CHANGE action dispatched", () => {
    const targetState: GameSettings = {
      xDimension: 12,
      yDimension: 12,
      fillingPercentage: 0,
    };

    expect(
      settingsSlice.reducer(
        initialState,
        settingsSlice.actions.changeSettingsTo(targetState)
      )
    ).toEqual(targetState);
  });

  it("should transform fillingPercentage from percents to fraction", () => {
    const targetState: GameSettings = {
      xDimension: 11,
      yDimension: 11,
      fillingPercentage: 60,
    };

    expect(
      settingsSlice.reducer(
        initialState,
        settingsSlice.actions.changeSettingsTo(targetState)
      )
    ).toEqual({
      ...targetState,
      fillingPercentage: 0.6,
    });
  });

  it("should reset settings to default when stop action dispatched", () => {
    expect(
      settingsSlice.reducer(initialState, settingsSlice.actions.stop())
    ).toEqual(defaultState);
  });
});
