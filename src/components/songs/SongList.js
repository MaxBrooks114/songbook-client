import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, fetchSong } from '../../actions/songs';
import {clearFilter} from '../../actions/filter'
import { getFilteredItems } from '../../selectors/filterSelectors';
import * as workerTimers from 'worker-timers';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import SongCard from './SongCard';
import SongDetail from './SongDetail';
import FilterControl from '../FilterControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { checkIfPlaying } from '../../actions/spotify';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    marginBottom: theme.spacing(8),
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '.7rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },

  list: {
    height: '100%',
    overflow: 'scroll',
  },

  filter: {

    background: theme.palette.primary.light,
    borderRadius: '0 0 8px 8px',
  },

   drawer: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
   
    width: '80%',
    margin: 'auto',
    marginBottom: 'theme.spacing(6)',
    height: '80%',
    
   }, 

   drawerIconContainer: {
    backgroundColor: theme.palette.primary.light,
    height: '32px',
    width: '32px',
    marginLeft: 0,
    position: 'fixed',
    right: 0,
  
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  drawerIcon: {
    height: '50px',
    width: '50px',
  },

}));

const SongList = ({ match }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'));
  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.songs[match.params.id]);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);



  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  useEffect(() => {
    dispatch(clearFilter())
    const intervalId = accessToken ? workerTimers.setInterval(() => {dispatch(checkIfPlaying(accessToken,refreshToken))}, 1000) : null
     if (accessToken) {
      return () => {
      workerTimers.clearInterval(intervalId) 
    }
   }
   
  }, [accessToken, refreshToken, dispatch])

  const renderFilter = () => {
    return Object.values(songs).length > 0 ? <FilterControl items={Object.values(songs)} songs={Object.values(songs)} objectType='songs' /> : null 
  }
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
  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  const drawer = (
    <>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        anchor="bottom"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <List>{renderedList()}</List>
      </SwipeableDrawer>
      <IconButton  className={classes.drawerIconContainer}>
        <KeyboardArrowUpRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <div className={classes.root}>
     
        <Grid container justify="center" >
          <Grid item xs={10} className={classes.filter}>
            {renderFilter()}
          </Grid>
        </Grid>
        <Grid container justify='center' className={classes.cardGrid}>
        {!matches ? <Grid item xs={3} md={3} lg={3} className={classes.list}>
          <Box style={{maxHeight: '100vh', overflow: 'auto'}}>
            <List>{renderedList()}</List>
          </Box>
        </Grid> : drawer}
        <Grid item lg={1} md={0} sm={0} xs={0}/>
        <Grid item xs={10} lg={6} className={classes.list}>
          {renderDetail()}
        </Grid>
    
        </Grid>
    </div>
  );
};

export default SongList;
