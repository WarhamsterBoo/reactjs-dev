import React from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { Game, NameForm } from "./components";
import { Header } from "./components/Header/Header";

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Header userName="username" onLogoutClick={() => {}} />
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Game</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/login">
          <NameForm onNameSubmit={() => {}} />
        </Route>
        <Route exact path="/">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
