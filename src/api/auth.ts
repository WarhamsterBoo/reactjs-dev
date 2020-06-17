const waitFor = async (ms: number) => new Promise((r) => setTimeout(r, ms));

export const auth = {
  logIn: async (username: string): Promise<void> => {
    await waitFor(1000);
    localStorage.setItem("username", username);
  },
  logOut: async (): Promise<void> => {
    await waitFor(1000);
    localStorage.removeItem("username");
  },
  isAuthenticated: (): Boolean => {
    return Boolean(localStorage["username"]);
  },
  currentUsername: (): string => {
    return String(localStorage["username"]);
  },
};
