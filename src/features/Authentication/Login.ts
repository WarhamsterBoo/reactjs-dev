import { AppState } from "@/AppStore";
import { connect } from "react-redux";
import { authStore } from "./authStore";
import { LoginForm } from "./components";

const mapStateToProps = (state: AppState) => {
  return {
    userName: state.auth.userName ?? "",
  };
};

const mapDispatchToProps = {
  login: authStore.actions.login,
  onUserNameChange: authStore.actions.change_username,
  onNameSubmit: authStore.actions.login,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
