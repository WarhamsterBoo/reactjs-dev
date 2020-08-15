import { mount, shallow } from "enzyme";
import React from "react";
import { World, WorldCreature } from "./World";

describe("World", () => {
  it.each`
    creatures
    ${[]}
    ${[[]]}
  `("should render nothing with 0 x 0 size: $creatures", ({ creatures }) => {
    const sut = shallow(<World creatures={creatures} onClick={jest.fn()} />);

    expect(sut).toMatchSnapshot();
  });

  it("should render with 1 x 1 size and creature is dead", () => {
    const creatures: WorldCreature[][] = [[{ isAlive: false }]];

    const sut = shallow(<World creatures={creatures} onClick={jest.fn()} />);

    expect(sut).toMatchSnapshot();
  });

  it("should render with 2 x 2 size filled with creatures", () => {
    const creatures: WorldCreature[][] = [
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
    ];

    const sut = shallow(<World creatures={creatures} onClick={jest.fn()} />);

    expect(sut).toMatchSnapshot();
  });

  it("should call onClick callback with passed coordinates", () => {
    const creatures: WorldCreature[][] = [[{ isAlive: false }]];
    const fakeOnClick = jest.fn();
    const sut = mount(<World creatures={creatures} onClick={fakeOnClick} />);

    sut.find("button").simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
    expect(fakeOnClick).toBeCalledWith(0, 0);
  });
});
