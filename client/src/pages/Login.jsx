import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import AuthHeader from "../components/AuthScreen/AuthHeader";
import AuthForm from "../components/AuthScreen/AuthForm";
import SideBar from "../components/AuthScreen/SideBar";
import AuthNotification from "../components/AuthScreen/AuthNotification";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
    },
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
  heroText: {
    fontSize: 26,
    fontFamily: "'Open Sans'",
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
  },
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: 145,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    bgcolor: "background.paper",
    minHeight: "100vh",
    paddingTop: 23,
  },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    color: "#3a8dff",
    boxShadow: "none",
    marginRight: 35,
  },
  noAccBtn: {
    fontSize: 14,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
    whiteSpace: "nowrap",
  },
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  box: {
    padding: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    flexDirection: "column",
    maxWidth: 900,
    margin: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: { fontSize: 19, color: "rgb(0,0,0,0.4)", paddingLeft: "5px" },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 3,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: "#3a8dff",
    fontWeight: "bold",
  },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: "5px",
  },
  link: { textDecoration: "none", display: "flex", flexWrap: "nowrap" },
  forgot: {
    paddingRight: 10,
    color: "#3a8dff",
  },
}));

// Login middleware placeholder
function useLogin() {
  const history = useHistory();

  const login = async (email, password) => {
    console.log(email, password);
    const res = await fetch(
      `/auth/login?email=${email}&password=${password}`
    ).then((res) => res.json());
    localStorage.setItem("user", res.user);
    localStorage.setItem("token", res.token);
    history.push("/dashboard");
  };
  return login;
}

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) history.push("/dashboard");
  }, []);

  const login = useLogin();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <SideBar classes={classes} />

      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className={classes.buttonHeader}>
          <AuthHeader classes={classes} />

          <AuthForm classes={classes} login={login} />
          <Box p={1} alignSelf="center" />
        </Box>

        {/* Eventually use state and fading animations to update this notification */}
        <AuthNotification handleClose={handleClose} open={open} />
      </Grid>
    </Grid>
  );
}
