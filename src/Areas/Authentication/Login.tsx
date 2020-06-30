import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { NameForm } from "./components";
import { AppState } from "@/AppStore";
import { authStore } from "./authStore";

interface LoginComponentProps {
  login: (userName: string) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ login }) => {
  const history = useHistory();
  const onSubmit = useCallback(
    async (userName) => {
      login(userName);
      history.push("/");
    },
    [login]
  );

  return <NameForm onNameSubmit={onSubmit} />;
};

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  login: authStore.actions.login,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
