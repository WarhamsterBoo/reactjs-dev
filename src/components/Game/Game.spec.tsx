import { shallow } from "enzyme";
import React from "react";
import { Game, WorldPresenter } from "./Game";

describe("Game", () => {
  const fakeWorld: WorldPresenter = () => null;

  it("should render initialized World component with size 1 x 1", () => {
    const game = shallow(<Game x={1} y={1} world={fakeWorld} />);
    const world = game.find(fakeWorld);
    const creatures = world.props().creatures;

    expect(creatures.length).toBe(1);
    expect(creatures[0].length).toBe(1);
  });
});
