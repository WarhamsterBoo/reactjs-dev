import { mount, shallow } from "enzyme";
import React from "react";
import { create } from "tests/dsl/create";
import { SettingsForm } from "./SettingsForm";

describe("SettingsForm", () => {
  it("should render", () => {
    const sut = shallow(
      <SettingsForm
        gameSettings={create.gameSettings()}
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
    ${{ target: { value: "1", name: "xDimension" } }}          | ${create.gameSettings({ xDimension: 1 })}
    ${{ target: { value: "1", name: "yDimension" } }}          | ${create.gameSettings({ yDimension: 1 })}
    ${{ target: { value: "60", name: "fillingPercentage" } }}  | ${create.gameSettings({ fillingPercentage: 60 })}
    ${{ target: { value: "100", name: "fillingPercentage" } }} | ${create.gameSettings({ fillingPercentage: 100 })}
  `(
    "should call onSettingsChange with $expectedSettings when $target.target.name changes to $target.target.value",
    ({ target, expectedSettings }) => {
      const fakeOnChangeValue = jest.fn();
      const sut = mount(
        <SettingsForm
          gameSettings={create.gameSettings()}
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
        gameSettings={create.gameSettings()}
        onSettingsChange={jest.fn()}
        applySettings={fakeApplySettings}
      />
    );

    sut.find("button").simulate("submit");

    expect(fakeApplySettings).toHaveBeenCalledTimes(1);
  });
});
