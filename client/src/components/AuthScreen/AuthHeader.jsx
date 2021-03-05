import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const AuthHeader = ({ classes }) => {
  return (
    <Box p={1} alignSelf="flex-end" alignItems="center">
      <Link to="/signup" className={classes.link}>
        <Button className={classes.noAccBtn}>Don't have an account?</Button>
        <Button
          color="background"
          className={classes.accBtn}
          variant="contained">
          Create account
        </Button>
      </Link>
    </Box>
  );
};

export default AuthHeader;
