import { GameEngine, GameSettings, WorldPresenter } from "commonTypes/game";
import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { GameCore, GameCoreProps } from "./GameCore";

describe("GameCore", () => {
  const fakeWorld: WorldPresenter = () => null;
  const fakeGameEngine: GameEngine = {
    GenerateCreatures: ({ xDimension, yDimension }) =>
      Array.from({ length: xDimension }).map(() =>
        Array.from({ length: yDimension }).map(() => {
          return { IsAlive: false };
        })
      ),
  };
  const defaultGameSettings: GameSettings = {
    xDimension: 2,
    yDimension: 2,
    fillingPercentage: 0,
  };
  const gameCoreDefaultProps: GameCoreProps = {
    settings: defaultGameSettings,
    world: fakeWorld,
    engine: fakeGameEngine,
  };

  it("should pass an empty creatures list to World if demensions are negative", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        settings={{ ...defaultGameSettings, xDimension: -1, yDimension: -3 }}
      />
    );

    expect(sut.find(fakeWorld).props().creatures).toEqual([]);
  });

  it("should pass an empty creatures list to World if demensions are zero", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        settings={{ ...defaultGameSettings, xDimension: 0, yDimension: 0 }}
      />
    );

    expect(sut.find(fakeWorld).props().creatures).toEqual([]);
  });

  it("should render initialized World component with size 1 x 1", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        settings={{ ...defaultGameSettings, xDimension: 1, yDimension: 1 }}
      />
    );

    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }],
    ]);
  });

  it("should render initialized World component with size 2 x 2", () => {
    const sut = mount(<GameCore {...gameCoreDefaultProps} />);

    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: false }],
    ]);
  });

  it("should use provided engine for initial state", () => {
    const generateCreaturesMock = jest.fn();
    generateCreaturesMock.mockReturnValue([
      [{ IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: true }, { IsAlive: true }],
    ]);

    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        engine={{
          GenerateCreatures: generateCreaturesMock,
        }}
      />
    );

    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: true }, { IsAlive: true }],
    ]);
  });

  it("should change creatures state if filling percentage changes", () => {
    const generateCreaturesMock = jest.fn();
    generateCreaturesMock.mockReturnValue([
      [{ IsAlive: false }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: false }],
    ]);
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        engine={{
          GenerateCreatures: generateCreaturesMock,
        }}
      />
    );
    generateCreaturesMock.mockReturnValue([
      [{ IsAlive: true }, { IsAlive: true }],
      [{ IsAlive: false }, { IsAlive: true }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, fillingPercentage: 0.75 },
    });

    expect(generateCreaturesMock).toHaveBeenCalledWith({
      xDimension: 2,
      yDimension: 2,
      fillingPercentage: 0.75,
    });
    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: true }, { IsAlive: true }],
      [{ IsAlive: false }, { IsAlive: true }],
    ]);
  });

  it("should toggle Creature IsAlive when click on it", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
        settings={{ ...defaultGameSettings, xDimension: 3, yDimension: 3 }}
      />
    );
    const initialState = sut.find(fakeWorld).props().creatures[1][2].IsAlive;

    act(() => {
      sut.find(fakeWorld).props().onClick(1, 2);
    });
    sut.update();

    expect(sut.find(fakeWorld).props().creatures[1][2].IsAlive).toBe(
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
      [{ IsAlive: false }, { IsAlive: true }],
      [{ IsAlive: false }, { IsAlive: true }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, xDimension: 3, yDimension: 3 },
    });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: false }, { IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: false }, { IsAlive: false }],
    ]);
  });

  it("should be able to decrease size without creatures state reset", () => {
    const sut = mount(
      <GameCore
        {...gameCoreDefaultProps}
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
      [{ IsAlive: true }, { IsAlive: false }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: true }, { IsAlive: false }, { IsAlive: false }],
    ]);

    sut.setProps({
      settings: { ...defaultGameSettings, xDimension: 2, yDimension: 2 },
    });

    sut.update();
    expect(sut.find(fakeWorld).props().creatures).toEqual([
      [{ IsAlive: true }, { IsAlive: false }],
      [{ IsAlive: false }, { IsAlive: true }],
    ]);
  });
});
