import React from "react";
import renderer from "react-test-renderer";
import { Form } from "./Form";

describe("Form", () => {
  it("should render", () => {
    const sut = <Form />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
