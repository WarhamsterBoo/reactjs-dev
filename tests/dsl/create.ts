import { AppState } from "@/AppStore";
import { AuthState, AuthStatus } from "@/features/Authentication";
import {
  DEAD,
  GameSettings,
  GameState,
  GameStatus,
  Population,
} from "@/features/Game/gameStore";
import { matrixGenerator } from "@/utils/arrayUtils";
import configureMockStore from "redux-mock-store";

export const create = {
  appState: (overrides?: Partial<AppState>): AppState => ({
    auth: create.authState(),
    game: {
      creatures: [],
      settings: create.gameSettings(),
    },
    ...overrides,
  }),

  defaultAuthState: () => ({
    loginError: undefined,
    status: AuthStatus.not_authenticated,
    userName: undefined,
  }),
  authState: (overrides?: Partial<AuthState>): AuthState => ({
    loginError: undefined,
    userName: "John Doe",
    status: AuthStatus.authenticated,
    ...overrides,
  }),

  defaultGameSettings: (): GameSettings => ({
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
    speed: 10,
    status: GameStatus.Stopped,
  }),
  gameSettings: (overrides?: Partial<GameSettings>): GameSettings => ({
    xDimension: 11,
    yDimension: 11,
    fillingPercentage: 10,
    speed: 15,
    status: GameStatus.Stopped,
    ...overrides,
  }),

  defaultCreatures: (): Population => matrixGenerator(10, 10, DEAD),
  creatures: (): Population => matrixGenerator(11, 11, DEAD),

  defaultGameState: () => ({
    creatures: create.defaultCreatures(),
    settings: create.defaultGameSettings(),
  }),
  gameState: (overrides?: Partial<GameState>): GameState => ({
    creatures: create.creatures(),
    settings: create.gameSettings(),
    ...overrides,
  }),

  mockStore: (stateOverrides?: Partial<AppState>) =>
    configureMockStore<AppState>([])({
      auth: create.defaultAuthState(),
      game: {
        creatures: [],
        settings: create.gameSettings(),
      },
      ...stateOverrides,
    }),
};
