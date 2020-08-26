import { Button } from "@/components";
import React, { useCallback } from "react";
import { Greeting, HeaderContainer } from "./HeaderPanel.styled";

export interface HeaderPanelProps {
  userName: string | undefined;
  logOutUser: () => void;
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({
  userName = "anonymous",
  logOutUser,
}) => {
  const onLogoutClick = useCallback(() => {
    logOutUser();
  }, [logOutUser]);

  return (
    <HeaderContainer>
      <Greeting>Hello, {userName}</Greeting>
      <Button onClick={onLogoutClick}>Logout</Button>
    </HeaderContainer>
  );
};
