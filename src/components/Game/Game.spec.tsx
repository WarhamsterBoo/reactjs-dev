import React from "react";
import renderer from "react-test-renderer";
import { Game } from ".";

describe("Game", () => {
  it("should render ", () => {
    const sut = <Game />;

    expect(renderer.create(sut).toJSON()).toMatchSnapshot();
  });
});
