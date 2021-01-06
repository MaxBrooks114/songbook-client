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
  acousticness: [1,3],
  danceability: [1,3],
  energy: [1,3],
  instrumentalness: [1,3],
  speechiness: [1,3],
  liveness: [1,3],
  valence: [1,3],
  song: '',
  instrument: '',
  learned: '',
  filter: false,
  sort: '',
  order: 'ascending'
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
