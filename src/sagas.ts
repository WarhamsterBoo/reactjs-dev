import { loginSaga } from "@/Features/Authentication/loginSaga";
import { all } from "redux-saga/effects";
import { gameSaga } from "./Features/Game/gameSaga";

export function* rootSaga() {
  yield all([loginSaga(), gameSaga()]);
}
