import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { NameForm } from "./NameForm";

describe("Name Form", () => {
  it("should render", () => {
    const sut = <NameForm />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });

  it("should change value in name input", () => {
    const sut = mount(<NameForm />);

    sut
      .find(`input[type="text"]`)
      .at(0)
      .simulate("change", {
        target: { value: "John Doe", name: "name" },
      });

    expect(sut.find(`input[type="text"]`).at(0).prop("value")).toBe("John Doe");
  });
});
