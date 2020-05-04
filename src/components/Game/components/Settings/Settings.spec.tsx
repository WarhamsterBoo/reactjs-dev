import React from "react";
import renderer from "react-test-renderer";
import { Settings } from "./Settings";

describe("Settings", () => {
  it("should render something", () => {
    const sut = <Settings />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
