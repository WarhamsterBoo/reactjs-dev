import React, { FormEvent, useCallback, useState } from "react";
import { Button, InputText } from "shared/";
import { Form, Label } from "./NameForm.styled";

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
    <Form onSubmit={onHandleSubmit}>
      <Label>Hello there!</Label>
      <InputText
        value={userName}
        onChange={onHandleInputChange}
        placeholder="Enter your name"
      />
      <Button type="submit">Start</Button>
    </Form>
  );
};
