import React from 'react'
import {favorite, favoriteInstrument, sectionsLearned, attrPreference, minAttr, maxAttr, topFiveByAttr, topFive} from '../../helpers/userMetrics'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link, useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({


  title:{
    width: '100%'
  },

  albumRow: {
    width: 198,
    height: 198,
    borderRadius: 4
  },

  songCard: {
    background: theme.palette.primary.main,
    borderRadius: 4
  }
}));

const UserProgress = ({songs, sections}) => {
    const classes = useStyles();
    const location = useLocation()


    const data = location.pathname.includes('progress') ? 
      { 
        'pageTitle': "Progress",
        'recentSongs': [topFive(songs, 'created_at'),'image', 'album', 'songs', 'title', 'artist', 'created_at'],
        'recentSections': [topFive(sections, 'created_at'), ['song','image'], ['song','album'],'sections', 'name', ['song','title'], 'created_at'],
        'recentlyLearned': [sections.sort((a,b) => a.created_at > b.created_at ? 1 : -1 ).filter(section => section.learned).slice(0, 5), ['song','image'], ['song','album'],'sections', 'name', ['song','title'], 'created_at']
      } : {
          'pageTitle': "Favorites",
          'favorite_artists': topFiveByAttr(songs, 'artist'),
          'favorite_genres': topFiveByAttr(songs, 'genre'),
          'favorite_key': topFiveByAttr(songs, 'key'),
          'favorite_album': topFiveByAttr(songs, 'album')
      }

    const renderAlbumRow = (items) => {
    return items[0].length ? 
     items[0].map((item, index) => {
          return (
               <Grid item xs={2} className={classes.songCard}>
                <div>
                   { Array.isArray(items[1]) ? 
                      <img                 
                      src={item[items[1][0]][items[1][1]]}
                      alt={item[items[2][0]][items[2][1]]}
                      className={classes.albumRow}
                       /> : <img                 
                      src={item[items[1]]}
                      alt={item[items[2]]}
                      className={classes.albumRow}
                       />
                  }
                <div style={{padding: '15px'}}>
                  <Typography variant="h5">{index + 1}</Typography>
                  <Typography variant="subtitle1"><Link to={`/${items[3]}/${item.id}`}>{item[items[4]]}</Link></Typography>
                  <Typography component="p" variant="caption">{
                    Array.isArray(items[5]) ? 
                      item[items[5][0]][items[5][1]] : item[items[5]]
                     }</Typography>
                  <Typography variant="caption">{item[items[6]].split('T')[0]}</Typography>
                </div>
                </div>
            </Grid>
          )
      })
     : null
  }

  const renderSectionAlbumRow = (sections) => {
    return sections.length ? 
     sections.map((section, index) => {
          return (
               <Grid item xs={2} className={classes.songCard}>
                <div >
                  <img 
                      src={section.song.image}
                      alt={section.album}
                      className={classes.albumRow}
                       />
                <div style={{padding: '15px'}}>
                  <Typography variant="h5">{index + 1}</Typography>
                  <Typography variant="subtitle1"><Link to={`/sections/${section.id}`}>{section.name}</Link></Typography>
                  <Typography component="p" variant="caption">{section.song.title}</Typography>
                  <Typography variant="caption">{section.created_at.split('T')[0]}</Typography>
                  </div>
                </div>
            </Grid>
          )
      })
     : null
  }

  return (
    <>
      <Typography  className={classes.title} component="p" variant="h4">{data.pageTitle}</Typography>
      <Grid container justify="space-evenly">
        <Grid item xs= {12}>
          <Grid container justify="space-evenly" style={{marginTop: '25px'}}>
            <Grid item xs={12}>
               <Typography style={{marginLeft: '29px'}}  variant="h5" gutterBottom>Recently Added Songs ({songs.length})</Typography>
            </Grid>
              {renderAlbumRow(data.recentSongs)}
          </Grid>
          <Grid container justify="space-evenly" style={{marginTop: '25px'}}>
            <Grid item xs={12}>
               <Typography style={{marginLeft: '29px'}} variant="h5" gutterBottom>Recently Added Sections ({sections.length})</Typography>
            </Grid>
              {renderAlbumRow(data.recentSections)}
          </Grid>
          <Grid container justify="space-evenly" style={{marginTop: '25px'}}>
            <Grid item xs={12}>
               <Typography style={{marginLeft: '29px'}} variant="h5" gutterBottom>Learned Sections ({sections.filter(section => section.learned).length}/{sections.length})</Typography>
            </Grid>
              {renderAlbumRow(data.recentlyLearned)}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProgress
