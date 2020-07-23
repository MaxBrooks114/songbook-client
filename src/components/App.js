import React from "react";
import SpotifySearch from "./spotify/SpotifySearch";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <SpotifySearch />
      </div>
    </ThemeProvider>
  );
};

export default App;
