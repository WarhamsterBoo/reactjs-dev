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

  it("should toggle Creature isAlive when click on it", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        creatures={twoDimArrayGenerator(3, 3, { isAlive: false })}
        generateCreatures={() => twoDimArrayGenerator(3, 3, { isAlive: false })}
        settings={{ ...defaultGameSettings, xDimension: 3, yDimension: 3 }}
      />
    );
    const initialState = sut.find(fakeWorld).props().creatures[1][2].isAlive;

    act(() => {
      sut.find(fakeWorld).props().onClick(1, 2);
    });
    sut.update();

    expect(sut.find(fakeWorld).props().creatures[1][2].isAlive).toBe(
      !initialState
    );
  });

  it("should be able to decrease size without creatures state reset", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        creatures={twoDimArrayGenerator(3, 3, { isAlive: false })}
        generateCreatures={() => twoDimArrayGenerator(3, 3, { isAlive: false })}
        settings={{ ...defaultGameSettings, xDimension: 3, yDimension: 3 }}
      />
    );
    act(() => {
      sut.find(fakeWorld).props().onClick(0, 0);
      sut.find(fakeWorld).props().onClick(1, 1);
      sut.find(fakeWorld).props().onClick(2, 0);
    });
    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ isAlive: true }, { isAlive: false }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
      [{ isAlive: true }, { isAlive: false }, { isAlive: false }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, xDimension: 2, yDimension: 2 },
    });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ isAlive: true }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: true }],
    ]);
  });
});
