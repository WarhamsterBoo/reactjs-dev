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
    const creatures: CreatureState[][] = [[{ IsAlive: false }]];
    expect(
      renderer.create(<World creatures={creatures} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render with 2 x 2 size filled with creatures", () => {
    const creatures: CreatureState[][] = [
      [{ IsAlive: true }, { IsAlive: true }, { IsAlive: true }],
      [{ IsAlive: true }, { IsAlive: false }, { IsAlive: false }],
      [{ IsAlive: true }, { IsAlive: true }, { IsAlive: false }],
    ];
    expect(
      renderer.create(<World creatures={creatures} />).toJSON()
    ).toMatchSnapshot();
  });
});
