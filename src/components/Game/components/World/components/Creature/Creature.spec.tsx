import React from "react";
import { Creature } from "./Creature";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

describe("Creature", () => {
  it("should render dead", () => {
    expect(
      renderer.create(<Creature IsAlive={false} onClick={jest.fn()} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render alive", () => {
    expect(
      renderer.create(<Creature IsAlive={true} onClick={jest.fn()} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should call onClick callback", () => {
    const fakeOnClick = jest.fn();
    const sut = mount(<Creature IsAlive={true} onClick={fakeOnClick} />);

    sut.simulate("click");

    expect(fakeOnClick).toBeCalledTimes(1);
  });
});
