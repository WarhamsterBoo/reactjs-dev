import { resizeArray } from "./arrayUtils";

describe("arrayUtils", () => {
  describe("resizeArray", () => {
    it("should return same array if new size is equal to previous size", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeArray(initialArray, 2, 2, 0)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
  });
});
