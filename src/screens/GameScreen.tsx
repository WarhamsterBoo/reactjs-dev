import { Header } from "components/Header";
import { Game } from "components/Game";
import { withAuthentication } from "hoc/withAuthentication";
import React from "react";

export const GameScreen = withAuthentication(({ userName, logOutUser }) => {
  return (
    <>
      <Header userName={userName} logOutUser={logOutUser} />
      <Game />
    </>
  );
});
