import { resizeTwoDimArray } from "./arrayUtils";

describe("arrayUtils", () => {
  describe("resizeArray", () => {
    it("should return same array if new size is equal to previous size", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeTwoDimArray(initialArray, 2, 2, 0)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("should increase array size and fill new spaces with initial value", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeTwoDimArray(initialArray, 3, 3, 0)).toEqual([
        [1, 2, 0],
        [3, 4, 0],
        [0, 0, 0],
      ]);
    });

    it("should decrease array size without state loss", () => {
      const initialArray = [
        [1, 2, 3],
        [3, 4, 0],
        [0, 8, 6],
      ];

      expect(resizeTwoDimArray(initialArray, 2, 2, 0)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("should work with objects", () => {
      const initialArray = [[{ id: 1 }]];

      expect(resizeTwoDimArray(initialArray, 2, 2, { id: 3 })).toEqual([
        [{ id: 1 }, { id: 3 }],
        [{ id: 3 }, { id: 3 }],
      ]);
    });
  });
});
