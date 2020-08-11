import { combineReducers } from 'redux';
import spotifyTracksReducer from './spotify/spotifyTracksReducer';
import songsReducer from './songs/songsReducer';
import instrumentsReducer from './instruments/instrumentsReducer';
import snackbarReducer from './ui/snackbarReducer';
import filterReducer from './ui/filterReducer';
import { reducer as formReducer } from 'redux-form';
import loadingReducer from './ui/loadingReducer';

export default combineReducers({
  spotifyTracks: spotifyTracksReducer,
  form: formReducer,
  songs: songsReducer,
  instruments: instrumentsReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  filter: filterReducer,
});
