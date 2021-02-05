import history from '../history';
import { SET_FILTER, CLEAR_FILTER, CLEAR_NON_ARRAY_FIELDS} from './types';

export const setFilter = (formValues) => {
 
  return {
    type: SET_FILTER,
    payload: {...formValues },
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
}
export const clearNonArrayFields = () => {
  return {
    type: CLEAR_NON_ARRAY_FIELDS,
  };
}

