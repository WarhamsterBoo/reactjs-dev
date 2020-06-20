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

  it("should set in_progress authentication status at login action", () => {
    expect(authStore.reducer({
      userName: undefined,
      status: AuthStatus.not_authenticated
    }, authStore.actions.login)).toEqual({
      userName: undefined,
      status: AuthStatus.in_progress
    });
  })
});
