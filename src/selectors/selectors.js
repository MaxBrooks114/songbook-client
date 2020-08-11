import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
const getFilterAttribute = (state) => state.filter.attribute;
const getFilterValue = (state) => state.filter.value;
const getSongs = (state) => state.songs;

const renderText = (list, v) => {
  return v || v === 0 ? list.find((k) => k[v])[v] : null;
};

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const getFilteredSongs = (state) => {
  const filterAttribute = getFilterAttribute(state);
  const filterValue = getFilterValue(state);
  const songs = getSongs(state);

  if (!filterAttribute || !filterValue) {
    return songs;
  }

  return Object.values(songs).filter((song) => {
    switch (true) {
      case typeof song[filterAttribute] === 'string':
        return song[filterAttribute].toLowerCase().includes(filterValue.toLowerCase());
      case filterAttribute === 'tempo':
        return parseInt(song[filterAttribute]) === parseInt(filterValue);
      case filterAttribute === 'key':
        return renderText(keys, song[filterAttribute]) === filterValue.toUpperCase();
      case filterAttribute === 'mode':
        return renderText(modes, song[filterAttribute]) === filterValue.toLowerCase();
      case filterAttribute === 'time_signature':
        return song[filterAttribute] === parseInt(filterValue);
      case filterAttribute === 'duration':
        return millisToMinutesAndSeconds(song[filterAttribute]).split(':')[0] === filterValue;
      case filterAttribute === 'acousticness' ||
        filterAttribute === 'danceability' ||
        filterAttribute === 'instrumentalness' ||
        filterAttribute === 'energy' ||
        filterAttribute === 'liveness' ||
        filterAttribute === 'speechiness' ||
        filterAttribute === 'valence':
        if (filterValue === 'high') {
          return song[filterAttribute] > 0.7;
        } else if (filterValue === 'medium') {
          return song[filterAttribute] > 0.35 && song[filterAttribute] <= 0.7;
        } else if (filterValue === 'low') {
          return song[filterAttribute] < 0.3;
        }

      // eslint-disable-next-line no-fallthrough
      default:
        return songs;
    }
  });
};
