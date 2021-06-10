import React from "react";
import { Switch, Route } from "react-router-dom";

import SignupPage from "./app/signup-page";
import SigninPage from "./app/signin-page";
import HomePage from "./app/home-page";
import { makeStyles } from "@material-ui/core";
import MessagePrompt from "./components/message-prompt/message-prompt";
import ProtectedRoute from "./utils/guarded-route";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

function App() {
  const style = useStyle();
  return (
    <div className={style.root}>
      <Switch>
        <Route exact path="/signin">
          <SigninPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>

        <ProtectedRoute path="/" authenticationPath="signin">
          <HomePage />
        </ProtectedRoute>
      </Switch>
      <MessagePrompt />
    </div>
  );
}

export default App;
