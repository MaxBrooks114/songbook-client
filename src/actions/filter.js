import history from '../history';
import { SET_FILTER, CLEAR_FILTER} from './types';

export const setFilter = (formValues) => {
 
  return {
    type: SET_FILTER,
    payload: {...formValues },
  };
};

export const clearFilter = (objectType) => {
  return {
    type: CLEAR_FILTER,
  };
}

