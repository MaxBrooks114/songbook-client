import { filter } from 'lodash';
import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
import {renderText, audioFeaturesToNumbers} from '../helpers/detailHelpers'
const getFilters= (state) => state.filter;

const getSongs = (state) => state.songs;



export const getFilteredSongs = (state)  => {
  const filterProperties = getFilters(state);
  const songs = getSongs(state);

  let filterKeys = Object.keys(filterProperties).filter(key => key !== "filter" && key!== 'song' && key !== "loudness" )
  
 
  if (filterProperties.filter) {
    return Object.values(songs).filter(song => {
      let f = filterKeys.filter(k => (k === "original" && filterProperties[k] !== "") || (k === "explicit"  && filterProperties[k] !== "") || (filterProperties[k] && song[k]) || (filterProperties[k] && song[k]===0))
     return f.every(prop => {
          switch (prop) { 
            case 'key':
            case 'time_signature' :
              return song[prop] === parseInt(filterProperties[prop])
            case 'mode' :
              return renderText(modes, song[prop]).toLowerCase() === renderText(modes, filterProperties[prop]).toLowerCase();
            case 'original' :
            case 'explicit' : 
              return song[prop] === filterProperties[prop]
            case 'acousticness' :
            case 'danceability' :
            case 'instrumentalness' :
            case 'energy' :
            case 'liveness' :
            case 'speechiness' :
            case 'valence' :
              return (audioFeaturesToNumbers(song[prop]) >= filterProperties[prop][0] && audioFeaturesToNumbers(song[prop]) <= filterProperties[prop][1])
            case 'duration' :
              return (Math.floor(song[prop]/60000) >= parseInt(filterProperties[prop][0]) && Math.floor(song[prop]/60000) <= parseInt(filterProperties[prop][1]))
            case 'year':
                return song[prop].split('-')[0] >= filterProperties[prop][0] && song[prop].split('-')[0] <=filterProperties[prop][1]
            case 'tempo' :  
                  return (song[prop] >= filterProperties[prop][0] && song[prop] <= filterProperties[prop][1])
            case 'title':
            case 'artist':
            case 'album':
              return song[prop].toLowerCase().includes(filterProperties[prop].toLowerCase());
            default:           
              return false
          }
        })
      })
    } else {
      return songs
    }
}
