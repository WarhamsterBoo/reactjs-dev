import React, { useState, useCallback, FormEvent } from "react";
import { Button, InputText } from "shared/";
import { InputsContainer } from "./NameForm.styled";

export interface NameFormProps {
  onSubmit: (userName: string) => void;
}

export const NameForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState<string>("");

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { value } = ev.target as HTMLInputElement;
    setUserName(value);
  }, []);

  const onHandleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      onSubmit(userName);
    },
    [onSubmit, userName]
  );

  return (
    <InputsContainer>
      <form onSubmit={onHandleSubmit}>
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
