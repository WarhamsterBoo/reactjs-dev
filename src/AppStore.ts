import { authStore } from "@/features/Authentication";
import { gameStore } from "@/features/Game";
import { rootSaga } from "@/sagas";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const appHistory = createBrowserHistory();

export const appReducer = combineReducers({
  game: gameStore.reducer,
  auth: authStore.reducer,
  router: connectRouter(appHistory),
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  appReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(appHistory))
  )
);
sagaMiddleware.run(rootSaga);

export type AppState = Omit<ReturnType<typeof appReducer>, "router">;
