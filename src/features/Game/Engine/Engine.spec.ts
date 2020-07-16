import { Engine } from "./Engine";

describe("Engine", () => {
  describe("nextGeneration", () => {
    it.each`
      creatures | expected
      ${[]}     | ${[]}
    `(
      "for creatures $creatures should generate next generation as $expected",
      ({ creatures, expected }) => {
        expect(Engine.nextGeneration(creatures)).toEqual(expected);
      }
    );
  });
});
