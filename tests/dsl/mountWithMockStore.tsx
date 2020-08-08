import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { create } from "tests/dsl/create";

export const mountWithMockStore = (Component: React.ComponentType) => {
    const store = create.mockStore();
    return {
        sut: mount(
            <Provider store={store} >
                <Component />
            </ Provider>
        ),
        store
    }
}