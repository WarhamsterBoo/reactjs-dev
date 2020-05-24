import { auth } from "api/auth";
import { shallow } from "enzyme";
import React from "react";
import { LoginScreen } from "./LoginScreen";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("api/auth");

describe("LoginScreen", () => {
  it("should redirect to game screen after auth", () => {
    const sut = shallow(<LoginScreen />);

    (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });

  it("should call auth api with userName", () => {
    const sut = shallow(<LoginScreen />);

    (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(auth.logIn).toHaveBeenCalledWith("John Doe");
  });
});
