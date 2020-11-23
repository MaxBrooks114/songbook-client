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
      let f = filterKeys.filter(k => (k === "original" && filterProperties[k] !== "") || (k === "explicit"  && filterProperties[k] !== "") || (filterProperties[k] && song[k]))
     return f.every(prop => {
          console.log(f)
          console.log(prop)
          console.log(song)
          console.log(song[prop])
          console.log(filterProperties)
          console.log(filterProperties[prop])
          switch (prop) { 
            case 'key':
              console.log(renderText(keys, song[prop]) === filterProperties[prop])
              return renderText(keys, song[prop]) === filterProperties[prop];
            case 'mode' :
              console.log(renderText(modes, song[prop]) === filterProperties[prop].toLowerCase())
              return renderText(modes, song[prop]) === filterProperties[prop].toLowerCase();
            case 'time_signature' :
              console.log(parseInt(song[prop]) === parseInt(filterProperties[prop]))
              return parseInt(song[prop]) === parseInt(filterProperties[prop]);
            case 'original' :
            case 'explicit' :
              console.log(song[prop] === filterProperties[prop])
              return song[prop] === filterProperties[prop]
            case 'acousticness' :
            case 'danceability' :
            case 'instrumentalness' :
            case 'energy' :
            case 'liveness' :
            case 'speechiness' :
            case 'valence' :
              console.log(audioFeaturesToNumbers(song[prop]) >= filterProperties[prop][0] && audioFeaturesToNumbers(song[prop]) <= filterProperties[prop][1])
              return (audioFeaturesToNumbers(song[prop]) >= filterProperties[prop][0] && audioFeaturesToNumbers(song[prop]) <= filterProperties[prop][1])
            case 'duration' :
              console.log(Math.floor(song[prop]/60000) >= parseInt(filterProperties[prop][0]) && Math.floor(song[prop]/60000) <= parseInt(filterProperties[prop][1]))
              return (Math.floor(song[prop]/60000) >= parseInt(filterProperties[prop][0]) && Math.floor(song[prop]/60000) <= parseInt(filterProperties[prop][1]))
            case 'year':
                return song[prop].split('-')[0] >= filterProperties[prop][0] && song[prop].split('-')[0] <=filterProperties[prop][1]
            case 'tempo' :  
                  console.log(song[prop] >= filterProperties[prop][0] && song[prop] <= filterProperties[prop][1])
                  return (song[prop] >= filterProperties[prop][0] && song[prop] <= filterProperties[prop][1])
            case 'title':
            case 'artist':
            case 'album':
              console.log(song[prop].toLowerCase().includes(filterProperties[prop].toLowerCase()))
              return song[prop].toLowerCase().includes(filterProperties[prop].toLowerCase());

            default:
              console.log('default case his (no matched prop)')
              return false
          }
        })
      })
    } else {
      return songs
    }
}
