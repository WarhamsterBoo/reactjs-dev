import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { GameScreen } from "./screens/GameScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ForbiddenScreen } from "./screens/ForbiddenScreen";

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/forbidden">Forbidden</Link>
        </li>
        <li>
          <Link to="/">Game</Link>
        </li>
      </ul>
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
  );
};
