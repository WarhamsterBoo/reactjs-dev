import React from "react";
import renderer from "react-test-renderer";
import { NameForm } from "./NameForm";

describe("Name Form", () => {
  it("should render", () => {
    const sut = <NameForm />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
