import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameStore } from "./components/Game";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  gameStore.reducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
