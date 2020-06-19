import { arrayGenerator } from "@/utils/arrayGenerator";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  settings: GameSettings;
  creatures: WorldCreature[][];
}

const initialState: GameState = {
  settings: { xDimension: 10, yDimension: 10, fillingPercentage: 0 },
  creatures: arrayGenerator(10, 10, { isAlive: false }),
};

const generateRandomCreatures = ({
  xDimension,
  yDimension,
  fillingPercentage,
}: GameSettings): WorldCreature[][] => {
  const creatures = arrayGenerator<WorldCreature>(xDimension, yDimension, {
    isAlive: false,
  });

  let NumberOfAliveCreatures = Math.trunc(
    xDimension * yDimension * fillingPercentage
  );
  while (NumberOfAliveCreatures > 0) {
    const x = Math.floor(Math.random() * Math.floor(xDimension));
    const y = Math.floor(Math.random() * Math.floor(yDimension));
    if (!creatures[x][y].isAlive) {
      creatures[x][y].isAlive = true;
      NumberOfAliveCreatures--;
    }
  }

  return creatures;
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    generateNewCreatures: (state, _: AnyAction) => {
      state.creatures = generateRandomCreatures(state.settings);
    },
    changeSettingsTo: (state, action: PayloadAction<GameSettings>) => {
      if (action.payload.fillingPercentage > 1) {
        throw "FillingPercentage cannot be greater than 1";
      }
      if (action.payload.fillingPercentage < 0) {
        throw "FillingPercentage cannot be less than 0";
      }
      return {
        ...state,
        settings: {
          ...action.payload,
        },
      };
    },
    stop: () => ({ ...initialState }),
  },
});
