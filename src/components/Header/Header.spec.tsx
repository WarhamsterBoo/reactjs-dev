import { shallow } from "enzyme";
import { Header } from "./Header";
import React from "react";

describe("Header", () => {
  it("should render", () => {
    const sut = shallow(<Header userName={"username"} logOutUser={() => {}} />);

    expect(sut).toMatchSnapshot();
  });
});
