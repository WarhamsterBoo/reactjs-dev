import { auth } from "api/auth";
import { userSessionStorage } from "api/userSessionStorage";
import { call, fork, put, take } from "redux-saga/effects";
import { authStore } from "./authStore";

export function* restoreCurrentSession() {
  const currentUsername: string = yield call(userSessionStorage.getCurrentSession);
  if (currentUsername && currentUsername.length > 0) {
    yield put(authStore.actions.login(currentUsername))
  }
}

export function* loginSaga() {
  yield fork(restoreCurrentSession);

  const userName = (yield take(authStore.actions.login)).payload;

  yield call(auth.login, userName);
  yield put(authStore.actions.login_success);

  yield take(authStore.actions.logout);
  yield put(authStore.actions.logout);
}
