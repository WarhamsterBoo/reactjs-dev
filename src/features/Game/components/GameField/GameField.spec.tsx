import { DEAD, GameStatus } from "@/features/Game";
import { matrixGenerator } from "@/utils/arrayUtils";
import { shallow, mount } from "enzyme";
import React from "react";
import { GameField } from "./GameField";
import { create } from "tests/dsl/create";

describe("Game Field", () => {
  it("should render", () => {
    const settings = {
      xDimension: 1,
      yDimension: 1,
      fillingPercentage: 10,
      speed: 10,
      status: GameStatus.Stopped,
    };
    const sut = shallow(
      <GameField
        creatures={matrixGenerator(1, 1, DEAD)}
        settings={settings}
        applySettings={() => {}}
        onControlActionClick={() => {}}
        onSettingsChange={() => {}}
        toggleCreatureState={() => {}}
      />
    );

    expect(sut).toMatchInlineSnapshot(`
      <Styled(div)>
        <SettingsForm
          applySettings={[Function]}
          gameSettings={
            Object {
              "fillingPercentage": 10,
              "speed": 10,
              "status": 2,
              "xDimension": 1,
              "yDimension": 1,
            }
          }
          onSettingsChange={[Function]}
        />
        <World
          creatures={
            Array [
              Array [
                Object {
                  "isAlive": false,
                },
              ],
            ]
          }
          onClick={[Function]}
        />
        <ControlPanel
          onControlButtonClick={[Function]}
        />
      </Styled(div)>
    `);
  });

  it("should call toggleCreatureState callback props with correct arguments", () => {
    const toggleCreatureStateFake = jest.fn();
    const sut = mount(
      <GameField
        creatures={matrixGenerator(10, 10, DEAD)}
        settings={create.gameSettings()}
        applySettings={() => {}}
        onControlActionClick={() => {}}
        onSettingsChange={() => {}}
        toggleCreatureState={toggleCreatureStateFake}
      />
    );

    (sut.find("World").prop("onClick") as Function)(1, 2);

    expect(toggleCreatureStateFake).toBeCalledTimes(1);
    expect(toggleCreatureStateFake).toBeCalledWith({ x: 1, y: 2 });
  });
});
