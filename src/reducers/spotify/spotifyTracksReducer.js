import { FETCH_SPOTIFY_TRACKS, CLEAR_SPOTIFY_TRACKS, IMPORT_SPOTIFY_TRACK } from "../../actions/spotify/types";
import _ from "lodash";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_TRACKS:
      return { ...state, ..._.mapKeys(action.payload, "name") };
    case CLEAR_SPOTIFY_TRACKS:
      return initialState;
    case IMPORT_SPOTIFY_TRACK:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
