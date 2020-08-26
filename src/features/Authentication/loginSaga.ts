import { auth } from "@/api/auth";
import { userSessionStorage } from "@/api/userSessionStorage";
import { call, fork, put, take, select } from "redux-saga/effects";
import { authStore } from "./authStore";
import { userNameSelector } from "./authStoreSelectors";
import { gameStore } from "../Game";
import { push } from "connected-react-router";

export function* restoreCurrentSession() {
  const currentUsername: undefined | string = yield call(
    userSessionStorage.getCurrentSession
  );
  if (currentUsername && currentUsername.length > 0) {
    yield put(authStore.actions.change_username(currentUsername));
    yield put(authStore.actions.login());
  }
}

export function* loginSaga() {
  yield fork(restoreCurrentSession);

  while (true) {
    yield take(authStore.actions.login.type);

    const userName = yield select(userNameSelector);
    if (!userName) {
      yield put(authStore.actions.login_failed("user name cannot be empty"));
      continue;
    }

    yield put(push("/"));

    try {
      yield call(auth.login, userName);
    } catch (e) {
      yield put(authStore.actions.login_failed(e.message));
      continue;
    }
    yield put(authStore.actions.login_success());
    yield call(userSessionStorage.newSession, userName);

    yield take(authStore.actions.logout.type);
    yield put(gameStore.actions.stop());

    yield put(push("/login"));
    yield call(auth.logout, userName);
    yield call(userSessionStorage.endSession);
  }
}
