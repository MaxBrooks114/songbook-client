import { CREATE_SONG, FETCH_SONGS, FETCH_SONG, EDIT_SONG, DELETE_SONG, CLEAR_ALL } from '../../actions/types';
import _, { initial } from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
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
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};
