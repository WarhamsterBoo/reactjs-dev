import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authStore } from "@/features/Authentication";
import { gameStore } from "@/features/Game";
import { rootSaga } from "@/sagas";

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
