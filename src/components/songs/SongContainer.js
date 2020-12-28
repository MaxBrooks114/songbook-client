import React, { useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {clearFilter} from '../../actions/filter'
import { getFilteredItems } from '../../selectors/filterSelectors';
import * as workerTimers from 'worker-timers';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import SongDetail from './SongDetail';
import SongDrawer from './SongDrawer';
import SongList from './SongList';
import FilterControl from '../FilterControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { checkIfPlaying } from '../../actions/spotify';
import useHeight from '../../hooks/useHeight'

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
   filter: {

    background: theme.palette.primary.main,
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3.3rem',
      width: '83%',
      height: '43%',
      margin: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '3.3rem',
      paddingBottom: 0,
      width: '83%',
      height: '50%',
      margin: 'auto',
    },
  },

  list: {
    minHeight: '100%',
    overflow: 'scroll',
    background: theme.palette.common.gray,
    borderRadius: '4px'
  },

  detail: {
     height: '100%',
     minHeight: '100vh'
  },


  

}));

const SongContainer = ({ match }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'));
  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.songs[match.params.id]);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const elementDOM = useRef(null);
  const [height] = useHeight(elementDOM);

  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;



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

  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <div  className={classes.root}>
        <div className={classes.toolbarMargin}></div>

        <Grid container justify='space-between' className={classes.cardGrid}>
          {!matches  ? <Grid item xs={10} lg={2} sm={12} className={classes.filter}>
            {renderFilter()}
          </Grid> : ''}
        {!matches ? <Grid item xs={3} md={3} lg={song ? 3 : 8} className={classes.list}>
            <SongList filteredSongs={filteredSongs} fullDisplay={!song} transitionDuration={transitionDuration} songs={songs} height={height} />
        </Grid> : <SongDrawer renderFilter={renderFilter} filteredSongs={filteredSongs} transitionDuration={transitionDuration} songs={songs} />}
        <Grid item style={song ? null: {display: 'none'} } xs={12} md={8} lg={6} ref={elementDOM} className={classes.detail}>
          {renderDetail()}
        </Grid>
        </Grid>
    </div>
  );
};

export default SongContainer;
