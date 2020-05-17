import { act, renderHook } from "@testing-library/react-hooks";
import { useGameSettings, defaultGameSettings } from "./useGameSettings";

describe("useGameSettings", () => {
  it("should pass gamesettings from SettingsForm to GameCore", () => {
    const { result } = renderHook(() => useGameSettings());
    act(() => {
      result.current.onSettingsSubmit({
        xDimension: 1,
        yDimension: 1,
        fillingPercentage: 0,
      });
    });
    expect(result.current.settings).toStrictEqual({
      xDimension: 1,
      yDimension: 1,
      fillingPercentage: 0,
    });

    act(() => {
      result.current.onSettingsSubmit({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 100,
      });
    });

    expect(result.current.settings).toStrictEqual({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 1,
    });
  });

  it("should transform fillingPercentage from percents to fraction", () => {
    const { result } = renderHook(() => useGameSettings());

    act(() => {
      result.current.onSettingsSubmit({
        xDimension: 10,
        yDimension: 10,
        fillingPercentage: 10,
      });
    });

    expect(result.current.settings).toStrictEqual({
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 0.1,
    });
  });

  it("should reset settings to default when stop action performed", () => {
    const { result } = renderHook(() => useGameSettings());
    act(() => {
      result.current.onSettingsSubmit({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 100,
      });
    });
    expect(result.current.settings).toStrictEqual({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 1,
    });

    act(() => {
      result.current.onControlActionClick("stop");
    });

    expect(result.current.settings).toStrictEqual(defaultGameSettings);
  });
});
