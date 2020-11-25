import React from 'react'
import spotify from '../apis/spotify';
import * as workerTimers from 'worker-timers'
import songbook from '../apis/songbook';
import { getToken } from '../apis/spotifyToken';
import { FETCH_SPOTIFY_TRACKS, CLEAR_SPOTIFY_TRACKS, GET_DEVICE_ID, REFRESH_ACCESS_TOKEN, CHECK_IF_PLAYING, PLAY, PAUSE } from './types';
import { loading, notLoading } from './ui';
import history from '../history';
import { createSong } from './songs';
import { createElement } from './elements';
import { returnErrors } from './messages';
import { showSuccessSnackbar } from './ui';
import { Link } from 'react-router-dom';

let timeoutId

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
        start: section.start*1000,
        duration: section.duration*1000,
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
    dispatch(showSuccessSnackbar(`Song Imported`));
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch(notLoading());
  }
  dispatch(notLoading());
};

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await songbook.get(`/spotify/callback?refresh_token=${refreshToken}`);
    await dispatch({
      type: REFRESH_ACCESS_TOKEN,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch(returnErrors(error));
  }
};

export const getDeviceId = (accessToken) => async (dispatch) => {
  try {
    const response = await spotify.get('/me/player/devices', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_DEVICE_ID,
      payload: response.data.devices[0].id,
    });
    return response.data.devices[0].id;
  } catch (error) {
    dispatch(returnErrors(error));
  }
};

export const playSong = (accessToken, songUri, refreshToken, deviceId) => async (dispatch) => {
  dispatch(loading());
 

  try {
    const url = deviceId === '' ? '/me/player/play' : `/me/player/play?device_id=${deviceId}`;
    await spotify.put(
      url,
      { uris: [songUri] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: PLAY,
      controlledPlay: false
    })
  } catch (error) {
    dispatch(returnErrors(error));
    if (error.response.status === 401) {
      const newAccessToken = await dispatch(refreshAccessToken(refreshToken));
      dispatch(playSong(newAccessToken, songUri, refreshToken, deviceId));
    }
    if (error.response.status === 404) {
      const newDeviceId = await dispatch(getDeviceId(accessToken));
      dispatch(playSong(accessToken, songUri, refreshToken, newDeviceId));
    }
  }
  dispatch(notLoading());
};

export const pausePlayer = (accessToken, refreshToken, deviceId, songUri) =>  async (dispatch, getState) => {
  
  try { 
    let state = getState();
    const url = deviceId === '' ? '/me/player/pause' : `/me/player/pause?device_id=${deviceId}`;
    if (state.spotifyPlayer.playing && state.spotifyPlayer.controlledPlay && state.spotifyPlayer.song === songUri) { 
      spotify.put( 
        url,
        {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
  }
   

    } catch (error) {
      dispatch(returnErrors(error));
      if (error.response.status === 401) {
        const newAccessToken = await dispatch(refreshAccessToken(refreshToken));
        dispatch(pausePlayer(newAccessToken, deviceId));
      }
      if (error.response.status === 404) {
        const newDeviceId = await dispatch(getDeviceId(accessToken));
        dispatch(pausePlayer(accessToken, newDeviceId));
      }
    }
    dispatch({
    type: PAUSE,
    payload: false
  })
}

export const playElement = (accessToken, songUri, refreshToken, start, duration, deviceId) => async (dispatch) => {
  dispatch(loading());
  
  
  timeoutId = workerTimers.setTimeout(() => {
    dispatch(pausePlayer(accessToken, refreshToken, deviceId, songUri))
   
    workerTimers.clearTimeout(timeoutId)
  }, duration)
  dispatch({
    type: PLAY,
    playing: true,
    controlledPlay: true
  })
 
  try { 
    const url = deviceId === '' ? '/me/player/play' : `/me/player/play?device_id=${deviceId}`;

    await spotify.put(
      url,
      { position_ms: start, uris: [songUri] },

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
      const newAccessToken = await dispatch(refreshAccessToken(refreshToken));
      dispatch(playElement(newAccessToken, songUri, refreshToken, start, duration, deviceId));
    }
    if (error.response.status === 404) {
      const newDeviceId = await dispatch(getDeviceId(accessToken));
      dispatch(playElement(accessToken, songUri, refreshToken, start, duration, newDeviceId));
    }
  }
  
  dispatch(notLoading());

};


export const checkIfPlaying = (accessToken, refreshToken ) => async (dispatch) => {
  try {
    const response = await spotify.get(
      '/me/player',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.data){
    dispatch({
      type: CHECK_IF_PLAYING,
      playing: response.data.is_playing,
      song: response.data.item.uri
    });
  }
  } catch (error) {
    dispatch(returnErrors(error));
    if (error.response.status === 401) {
      const newAccessToken = await dispatch(refreshAccessToken(refreshToken));
      await dispatch(checkIfPlaying(newAccessToken, refreshToken));
    }
  }
}