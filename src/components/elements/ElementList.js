import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as workerTimers from 'worker-timers';
import { fetchElement } from '../../actions/elements';
import { getFilteredItems } from '../../selectors/filterSelectors';
import {checkIfPlaying} from '../../actions/spotify'
import {clearFilter} from '../../actions/filter'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ElementCard from './ElementCard';
import ElementDetail from './ElementDetail';
import FilterControl from '../FilterControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


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
}));

const ElementList = ({ match }) => {
  const filteredElements = useSelector(state => getFilteredItems(state, 'elements'));
  const elements = useSelector((state) => state.elements);
  const instruments = useSelector((state) => state.instruments);
  const songs = useSelector((state) => state.songs )
  const element = useSelector((state) => state.elements[match.params.id]);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);

  const dispatch = useDispatch();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  

  useEffect(() => {

    const intervalId = accessToken ? workerTimers.setInterval(() => {dispatch(checkIfPlaying(accessToken,refreshToken))}, 1000) : null
    
    dispatch(clearFilter())
    if (accessToken) {
      return () => {
      workerTimers.clearInterval(intervalId) 
    }
   }
  }, [accessToken, refreshToken, dispatch])
  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchElement(id));
  };
  const renderFilter = () => {
    return Object.values(elements).length > 0 ? <FilterControl items={Object.values(elements)} instruments={Object.values(instruments)}  songs={Object.values(songs)}  objectType='elements'  /> : null
  }
  const renderedList =
    Object.values(elements).length > 0
      ? Object.values(filteredElements)
          .map((element) => {
            transitionDuration += 50;
            return (
              <ListItem key={element.id} disableGutters dense>
                <ElementCard element={element} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;


  const renderDetail = () => {
    return element ? <ElementDetail  element={element} /> : null;
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
        <List>{renderedList}</List>
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
          <Grid item xs={10}>
            <Grid container justify='space-between' className={classes.cardGrid}>
              {!matches ? <Grid item xs={3} md={3} lg={3} className={classes.list}>
                <Box style={{maxHeight: '100vh', overflow: 'auto'}}>
                  <List>{renderedList}</List>
                </Box>
              </Grid> : drawer}
            
            <Grid item lg={1} md={1} sm={0} xs={0}/>
            <Grid item xs={12} sm={8} lg={8} className={classes.list}>
              {renderDetail()}
            </Grid>
          </Grid>
        </Grid>
        </Grid>
    </div>
  );
};

export default ElementList;
