import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#26a69a",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
