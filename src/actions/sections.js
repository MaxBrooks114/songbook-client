import history from '../history';
import { CREATE_SECTION, FETCH_SECTIONS, FETCH_SECTION, DELETE_SECTION, EDIT_SECTION } from './types';
import { loading, notLoading } from './ui';
import { returnErrors } from './messages';
import { showSuccessSnackbar } from './ui';
import songbook from '../apis/songbook';

export const createSection = (formValues) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.post('/sections/', { ...formValues });
    dispatch({
      type: CREATE_SECTION,
      payload: response.data,
    });
    if (history.location.pathname.includes('sections/new')) {
      history.push(`/sections/${response.data.id}`);
      dispatch(showSuccessSnackbar('Section Created'))
    }
     dispatch(fetchSections())
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
 
  dispatch(notLoading());
};

export const fetchSections = () => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get('/sections/');
    dispatch({
      type: FETCH_SECTIONS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response));
  }
  dispatch(notLoading());
};

export const fetchSection = (id) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await songbook.get(`/sections/${id}/`);
    dispatch({
      type: FETCH_SECTION,
      payload: response.data,
    });
    if (!history.location.pathname.includes('edit')) {
      history.push(`/sections/${id}`);
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }

  dispatch(notLoading());
};

export const deleteSection = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/sections/${id}`);

    dispatch({
      type: DELETE_SECTION,
      payload: id,
    });

    history.push('/sections');
    dispatch(showSuccessSnackbar('Section Deleted'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editSection = (id, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/sections/${id}/`, formValues);

    dispatch({
      type: EDIT_SECTION,
      payload: response.data,
    });

    history.push(`/sections/${id}`);
    dispatch(showSuccessSnackbar('Section updated successfully'))

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
