import React, { useState, useCallback, FormEvent } from "react";
import { Button, InputText } from "shared/";
import { FormWrapper, StartButton } from "./NameForm.styled";

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
    <FormWrapper>
      <label>Hello!</label>
      <form onSubmit={onHandleSubmit}>
        <InputText
          value={userName}
          onChange={onHandleInputChange}
          placeholder="Enter your name"
        />
        <StartButton>Start</StartButton>
      </form>
    </FormWrapper>
  );
};
