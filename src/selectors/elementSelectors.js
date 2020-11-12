import keys from '../components/songs/keys';
import modes from '../components/songs/modes';
import {renderText, renderBool, millisToMinutesAndSeconds} from '../helpers/detailHelpers'

const getFilterAttribute = (state) => state.filter.attribute;
const getFilterValue = (state) => state.filter.value;
const getElements = (state) => state.elements;
const getInstruments = (state) => state.instruments



export const getFilteredElements = (state)  => {
  const filterAttribute = getFilterAttribute(state);
  const filterValue = getFilterValue(state);
  const elements = getElements(state)
  const instruments = getInstruments(state)
  
  if (!filterAttribute || !filterValue) {
    return elements;
  }

  return Object.values(elements).filter((element) => {
    switch (true) {
      case typeof element[filterAttribute] === 'string':
        return element[filterAttribute].toLowerCase().includes(filterValue.toLowerCase());
      case filterAttribute === 'tempo':
        return parseInt(element[filterAttribute]) === parseInt(filterValue);
      case filterAttribute === 'key':
        return renderText(keys, element[filterAttribute]) === filterValue.toUpperCase();
      case filterAttribute === 'mode':
        return renderText(modes, element[filterAttribute]) === filterValue.toLowerCase();
      case filterAttribute === 'time_signature':
        return element[filterAttribute] === parseInt(filterValue);
      case filterAttribute === 'duration' || filterAttribute === 'start':
        return millisToMinutesAndSeconds(element[filterAttribute]).split(':')[0] === filterValue;
      case filterAttribute === 'original':
      case filterAttribute === 'explicit':
        return renderBool(element[filterAttribute]).toLowerCase() === filterValue.toLowerCase
      case filterAttribute === 'instruments':
          // nested serializers in django are annoying. instead of displaying the whole object in state, need to grab from separate piece of state
          let instrument = Object.values(instruments).filter(instrument => instrument.name.toLowerCase() === filterValue.toLowerCase())[0]
          return element.instruments.includes(instrument.id)
      case filterAttribute === 'song':
            return element.song.title.toLowerCase().includes(filterValue.toLowerCase())
      default:
        return elements;
    }
  });
};
