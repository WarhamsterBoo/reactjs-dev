import { mount } from "enzyme";
import React from "react";
import { Creature, CreatureProps } from "./Creature";
import { act } from "react-dom/test-utils";
import { matchers } from "jest-emotion";

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

    sut.update();
    expect(sut).toHaveStyleRule("background", "#208000");
  });

  it("should become alive after birth", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} />);
    sut.setProps({ IsAlive: true, transitionMs: 500 });
    sut.update();

    act(() => {
      jest.advanceTimersByTime(510);
    });

    sut.update();
    expect(sut).toHaveStyleRule("background", "#41ff00");
  });

  it("should start to fade after death", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} IsAlive={true} />);
    sut.setProps({ IsAlive: false });
    sut.update();

    jest.advanceTimersByTime(100);

    sut.update();
    expect(sut).toHaveStyleRule("background", "#9fff80");
  });

  it("should become dead", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} />);
    sut.setProps({ IsAlive: true, transitionMs: 500 });
    sut.update();

    act(() => {
      jest.advanceTimersByTime(510);
    });

    sut.update();
    expect(sut).toHaveStyleRule("background", "#41ff00");
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
