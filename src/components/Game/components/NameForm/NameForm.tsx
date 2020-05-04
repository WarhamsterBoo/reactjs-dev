import React, { useState, useCallback, FormEvent } from "react";
import { Button, InputText } from "shared/";
import { InputsContainer } from "./NameForm.styled";

export const NameForm: React.FC<{}> = () => {
  const [userName, setUserName] = useState<string>("");

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { value } = ev.target as HTMLInputElement;
    setUserName(value);
  }, []);

  return (
    <InputsContainer>
      <form>
        <fieldset>
          <legend>Hello!</legend>
          <label>
            Name:
            <InputText value={userName} onChange={onHandleInputChange} />
          </label>
          <Button>Ok</Button>
        </fieldset>
      </form>
    </InputsContainer>
  );
};
