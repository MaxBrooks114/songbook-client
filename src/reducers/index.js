import { combineReducers } from 'redux';
import spotifyTracksReducer from './spotify/spotifyTracksReducer';
import songsReducer from './songs/songsReducer';
import elementsReducer from './elements/elementsReducer';
import instrumentsReducer from './instruments/instrumentsReducer';
import snackbarReducer from './ui/snackbarReducer';
import filterReducer from './ui/filterReducer';
import { reducer as formReducer } from 'redux-form';
import loadingReducer from './ui/loadingReducer';
import authReducer from './auth/authReducer';
import messagesReducer from './messagesReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  spotifyTracks: spotifyTracksReducer,
  form: formReducer,
  songs: songsReducer,
  instruments: instrumentsReducer,
  elements: elementsReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  filter: filterReducer,
});
