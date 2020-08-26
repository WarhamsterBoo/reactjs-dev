import React from "react";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { Game } from "./Game";
import { create } from "tests/dsl/create";
import { GameStatus, gameStore } from "./gameStore";

describe("Game", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should connect state to props", () => {
    const settings = create.gameSettings({
      xDimension: 10,
      yDimension: 22,
      fillingPercentage: 67,
      speed: 11,
      status: GameStatus.Stopped,
    });
    const creatures = create.creatures();

    const { sut } = mountWithMockStore(<Game />, {
      game: { creatures, settings },
    });

    const wrappedComponent = sut.find("GameField");
    expect(wrappedComponent.prop("settings")).toEqual(settings);
    expect(wrappedComponent.prop("creatures")).toEqual(creatures);
  });

  it.each`
    propName                  | args                       | action
    ${"onControlActionClick"} | ${["run"]}                 | ${gameStore.actions.executeControlAction("run")}
    ${"toggleCreatureState"}  | ${[{ x: 1, y: 2 }]}        | ${gameStore.actions.toggleCreatureState({ x: 1, y: 2 })}
    ${"applySettings"}        | ${[]}                      | ${gameStore.actions.applySettings()}
    ${"onSettingsChange"}     | ${[create.gameSettings()]} | ${gameStore.actions.changeSettings(create.gameSettings())}
  `(
    "should connect action $action to prop $propName",
    ({ propName, args, action }) => {
      const { sut, store } = mountWithMockStore(<Game />);
      const wrappedComponent = sut.find("GameField");

      (wrappedComponent.prop(propName) as Function)(...args);

      expect(store.getActions()).toEqual([action]);
    }
  );
});
