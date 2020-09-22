import spotify from '../apis/spotify';
import songbook from '../apis/songbook';
import { getToken } from '../apis/spotifyToken';
import { FETCH_SPOTIFY_TRACKS, CLEAR_SPOTIFY_TRACKS, GET_DEVICE_ID, REFRESH_ACCESS_TOKEN } from './types';
import { loading, notLoading } from './ui';
import history from '../history';
import { createSong } from './songs';
import { createElement } from './elements';
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

export const importSpotifyTrack = (id) => async (dispatch, getState) => {
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
      elements: [],
    };
    await dispatch(createSong(songData));
    let state;
    let song_id;
    for (const [i, section] of audioAnalysisData.data.sections.entries()) {
      state = getState();
      song_id = Object.keys(state.songs).pop();
      let sectionData = {
        name: `section ${i + 1}`,
        start: section.start,
        duration: section.duration,
        loudness: section.loudness,
        tempo: section.tempo,
        key: section.key,
        mode: section.mode,
        lyrics: '',
        learned: false,
        time_signature: section.time_signature,
        song: song_id,
        instrument_id: null,
      };
      await dispatch(createElement(sectionData));
    }
    dispatch(notLoading());
    dispatch(showSuccessSnackbar('Song Imported'));
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch(notLoading());
  }
  dispatch(notLoading());
};

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await songbook.get(`/spotify/callback?refresh_token=${refreshToken}`);
    dispatch({
      type: REFRESH_ACCESS_TOKEN,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error));
  }
};

export const getDeviceId = (accessToken) => async (dispatch) => {
  try {
    const response = await spotify.get('/me/player/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    dispatch({
      type: GET_DEVICE_ID,
      payload: response.data.device.id,
    });
  } catch (error) {
    dispatch(returnErrors(error));
  }
};

export const playSong = (accessToken, songUri, refreshToken) => async (dispatch) => {
  try {
    const response = await spotify.put(
      '/me/player/play',
      { uris: [songUri] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    dispatch(returnErrors(error));

    if (error.response.status === 401) {
      await dispatch(refreshAccessToken(refreshToken));

      await spotify.put(
        '/me/player/play',
        { uris: [songUri] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
};

export const playElement = (accessToken, songUri, refreshToken, start) => async (dispatch) => {
  try {
    await spotify.put(
      '/me/player/play',
      { position_ms: start * 1000, uris: [songUri] },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    dispatch(returnErrors(error));

    if (error.response.status === 401) {
      await dispatch(refreshAccessToken(refreshToken));

      await spotify.put(
        '/me/player/play',
        { uris: [songUri], position_ms: start * 1000 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
};
