import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo_svg from '../../assets/logo_svg.svg'
import Progressbar from './Progressbar'
import {fetchUser} from '../../actions/auth'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // [theme.breakpoints.down('md')]: {
    //   marginBottom: '.7rem',
    // },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '.7rem',
    },
  },

  logo: {
    color: theme.palette.secondary.main,
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      height:"3rem",
    },
    height: "3.5rem"
  },

  tabContainer: {
    marginLeft: 'auto',
  },

  tab: {
    ...theme.typography.tab,
    color: "white",
    minWidth: 10,
    marginLeft: '25px',
    opacity: 1,
    alignText: 'left'
  },

  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  drawerIcon: {
    height: '50px',
    width: '50px',
  },

  button: {
    ...theme.button,
    color: theme.palette.primary.main,
    marginLeft: "50px",
    marginRight: "25px",
    marginBottom: ".2rem"
  },

  listButton: {
    ...theme.button,
  
  },

  drawer: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    '& .PrivateSwipeArea-anchorLeft-24': {
      width: '0px !important'
    }
  },

  drawerItem: {
    color: theme.palette.secondary.main,
    minWidth: 10,
    opacity: 0.7,
  },

  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },

  appBar: {
    background: theme.palette.primary.dark,
    zIndex: theme.zIndex.modal + 1
  },

  menu: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",

  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center',
    }
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const dispatch = useDispatch()
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [selectedIndex, setSelectedIndex] = useState(0)
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [open, setOpen] = React.useState(false)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen(true)
    };

    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false)
    };

    const handleMenuItemClick = (e, i) => {
      setAnchorEl(null);
      setOpen(false)
      setSelectedIndex(i)

    }
   const menuOptions = user ? [
    { name: 'Instruments', link: '/instruments', activeIndex: 0, selectedIndex: 0 },
    { name: 'New Instrument', link: '/instruments/new', activeIndex: 0, selectedIndex: 1},
    { name: 'Songs', link: '/songs', activeIndex: 1, selectedIndex: 2},
    { name: 'New Song', link: '/songs/new', activeIndex: 1, selectedIndex: 3},
    { name: 'Elements', link: '/elements', activeIndex: 2, selectedIndex: 4},
    { name: 'New Element', link: '/elements/new', activeIndex: 2, selectedIndex: 5},
    { name: user.username, link: `/users/${user.id}`, activeIndex: 3, selectedIndex: 6},
    { name: 'Log out', link: '/logout', activeIndex: 3, selectedIndex: 7},
  ] : [
    { name: 'Register', link: '/register', activeIndex: 0 },
    { name: 'Log In', link: '/login', activeIndex: 1 },
  ];

  let authRoutes = user ?
  
  [
    { name: 'Instruments', link: '/instruments', activeIndex: 0 },
    { name: 'Songs', link: '/songs', activeIndex: 1 },
    { name: 'Elements', link: '/elements', activeIndex: 2 },
    { name: user.username, link: `/users/${user.id}`, activeIndex: 3},
    {name: 'Spotify Search', link: '/search', activeIndex: 4, component: 'button'}
  ] : null 

  const guestRoutes = [
    { name: 'Register', link: '/register', activeIndex: 0 },
    { name: 'Log In', link: '/login', activeIndex: 1 },
  ];

  let routes = isAuthenticated && user ? authRoutes : guestRoutes;

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex){
              setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={(e, value) => setValue(value)}
        indicatorColor={value > 3 ? "primary" : "secondary"}
      >
        {routes.map((route) => (
          route.component ? 
          <Button variant="contained" key={`${route.name}${route.activeIndex}`}
            className={classes.button}
            component={RouterLink}
            onClick={(e, value) => setValue(value)}
            to={route.link}
            label={route.name}>{route.name}</Button>
          : <Tab
            tabIndex={route.activeIndex}
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup={anchorEl ? "true" : undefined}
            onMouseOver={e => handleClick(e)}
            key={`${route.name}${route.activeIndex}`}
            className={classes.tab}
            component={RouterLink}
            to={route.link}
            label={route.name}
          />
        ))}
      </Tabs>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {menuOptions.map((route) => (
            route.component ? <Button styles={{marginLeft: 0}} variant="contained" key={`${route.name}${route.activeIndex}`}
            className={classes.listButton}
            component={RouterLink}
            to={route.link}
            label={route.name}>{route.name}</Button> :
            <ListItem
              key={`${route.name}${route.activeIndex}`}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
              divider
              button
              component={RouterLink}
              to={route.link}
              classes={{ selected: classes.drawerItemSelected }}
              selected={value === route.activeIndex}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
     <ElevationScroll>
      <AppBar className={classes.appBar} position="fixed" elevation={0}>
       
        <Toolbar disableGutters>
           <Button component={RouterLink} to="/songs" onClick={e=> setValue(2)} >
              <img alt="logo" src={logo_svg} variant="h6" className={classes.logo}/>
            </Button>
          {matches ? drawer : tabs}
         {user ?  <Menu 
            elevation={0} 
            style={{zIndex: 1302}} 
            classes={{paper: classes.menu}} 
            MenuListProps={{onMouseLeave: handleClose}} 
            id="simple-menu" 
            anchorEl={anchorEl} 
            getContentAnchorEl={null}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }} 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={open} 
            onClose={handleClose}>
            {menuOptions && anchorEl ? menuOptions.filter(option => option.activeIndex === anchorEl.tabIndex ).map((option, i) => (
              <MenuItem 
                key={option.name}
                classes={{paper: classes.menuItem}} 
                style={{justifyContent: "center"}}
                onClick={(e, i) => { handleMenuItemClick(e, i); setValue(option.activeIndex); handleClose()}}
                selected={i === selectedIndex && value === option.activeIndex}
                component={RouterLink} 
                to={option.link}>
                {option.name}
              </MenuItem>
            )) : null}
          </Menu> : null}
          
        </Toolbar>
        
      </AppBar>
      </ElevationScroll>
    
       <Progressbar />
      <div className={classes.toolbarMargin} />  
      
    </>

  );
};

export default Navbar;
