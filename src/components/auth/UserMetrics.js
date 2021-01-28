import React from 'react'
import {topFiveByAttr, topFive, bottomFive, attrPreference} from '../../helpers/userMetrics'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import ItemCard from './ItemCard'
import {titleCase, renderText, millisToMinutesAndSeconds} from '../../helpers/detailHelpers'
import keys from '../songs/keys'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({


  title:{
    width: '100%',
    marginTop: 25,
    
  },



}));

const UserMetrics = ({songs, sections}) => {
    const classes = useStyles();
    const location = useLocation()
    const whichData = location.pathname.split('/').slice(-1)[0]

  const data = {
     'progress': { 
        'recentlyAddedSongs': [topFive(songs, 'created_at'), 'image', 'album', 'songs', 'title', 'artist', 'created_at', songs.length],
        'recentlyAddedSections': [topFive(sections, 'created_at'), ['song','image'], ['song','album'],'sections', 'name', ['song','title'], 'created_at', sections.length],
        'recentlyLearnedSections': [sections.sort((a,b) => a.created_at > b.created_at ? 1 : -1 ).filter(section => section.learned).slice(0, 5), ['song','image'], ['song','album'],'sections', 'name', ['song','title'], 'created_at', `${sections.filter(section => section.learned).length}/${sections.length}`]
      },

      'favorites': {
          'favoriteArtists': [topFiveByAttr(songs, 'artist'), 'image', 'album', 'songs', 'artist', 'title', 'album', _.uniq(songs.map(song => song.artist)).length],
          'favoriteGenres': [topFiveByAttr(songs, 'genre'), 'image', 'album', 'songs', 'genre', 'title', 'artist', _.uniq(songs.map(song => song.genre)).length],
          'favoriteKeys': [topFiveByAttr(songs, 'key'), 'image', 'album', 'songs', 'key', 'artist', 'album', 'songs', _.uniq(songs.map(song => song.key)).length], 
          'favoriteAlbums': [topFiveByAttr(songs, 'album'), 'image', 'album', 'songs', 'album', 'title', 'artist', _.uniq(songs.map(song => song.album)).length]
      },

      'timing' : {
        'fastestSongs': [topFive(songs, 'tempo'), 'image', 'album', 'songs', 'tempo', 'title', 'artist'],
        'slowestSongs': [bottomFive(songs, 'tempo'), 'image', 'album', 'songs', 'tempo', 'title', 'artist'],
        'longestSongs': [topFive(songs, 'duration'), 'image', 'album', 'songs', 'duration', 'title', 'artist'],
        'shortestSongs': [bottomFive(songs,'duration'),'image', 'album', 'songs', 'duration', 'title', 'artist'],
        'fastestSections': [topFive(sections, 'tempo'), ['song','image'], ['song','album'], 'sections', 'tempo', 'name', ['song','title']],
        'slowestSections': [bottomFive(sections, 'tempo'), ['song','image'], ['song','album'], 'sections', 'tempo', 'name', ['song','title']],
        'longestSections': [topFive(sections, 'duration'), ['song','image'], ['song','album'], 'sections', 'duration', 'name', ['song','title']],
        'shortestSections': [bottomFive(sections, 'duration'), ['song','image'], ['song','album'], 'sections', 'duration', 'name', ['song','title']]
      },

      "audioPreferences": {
          'HighestValence': [topFive(songs, 'valence'), 'image', 'album', 'songs', 'valence', 'title', 'artist', `preference: ${attrPreference(songs, 'valence')}`],
          'HighestEnergy': [topFive(songs, 'energy'), 'image', 'album', 'songs', 'energy', 'title', 'artist', `preference: ${attrPreference(songs, 'energy')}`],
          'HighestInstrumentalness': [topFive(songs, 'instrumentalness'), 'image', 'album', 'songs', 'instrumentalness', 'title', 'artist',`preference: ${attrPreference(songs, 'instrumentalness')}`],
          'HighestAcousticness': [topFive(songs, 'acousticness'), 'image', 'album', 'songs', 'acousticness', 'title', 'artist',`preference: ${attrPreference(songs, 'accousticness')}`],
          'HighestDanceability': [topFive(songs, 'danceability'), 'image', 'album', 'songs', 'danceability', 'title', 'artist', `preference: ${attrPreference(songs, 'danceability')}`],
          'HighestSpeechiness': [topFive(songs, 'speechiness'), 'image', 'album', 'songs', 'speechiness', 'title', 'artist', `preference: ${attrPreference(songs, 'speechiness')}`],
          'HighestLiveness': [topFive(songs, 'liveness'), 'image', 'album', 'songs', 'liveness', 'title', 'artist', `preference: ${attrPreference(songs, 'liveness')}`],
          'Loudest': [topFive(songs, 'loudness'), 'image', 'album', 'songs', 'loudness', 'title', 'artist'],
          'LowestValence': [bottomFive(songs, 'valence'), 'image', 'album', 'songs', 'valence', 'title', 'artist', `preference: ${attrPreference(songs, 'valence')}`],
          'LowestEnergy': [bottomFive(songs, 'energy'), 'image', 'album', 'songs', 'energy', 'title', 'artist', `preference: ${attrPreference(songs, 'energy')}`],
          'LowestInstrumentalness': [bottomFive(songs, 'instrumentalness'), 'image', 'album', 'songs', 'instrumentalness', 'title', 'artist', `preference: ${attrPreference(songs, 'instrumentalness')}`],
          'LowestAcousticness': [bottomFive(songs, 'acousticness'), 'image', 'album', 'songs', 'acousticness', 'title', 'artist', `preference: ${attrPreference(songs, 'acousticness')}`],
          'LowestDanceability': [bottomFive(songs, 'danceability'), 'image', 'album', 'songs', 'danceability', 'title', 'artist', `preference: ${attrPreference(songs, 'danceability')}`],
          'LowestSpeechiness': [bottomFive(songs, 'speechiness'), 'image', 'album', 'songs', 'speechiness', 'title', 'artist', `preference: ${attrPreference(songs, 'speechiness')}`],
          'LowestLiveness': [bottomFive(songs, 'liveness'), 'image', 'album', 'songs', 'liveness', 'title', 'artist', `preference: ${attrPreference(songs, 'liveness')}`],
          'Softest': [bottomFive(songs, 'loudness'), 'image', 'album', 'songs', 'loudness', 'title', 'artist'],
      }
    }

  
    const renderInfo = (item, attr) => {
      switch(true) {
         case attr === 'key':
         return titleCase(renderText(keys, item[attr]))
        case attr === 'duration':
         return millisToMinutesAndSeconds(item[attr])
        case attr === 'tempo':
         return `${item[attr]} BPM`
        case attr === 'genre':
         return titleCase(item[attr])
        case attr === 'created_at':
         return item[attr].split('T')[0]
        case typeof attr === "object":
         return item[attr[0]][attr[1]]
        case attr === "valence":
        case attr === "instrumentalness":
        case attr === "energy":
        case attr === "liveness":
        case attr === "acousticness":
        case attr === "speechiness":
        case attr === "danceability":
         return `${item[attr]}/ 1`
        case attr === 'loudness':
          return `${item[attr]} db`
        default:
          return item[attr]
      }
    }

    const renderItemCards = (items) => {
    return items[0].length ? 
     items[0].map((item, index) => {
          return (
               <Grid item xs={2}>
                <ItemCard 
                    index={index} 
                    picture={renderInfo(item, items[1])} 
                    album={renderInfo(item, items[2])} 
                    cardTitle={renderInfo(item, items[4])} 
                    cardInfo1={renderInfo(item, items[5])} 
                    cardInfo2={renderInfo(item, items[6])} 
                    type={items[3]} 
                    id={item.id} />
              </Grid>
          )
      })
     : null
  }

    const renderRows = (metrics) => {
      return Object.keys(metrics).map(metric => {
        console.log(metrics[metric][7])
      let title = metrics[metric][7] ? `${titleCase(metric)} (${titleCase(metrics[metric][7])})` : titleCase(metric)
       return( 
        <Grid container justify="space-evenly" style={{marginTop: '25px'}}>
            <Grid item xs={12}>
               <Typography style={{marginLeft: '29px'}}  variant="h5" gutterBottom>{title}</Typography>
            </Grid>
              {renderItemCards(metrics[metric])}
          </Grid>
       )
      })
        
    }

  return (
    <>
      <Typography className={classes.title} component="p" variant="h4">{titleCase(whichData)}</Typography>
      <Grid container justify="space-evenly">
        <Grid item xs= {12}>
          {renderRows(data[whichData])}
        </Grid>
      </Grid>
    </>
  )
}

export default UserMetrics
