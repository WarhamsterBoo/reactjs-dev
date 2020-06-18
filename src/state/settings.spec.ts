import settings from "./settings";

describe("settings reducer", () => {
  it("should return initial state", () => {
    expect(settings(undefined, { type: "SOMEINVALIDACTIONTYPE" })).toEqual({
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 0,
    });
  });
});
