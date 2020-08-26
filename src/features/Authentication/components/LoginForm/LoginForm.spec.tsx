import { mount, shallow } from "enzyme";
import React from "react";
import { simulateChange } from "tests/dsl/enzymeHelpers";
import { LoginForm } from "./LoginForm";

describe("Login Form", () => {
  it("should render", () => {
    const sut = shallow(
      <LoginForm
        userName={"Bob"}
        onUserNameChange={jest.fn()}
        onNameSubmit={jest.fn()}
      />
    );

    expect(sut).toMatchInlineSnapshot(`
      <Styled(form)
        onSubmit={[Function]}
      >
        <Styled(label)>
          Hello there!
        </Styled(label)>
        <InputText
          onChange={[Function]}
          placeholder="Enter your name"
          required={true}
          value="Bob"
        />
        <Styled(button)
          type="submit"
        >
          Start
        </Styled(button)>
      </Styled(form)>
    `);
  });

  it("should call onLoginNameChange when loginName changes in input", () => {
    const onLoginNameChanges = jest.fn();
    const sut = mount(
      <LoginForm
        userName={"Bob"}
        onUserNameChange={onLoginNameChanges}
        onNameSubmit={jest.fn()}
      />
    );

    simulateChange(sut.find(`input[type="text"]`), "John Doe");

    expect(onLoginNameChanges).toHaveBeenCalledTimes(1);
    expect(onLoginNameChanges).toHaveBeenCalledWith("John Doe");
  });

  it("should call onNameSubmit when submit button clicked", () => {
    const fakeOnSubmit = jest.fn();
    const sut = mount(
      <LoginForm
        userName={"Bob"}
        onUserNameChange={jest.fn()}
        onNameSubmit={fakeOnSubmit}
      />
    );
    simulateChange(sut.find(`input[type="text"]`), "John Doe");

    sut.find("button").simulate("submit");

    expect(fakeOnSubmit).toHaveBeenCalledTimes(1);
  });
});
