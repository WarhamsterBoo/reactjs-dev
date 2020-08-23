import { ForbiddenScreen } from "@/screens/ForbiddenScreen";
import { GameScreen } from "@/screens/GameScreen";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AppContainer } from "./App.styled";
import { appHistory, store } from "./AppStore";
import { Login } from "./features/Authentication";

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <ConnectedRouter history={appHistory}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forbidden">
              <ForbiddenScreen />
            </Route>
            <Route exact path="/">
              <GameScreen />
            </Route>
          </Switch>
        </ConnectedRouter>
      </AppContainer>
    </Provider>
  );
};
