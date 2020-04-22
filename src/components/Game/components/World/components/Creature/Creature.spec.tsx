import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { Creature } from "./Creature";

describe("Creature", () => {
  it("should render dead", () => {
    const sut = <Creature x={0} y={0} IsAlive={false} onClick={jest.fn()} />;
    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should render alive", () => {
    const sut = <Creature x={0} y={0} IsAlive={true} onClick={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should call onClick callback with it's coordinates", () => {
    const fakeOnClick = jest.fn();
    const sut = mount(
      <Creature x={1} y={2} IsAlive={true} onClick={fakeOnClick} />
    );

    sut.simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
    expect(fakeOnClick).toBeCalledWith(1, 2);
  });
});
