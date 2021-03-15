import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import BackendApi from "../../utils/BackendApi";
import * as Yup from "yup";

const AuthFormContent = ({ classes, isLoginForm }) => {
  return (
    <Box width="100%" maxWidth={450} p={3} alignSelf="center">
      <Grid container>
        <Grid item xs>
          <Typography className={classes.welcome} component="h1" variant="h5">
            {isLoginForm ? "Welcome Back!" : "Create an account"}
          </Typography>
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
          password: Yup.string()
            .required("Password is required")
            .max(100, "Password is too long")
            .min(6, "Password too short"),
          username: isLoginForm
            ? ""
            : Yup.string()
                .required("Username is required")
                .max(40, "Username is too long"),
        })}
        onSubmit={(
          { username, email, password },
          { setStatus, setSubmitting }
        ) => {
          setStatus();
          // Handle form submission

          async function submitAuthForm({ username, password, email }) {
            try {
              const res = isLoginForm
                ? await BackendApi.login({ username, password })
                : await BackendApi.register({ username, password, email });
            } catch (e) {
              alert(e);
            }
          }
          submitAuthForm({ username, email, password });
        }}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            {isLoginForm ? null : (
              <TextField
                id="username"
                label={
                  <Typography className={classes.label}>Username</Typography>
                }
                fullWidth
                id="username"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="username"
                autoComplete="username"
                autoFocus
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
                value={values.username}
                onChange={handleChange}
              />
            )}

            <TextField
              id="email"
              label={
                <Typography className={classes.label}>
                  E-mail address
                </Typography>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: classes.inputs } }}
              name="email"
              autoComplete="email"
              autoFocus
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label={
                <Typography className={classes.label}>Password</Typography>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                classes: { input: classes.inputs },
                endAdornment: (
                  <Typography className={classes.forgot}>Forgot?</Typography>
                ),
              }}
              type="password"
              autoComplete="current-password"
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
              type="password"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}>
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthFormContent;
