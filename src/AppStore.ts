import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameStore } from "./components/Game";
import { rootSaga } from "./sagas";
import { authStore } from "./Areas/Authentication/authStore";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: gameStore.reducer,
  auth: authStore.reducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;
