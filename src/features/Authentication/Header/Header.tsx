import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@/components";
import { Greeting, HeaderContainer } from "./Header.styled";
import { connect } from "react-redux";
import { AppState } from "@/AppStore";
import { authStore } from "@/features/Authentication";

export interface HeaderProps {
  userName: string | undefined;
  logOutUser: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  userName = "anonymous",
  logOutUser,
}) => {
  const history = useHistory();
  const onLogoutClick = useCallback(() => {
    logOutUser();
    history.push("/login");
  }, [logOutUser]);

  return (
    <HeaderContainer>
      <Greeting>Hello, {userName}</Greeting>
      <Button onClick={onLogoutClick}>Logout</Button>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  logOutUser: authStore.actions.logout,
};

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
