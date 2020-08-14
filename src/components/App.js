import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
              <Route path="/search" exact component={SpotifySearch} />
              <Route path="/songs/new" exact component={SongCreate} />
              <Route exact path="/songs/edit/:id" component={SongEdit} />
              <Route exact path="/songs" component={SongList} />
              <Route exact path="/songs/:attribute/:value" component={SongList} />
              <Route exact path="/songs/:id" component={SongList} />
              <Route exact path="/instruments/new" component={InstrumentCreate} />
              <Route exact path="/instruments" component={InstrumentList} />
              <Route exact path="/instruments/edit/:id" component={InstrumentEdit} />
              <Route exact path="/instruments/:id" component={InstrumentList} />
            </Switch>
          </MuiThemeProvider>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
