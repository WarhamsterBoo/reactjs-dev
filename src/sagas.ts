import { loginSaga } from "@/features/Authentication/loginSaga";
import { all } from "redux-saga/effects";
import { gameSaga } from "@/features/Game/gameSaga";

export function* rootSaga() {
  yield all([loginSaga(), gameSaga()]);
}
