import React from "react";
import renderer from "react-test-renderer";
import { InputNumber } from "./InputNumber";

describe("Input Number", () => {
  it("should render", () => {
    const sut = <InputNumber />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
