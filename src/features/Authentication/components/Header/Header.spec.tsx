import { authStore } from "@/features/Authentication";
import React from "react";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { Header } from "./Header";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("Header", () => {
  it("should call logOutUser function prop when Logout button clicked", () => {
    const { sut, store } = mountWithMockStore(<Header />);

    sut.find("Styled(button)").simulate("click");

    expect(store.getActions()).toEqual([authStore.actions.logout()]);
  });
});
