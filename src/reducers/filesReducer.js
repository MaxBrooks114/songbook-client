import { CREATE_FILE, FETCH_FILES, FETCH_FILE, EDIT_FILE, DELETE_FILE, CLEAR_ALL } from './../actions/types';
import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_FILE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FILE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_FILE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_FILE:
      return _.omit(state, action.payload);
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};