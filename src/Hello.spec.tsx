import React from "react";
import Hello from "./Hello";
import { shallow } from "enzyme";

describe("Hello component", () => {
  it("Should render", () => {
    expect(
      shallow(<Hello name="user" />).matchesElement(<h1>Hello World, user!</h1>)
    ).toBe(true);
  });

  it("Should change displayed message when prop changes", () => {
    expect(
      shallow(<Hello name="user" />).matchesElement(<h1>Hello World, user!</h1>)
    ).toBe(true);
    expect(
      shallow(<Hello name="me" />).matchesElement(<h1>Hello World, me!</h1>)
    ).toBe(true);
  });
});
