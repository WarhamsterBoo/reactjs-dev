import { shallow } from "enzyme";
import { GameScreen } from "./GameScreen";
import React from "react";

describe("GameScreen", () => {
  it("should render", () => {
    const sut = shallow(<GameScreen />);

    expect(sut).toMatchInlineSnapshot(`
      <Connect(WithAuthenticationComponent)>
        <Styled(div)>
          <Connect(HeaderPanel) />
          <Connect(GameField) />
        </Styled(div)>
      </Connect(WithAuthenticationComponent)>
    `);
  });
});
