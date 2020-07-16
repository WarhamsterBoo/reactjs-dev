import { auth } from "@/api/auth";
import { userSessionStorage } from "@/api/userSessionStorage";
import { appReducer, AppState } from "@/AppStore";
import { GameStatus } from "@/features/Game";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { AuthStatus, authStore } from "./authStore";
import { loginSaga, restoreCurrentSession } from "./loginSaga";

describe("login flow", () => {
  describe("restoreCurrentSessionSaga", () => {
    it("should dispatch login action with correct username if user session exists in storage", () => {
      const sut = expectSaga(restoreCurrentSession).provide([
        [call(userSessionStorage.getCurrentSession), "Jane Doe"],
      ]);

      return sut
        .put(authStore.actions.login())
        .put(authStore.actions.username_changes("Jane Doe"))
        .silentRun();
    });
  });

  describe("loginSaga", () => {
    it("should login new user successfully", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
        ])
        .withReducer(appReducer)
        .withState<AppState>({
          game: {
            settings: {
              xDimension: 1,
              yDimension: 1,
              fillingPercentage: 0,
              status: GameStatus.Stopped,
              speed: 1,
            },
            creatures: [],
          },
          auth: {
            userName: undefined,
            status: AuthStatus.not_authenticated,
            loginError: undefined,
          },
        })
        .dispatch(authStore.actions.username_changes("John Doe"))
        .dispatch(authStore.actions.login());

      return sut
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
        .withState<AppState>({
          game: {
            settings: {
              xDimension: 1,
              yDimension: 1,
              fillingPercentage: 0,
              status: GameStatus.Stopped,
              speed: 1,
            },
            creatures: [],
          },
          auth: {
            userName: undefined,
            status: AuthStatus.not_authenticated,
            loginError: undefined,
          },
        });

      return sut
        .fork(restoreCurrentSession)
        .put(authStore.actions.username_changes("John Doe"))
        .put(authStore.actions.login())
        .call(auth.login, "John Doe")
        .call(userSessionStorage.newSession, "John Doe")
        .put(authStore.actions.login_success())
        .silentRun();
    });

    it("should logout user", () => {
      const sut = expectSaga(loginSaga)
        .provide([
          [call(userSessionStorage.getCurrentSession), undefined],
          [call(auth.login, "John Doe"), {}],
          [call(auth.logout), {}],
        ])
        .withReducer(appReducer)
        .withState<AppState>({
          game: {
            settings: {
              xDimension: 1,
              yDimension: 1,
              fillingPercentage: 0,
              status: GameStatus.Stopped,
              speed: 1,
            },
            creatures: [],
          },
          auth: {
            userName: undefined,
            status: AuthStatus.not_authenticated,
            loginError: undefined,
          },
        })
        .dispatch(authStore.actions.username_changes("John Doe"))
        .dispatch(authStore.actions.login())
        .dispatch(authStore.actions.logout());

      return sut
        .call(auth.logout)
        .call(userSessionStorage.endSession)
        .silentRun();
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
        .withReducer(appReducer)
        .withState<AppState>({
          game: {
            settings: {
              xDimension: 1,
              yDimension: 1,
              fillingPercentage: 0,
              status: GameStatus.Stopped,
              speed: 1,
            },
            creatures: [],
          },
          auth: {
            userName: undefined,
            status: AuthStatus.not_authenticated,
            loginError: undefined,
          },
        })
        .dispatch(authStore.actions.username_changes("John Doe"))
        .dispatch(authStore.actions.login());

      return sut
        .put(authStore.actions.login_failed("something went wrong"))
        .silentRun();
    });
  });
});
