import { resizeMatrix } from "./arrayUtils";

describe("arrayUtils", () => {
  describe("resizeArray", () => {
    it("should return same array if new size is equal to previous size", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeMatrix(initialArray, 2, 2, 0)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("should increase array size and fill new spaces with initial value", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeMatrix(initialArray, 3, 3, 0)).toEqual([
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

      expect(resizeMatrix(initialArray, 2, 2, 0)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("should work with objects", () => {
      const initialArray = [[{ id: 1 }]];

      expect(resizeMatrix(initialArray, 2, 2, { id: 3 })).toEqual([
        [{ id: 1 }, { id: 3 }],
        [{ id: 3 }, { id: 3 }],
      ]);
    });

    it("should resize Y axis", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeMatrix(initialArray, 3, 4, 0)).toEqual([
        [1, 2, 0],
        [3, 4, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    });

    it("should resize X axis", () => {
      const initialArray = [
        [1, 2],
        [3, 4],
      ];

      expect(resizeMatrix(initialArray, 4, 3, 0)).toEqual([
        [1, 2, 0, 0],
        [3, 4, 0, 0],
        [0, 0, 0, 0],
      ]);
    });
  });
});
