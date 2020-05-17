import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { CreatureState, World } from "./World";

describe("World", () => {
  it.each`
    creatures
    ${[]}
    ${[[]]}
  `("should render nothing with 0 x 0 size: $creatures", ({ creatures }) => {
    const sut = <World creatures={creatures} onClick={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toBeNull();
  });

  it("should render with 1 x 1 size and creature is dead", () => {
    const creatures: CreatureState[][] = [[{ isAlive: false }]];

    const sut = <World creatures={creatures} onClick={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should render with 2 x 2 size filled with creatures", () => {
    const creatures: CreatureState[][] = [
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
    ];

    const sut = <World creatures={creatures} onClick={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should call onClick callback with passed coordinates", () => {
    const creatures: CreatureState[][] = [[{ isAlive: false }]];
    const fakeOnClick = jest.fn();
    const sut = mount(<World creatures={creatures} onClick={fakeOnClick} />);

    sut.find("button").simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
    expect(fakeOnClick).toBeCalledWith(0, 0);
  });
});
