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
    login: (state, _: AnyAction) => {
      state.status = AuthStatus.in_progress;
    },
    login_success: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.status = AuthStatus.authenticated;
    },
    login_failed: (state, action: PayloadAction<string>) => {
      state.status = AuthStatus.failed;
      state.loginError = action.payload;
    },
    logout: () => {},
  },
});
