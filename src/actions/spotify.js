import spotify from '../apis/spotify';
import { getToken } from '../apis/spotifyToken';
import { FETCH_SPOTIFY_TRACKS, CLEAR_SPOTIFY_TRACKS } from './types';
import { loading, notLoading } from './ui';
import { createSong } from './songs';
import { returnErrors } from './messages';
import { showSuccessSnackbar } from './ui';

export const fetchSpotifyTracks = (query) => async (dispatch) => {
  dispatch(loading());
  try {
    const token = await getToken();

    const response = await spotify.get('/search', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        q: query,
        type: 'track',
        limit: '50',
      },
    });

    dispatch({ type: CLEAR_SPOTIFY_TRACKS });

    dispatch({
      type: FETCH_SPOTIFY_TRACKS,
      payload: response.data.tracks.items,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const clearSpotifyTracks = () => {
  return {
    type: CLEAR_SPOTIFY_TRACKS,
  };
};

export const importSpotifyTrack = (id) => async (dispatch) => {
  dispatch(loading());

  try {
    const token = await getToken();

    const trackData = await spotify.get(`/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const audioFeatureData = await spotify.get(`/audio-features/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const audioAnalysisData = await spotify.get(`/audio-analysis/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const artistData = await spotify.get(`/artists/${trackData.data.artists[0].id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const songData = {
      title: trackData.data.name,
      artist: trackData.data.artists[0].name,
      album: trackData.data.album.name,
      year: trackData.data.album.release_date,
      image: trackData.data.album.images[1].url,
      genre: artistData.data.genres[0],
      duration: trackData.data.duration_ms,
      explicit: trackData.data.explicit,
      key: audioFeatureData.data['key'],
      mode: audioFeatureData.data['mode'],
      lyrics: '',
      time_signature: audioFeatureData.data['time_signature'],
      tempo: audioFeatureData.data['tempo'],
      acousticness: audioFeatureData.data['acousticness'],
      danceability: audioFeatureData.data['danceability'],
      energy: audioFeatureData.data['energy'],
      instrumentalness: audioFeatureData.data['instrumentalness'],
      liveness: audioFeatureData.data['liveness'],
      loudness: audioFeatureData.data['loudness'],
      speechiness: audioFeatureData.data['speechiness'],
      valence: audioFeatureData.data['valence'],
      original: false,
      spotify_url: trackData.data.uri,
      spotify_id: trackData.data.id,
    };
    dispatch(createSong(songData));
    dispatch(notLoading());
    dispatch(showSuccessSnackbar('Song Imported'));
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch(notLoading());
  }
  dispatch(notLoading());
};
