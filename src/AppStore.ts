import { combineReducers, createStore } from "@reduxjs/toolkit";
import { reducer as settingsReducer } from "./components/Game";

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export const store = createStore(rootReducer);
