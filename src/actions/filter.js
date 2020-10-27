import history from '../history';
import { SET_FILTER, CLEAR_FILTER } from './types';

export const setFilter = (attribute, value, objectType) => {
  if (attribute && value) {
    history.push(`/${objectType}/${attribute}/${value}`);
  }
  return {
    type: SET_FILTER,
    payload: { attribute, value },
  };
};

export const clearFilter = (objectType) => {
  history.push(`/${objectType}`);
  return {
    type: CLEAR_FILTER,
  };
};
