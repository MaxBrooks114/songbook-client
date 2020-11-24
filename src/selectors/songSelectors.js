import { filter } from 'lodash';
import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
import {renderText, audioFeaturesToNumbers} from '../helpers/detailHelpers'
const getFilters= (state) => state.filter;
const getElements = (state) => state.elements;
const getInstruments = (state) => state.instruments
const getSongs = (state) => state.songs;



export const getFilteredItems = (state, objectType)  => {
  const filterProperties = getFilters(state);
  const songs = getSongs(state);
  const elements = getElements(state)
  const instruments = getInstruments(state)

  let filterKeys = Object.keys(filterProperties).filter(key => key !== "filter" && key !== "loudness" )
  
  let filterables = objectType === 'songs' ? songs : elements 
 
  if (filterProperties.filter) {
    return Object.values(filterables).filter(f => {
      let fk = filterKeys.filter(k => (k === "learned" && filterProperties[k] !== "") || (k === "original" && filterProperties[k] !== "") || (k === "explicit"  && filterProperties[k] !== "") || (filterProperties[k] && f[k]) || (filterProperties[k] && f[k]===0) || (objectType === 'elements' && k === "instrument" && filterProperties[k] !== "")  )
     return fk.every(prop => {
          switch (prop) { 
            case 'key':
            case 'time_signature' :
              return f[prop] === parseInt(filterProperties[prop])
            case 'mode' :
              return renderText(modes, f[prop]).toLowerCase() === renderText(modes, filterProperties[prop]).toLowerCase();
            case 'original' :
            case 'explicit' : 
            case 'learned':
              return f[prop] === filterProperties[prop]
            case 'acousticness' :
            case 'danceability' :
            case 'instrumentalness' :
            case 'energy' :
            case 'liveness' :
            case 'speechiness' :
            case 'valence' :
              return (audioFeaturesToNumbers(f[prop]) >= filterProperties[prop][0] && audioFeaturesToNumbers(f[prop]) <= filterProperties[prop][1])
            case 'duration' :
              return (Math.floor(f[prop]/60000) >= parseInt(filterProperties[prop][0]) && Math.floor(f[prop]/60000) <= parseInt(filterProperties[prop][1]))
            case 'year':
                return f[prop].split('-')[0] >= filterProperties[prop][0] && f[prop].split('-')[0] <=filterProperties[prop][1]
            case 'tempo' :  
                  return (f[prop] >= filterProperties[prop][0] && f[prop] <= filterProperties[prop][1])
            case 'title':
            case 'artist':
            case 'album':
            case 'name':
              return f[prop].toLowerCase().includes(filterProperties[prop].toLowerCase());
            case 'instrument':
              // nested serializers in django are annoying. instead of displaying the whole object in state, need to grab from separate piece of state
              
              let instrument = Object.values(instruments).filter(instrument => instrument.name.toLowerCase() === filterProperties[prop].toLowerCase())[0]
              return f.instruments.includes(instrument.id)
            case 'song':
              return f[prop].title.toLowerCase().includes(filterProperties[prop].toLowerCase())
            default:           
              return false
          }
        })
      })
    } else {
      return filterables
    }
}
