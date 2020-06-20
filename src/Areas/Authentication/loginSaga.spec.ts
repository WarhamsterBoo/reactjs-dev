import { expectSaga } from "redux-saga-test-plan";
import { loginSaga, restoreCurrentSession } from "./loginSaga";
import { authStore, AuthStatus } from "./authStore";
import { userSessionStorage } from "api/userSessionStorage";
import { call } from "redux-saga-test-plan/matchers";
import { auth } from "api/auth";

describe("login flow", () => {
  describe("loginSaga", () => {
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
        .put(authStore.actions.login_success)
        .call(auth.login, "John Doe")
        .dispatch(authStore.actions.logout())
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
        .fork(restoreCurrentSession)
        .put(authStore.actions.login("John Doe"))
        .put(authStore.actions.login_success)
        .call(auth.login, "John Doe")
        .dispatch(authStore.actions.logout())
        .run();
    });

    it("should logout user", () => {
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
        .dispatch(authStore.actions.logout())
        .hasFinalState({
          userName: undefined,
          status: AuthStatus.not_authenticated,
          loginError: undefined,
        })
        .run();
    });
  });
});
