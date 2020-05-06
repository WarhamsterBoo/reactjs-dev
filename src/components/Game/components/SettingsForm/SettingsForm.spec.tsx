import React from "react";
import renderer from "react-test-renderer";
import { SettingsForm } from "./SettingsForm";
import { mount } from "enzyme";

describe("SettingsForm", () => {
  it("should render", () => {
    const sut = <SettingsForm onSettingsSubmit={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it.each`
    inputName              | value
    ${"xDimension"}        | ${"10"}
    ${"yDimension"}        | ${"20"}
    ${"fillingPercentage"} | ${"30"}
  `(
    "should change value to $value in $inputName input",
    ({ inputName, value }) => {
      const sut = mount(<SettingsForm onSettingsSubmit={jest.fn()} />);

      sut.find(`input[name="${inputName}"]`).simulate("change", {
        target: { value: value, name: inputName },
      });

      expect(sut.find(`input[name="${inputName}"]`).prop("value")).toBe(
        parseInt(value)
      );
    }
  );

  it("should call onSubmit with values from inputs", () => {
    const fakeOnSubmit = jest.fn();
    const sut = mount(<SettingsForm onSettingsSubmit={fakeOnSubmit} />);
    sut.find(`input[name="xDimension"]`).simulate("change", {
      target: { value: "10", name: "xDimension" },
    });
    sut.find(`input[name="yDimension"]`).simulate("change", {
      target: { value: "20", name: "yDimension" },
    });
    sut.find(`input[name="fillingPercentage"]`).simulate("change", {
      target: { value: "30", name: "fillingPercentage" },
    });

    sut.find("button").simulate("submit");

    expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    expect(fakeOnSubmit).toHaveBeenCalledWith({
      xDimension: 10,
      yDimension: 20,
      fillingPercentage: 30,
    });
  });
});
