import { SET_TOKENS, GET_TOKENS, CLEAR_ALL, GET_DEVICE_ID, REFRESH_ACCESS_TOKEN } from '../../actions/types';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  deviceId: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOKENS:
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
      };

    case GET_TOKENS:
      return {
        ...state,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      };

    case REFRESH_ACCESS_TOKEN:
      localStorage.setItem('accessToken', action.payload);
      return {
        ...state,
        accessToken: action.payload,
      };
    case GET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
      };
    case CLEAR_ALL:
      return {
        deviceId: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
}
