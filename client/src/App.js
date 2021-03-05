import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("user"));

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {loggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
