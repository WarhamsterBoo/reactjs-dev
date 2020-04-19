import React from "react";
import { Creature } from "./Creature";
import renderer from "react-test-renderer";

describe("Creature", () => {
  it("should render dead", () => {
    expect(
      renderer.create(<Creature IsAlive={false} />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render alive", () => {
    expect(
      renderer.create(<Creature IsAlive={true} />).toJSON()
    ).toMatchSnapshot();
  });
});
