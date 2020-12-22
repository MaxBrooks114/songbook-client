import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import InstrumentList from './instruments/InstrumentList';
import SectionCreate from './sections/SectionCreate';
import SectionEdit from './sections/SectionEdit';
import SectionList from './sections/SectionList';
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
      <SuccessSnackBar />
      <Router history={history}>
        <div style={{minHeight: '100vh'}}>
          <Navbar />
          <MuiThemeProvider>
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path='/passwordReset' exact component={PasswordReset} />
              <PrivateRoute exact path="/users/:id" component={UserShow} />
              <PrivateRoute exact path="/users/:id/edit" component={UserEdit} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/search" component={SpotifySearch} />
              <PrivateRoute exact path="/songs/new" component={SongCreate} />
              <PrivateRoute exact path="/songs/edit/:id" component={SongEdit} />
              <PrivateRoute exact path="/songs" component={SongContainer} />
              <PrivateRoute exact path="/songs/:attribute/:value" component={SongContainer} />
              <PrivateRoute exact path="/songs/:id" component={SongContainer} />
              <PrivateRoute exact path="/sections/new" component={SectionCreate} />
              <PrivateRoute exact path="/sections/edit/:id" component={SectionEdit} />
              <PrivateRoute exact path="/sections" component={SectionList} />
              <PrivateRoute exact path="/sections/:attribute/:value" component={SectionList} />
              <PrivateRoute exact path="/sections/:id" component={SectionList} />
              <PrivateRoute exact path="/instruments/new" component={InstrumentCreate} />
              <PrivateRoute exact path="/instruments/:id" component={InstrumentList} />
              <PrivateRoute exact path="/instruments" component={InstrumentList} />
              <PrivateRoute exact path="/instruments/edit/:id" component={InstrumentEdit} />
            </Switch>
            
          </MuiThemeProvider>
          <Footer />
        </div>
        
      </Router>
      
    </ThemeProvider>

  );
};

export default App;
