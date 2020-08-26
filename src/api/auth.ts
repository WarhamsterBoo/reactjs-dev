const logInUrl =
  "https://boo-app.azurewebsites.net/api/LogIn?code=J0AXN/GNNMlhLTGpgyNzGpAP411pVoke36nneE/4MA2RDP03QD1ydg==";

const logOutUrl =
  "https://boo-app.azurewebsites.net/api/LogOut?code=4PZVWzzptRP8ZJtBwHYzN9YVVdONDaChE1A0PdbRXY1LMDRNqKVovA==";

export const auth = {
  login: async (username: string): Promise<void> =>
    fetch(`${logInUrl}&name=${username}`).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Cannot login because: ${response.status} ${response.statusText}`
        );
      }
    }),

  logout: async (username: string): Promise<void> => {
    fetch(`${logOutUrl}&name=${username}`);
  },
};
