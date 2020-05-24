import { mount } from "enzyme";
import React from "react";
import { withAuthentication } from "./withAuthentication";

describe("withAuthentication", () => {
  it("should render Component if user is authenticated", () => {
    const Component: React.FC<{ greeting: string }> = ({ greeting }) => {
      return <div>{greeting}, username!</div>;
    };
    const WrappedComponent = withAuthentication(Component);

    const sut = mount(<WrappedComponent greeting={"Hello"} />);

    expect(sut.html()).toMatchInlineSnapshot('"<div>Hello, username!</div>"');
  });
});
