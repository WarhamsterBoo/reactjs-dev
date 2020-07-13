import React from "react";
import { Game } from ".";
import { Provider } from "react-redux";
import { store } from "@/AppStore";

export default { title: "Game component" };

export const GameStory: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};
