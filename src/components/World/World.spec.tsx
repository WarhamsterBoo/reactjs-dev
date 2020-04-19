import { shallow } from "enzyme";
import React from "react";
import { World } from "./World";

describe("World", () => {
  it("should say Hello!", () => {
    expect(shallow(<World />).matchesElement(<h1>Hello!</h1>)).toBe(true);
  });
});
