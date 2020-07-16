import { AppState } from "@/AppStore";
import { AuthStatus } from "@/features/Authentication";
import { GameSettings } from "@/features/Game/gameStore";
import { userNameSelector } from "./authStoreSelectors";

describe("gameStoreSelectors", () => {
  const settings: GameSettings = {
    xDimension: 2,
    yDimension: 3,
    fillingPercentage: 0.5,
  };
  const appState: AppState = {
    auth: {
      status: AuthStatus.authenticated,
      userName: "Bob",
      loginError: undefined,
    },
    game: {
      creatures: [],
      settings,
    },
  };
  it("should select settings", () => {
    expect(userNameSelector(appState)).toEqual("Bob");
  });
});
