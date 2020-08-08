import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { Login } from ".";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("Login", () => {
  it("should redirect to game screen after auth", async () => {
    const { sut } = mountWithMockStore(Login);

    await (sut.find("NameForm").prop("onNameSubmit") as Function)("John Doe");

    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });
});
