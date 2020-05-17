import { mount, shallow } from "enzyme";
import React from "react";
import { NameForm } from "./NameForm";

describe("Name Form", () => {
  it("should render", () => {
    const sut = shallow(<NameForm onNameSubmit={jest.fn()} />);

    expect(sut).toMatchSnapshot();
  });

  it("should change value in name input", () => {
    const sut = mount(<NameForm onNameSubmit={jest.fn()} />);

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
    const sut = mount(<NameForm onNameSubmit={fakeOnSubmit} />);
    sut.find(`input[type="text"]`).simulate("change", {
      target: { value: "Jane Doe" },
    });

    sut.find("button").simulate("submit");

    expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
    expect(fakeOnSubmit).toHaveBeenCalledWith("Jane Doe");
  });
});
