import { auth } from "api/auth";
import React from "react";
import { ForbiddenScreen } from "screens/ForbiddenScreen";

interface AuthProps {
  userName?: string;
  onLogout?: () => void;
}

export const withAuthentication = <Props extends object>(
  Component: React.FC<Props & AuthProps>
): React.FC<Props & AuthProps> => (props: Props & AuthProps) => {
  return auth.isAuthenticated() ? (
    <Component {...props} userName={auth.currentUsername()} />
  ) : (
    <ForbiddenScreen />
  );
};
