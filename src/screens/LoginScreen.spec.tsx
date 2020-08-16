import { shallow } from "enzyme";
import React from "react";
import { LoginScreen } from "./LoginScreen";

describe("LoginScreen", () => {
  it("should render", () => {
    const sut = shallow(<LoginScreen />);

    expect(sut).toMatchInlineSnapshot(`<Connect(LoginForm) />`);
  });
});
