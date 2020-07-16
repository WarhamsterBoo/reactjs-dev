import { mount, shallow } from "enzyme";
import React from "react";
import { NameForm } from "./NameForm";

describe("Name Form", () => {
  it("should render", () => {
    const sut = shallow(
      <NameForm
        userName={"Bob"}
        onUserNameChange={jest.fn()}
        onNameSubmit={jest.fn()}
      />
    );

    expect(sut).toMatchSnapshot();
  });

  it("should call onLoginNameChange when loginName changes in input", () => {
    const onLoginNameChanges = jest.fn();
    const sut = mount(
      <NameForm
        userName={"Bob"}
        onUserNameChange={onLoginNameChanges}
        onNameSubmit={jest.fn()}
      />
    );

    sut
      .find(`input[type="text"]`)
      .at(0)
      .simulate("change", {
        target: { value: "John Doe", name: "name" },
      });

    expect(onLoginNameChanges).toHaveBeenCalledTimes(1);
    expect(onLoginNameChanges).toHaveBeenCalledWith("John Doe");
  });

  it("should call onNameSubmit when submit button clicked", () => {
    const fakeOnSubmit = jest.fn();
    const sut = mount(
      <NameForm
        userName={"Bob"}
        onUserNameChange={jest.fn()}
        onNameSubmit={fakeOnSubmit}
      />
    );
    sut.find(`input[type="text"]`).simulate("change", {
      target: { value: "Jane Doe" },
    });

    sut.find("button").simulate("submit");

    expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
  });
});
