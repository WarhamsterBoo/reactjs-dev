import { shallow } from "enzyme";
import React from "react";
import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    const sut = shallow(<App />);

    expect(sut).toMatchInlineSnapshot(`
      <Provider
        store={
          Object {
            "dispatch": [Function],
            "getState": [Function],
            "replaceReducer": [Function],
            "subscribe": [Function],
            Symbol(observable): [Function],
          }
        }
      >
        <Styled(div)>
          <Connect(ConnectedRouterWithContext)
            history={
              Object {
                "action": "POP",
                "block": [Function],
                "createHref": [Function],
                "go": [Function],
                "goBack": [Function],
                "goForward": [Function],
                "length": 1,
                "listen": [Function],
                "location": Object {
                  "hash": "",
                  "pathname": "/",
                  "search": "",
                  "state": undefined,
                },
                "push": [Function],
                "replace": [Function],
              }
            }
          >
            <Switch>
              <Route
                exact={true}
                path="/login"
              >
                <Connect(LoginForm) />
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
                <GameScreen />
              </Route>
            </Switch>
          </Connect(ConnectedRouterWithContext)>
        </Styled(div)>
      </Provider>
    `);
  });
});
