import { Header } from "components/Header";
import { Game } from "components/Game";
import { withAuthentication } from "hoc/withAuthentication";
import React from "react";

export const GameScreen = withAuthentication(
  ({ userName: username, onLogout }) => {
    return (
      <>
        <Header userName={username} onLogout={onLogout} />
        <Game />
      </>
    );
  }
);
