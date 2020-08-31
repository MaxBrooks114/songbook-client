import { SET_TOKEN } from '../../actions/types';

const initialState = {
  accesToken: localStorage.getItem('accessToken'),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        ...state,
        token: localStorage.getItem('accessToken'),
      };

    default:
      return state;
  }
}
