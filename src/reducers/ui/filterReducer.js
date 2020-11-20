import { SET_FILTER, CLEAR_FILTER } from '../../actions/types';

const initialState = {
  title: '',
  artist: '',
  album: '',
  genre: '',
  original: '',
  key: '',
  mode: '',
  time_signature: '',
  explicit: '',
  duration: [],
  year: [],
  tempo: [],
  acousticness: [],
  danceability: [],
  energy: [],
  instrumentalness: [],
  valence: [],
  loudness: [],
  song: [],
  filter: false
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
