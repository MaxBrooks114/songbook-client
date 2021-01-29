import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SongCard from './SongCard';
import { useDispatch } from 'react-redux';
import {fetchSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Sort from '../Sort'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: '4px',
   
  },



  listItem: {
      '&:hover': {
        transform: 'translate(10px, 10px)',
        transition: 'transform 0.2s ease 0s',
        cursor: 'pointer',
        zIndex: 2,
     },
  
     
    },
    
    title: {
      width: '95%',
      fontWeight: '600',
      textAlign: 'center',
       [theme.breakpoints.down('xs')]: {
         margin: 0,
         width: '100%'
      },  
    },


    sortBar: {

      width: '95%',
      display: 'flex',
      justifyContent: 'flex-end',
    },

    expand: {
      height: 32,
      width: 32,
    },

    

}));
const SongList = ({songs, filteredSongs, setListColumnSize, setShowDetail, transitionDuration, height }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation()

    const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  const renderSort = () => {
    return Object.values(songs).length > 0 ? <Sort  items={Object.values(songs)} songs={Object.values(songs)} objectType='songs' /> : null 
  }

const renderedList = () => {
   return Object.values(songs).length > 0
      ? filteredSongs.map((song) => {
            transitionDuration += 50;
            return (
              <ListItem   className={classes.listItem} key={song.id} disableGutters dense>
                <SongCard  song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;
    }


   return (
      <>
        <Typography variant="h5" className={classes.title}>
          Songs
        </Typography>
        <div className={classes.sortBar}>
          {renderSort()}
          {location.pathname.includes('songs/') ?
          <IconButton>
            <NavigateNextIcon className={classes.expand} onClick={() => {
              setListColumnSize(8)
              setShowDetail(false)
              window.history.pushState(null, null, '/songs')
            }}/>
          </IconButton>: null}    
        </div>
        <List className={classes.list} style={{height: height}}>
          {renderedList()}
        </List> 
      </>
   )
}

export default React.memo(SongList)
