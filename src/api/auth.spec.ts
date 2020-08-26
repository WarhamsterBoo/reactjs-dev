import { enableFetchMocks } from "jest-fetch-mock";
import { auth } from "./auth";

describe("auth", () => {
  beforeAll(() => {
    enableFetchMocks();
  });

  beforeEach(() => {
    fetchMock.mockReset();
  });

  describe("login", () => {
    it("should call LogIn endpoint with passed username", async () => {
      fetchMock.mockResponse("https://boo-app.azurewebsites.net/api/LogIn", {
        status: 200,
      });
      await auth.login("Alice");

      expect(fetchMock.mock.calls).toHaveLength(1);
      expect(fetchMock.mock.calls[0][0]).toContain("name=Alice");
    });

    it("should throw if response was not ok", async () => {
      fetchMock.mockResponse("https://boo-app.azurewebsites.net/api/LogIn", {
        status: 403,
        statusText: "forbidden",
      });

      await expect(auth.login("Bob")).rejects.toThrow(
        "Cannot login because: 403 forbidden"
      );
    });
  });

  describe("logout", () => {
    it("should call LogOut endpoint with passed username", async () => {
      fetchMock.mockResponse("https://boo-app.azurewebsites.net/api/LogOut", {
        status: 200,
      });
      await auth.logout("Alice");

      expect(fetchMock.mock.calls).toHaveLength(1);
      expect(fetchMock.mock.calls[0][0]).toContain("name=Alice");
    });
  });
});
