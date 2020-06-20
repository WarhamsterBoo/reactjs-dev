import { expectSaga } from "redux-saga-test-plan";
import { loginSaga } from "./loginSaga";
import { authStore, AuthStatus } from "./authStore";
import { userSessionStorage } from "api/userSessionStorage";
import { call } from "redux-saga-test-plan/matchers";
import { auth } from "api/auth";

describe("login saga", () => {
  it("should login new user successfully", () => {
    return expectSaga(loginSaga)
      .provide([
        [call(userSessionStorage.getCurrentSession), undefined],
        [call(auth.login, "John Doe"), {}]
      ])
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

  it("should restore user successfully", () => {
    return expectSaga(loginSaga)
      .provide([
        [call(userSessionStorage.getCurrentSession), "John Doe"],
        [call(auth.login, "John Doe"), {}],
      ])
      .withReducer(authStore.reducer)
      .withState({
        userName: undefined,
        status: AuthStatus.not_authenticated,
        loginError: undefined,
      })
      .hasFinalState({
        userName: "John Doe",
        status: AuthStatus.authenticated,
        loginError: undefined,
      })
      .run();
  });
});
