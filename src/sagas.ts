import { loginSaga } from "@/features/Authentication/loginSaga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([loginSaga()]);
}
