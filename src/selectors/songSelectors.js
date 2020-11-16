import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
import {renderText, millisToMinutesAndSeconds, renderBool} from '../helpers/detailHelpers'
const getFilterAttribute = (state) => state.filter.attribute;
const getFilterValue = (state) => state.filter.value;
const getSongs = (state) => state.songs;



export const getFilteredSongs = (state)  => {
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
      case filterAttribute === 'original':
      case filterAttribute === 'explicit':
        return renderBool(song[filterAttribute]).toLowerCase() === filterValue.toLowerCase
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
      case filterValue !== '' && song[filterAttribute] !== filterValue:
        return null

      default:
        return songs;
    }
  });
};
