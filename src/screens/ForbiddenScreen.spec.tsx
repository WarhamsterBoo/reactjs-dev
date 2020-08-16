import { shallow } from "enzyme";
import React from "react";
import { ForbiddenScreen } from "./ForbiddenScreen";

describe("ForbiddenScreen", () => {
  it("should render", () => {
    const sut = shallow(<ForbiddenScreen />);

    expect(sut).toMatchInlineSnapshot(`
      <Fragment>
        <h1>
          Access Denied. Please Log In.
        </h1>
        <Link
          to="/login"
        >
          Authenticate
        </Link>
      </Fragment>
    `);
  });
});
