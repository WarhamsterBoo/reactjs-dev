import React from "react";
import renderer from "react-test-renderer";
import { InputNumber } from "./InputNumber";
import { InputText } from "./InputText";

describe("Input Number", () => {
  it("should render", () => {
    const sut = <InputNumber />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});

describe("Input Text", () => {
  it("should render", () => {
    const sut = <InputText />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
