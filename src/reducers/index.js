import { combineReducers } from 'redux';
import spotifyTracksReducer from './spotify/spotifyTracksReducer';
import songsReducer from './songs/songsReducer';
import snackbarReducer from './ui/snackbarReducer';
import filterReducer from './ui/filterReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  spotifyTracks: spotifyTracksReducer,
  form: formReducer,
  songs: songsReducer,
  snackbar: snackbarReducer,
  filter: filterReducer,
});
