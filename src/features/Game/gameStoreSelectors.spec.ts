import { AppState } from "@/AppStore";
import { AuthStatus } from "@/features/Authentication";
import { GameSettings, GameStatus } from "./gameStore";
import {
  settingsSelector,
  gameStatusSelector,
  gameSpeedSelector,
} from "./gameStoreSelectors";
import { create } from "tests/dsl/create";

describe("gameStoreSelectors", () => {
  const settings: GameSettings = create.gameSettings({
    xDimension: 2,
    yDimension: 3,
    fillingPercentage: 50,
    speed: 15,
  });
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
    expect(settingsSelector(appState)).toEqual(settings);
  });

  it.each`
    gameStatus
    ${GameStatus.Running}
    ${GameStatus.Stopped}
    ${GameStatus.Paused}
  `("should correctly select $gameStatus game status", ({ gameStatus }) => {
    expect(
      gameStatusSelector({
        ...appState,
        game: {
          ...appState.game,
          settings: { ...appState.game.settings, status: gameStatus },
        },
      })
    ).toEqual(gameStatus);
  });

  it("should select game speed", () => {
    expect(gameSpeedSelector(appState)).toEqual(15);
  });
});
