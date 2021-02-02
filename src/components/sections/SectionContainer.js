import React, {useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import * as workerTimers from 'worker-timers';
import { getFilteredItems } from '../../selectors/filterSelectors';
import {checkIfPlaying} from '../../actions/spotify'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SectionList from './SectionList';
import SectionDrawer from './SectionDrawer';
import SectionDetail from './SectionDetail';
import FilterControl from '../FilterControl';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useHeight from '../../hooks/useHeight'
import filter_arrow_right from '../../assets/filter_arrow_right.svg';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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

  listSectionAlone: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    }),

    marginLeft: 46
  },

  listShiftSection: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    }),
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
    height: 0,
      width: 0,
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

     message: {
      position: 'fixed',
      zIndex: theme.zIndex.modal + 1,
      top: '50%',
      left: '15%'
    }
  
}));

const SectionContainer = () => {
  const filteredSections = useSelector(state => getFilteredItems(state, 'sections'));
  const sections = useSelector((state) => state.sections);
  const location = useLocation()
  let id = location.pathname.split('/').splice(-1)
  const section = useSelector((state) => state.sections[id]);
  const nextSectionIdx = filteredSections.indexOf(section) + 1 
  const prevSectionIdx = filteredSections.indexOf(section) - 1
  const instruments = useSelector((state) => state.instruments);
  const songs = useSelector((state) => state.songs )
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter )
  let order = filter.order === "ascending" ? [ 1 , -1] : [-1, 1]
  const orderedSongs = filter.sort === 'song' ?
      Object.values(songs).sort((a, b) => (a.title > b.title ? order[0] : order[1])) : Object.values(songs)
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const medScreen = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const elementDOM = useRef(null);
  const [height] = useHeight(elementDOM);
  const [listColumnSize, setListColumnSize] = useState(8)
  const [showDetail, setShowDetail] = useState(false)
  let transitionDuration = 50;

  useEffect(() => {
    const intervalId = accessToken ? workerTimers.setInterval(() => {dispatch(checkIfPlaying(accessToken,refreshToken))}, 1000) : null 
    if (accessToken) {
      return () => {
      workerTimers.clearInterval(intervalId) 
    }
   }
  }, [accessToken, refreshToken, dispatch])


   useEffect(( ) => {
    setListColumnSize(8)
    if(section) {
      setShowDetail(true)
      setListColumnSize(3)
    }
  },[section])



  const renderFilter = () => {
    return Object.values(sections).length > 0 ? <FilterControl items={Object.values(filteredSections)} instruments={Object.values(instruments)} setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} songs={Object.values(songs)}  objectType='sections'  /> : null
  }

  const renderDetail = () => {
    return section ? <SectionDetail nextSection={filteredSections[nextSectionIdx]} prevSection={filteredSections[prevSectionIdx]} section={section} /> : null;
  };

    

 
   return (
    <div className={classes.root}>
     {Object.values(sections).length ?
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
          <img src={filter_arrow_right} alt='filter-open-button' className={classes.drawerIcon}/>
      </IconButton> : 
        <Typography className={classes.message}>You have no sections! Import a song by using the Spotify Search function in the navbar or by adding one by following this <Link to="/sections/new">link</Link></Typography>
      }
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
                  item xs={3} md={listColumnSize} 
                  className={clsx(classes.list, {[classes.listShiftRight]: openDrawer && !medScreen && !section, [classes.listShiftLeft]: section && openDrawer, [classes.listShiftSection]:  listColumnSize !==8 &&  section &&  !openDrawer,
                  [classes.listSectionAlone]: (!section || listColumnSize === 8) && !openDrawer})}
              >        
                <SectionList 
                filteredSections={filteredSections} 
                fullDisplay={!section} 
                transitionDuration={transitionDuration} 
                sections={sections} 
                setShowDetail={setShowDetail}
                setListColumnSize={setListColumnSize}
                orderedSongs = {orderedSongs}
                height={height} 
                /> 
              </Grid> 
            </>: 
                <SectionDrawer 
                            orderedSongs = {orderedSongs}
                            renderFilter={renderFilter} 
                            filteredSections={filteredSections} 
                            transitionDuration={transitionDuration} 
                            sections={sections} />}
        <Grid item      
              xs={12} md={6} lg={6} 
              ref={elementDOM} 
              className={showDetail? classes.detailShown : classes.detailHidden}>
                {renderDetail()}
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(SectionContainer);
