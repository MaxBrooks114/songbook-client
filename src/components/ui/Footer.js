import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.lightNavy,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginTop: 'auto',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>SongBook by Max Brooks 2020</footer>;
};

export default Footer;
