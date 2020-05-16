import { act, renderHook } from "@testing-library/react-hooks";
import { useGameSettings, defaultGameSettings } from "./useGameSettings";

describe("useGameSettings", () => {
  it("should pass gamesettings from SettingsForm to GameCore", () => {
    const { result } = renderHook(() => useGameSettings());
    act(() => {
      result.current[1]({
        xDimension: 1,
        yDimension: 1,
        fillingPercentage: 0,
      });
    });
    expect(result.current[0]).toStrictEqual({
      xDimension: 1,
      yDimension: 1,
      fillingPercentage: 0,
    });

    act(() => {
      result.current[1]({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 100,
      });
    });

    expect(result.current[0]).toStrictEqual({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 1,
    });
  });

  it("should transform fillingPercentage from percents to fraction", () => {
    const { result } = renderHook(() => useGameSettings());

    act(() => {
      result.current[1]({
        xDimension: 10,
        yDimension: 10,
        fillingPercentage: 10,
      });
    });

    expect(result.current[0]).toStrictEqual({
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 0.1,
    });
  });

  it("should reset settings to default when stop action performed", () => {
    const { result } = renderHook(() => useGameSettings());
    act(() => {
      result.current[1]({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 100,
      });
    });
    expect(result.current[0]).toStrictEqual({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 1,
    });

    act(() => {
      result.current[2]("stop");
    });

    expect(result.current[0]).toStrictEqual(defaultGameSettings);
  });
});
