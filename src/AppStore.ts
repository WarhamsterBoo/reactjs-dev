import { createStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./components/Game";

export const store = createStore(
  settingsSlice.reducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
