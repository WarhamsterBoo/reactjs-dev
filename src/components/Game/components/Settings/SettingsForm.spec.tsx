import React from "react";
import renderer from "react-test-renderer";
import { SettingsForm } from "./SettingsForm";

describe("SettingsForm", () => {
  it("should render", () => {
    const sut = <SettingsForm onSubmit={() => {}} />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
