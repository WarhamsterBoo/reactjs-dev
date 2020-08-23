import { mount } from "enzyme";
import { matchers } from "jest-emotion";
import React from "react";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { Cell, CellProps } from "./Cell";

expect.extend(matchers);

describe("Cell", () => {
  const defaultProps: CellProps = {
    x: 0,
    y: 0,
    hasAliveCreature: false,
    onClick: jest.fn(),
    transitionMs: 500,
  };

  it("should render cell with dead creature", () => {
    const sut = <Cell {...defaultProps} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should render cell with alive creature", () => {
    const sut = <Cell {...defaultProps} hasAliveCreature={true} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should become alive after birth", () => {
    jest.useFakeTimers();
    const sut = mount(<Cell {...defaultProps} />);
    sut.setProps({ hasAliveCreature: true, transitionMs: 500 });
    sut.update();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    sut.update();
    expect(sut).toHaveStyleRule("background", "#41ff00");
  });

  it("should become dead", () => {
    jest.useFakeTimers();
    const sut = mount(<Cell {...defaultProps} />);
    sut.setProps({ hasAliveCreature: true, transitionMs: 500 });
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
      <Cell x={1} y={2} hasAliveCreature={true} onClick={fakeOnClick} />
    );

    sut.simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
    expect(fakeOnClick).toBeCalledWith(1, 2);
  });
});
