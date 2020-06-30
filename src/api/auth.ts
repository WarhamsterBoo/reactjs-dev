const waitFor = async (ms: number) => new Promise((r) => setTimeout(r, ms));

export const auth = {
  login: async (username: string): Promise<void> => {
    await waitFor(1000);
  },
  logout: async (): Promise<void> => {
    await waitFor(1000);
  },
};
