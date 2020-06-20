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
  yield put(authStore.actions.logout());
  yield call(userSessionStorage.endSession);
}
