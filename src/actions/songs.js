import history from '../history';
import { CREATE_SONG, FETCH_SONGS, FETCH_SONG, DELETE_SONG, EDIT_SONG, DELETE_SECTION } from './types';
import { loading, notLoading, showSuccessSnackbar } from './ui';

import { returnErrors } from './messages';

import songbook from '../apis/songbook';

export const createSong = (formValues) => async (dispatch) => {
  dispatch(loading());
   const formData = new FormData();
   for(let field in formValues){
     if(field === "sections"){
       formData.append("sections[]", [])
     } else{
        formData.append(field, formValues[field])
     }
    
   }  

  try {
   
    const response = await songbook.post('/songs/', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
        }
    });

    dispatch({
      type: CREATE_SONG,
      payload: response.data,
    });

    if (history.location.pathname.includes('songs/new')) {
      history.push('/songs');
      dispatch(showSuccessSnackbar('Song Created'))

    }
    return response.data

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
  dispatch(notLoading());
};

export const fetchSongs = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await songbook.get('/songs/');

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
  dispatch(loading());
  try {
    const response = await songbook.get(`/songs/${id}/`);

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

export const deleteSong = (id, song) => async (dispatch) => {
  try {
    await songbook.delete(`/songs/${id}/`);
    for (let section of song.sections) {
      dispatch({
        type: DELETE_SECTION,
        payload: section,
      });
    }
    dispatch({
      type: DELETE_SONG,
      payload: id,
    });

    history.push('/songs');
    dispatch(showSuccessSnackbar('Song Deleted'))

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editSong = (id, formValues) => async (dispatch) => {
  const formData = new FormData();
   for(let field in formValues){
     if(field === "sections"){
       formData.append("sections[]", [])
     } else if(!formValues[field]){
       continue
     } else{
        formData.append(field, formValues[field])
     }
    
   }  
  try {
    const response = await songbook.patch(`/songs/${id}/`, formData);

    dispatch({
      type: EDIT_SONG,
      payload: response.data,
    });

    history.push(`/songs/${id}`);
    dispatch(showSuccessSnackbar('Song Updated Succesfully'))

  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
