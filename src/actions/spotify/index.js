import spotify from "../../apis/spotify";
import { getToken } from "../../apis/spotifyToken";
import { FETCH_SPOTIFY_TRACKS, CLEAR_SPOTIFY_TRACKS } from "./types";

export const fetchSpotifyTracks = (query) => async (dispatch) => {
  const token = await getToken();

  const response = await spotify.get("/search", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      q: query,
      type: "track",
      limit: "50",
    },
  });

  dispatch({ type: CLEAR_SPOTIFY_TRACKS });

  dispatch({
    type: FETCH_SPOTIFY_TRACKS,
    payload: response.data.tracks.items,
  });
};

export const clearSpotifyTracks = () => {
  return {
    type: CLEAR_SPOTIFY_TRACKS,
  };
};
