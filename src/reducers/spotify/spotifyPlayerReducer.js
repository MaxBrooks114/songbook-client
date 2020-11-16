import { CHECK_IF_PLAYING, PLAY, PAUSE } from '../../actions/types';

const initialState = {
  playing: false, 
  controlledPlay: false,
  song: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_PLAYING:
      return { ...state, playing: action.playing, song: action.song }
    case PLAY: 
      return {...state, controlledPlay: true}
    case PAUSE:
      return {...state, controlledPlay: false}
    default:
      return state;
  }
};