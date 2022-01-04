import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import SignupPage from "./features/farmer/signup-page";
import SigninPage from "./features/farmer/signin-page";
import AdminSigninPage from "./features/admin/signin-page";

import { makeStyles } from "@material-ui/core";
import MessagePrompt from "./components/message-prompt/message-prompt";
import ProtectedRoute, { AdminProtectedRoute } from "./utils/guarded-route";
import Pageloader from "./components/page-loader/page-loader";
const HomePage = React.lazy(() => import("./features/farmer/farmer-home-page"));
const AdminHomePage = React.lazy(
  () => import("./features/admin/admin-home-page")
);

const useStyle = makeStyles((theme) => ({
  root: {},
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

        <Route exact path="/admin/signin">
          <AdminSigninPage />
        </Route>

        <Route path="/admin">
          <AdminProtectedRoute path="/admin" authenticationPath="/admin/signin">
            <Suspense fallback={<Pageloader />}>
              <AdminHomePage />
            </Suspense>
          </AdminProtectedRoute>
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
