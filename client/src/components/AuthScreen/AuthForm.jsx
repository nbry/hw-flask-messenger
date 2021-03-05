import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

const AuthForm = ({ classes, login }) => {
  return (
    <Box width="100%" maxWidth={450} p={3} alignSelf="center">
      <Grid container>
        <Grid item xs>
          <p className={classes.welcome} component="h1" variant="h5">
            Welcome back!
          </p>
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
        })}
        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
          setStatus();
          login(email, password).then(
            () => {
              // useHistory push to chat
              console.log(email, password);
              return;
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              id="email"
              label={<p className={classes.label}>E-mail address</p>}
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

            <div style={{ height: 95 }} />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthForm;
