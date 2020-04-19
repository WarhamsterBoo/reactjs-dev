import { shallow } from "enzyme";
import React from "react";
import { World } from "./World";

describe("World", () => {
  it("should say that it is here", () => {
    expect(shallow(<World />).matchesElement(<h2>I'am world!</h2>)).toBe(true);
  });
});
