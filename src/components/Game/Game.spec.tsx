import { shallow } from "enzyme";
import React from "react";
import { Game } from "./Game";

describe("Game", () => {
  it("should say Hello!", () => {
    expect(shallow(<Game />).matchesElement(<h1>Hello!</h1>)).toBe(true);
  });
});
