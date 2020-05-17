import { shallow } from "enzyme";
import React from "react";
import { Game } from ".";

describe("Game", () => {
  it("should render", () => {
    const sut = shallow(<Game />);

    expect(sut).toMatchSnapshot();
  });
});
