import { Engine } from "./Engine";

describe("Engine", () => {
  it.each`
    xDimension | yDimension | fillingPercentage | expectedAliveCount
    ${1}       | ${1}       | ${0}              | ${0}
  `(
    "with {x: $xDimension, y: $yDimension, %: $fillingPercentage} should return array with $expectedAliveCount alive creatures",
    ({ xDimension, yDimension, fillingPercentage, expectedAliveCount }) => {
      const sut = Engine;

      const creatures = sut.GenerateCreatures({
        xDimension: xDimension,
        yDimension: yDimension,
        fillingPercentage: fillingPercentage,
      });

      expect(creatures.length).toBe(xDimension);
      expect(creatures[0].length).toBe(yDimension);
      expect(
        creatures.filter(
          (row) => row.filter((creature) => creature.IsAlive).length > 0
        ).length
      ).toBe(expectedAliveCount);
    }
  );
});
