import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import Login from "./Login";
import AppDemo from "./AppDemo";
// import Deck from "./Deck";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/demo" component={AppDemo} />
      <Route path="/demo/:deckId" component={AppDemo} />
      <Route exact path="/:user/" component={App} />
      <Route path="/:user/:deckId" component={App} />

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
