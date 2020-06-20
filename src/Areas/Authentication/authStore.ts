import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AuthStatus {
  authenticated,
  not_authenticated,
  failed,
  in_progress,
}

export interface AuthState {
  userName: string | undefined;
  status: AuthStatus;
}

const initialState: AuthState = {
  userName: undefined,
  status: AuthStatus.not_authenticated,
};

export const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, _) => {
      state.status = AuthStatus.in_progress
    },
    login_success: (state, action: PayloadAction<string>) => state,
    login_failed: (state, action: PayloadAction<string>) => state,
    logout: () => { },
  },
});
