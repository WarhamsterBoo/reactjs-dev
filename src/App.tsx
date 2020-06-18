import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContainer } from "./App.styled";
import { store } from "./AppStore";
import { ForbiddenScreen } from "./screens/ForbiddenScreen";
import { GameScreen } from "./screens/GameScreen";
import { LoginScreen } from "./screens/LoginScreen";

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login">
              <LoginScreen />
            </Route>
            <Route exact path="/forbidden">
              <ForbiddenScreen />
            </Route>
            <Route exact path="/">
              <GameScreen />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContainer>
    </Provider>
  );
};
