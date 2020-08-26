import React from "react";
import { create } from "tests/dsl/create";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { authStore } from "./authStore";
import { Header } from "./Header";

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect state to props", () => {
    const authState = create.authState({
      userName: "Bob",
    });
    const { sut } = mountWithMockStore(<Header />, {
      auth: authState,
    });

    const wrappedComponent = sut.find("HeaderPanel");
    expect(wrappedComponent.prop("userName")).toEqual("Bob");
  });

  it.each`
    propName        | args  | action
    ${"logOutUser"} | ${[]} | ${authStore.actions.logout()}
  `(
    "should connect action $action to prop $propName",
    ({ propName, args, action }) => {
      const { sut, store } = mountWithMockStore(<Header />);
      const wrappedComponent = sut.find("HeaderPanel");

      (wrappedComponent.prop(propName) as Function)(...args);

      expect(store.getActions()).toEqual([action]);
    }
  );
});
