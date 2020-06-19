import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { GameCore, GameCoreProps } from "./GameCore";
import { arrayGenerator } from "@/utils/arrayGenerator";

describe("GameCore", () => {
  const fakeWorld: WorldPresenter = () => null;
  const fakeGenerateCreatures = () => arrayGenerator(2, 2, { isAlive: false });
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

  it.skip("should change creatures state if filling percentage changes", () => {
    const generateCreaturesMock = jest.fn();
    generateCreaturesMock.mockReturnValue(
      arrayGenerator(2, 2, { isAlive: false })
    );
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        generateCreatures={generateCreaturesMock}
      />
    );
    generateCreaturesMock.mockReturnValue([
      [{ isAlive: true }, { isAlive: true }],
      [{ isAlive: false }, { isAlive: true }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, fillingPercentage: 0.75 },
    });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ isAlive: true }, { isAlive: true }],
      [{ isAlive: false }, { isAlive: true }],
    ]);
  });

  it("should toggle Creature isAlive when click on it", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        creatures={arrayGenerator(3, 3, { isAlive: false })}
        generateCreatures={() => arrayGenerator(3, 3, { isAlive: false })}
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

  it("should be able to increase size without creatures state reset", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        settings={{ ...defaultGameSettings, xDimension: 2, yDimension: 2 }}
      />
    );
    act(() => {
      sut.find(fakeWorld).props().onClick(0, 1);
      sut.find(fakeWorld).props().onClick(1, 1);
    });
    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ isAlive: false }, { isAlive: true }],
      [{ isAlive: false }, { isAlive: true }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, xDimension: 3, yDimension: 3 },
    });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: true }, { isAlive: false }],
      [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
    ]);
  });

  it("should be able to decrease size without creatures state reset", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        creatures={arrayGenerator(3, 3, { isAlive: false })}
        generateCreatures={() => arrayGenerator(3, 3, { isAlive: false })}
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
