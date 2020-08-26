import { Header } from "@/features/Authentication";
import { WithAuthentication } from "@/features/Authentication/WithAuthentication";
import { Game } from "@/features/Game";
import React from "react";
import { GameScreenContainer } from "./GameScreen.styled";

export const GameScreen: React.FC<{}> = () => (
  <WithAuthentication>
    <GameScreenContainer>
      <Header />
      <Game />
    </GameScreenContainer>
  </WithAuthentication>
);
