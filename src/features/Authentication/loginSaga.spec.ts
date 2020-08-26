import { auth } from "@/api/auth";
import { userSessionStorage } from "@/api/userSessionStorage";
import { appReducer, AppState } from "@/AppStore";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { create } from "tests/dsl/create";
import { authStore } from "./authStore";
import { loginSaga, restoreCurrentSession } from "./loginSaga";
import { gameStore } from "../Game";
import { push } from "connected-react-router";
import { userNameSelector } from "./authStoreSelectors";
import { take } from "redux-saga/effects";

describe("login flow", () => {
  describe("restoreCurrentSessionSaga", () => {
    it("should dispatch login action with correct username if user session exists in storage", () => {
      const sut = expectSaga(restoreCurrentSession).provide([
        [call(userSessionStorage.getCurrentSession), "Jane Doe"],
      ]);

      return sut
        .put(authStore.actions.login())
        .put(authStore.actions.change_username("Jane Doe"))
        .silentRun();
    });

    it.each`
      userStorage
      ${undefined}
      ${""}
    `(
      "should not dispatch login action if user session does not exists in storage",
      ({ userStorage }) => {
        const sut = expectSaga(restoreCurrentSession).provide([
          [call(userSessionStorage.getCurrentSession), userStorage],
        ]);

        return sut.run().then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
      }
    );
  });

  describe("loginSaga", () => {
    it("should login new user successfully", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
        ])
        .withReducer(appReducer)
        .withState<AppState>(create.appState())
        .dispatch(authStore.actions.change_username("John Doe"))
        .dispatch(authStore.actions.login());

      return sut
        .put(push("/"))
        .put(authStore.actions.login_success())
        .call(auth.login, "John Doe")
        .call(userSessionStorage.newSession, "John Doe")
        .silentRun();
    });

    it("should restore user successfully", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), "John Doe"],
          [call(auth.login, "John Doe"), {}],
        ])
        .withReducer(appReducer)
        .withState<AppState>(create.appState());

      return sut
        .fork(restoreCurrentSession)
        .put(authStore.actions.change_username("John Doe"))
        .put(authStore.actions.login())
        .call(auth.login, "John Doe")
        .call(userSessionStorage.newSession, "John Doe")
        .put(push("/"))
        .put(authStore.actions.login_success())
        .silentRun();
    });

    it("should logout user", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
          [call(auth.logout, "John Doe"), {}],
        ])
        .withReducer(appReducer)
        .withState<AppState>(create.appState())
        .dispatch(authStore.actions.change_username("John Doe"))
        .dispatch(authStore.actions.login())
        .dispatch(authStore.actions.logout());

      return sut
        .put(push("/login"))
        .call(auth.logout, "John Doe")
        .call(userSessionStorage.endSession)
        .put(gameStore.actions.stop())
        .silentRun();
    });

    it("should not login user if call to auth was not successful and wait for next login action", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [
            call(auth.login, "John Doe"),
            throwError(new Error("something went wrong")),
          ],
        ])
        .withReducer(appReducer)
        .withState<AppState>(create.appState())
        .dispatch(authStore.actions.change_username("John Doe"))
        .dispatch(authStore.actions.login());

      return sut
        .put(authStore.actions.login_failed("something went wrong"))
        .take(authStore.actions.login().type)
        .take(authStore.actions.login().type)
        .silentRun();
    });

    it("should not login user if username is empty and wait for next login action", () => {
      const sut = expectSaga(loginSaga)
        .provide([[call(userSessionStorage.getCurrentSession), undefined]])
        .withReducer(appReducer)
        .withState<AppState>(
          create.appState({
            auth: create.authState({
              userName: "",
            }),
          })
        )
        .dispatch(authStore.actions.login());

      return sut
        .put(authStore.actions.login_failed("user name cannot be empty"))
        .take(authStore.actions.login().type)
        .take(authStore.actions.login().type)
        .silentRun();
    });
  });
});
