export const userSessionStorage = {
  newSession: (username: string): void => {
    localStorage.setItem("username", username);
  },
  endSession: (): void => {
    localStorage.removeItem("username");
  },
  getCurrentSession: (): string => {
    return String(localStorage["username"]);
  },
  hasActiveSession: (): boolean => {
    return Boolean(localStorage["username"]);
  },
};
