import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "api/auth";
import { NameForm } from "@/Areas/Authentication/NameForm";

export const Login: React.FC<{}> = () => {
  const history = useHistory();
  const onSubmit = useCallback(async (userName) => {
    await auth.logIn(userName);
    history.push("/");
  }, []);

  return <NameForm onNameSubmit={onSubmit} />;
};
