import { createStore } from "@reduxjs/toolkit";
import { gameStore } from "./components/Game";

export const store = createStore(
  gameStore.reducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
