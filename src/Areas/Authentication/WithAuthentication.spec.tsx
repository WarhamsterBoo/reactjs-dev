import configureMockStore from "redux-mock-store";
import { AppState } from "@/AppStore";
import { AuthStatus } from "./authStore";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { WithAuthentication } from "./WithAuthentication";
import React from "react";
import { ForbiddenScreen } from "screens/ForbiddenScreen";

jest.mock("screens/ForbiddenScreen");

const storeDefaultState: AppState = {
  auth: {
    loginError: undefined,
    status: AuthStatus.not_authenticated,
    userName: undefined,
  },
  game: {
    creatures: [],
    settings: {
      fillingPercentage: 0,
      xDimension: 0,
      yDimension: 0,
    },
  },
};
const mockStore = configureMockStore<AppState>([]);

describe("WithAuthentication", () => {
  it("should render Access Denied Screen if user is not authenticated", () => {
    const store = mockStore(storeDefaultState);
    const sut = mount(
      <Provider store={store}>
        <WithAuthentication>
          <div>Hello there!</div>
        </WithAuthentication>
      </Provider>
    );

    expect(sut.find(ForbiddenScreen)).toHaveLength(1);
  });
});
