export const userSessionStorage = {
  newSession: (username: string): void => {
    localStorage.setItem("username", username);
  },
  endSession: (): void => {
    localStorage.removeItem("username");
  },
  getCurrentSession: (): string | undefined => {
    const userName = localStorage["username"];
    if (userName) {
      return String(userName);
    }
    return undefined;
  },
  hasActiveSession: (): boolean => {
    return Boolean(localStorage["username"]);
  },
};
