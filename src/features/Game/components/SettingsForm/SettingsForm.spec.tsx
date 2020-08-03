import { mount, shallow } from "enzyme";
import React from "react";
import { SettingsForm } from "./SettingsForm";
import { GameSettings, GameStatus } from "../../gameStore";

describe("SettingsForm", () => {
  const defaultInitialSettings: GameSettings = {
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
    speed: 10,
    status: GameStatus.Stopped,
  };

  it("should render", () => {
    const sut = shallow(
      <SettingsForm
        gameSettings={defaultInitialSettings}
        applySettings={jest.fn()}
        onSettingsChange={jest.fn()}
      />
    );

    expect(sut).toMatchInlineSnapshot(`
      <Styled(form)
        onSubmit={[Function]}
      >
        <Styled(fieldset)>
          <Styled(legend)>
            Game settings
          </Styled(legend)>
          <Styled(label)>
            X dimension:
            <InputNumber
              name="xDimension"
              onChange={[Function]}
              value={10}
            />
          </Styled(label)>
          <Styled(label)>
            Y dimension:
            <InputNumber
              name="yDimension"
              onChange={[Function]}
              value={10}
            />
          </Styled(label)>
          <Styled(label)>
            Filling Percentage:
            <InputNumber
              max="100"
              min="0"
              name="fillingPercentage"
              onChange={[Function]}
              value={0}
            />
          </Styled(label)>
          <Styled(button)>
            Apply
          </Styled(button)>
        </Styled(fieldset)>
      </Styled(form)>
    `);
  });

  it.each`
    target                                                     | expectedSettings
    ${{ target: { value: "1", name: "xDimension" } }}          | ${{ ...defaultInitialSettings, xDimension: 1 }}
    ${{ target: { value: "1", name: "yDimension" } }}          | ${{ ...defaultInitialSettings, yDimension: 1 }}
    ${{ target: { value: "60", name: "fillingPercentage" } }}  | ${{ ...defaultInitialSettings, fillingPercentage: 60 }}
    ${{ target: { value: "100", name: "fillingPercentage" } }} | ${{ ...defaultInitialSettings, fillingPercentage: 100 }}
  `(
    "should call onSettingsChange with $expectedSettings when $target.target.name changes to $target.target.value",
    ({ target, expectedSettings }) => {
      const fakeOnChangeValue = jest.fn();
      const sut = mount(
        <SettingsForm
          gameSettings={defaultInitialSettings}
          applySettings={jest.fn()}
          onSettingsChange={fakeOnChangeValue}
        />
      );
      sut
        .find(`input[name="${target.target.name}"]`)
        .simulate("change", target);

      sut.find("button").simulate("submit");

      expect(fakeOnChangeValue).toHaveBeenCalledTimes(1);
      expect(fakeOnChangeValue).toHaveBeenCalledWith(expectedSettings);
    }
  );

  it("should call applySettings when submit button clicked", () => {
    const fakeApplySettings = jest.fn();
    const sut = mount(
      <SettingsForm
        gameSettings={defaultInitialSettings}
        onSettingsChange={jest.fn()}
        applySettings={fakeApplySettings}
      />
    );

    sut.find("button").simulate("submit");

    expect(fakeApplySettings).toHaveBeenCalledTimes(1);
  });
});
