import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { NameForm } from "./NameForm";

describe("Name Form", () => {
  it("should render", () => {
    const sut = <NameForm onSubmit={jest.fn()} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should change value in name input", () => {
    const sut = mount(<NameForm onSubmit={jest.fn()} />);

    sut
      .find(`input[type="text"]`)
      .at(0)
      .simulate("change", {
        target: { value: "John Doe", name: "name" },
      });

    expect(sut.find(`input[type="text"]`).at(0).prop("value")).toBe("John Doe");
  });

  it("should call onSubmit with values from inputs", () => {
    const fakeOnSubmit = jest.fn();
    const sut = mount(<NameForm onSubmit={fakeOnSubmit} />);
    sut.find(`input[type="text"]`).simulate("change", {
      target: { value: "Jane Doe" },
    });

    sut.find("button").simulate("submit");

    expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    expect(fakeOnSubmit).toHaveBeenCalledWith("Jane Doe");
  });
});
