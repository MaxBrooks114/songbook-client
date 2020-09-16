import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import SpotifySearch from './spotify/SpotifySearch';
import SongCreate from './songs/SongCreate';
import SongList from './songs/SongList';
import SongEdit from './songs/SongEdit';
import InstrumentCreate from './instruments/InstrumentCreate';
import InstrumentEdit from './instruments/InstrumentEdit';
import InstrumentList from './instruments/InstrumentList';
import SuccessSnackBar from './ui/SuccessSnackBar';
import Progressbar from './ui/Progressbar';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import { fetchUser } from '../actions/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './ui/theme';
import history from '../history';
import { MuiThemeProvider } from 'material-ui/styles';
import UserShow from './auth/UserShow';

const App = () => {
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SuccessSnackBar />
      <Router history={history}>
        <div>
          <Navbar />
          <Progressbar />
          <MuiThemeProvider>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <PrivateRoute exact path="/users/:id" component={UserShow} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/search" component={SpotifySearch} />
              <PrivateRoute exact path="/songs/new" component={SongCreate} />
              <PrivateRoute exact path="/songs/edit/:id" component={SongEdit} />
              <PrivateRoute exact path="/songs" component={SongList} />
              <PrivateRoute exact path="/songs/:attribute/:value" component={SongList} />
              <PrivateRoute exact path="/songs/:id" component={SongList} />
              <PrivateRoute exact path="/instruments/new" component={InstrumentCreate} />
              <PrivateRoute exact path="/instruments/:id" component={InstrumentList} />
              <PrivateRoute exact path="/instruments" component={InstrumentList} />
              <PrivateRoute exact path="/instruments/edit/:id" component={InstrumentEdit} />
            </Switch>
          </MuiThemeProvider>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
