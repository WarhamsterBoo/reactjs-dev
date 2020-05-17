import { Engine } from "./Engine";

describe("Engine", () => {
  it.each`
    xDimension | yDimension
    ${0}       | ${0}
    ${-1}      | ${-1}
    ${-100}    | ${-100}
  `(
    "GenerateCreatures should return empty array for $xDimension x $yDimension dimensions",
    ({ xDimension, yDimension }) => {
      const sut = Engine;

      const creatures = sut.GenerateCreatures({
        xDimension,
        yDimension,
        fillingPercentage: 0,
      });

      expect(creatures).toEqual([]);
    }
  );

  it("should throw if fillingPercentage > 100", () => {
    const sut = Engine;

    expect(() =>
      sut.GenerateCreatures({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: 146,
      })
    ).toThrow("FillingPercentage cannot be greater than 1");
  });

  it("should throw if fillingPercentage < 0", () => {
    const sut = Engine;

    expect(() =>
      sut.GenerateCreatures({
        xDimension: 2,
        yDimension: 2,
        fillingPercentage: -146,
      })
    ).toThrow("FillingPercentage cannot be less than 0");
  });

  it.each`
    xDimension | yDimension | fillingPercentage | expectedAliveCount
    ${1}       | ${1}       | ${0}              | ${0}
    ${1}       | ${1}       | ${1}              | ${1}
    ${2}       | ${2}       | ${0.5}            | ${2}
    ${2}       | ${2}       | ${0.25}           | ${1}
    ${5}       | ${2}       | ${0.75}           | ${7}
    ${5}       | ${5}       | ${1}              | ${25}
    ${5}       | ${5}       | ${0}              | ${0}
    ${5}       | ${5}       | ${0.6}            | ${15}
  `(
    "GenerateCreatures with {x: $xDimension, y: $yDimension, %: $fillingPercentage} should return array with $expectedAliveCount alive creatures",
    ({ xDimension, yDimension, fillingPercentage, expectedAliveCount }) => {
      const sut = Engine;

      const creatures = sut.GenerateCreatures({
        xDimension: xDimension,
        yDimension: yDimension,
        fillingPercentage: fillingPercentage,
      });

      const numberOfAliveCreatures = creatures.reduce<number>(
        (accumulator, creauresRow) =>
          accumulator +
          creauresRow.filter((creature) => creature.isAlive).length,
        0
      );
      expect(creatures.length).toBe(xDimension);
      expect(creatures[0].length).toBe(yDimension);
      expect(numberOfAliveCreatures).toBe(expectedAliveCount);
    }
  );
});
