import { Game } from "components/Game";
import { Header } from "components/Header";
import { withAuthentication } from "hoc/withAuthentication";
import React from "react";
import { GameScreenContainer } from "./GameScreen.styled";

export const GameScreen = withAuthentication(({ userName, logOutUser }) => {
  return (
    <GameScreenContainer>
      <Header userName={userName} logOutUser={logOutUser} />
      <Game />
    </GameScreenContainer>
  );
});
