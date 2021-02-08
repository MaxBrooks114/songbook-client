import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiThemeProvider } from 'material-ui/styles'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import { fetchUser } from '../actions/auth'
import { fetchFiles } from '../actions/files'
import { fetchInstruments } from '../actions/instruments'
import { fetchSections } from '../actions/sections'
import { fetchSongs } from '../actions/songs'
import history from '../history'
import Login from './auth/Login'
import Logout from './auth/Logout'
import PasswordReset from './auth/PasswordReset'
import Register from './auth/Register'
import UserEdit from './auth/UserEdit'
import UserShow from './auth/UserShow'
import InstrumentContainer from './instruments/InstrumentContainer'
import InstrumentCreate from './instruments/InstrumentCreate'
import InstrumentEdit from './instruments/InstrumentEdit'
import PrivateRoute from './PrivateRoute'
import SectionContainer from './sections/SectionContainer'
import SectionCreate from './sections/SectionCreate'
import SectionEdit from './sections/SectionEdit'
import SongContainer from './songs/SongContainer'
import SongCreate from './songs/SongCreate'
import SongEdit from './songs/SongEdit'
import SpotifySearch from './spotify/SpotifySearch'
import ErrorPage from './ui/ErrorPage'
import Footer from './ui/Footer'
import Home from './ui/Home'
import Navbar from './ui/Navbar'
import SuccessSnackBar from './ui/SuccessSnackBar'
import theme from './ui/theme'

const App = () => {
  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(fetchUser())
    dispatch(fetchInstruments())
    dispatch(fetchSongs())
    dispatch(fetchSections())
    dispatch(fetchFiles())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchInstruments())
    dispatch(fetchSongs())
    dispatch(fetchSections())
    dispatch(fetchFiles())
  }, [dispatch])

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
                <PrivateRoute path="/songs" component={SongContainer} />
                <PrivateRoute path="/sections" component={SectionContainer} />
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

  )
}

export default App
