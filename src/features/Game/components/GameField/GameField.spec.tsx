import { DEAD, GameStatus } from "@/features/Game";
import { matrixGenerator } from "@/utils/arrayUtils";
import { shallow } from "enzyme";
import React from "react";
import { GameField } from "./GameField";

describe("Game Field", () => {
  it("should render", () => {
    const settings = {
      xDimension: 10,
      yDimension: 10,
      fillingPercentage: 10,
      speed: 10,
      status: GameStatus.Stopped,
    };
    const sut = shallow(
      <GameField
        creatures={matrixGenerator(10, 10, DEAD)}
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
              "xDimension": 10,
              "yDimension": 10,
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
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
              ],
              Array [
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
                Object {
                  "isAlive": false,
                },
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
});
