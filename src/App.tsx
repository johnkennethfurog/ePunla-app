import React from "react";
import { Switch, Route } from "react-router-dom";

import SignupPage from "./app/signup-page";
import SigninPage from "./app/signin-page";
import HomePage from "./app/home-page";

function App() {
  return (
    <Switch>
      <Route exact path="/signin">
        <SigninPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
