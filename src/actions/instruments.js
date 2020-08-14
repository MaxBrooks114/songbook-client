import history from '../history';
import { CREATE_INSTRUMENT, FETCH_INSTRUMENTS, FETCH_INSTRUMENT, DELETE_INSTRUMENT, EDIT_INSTRUMENT } from './types';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';
import songbook from '../apis/songbook';

export const createInstrument = (formValues) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.post('/instruments/', { ...formValues });
    dispatch({
      type: CREATE_INSTRUMENT,
      payload: response.data,
    });
    history.push('/instruments');
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const fetchInstruments = () => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get('/instruments/');
    dispatch({
      type: FETCH_INSTRUMENTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  dispatch(notLoading());
};

export const fetchInstrument = (id) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get(`/instruments/${id}/`);
    dispatch({
      type: FETCH_INSTRUMENT,
      payload: response.data,
    });
    if (!history.location.pathname.includes('edit')) {
      history.push(`/instruments/${id}`);
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const deleteInstrument = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/instruments/${id}`);

    dispatch({
      type: DELETE_INSTRUMENT,
      payload: id,
    });

    history.push('/instruments');
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editInstrument = (id, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/instruments/${id}/`, formValues);

    dispatch({
      type: EDIT_INSTRUMENT,
      payload: response.data,
    });

    history.push(`/instruments/${id}`);
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
