import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstruments, fetchInstrument } from '../../actions/instruments';
import {checkIfPlaying} from '../../actions/spotify'
import * as workerTimers from 'worker-timers';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import InstrumentCard from './InstrumentCard';
import InstrumentDetail from './InstrumentDetail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useHeight from '../../hooks/useHeight'


const useStyles = makeStyles((theme) => ({
  cardGrid: {
   
    paddingBottom: theme.spacing(8),
  },

  list: {
    minHeight: '100vh',
    overflow: 'scroll',
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

  
    detail: {
     height: '100%',
  },

  drawer: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    width: '83%',
    margin: 'auto',
    marginTop: theme.spacing(6),
    height: '50%',
    [theme.breakpoints.down('xs')]: {
      height: '40%',
      
    },
   }, 

   drawerIconContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: '24px',
    width: '24px',
    marginLeft: 0,
    position: 'fixed',
    top: '50%',
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


const InstrumentList = ({ match }) => {
  const instruments = useSelector((state) => state.instruments);

  const instrument = useSelector((state) => state.instruments[match.params.id]);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const dispatch = useDispatch();

  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const sectionDOM = useRef(null);
  const [height] = useHeight(sectionDOM);

  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchInstrument(id));
  };

  useEffect(() => {
   const intervalId = accessToken ? workerTimers.setInterval(() => {dispatch(checkIfPlaying(accessToken,refreshToken))}, 1000) : null

    if (accessToken) {
      return () => {
      workerTimers.clearInterval(intervalId) 
    }
   }
  }, [accessToken, refreshToken, dispatch])

  const renderedList =
    Object.values(instruments).length > 0
      ? Object.values(instruments)
          .sort((a, b) => (a['name'] > b['name'] ? 1 : -1))
          .map((instrument) => {
            transitionDuration += 50;
            return (
              <ListItem key={instrument.id} dense>
                <InstrumentCard
                  instrument={instrument}
                  transitionDuration={transitionDuration}
                  handleClick={handleClick}
                />
              </ListItem>
            );
          })
      : null;

  const renderDetail = () => {
    return instrument ? <InstrumentDetail instrument={instrument} /> : null;
  };


  const drawer = (
    <>
      <IconButton  className={classes.drawerIconContainer}>
        <KeyboardArrowUpRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon} />
      </IconButton>
      
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="bottom"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <List>{renderedList}</List>
      </SwipeableDrawer>
    </>
  );


  return (
     <div >
        <Grid container justify='center' className={classes.cardGrid}>
        {!matches ? <Grid item xs={3} md={3}  lg={3}  className={classes.list}>
            <List style={{height: height}}>{renderedList}</List>  
        </Grid> : drawer}
        <Grid item lg={1} md={1} sm={0} xs={0}/>
        <Grid item xs={10} md={8} lg={6}  ref={sectionDOM} className={classes.detail}>
          {renderDetail()}
        </Grid>
    
        </Grid>
    </div>
  );
};

export default InstrumentList;
