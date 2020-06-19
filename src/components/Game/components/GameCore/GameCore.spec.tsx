import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { GameCore, GameCoreProps } from "./GameCore";
import { twoDimArrayGenerator } from "@/utils/arrayUtils";

describe("GameCore", () => {
  const fakeWorld: WorldPresenter = () => null;
  const fakeGenerateCreatures = () =>
    twoDimArrayGenerator(2, 2, { isAlive: false });
  const defaultGameSettings: GameSettings = {
    xDimension: 2,
    yDimension: 2,
    fillingPercentage: 0,
  };
  const gameCoreDefaultProps: GameCoreProps = {
    settings: defaultGameSettings,
    world: fakeWorld,
    creatures: fakeGenerateCreatures(),
    generateCreatures: fakeGenerateCreatures,
  };
});
