import { authStore, AuthStatus, AuthState } from "./authStore";

describe("auth store", () => {
  it("should return initial state", () => {
    expect(
      authStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual({
      userName: undefined,
      status: AuthStatus.not_authenticated,
      loginError: undefined,
    });
  });

  it("should set in_progress status and userName at login action", () => {
    const initialState: AuthState = {
      userName: undefined,
      status: AuthStatus.not_authenticated,
      loginError: undefined,
    };
    expect(
      authStore.reducer(initialState, authStore.actions.login("John Doe"))
    ).toEqual({
      userName: "John Doe",
      status: AuthStatus.in_progress,
      loginError: undefined,
    });
  });

  it("should clear prevoius error at login action", () => {
    const initialState: AuthState = {
      userName: "John Doe",
      status: AuthStatus.failed,
      loginError: "something went very wrong",
    };
    expect(
      authStore.reducer(initialState, authStore.actions.login("John Doe"))
    ).toEqual({
      userName: "John Doe",
      status: AuthStatus.in_progress,
      loginError: undefined,
    });
  });

  it("should set authenticated status at login_success action", () => {
    const initialState: AuthState = {
      userName: "John Doe",
      status: AuthStatus.in_progress,
      loginError: undefined,
    };
    expect(
      authStore.reducer(initialState, authStore.actions.login_success())
    ).toEqual({
      userName: "John Doe",
      status: AuthStatus.authenticated,
      loginError: undefined,
    });
  });

  it("should set failed status and loginError at login_failed action", () => {
    const initialState: AuthState = {
      userName: "John Doe",
      status: AuthStatus.in_progress,
      loginError: undefined,
    };
    expect(
      authStore.reducer(
        initialState,
        authStore.actions.login_failed("something went wrong")
      )
    ).toEqual({
      userName: "John Doe",
      status: AuthStatus.failed,
      loginError: "something went wrong",
    });
  });

  it("should set not_authenticated status and clear userName at logout action", () => {
    const initialState: AuthState = {
      userName: "John Doe",
      status: AuthStatus.authenticated,
      loginError: undefined,
    };
    expect(authStore.reducer(initialState, authStore.actions.logout())).toEqual(
      {
        userName: undefined,
        status: AuthStatus.not_authenticated,
        loginError: undefined,
      }
    );
  });
});