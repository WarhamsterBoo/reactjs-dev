import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { create } from "tests/dsl/create";
import { AppState } from "@/AppStore";

export const mountWithMockStore = (
  Component: JSX.Element,
  stateOverrides?: Partial<AppState>
) => {
  const store = create.mockStore(stateOverrides);
  return {
    sut: mount(<Provider store={store}>{Component}</Provider>),
    store,
  };
};
