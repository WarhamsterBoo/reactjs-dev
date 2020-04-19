import { shallow } from "enzyme";
import React from "react";
import { Life } from "./Life";

describe("Life", () => {
  it("should be alive", () => {
    expect(shallow(<Life />).matchesElement(<h3>I'am alive!</h3>)).toBe(true);
  });
});
