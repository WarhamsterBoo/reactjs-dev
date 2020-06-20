import { auth } from "api/auth";
import { call, put, take } from "redux-saga/effects";
import { authStore } from "./authStore";

export function* loginSaga() {
  const userName = (yield take(authStore.actions.login)).payload;
  yield call(auth.login, userName);
  yield put(authStore.actions.login_success);
}
