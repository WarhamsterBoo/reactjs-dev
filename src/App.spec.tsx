import { shallow } from "enzyme";
import React from "react";
import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    const sut = shallow(<App />);

    expect(sut).toMatchSnapshot();
  });
});
