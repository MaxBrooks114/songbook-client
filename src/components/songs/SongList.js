import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SongCard from './SongCard';
import { useDispatch } from 'react-redux';
import {fetchSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Sort from '../Sort'
import {  useParams } from 'react-router-dom';


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
      marginTop: '2px',
      marginLeft: '28px',
      marginRight: '33px'
      
    }
}));
const SongList = ({songs, filteredSongs, fullDisplay, transitionDuration, height }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const params = useParams()

    const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  const renderSort = () => {
    return Object.values(songs).length > 0 ? <Sort items={Object.values(songs)} songs={Object.values(songs)} objectType='songs' /> : null 
  }

const renderedList = () => {
   return Object.values(songs).length > 0
      ? filteredSongs.map((song) => {
            transitionDuration += 50;
            return (

              <ListItem className={classes.listItem} key={song.id} disableGutters dense>
                <SongCard  fullDisplay={fullDisplay} song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;
    }


   return (
      <>
       <Typography variant="h4" style={params.id ? {marginLeft: 0, marginBottom: '16px'}: null} className={classes.title}>
            Songs
          </Typography>
           {renderSort()}
        
        <List className={classes.list} style={{height: height}}>
          {renderedList()}</List> 
      </>
   )
}

export default SongList
