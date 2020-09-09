import { SET_TOKEN } from '../../actions/types';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  deviceId: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
}
