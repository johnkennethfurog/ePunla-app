import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import SignupPage from "./features/farmer/signup-page";
import SigninPage from "./features/farmer/signin-page";

import { makeStyles } from "@material-ui/core";
import MessagePrompt from "./components/message-prompt/message-prompt";
import ProtectedRoute from "./utils/guarded-route";
import Pageloader from "./components/page-loader/page-loader";
const HomePage = React.lazy(() => import("./features/farmer/farmer-home-page"));
const AdminHomePage = React.lazy(
  () => import("./features/admin/admin-home-page")
);

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

        <Route path="/admin">
          <Suspense fallback={<Pageloader />}>
            <AdminHomePage />
          </Suspense>
        </Route>

        <ProtectedRoute path="/" authenticationPath="signin">
          <Suspense fallback={<Pageloader />}>
            <HomePage />
          </Suspense>
        </ProtectedRoute>
      </Switch>
      <MessagePrompt />
    </div>
  );
}

export default App;
