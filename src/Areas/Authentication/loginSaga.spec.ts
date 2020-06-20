import { expectSaga } from "redux-saga-test-plan";
import { loginSaga } from "./loginSaga";
import { authStore, AuthStatus } from "./authStore";

describe("login saga", () => {
  it("should login new user successfully", () => {
    expectSaga(loginSaga)
      .withReducer(authStore.reducer)
      .withState({
        userName: undefined,
        status: AuthStatus.not_authenticated,
        loginError: undefined,
      })
      .dispatch(authStore.actions.login("John Doe"))
      .hasFinalState({
        userName: "John Doe",
        status: AuthStatus.authenticated,
        loginError: undefined,
      })
      .run();
  });
});
