import { WithAuthentication } from "@/Features/Authentication/WithAuthentication";
import { Game } from "@/Features/Game";
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
