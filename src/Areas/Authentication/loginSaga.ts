import { auth } from "@/api/auth";
import { userSessionStorage } from "@/api/userSessionStorage";
import { call, fork, put, take } from "redux-saga/effects";
import { authStore } from "./authStore";

export function* restoreCurrentSession() {
  const currentUsername: undefined | string = yield call(
    userSessionStorage.getCurrentSession
  );
  if (currentUsername && currentUsername.length > 0) {
    yield put(authStore.actions.login(currentUsername));
  }
}

export function* loginSaga() {
  yield fork(restoreCurrentSession);

  while (true) {
    const userName = (yield take(authStore.actions.login.type)).payload;
    try {
      yield call(auth.login, userName);
    } catch (e) {
      yield put(authStore.actions.login_failed(e.message));
      return;
    }
    yield put(authStore.actions.login_success());
    yield call(userSessionStorage.newSession, userName);

    yield take(authStore.actions.logout.type);
    yield call(auth.logout);
    yield call(userSessionStorage.endSession);
  }
}
