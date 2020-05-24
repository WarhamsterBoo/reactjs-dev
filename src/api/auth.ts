export const auth = {
  logIn: (username: string) => {
    localStorage.setItem("username", username);
  },
  logOut: () => {
    localStorage.removeItem("username");
  },
  isAuthenticated: () => {
    console.log(`is authenticated`);
  },
};
