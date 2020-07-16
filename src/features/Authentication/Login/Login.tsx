import { authStore } from "@/features/Authentication";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { NameForm } from "./components";
import { AppState } from "@/AppStore";

interface LoginComponentProps {
  userName: string;
  login: () => void;
  onLoginNameChanges: (userName: string) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  userName,
  login,
  onLoginNameChanges,
}) => {
  const history = useHistory();
  const onSubmit = useCallback(async () => {
    login();
    history.push("/");
  }, [login]);

  return (
    <NameForm
      userName={userName}
      onUserNameChange={onLoginNameChanges}
      onNameSubmit={onSubmit}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    userName: state.auth.userName ?? "",
  };
};

const mapDispatchToProps = {
  login: authStore.actions.login,
  onLoginNameChanges: authStore.actions.username_changes,
  onNameSubmit: authStore.actions.login,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
