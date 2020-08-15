import { Button, InputText, Label } from "@/components";
import React, { FormEvent, useCallback } from "react";
import { Form } from "./NameForm.styled";

interface NameFormProps {
  userName: string;
  onUserNameChange: (name: string) => void;
  onNameSubmit: () => void;
}

export const NameForm: React.FC<NameFormProps> = ({
  userName,
  onUserNameChange,
  onNameSubmit,
}) => {
  const onHandleInputChange = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      const { value } = ev.target as HTMLInputElement;
      onUserNameChange(value);
    },
    [onUserNameChange]
  );

  const onHandleSubmit = useCallback(
    async (ev: FormEvent) => {
      ev.preventDefault();
      await onNameSubmit();
    },
    [onNameSubmit]
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
