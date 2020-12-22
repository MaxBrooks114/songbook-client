import React, {useState} from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import { makeStyles } from '@material-ui/styles';
import SongList from './SongList';


const useStyles = makeStyles((theme) => ({

  filter: {

    background: theme.palette.primary.main,
    borderRadius: '0 0 8px 8px',
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
}))
const SongDrawer = ({songs, filteredSongs, renderFilter}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);


  return (
    <div>
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
        <SongList filteredSongs={filteredSongs} songs={songs} />
      </SwipeableDrawer>

        <SwipeableDrawer
        classes={{ paper: classes.filter }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="top"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        {renderFilter()}
      </SwipeableDrawer>
    </div>
  )
}

export default SongDrawer
