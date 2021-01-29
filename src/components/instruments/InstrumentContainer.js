import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {checkIfPlaying} from '../../actions/spotify'
import * as workerTimers from 'worker-timers';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import InstrumentList from './InstrumentList';
import InstrumentDrawer from './InstrumentDrawer';
import InstrumentDetail from './InstrumentDetail';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useHeight from '../../hooks/useHeight'
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
   minHeight: '100vh',
   position: 'relative',
   marginTop: 50
  
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

  listShiftInstrument: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    })
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


}));


const InstrumentContainer = () => {
  const instruments = useSelector((state) => state.instruments);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const location = useLocation()
  let id = location.pathname.split('/').splice(-1)
  const instrument = useSelector((state) => state.instruments[id]);
  const nextInstrumentIdx = Object.values(instruments).indexOf(instrument) + 1 
  const prevInstrumentIdx = Object.values(instruments).indexOf(instrument) - 1
  const dispatch = useDispatch();
  const classes = useStyles();
  const [listColumnSize, setListColumnSize] = useState(8)
  const [showDetail, setShowDetail] = useState(false)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const medScreen = useMediaQuery(theme.breakpoints.down('md'));
  const elementDOM = useRef(null);
  const [height] = useHeight(elementDOM);

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
    if(instrument) {
      setShowDetail(true)
      setListColumnSize(3)
    }
  },[instrument])

  const renderDetail = () => {
    return instrument ? <InstrumentDetail instrument={instrument} nextInstrument={Object.values(instruments)[nextInstrumentIdx]} prevInstrument={Object.values(instruments)[prevInstrumentIdx]}/> : null;
  };


  


  return (

      <Grid container justify='space-evenly' className={classes.cardGrid}>
        {!matches ? <Grid item xs={3} md={listColumnSize}  className={clsx(classes.list, {[classes.listShiftInstrument]: listColumnSize !==8 && instrument, [classes.listShiftAlone]: !instrument || listColumnSize === 8})}>
            <InstrumentList height={height} setShowDetail={setShowDetail}
                setListColumnSize={setListColumnSize} instruments={instruments} />  
        </Grid> : <InstrumentDrawer instruments={instruments} transitionDuration={transitionDuration}/>}
        <Grid item xs={12} md={6}  ref={elementDOM} className={showDetail ? classes.detailShown : classes.detailHidden}>
          {renderDetail()}
        </Grid>
    
      </Grid>
   
  );
};

export default InstrumentContainer;
