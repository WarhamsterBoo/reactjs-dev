import React, { FormEvent, useCallback, useState } from "react";
import { Button, InputText, Label } from "shared";
import { Form } from "./NameForm.styled";

export interface NameFormProps {
  onNameSubmit: (userName: string) => Promise<void>;
}

export const NameForm: React.FC<NameFormProps> = ({ onNameSubmit }) => {
  const [userName, setUserName] = useState<string>("");

  const onHandleInputChange = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const { value } = ev.target as HTMLInputElement;
    setUserName(value);
  }, []);

  const onHandleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      await onNameSubmit(userName);
    },
    [onNameSubmit, userName]
  );

  return (
    <Form onSubmit={onHandleSubmit}>
      <Label>Hello there!</Label>
      <InputText
        required
        value={userName}
        onChange={onHandleInputChange}
        placeholder="Enter your name"
      />
      <Button type="submit">Start</Button>
    </Form>
  );
};
