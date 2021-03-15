import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const AuthHeader = ({ classes, isLoginForm }) => {
  return (
    <Box p={1} alignSelf="flex-end" alignItems="center">
      <Link to={isLoginForm ? "/signup" : "/login"} className={classes.link}>
        <div className={classes.noAccBtn}>
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
        </div>
        <Button
          color="background"
          className={classes.accBtn}
          variant="contained">
          {isLoginForm ? "Create Account" : "Login"}
        </Button>{" "}
      </Link>
    </Box>
  );
};

export default AuthHeader;
