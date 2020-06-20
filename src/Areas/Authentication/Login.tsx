import { auth } from "api/auth";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NameForm } from "./components";
import { userSessionStorage } from "api/userSessionStorage";

export const Login: React.FC<{}> = () => {
  const history = useHistory();
  const onSubmit = useCallback(async (userName) => {
    await auth.login(userName);
    userSessionStorage.newSession(userName);
    history.push("/");
  }, []);

  return <NameForm onNameSubmit={onSubmit} />;
};
