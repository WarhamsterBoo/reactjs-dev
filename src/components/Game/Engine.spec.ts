import { Engine } from "./Engine";

describe("Engine", () => {
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
    "with {x: $xDimension, y: $yDimension, %: $fillingPercentage} should return array with $expectedAliveCount alive creatures",
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
          creauresRow.filter((creature) => creature.IsAlive).length,
        0
      );
      expect(creatures.length).toBe(xDimension);
      expect(creatures[0].length).toBe(yDimension);
      expect(numberOfAliveCreatures).toBe(expectedAliveCount);
    }
  );
});
