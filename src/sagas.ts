import { loginSaga } from "@/Areas/Authentication/loginSaga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([loginSaga()]);
}
