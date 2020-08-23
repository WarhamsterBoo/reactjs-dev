import React from "react";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { Login } from ".";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("Login", () => {
  it("should render", async () => {
    const sut = mountWithMockStore(<Login />);

    expect(sut).toMatchInlineSnapshot(`
      Object {
        "store": Object {
          "clearActions": [Function],
          "dispatch": [Function],
          "getActions": [Function],
          "getState": [Function],
          "replaceReducer": [Function],
          "subscribe": [Function],
        },
        "sut": .emotion-3 {
        width: 200px;
        height: 120px;
        padding: 10px 10px 10px 10px;
        border: solid 1px black;
        background-color: #011627;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: space-around;
        -webkit-justify-content: space-around;
        -ms-flex-pack: space-around;
        justify-content: space-around;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .emotion-0 {
        margin-right: 10px;
        margin-left: 10px;
        color: #addb67;
        font-family: Inconsolata,monospace;
      }

      .emotion-1 {
        font-family: Inconsolata,monospace;
        color: #addb67;
        border-radius: 2px;
        border: 1px solid;
        background: transparent;
      }

      .emotion-2 {
        margin-left: 7px;
        margin-right: 7px;
        border-radius: 4px;
        border: none;
        background-color: #addb67;
        color: #011627;
        font-family: Inconsolata,monospace;
      }

      <Provider
          store={
            Object {
              "clearActions": [Function],
              "dispatch": [Function],
              "getActions": [Function],
              "getState": [Function],
              "replaceReducer": [Function],
              "subscribe": [Function],
            }
          }
        >
          <Connect(LoginComponent)>
            <LoginComponent
              login={[Function]}
              onLoginNameChanges={[Function]}
              onNameSubmit={[Function]}
              userName=""
            >
              <NameForm
                onNameSubmit={[Function]}
                onUserNameChange={[Function]}
                userName=""
              >
                <Styled(form)
                  onSubmit={[Function]}
                >
                  <form
                    className="emotion-3"
                    onSubmit={[Function]}
                  >
                    <Styled(label)>
                      <label
                        className="emotion-0"
                      >
                        Hello there!
                      </label>
                    </Styled(label)>
                    <InputText
                      onChange={[Function]}
                      placeholder="Enter your name"
                      required={true}
                      value=""
                    >
                      <Styled(input)
                        onChange={[Function]}
                        placeholder="Enter your name"
                        required={true}
                        type="text"
                        value=""
                      >
                        <input
                          className="emotion-1"
                          onChange={[Function]}
                          placeholder="Enter your name"
                          required={true}
                          type="text"
                          value=""
                        />
                      </Styled(input)>
                    </InputText>
                    <Styled(button)
                      type="submit"
                    >
                      <button
                        className="emotion-2"
                        type="submit"
                      >
                        Start
                      </button>
                    </Styled(button)>
                  </form>
                </Styled(form)>
              </NameForm>
            </LoginComponent>
          </Connect(LoginComponent)>
        </Provider>,
      }
    `);
  });
});
