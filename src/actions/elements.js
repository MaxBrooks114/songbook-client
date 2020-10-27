import history from '../history';
import { CREATE_ELEMENT, FETCH_ELEMENTS, FETCH_ELEMENT, DELETE_ELEMENT, EDIT_ELEMENT } from './types';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';
import { showSuccessSnackbar } from './ui';
import songbook from '../apis/songbook';

export const createElement = (formValues) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.post('/elements/', { ...formValues });
    dispatch({
      type: CREATE_ELEMENT,
      payload: response.data,
    });
    if (!history.location.pathname.includes('search')) {
      history.push('/elements');
      dispatch(showSuccessSnackbar('Element Created'))
    }
    
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const fetchElements = () => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get('/elements/');
    dispatch({
      type: FETCH_ELEMENTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response));
  }
  dispatch(notLoading());
};

export const fetchElement = (id) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get(`/elements/${id}/`);
    dispatch({
      type: FETCH_ELEMENT,
      payload: response.data,
    });
    if (!history.location.pathname.includes('edit')) {
      history.push(`/elements/${id}`);
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const deleteElement = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/elements/${id}`);

    dispatch({
      type: DELETE_ELEMENT,
      payload: id,
    });

    history.push('/elements');
    dispatch(showSuccessSnackbar('Element Deleted'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editElement = (id, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/elements/${id}/`, formValues);

    dispatch({
      type: EDIT_ELEMENT,
      payload: response.data,
    });

    history.push(`/elements/${id}`);
    dispatch(showSuccessSnackbar('Element updated successfully'))

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
