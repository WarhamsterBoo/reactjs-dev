import { AppState } from "@/AppStore";
import { GameSettings } from "./gameStore";

export const settingsSelector = (state: AppState): GameSettings =>
  state.game.settings;
