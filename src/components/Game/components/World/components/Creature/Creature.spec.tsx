import { mount } from "enzyme";
import React from "react";
import { Creature, CreatureProps } from "./Creature";

describe("Creature", () => {
  const defaultProps: CreatureProps = {
    x: 0,
    y: 0,
    IsAlive: false,
    onClick: jest.fn(),
    transitionMs: 500,
  };

  it("should render dead", () => {
    const sut = mount(<Creature {...defaultProps} />);

    expect(sut).toMatchSnapshot();
  });

  it("should render alive", () => {
    const sut = mount(<Creature {...defaultProps} IsAlive={true} />);

    expect(sut).toMatchSnapshot();
  });

  it("should start to brighten after birth", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} />);
    sut.setProps({ IsAlive: true });
    sut.update();

    jest.advanceTimersByTime(100);

    expect(sut).toMatchSnapshot();
  });

  it("should start to fade after death", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} IsAlive={true} />);
    sut.setProps({ IsAlive: false });
    sut.update();

    jest.advanceTimersByTime(100);

    expect(sut).toMatchSnapshot();
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
