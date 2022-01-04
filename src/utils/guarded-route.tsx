import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import {
  selectIsAdminAuthenticated,
  selectIsAuthenticated,
} from "../app/+states/userSlice";

export type ProtectedRouteProps = {
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute = ({
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

export const AdminProtectedRoute = ({
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAdminAuthenticated);

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

export default ProtectedRoute;
