import { mount, shallow } from "enzyme";
import React from "react";
import { HeaderPanel } from "./HeaderPanel";

describe("Header", () => {
  it("should render", () => {
    const sut = shallow(
      <HeaderPanel userName={"Bob"} logOutUser={jest.fn()} />
    );

    expect(sut).toMatchInlineSnapshot(`
      <Styled(div)>
        <Styled(div)>
          Hello, 
          Bob
        </Styled(div)>
        <Styled(button)
          onClick={[Function]}
        >
          Logout
        </Styled(button)>
      </Styled(div)>
    `);
  });

  it("should call logOutUser function prop when Logout button clicked", () => {
    const logOutUser = jest.fn();
    const sut = mount(<HeaderPanel userName={"Bob"} logOutUser={logOutUser} />);

    sut.find("button").simulate("click");

    expect(logOutUser).toBeCalledTimes(1);
  });
});
