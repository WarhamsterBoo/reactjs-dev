import { shallow } from "enzyme";
import React from "react";
import { Creature } from "./Creature";
import renderer from "react-test-renderer";

describe("Creature", () => {
  it("should render dead", () => {
    expect(
      renderer.create(<Creature Id={0} IsAlive={false} />).toJSON()
    ).toMatchSnapshot();
  });
});
