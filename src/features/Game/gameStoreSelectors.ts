import { AppState } from "@/AppStore";
import { GameSettings, GameStatus } from "./gameStore";

export const settingsSelector = (state: AppState): GameSettings =>
  state.game.settings;

export const gameStatusSelector = (state: AppState): GameStatus =>
  state.game.settings.status;

export const gameSpeedSelector = (state: AppState): number =>
  state.game.settings.speed;
