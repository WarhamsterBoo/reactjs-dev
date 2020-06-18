import { combineReducers, createStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./components/Game";

const rootReducer = combineReducers({
  settings: settingsSlice.reducer,
});

export const store = createStore(rootReducer);
