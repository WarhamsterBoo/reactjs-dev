import { create } from "tests/dsl/create";
import { GameSettings, GameStatus } from "./gameStore";
import {
  gameSpeedSelector,
  gameStatusSelector,
  settingsSelector,
} from "./gameStoreSelectors";

describe("gameStoreSelectors", () => {
  it("should select settings", () => {
    const settings: GameSettings = create.gameSettings({
      xDimension: 2,
      yDimension: 3,
      fillingPercentage: 50,
      speed: 15,
    });
    expect(
      settingsSelector(
        create.appState({
          game: create.gameState({
            settings,
          }),
        })
      )
    ).toEqual(settings);
  });

  it.each`
    gameStatus
    ${GameStatus.Running}
    ${GameStatus.Stopped}
    ${GameStatus.Paused}
  `("should correctly select $gameStatus game status", ({ gameStatus }) => {
    expect(
      gameStatusSelector(
        create.appState({
          game: create.gameState({
            settings: create.gameSettings({
              status: gameStatus,
            }),
          }),
        })
      )
    ).toEqual(gameStatus);
  });

  it("should select game speed", () => {
    expect(
      gameSpeedSelector(
        create.appState({
          game: create.gameState({
            settings: create.gameSettings({
              speed: 19,
            }),
          }),
        })
      )
    ).toEqual(19);
  });
});
