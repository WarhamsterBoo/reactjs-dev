import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Game, NameForm } from "./components";
import { Header } from "./components/Header/Header";

const Home: React.FC<{}> = () => {
  return <h1>Home screen</h1>;
};

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Header userName="username" onLogoutClick={() => {}} />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/login">
          <NameForm onNameSubmit={() => {}} />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
