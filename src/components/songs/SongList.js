import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SongCard from './SongCard';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { fetchSongs, fetchSong } from '../../actions/songs';


const useStyles = makeStyles((theme) => ({
   list: {
    minHeight: '100vh',
    overflow: 'scroll',
  },
}))


const SongList = ({songs, filteredSongs, transitionDuration, height}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

const renderedList = () => {
   return Object.values(songs).length > 0
      ? filteredSongs.map((song) => {
            transitionDuration += 50;
            return (
              <ListItem key={song.id} disableGutters dense>
                <SongCard song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;
    }


   return <List style={{height: height}}>{renderedList()}</List>  
    }

export default SongList
