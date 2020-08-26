import React from "react";
import { create } from "tests/dsl/create";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { authStore } from "./authStore";
import { Login } from "./Login";

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect state to props", () => {
    const authState = create.authState({
      userName: "Bob",
    });
    const { sut } = mountWithMockStore(<Login />, {
      auth: authState,
    });

    const wrappedComponent = sut.find("LoginForm");
    expect(wrappedComponent.prop("userName")).toEqual("Bob");
  });

  it.each`
    propName              | args         | action
    ${"onUserNameChange"} | ${["Alice"]} | ${authStore.actions.change_username("Alice")}
    ${"onNameSubmit"}     | ${[]}        | ${authStore.actions.login()}
  `(
    "should connect action $action to prop $propName",
    ({ propName, args, action }) => {
      const { sut, store } = mountWithMockStore(<Login />);
      const wrappedComponent = sut.find("LoginForm");

      (wrappedComponent.prop(propName) as Function)(...args);

      expect(store.getActions()).toEqual([action]);
    }
  );
});
