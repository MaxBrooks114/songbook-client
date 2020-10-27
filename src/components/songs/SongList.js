import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, fetchSong } from '../../actions/songs';
import { getFilteredSongs } from '../../selectors/songSelectors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SongCard from './SongCard';
import SongDetail from './SongDetail';
import FilterControl from '../FilterControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    height: '90vh',
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  list: {
    height: '100%',
    overflow: 'scroll',
  },

  filter: {
    marginRight: 14,
    marginLeft: 14,
    background: theme.palette.primary.light,
    borderRadius: '0 0 8px 8px',
  },
}));

const SongList = ({ match }) => {
  
  const filteredSongs = useSelector(getFilteredSongs);
  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.songs[match.params.id]);

  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  const renderFilter = 
    Object.values(songs).length > 0 ? <FilterControl objectType='songs' attributes={Object.getOwnPropertyNames(Object.values(songs)[0])} /> : null 

  const renderedList =
    Object.values(songs).length > 0
      ? Object.values(filteredSongs)
          .sort((a, b) => (a['artist'] > b['artist'] ? 1 : -1))
          .map((song) => {
            transitionDuration += 50;
            return (
              <ListItem key={song.id} dense>
                <SongCard song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;

  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <Grid container className={classes.cardGrid}>
      <Grid item xs={12} className={classes.filter}>
        {renderFilter}
      </Grid>
      <Grid item xs={4} className={classes.list}>
        <List>{renderedList}</List>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={6} className={classes.list}>
        {renderDetail()}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default SongList;
