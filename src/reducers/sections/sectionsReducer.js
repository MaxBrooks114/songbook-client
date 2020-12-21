import {
  CREATE_SECTION,
  FETCH_SECTIONS,
  FETCH_SECTION,
  EDIT_SECTION,
  DELETE_SECTION,
  CLEAR_ALL,
} from '../../actions/types';
import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECTIONS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SECTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SECTION:
      return _.omit(state, action.payload);
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};
