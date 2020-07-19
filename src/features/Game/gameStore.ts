import { matrixGenerator, resizeMatrix } from "@/utils/arrayUtils";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Engine } from "./Engine";
import { ControlAction } from "./components";

export interface Creature {
  isAlive: boolean;
}

export const ALIVE: Creature = {
  isAlive: true,
};

export const DEAD: Creature = {
  isAlive: false,
};

export type Population = Creature[][];

export enum GameStatus {
  Paused,
  Running,
  Stopped,
}

export interface GameSettings {
  xDimension: number;
  yDimension: number;
  fillingPercentage: number;
  status: GameStatus;
  speed: number;
}

export interface GameState {
  settings: GameSettings;
  creatures: Population;
}

export interface CreatureCoordinates {
  x: number;
  y: number;
}

const initialState: GameState = {
  settings: {
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
    status: GameStatus.Stopped,
    speed: 10,
  },
  creatures: matrixGenerator<Creature>(10, 10, DEAD),
};

const changeCreaturesSize = (
  creatures: Population,
  xDimension: number,
  yDimension: number
): Creature[][] => {
  return resizeMatrix(creatures, xDimension, yDimension, DEAD);
};

const isStatusChangeAction = (action: ControlAction): Boolean => {
  return action == "stop" || action == "run" || action == "pause";
};

const isSpeedChangeAction = (action: ControlAction): Boolean => {
  return action == "normal" || action == "slower" || action == "faster";
};

const mapGameStatus = (action: ControlAction): GameStatus => {
  switch (action) {
    case "run":
      return GameStatus.Running;
    case "stop":
      return GameStatus.Stopped;
    case "pause":
      return GameStatus.Paused;
    default:
      return GameStatus.Stopped;
  }
};

const computeGameSpeed = (
  initialSpeed: number,
  action: ControlAction
): number => {
  switch (action) {
    case "faster":
      if (initialSpeed < 20) {
        return initialSpeed + 1;
      }
      break;
    case "slower":
      if (initialSpeed > 0) {
        return initialSpeed - 1;
      }
      break;
    case "normal":
      return 10;
  }
  return initialSpeed;
};

export const gameStore = createSlice({
  name: "game",
  initialState,
  reducers: {
    applySettings: (state, _: AnyAction) => state,
    changeSettings: (state, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
    },
    resizeCreatures: (state, _: AnyAction) => {
      state.creatures = changeCreaturesSize(
        state.creatures,
        state.settings.xDimension,
        state.settings.yDimension
      );
    },
    generateNewCreatures: (state, _: AnyAction) => {
      const { xDimension, yDimension, fillingPercentage } = {
        ...state.settings,
      };
      state.creatures = Engine.firstGeneration(
        xDimension,
        yDimension,
        fillingPercentage
      );
    },
    newGeneration: (state, _: AnyAction) => {
      state.creatures = Engine.nextGeneration(state.creatures);
    },
    toggleCreatureState: (
      state,
      action: PayloadAction<CreatureCoordinates>
    ) => {
      const { x, y } = action.payload;
      state.creatures = state.creatures.map((row, rowIndex) => {
        if (rowIndex == x) {
          return row.map((value, inRowIndex) => ({
            isAlive: inRowIndex == y ? !value.isAlive : value.isAlive,
          }));
        }
        return row;
      });
    },
    executeControlAction: (state, action: PayloadAction<ControlAction>) => {
      if (isStatusChangeAction(action.payload)) {
        state.settings.status = mapGameStatus(action.payload);
      }
      if (isSpeedChangeAction(action.payload)) {
        state.settings.speed = computeGameSpeed(
          state.settings.speed,
          action.payload
        );
      }
    },
    reset: (state, _: AnyAction) => initialState,
  },
});
