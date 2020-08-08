import { ALIVE, DEAD } from "@/features/Game";
import { matrixGenerator, countByFilter } from "@/utils/arrayUtils";
import { Engine } from "./Engine";

describe("Engine", () => {
  describe("firstGeneration", () => {
    it.each`
      xDimension | yDimension | expected
      ${-1}      | ${-3}      | ${[]}
      ${0}       | ${0}       | ${[]}
      ${1}       | ${1}       | ${matrixGenerator(1, 1, DEAD)}
      ${2}       | ${2}       | ${matrixGenerator(2, 2, DEAD)}
    `(
      "should generate creatures array of corresponding size if setting's demensions are $xDimension x $yDimension",
      ({ xDimension, yDimension, expected }) => {
        expect(Engine.firstGeneration(xDimension, yDimension, 0)).toEqual(
          expected
        );
      }
    );

    it("should throw if fillingPercentage less than 0", () => {
      const act = () => Engine.firstGeneration(10, 10, -1);

      expect(act).toThrow("fillingPercentage cannot be less than 0");
    });

    it("should throw if fillingPercentage greater than 100", () => {
      const act = () => Engine.firstGeneration(10, 10, 101);

      expect(act).toThrow("fillingPercentage cannot be greater than 100");
    });

    it.each`
      xDimension | yDimension | fillingPercentage | expectedAliveCount
      ${1}       | ${1}       | ${0}              | ${0}
      ${1}       | ${1}       | ${100}            | ${1}
      ${2}       | ${2}       | ${50}             | ${2}
      ${2}       | ${2}       | ${25}             | ${1}
      ${5}       | ${2}       | ${75}             | ${7}
      ${5}       | ${5}       | ${100}            | ${25}
      ${5}       | ${5}       | ${0}              | ${0}
      ${5}       | ${5}       | ${60}             | ${15}
    `(
      "should return population with $expectedAliveCount alive creatures with settings: {x: $xDimension, y: $yDimension, %: $fillingPercentage} ",
      ({ xDimension, yDimension, fillingPercentage, expectedAliveCount }) => {
        const generatedCreatures = Engine.firstGeneration(
          xDimension,
          yDimension,
          fillingPercentage
        );

        const numberOfAliveCreatures = countByFilter(generatedCreatures, (creature) => creature.isAlive)

        expect(generatedCreatures.length).toBe(yDimension);
        expect(generatedCreatures[0].length).toBe(xDimension);
        expect(numberOfAliveCreatures).toBe(expectedAliveCount);
      }
    );
  });

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
