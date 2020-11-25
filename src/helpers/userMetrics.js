import _ from 'lodash'

export const favorite = (list, attr) => {
  return _.maxBy(Object.values(_.groupBy(list, el => el[attr])), arr => arr.length)[0][attr];
}

export const favoriteInstrument = (elements, instruments) => {
  const instrumentMap = elements.filter((element) => {
      if (element.instruments.length) {
        return element.instruments
      }
    }).map((element) => element.instruments).flat()
  const instrumentId = _.head(_(instrumentMap) 
  .countBy()
  .entries()
  .maxBy(_.last));
 const fav_instrument = instruments.find(instrument => instrument.id === parseInt(instrumentId)) || instruments[0]

 return fav_instrument.name
}


export const elementsLearned = (elements) => {
  return elements.filter(element => element.learned).length
}

export const attrPreference = (songs, attr) => {

  const low = []
  const medium = []
  const high = []
  for (let song of songs) {
    if(song[attr] <= 0.35){
      low.push(song[attr])
    } else if (song[attr] > 0.35 && song[attr] <= 0.7) {
      medium.push(song[attr])
    } else if  (song[attr]> 0.7) {
      high.push(song[attr])
    } else {
      continue
    }
  }
  if (Math.max(low.length, medium.length, high.length) === low.length) return 'low'
  else if (Math.max(low.length, medium.length, high.length) === medium.length) return 'medium'
  else return 'high'

 }

 export const maxAttr = (songs, feature) => {
  return songs.reduce((max, song) => max[feature] > song[feature] ? max : song)

 }

 export const minAttr = (songs, feature) => {
  return songs.reduce((min, song) => min[feature] < song[feature] ? min : song)

 }




