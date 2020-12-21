import modes from '../components/songs/modes';
import {renderText, audioFeaturesToNumbers} from '../helpers/detailHelpers'
const getFilters= (state) => state.filter;
const getSections = (state) => state.sections;
const getInstruments = (state) => state.instruments
const getSongs = (state) => state.songs;


export const getFilteredItems = (state, objectType)  => {
  const filterProperties =getFilters(state);
  const songs = getSongs(state);
  const sections = getSections(state)
  const instruments = getInstruments(state)
  const filterKeys = Object.keys(filterProperties).filter(key => key !== "filter" && key !== "loudness" )
  const orderArray = filterProperties.order === "Ascending" ? [ 1 , -1] : [-1, 1]


  const filterables = objectType === 'songs' ? songs : sections
  if (filterProperties.filter) {
    return Object.values(filterables).filter(f => {
      let fk = filterKeys.filter(k => (k === "learned" && filterProperties[k] !== "") || (k === "original" && filterProperties[k] !== "") || (k === "explicit"  && filterProperties[k] !== "") || (filterProperties[k] && f[k]) || (filterProperties[k] && f[k]===0) || (objectType === 'sections' && k === "instrument" && filterProperties[k] !== "")  )
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
            case 'tempo' :  
            case 'duration' :
              return (f[prop] >= parseInt(filterProperties[prop][0]) && f[prop] <= parseInt(filterProperties[prop][1]))
            case 'year':
                return f[prop].split('-')[0] >= filterProperties[prop][0] && f[prop].split('-')[0] <=filterProperties[prop][1]
            case 'title':
            case 'artist':
            case 'album':
            case 'genre':
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
      }).sort((a, b) => (a[filterProperties.sort] > b[filterProperties.sort] ? orderArray[0] : orderArray[1]))
    } else {
      return Object.values(filterables).sort((a, b) => (a[filterProperties.sort] > b[filterProperties.sort] ? 1 : -1))
    }
}
