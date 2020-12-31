import React, { useEffect, useRef, useState} from 'react';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
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
import IconButton from '@material-ui/core/IconButton';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';




const drawerWidth = 244;

const useStyles = makeStyles((theme) => ({
  
 
  cardGrid: {
   minHeight: '100vh'
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
    
  },

  list: {
   marginTop:'7px', 
   minHeight: "100vh",
   flexGrow: 1,
   transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: 'auto'
  },

  listShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '244px',
  },

  detail: {
     height: '100%',
     minHeight: '100vh',
     marginTop: '11px'
  },
  
  drawerIconContainer: {
    background: theme.palette.common.gray,
    height: '35px',
    width: '35px',
    marginLeft: 0,
    position: 'fixed',
    top: '17%',
    zIndex: 3,
    left: '2.8%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  
   drawerIcon: {
    height: '24px',
    width: '24px',
  },

  drawer: {
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
    marginTop: theme.spacing(9),
    overflowY: 'scroll',
    background: theme.palette.common.gray,
    [theme.breakpoints.down('xs')]: {
      height: '40%',
      
    },
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const location = useLocation()

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
    return Object.values(songs).length > 0 ? <FilterControl setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} items={Object.values(songs)} songs={Object.values(songs)} objectType='songs' /> : null 
  }
  

  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <div  className={classes.root}>
       <IconButton  className={classes.drawerIconContainer}>
        <TuneRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon} />
      </IconButton>
       <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >  {renderFilter()}</SwipeableDrawer>
       
        <Grid container justify={song ? 'space-between' : 'flex-start'} className={classes.cardGrid}>
          
        
        {!matches ? 
            <>
            
            <Grid item xs={3} md={3} lg={song ? 3 : 10} className={clsx(classes.list, {
          [classes.listShift]: openDrawer,
        })}>
            
            <SongList filteredSongs={filteredSongs} fullDisplay={!song} transitionDuration={transitionDuration} songs={songs} height={height} /> 
        </Grid> </>: <SongDrawer renderFilter={renderFilter} filteredSongs={filteredSongs} transitionDuration={transitionDuration} songs={songs} />}
        <Grid item style={song ? null: {display: 'none'} } xs={12} md={8} lg={6} ref={elementDOM} className={classes.detail}>
          {renderDetail()}
        </Grid>
        </Grid>
    </div>
  );
};

export default SongContainer;
