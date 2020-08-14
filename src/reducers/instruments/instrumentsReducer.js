import {
  CREATE_INSTRUMENT,
  FETCH_INSTRUMENTS,
  FETCH_INSTRUMENT,
  EDIT_INSTRUMENT,
  DELETE_INSTRUMENT,
} from '../../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_INSTRUMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_INSTRUMENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_INSTRUMENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_INSTRUMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_INSTRUMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
