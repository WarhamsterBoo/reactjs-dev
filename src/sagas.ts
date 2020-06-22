import { loginSaga } from "@/Features/Authentication/loginSaga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([loginSaga()]);
}
