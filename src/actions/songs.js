import history from '../history';
import { CREATE_SONG, FETCH_SONGS, FETCH_SONG, DELETE_SONG, EDIT_SONG } from './types';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';

import songbook from '../apis/songbook';

export const createSong = (formValues) => async (dispatch) => {
  try {
    const response = await songbook.post('/songs/', { ...formValues });
    dispatch(loading());
    dispatch({
      type: CREATE_SONG,
      payload: response.data,
    });

    if (!history.location.pathname.includes('search')) {
      history.push('/songs');
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  dispatch(notLoading());
};

export const fetchSongs = () => async (dispatch) => {
  try {
    const response = await songbook.get('/songs');
    dispatch(loading());
    dispatch({
      type: FETCH_SONGS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  dispatch(notLoading());
};

export const fetchSong = (id) => async (dispatch) => {
  try {
    const response = await songbook.get(`/songs/${id}`);
    dispatch(loading());
    dispatch({
      type: FETCH_SONG,
      payload: response.data,
    });
    if (!history.location.pathname.includes('edit')) {
      history.push(`/songs/${id}`);
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  dispatch(notLoading());
};

export const deleteSong = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/songs/${id}`);

    dispatch({
      type: DELETE_SONG,
      payload: id,
    });

    history.push('/songs');
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editSong = (id, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/songs/${id}/`, formValues);

    dispatch({
      type: EDIT_SONG,
      payload: response.data,
    });

    history.push(`/songs/${id}`);
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
