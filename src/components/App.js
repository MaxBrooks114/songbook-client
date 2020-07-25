import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import SpotifySearch from "./spotify/SpotifySearch";
import SongCreate from "./songs/SongCreate";
import SongList from "./songs/SongList";
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
          <MuiThemeProvider>
            <Switch>
              <Route path="/search" exact component={SpotifySearch} />
              <Route path="/songs/new" exact component={SongCreate} />
              <Route exact path="/songs" component={SongList} />
              <Route exact path="/songs/:id" component={SongList} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
