import { auth } from "api/auth";
import { shallow } from "enzyme";
import React from "react";
import { Login } from "./Login";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("api/auth");

describe("Login", () => {
  it("should redirect to game screen after auth", async () => {
    const sut = shallow(<Login />);

    await (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });

  it("should call auth api with userName", async () => {
    const sut = shallow(<Login />);

    await (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(auth.login).toHaveBeenCalledWith("John Doe");
  });
});
