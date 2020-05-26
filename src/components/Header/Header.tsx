import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export interface HeaderProps {
  userName?: string;
  logOutUser?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "anonymous",
  logOutUser,
}) => {
  const history = useHistory();
  const onLogoutClick = useCallback(() => {
    logOutUser && logOutUser();
    history.push("/login");
  }, [logOutUser]);

  return (
    <>
      <h1>Hello, {userName}</h1>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
