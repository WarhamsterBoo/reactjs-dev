import { Engine } from "./Engine";

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
        [{ isAlive: true }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: false }],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [{ isAlive: false }, { isAlive: false }],
        [{ isAlive: false }, { isAlive: false }],
      ]);
    });

    // it("any live cell with 1 live neighbour should die", () => {
    //   const creatures = [
    //     [{ isAlive: true }, { isAlive: true }],
    //     [{ isAlive: false }, { isAlive: false }],
    //   ];

    //   expect(Engine.nextGeneration(creatures)).toEqual([
    //     [{ isAlive: false }, { isAlive: false }],
    //     [{ isAlive: false }, { isAlive: false }],
    //   ]);
    // });
  });
});