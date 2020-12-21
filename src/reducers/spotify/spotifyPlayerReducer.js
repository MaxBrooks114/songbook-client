import { CHECK_IF_PLAYING, PLAY, PAUSE } from '../../actions/types';

const initialState = {
  playing: false, 
  sectionPlay: false,
  song: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IF_PLAYING:
      return { ...state, playing: action.playing, song: action.song }
    case PLAY: 
      return {...state, sectionPlay: action.sectionPlay, playing: action.playing}
    case PAUSE:
      return {...state, sectionPlay: false}
    default:
      return state;
  }
};