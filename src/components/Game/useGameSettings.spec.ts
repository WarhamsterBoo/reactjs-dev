import { act, renderHook } from "@testing-library/react-hooks";
import { useGameSettings } from "./useGameSettings";

describe("useGameSettings", () => {
  it("should pass gamesettings from SettingsForm to GameCore", () => {
    const { result } = renderHook(() => useGameSettings());
    act(() => {
      result.current[1]({
        xDimension: 1,
        yDimension: 1,
        fillingPercentage: 0.1,
      });
    });
    expect(result.current[0]).toStrictEqual({
      xDimension: 1,
      yDimension: 1,
      fillingPercentage: 0.1,
    });

    act(() => {
      result.current[1]({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 0.5,
      });
    });

    expect(result.current[0]).toStrictEqual({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 0.5,
    });
  });
});
