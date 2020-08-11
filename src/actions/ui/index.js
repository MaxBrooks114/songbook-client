import { SNACKBAR_CLEAR, SNACKBAR_SUCCESS, LOADING, NOT_LOADING } from './types';

export const showSuccessSnackbar = (message) => {
  return (dispatch) => {
    dispatch({ type: SNACKBAR_SUCCESS, message });
  };
};

export const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: SNACKBAR_CLEAR });
  };
};

export const loading = () => {
  return (dispatch) => {
    dispatch({ type: LOADING });
  };
};
export const notLoading = () => {
  return (dispatch) => {
    dispatch({ type: NOT_LOADING });
  };
};
