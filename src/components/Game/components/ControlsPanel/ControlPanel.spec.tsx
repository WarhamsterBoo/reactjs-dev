import React from "react";
import renderer from "react-test-renderer";
import { ControlPanel } from ".";

describe("ControlPanel", () => {
  it("should render", () => {
    const sut = <ControlPanel />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
