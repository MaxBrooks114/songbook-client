import history from '../../history';
import { SET_FILTER, CLEAR_FILTER } from './types';

export const setFilter = (attribute, value) => {
  return {
    type: SET_FILTER,
    payload: { attribute, value },
  };
};

export const clearFilter = () => {
  history.push('/songs');
  return {
    type: CLEAR_FILTER,
  };
};
