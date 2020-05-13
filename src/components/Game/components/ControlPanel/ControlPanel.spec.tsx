import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ControlPanel } from ".";

describe("ControlPanel", () => {
  it("should render", () => {
    const sut = <ControlPanel onControlButtonClick={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it.each`
    buttonId    | action
    ${"stop"}   | ${"stop"}
    ${"run"}    | ${"run"}
    ${"pause"}  | ${"pause"}
    ${"slower"} | ${"slower"}
    ${"normal"} | ${"normal"}
    ${"faster"} | ${"faster"}
  `(
    "should call onClick callback with action '$action' for button with Id '$buttonId'",
    ({ buttonId, action }) => {
      const fakeOnClick = jest.fn();
      const sut = mount(<ControlPanel onControlButtonClick={fakeOnClick} />);

      sut.find(`button[id="${buttonId}"]`).simulate("click");

      expect(fakeOnClick).toBeCalledTimes(1);
      expect(fakeOnClick).toHaveBeenCalledWith(action);
    }
  );
});
