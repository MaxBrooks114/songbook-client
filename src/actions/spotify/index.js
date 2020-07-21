import spotify from '../../apis/spotify'
import {getToken}from '../../apis/spotifyToken'
import { FETCH_SPOTIFY_TRACKS } from './types'

export const fetchSpotifyTracks = (search) => async (dispatch) => {

    const token = await getToken()

    
    const response = await spotify.get("/search", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
        params: {
          q: search,
          type: "track",
        },
      });

      console.log(response)
  
    dispatch({
      type: FETCH_SPOTIFY_TRACKS,
      payload: response.data.tracks.items,
    });
  };