import { shallow } from "enzyme";
import React from "react";
import { Header } from "./Header";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("api/auth");

describe("Header", () => {
  it("should render", () => {
    const sut = shallow(<Header userName={"username"} logOutUser={() => {}} />);

    expect(sut).toMatchInlineSnapshot(`
      <Styled(div)>
        <Styled(div)>
          Hello, 
          username
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
    const sut = shallow(
      <Header userName={"username"} logOutUser={logOutUser} />
    );

    sut.find("Styled(button)").simulate("click");

    expect(logOutUser).toHaveBeenCalledTimes(1);
  });

  it("should redirect to /login when Logout button clicked", () => {
    const sut = shallow(<Header userName={"username"} logOutUser={() => {}} />);

    sut.find("Styled(button)").simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith("/login");
  });
});
