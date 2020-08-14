import { create } from "tests/dsl/create";
import { AuthStatus, authStore } from "./authStore";

describe("auth store", () => {
  it("should return initial state", () => {
    expect(
      authStore.reducer(undefined, { type: "SOMEINVALIDACTIONTYPE" })
    ).toEqual(create.defaultAuthState());
  });

  it("should set in_progress status at login action", () => {
    const initialState = create.authState({
      status: AuthStatus.not_authenticated,
    });

    expect(authStore.reducer(initialState, authStore.actions.login())).toEqual(
      create.authState({
        status: AuthStatus.in_progress,
      })
    );
  });

  it("should clear prevoius error and set status in_progress at login action", () => {
    const initialState = create.authState({
      status: AuthStatus.failed,
      loginError: "something went very wrong",
    });

    expect(authStore.reducer(initialState, authStore.actions.login())).toEqual(
      create.authState({
        status: AuthStatus.in_progress,
        loginError: undefined,
      })
    );
  });

  it("should set authenticated status at login_success action", () => {
    const initialState = create.authState({
      status: AuthStatus.in_progress,
    });

    expect(
      authStore.reducer(initialState, authStore.actions.login_success())
    ).toEqual(
      create.authState({
        status: AuthStatus.authenticated,
      })
    );
  });

  it("should set failed status and loginError at login_failed action", () => {
    const initialState = create.authState({
      status: AuthStatus.in_progress,
      loginError: undefined,
    });

    expect(
      authStore.reducer(
        initialState,
        authStore.actions.login_failed("something went wrong")
      )
    ).toEqual(
      create.authState({
        status: AuthStatus.failed,
        loginError: "something went wrong",
      })
    );
  });

  it("should set not_authenticated status and clear userName at logout action", () => {
    const initialState = create.authState();

    expect(authStore.reducer(initialState, authStore.actions.logout())).toEqual(
      create.defaultAuthState()
    );
  });

  it.each`
    initialAuthState
    ${AuthStatus.not_authenticated}
    ${AuthStatus.failed}
  `(
    "should set userName at username_changes action if auth state $initialAuthState",
    ({ initialAuthState }) => {
      const initialState = create.authState({
        userName: "John Doe",
        status: initialAuthState,
      });

      expect(
        authStore.reducer(
          initialState,
          authStore.actions.username_changes("Bob")
        )
      ).toEqual(
        create.authState({
          userName: "Bob",
          status: initialAuthState,
        })
      );
    }
  );

  it.each`
    initialAuthState
    ${AuthStatus.authenticated}
    ${AuthStatus.in_progress}
  `(
    "should not set userName at username_changes action only if auth state $initialAuthState",
    ({ initialAuthState }) => {
      const initialState = create.authState({
        userName: "John Doe",
        status: initialAuthState,
      });

      expect(
        authStore.reducer(
          initialState,
          authStore.actions.username_changes("Bob")
        )
      ).toEqual(
        create.authState({
          userName: "John Doe",
          status: initialAuthState,
        })
      );
    }
  );

  it("should trim spaces in userName", () => {
    const initialState = create.authState({
      userName: "John Doe",
      status: AuthStatus.not_authenticated,
    });

    expect(
      authStore.reducer(
        initialState,
        authStore.actions.username_changes("    Bob    ")
      )
    ).toEqual(
      create.authState({
        userName: "Bob",
        status: AuthStatus.not_authenticated,
      })
    );
  });
});
