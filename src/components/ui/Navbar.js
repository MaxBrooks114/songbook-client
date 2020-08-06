import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },

  logo: {
    color: theme.palette.secondary.main,
    marginLeft: 4,
  },

  tabContainer: {
    marginLeft: 'auto',
  },

  tab: {
    color: theme.palette.secondary.main,
    minWidth: 10,
    marginLeft: '25px',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (true) {
      case window.location.pathname === '/songs' && value !== 0:
        return setValue(0);
      case window.location.pathname === '/songs/new' && value !== 1:
        return setValue(1);
      case window.location.pathname === '/search' && value !== 2:
        return setValue(2);
      default:
        return;
    }
  }, [value]);
  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar disableGutters>
          <Typography variant="h6" className={classes.logo} noWrap>
            SongBook
          </Typography>
          <Tabs
            className={classes.tabContainer}
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="secondary"
          >
            <Tab label="Songs" className={classes.tab} component={RouterLink} to="/songs" />
            <Tab label="New Song" className={classes.tab} component={RouterLink} to="/songs/new" />
            <Tab label="Spotify Search" className={classes.tab} component={RouterLink} to="/search" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Navbar;
