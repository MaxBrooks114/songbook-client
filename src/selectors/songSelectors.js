import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
import {renderText, millisToMinutesAndSeconds, renderBool, audioFeaturesToNumbers} from '../helpers/detailHelpers'
const getFilters= (state) => state.filter;
const getSongs = (state) => state.songs;



export const getFilteredSongs = (state)  => {
  const filters = getFilters(state);
  const songs = getSongs(state);
 
  if (filters.filter) {
  return Object.values(songs).filter((song) => {
    for (let key in filters) {
      if (filters[key] && (filters[key] !== '' || filters[key].length)) {
        switch (true) {
          case typeof filters[key] === 'string':
            return song[key].toLowerCase().includes(filters[key].toLowerCase());
          case key === 'key':
            return renderText(keys, song[key]) === filters[key].toUpperCase();
          case key === 'mode':
            return renderText(modes, song[key]) === filters[key].toLowerCase();
          case key === 'time_signature':
            return song[key] === parseInt(filters[key]);
          // case key === 'duration':
          //   return millisToMinutesAndSeconds(song[key]).split(':')[0] === filterValue;
          case key === 'original':
          case key === 'explicit':
            return renderBool(song[key]).toLowerCase() === filters[key].toLowerCase()
          case key === 'acousticness':
          case key === 'danceability':
          case key === 'instrumentalness':
          case key === 'energy':
          case key === 'liveness':
          case key === 'speechiness':
          case key === 'valence':
            return (audioFeaturesToNumbers(song[key]) >= filters[key][0] && audioFeaturesToNumbers(song[key]) <= filters[key][1])
          case key === 'duration':
            return (Math.floor(song[key]/60000) >= filters[key][0] && Math.floor(song[key]/60000) <= filters[key][1])
          case key === 'tempo':  
                return (song[key] >= filters[key][0] && song[key] <= filters[key][1])
          default:
            return song;
        }
      }
    };
    });
  } else {
    return songs
  }
}
