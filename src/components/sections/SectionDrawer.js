import React, {useState} from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { makeStyles } from '@material-ui/styles';
import SectionList from './SectionList';


const useStyles = makeStyles((theme) => ({

 
   drawerIconContainer: {
    backgroundColor: theme.palette.common.gray,
    height: '24px',
    width: '24px',
    marginLeft: 0,
    position: 'fixed',
    bottom: '25%',
    zIndex: theme.zIndex.drawer+1,
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
    background: theme.palette.background.default,
    height: '85%',
    margin: 'auto',
    marginTop: theme.spacing(8),
  
   }, 
}))
const SectionDrawer = ({sections, filteredSections, songs}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const drawerButton = () => {
      return openDrawer ? <KeyboardArrowDownRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon}/>:  <KeyboardArrowUpRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon}/>
    }
  return (
    <div>
      <IconButton  className={classes.drawerIconContainer}>
        {drawerButton()}
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
        <SectionList songs={songs} filteredSections={filteredSections} sections={sections} />
      </SwipeableDrawer>

       
    </div>
  )
}

export default SectionDrawer
