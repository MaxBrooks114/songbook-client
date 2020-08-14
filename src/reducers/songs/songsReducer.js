import { CREATE_SONG, FETCH_SONGS, FETCH_SONG, EDIT_SONG, DELETE_SONG } from '../../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_SONG:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_SONG:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_SONG:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SONG:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
