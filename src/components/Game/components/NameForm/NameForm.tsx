import React from "react";
import { Button, InputText } from "shared/";
import { InputsContainer } from "./NameForm.styled";

export const NameForm: React.FC<{}> = () => {
  return (
    <InputsContainer>
      <form>
        <fieldset>
          <legend>Hello!</legend>
          <label>
            Name:
            <InputText />
          </label>
          <Button>Ok</Button>
        </fieldset>
      </form>
    </InputsContainer>
  );
};
