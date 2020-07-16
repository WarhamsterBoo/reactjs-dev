import { Engine } from "./Engine";
import { DEAD, ALIVE } from "@/features/Game";

describe("Engine", () => {
  describe("nextGeneration", () => {
    it.each`
      creatures    | expected
      ${[]}        | ${[]}
      ${[[]]}      | ${[[]]}
      ${undefined} | ${undefined}
    `(
      "should generate empty new generation for emptyish input $creatures",
      ({ creatures, expected }) => {
        expect(Engine.nextGeneration(creatures)).toEqual(expected);
      }
    );

    it("any live cell with zero live neighbours should die", () => {
      const creatures = [
        [ALIVE, DEAD],
        [DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, DEAD],
        [DEAD, DEAD],
      ]);
    });

    // it("any live cell with 1 live neighbour should die", () => {
    //   const creatures = [
    //     [ALIVE, ALIVE],
    //     [DEAD, DEAD],
    //   ];

    //   expect(Engine.nextGeneration(creatures)).toEqual([
    //     [DEAD, DEAD],
    //     [DEAD, DEAD],
    //   ]);
    // });
  });
});
