import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SongCard from './SongCard';
import { useDispatch } from 'react-redux';
import {fetchSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
  
     

      '&:hover': {
        transform: 'translate(10px, 10px)',
        transition: 'transform 0.2s ease 0s',
        cursor: 'pointer',
        zIndex: 2,
     },
    
   
  },
  
}));
const SongList = ({songs, filteredSongs, fullDisplay, transitionDuration, height}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

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


   return <List style={{height: height}}>{renderedList()}</List>  
    }

export default SongList
