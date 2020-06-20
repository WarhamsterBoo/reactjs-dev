import { auth } from "api/auth";
import { userSessionStorage } from "api/userSessionStorage";
import React, { useCallback } from "react";
import { ForbiddenScreen } from "screens/ForbiddenScreen";

interface AuthProps {
  userName?: string;
  logOutUser?: () => void;
}

export const withAuthentication = <Props extends object>(
  Component: React.FC<Props & AuthProps>
): React.FC<Props & AuthProps> => (props: Props & AuthProps) => {
  const logoutUser = useCallback(() => {
    auth.logout();
    userSessionStorage.endSession();
  }, []);
  return userSessionStorage.hasActiveSession() ? (
    <Component
      {...props}
      userName={userSessionStorage.getCurrentSession()}
      logOutUser={logoutUser}
    />
  ) : (
    <ForbiddenScreen />
  );
};
