import React from "react";
import { Box, Grid, Hidden } from "@material-ui/core";

const SideBar = ({ classes }) => {
  const picture = process.env.PUBLIC_URL + "/images/bg-img.png";

  return (
    <Grid item xs={false} sm={4} md={5} className={classes.image}>
      <Box className={classes.overlay}>
        <Hidden xsDown>
          <img
            width={67}
            src={picture}
            alt="login-background"
          />
          <Hidden smDown>
            <p className={classes.heroText}>
              Converse with anyone with any language
            </p>
          </Hidden>
        </Hidden>
      </Box>
    </Grid>
  );
};

export default SideBar;
