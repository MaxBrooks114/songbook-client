import { FETCH_SPOTIFY_TRACKS } from "../../actions/spotify/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_TRACKS:
      return { ...state, ..._.mapKeys(action.payload, "name") };
    default:
      return state;
  }
};