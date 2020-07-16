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

    it("any live creature with zero live neighbours should die", () => {
      const creatures = [
        [DEAD, DEAD, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, DEAD, DEAD],
        [DEAD, DEAD, DEAD],
        [DEAD, DEAD, DEAD],
      ]);
    });

    it("any live creature with 1 live neighbour should die", () => {
      const creatures = [
        [DEAD, DEAD, DEAD],
        [DEAD, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, DEAD, DEAD],
        [DEAD, DEAD, DEAD],
        [DEAD, DEAD, DEAD],
      ]);
    });

    it("any live creature with 2 live neighbour should live", () => {
      const creatures = [
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, ALIVE, ALIVE],
        [DEAD, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ]);
    });

    it("any live creature with 3 live neighbour should live", () => {
      const creatures = [
        [DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [ALIVE, ALIVE, ALIVE],
        [ALIVE, ALIVE, ALIVE],
        [DEAD, ALIVE, DEAD],
      ]);
    });

    it("any live creature with 4 live neighbours dies", () => {
      const creatures = [
        [DEAD, ALIVE, DEAD],
        [ALIVE, ALIVE, ALIVE],
        [DEAD, ALIVE, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [ALIVE, ALIVE, ALIVE],
        [ALIVE, DEAD, ALIVE],
        [ALIVE, ALIVE, ALIVE],
      ]);
    });

    it("any dead creature with exactly three live neighbours becomes a live creature", () => {
      const creatures = [
        [DEAD, DEAD, DEAD],
        [ALIVE, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ];

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
      ]);
    });

    it("should implement still life: block", () => {
      let creatures = [
        [DEAD, ALIVE, ALIVE],
        [DEAD, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ];
      creatures = Engine.nextGeneration(creatures);
      creatures = Engine.nextGeneration(creatures);

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, ALIVE, ALIVE],
        [DEAD, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ]);
    });

    it("should implement still life: tub", () => {
      let creatures = [
        [DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, ALIVE],
        [DEAD, ALIVE, DEAD],
      ];
      creatures = Engine.nextGeneration(creatures);
      creatures = Engine.nextGeneration(creatures);

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, ALIVE, DEAD],
        [ALIVE, DEAD, ALIVE],
        [DEAD, ALIVE, DEAD],
      ]);
    });

    it("should implement oscillators: blinker", () => {
      let creatures = [
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
      ];
      creatures = Engine.nextGeneration(creatures);
      expect(creatures).toEqual([
        [DEAD, DEAD, DEAD],
        [ALIVE, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
      ]);

      expect(Engine.nextGeneration(creatures)).toEqual([
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
      ]);
    });
  });
});
