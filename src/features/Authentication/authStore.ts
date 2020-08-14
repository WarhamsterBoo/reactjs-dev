import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";

export enum AuthStatus {
  authenticated,
  not_authenticated,
  failed,
  in_progress,
}

export interface AuthState {
  userName: string | undefined;
  status: AuthStatus;
  loginError: string | undefined;
}

const initialState: AuthState = {
  userName: undefined,
  status: AuthStatus.not_authenticated,
  loginError: undefined,
};

export const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    username_changes: (state, action: PayloadAction<string>) => {
      if (
        state.status == AuthStatus.not_authenticated ||
        state.status == AuthStatus.failed
      ) {
        state.userName = action.payload;
      }
    },
    login: (state, _: AnyAction) => {
      state.status = AuthStatus.in_progress;
      state.loginError = undefined;
    },
    login_success: (state, _: AnyAction) => {
      state.status = AuthStatus.authenticated;
    },
    login_failed: (state, action: PayloadAction<string>) => {
      state.status = AuthStatus.failed;
      state.loginError = action.payload;
    },
    logout: () => initialState,
  },
});
