import React from "react";
import { AuthStatus } from "./authStore";
import { connect } from "react-redux";
import { AppState } from "@/AppStore";
import { ForbiddenScreen } from "screens/ForbiddenScreen";
import { stat } from "fs";
import { AuthInProgressScreen } from "screens/AuthInProgressScreen";

interface WithAuthenticationComponentProps {
  status: AuthStatus;
}

const WithAuthenticationComponent: React.FC<WithAuthenticationComponentProps> = ({
  status,
}) => {
  if (status === AuthStatus.not_authenticated) {
    return <ForbiddenScreen />;
  }

  if (status === AuthStatus.in_progress) {
    return <AuthInProgressScreen />;
  }

  return <>children</>;
};

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
});

export const WithAuthentication = connect(mapStateToProps)(
  WithAuthenticationComponent
);
