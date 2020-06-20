import { authStore, AuthStatus } from "./authStore";

describe("auth store", () => {
  it("should return initial state", () => {
    expect(
      authStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual({
      userName: undefined,
      status: AuthStatus.not_authenticated,
    });
  });
});
