import { AppState } from "@/AppStore";

export const userNameSelector = (state: AppState): string | undefined =>
  state.auth.userName;
