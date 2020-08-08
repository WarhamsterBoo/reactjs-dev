import { GameSettings, GameStatus } from "@/features/Game/gameStore"

export const create = {
    gameSettings: (overrides?: Partial<GameSettings>): GameSettings => ({
        xDimension: 10,
        yDimension: 10,
        fillingPercentage: 0,
        speed: 10,
        status: GameStatus.Stopped,
        ...overrides
    })
}