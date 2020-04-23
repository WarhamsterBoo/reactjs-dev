import { mount } from "enzyme";
import React from "react";
import TestRenderer from "react-test-renderer";
import { Game, WorldPresenter } from "./Game";

describe("Game", () => {
  const fakeWorld: WorldPresenter = () => null;
  const { act } = TestRenderer;

  it("should render initialized World component with size 1 x 1", () => {
    const sut = mount(<Game xDimension={1} yDimension={1} world={fakeWorld} />);

    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }],
    ]);
  });

  it("should render initialized World component with size 3 x 3", () => {
    const sut = mount(<Game xDimension={2} yDimension={2} world={fakeWorld} />);

    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: false }],
    ]);
  });

  it("should toggle Creature state when click on it", () => {
    const sut = mount(<Game xDimension={3} yDimension={3} world={fakeWorld} />);
    expect(sut.find(fakeWorld).props().creatures[1][2].IsAlive).toBe(false);

    act(() => {
      sut.find(fakeWorld).props().onClick(1, 2);
    });

    expect(sut.find(fakeWorld).props().creatures[1][2].IsAlive).toBe(true);
  });
});
