import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { NameForm } from "./NameForm";

export default { title: "Name Form Component" };

export const NameFormStory: React.FC<{}> = () => {
  const [userName, setUserName] = useState<string>("Bob");

  return (
    <NameForm
      userName={userName}
      onUserNameChange={(userName: string) => {
        setUserName(userName);
        action("onChange")(userName);
      }}
      onNameSubmit={action("onSubmit")}
    />
  );
};
