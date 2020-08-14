import history from '../history';
import {
  LOGIN_USER,
  FETCH_USER,
  USER_LOADING,
  LOGOUT_USER,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_USER,
  REGISTER_FAIL,
} from './types';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';
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

export const logout = () => (dispatch) => {
  songbook.post('auth/logout');

  dispatch({ type: LOGOUT_USER });
};
