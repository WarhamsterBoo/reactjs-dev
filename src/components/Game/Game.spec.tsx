import { shallow, mount } from "enzyme";
import React from "react";
import { Game, WorldPresenter } from "./Game";
import { CreatureProps } from "./components";
import { act } from "react-test-renderer";

describe("Game", () => {
  const fakeWorld: WorldPresenter = () => null;

  it("should render initialized World component with size 1 x 1", () => {
    const game = shallow(
      <Game xDimension={1} yDimension={1} world={fakeWorld} />
    );
    const world = game.find(fakeWorld);
    const creatures = world.props().creatures;

    expect(creatures.length).toBe(1);
    expect(creatures[0].length).toBe(1);
  });

  it("should render initialized World component with size 3 x 3", () => {
    const game = shallow(
      <Game xDimension={3} yDimension={3} world={fakeWorld} />
    );
    const world = game.find(fakeWorld);
    const creatures = world.props().creatures;

    expect(creatures.length).toBe(3);
    expect(creatures[0].length).toBe(3);
  });

  it("should toggle Creature state on click on it", () => {
    const sut = mount(<Game xDimension={3} yDimension={3} world={fakeWorld} />);
    expect(sut.find(fakeWorld).props().creatures[1][1].IsAlive).toBe(false);

    act(() => {
      sut.find(fakeWorld).props().onClick(1, 1);
    });

    expect(sut.find(fakeWorld).props().creatures[1][1].IsAlive).toBe(true);
  });
});
