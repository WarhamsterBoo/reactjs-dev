interface GameEngine {
  GenerateCreatures: (settings: GameSettings) => WorldCreature[][];
}
