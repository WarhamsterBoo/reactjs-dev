import React from "react";
import renderer from "react-test-renderer";
import { CreatureState, World } from "./World";

describe("World", () => {
  it.each`
    creatures
    ${[]}
    ${[[]]}
  `("should render nothing with 0 x 0 size: $creatures", ({ creatures }) => {
    expect(
      renderer.create(<World creatures={creatures} />).toJSON()
    ).toBeNull();
  });

  it("should render with 1 x 1 size and creature is dead", () => {
    const creatures: CreatureState[][] = [[{ id: 1, isAlive: false }]];
    expect(
      renderer.create(<World creatures={creatures} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render with 2 x 2 size", () => {
    const creatures: CreatureState[][] = [
      [
        { id: 1, isAlive: true },
        { id: 2, isAlive: true },
        { id: 3, isAlive: true },
      ],
      [
        { id: 4, isAlive: true },
        { id: 5, isAlive: false },
        { id: 6, isAlive: false },
      ],
      [
        { id: 7, isAlive: true },
        { id: 8, isAlive: true },
        { id: 9, isAlive: false },
      ],
    ];
    expect(
      renderer.create(<World creatures={creatures} />).toJSON()
    ).toMatchSnapshot();
  });
});
