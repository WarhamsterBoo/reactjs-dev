import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@/components/Shared";
import { Greeting, HeaderContainer } from "./Header.styled";

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
    <HeaderContainer>
      <Greeting>Hello, {userName}</Greeting>
      <Button onClick={onLogoutClick}>Logout</Button>
    </HeaderContainer>
  );
};
