import { auth } from "api/auth";
import React from "react";
import { ForbiddenScreen } from "screens/ForbiddenScreen";

export const withAuthentication = <Props extends object>(
  Component: React.FC<Props>
): React.FC<Props> => (props: Props) => {
  return auth.isAuthenticated() ? (
    <Component {...props} />
  ) : (
    <ForbiddenScreen />
  );
};
