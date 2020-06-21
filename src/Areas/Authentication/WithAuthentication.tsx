import React from "react";
import { AuthStatus } from "./authStore";
import { connect } from "react-redux";
import { AppState } from "@/AppStore";
import { ForbiddenScreen } from "screens/ForbiddenScreen";

interface WithAuthenticationComponentProps {
  status: AuthStatus;
}

const WithAuthenticationComponent: React.FC<WithAuthenticationComponentProps> = () => {
  return <ForbiddenScreen />;
};

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
});

export const WithAuthentication = connect(mapStateToProps)(
  WithAuthenticationComponent
);
