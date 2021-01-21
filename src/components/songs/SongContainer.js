import React, { useEffect, useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
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
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import filter_arrow_right from '../../assets/filter_arrow_right.svg';


const drawerWidth = 244;

const useStyles = makeStyles((theme) => ({
  
 
  cardGrid: {
   minHeight: '100vh',
   position: 'relative',
   marginTop: 50
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
   marginTop:'7px', 
   minHeight: "100vh",
   flexGrow: 1,
   transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000,
    }),
  },

  listShiftAlone: {
      transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    }),

    marginLeft: 47 
  },

  listShiftSong: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    })
  },

  listShiftRight: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    }),
    marginLeft: 290,
  },

  listShiftLeft: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeInOut, 
      duration: 1000,
  }),
    marginLeft: 244
},

  

  detailShown: {
     height: '100%',
     minHeight: '100vh',
     marginTop: 95,
      transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeInOut, 
      duration: 1000
      })
  },

  detailHidden: {
    display: 'none',
     transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeInOut, 
      duration: 1000
    })
  },
  
  drawerIconContainer: {
    height: '72px',
    width: '72px',
    marginLeft: 0,
    position: 'fixed',
    top: '12%',
    zIndex: 3,
    left: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },
    [theme.breakpoints.down('sm')]: {
      top: '5%',
      position: 'sticky',
    },
    
  },
  
   drawerIcon: {
    height: '54px',
    width: '54px',
  },

  drawer: {
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
    marginTop: theme.spacing(9),
    overflowY: 'scroll',
    background: theme.palette.common.gray,
    [theme.breakpoints.down('md')]: {
        zIndex: theme.zIndex.modal+1      
    },
    }, 
  
  

}));

const SongContainer = () => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'));
  const songs = useSelector((state) => state.songs);
  const location = useLocation()
  let id = location.pathname.split('/').splice(-1)
  const song = useSelector((state) => state.songs[id]);
  const nextSongIdx = filteredSongs.indexOf(song) + 1 
  const prevSongIdx = filteredSongs.indexOf(song) - 1
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const medScreen = useMediaQuery(theme.breakpoints.down('md'));
  const elementDOM = useRef(null);
  const [height] = useHeight(elementDOM);
  const [openDrawer, setOpenDrawer] = useState(true);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
    return song ? <SongDetail nextSong={filteredSongs[nextSongIdx]} prevSong={filteredSongs[prevSongIdx]} song={song} /> : null;
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
          <img src={filter_arrow_right} alt='filter-open-button' className={classes.drawerIcon}/>
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
      >  
        {renderFilter()}
      </SwipeableDrawer>  
      <Grid container justify='space-evenly' className={classes.cardGrid}>  
        {!matches ? 
            <>    
              <Grid 
                  item xs={3} md={song ? 3 : 8} 
                  className={clsx(classes.list, {[classes.listShiftRight]: openDrawer && !medScreen && !song, [classes.listShiftLeft]: song && openDrawer, [classes.listShiftSong]: song &&  !openDrawer, [classes.listShiftAlone]: !openDrawer && !song})}
              >        
                <SongList 
                filteredSongs={filteredSongs} 
                fullDisplay={!song} 
                transitionDuration={transitionDuration} 
                songs={songs} 
                height={height} 
                /> 
              </Grid> 
            </>: 
                <SongDrawer renderFilter={renderFilter} 
                            filteredSongs={filteredSongs} 
                            transitionDuration={transitionDuration} 
                            songs={songs} />}
        <Grid item      
              xs={12} md={6} lg={6} 
              ref={elementDOM} 
              className={song ? classes.detailShown : classes.detailHidden}>
                {renderDetail()}
        </Grid>
      </Grid>
    </div>
  );
};

export default SongContainer;
