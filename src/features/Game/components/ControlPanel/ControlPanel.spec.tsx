import { mount, shallow } from "enzyme";
import React from "react";
import { ControlPanel } from ".";

describe("ControlPanel", () => {
  it("should render", () => {
    const sut = shallow(<ControlPanel onControlButtonClick={jest.fn()} />);

    expect(sut).toMatchInlineSnapshot(`
      <Styled(div)>
        <Styled(button)
          id="reset"
          onClick={[Function]}
        >
          Reset
        </Styled(button)>
        <Styled(button)
          id="run"
          onClick={[Function]}
        >
          Run
        </Styled(button)>
        <Styled(button)
          id="pause"
          onClick={[Function]}
        >
          Pause
        </Styled(button)>
        <Styled(button)
          id="faster"
          onClick={[Function]}
        >
          Faster
        </Styled(button)>
        <Styled(button)
          id="normal"
          onClick={[Function]}
        >
          Normal
        </Styled(button)>
        <Styled(button)
          id="slower"
          onClick={[Function]}
        >
          Slower
        </Styled(button)>
      </Styled(div)>
    `);
  });

  it.each`
    buttonId    | action
    ${"reset"}  | ${"reset"}
    ${"run"}    | ${"run"}
    ${"pause"}  | ${"pause"}
    ${"slower"} | ${"slower"}
    ${"normal"} | ${"normal"}
    ${"faster"} | ${"faster"}
  `(
    "should call onClick callback with action '$action' for button with Id '$buttonId'",
    ({ buttonId, action }) => {
      const fakeOnClick = jest.fn();
      const sut = mount(<ControlPanel onControlButtonClick={fakeOnClick} />);

      sut.find(`button[id="${buttonId}"]`).simulate("click");

      expect(fakeOnClick).toBeCalledTimes(1);
      expect(fakeOnClick).toHaveBeenCalledWith(action);
    }
  );
});
