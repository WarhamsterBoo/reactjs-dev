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

    expect(sut).toMatchSnapshot();
  });

  it.each`
    target                                                    | expectedSettings
    ${{ target: { value: "1", name: "xDimension" } }}         | ${{ ...defaultInitialSettings, xDimension: 1 }}
    ${{ target: { value: "1", name: "yDimension" } }}         | ${{ ...defaultInitialSettings, yDimension: 1 }}
    ${{ target: { value: "60", name: "fillingPercentage" } }} | ${{ ...defaultInitialSettings, fillingPercentage: 0.6 }}
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

  it.each`
    fillingPercentageSetting | displayingFillingPercentage
    ${0.6}                   | ${60}
    ${0.07}                  | ${7}
  `(
    "should transform fillingPercentage from $fillingPercentageSetting to $displayingFillingPercentage when displaying",
    ({ fillingPercentageSetting, displayingFillingPercentage }) => {
      const sut = mount(
        <SettingsForm
          gameSettings={{
            ...defaultInitialSettings,
            fillingPercentage: fillingPercentageSetting,
          }}
          onSettingsChange={jest.fn()}
          applySettings={jest.fn()}
        />
      );
      const fillingPercentage = sut.find(`input[name="fillingPercentage"]`);

      expect(fillingPercentage.prop("value")).toBe(displayingFillingPercentage);
    }
  );
});
