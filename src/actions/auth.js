import {
  LOGIN_USER,
  FETCH_USER,
  USER_LOADING,
  LOGOUT_USER,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_USER,
  REGISTER_FAIL,
  EDIT_USER,
  DELETE_USER,
  CLEAR_ALL,
} from './types';
import history from '../history';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';
import { fetchInstruments } from '../actions/instruments';
import { fetchSongs } from '../actions/songs';
import { fetchElements } from '../actions/elements';
import { showSuccessSnackbar } from './ui';
import songbook from '../apis/songbook';

export const fetchUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  try {
    const response = await songbook.get(`/auth/user`);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

export const login = (formValues) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await songbook.post('/auth/login', { ...formValues });

    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });

    dispatch(fetchElements());
    dispatch(fetchSongs());
    dispatch(fetchInstruments());
    history.push('/search')
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch(notLoading());
};

export const register = (formValues) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await songbook.post('/auth/register', { ...formValues });

    dispatch({
      type: REGISTER_USER,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  }

  dispatch(notLoading());
};

export const editUser = (userId, formValues) => async (dispatch) => {
  try {
    const response = await songbook.put(`/auth/user/edit`, formValues);

    dispatch({
      type: EDIT_USER,
      payload: response.data,
    });

    dispatch(fetchUser())
    dispatch(showSuccessSnackbar('Your Profile Was Updated Successfully'))
    history.push(`/users/${userId}`)
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};


export const logout = () => (dispatch) => {
  songbook.post('auth/logout');

  dispatch({ type: CLEAR_ALL });
  dispatch({ type: LOGOUT_USER });
};


export const deleteUser = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/auth/user/edit`);
    
    dispatch({ type: CLEAR_ALL });
    dispatch({
      type: DELETE_USER,
      payload: id,
    });

    history.push('/register');
    dispatch(showSuccessSnackbar('Account Successfully Deleted'))

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};