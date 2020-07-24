import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import SpotifySearch from "./spotify/SpotifySearch";
import SongForm from "./songs/SongForm";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import history from "../history";
import { MuiThemeProvider } from "material-ui/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/search" exact component={SpotifySearch} />
            <MuiThemeProvider>
              <Route path="/songs/new" exact component={SongForm} />
            </MuiThemeProvider>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
