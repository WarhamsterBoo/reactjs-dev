import React from "react";
import renderer from "react-test-renderer";
import { SettingsForm } from "./SettingsForm";
import { mount } from "enzyme";

describe("SettingsForm", () => {
  it("should render", () => {
    const sut = <SettingsForm onSubmit={() => {}} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should change values in inputs", () => {
    const fakeOnSubmit = jest.fn();
    const sut = mount(<SettingsForm onSubmit={fakeOnSubmit} />);

    sut.find(`input[name="xDimension"]`).simulate("change", {
      target: { value: "10", name: "xDimension" },
    });
    sut.find(`input[name="yDimension"]`).simulate("change", {
      target: { value: "10", name: "yDimension" },
    });
    sut.find(`input[name="fillingPercentage"]`).simulate("change", {
      target: { value: "10", name: "fillingPercentage" },
    });

    expect(sut.find(`input[name="xDimension"]`).prop("value")).toBe(10);
    expect(sut.find(`input[name="yDimension"]`).prop("value")).toBe(10);
    expect(sut.find(`input[name="fillingPercentage"]`).prop("value")).toBe(10);
  });
});
