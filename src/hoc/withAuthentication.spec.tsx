import { auth } from "api/auth";
import { mount } from "enzyme";
import React from "react";
import { ForbiddenScreen } from "screens/ForbiddenScreen";
import { withAuthentication } from "./withAuthentication";

jest.mock("screens/ForbiddenScreen");
jest.mock("api/auth");

describe("withAuthentication", () => {
  const Component: React.FC<{ greeting: string }> = ({ greeting }) => {
    return <div>{greeting}, username!</div>;
  };
  const WrappedComponent = withAuthentication(Component);

  it("should render Component if user is authenticated", () => {
    (auth.isAuthenticated as jest.Mock).mockReturnValueOnce(true);

    const sut = mount(<WrappedComponent greeting={"Hello"} />);

    expect(sut.find(Component)).toHaveLength(1);
  });

  it("should render Forbidden if user is not authenticated", () => {
    (auth.isAuthenticated as jest.Mock).mockReturnValueOnce(false);

    const sut = mount(<WrappedComponent greeting={"Hello"} />);

    expect(sut.find(ForbiddenScreen)).toHaveLength(1);
  });
});
