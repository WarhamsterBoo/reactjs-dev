import { WithAuthentication } from "@/Areas/Authentication/WithAuthentication";
import { Game } from "components/Game";
import { Header } from "components/Header";
import React from "react";
import { GameScreenContainer } from "./GameScreen.styled";

export const GameScreen: React.FC<{}> = () => {
  return (
    <WithAuthentication>
      <GameScreenContainer>
        <Header />
        <Game />
      </GameScreenContainer>
    </WithAuthentication>
  );
};
