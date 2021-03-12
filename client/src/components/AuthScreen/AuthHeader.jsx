import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const AuthHeader = ({ classes, isLoginForm }) => {
  return (
    <Box p={1} alignSelf="flex-end" alignItems="center">
      {isLoginForm ? (
        <>
          <Link to="/signup" className={classes.link}>
            <Button className={classes.noAccBtn}>Don't have an account?</Button>
            <Button
              color="background"
              className={classes.accBtn}
              variant="contained">
              Create account
            </Button>{" "}
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={classes.link}>
            <Button className={classes.noAccBtn}>
              Already have an account?
            </Button>
            <Button
              color="background"
              className={classes.accBtn}
              variant="contained">
              Login
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default AuthHeader;
