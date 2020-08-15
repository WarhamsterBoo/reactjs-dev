import { Header } from "@/features/Authentication/components";
import { WithAuthentication } from "@/features/Authentication/WithAuthentication";
import { Game } from "@/features/Game";
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
