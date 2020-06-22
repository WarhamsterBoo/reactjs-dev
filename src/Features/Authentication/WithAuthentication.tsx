import { AppState } from "@/AppStore";
import React from "react";
import { connect } from "react-redux";
import { AuthInProgressScreen } from "screens/AuthInProgressScreen";
import { ForbiddenScreen } from "screens/ForbiddenScreen";
import { AuthStatus } from "./authStore";

interface WithAuthenticationComponentProps {
  status: AuthStatus;
}

const WithAuthenticationComponent: React.FC<WithAuthenticationComponentProps> = ({
  status,
  children,
}) => {
  if (status === AuthStatus.not_authenticated || status === AuthStatus.failed) {
    return <ForbiddenScreen />;
  }

  if (status === AuthStatus.in_progress) {
    return <AuthInProgressScreen />;
  }

  return <>{children}</>;
};

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
});

export const WithAuthentication = connect(mapStateToProps)(
  WithAuthenticationComponent
);
