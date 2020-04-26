import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Game, WorldPresenter } from "./Game";

describe("Game", () => {
  const fakeWorld: WorldPresenter = () => null;

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

  it("should toggle Creature IsAlive when click on it", () => {
    const sut = mount(<Game xDimension={3} yDimension={3} world={fakeWorld} />);
    const initialState = sut.find(fakeWorld).props().creatures[1][2].IsAlive;

    act(() => {
      sut.find(fakeWorld).props().onClick(1, 2);
    });
    sut.update();

    expect(sut.find(fakeWorld).props().creatures[1][2].IsAlive).toBe(
      !initialState
    );
  });

  it("should be able to increase size without state reset", () => {
    const sut = mount(<Game xDimension={2} yDimension={2} world={fakeWorld} />);
    act(() => {
      sut.find(fakeWorld).props().onClick(0, 1);
      sut.find(fakeWorld).props().onClick(1, 1);
    });
    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }, { IsAlive: true }],
      [{ IsAlive: false }, { IsAlive: true }],
    ]);

    sut.setProps({ xDimension: 3, yDimension: 3 });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }, { IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: false }, { IsAlive: false }],
    ]);
  });
});
