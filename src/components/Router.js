import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import Login from "./Login";
import Deck from "./Deck";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/app" component={App} />
      <Route
        exact
        path="/app/:deckId"
        render={props => <Deck deck={props.location.state.deck} {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
