import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "../pages/AuthForm";
// import Signup from "../pages/Signup";

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={AuthForm} />
      <Route path="/signup" component={AuthForm} />
      <Redirect to="/login" component={AuthForm} />
    </Switch>
  );
};

export default LoggedOutRoutes;
