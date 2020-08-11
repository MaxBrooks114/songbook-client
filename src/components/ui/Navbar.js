import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },

  logo: {
    color: theme.palette.secondary.main,
    marginLeft: 4,
    [theme.breakpoints.down('md')]: {
      font: 2,
    },
  },

  tabContainer: {
    marginLeft: 'auto',
  },

  tab: {
    color: theme.palette.secondary.main,
    minWidth: 10,
    marginLeft: '25px',
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

  drawer: {
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
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
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

  const routes = [
    { name: 'Instruments', link: '/instruments', activeIndex: 0 },
    { name: 'New Instrument', link: '/instruments/new', activeIndex: 1 },
    { name: 'Songs', link: '/songs', activeIndex: 2 },
    { name: 'New Song', link: '/songs/new', activeIndex: 3 },
    { name: 'Spotify Search', link: '/search', activeIndex: 4 },
  ];

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [value, routes]);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={(e, value) => setValue(value)}
        indicatorColor="secondary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
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
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
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
      <IconButton className={classes.drawerIconContainer}>
        <MenuIcon className={classes.drawerIcon} onClick={() => setOpenDrawer(!openDrawer)} />
      </IconButton>
    </>
  );
  return (
    <>
      <AppBar className={classes.appBar} position="fixed" elevation={0}>
        <Toolbar disableGutters>
          <Typography variant="h6" className={classes.logo}>
            SongBook
          </Typography>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Navbar;
