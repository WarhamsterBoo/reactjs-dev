import settings, { changeSettings } from "./settings";

describe("settings reducer", () => {
  const initialState: GameSettings = {
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 0,
  };

  it("should return initial state", () => {
    expect(settings(undefined, { type: "SOMEINVALIDACTIONTYPE" })).toEqual({
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 0,
    });
  });

  it("should change xDimension and yDimension settings when CHANGE action dispatched", () => {
    const targetState: GameSettings = {
      xDimension: 12,
      yDimension: 12,
      fillingPercentage: 0,
    };

    expect(settings(initialState, changeSettings(targetState))).toEqual(
      targetState
    );
  });

  it("should transform fillingPercentage from percents to fraction", () => {
    const targetState: GameSettings = {
      xDimension: 11,
      yDimension: 11,
      fillingPercentage: 60,
    };

    expect(settings(initialState, changeSettings(targetState))).toEqual({
      ...targetState,
      fillingPercentage: 0.6,
    });
  });
});
