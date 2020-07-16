import { AppState } from "@/AppStore";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AuthStatus, authStore } from "../authStore";
import { Login } from ".";

const store = configureMockStore<AppState>([])({
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
});

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("Login", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("should redirect to game screen after auth", async () => {
    const sut = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    await (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });
});
