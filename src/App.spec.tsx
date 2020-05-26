import { shallow } from "enzyme";
import React from "react";
import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    const sut = shallow(<App />);

    expect(sut).toMatchInlineSnapshot(`
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/login"
          >
            <LoginScreen />
          </Route>
          <Route
            exact={true}
            path="/forbidden"
          >
            <ForbiddenScreen />
          </Route>
          <Route
            exact={true}
            path="/"
          >
            <Component />
          </Route>
        </Switch>
      </BrowserRouter>
    `);
  });
});
