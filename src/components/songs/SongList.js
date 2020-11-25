import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, fetchSong } from '../../actions/songs';
import { getFilteredItems } from '../../selectors/filterSelectors';
import * as workerTimers from 'worker-timers';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SongCard from './SongCard';
import SongDetail from './SongDetail';
import FilterControl from '../FilterControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { checkIfPlaying } from '../../actions/spotify';

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
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'));
  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.songs[match.params.id]);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  // useEffect(() => {
  //   // const intervalId = workerTimers.setInterval(() => {dispatch(checkIfPlaying(accessToken,refreshToken))}, 1000)

  //   return () => {
  //     workerTimers.clearInterval(intervalId)
  //   }
  // }, [accessToken, refreshToken, dispatch])
  const renderFilter = () => {
    return Object.values(songs).length > 0 ? <FilterControl items={Object.values(songs)} songs={Object.values(songs)} objectType='songs' /> : null 
  }
  const renderedList = () => {
   return Object.values(songs).length > 0
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
    }
  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <Grid container className={classes.cardGrid}>
      <Grid item xs={12} className={classes.filter}>
        {renderFilter()}
      </Grid>
      <Grid item xs={4} className={classes.list}>
        <List>{renderedList()}</List>
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
