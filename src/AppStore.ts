import { applyMiddleware, createStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameStore } from "./components/Game";
import { rootSaga } from "./sagas";
import { authStore } from "./Areas/Authentication/authStore";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: gameStore.reducer,
  auth: authStore.reducer
});

export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
  
export type AppState = ReturnType<typeof reducer>