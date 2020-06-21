import { expectSaga } from "redux-saga-test-plan";
import { loginSaga, restoreCurrentSession } from "./loginSaga";
import { authStore, AuthStatus } from "./authStore";
import { userSessionStorage } from "api/userSessionStorage";
import { call } from "redux-saga-test-plan/matchers";
import { auth } from "api/auth";
import { throwError } from "redux-saga-test-plan/providers";

describe("login flow", () => {
  describe("loginSaga", () => {
    it("should login new user successfully", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
        ])
        .withReducer(authStore.reducer)
        .withState({
          userName: undefined,
          status: AuthStatus.not_authenticated,
          loginError: undefined,
        })
        .dispatch(authStore.actions.login("John Doe"));

      return sut.put(authStore.actions.login_success())
        .call(auth.login, "John Doe")
        .call(userSessionStorage.newSession, "John Doe")
        .run();
    });

    it("should restore user successfully", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), "John Doe"],
          [call(auth.login, "John Doe"), {}],
        ])
        .withReducer(authStore.reducer)
        .withState({
          userName: undefined,
          status: AuthStatus.not_authenticated,
          loginError: undefined,
        });

      return sut.fork(restoreCurrentSession)
        .put(authStore.actions.login("John Doe"))
        .call(auth.login, "John Doe")
        .call(userSessionStorage.newSession, "John Doe")
        .put(authStore.actions.login_success())
        .run();
    });

    it("should logout user", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
          [call(auth.logout), {}],
        ])
        .withReducer(authStore.reducer)
        .withState({
          userName: undefined,
          status: AuthStatus.not_authenticated,
          loginError: undefined,
        })
        .dispatch(authStore.actions.login("John Doe"))
        .dispatch(authStore.actions.logout());

      return sut.call(auth.logout)
        .call(userSessionStorage.endSession)
        .run();
    });

    it("should not login user if call to auth was not successful", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [
            call(auth.login, "John Doe"),
            throwError(new Error("something went wrong")),
          ],
        ])
        .withReducer(authStore.reducer)
        .withState({
          userName: undefined,
          status: AuthStatus.not_authenticated,
          loginError: undefined,
        })
        .dispatch(authStore.actions.login("John Doe"));

      return sut
        .put(authStore.actions.login_failed("something went wrong"))
        .run();
    });
  });
});
