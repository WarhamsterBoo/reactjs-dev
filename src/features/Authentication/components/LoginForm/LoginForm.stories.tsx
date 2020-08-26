import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";

export default { title: "Login Form Component" };

export const LoginFormStory: React.FC<{}> = () => {
  const [userName, setUserName] = useState<string>("Bob");

  return (
    <LoginForm
      userName={userName}
      onUserNameChange={(userName: string) => {
        setUserName(userName);
        action("onChange")(userName);
      }}
      onNameSubmit={action("onSubmit")}
    />
  );
};
