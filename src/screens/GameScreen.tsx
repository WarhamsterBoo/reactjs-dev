import { AuthStatus } from "@/Areas/Authentication/authStore";
import { Game } from "components/Game";
import { Header } from "components/Header";
import React from "react";
import { ForbiddenScreen } from "./ForbiddenScreen";
import { GameScreenContainer } from "./GameScreen.styled";
import { connect } from "react-redux";
import { AppState } from "@/AppStore";

interface GameScreenComponentProps {
  status: AuthStatus;
}

const GameScreenComponent: React.FC<GameScreenComponentProps> = ({
  status,
}) => {
  switch (status) {
    case AuthStatus.authenticated:
      return (
        <GameScreenContainer>
          <Header />
          <Game />
        </GameScreenContainer>
      );
    case AuthStatus.in_progress:
      return <h1>Loggin in...</h1>;
    case AuthStatus.not_authenticated:
      return <ForbiddenScreen />;
    default:
      return <h1>Authentication failed</h1>;
  }
};

const mapStateToProps = (state: AppState) => ({
  status: state.auth.status,
});

const mapDispatchToProps = {};

export const GameScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreenComponent);
