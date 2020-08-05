import { SET_FILTER, CLEAR_FILTER } from '../actions/filter/types';

const initialState = {
  attribute: '',
  value: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload };
    case CLEAR_FILTER:
      return initialState;
    default:
      return state;
  }
};
