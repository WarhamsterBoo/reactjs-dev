import { auth } from "api/auth";
import { NameForm } from "components/NameForm";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const LoginScreen: React.FC<{}> = () => {
  const history = useHistory();
  const onSubmit = useCallback((userName) => {
    auth.logIn(userName);
    history.push("/");
  }, []);

  return <NameForm onNameSubmit={onSubmit} />;
};
