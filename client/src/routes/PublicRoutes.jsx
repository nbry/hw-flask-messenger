import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};

export default LoggedOutRoutes;
