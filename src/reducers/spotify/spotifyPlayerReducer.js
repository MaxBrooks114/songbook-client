import { CHECK_IF_PLAYING, PLAY, PAUSE } from '../../actions/types';

const initialState = {
  playing: false, 
  elementPlay: false,
  song: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_PLAYING:
      return { ...state, playing: action.playing, song: action.song }
    case PLAY: 
      return {...state, elementPlay: action.elementPlay, playing: action.playing}
    case PAUSE:
      return {...state, elementPlay: false}
    default:
      return state;
  }
};