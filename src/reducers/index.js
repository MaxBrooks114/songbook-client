import { combineReducers } from "redux";
import spotifyTracksReducer from "./spotify/spotifyTracksReducer";
import songsReducer from "./songs/songsReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  spotifyTracks: spotifyTracksReducer,
  form: formReducer,
  songs: songsReducer,
});
