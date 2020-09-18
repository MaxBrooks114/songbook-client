import {
  CREATE_ELEMENT,
  FETCH_ELEMENTS,
  FETCH_ELEMENT,
  EDIT_ELEMENT,
  DELETE_ELEMENT,
  CLEAR_ALL,
} from '../../actions/types';
import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ELEMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_ELEMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ELEMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ELEMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ELEMENT:
      return _.omit(state, action.payload);
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};
