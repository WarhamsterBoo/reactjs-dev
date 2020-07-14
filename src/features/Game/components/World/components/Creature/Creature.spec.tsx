import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { Creature, CreatureProps } from "./Creature";
import { matchers } from "jest-emotion";

expect.extend(matchers);

describe("Creature", () => {
  const defaultProps: CreatureProps = {
    x: 0,
    y: 0,
    isAlive: false,
    onClick: jest.fn(),
    transitionMs: 500,
  };

  it("should render dead", () => {
    const sut = <Creature {...defaultProps} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should render alive", () => {
    const sut = <Creature {...defaultProps} isAlive={true} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should become alive after birth", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} />);
    sut.setProps({ isAlive: true, transitionMs: 500 });
    sut.update();

    act(() => {
      jest.advanceTimersByTime(510);
    });

    sut.update();
    expect(sut).toHaveStyleRule("background", "#41ff00");
  });

  it("should become dead", () => {
    jest.useFakeTimers();
    const sut = mount(<Creature {...defaultProps} />);
    sut.setProps({ isAlive: true, transitionMs: 500 });
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
      <Creature x={1} y={2} isAlive={true} onClick={fakeOnClick} />
    );

    sut.simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
    expect(fakeOnClick).toBeCalledWith(1, 2);
  });
});
