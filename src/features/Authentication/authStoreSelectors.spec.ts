import { AppState } from "@/AppStore";
import { AuthStatus } from "@/features/Authentication";
import { GameSettings, GameStatus } from "@/features/Game/gameStore";
import { userNameSelector } from "./authStoreSelectors";
import { create } from "tests/dsl/create";

describe("gameStoreSelectors", () => {
  const appState = create.appState({
    auth: create.authState({
      userName: "Bob",
    }),
  });

  it("should select settings", () => {
    expect(userNameSelector(appState)).toEqual("Bob");
  });
});
