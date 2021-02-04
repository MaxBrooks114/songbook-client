import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import UserEdit from './auth/UserEdit'
import PasswordReset from './auth/PasswordReset'
import SpotifySearch from './spotify/SpotifySearch';
import SongCreate from './songs/SongCreate';
import SongContainer from './songs/SongContainer';
import SongEdit from './songs/SongEdit';
import InstrumentCreate from './instruments/InstrumentCreate';
import InstrumentEdit from './instruments/InstrumentEdit';
import InstrumentContainer from './instruments/InstrumentContainer';
import SectionCreate from './sections/SectionCreate';
import SectionEdit from './sections/SectionEdit';
import SectionContainer from './sections/SectionContainer';
import SuccessSnackBar from './ui/SuccessSnackBar';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import { fetchUser } from '../actions/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './ui/theme';
import history from '../history';
import { MuiThemeProvider } from 'material-ui/styles';
import UserShow from './auth/UserShow';
import { fetchInstruments } from '../actions/instruments';
import { fetchSongs } from '../actions/songs';
import { fetchSections } from '../actions/sections';
import { fetchFiles } from '../actions/files';
import ErrorPage from './ui/ErrorPage'
import Home from './ui/Home'

const App = () => {
  const dispatch = useDispatch();
  
  useMemo(() => {
    dispatch(fetchUser());
    dispatch(fetchInstruments());
    dispatch(fetchSongs());
    dispatch(fetchSections());
    dispatch(fetchFiles())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchInstruments());
    dispatch(fetchSongs());
    dispatch(fetchSections());
    dispatch(fetchFiles())
  }, [dispatch]);
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Router history={history}>
        <div id="container">
          <Navbar />
        <div id="body">       
          <MuiThemeProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path='/passwordReset' exact component={PasswordReset} />
                <PrivateRoute path="/users/:id" component={UserShow} />
                <PrivateRoute exact path="/logout" component={Logout} />
                <PrivateRoute exact path="/search" component={SpotifySearch} />
                <PrivateRoute exact path="/songs/new" component={SongCreate} />
                <PrivateRoute exact path="/songs/edit/:id" component={SongEdit} />
                <PrivateRoute path="/songs" component={SongContainer} />
                <PrivateRoute exact path="/sections/new" component={SectionCreate} />
                <PrivateRoute exact path="/sections/edit/:id" component={SectionEdit} />
                <PrivateRoute path="/sections" component={SectionContainer} />
                <PrivateRoute exact path="/instruments/new" component={InstrumentCreate} />
                <PrivateRoute exact path="/instruments/edit/:id" component={InstrumentEdit} />
                <PrivateRoute path="/instruments" component={InstrumentContainer} />
                <Route path='*' component={ErrorPage} />
              </Switch>   
            </MuiThemeProvider>
          </div>   
          <Footer />
        </div>
        <SuccessSnackBar/>
      </Router>
      
    </ThemeProvider>

  );
};

export default App;
