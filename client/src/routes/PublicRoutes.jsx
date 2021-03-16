import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "../pages/AuthForm";
// import Signup from "../pages/Signup";

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <AuthForm isLoginForm={true} />
      </Route>
      <Route path="/signup">
        <AuthForm isLoginForm={false} />
      </Route>
      <Redirect to="/login" component={AuthForm} />
    </Switch>
  );
};

export default LoggedOutRoutes;
